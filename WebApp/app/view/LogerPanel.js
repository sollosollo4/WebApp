Ext.define('WebApp.view.LogerPanel', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.logerPanel',],
    store: 'Loger',
    forceFit: true,
    scroll: true,
    autoScroll: true,
    layout: 'fit',
    initComponent: function () {
        this.columns = [
            {header: 'Время', dataIndex: 'Time', width: 10},
            {header: 'Сообщение', dataIndex: 'logText'}
        ]
        this.callParent(arguments);
    }
});