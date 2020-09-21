using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Models.Repository
{
    public class OrderRepository : IRepository<Order>
    {
        private WebAppContext db;
        public OrderRepository(WebAppContext db)
        {
            this.db = db;
        }

        public void Create(Order item)
        {
            db.Order.Add(item);
        }

        public void Delete(Guid id)
        {
            Order book = db.Order.Find(id);
            if (book != null)
                db.Order.Remove(book);
        }

        public IEnumerable<Order> GetAll()
        {
            return db.Order;
        }

        public Order GetItem(Guid id)
        {
            return db.Order.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Order item)
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