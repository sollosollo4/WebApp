Ext.define('WebApp.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:['Ext.tab.Panel','Ext.layout.container.Border','WebApp.User.User'],
    alias: 'widget.mainviewport',
    layout: {
        type: 'border'
    },
    id: 'mainviewport',
    initComponent: function() {
        var items = [];
        // Панель управления
        items.push({
            xtype: 'panel',
            title: 'Панель управления',
            region: 'north',
            height: 70,
            layout: 'border',
            // Кнопки
            items:[
                /* Каталог товаров */ {
                    xtype: 'button',
                    text: 'Каталог товаров',
                    region: 'west',
                    margin: '0 0 0 40',
                    width: 120,
                    handler: function() {
                        Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(0);
                    }
                },
                /* Корзина */ {
                    xtype: 'button',
                    text: 'Корзина',
                    region: 'west',
                    margin: '0 0 0 20',
                    width: 120,
                    handler: function() {
                        Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(1);
                    }
                },
                /* Заказы */ this.GetOrdersRedacorButton(),
                /* Заказчики */ this.GetCustomersButton(),
                /* Пользователи */ this.GetAccountsRedacorButton(),
                /* Выйти */ {
                    xtype: 'button',
                    width: 120,
                    text: 'Выйти',
                    region: 'east',
                    margin: '0 20 0 0',
                    handler: function(){
                        document.getElementById('logoutForm').submit();
                    },
                    
                },
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
        /* Панель филтрации */ {
            xtype: 'panel',
            title: 'Фильтрация',
            tools: [{
                type: 'search'
            }],
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
    GetOrdersRedacorButton: function() {
        if(WebApp.User.isUserInRole(["manager","admin"])){
            return {
                xtype: 'button',
                text: 'Редактор заказов',
                region: 'east',
                margin: '0 20 0 0',
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
                margin: '0 20 0 0',
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
                    margin: '0 20 0 0',
                    width: 180,
                    handler: function() {
                        Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(4);
                    }
            };
        }
        return null;
    },
    // Панель
    GetItemListByRole: function() {
        if(WebApp.User.isUserInRole(["manager"])){
            return {xtype: 'itemsmanagelist'};
        }
        else if(WebApp.User.isUserInRole(["customer"])){
            return {xtype: 'itemsuserlist'};
        }
    },
    GetBasket: function() {
        return {xtype: 'panel', title:'Корзина', html: 'Корзина'};
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