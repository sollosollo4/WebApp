Ext.define('WebApp.store.Loger', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Loger',
    sucess:true,
    proxy: { 
        type: 'ajax', 
        url: '', 
        reader: { 
           root: 'data', 
           type: 'json' 
        } 
    }, 
});