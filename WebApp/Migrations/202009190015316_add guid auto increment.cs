namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addguidautoincrement : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Order", "CustomerId", "dbo.Customer");
            DropForeignKey("dbo.AspNetUsers", "Customer_CustomerId", "dbo.Customer");
            DropForeignKey("dbo.OrderElement", "OrderId", "dbo.Order");
            DropForeignKey("dbo.OrderElement", "ItemId", "dbo.Item");
            DropPrimaryKey("dbo.Customer");
            DropPrimaryKey("dbo.Order");
            DropPrimaryKey("dbo.OrderElement");
            DropPrimaryKey("dbo.Item");
            AlterColumn("dbo.Customer", "CustomerId", c => c.Guid(nullable: false, identity: true, defaultValueSql: "newid()"));
            AlterColumn("dbo.Order", "OrderId", c => c.Guid(nullable: false, identity: true, defaultValueSql: "newid()"));
            AlterColumn("dbo.OrderElement", "OrderElementId", c => c.Guid(nullable: false, identity: true, defaultValueSql: "newid()"));
            AlterColumn("dbo.Item", "ItemId", c => c.Guid(nullable: false, identity: true, defaultValueSql: "newid()"));
            AddPrimaryKey("dbo.Customer", "CustomerId");
            AddPrimaryKey("dbo.Order", "OrderId");
            AddPrimaryKey("dbo.OrderElement", "OrderElementId");
            AddPrimaryKey("dbo.Item", "ItemId");
            AddForeignKey("dbo.Order", "CustomerId", "dbo.Customer", "CustomerId", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUsers", "Customer_CustomerId", "dbo.Customer", "CustomerId", cascadeDelete: true);
            AddForeignKey("dbo.OrderElement", "OrderId", "dbo.Order", "OrderId", cascadeDelete: true);
            AddForeignKey("dbo.OrderElement", "ItemId", "dbo.Item", "ItemId", cascadeDelete: true);
        }

        public override void Down()
        {
            DropForeignKey("dbo.OrderElement", "ItemId", "dbo.Item");
            DropForeignKey("dbo.OrderElement", "OrderId", "dbo.Order");
            DropForeignKey("dbo.AspNetUsers", "Customer_CustomerId", "dbo.Customer");
            DropForeignKey("dbo.Order", "CustomerId", "dbo.Customer");
            DropPrimaryKey("dbo.Item");
            DropPrimaryKey("dbo.OrderElement");
            DropPrimaryKey("dbo.Order");
            DropPrimaryKey("dbo.Customer");
            AlterColumn("dbo.Item", "ItemId", c => c.Guid(nullable: false));
            AlterColumn("dbo.OrderElement", "OrderElementId", c => c.Guid(nullable: false));
            AlterColumn("dbo.Order", "OrderId", c => c.Guid(nullable: false));
            AlterColumn("dbo.Customer", "CustomerId", c => c.Guid(nullable: false));
            AddPrimaryKey("dbo.Item", "ItemId");
            AddPrimaryKey("dbo.OrderElement", "OrderElementId");
            AddPrimaryKey("dbo.Order", "OrderId");
            AddPrimaryKey("dbo.Customer", "CustomerId");
            AddForeignKey("dbo.OrderElement", "ItemId", "dbo.Item", "ItemId", cascadeDelete: true);
            AddForeignKey("dbo.OrderElement", "OrderId", "dbo.Order", "OrderId", cascadeDelete: true);
            AddForeignKey("dbo.AspNetUsers", "Customer_CustomerId", "dbo.Customer", "CustomerId", cascadeDelete: true);
            AddForeignKey("dbo.Order", "CustomerId", "dbo.Customer", "CustomerId", cascadeDelete: true);
        }
    }
}
