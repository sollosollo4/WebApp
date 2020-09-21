Ext.define('WebApp.model.Item', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'ItemId', type: 'uuid'},
		{name: 'Code', type: 'string'}, 
		{name: 'Name', type: 'string'}, 
		{name: 'Price', type: 'int'}, 
		{name: 'Category', type: 'string'},
	],
	hasMany : {
        model : 'OrderElement',
        associationKey : 'orderelements'
    }
});