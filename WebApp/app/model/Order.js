Ext.define('WebApp.model.Order', {
    extend: 'Ext.data.Model',
	idProperty: 'OrderId',
    fields: [
		{name : 'CustomerId'}, 
		{name : 'OrderDate'}, 
		{name : 'ShipmentDate'},
		{name : 'OrderNumber'},
		{name : 'Status'}
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
