
Ext.define('MyDesktop.RegistroUsuario', {
    extend: 'Ext.ux.desktop.Module',
    
    requires: [
        'MyDesktop.app.views.UsuarioMenu',
    ],

    id:'w-usuarios',

    init : function(){
        this.launcher = {
            text: 'Usuarios y Permisos',
            iconCls:'notepad'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('w-usuarios');
        if(!win){
            win = desktop.createWindow({
                id: 'w-usuarios',
                title:'Usuarios y Permisos del Sistema',
                width:950,
                height:460,
                iconCls: 'notepad',
                animCollapse:false,
                border: false,
                layout: 'fit',
                closeAction :'destroy',
                items: [
                    {
                        xtype: 'usuariosmenu',

                    }
                ]
            });
        }
        return win;
    }
});
