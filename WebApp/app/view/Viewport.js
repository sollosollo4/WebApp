Ext.define('WebApp.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['Ext.tab.Panel','Ext.layout.container.Border','WebApp.User.User'],
    alias: 'widget.mainviewport',
    layout: {
        type: 'border'
    },
    id: 'mainviewport',
    // Загрузка компонента
    initComponent: function() {
        var items = [];
        // Панель управления
        items.push({
            xtype: 'panel',
            title: 'Панель управления интернет магазина',
            region: 'north',
            height: 70,
            layout: 'border',
            defaults: {
                margin: '3 40 3 40'
            },
            // Кнопки
            items:[
                /* Каталог товаров */ this.GetCatalogButton(),
                /* Корзина */ this.GetBasketButton(),
                /* Заказы */ this.GetOrdersRedacorButton(),
                /* Заказчики */ this.GetCustomersButton(),
                /* Пользователи */ this.GetAccountsRedacorButton(),
                /* Выйти */ this.GetExitButton()
                //'<a href="/Manage" title="Manage">Параметры учетной записи </a>'
            ]
        },
        /* Панель информация */ {
            xtype: 'panel',
            title: 'Информация',
            region: 'south',
            height: 100,
            split: true,
            maxHeight: 400,
        },
        /* Панель фильтрации */ {
            xtype: 'panel',
            title: 'Фильтрация',
            region: 'west',
            width: 120,
            split: true,
            maxWidth: 400,
            collapsible: true,
        },
        /* Дополнительная панель */ {
            xtype: 'panel',
            title: 'Дополнительная панель',
            region: 'east',
            width: 170,
            collapsible: true,
            border: true,
        });

        // Основная центральная панель с контентом
        items.push({
            xtype: 'tabpanel', 
            region: 'center',
            itemId:'CenterTabPanel',
            focusableContainer: false,
            items: [
                this.GetItemListByRole(),       // Каталог товаров
                this.GetBasket(),               // Корзина
                this.GetRedactorOrders(),       // Редактор заказов
                this.GetRedactorCustomers(),    // Список заказчиков
                this.GetRedactorAccountsView(), // Редактор пользователей
            ]
        });

        Ext.apply(this, {items: items});
        this.callParent(arguments);
    },
    // Кнопки верхней панели
    GetCatalogButton: function(){
        return {
            xtype: 'button',
            text: 'Каталог товаров',
            region: 'west',
            width: 120,
            handler: function() {
                Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(0);
            }
        };
    },
    GetBasketButton: function(){
        return {
            xtype: 'button',
            text: 'Корзина',
            region: 'west',
            width: 120,
            handler: function() {
                Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(1);
            }
        };
    },
    GetOrdersRedacorButton: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {
                xtype: 'button',
                text: 'Редактор заказов',
                region: 'east',
                width: 160,
                handler: function() {
                    Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(2);
                }
            };
        }
        return null;
    },
    GetCustomersButton: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {
                xtype: 'button',
                text: 'Список заказчиков',
                region: 'east',
                width: 160,
                handler: function() {
                    Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(3);
                }
            };
        }
        return null;
    },
    GetAccountsRedacorButton: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {
                    xtype: 'button',
                    text: 'Редактор пользователей',
                    region: 'east',
                    width: 180,
                    handler: function() {
                        Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(4);
                    }
            };
        }
        return null;
    },
    GetExitButton: function(){
        return {
            xtype: 'button',
            width: 120,
            text: 'Выйти',
            region: 'east',
            handler: function(){
                document.getElementById('logoutForm').submit();
            },
            
        };
    },
    // Панель (Все элементы являются TabPageView)
    GetItemListByRole: function() {
        if(WebApp.User.isUserInRole(["manager"])){
            return {xtype: 'itemsmanagelist'};
        }
        else if(WebApp.User.isUserInRole(["customer"])){
            return {xtype: 'itemsuserlist'};
        }
    },
    GetBasket: function() {
        return {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            title: 'Корзина',
            items:[{
                xtype: 'basket',
            }, {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items:[
                /*Выбор даты доставки */{
                    title: 'Выберите дату доставки',
                    xtype: 'datepicker',
                    margin: '40 0 0 0',
                },
                /*Кнопка оформить заказ*/{
                    xtype: 'button',
                    autoWidth: true,
                    margin: '40 0 0 0',
                    text: 'Оформить заказ',
                    handler: function(){
                        var datePickerField = Ext.ComponentQuery.query('datepicker')[0];
                        var url = 'Order/ChangeOrderStatusOrdering/';
                        Ext.Msg.confirm('Оформление заказы',
                        'Вы уверены что хотите оформить заказ?',
                        function (button) {
                            if (button == 'yes') {
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'POST',
                                    jsonData: {'time':datePickerField.getValue()},
                                    success: function (response) {
                                        Ext.Msg.alert('Уведомление', response.responseText);
                                    },
                                    failure: function(response){
                                        Ext.Msg.alert('Уведомление', response.responseText);
                                    }
                                });
                            }
                        });
                    }
                }]
            }]
        };
    },
    GetRedactorOrders: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {xtype: 'panel', title:'Редактор заказов', html: 'Редактор заказов'};
        }
        return null;
    },
    GetRedactorCustomers: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {xtype: 'panel', title:'Список заказчиков', html: 'Список заказчиков'};
        }
        return null;
    },
    GetRedactorAccountsView: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {xtype: 'accountsmanagelist', title:'Редактор пользователей'};
        }
        return null;
    },
});