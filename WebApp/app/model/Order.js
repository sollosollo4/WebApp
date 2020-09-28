Ext.define('WebApp.model.Order', {
    extend: 'Ext.data.Model',
    fields: [
		{name : 'OrderId'}, 
		{name : 'CustomerId'}, 
		{name : 'OrderDate'},
		{name : 'ShipmentDate'},
		{name : 'OrderNumber'},
		{name : 'Status'},
		{name : 'Customer', mapping: 'Customer'},
		{name : 'OrderElement', mapping: 'OrderElement'},
	],
	hasMany : {
        model : 'OrderElement',
        associationKey : 'orderelementss'
    },
	hasOne : {
        model : 'Customer',
        associationKey : 'customer'
    }
});
