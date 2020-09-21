Ext.onReady(function () {
    Ext.Loader.setConfig({
        enabled: true
    });
    Ext.application({
        name: 'WebApp',
        appFolder: '../../app',
        models: ['Item', 'Order', 'Customer', 'OrderElement', 'Login', 'Register'],
        stores: ['Items'],
        controllers: [
            'ItemsManageListController', 'ItemsUserListController', 
            'RolesController', 'LoginController'
        ],
        autoCreateViewport: false,
        launch: function(){
            WebApp.app.getController('WebApp.controller.RolesController').getRoles();
        }
    });    
});