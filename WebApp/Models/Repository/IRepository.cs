using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Repository
{
    public interface IRepository<T> : IDisposable 
        where T : class
    {
        IEnumerable<T> GetAll();
        T GetItem(Guid id);
        void Create(T item);
        void Update(T item);
        void Delete(Guid id);
        void Save();
    }
}