Ext.define('WebApp.store.Accounts', {
    extend: 'Ext.data.Store',
    storeId: 'accountsStore',
    model: 'WebApp.model.Account',
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
        'Customer_CustomerId'
    ],
    proxy: {
        type: 'ajax',
        url: 'https://localhost:44341/Account/GetUserStoreAsync',
        reader: {
            type: 'json',
            root: 'items'
        }
    },
    autoLoad: true
});