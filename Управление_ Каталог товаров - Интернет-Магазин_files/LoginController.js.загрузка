Ext.define('WebApp.controller.LoginController', {
    extend: 'Ext.app.Controller',
    stores: ['Accounts'],
    views: ['Login'],
    refs: [{
        ref: 'loginWindow',
        xtype: 'loginform',
        selector: 'loginform',
        autoCreate: true
    }],
    init: function () {
        this.control({
            'loginform button[action=Login]': {
                click: this.Login
            },
            'loginform button[action=Register]': {
                click: this.Register
            }
        });
    },
    ShowForm: function(){
        var win = this.getLoginWindow();
        win.setTitle('Авторизация');
        win.show();
    },
    Login: function(){
        var win = this.getLoginWindow();
        var values = win.down('form').getValues();
        debugger;
        if(values.Login)
        {
            var url = "Account/Login";
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                jsonData: values,
                success: function (response) {

                },
                failure: function(request){
                    
                }
            });
            win.close();
        }
    },
    Register: function(){
        
    }
});