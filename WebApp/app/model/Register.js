Ext.define('WebApp.model.Register', {
  extend: 'Ext.data.Model',
  fields: [
    {name : 'Login'}, 
    {name : 'OrganizationName'},
    {name : 'Email'},
    {name : 'Password'},
    {name : 'ConfirmPassword'},
  ],
});