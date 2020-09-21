namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatecustomer : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customer", "Code", c => c.String(maxLength: 14, defaultValue: "0000-2020", nullable: true));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Customer", "Code", c => c.String(nullable: false, maxLength: 14));
        }
    }
}
