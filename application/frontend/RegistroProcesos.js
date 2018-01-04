
Ext.define('MyDesktop.RegistroProcesos', {
    extend: 'Ext.ux.desktop.Module',
   requires: ['MyDesktop.app.views.Procesos'],
    id:'w-procesos',

    init : function(){
        this.launcher = {
            text: 'Sistema de Ventas / Compras',
            iconCls:'notepad'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('w-procesos');
        if(!win){
            win = desktop.createWindow({
                id: 'w-procesos',
                title:':__: Clinica De Los Ojos :__:' ,
                width:1200,
                height:810,
                iconCls: 'notepad',
                animCollapse:false,
                border: false,
                layout: 'fit',
                closeAction :'destroy',
                items: [
                    {
                       xtype: 'wprocesos'
                       
                    }
                ]
            });
        }
        return win;
    }
});
