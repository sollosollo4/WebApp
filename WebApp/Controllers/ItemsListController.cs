using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp.Models;
using WebApp.Models.UnitOfWork;

namespace WebApp.Controllers
{
    [Authorize(Roles="customer")]
    public class ItemsListController : Controller
    {
        private DbOfWork db;

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ItemsListController() { 
            db = new DbOfWork(); 
        }

        public ItemsListController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            db = new DbOfWork();
        }

        public ActionResult Index()
        {
            if (User.IsInRole("manager") || User.IsInRole("admin"))
                return RedirectToAction("Index", "ItemsListManage");
            else
                return View();
        }

        [HttpGet]
        public string GetItem()
        {
            List<Item> _list = db.Items.GetAll().ToList();
            var objer = JsonConvert.SerializeObject(_list);
            return objer;
        }

        /// <summary>
        /// Получение корзины текущего пользователя
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetUserBasket()
        {
            var userCustomer = GetCurrentUser();
            if (userCustomer == null)
                return "У администратора не может быть корзины, так как он не является Customer client";

            var userBasket = db.Orders.GetAll().FirstOrDefault(x => x.CustomerId == userCustomer.CustomerId && x.Status == "Новый");
            if (userBasket != null) { 
                var jsonResult = JsonConvert.SerializeObject(userBasket.OrderElement);
                return jsonResult;
            }
            else
                return "Корзина пуста";
        }

        /// <summary>
        /// Добавление элемента в корзину
        /// </summary>
        /// <param name="item">Элемент Item</param>
        /// <returns></returns>
        [HttpPost]
        public string AddItemToUserBasket(Item item)
        {
            var userCustomer = GetCurrentUser();
            if (userCustomer == null)
                return "Администратор не является Customer client, поэтому не может добавлять товары в корзину";
            Order startOrder;
            if (userCustomer.Order.SingleOrDefault(x => x.Status == "Новый") == null)
            {
                startOrder = new Order()
                {
                    Customer = userCustomer,
                    OrderDate = DateTime.Now,
                    Status = "Новый",
                    OrderNumber = db.Orders.GetOrderNumber()
                };
                db.Orders.Create(startOrder);
            }
            else
                startOrder = userCustomer.Order.SingleOrDefault(x => x.Status == "Новый");

            OrderElement newOrderElement = startOrder.OrderElement.SingleOrDefault(x => x.ItemId == item.ItemId);

            if (newOrderElement != null)
            {
                ChangeItemCountInBasket(item, newOrderElement.ItemsCount + 1);
            }
            else
            {
                newOrderElement = new OrderElement()
                {
                    ItemId = item.ItemId,
                    OrderId = startOrder.OrderId,
                    ItemsCount = 1,
                    ItemPrice = item.Price
                };

                db.OrderElements.Create(newOrderElement);
            }

            db.Save();
            return "successful item element added in basket";
        }

        [HttpPost]
        public string ChangeItemCountInBasket(Item item, int count)
        {
            var userCustomer = GetCurrentUser();
            if (userCustomer == null)
                return "Администратор не может изменять количество товаров в коризне, так как он не является Customer client";
            var userOrder = userCustomer.Order.SingleOrDefault(x => x.Status == "Новый");

            userOrder.OrderElement.SingleOrDefault(x => x.ItemId == item.ItemId).ItemsCount = count;
            db.Save();
            return "successful change item count in basket";
        }

        [HttpGet]
        public string GetItemsCategories()
        {
            var categoriesName = db.Items.GetAll().Select(x => new { CategoryName = x.Category }).Distinct().ToList();
            var jsonresult = JsonConvert.SerializeObject(categoriesName);
            return jsonresult;
        }

        private Customer GetCurrentUser()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            return db.Customers.GetAll().FirstOrDefault(x =>
                                x.CustomerId == user.CustomerId);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}