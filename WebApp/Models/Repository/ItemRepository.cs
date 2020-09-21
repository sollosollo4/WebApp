using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp.Models.Repository
{
    public class ItemRepository : IRepository<Item>
    {
        private WebAppContext db;
        public ItemRepository(WebAppContext db)
        {
            this.db = db;
        }

        public void Create(Item item)
        {
            db.Item.Add(item);
        }

        public void Delete(Guid id)
        {
            Item book = db.Item.Find(id);
            if (book != null)
                db.Item.Remove(book);
        }

        public IEnumerable<Item> GetAll()
        {
            return db.Item;
        }

        public Item GetItem(Guid id)
        {
            return db.Item.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Item item)
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