namespace WebApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("OrderElement")]
    public partial class OrderElement
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid OrderElementId { get; set; }

        public Guid OrderId { get; set; }

        public Guid ItemId { get; set; }

        public int ItemsCount { get; set; }

        public int ItemPrice { get; set; }

        public virtual Item Item { get; set; }

        public virtual Order Order { get; set; }
    }
}
