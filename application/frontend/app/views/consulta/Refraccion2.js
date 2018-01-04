/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.Refraccion2',{
    extend : 'Ext.panel.Panel',
    config:{
        id:0
    },
    alias : 'widget.refraccioningreso2',
    id : 'refraccioningreso2',
    requires: [
        'MyDesktop.app.stores.consultorio.Refraccion',
        'MyDesktop.app.views.servicio.consultorio.RefraccionEditar'
    ],
    initComponent:function(){
       var me = this;
       // @store type => memory
       var storeRefraccionOD  = Ext.create('MyDesktop.app.stores.consultorio.RefraccionOD');
       var storeRefraccionOI  = Ext.create('MyDesktop.app.stores.consultorio.RefraccionOI');

        storeRefraccionOD.load();
        storeRefraccionOI.load();
        
        Ext.applyIf(me, {
            
            items: [
                {
                    xtype : 'panel',
                    title : 'Ojo Derecho',
                    flex : 1,
                    height : 190,
                    overflowX: 'scroll',
                    items : [
                        {
                            border: false,
                            xtype: 'gridpanel',
                            id   : 'dgvRefraccionOjoDerecho2',
                            store : storeRefraccionOD,
                            sortableColumns : false,
                            width : 1300,
                            columns: [
                                {text: "Fecha",width:100,sortable: true,dataIndex: '_fecha',align: 'center'},
                                {text: "Esfera",width:100,sortable: true,dataIndex: '_esfera',align: 'center'},
                                {text: "Cilindro",width:100,sortable: true,dataIndex: '_cilindro',align: 'center'},
                                {text: "Eje",sortable: true,width:100,dataIndex: '_eje',align: 'center'},
                                {
                                    text: "DIP.L",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_dip_l',hidden:true
                                },
                                {
                                    text: "DIP.C",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_dip_c',hidden:true
                                },
                                {
                                    text: "AV",style:'text-aling:center',width:100,sortable: true,align: 'center',
                                    dataIndex: '_av'
                                },
                                {
                                    text: "Adiccion",style:'text-aling:center',flex : 1.5,sortable: true,align: 'center',
                                    dataIndex: '_adiccion',hidden:true
                                    
                                },
                                {
                                    text: "Observacion 1",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_obser1',hidden:true
                                },
                                {
                                    text: "Observacion 2",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_obser2',hidden:true
                                },
                                {
                                    text: "Medico",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_medico',hidden:true
                                }
                            ]
                        }
                    ],
                    tbar: [
                        {
                            xtype : 'button',
                            id : 'btnRefraccionAgregarOD2',
                            text : 'Agregar',
                            iconCls : 'add'
                       },
                        {
                            xtype : 'button',
                            id : 'btnRefraccionEliminarOD2',
                            text : 'Eliminar',
                            iconCls : 'remove'
                        }
                    
                    ]
                },
                {
                    xtype : 'panel',
                    title : 'Ojo Izquierdo',
                    flex : 1,
                    height : 190,
                    overflowX: 'scroll',
                    items : [
                        {
                            border: false,
                            xtype: 'gridpanel',
                            id   : 'dgvRefraccionOjoIzquierdo2',
                            store : storeRefraccionOI,
                            sortableColumns : false,
                            width : 1300,
                            columns: [
                                {text: "Fecha",width:100,sortable: true,dataIndex: '_fecha',align: 'center'},
                                {text: "Esfera",width:100,sortable: true,dataIndex: '_esfera',align: 'center'},
                                {text: "Cilindro",width:100,sortable: true,dataIndex: '_cilindro',align: 'center'},
                                {text: "Eje",sortable: true,width:100,dataIndex: '_eje',align: 'center'},
                                {
                                    text: "DIP.L",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_dip_l',hidden:true
                                },
                                {
                                    text: "DIP.C",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_dip_c',hidden:true
                                },
                                {
                                    text: "AV",style:'text-aling:center',width:100,sortable: true,align: 'center',
                                    dataIndex: '_av'
                                },
                                {
                                    text: "Adiccion",style:'text-aling:center',flex : 1.5,sortable: true,align: 'center',
                                    dataIndex: '_adiccion',hidden:true

                                },
                                {
                                    text: "Observacion 1",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_obser1',hidden:true
                                },
                                {
                                    text: "Observacion 2",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_obser2',hidden:true
                                },
                                {
                                    text: "Medico",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_medico',hidden:true
                                }
                            ]
                        }
                    ],
                    tbar: [
                        {
                            xtype : 'button',
                            id : 'btnRefraccionAgregarOI2',
                            text : 'Agregar',
                            iconCls : 'add'
                        },
                        {
                            xtype : 'button',
                            id : 'btnRefraccionEliminarOI2',
                            text : 'Eliminar',
                            iconCls : 'remove'
                        }

                    ]
                }
            ]
        });
        me.callParent(arguments);
//        Ext.getCmp('dgvRefraccionOjoDerecho').on('itemClick',this.accionSeleccionarGrillaOjoDerecho,this);
//        Ext.getCmp('dgvRefraccionOjoIzquierdo').on('itemClick',this.accionSeleccionarGrillaOjoIzquierdo,this);
//
//        Ext.getCmp('btnRefraccionAgregarOD').on('Click',this.accionAgregarRefraccionOD,this);
//        Ext.getCmp('btnRefraccionAgregarOI').on('Click',this.accionAgregarRefraccionOI,this);
//        Ext.getCmp('btnRefraccionEliminarOI').on('click',this.accionEliminarRefraccionOI,this);
//        Ext.getCmp('btnRefraccionEliminarOD').on('click',this.accionElimnarRefraccionOD,this);
    }
    
    
//    ,
//    accionElimnarRefraccionOD:function(obj){
//        var storeROD = Ext.getCmp('dgvRefraccionOjoDerecho').getStore();
//        storeROD.removeAll();
//    },
//    accionEliminarRefraccionOI:function(obj){
//        var storeROI = Ext.getCmp('dgvRefraccionOjoIzquierdo').getStore();
//        storeROI.removeAll();
//    },
//    accionAgregarRefraccionOD:function(obj){
//        var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.RefraccionEditar');
//        weditar.setTipo('OD');
//        weditar.setEditar(0);
//        weditar.show();
//    },
//    accionAgregarRefraccionOI:function(obj){
//        var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.RefraccionEditar');
//        weditar.setTipo('OI');
//        weditar.setEditar(0);
//        weditar.show();
//    },
//    accionSeleccionarGrillaOjoDerecho:function(obj,record, item, index, e, eOpts ){
//        if(record){
//            var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.RefraccionEditar');
//            weditar.down('form').loadRecord(record);
//            weditar.setTipo('OD');
//            weditar.setEditar(1);
//            weditar.show();
//        }else{
//            Ext.Msg.alert("Aviso","Tiene que seleccionar el item!");
//         }      
//    },
//    accionSeleccionarGrillaOjoIzquierdo:function(obj,record, item, index, e, eOpts){
//        if(record){
//            var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.RefraccionEditar');
//            weditar.down('form').loadRecord(record);
//            weditar.setTipo('OI');
//            weditar.setEditar(1);
//            weditar.show();
//        }else{
//            Ext.Msg.alert("Aviso","Tiene que seleccionar el item!");
//        }
//    }

});
