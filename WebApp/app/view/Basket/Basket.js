Ext.define('WebApp.view.Basket.Basket', {
    extend: 'Ext.grid.Panel',
    xtype: 'basket',
    store: 'OrderElements',
    title: 'Ваша корзина',   
    forceFit: true,
    initComponent: function(){
        this.columns = [
        /*Код товара*/{
            header: 'Код товара',
            dataIndex: 'Item.Code'
        },
        /*Наименование товара*/{
            header: 'Наименование товара',
            dataIndex: 'Item.Name'
        },
        /*Цена*/{
            header: 'Цена',
            dataIndex: 'ItemPrice'
        },
        /*Количество*/{
            header: 'Количество',
            dataIndex: 'ItemsCount',
            renderer: function(v, m, r){
                var id = Ext.id();
                Ext.defer(function () {
                        Ext.widget('numberfield', {
                            renderTo: id,
                            value: r.data.ItemsCount,
                            forceFit: true,
                            minValue: 1,
                            maxValue: 50,
                            listeners: {
                                change: function(field, value) {
                                    var item = r.data.Item;
                                    var url = 'ItemsList/ChangeItemCountInBasket/';
                                    Ext.Ajax.request({
                                        url: url,
                                        method: 'POST',
                                        jsonData: {'item' : item, 'count' : value},
                                        success: function (response) {
                                        }
                                    });
                                }
                            }
                        });
                    }, 50);
                return Ext.String.format('<div id="{0}"></div>', id);
            }
        }];
        this.callParent();
    }
});