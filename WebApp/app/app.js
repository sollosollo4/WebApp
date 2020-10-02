Ext.onReady(function () {
    Ext.Loader.setConfig({
        enabled: true
    });
    Ext.application({
        name: 'WebApp',
        appFolder: '../../app',
        models: ['Item', 'Order', 'Customer', 'OrderElement', 'Loger'],
        stores: [
            'Items', 'Accounts', 'OrderElements', 
            'NewOrders', 'Orders', 'OldOrders',
            'UserOrders', 'UserOldOrders', 'Loger'
        ],
        controllers: [
            'ItemsManageListController',
            'ItemsUserListController',
            'RolesController',
            'AccountsListController',
            'BasketController',
            'OrdersListManageController',
            'OrdersListUserController',
            'LogerPanelController'
        ],
        autoCreateViewport: false,
        launch: function(){
            var controller = WebApp.app.getController('WebApp.controller.RolesController');
            controller.getRoles();
        }
    });    
});