Ext.onReady(function () {
    Ext.Loader.setConfig({
        enabled: true
    });
    Ext.application({
        name: 'WebApp',
        appFolder: '../../app',
        models: ['Item', 'Order', 'Customer', 'OrderElement'],
        stores: ['Items'],
        controllers: [
            'ItemsManageListController', 'ItemsUserListController', 
            'RolesController',        ],
        autoCreateViewport: false,
        launch: function(){
            var controller = WebApp.app.getController('WebApp.controller.RolesController')
            controller.getRoles();
        }
    });    
});