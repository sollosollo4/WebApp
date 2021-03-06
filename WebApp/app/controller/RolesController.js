Ext.define("WebApp.controller.RolesController", {
    extend: 'Ext.app.Controller',
    requires: ['WebApp.User.User'],
    views: ['Viewport'],
    getRoles: function() {
        var roles;
        try{
            Ext.Ajax.request({
                url: 'https://localhost:44341/Account/GetUserRoles',
                method: 'GET',
                success: function (response) {
                    if(response.responseText){
                        roles = Ext.decode(response.responseText);
                        WebApp.User = Ext.create("WebApp.User.User", {
                            roles: roles
                        });
                        Ext.create("WebApp.view.Viewport");
                        var logstore = Ext.getStore('Loger');
                        logstore.add({Time: Ext.Date.format(new Date(), 'H:i'), logText: 'Добро пожаловать в интернет магазин!'});
                        logstore.load();
                    }
                } 
            });
        }catch(e){
        }
    },
    constructor: function(config) {
        this.initConfig(config);
        this.callParent(arguments);
    }
});