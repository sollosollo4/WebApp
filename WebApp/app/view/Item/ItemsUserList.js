Ext.define('WebApp.view.Item.ItemsUserList', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.itemsuserlist', 'Ext.grid.plugin.ColumnResizing'],
    title: 'Каталог товаров',
    store: 'Items',
    forceFit: true,
    initComponent: function () {
        this.columns = [
            { header: 'Код товара', dataIndex: 'Code', width: 60},
            { header: 'Название товара', dataIndex: 'Name'},
            { header: 'Цена', dataIndex: 'Price'},
            { header: 'Категория', dataIndex: 'Category'},
            {
                header: 'Добавить в корзину', 
                xtype: 'actioncolumn', 
                width: 40, 
                align: 'center',
                renderer: function (v, m, r) {
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('image', {
                            renderTo: id,
                            name: 'add',
                            src: 'Content/images/icons/fam/add.png',
                            width: 18,
                            height: 18,
                            margin: '9 0 0 0',
                            listeners: {
                                afterrender: function (me) {
                                    me.getEl().on('click', function () {
                                        var grid = Ext.ComponentQuery.query('itemsuserlist')[0];
                                        if (grid) {
                                            var sm = grid.getSelectionModel();
                                            var rs = sm.getSelection();
                                            if (!rs.length) {
                                                Ext.Msg.alert('Информация', 'Вы не выбрали товар');
                                                return;
                                            }
                                            var item = rs[0].getData();
                                            Ext.Ajax.request({
                                                url: '/ItemsList/AddItemToUserBasket',
                                                method: 'POST',
                                                jsonData: item,
                                                success: function (response) {
                                                    Ext.Msg.alert('', 'Товар был успешно добавлен в корзину');
                                                },
                                                failure: function(){
                                                    Ext.Msg.alert('', 'Произошла критическая ошибка! Товар не был добавлен в корзину по неизвестной причине');
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