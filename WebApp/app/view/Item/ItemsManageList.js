Ext.define('WebApp.view.Item.ItemsManageList', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.itemsmanagelist', 'Ext.grid.plugin.ColumnResizing'],
    requires: ['WebApp.view.SearchTrigger'],
    title: 'Каталог товаров',
    store: 'Items',
    forceFit: true,
    initComponent: function () {
        this.tbar = [{
            text: 'Добавить товар',
            action: 'add',
            iconCls: 'item-add'
        }];
        this.columns = [
            { header: 'Код товара', dataIndex: 'Code', width: 60},
            { header: 'Название товара', dataIndex: 'Name',
                items: [{
                    xtype: 'searchtrigger',
                    autoSearch: true
                }]
            },
            { header: 'Цена', dataIndex: 'Price'},
            { header: 'Категория', dataIndex: 'Category',
                items: [{
                    xtype: 'searchtrigger',
                    autoSearch: true
                }]
            },
            {
                header: 'Удалить', 
                xtype: 'actioncolumn', 
                width: 20, 
                align: 'center',
                renderer: function (v, m, r) {
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('image', {
                            renderTo: id,
                            name: 'delete',
                            src: '../Content/images/icons/fam/delete.png',
                            width: 18,
                            height: 18,
                            margin: '9 0 0 0',
                            listeners: {
                                afterrender: function (me) {
                                    me.getEl().on('click', function () {
                                        var grid = Ext.ComponentQuery.query('itemsmanagelist')[0];
                                        if (grid) {
                                            var sm = grid.getSelectionModel();
                                            var rs = sm.getSelection();
                                            if (!rs.length) {
                                                Ext.Msg.alert('Информация', 'Вы не выбрали товар');
                                                return;
                                            }
                                            Ext.Msg.confirm('Удаление товара',
                                            'Вы точно хотите удалить этот товар?',
                                            function (button) {
                                                if (button == 'yes') {
                                                    var item = rs[0].getData();
                                                    var id = item.ItemId;
                                                    Ext.Ajax.request({
                                                        url: '/ItemsListManage/DeleteItem',
                                                        method: 'POST',
                                                        jsonData: { 'id': id },
                                                        success: function (response) {
                                                            var grid = Ext.ComponentQuery.query('itemsmanagelist')[0];
                                                            grid.getStore().load();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }, 50);
                    return Ext.String.format('<div id="{0}"></div>', id);
                }
            }
        ];
        this.callParent(arguments);
    }
});