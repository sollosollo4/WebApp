Ext.define('WebApp.controller.OrdersListManageController', {
    extend: 'Ext.app.Controller',
    stores: ['NewOrders', 'Orders', 'OldOrders'],
    views: ['Order.OrdersManageList'],
    init: function () {
    },
});