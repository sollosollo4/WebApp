Ext.define('WebApp.view.Order.OrdersUserList', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.ordersuserlist', 'Ext.grid.plugin.ColumnResizing'],
    forceFit: true,
    scroll: true,
    autoScroll: true,
    layout: 'fit',
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p><b>Информация об элементах заказа:</b></p>',
            '<table class="table">',
            '<thead>',
                '<tr>',
                    '<td>Код товара</td>',
                    '<td>Наименование товара</td>',
                    '<td>Цена</td>',
                    '<td>Количество</td>',
                '</tr>',
            '</thead>',
                '<tpl for="OrderElement">',
                    '<tr>',
                        '<td>{Item.Code}</td>',
                        '<td>{Item.Name}</td>',
                        '<td>{Item.Price}</td>',
                        '<td>{ItemsCount}</td>',
                    '</tr>',
                '</tpl>',
            '</table>',
        )}
    ],
    initComponent: function () {
        this.columns = [
            { header: 'Номер заказа', dataIndex: 'OrderNumber',
                items: [{
                    xtype: 'searchtrigger',
                    autoSearch: true
                }]
            },
            { header: 'Дата заказа', dataIndex: 'OrderDate',
                items: [{
                    xtype: 'searchtrigger',
                    autoSearch: true
                }]
            },
            { header: 'Дата доставки', dataIndex: 'ShipmentDate',
                items: [{
                    xtype: 'searchtrigger',
                    autoSearch: true
                }]
            },
            { header: 'Статус', dataIndex: 'Status',
                items: [{
                    xtype: 'searchtrigger',
                    autoSearch: true
                }]
            },
        ];
        this.callParent(arguments);
    },
});