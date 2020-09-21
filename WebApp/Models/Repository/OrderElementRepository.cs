using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Models.Repository
{
    public class OrderElementRepository : IRepository<OrderElement>
    {
        private WebAppContext db;
        public OrderElementRepository(WebAppContext db)
        {
            this.db = db;
        }

        public void Create(OrderElement item)
        {
            db.OrderElement.Add(item);
        }

        public void Delete(Guid id)
        {
            OrderElement book = db.OrderElement.Find(id);
            if (book != null)
                db.OrderElement.Remove(book);
        }

        public IEnumerable<OrderElement> GetAll()
        {
            return db.OrderElement;
        }

        public OrderElement GetItem(Guid id)
        {
            return db.OrderElement.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(OrderElement item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}