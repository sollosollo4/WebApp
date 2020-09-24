Ext.define('WebApp.model.Item', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'ItemId'},
		{name: 'Code'}, 
		{name: 'Name'}, 
		{name: 'Price'}, 
		{name: 'Category'},
	],
	hasMany : {
        model : 'OrderElement',
        associationKey : 'orderelements'
    }
});