Ext.define('WebApp.store.Accounts', {
    extend: 'Ext.data.Store',
    model: 'WebApp.model.Account',
    storeId: 'AccountsStore',
    fields: [
        'Id',
        'Email',
        'EmailConfirmed',
        'PasswordHash',
        'SecurityStamp',
        'PhoneNumber', 
        'PhoneNumberConfirmed',
        'TwoFactorEnabled',
        'LockoutEndDateUtc',
        'LockoutEnabled',
        'AccessFailedCount',
        'UserName', 
        'CustomerId'
    ],
    proxy: {
        type: 'ajax',
        url: '/Account/GetUserStoreAsync',
        reader: {
            type: 'json',
            root: 'items'
        }
    },
    autoLoad: true
});