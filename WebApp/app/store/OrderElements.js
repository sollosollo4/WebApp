Ext.define('WebApp.store.OrderElements', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.OrderElement',
    proxy: {
        type: 'ajax',
        url: 'https://localhost:44341/ItemsList/GetUserBasket',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: true,
    autoSync: true
});