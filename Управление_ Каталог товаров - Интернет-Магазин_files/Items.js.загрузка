Ext.define('WebApp.store.Items', {
    extend: 'Ext.data.Store',
    storeId: 'itemStore',
    model: 'WebApp.model.Item',
    fields: ['ItemId','Code','Name','Price','Category'],
    proxy: {
        type: 'ajax',
        url: 'https://localhost:44341/ItemsList/GetItem',
        reader: {
            type: 'json',
            root: 'items'
        }
    },
    autoLoad: true
});