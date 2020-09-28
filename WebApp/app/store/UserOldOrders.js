Ext.define('WebApp.store.UserOldOrders', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Order',
    proxy: {
        type: 'ajax',
        url: '/Order/GetOldOrdersByUserId',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});