Ext.define('WebApp.view.Order.OrdersManageList', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.ordersmanagelist', 'Ext.grid.plugin.ColumnResizing'],
    title: 'Каталог товаров',
    forceFit: true,
    scroll: true,
    autoScroll: true,
    layout: 'fit',
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p><b>Информация о заказчике:</b></p>',
            '<table class="table">',
            '<thead>',
                '<tr>',
                    '<td>Наименования заказчика</td>',
                    '<td>Код заказчика</td>',
                    '<td>Адрес</td>',
                    '<td>Скидка</td>',
                '</tr>',
            '</thead>',
            '<tr>',
                '<td>{Customer.Name}</td>',
                '<td>{Customer.Code}</td>',
                '<td>{Customer.Address}</td>',
                '<td>{Customer.Discount}</td>',
            '</tr>',
            '</table>',

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
            '<tpl>',
            '<input class="cofirm" type="button" value="Подтвердить заказ"/>',
            '<input class="cancel" type="button" value="Отменить заказ"/>',
            '<input class="delete" type="button" value="Удалить заказ"/>',
            '</tpl>'
        )}
    ],
    initComponent: function () {
        this.columns = [
            { header: 'Номер заказа', dataIndex: 'OrderNumber'},
            { header: 'Дата заказа', dataIndex: 'OrderDate'},
            { header: 'Дата доставки', dataIndex: 'ShipmentDate'},
            { header: 'Статус', dataIndex: 'Status'},
        ];
        this.callParent(arguments);
    },
    itemSelector: '.button',
    listeners: {
        itemclick: function(view, record, item, index, e, eOpts){
            if(e.target.type == "button"){
                var UpdateStores = this.UpdateStores;
                var values = record.data;
                var url = '../Order/ChangeOrderStatus/';
                if(e.target.className == "cofirm"){
                    if(values.Status == "Новый"){
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            jsonData: {'order': values, 'currentStatus': 'Выполняется'},
                            success: function (response) {
                                Ext.Msg.alert('Уведомление', 'Заказ был успешно оформлен, теперь его статус "Выполняется"');
                                UpdateStores();
                            },
                            failure: function(response){
                                Ext.Msg.alert('Уведомление', response.responseText);
                            }
                        });
                    }else if(values.Status == "Выполняется"){
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            jsonData: {'order': values, 'currentStatus': 'Выполнен'},
                            success: function (response) {
                                Ext.Msg.alert('Уведомление', 'Заказ был успешно подтверждён, теперь его статус "Выполнен"');
                                UpdateStores();
                            },
                            failure: function(response){
                                Ext.Msg.alert('Уведомление', response.responseText);
                            }
                        });
                    }else if(values.Status == "Выполнен"){
                        Ext.Msg.alert('Уведомление', 'Выбранный заказ уже подтверждён');
                    }
                    
                }else if(e.target.className == "cancel"){
                    if(values.Status == "Выполняется"){
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            jsonData: {'order': values, 'currentStatus': 'Новый'},
                            success: function (response) {
                                Ext.Msg.alert('Уведомление', response.responseText);
                                UpdateStores();
                            },
                            failure: function(response){
                                Ext.Msg.alert('Уведомление', response.responseText);
                            }
                        });
                    }else if(values.Status == "Выполнен"){
                        Ext.Msg.alert('Уведомление', 'Выбранный заказ уже выполнен. Вы не можете его отменить');
                    }else if(values.Status == "Новый"){
                        Ext.Msg.confirm('Уведомление',
                        'Вы уверены что хотите удалить этот заказ? Данное действие удалит заказ из пользовательской корзины',
                        function (button) {
                            if (button == 'yes') {
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'POST',
                                    jsonData: {'order': values, 'currentStatus': 'Удалить'},
                                    success: function (response) {
                                        Ext.Msg.alert('Уведомление', 'Заказ был успешно отменён.');
                                        UpdateStores();
                                    },
                                    failure: function(response){
                                        Ext.Msg.alert('Уведомление', response.responseText);
                                    }
                                });
                            }
                        });
                    }
                }else if(e.target.className == "delete"){
                    Ext.Msg.confirm('Уведомление', 'Вы уверены что хотите удалить этот заказ? Данное действие удалит заказ из системы',
                    function (button) {
                        if (button == 'yes') {
                            Ext.Ajax.request({
                                url: url,
                                method: 'POST',
                                jsonData: {'order': values, 'currentStatus': 'Удалить'},
                                success: function (response) {
                                    Ext.Msg.alert('Уведомление', 'Заказ был успешно удалён из системы');
                                    UpdateStores();
                                },
                                failure: function(response){
                                    Ext.Msg.alert('Уведомление', response.responseText);
                                }
                            });
                        }
                    });
                }
            }
        }
    },
    UpdateStores: function(){
        var NewOrders = Ext.getStore('NewOrders');
        var Orders = Ext.getStore('Orders');
        var OldOrders = Ext.getStore('OldOrders');
        NewOrders.load();
        Orders.load();
        OldOrders.load();
    }
});