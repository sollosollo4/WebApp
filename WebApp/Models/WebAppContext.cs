using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WebApp.Models
{
    public class WebAppContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderElement> OrderElement { get; set; }

        public WebAppContext() : base("WebApp", throwIfV1Schema: false)
        {
        }

        public static WebAppContext Create()
        {
            return new WebAppContext();
        }
    }
}