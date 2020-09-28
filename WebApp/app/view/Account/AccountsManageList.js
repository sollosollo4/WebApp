Ext.define('WebApp.view.Account.AccountsManageList', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.accountsmanagelist', 'Ext.grid.plugin.ColumnResizing'],
    title: 'Редактор пользователей',
    store: 'Accounts',
    forceFit: true,
    initComponent: function () {
        this.tbar = [{
            text: 'Добавить пользователя',
            action: 'add',
            iconCls: 'item-add'
        }];
        this.columns = [
            { header: 'Id', dataIndex: 'Id', width: 5},
            { header: 'Email', dataIndex: 'Email'},
            { header: 'EmailConfirmed', dataIndex: 'EmailConfirmed'},
            { header: 'PasswordHash', dataIndex: 'PasswordHash'},
            { header: 'SecurityStamp', dataIndex: 'SecurityStamp'},
            { header: 'PhoneNumber', dataIndex: 'PhoneNumber'},
            { header: 'PhoneNumberConfirmed', dataIndex: 'PhoneNumberConfirmed'},
            { header: 'TwoFactorEnabled', dataIndex: 'TwoFactorEnabled'},
            { header: 'LockoutEndDateUtc', dataIndex: 'LockoutEndDateUtc'},
            { header: 'LockoutEnabled', dataIndex: 'LockoutEnabled'},
            { header: 'AccessFailedCount', dataIndex: 'AccessFailedCount'},
            { header: 'UserName', dataIndex: 'UserName'},
            { header: 'CustomerId', dataIndex: 'CustomerId'},
            /*{
                header: 'Удалить', 
                xtype: 'actioncolumn', 
                width: 20, 
                align: 'center',
                renderer: function (v, m, r) {
                    var id = Ext.id();
                    Ext.defer(function () {
                        Ext.widget('image', {
                            renderTo: id,
                            name: 'delete',
                            src: '../Content/images/icons/fam/delete.png',
                            width: 18,
                            height: 18,
                            listeners: {
                                afterrender: function (me) {
                                    me.getEl().on('click', function () {
                                        var grid = Ext.ComponentQuery.query('accountsmanagelist')[0];
                                        if (grid) {
                                            var sm = grid.getSelectionModel();
                                            var rs = sm.getSelection();
                                            if (!rs.length) {
                                                Ext.Msg.alert('Информация', 'Вы не выбрали пользователя');
                                                return;
                                            }
                                            Ext.Msg.confirm('Удаление пользователя',
                                            'Вы точно хотите удалить этого пользователя?',
                                            function (button) {
                                                if (button == 'yes') {
                                                    var item = rs[0].getData();
                                                    var id = item.Id;
                                                    Ext.Ajax.request({
                                                        url: '/Account/DeleteAccount',
                                                        method: 'POST',
                                                        jsonData: { 'id': id },
                                                        success: function (response) {
                                                            var grid = Ext.ComponentQuery.query('accountsmanagelist')[0];
                                                            grid.getStore().load();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }, 50);
                    return Ext.String.format('<div id="{0}"></div>', id);
                }
            }*/
        ];
        this.callParent(arguments);
    }
});