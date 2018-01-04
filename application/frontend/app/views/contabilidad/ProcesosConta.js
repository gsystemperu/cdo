Ext.define('MyDesktop.app.views.contabilidad.ProcesosConta', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.wprocesosconta',
    requires : [
        'MyDesktop.app.views.contabilidad.PlanContable',
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
                            id   : 'tbarMenuConta',
                            border:true,
                            // flex: 1,
                            items :[
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Tablas',
                                    items: [
                                        {
                                            text: 'Plan Contable',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-tool',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemContaClick("Plan Contable")}

                                        }/*,{
                                            text: 'Proveedores',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-proveedor',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Proveedores")}


                                        },{
                                            text: 'Clientes',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-cliente2',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Clientes")}

                                        }*/]
                                },
                                /*{
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Ventas',
                                    items: [
                                        {
                                            text: 'Registrar',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-ventas',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Registro de Contratos")}

                                        },{
                                            text: 'Consultas',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-consultacontrato',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Consultas Contratos")}

                                        },]
                                },
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Compras',
                                    items: [
                                        {
                                            text: 'Registrar',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-compras',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Registro de Ingresos")}
                                        },{
                                            // xtype:'splitbutton',
                                            text: 'Stock',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-stock',
                                            iconAlign: 'top',
                                            handler:function(){me.getItemClick("Stock de Ingresos")}
                                        },]
                                }*/
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            region :'center',
                            id   : 'tpContenedorConta',
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

    getItemContaClick: function(item){

        tabpanel = Ext.getCmp('tpContenedorConta');
        if(!tabpanel.getChildByElement('tab'+item))
        {
            tabpanel.add({
                title: item,
                id   : 'tab'+item,
                closable:true,
                flex: 1,
                items:[
                    {
                        xtype : getVistaContaMostrar(item)

                    }
                ]
            });

        }
        tabpanel.setActiveTab('tab'+item);
    }


});
function getVistaContaMostrar(item){

    var app='';

    switch (item){
        case "Plan Contable"                  :   app ="wplancontable";  break;
       /* case "Registro de Contratos"     :   app ="wcontrato"      ;  break;
        case "Clientes"                  :   app ="wclientes"      ;  break;
        case "Proveedores"               :   app ="wproveedores"   ;  break;
        case "Registro de Ingresos"      :   app ="wcompras"       ; break;
        case "Stock de Ingresos"         :   app ="wstockingresos"       ; break;
        case "Consultas Contratos"       :   app ="wconsultacontratos"       ; break;*/


    }

    return app;

}
