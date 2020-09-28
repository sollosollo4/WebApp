Ext.define('WebApp.controller.OrdersListUserController', {
    extend: 'Ext.app.Controller',
    stores: ['UserOrders', 'UserOldOrders'],
    views: ['Order.OrdersUserList'],
    init: function () {
    },
});