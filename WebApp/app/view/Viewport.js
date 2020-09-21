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
                },{
                    xtype: 'button',
                    text: 'Авторизация',
                    region: 'east',
                    margin: '0 20 0 0',
                    width: 120,
                    handler: function() {
                        WebApp.app.getController('WebApp.controller.LoginController').ShowForm();
                    }
                },{
                    xtype: 'button',
                    text: 'Регистрация',
                    region: 'east',
                    margin: '0 40 0 0',
                    width: 120,
                    handler: function() {
                    }
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    width: 200,
                    margin: '0 180 0 0',
                    bodyStyle: 'background:transparent;',
                    border: false,
                    region: 'east',
                    html: '<form action="/Account/LogOff" class="navbar-right" id="logoutForm" method="post">'+
                            '<input name="__RequestVerificationToken" type="hidden" value="ZHOpUVNJbCyxXZ7KSO5JWgHtAXC_7maNhpc3Wj8uocehmFSZsiHVHbs-KcNPTw5W21-9OZFh-UlITwXrsXMCC_nX-rx7dtLnZywUir0_G2-y0JyVTDHno9mXNpZHERk9bFpcXLL8FUCGBL58H2K4gQ2">' +
                            '<a href="/Manage" title="Manage">Здравствуйте </a>' +
                            '<a href="javascript:document.getElementById(\'logoutForm\').submit()">Выйти</a>'
                }
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
    GetUserName: async function(){
        var url = "Account/GetUserName";
        let promise = new Promise((resolve, reject)=>{
             Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: resolve
            });
        })
        let result = await promise;
        return result.responseText;
    },
});