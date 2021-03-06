Ext.define('WebApp.store.Items', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Item',
    storeId: 'ItemsStore',
    fields: ['ItemId','Code','Name','Price','Category'],
    proxy: {
        type: 'ajax',
        url: '/ItemsList/GetItem',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});