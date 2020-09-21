Ext.define('WebApp.model.Customer', {
    extend: 'Ext.data.Model',
	idProperty : 'CustomerId', 
    fields: [
		{name : 'Name'}, 
		{name : 'Code'}, 
		{name : 'Addres'},
		{name : 'Discount'}
	],
	hasMany : {
        model : 'Order',
        associationKey : 'orders'
    }
});
