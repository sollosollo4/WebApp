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
    [Authorize(Roles="admin,manager")]
    public class ItemsListManageController : Controller
    {
        private DbOfWork db;
        public ItemsListManageController()
        {
            db = new DbOfWork();
        }

        [HttpGet]
        public JsonResult GetItem()
        {
            List<Item> _list = db.Items.GetAll().ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public string DeleteItem(Guid id)
        {
            db.Items.Delete(id);
            db.Save();
            return "Remove Success";
        }

        [HttpPost]
        public string AddItem(Item item)
        {
            if (ModelState.IsValid)
            {
                db.Items.Create(item);
                db.Save();
                return "Success";

            }
            return "Fail";

        }

        [HttpPost]
        public string EditItem(Item item, Guid id)
        {
            if (ModelState.IsValid)
            {
                item.ItemId = id;
                db.Items.Update(item);
                db.Save();
                return "Success";
            }
            return "Fail";
        }

        // GET: Item
        public ActionResult Index()
        {
            return View();
        }
    }
}