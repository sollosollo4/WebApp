Ext.define('WebApp.store.NewOrders', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Order',
    proxy: {
        type: 'ajax',
        url: '/Order/GetNewOrders',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});