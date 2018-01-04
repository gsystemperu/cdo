
Ext.define('MyDesktop.app.views.UsuarioMenu', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.usuariosmenu',
    requires : [
        'MyDesktop.app.views.Usuarios',
        'MyDesktop.app.views.Permisos'
    ],
    layout: {
        type: 'fit'
    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [

                {
                    xtype: 'container',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            border:true,
                            id : 'tbUsuarioMenu',
                            // flex: 1,
                            items :[
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Mantenimiento',
                                    items: [
                                       {
                                            text: 'Usuarios',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-cliente2',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Usuarios")}

                                        },
                                        {
                                            text: 'Permisos',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-permisos',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Permisos")}

                                        },
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            region :'center',
                            id   : 'tpContenedorAppUsuarios',
                            activeTab: 0,
                            flex : 8,
                            layoutOnTabChange: true,
                            resizeTabs: true,
                            defaults: {
                                layout: 'fit',
                                autoScroll: true
                            },

                        }
                    ]
                }
            ]//fin container
        });

        me.callParent(arguments);
    },

    getItemClick: function(item){

        tabpanel = Ext.getCmp('tpContenedorAppUsuarios');
        if(!tabpanel.getChildByElement('tab'+item))
        {
            //var loadingMask  = new Ext.LoadMask(tabpanel,{msg:"Cargando..."});
            //loadingMask.show();
            tabpanel.add({
                title: item,
                id   : 'tab'+item,
                closable:true,
                flex: 1,
                items:[
                    {
                        xtype : getVistaUsuariosMostrar(item)

                    }
                ]
            });
            //loadingMask.hide();
        }
        tabpanel.setActiveTab('tab'+item);
    }


});
function getVistaUsuariosMostrar(item){

    var app='';
    switch (item){
        case "Usuarios"                  :   app ="wusuarios";  break;
        case "Permisos"                  :   app ="wpermisos";  break;
    }

    return app;

}
