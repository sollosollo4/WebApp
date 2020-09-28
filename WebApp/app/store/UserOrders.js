Ext.define('WebApp.store.UserOrders', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Order',
    proxy: {
        type: 'ajax',
        url: '/Order/GetOrdersByUserId',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});