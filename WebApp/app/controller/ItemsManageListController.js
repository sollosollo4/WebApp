Ext.define('WebApp.controller.ItemsManageListController', {
    extend: 'Ext.app.Controller',
    stores: ['Items'],
    views: ['Item.ItemsManageList', 'Item.ItemsManageForm'],
    refs: [{
        ref: 'formWindow',
        xtype: 'itemsmanageform',
        selector: 'itemsmanageform',
        autoCreate: true
    }],
    init: function () {
        this.control({
            'itemsmanagelist > toolbar > button[action=add]': {
                click: this.showAddForm
            },
            'itemsmanagelist': {
                itemdblclick: this.onRowdblclick
            },
            'itemsmanageform button[action=add]': {
                click: this.doAddItem
            }
        });
    },
    onRowdblclick: function (me, record, item, index) {
        var win = this.getFormWindow();
        win.setTitle('Изменение товара');
        win.setAction('edit');
        win.setRecordIndex(index);
        win.down('form').getForm().setValues(record.getData());
        win.show();
    },
    showAddForm: function () {
        var win = this.getFormWindow();
        win.setTitle('Добавление товара');
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
        var grid = Ext.ComponentQuery.query('itemslist')[0];
        var id = 0;
        if (grid) {
            var sm = grid.getSelectionModel();
            var rs = sm.getSelection();
            if (rs.length) {
                var item = rs[0].getData();
                id = item.ItemId;
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
                var grid = Ext.ComponentQuery.query('itemsmanagelist')[0];
                grid.getStore().load();
            }
        });
        win.close();
    }
});