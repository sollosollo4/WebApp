Ext.define("WebApp.controller.RolesController", {
    extend: 'Ext.app.Controller',
    requires: ['WebApp.User.User'],
    views: ['Viewport'],
    getRoles: function() {
        var roles;
        Ext.Ajax.request({
            url: 'Account/GetUserRoles',
            method: 'GET',
            success: function (response) {
                roles = Ext.decode(response.responseText);
                WebApp.User = Ext.create("WebApp.User.User", {
                    roles: roles
                });
                Ext.create("WebApp.view.Viewport");
            } 
        });
    },
    constructor: function(config) {
        this.initConfig(config);
        this.callParent(arguments);
    }
});