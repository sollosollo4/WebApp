Ext.define('WebApp.view.Item.ItemsManageForm',{
    extend: 'Ext.window.Window',
    alias: 'widget.itemsmanageform',
    title: 'Добавление товара',
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
            padding: '10px',
            border: '0'
        },
        defaults: {
            xtype: 'textfield',
            anchor: '100%'
        },
        items: [{
            name: 'Code',
            fieldLabel: 'Код товара'
        }, {
            name: 'Name',
            fieldLabel: 'Название товара'
        }, {
            name: 'Price',
            fieldLabel: 'Цена'
        }, {
            name: 'Category',
            fieldLabel: 'Категория'
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