Ext.define('WebApp.model.OrderElement', {
    extend: 'Ext.data.Model',
	idProperty: 'OrderElementId',
    fields: [
		{name : 'OrderId'}, 
		{name : 'ItemId'}, 
		{name : 'ItemsCount'}, 
		{name : 'ItemPrice'}, 
	],
	hasOne : {
        model : 'Item',
        associationKey : 'item'
    },
	hasOne : {
        model : 'Order',
        associationKey : 'order'
    }
});