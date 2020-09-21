Ext.define('WebApp.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginform',
    title: 'Авторизация',
    frame: true,
    resizeble: false,
    modal: true,
    width: 400,
    config:{
        action: ''
    },
    items: [
        {
        xtype: 'form',
        layout: 'anchor',
        bodyStyle: {
            backround: 'none',
            padding: '10px',
            border: '0'
        },
        defaults: {
            xtype: 'textfield',
            anchor: '100%'
        },
        items: [
            {
                fieldLabel: 'Логин',
                name: 'Login',
                emptyText: 'Введите логин'
            },
            {
                fieldLabel: 'Пароль',
                name: 'Password',
                emptyText: 'Введите пароль',
                inputType: 'password'
            },
            {
                xtype:'checkbox',
                fieldLabel: 'Запомнить меня',
                name: 'RememberMe'
            },
            { 
                xtype: 'button',
                text: 'Войти', 
                action: 'Login',
                width: 100
            },
            { 
                xtype: 'button',
                text: 'Регистрация',
                action: 'Register',
                width: 100,
                margin: '5 0 0 0'
            }
        ]}
    ]
});