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
        items.push({
            xtype: 'panel',
            title: 'Панель управления',
            region: 'north',
            height: 70,
            layout: 'border',
            items:[{
                    xtype: 'button',
                    text: 'Каталог товаров',
                    region: 'west',
                    margin: '0 0 0 40',
                    width: 120,
                    handler: function() {
                        Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(0);
                    }
                },{
                    xtype: 'button',
                    text: 'Корзина',
                    region: 'west',
                    margin: '0 0 0 20',
                    width: 120,
                    handler: function() {
                        Ext.ComponentQuery.query('#CenterTabPanel')[0].getLayout().setActiveItem(1);
                    }
                },
                {
                    xtype: 'button',
                    width: 100,
                    region: 'east',
                    margin: '0 40 0 0',
                    handler: function(){
                        document.getElementById('logoutForm').submit();
                    },
                    text: 'Выйти'
                },
                {},
                //'<a href="/Manage" title="Manage">Параметры учетной записи </a>'
            ]
        },
        {
            xtype: 'panel',
            title: 'Информация',
            region: 'south',
            height: 100,
            split: true,
            maxHeight: 400,
        },
        {
            xtype: 'panel',
            title: 'Фильтрация',
            tools: [{
                type: 'search'}
            ],
            region: 'west',
            width: 120,
            split: true,
            maxWidth: 400,
        },
        {
            xtype: 'panel',
            title: 'Дополнительная панель',
            region: 'east',
            width: 170,
            collapsible: true,
            border: true,
        });

        items.push({
            xtype: 'tabpanel', 
            region: 'center',
            itemId:'CenterTabPanel',
            focusableContainer: false,
            items: [this.GetItemListByRole(),{}]
        });

        Ext.apply(this, {items: items});
        this.callParent(arguments);
        
    },
    GetItemListByRole: function(){
        if(WebApp.User.isUserInRole(["manager"])){
            return {xtype: 'itemsmanagelist'};
        }
        else if(WebApp.User.isUserInRole(["customer"])){
            return {xtype: 'itemsuserlist'};
        }
    },
    GetLogOffForm: function(){
       return {xtype: 'logoff'};
    }
});