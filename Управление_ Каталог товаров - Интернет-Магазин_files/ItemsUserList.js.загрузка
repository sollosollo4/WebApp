Ext.define('WebApp.view.Item.ItemsUserList', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.itemsuserlist', 'Ext.grid.plugin.ColumnResizing'],
    title: 'Каталог товаров',
    store: 'Items',
    forceFit: true,
    initComponent: function () {
        this.tbar = [{
            text: 'wtf'
        }];
        this.columns = [
            { header: 'Код товара', dataIndex: 'Code', width: 60},
            { header: 'Название товара', dataIndex: 'Name'},
            { header: 'Цена', dataIndex: 'Price'},
            { header: 'Категория', dataIndex: 'Category'},
            { header: 'Добавить в корзину', icon: 'Content/images/icons/fam/add.png'}
        ];
        this.callParent(arguments);
    }
});