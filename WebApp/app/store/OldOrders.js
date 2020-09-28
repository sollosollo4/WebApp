Ext.define('WebApp.store.OldOrders', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Order',
    proxy: {
        type: 'ajax',
        url: '/Order/GetOldOrders',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});