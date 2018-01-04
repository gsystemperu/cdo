
Ext.define('MyDesktop.RegistroContabilidad', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.app.views.contabilidad.ProcesosConta'],
    id:'w-contabilidad',

    init : function(){
        this.launcher = {
            text: 'Sistema de Contabilidad Basica',
            iconCls:'notepad'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('w-contabilidad');
        if(!win){
            win = desktop.createWindow({
                id: 'w-contabilidad',
                title:':__: ERP  CONTABILIDAD :__:' ,
                width:1200,
                height:800,
                iconCls: 'notepad',
                animCollapse:false,
                border: false,
                layout: 'fit',
                closeAction :'destroy',
                items: [
                    {
                        xtype: 'wprocesosconta'

                    }
                ]
            });
        }
        return win;
    }
});
