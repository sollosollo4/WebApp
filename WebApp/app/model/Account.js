Ext.define('WebApp.model.Account', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Id'},
        {name: 'Email'},
        {name: 'EmailConfirmed'},
        {name: 'PasswordHash'},
        {name: 'SecurityStamp'},
        {name: 'PhoneNumber'}, 
        {name: 'PhoneNumberConfirmed'},
        {name: 'TwoFactorEnabled'},
        {name: 'LockoutEndDateUtc'},
        {name: 'LockoutEnabled'},
        {name: 'AccessFailedCount'},
        {name: 'UserName'}, 
        {name: 'CustomerId'},
    ]
});