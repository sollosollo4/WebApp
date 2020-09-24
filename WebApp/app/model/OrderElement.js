Ext.define('WebApp.model.OrderElement', {
    extend: 'Ext.data.Model',
    fields: [
        {name : 'OrderElementId'},
		{name : 'OrderId'}, 
		{name : 'ItemId'}, 
		{name : 'ItemsCount'}, 
        {name : 'ItemPrice'},
        {name : 'Item', mapping: 'Item'},
        {name : 'Item.Code', mapping: 'Item.Code'},
        {name : 'Item.Name', mapping: 'Item.Name'}
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