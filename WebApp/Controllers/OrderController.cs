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
    public class OrderController : Controller
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

        public OrderController()
        {
            db = new DbOfWork();
        }

        public OrderController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            db = new DbOfWork();
        }

        [HttpGet]
        public string GetItem()
        {
            List<Order> _list = db.Orders.GetAll().ToList();
            var objer = JsonConvert.SerializeObject(_list);
            return objer;
        }

        [HttpPost]
        public string ChangeOrderStatusOrdering(DateTime time)
        {
            if (time < DateTime.Now || time.Day <= DateTime.Now.Day + 1)
                return "Вы не можете выбрать дату доставки раньше чем сегодня или менее чем за один день!";

            var user = UserManager.FindById(User.Identity.GetUserId());
            var userCustomer = db.Customers.GetAll().FirstOrDefault(x =>
                                x.CustomerId == user.CustomerId);

            var userOrder = db.Orders.GetAll().SingleOrDefault(x => x.CustomerId == userCustomer.CustomerId && x.Status == "Новый");
            if (userOrder == null)
                return "Ваша корзина пуста, наполните её чтобы сделать заказ!";

            userOrder.Status = "Выполняется";
            userOrder.ShipmentDate = time;
            db.Orders.Update(userOrder);
            db.Save();
            return "Заказ успешно оформлен!";
        }
    }
}