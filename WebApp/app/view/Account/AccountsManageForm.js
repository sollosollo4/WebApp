Ext.define('WebApp.view.Account.AccountsManageForm',{
    extend: 'Ext.window.Window',
    alias: 'widget.accountsmanageform',
    title: 'Добавление пользователя',
    width: 400,
    layout: 'fit',
    resizeble: false,
    modal: true,
    config:{
        recordIndex: 0,
        action: ''
    },
    items: [{
        xtype: 'form',
        layout: 'anchor',
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false,
            padding: '5',
            margin: '0 40 0 0'
        },
        items: [{
            name: 'Email',
            fieldLabel: 'Email',
        }, {
            name: 'EmailConfirmed',
            fieldLabel: 'EmailConfirmed',
        }, {
            name: 'PasswordHash',
            fieldLabel: 'PasswordHash',
        }, {
            name: 'SecurityStamp',
            fieldLabel: 'SecurityStamp',
        }, {
            name: 'PhoneNumber',
            fieldLabel: 'PhoneNumber',
        }, {
            name: 'PhoneNumberConfirmed',
            fieldLabel: 'PhoneNumberConfirmed',
        }, {
            name: 'TwoFactorEnabled',
            fieldLabel: 'TwoFactorEnabled',
        }, {
            name: 'LockoutEndDateUtc',
            fieldLabel: 'LockoutEndDateUtc',
        }, {
            name: 'LockoutEnabled',
            fieldLabel: 'LockoutEnabled',
        }, {
            name: 'AccessFailedCount',
            fieldLabel: 'AccessFailedCount',
        }, {
            name: 'UserName',
            fieldLabel: 'UserName',
        }, {
            name: 'CustomerId',
            fieldLabel: 'CustomerId',
        }]
    }],
    buttons: [{
        text: 'Добавить',
        action: 'add'
    }, {
        text: 'Очистить',
        handler: function () {
            this.up('window').down('form').getForm().reset();
        }
    }, {
        text: 'Отменить',
        handler: function () {
            this.up('window').close();
        }
    }]   
});