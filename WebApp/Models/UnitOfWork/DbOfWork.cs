using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models.Repository;

namespace WebApp.Models.UnitOfWork
{
    public class DbOfWork : IDisposable
    {
        private WebAppContext db = new WebAppContext();

        // sql server repositories
        private CustomerRepository CustomerRepository;
        private OrderElementRepository OrderElementRepository;
        private OrderRepository OrderRepository;
        private ItemRepository ItemRepository;

        public CustomerRepository Customers
        {
            get
            {
                if (CustomerRepository == null)
                    CustomerRepository = new CustomerRepository(db);
                return CustomerRepository;
            }
        }

        public OrderElementRepository OrderElements
        {
            get
            {
                if (OrderElementRepository == null)
                    OrderElementRepository = new OrderElementRepository(db);
                return OrderElementRepository;
            }
        }

        public OrderRepository Orders
        {
            get
            {
                if (OrderRepository == null)
                    OrderRepository = new OrderRepository(db);
                return OrderRepository;
            }
        }

        public ItemRepository Items
        {
            get
            {
                if (ItemRepository == null)
                    ItemRepository = new ItemRepository(db);
                return ItemRepository;
            }
        }

        public DbOfWork()
        {
        }

        public void Save()
        {
            db.SaveChanges();
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
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}