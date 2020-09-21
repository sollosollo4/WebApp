Ext.define('WebApp.controller.AccountsListController', {
    extend: 'Ext.app.Controller',
    stores: ['Accounts'],
    views: ['Account.AccountsManageList', 'Account.AccountsManageForm'],
    refs: [{
        ref: 'formWindow',
        xtype: 'accountsmanageform',
        selector: 'accountsmanageform',
        autoCreate: true
    }],
    init: function () {
        this.control({
            'accountsmanagelist > toolbar > button[action=add]': {
                click: this.showAddForm
            },
            'accountsmanagelist': {
                itemdblclick: this.onRowdblclick
            },
            'accountsmanageform button[action=add]': {
                click: this.doAddItem
            }
        });
    },
    onRowdblclick: function (me, record, item, index) {
        console.log(this);
        var win = this.getFormWindow();
        win.setTitle('Изменение пользователя');
        win.setAction('edit');
        win.setRecordIndex(index);
        win.down('form').getForm().setValues(record.getData());
        win.show();
    },
    showAddForm: function () {
        var win = this.getFormWindow();
        win.setTitle('Добавление пользователя');
        win.setAction('add');
        win.down('form').getForm().reset();
        win.show();
    },
    doAddItem: function () {
        var win = this.getFormWindow();
        var store = this.getItemsStore();
        var values = win.down('form').getValues();
        debugger;
        var action = win.getAction();
        var grid = Ext.ComponentQuery.query('accountsmanagelist')[0];
        var id = 0;
        if (grid) {
            var sm = grid.getSelectionModel();
            var rs = sm.getSelection();
            if (rs.length) {
                var item = rs[0].getData();
                id = item.Id;
            }
        }
        else
            var url = '';


        if (action == 'edit') {
            url = '/ItemsListManage/EditItem?id=' + id;
        }
        else {
            url = '/ItemsListManage/AddItem';
        }
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: values,
            success: function (response) {
                var grid = Ext.ComponentQuery.query('accountsmanagelist')[0];
                grid.getStore().load();
            }
        });
        win.close();
    }
});