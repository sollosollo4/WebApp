Ext.define('WebApp.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Order',
    proxy: {
        type: 'ajax',
        url: '/Order/GetOrders',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});