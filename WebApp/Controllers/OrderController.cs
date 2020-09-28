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

        [Authorize(Roles = "admin,manager")]
        [HttpGet]
        public string GetNewOrders()
        {
            List<Order> _list = db.Orders.GetAll().Where(x => x.Status == "Новый").ToList();
            var objer = JsonConvert.SerializeObject(_list);
            return objer;
        }

        [Authorize(Roles = "admin,manager")]
        [HttpGet]
        public string GetOrders()
        {
            List<Order> _list = db.Orders.GetAll().Where(x => x.Status == "Выполняется").ToList();
            var objer = JsonConvert.SerializeObject(_list);
            return objer;
        }

        [Authorize(Roles = "admin,manager")]
        [HttpGet]
        public string GetOldOrders()
        {
            List<Order> _list = db.Orders.GetAll().Where(x => x.Status == "Выполнен").ToList();
            var objer = JsonConvert.SerializeObject(_list);
            return objer;
        }

        [HttpPost]
        public string ChangeOrderStatusOrdering(DateTime time)
        {
            if (time < DateTime.Now)
                return "Вы не можете выбрать дату доставки раньше чем сегодня!";

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

        [Authorize(Roles = "admin,manager")]
        [HttpPost]
        public string ChangeOrderStatus(Order order, string currentStatus)
        {
            try
            {
                var changeorder = db.Orders.GetItem(order.OrderId);
                if (currentStatus != "Удалить")
                {
                    if (currentStatus == "Новый" && changeorder.Status == "Выполняется")
                    {
                        var haveCustomerOrder = db.Orders.GetAll().SingleOrDefault(x => x.CustomerId == order.CustomerId && x.Status == "Новый");
                        if (haveCustomerOrder != null)
                            return "У данного Customer больше не может быть заказов со статусом \"Новый\"";
                        else
                        {
                            changeorder.Status = currentStatus;
                            db.Orders.Update(changeorder);
                            db.Save();
                            return "Заказ был успешно отменён, теперь его статус \"Новый\". Обновите страницу";
                        }
                    }
                    changeorder.Status = currentStatus;
                    db.Orders.Update(changeorder);
                    db.Save();
                    return "Заказ был успешно отменён, теперь его статус \"Новый\". Обновите страницу";
                }
                else
                {
                    db.Orders.Delete(changeorder.OrderId);
                    db.Save();
                    return "Успешно удалён";
                }
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        [Authorize]
        [HttpGet]
        public string GetOrdersByUserId()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            var userCustomer = db.Customers.GetAll().FirstOrDefault(x =>
                                x.CustomerId == user.CustomerId);
            if (userCustomer == null)
                return "Администратор не имеет [userCustomer object]";
            var ordersList = db.Orders.GetAll().Where(x => x.CustomerId == userCustomer.CustomerId && x.Status == "Выполняется").ToList();
            
            var objer = JsonConvert.SerializeObject(ordersList);
            return objer;
        }

        [Authorize]
        [HttpGet]
        public string GetOldOrdersByUserId()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            var userCustomer = db.Customers.GetAll().FirstOrDefault(x =>
                                x.CustomerId == user.CustomerId);
            if (userCustomer == null)
                return "Администратор не имеет [userCustomer object]";
            var ordersList = db.Orders.GetAll().Where(x => x.CustomerId == userCustomer.CustomerId && x.Status == "Выполнен").ToList();

            var objer = JsonConvert.SerializeObject(ordersList);
            return objer;
        }
    }
}