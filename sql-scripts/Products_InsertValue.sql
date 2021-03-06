USE [aspnet-WebApp-20200919122739]
GO
/****** Object:  Trigger [dbo].[Products_InsertValue]    Script Date: 19.09.2020 3:16:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Products_InsertValue]
ON [dbo].[Customer]
AFTER INSERT
AS
DECLARE @rCode NVARCHAR(4),
		@Year NVARCHAR(4),
		@NewCustomerCode NVARCHAR(13);
SET @Year = Convert(varchar(4),(YEAR(GETDATE())));
SELECT @rCode = Convert(NVARCHAR(50), CustomerId) FROM inserted;
UPDATE [dbo].[Customer] SET Code = @rCode + '-' + @Year FROM [dbo].[Customer] 
	WHERE CustomerId = (SELECT MAX(CustomerId) FROM [dbo].[Customer]);