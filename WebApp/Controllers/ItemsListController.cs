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