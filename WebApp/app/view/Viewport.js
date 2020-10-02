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
                /* Заказы */ this.GetOrdersButton(),
                /* Редактор Заказов */ this.GetOrdersRedacorButton(),
                /* Пользователи */ this.GetAccountsRedacorButton(),
                /* Выйти */ this.GetExitButton()
                //'<a href="/Manage" title="Manage">Параметры учетной записи </a>'
            ]
        },
        /* Панель информация */ {
            xtype: 'panel',
            title: 'Информация',
            region: 'south',
            height: 160,
            split: true,
            maxHeight: 400,
            items: [
                {
                    xtype: 'logerPanel',
                    id: 'logerPanel'
                }
            ]
        },);

        // Основная центральная панель с контентом
        items.push({
            xtype: 'tabpanel', 
            region: 'center',
            itemId:'CenterTabPanel',
            focusableContainer: false,
            items: [
                this.GetItemListByRoleView(),       // Каталог товаров
                this.GetBasketView(),               // Корзина
                this.GetOrdersView(),               // Заказы
                this.GetRedactorOrdersView(),       // Редактор заказов
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
    GetOrdersButton: function(){
        return {
            xtype: 'button',
            width: 120,
            text: 'Заказы',
            region: 'west',
            handler: function(){
                Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(2);
            },
        }
    },
    GetOrdersRedacorButton: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {
                xtype: 'button',
                text: 'Редактор заказов',
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
    GetClearFiltersButton: function(){
        return {
            xtype: 'button',
            text: 'Очистить фильтры',
            handler: function(){
            },
        }
    },
    // Панель (Все элементы являются TabPageView)
    GetItemListByRoleView: function() {
        if(WebApp.User.isUserInRole(["manager"])){
            return {xtype: 'itemsmanagelist'};
        }
        else if(WebApp.User.isUserInRole(["customer"])){
            return {xtype: 'itemsuserlist'};
        }
    },
    GetBasketView: function() {
        return {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            title: 'Корзина',
            /*Панель корзины*/items:[{
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
    GetRedactorOrdersView: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return { 
                xtype: 'panel',
                title: 'Редактор заказов',
                forceFit: true,
                scroll: true,
                autoScroll: true,
                items:[
                /*Новые заказы*/{ 
                    xtype: 'ordersmanagelist', 
                    title:'Новые заказы', 
                    store: 'NewOrders',
                    bind: {
                        store: 'NewOrders'
                    },
                },
                /*Выполняемые заказы*/{
                    xtype: 'ordersmanagelist', 
                    title:'В процессе', 
                    store: 'Orders',
                    bind: {
                        store: 'Orders'
                    },
                },
                /*Выполненные*/{
                    xtype: 'ordersmanagelist', 
                    title:'Архив заказов', 
                    store: 'OldOrders',
                    bind: {
                        store: 'OldOrders'
                    },
                }]
            }
        }
        return null;
    },
    GetRedactorAccountsView: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {xtype: 'accountsmanagelist', title:'Редактор пользователей'};
        }
        return null;
    },
    GetOrdersView: function(){
        return {
            xtype: 'panel', 
            title: 'Заказы',
            forceFit: true,
            scroll: true,
            autoScroll: true, 
            items: [
                {
                    xtype: 'ordersuserlist', 
                    title: 'Заказы в процессе',
                    store: 'UserOrders'},
                {
                    xtype: 'ordersuserlist', 
                    title: 'Выполненные заказы',
                    store: 'UserOldOrders'
                }
            ]}
    }
});