Ext.define('WebApp.view.Account.AccountsManageForm',{
    extend: 'Ext.window.Window',
    alias: 'widget.accountsmanageform',
    title: 'Добавление пользователя',
    width: 600,
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
        bodyStyle: {
            backround: 'none',
            padding: '20px',
            margin: '0 40 0 40',
            border: '0'
        },
        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            allowBlank: false
        },
        items: [{
            name: 'Email',
            fieldLabel: 'Email',
        }, {
            name: 'EmailConfirmed',
            fieldLabel: 'EmailConfirmed',
            margin: '0 20 0 0',
        }, {
            name: 'PasswordHash',
            fieldLabel: 'PasswordHash',
            margin: '0 20 0 0',
        }, {
            name: 'SecurityStamp',
            fieldLabel: 'SecurityStamp',
            margin: '0 20 0 0',
        }, {
            name: 'PhoneNumber',
            fieldLabel: 'PhoneNumber',
            margin: '0 20 0 0',
        }, {
            name: 'PhoneNumberConfirmed',
            fieldLabel: 'PhoneNumberConfirmed',
            margin: '0 20 0 0',
        }, {
            name: 'TwoFactorEnabled',
            fieldLabel: 'TwoFactorEnabled',
            margin: '0 20 0 0',
        }, {
            name: 'LockoutEndDateUtc',
            fieldLabel: 'LockoutEndDateUtc',
            margin: '0 20 0 0',
        }, {
            name: 'LockoutEnabled',
            fieldLabel: 'LockoutEnabled',
            margin: '0 20 0 0',
        }, {
            name: 'AccessFailedCount',
            fieldLabel: 'AccessFailedCount',
            margin: '0 20 0 0',
        }, {
            name: 'UserName',
            fieldLabel: 'UserName',
            margin: '0 20 0 0',
        }, {
            name: 'Customer_CustomerId',
            fieldLabel: 'Customer_CustomerId',
            margin: '0 20 0 0',
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