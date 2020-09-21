using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Models.Repository
{
    public class CustomerRepository : IRepository<Customer>
    {
        private WebAppContext db;
        public CustomerRepository(WebAppContext db)
        {
            this.db = db;
        }

        public void Create(Customer item)
        {
            db.Customer.Add(item);
        }

        public void Delete(Guid id)
        {
            Customer book = db.Customer.Find(id);
            if (book != null)
                db.Customer.Remove(book);
        }

        public IEnumerable<Customer> GetAll()
        {
            return db.Customer;
        }

        public Customer GetItem(Guid id)
        {
            return db.Customer.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Customer item)
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