
Ext.define('MyDesktop.app.views.servicio.consultorio.LenteContacto',{
    extend : 'Ext.panel.Panel',
    config:{
        id:0
    },
    alias : 'widget.lentecontactoingreso',
    id : 'lentecontactoingreso',
    requires: [
        'MyDesktop.app.stores.consultorio.LenteContacto',
        'MyDesktop.app.views.servicio.consultorio.LenteContactoEditar'
    ],
    initComponent:function(){
        var me = this;
        // @store type => memory
        var storeLenteContactoOD  = Ext.create('MyDesktop.app.stores.consultorio.LenteContactoOD');
        var storeLenteContactoOI  = Ext.create('MyDesktop.app.stores.consultorio.LenteContactoOI');

        storeLenteContactoOD.load();
        storeLenteContactoOI.load();

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
                            id   : 'dgvLenteContactoOjoDerecho',
                            store : storeLenteContactoOD,
                            sortableColumns : false,
                            width : 1300,
                            columns: [
                                {text: "Fecha",flex: 1,sortable: true,dataIndex: '_fecha',align: 'center'},
                                {text: "Esfera",flex: 0.8,sortable: true,dataIndex: '_esfera',align: 'center'},
                                {text: "Cilindro",flex : 0.8,sortable: true,dataIndex: '_cilindro',align: 'center'},
                                {text: "Eje",sortable: true,flex : 0.8,dataIndex: '_eje',align: 'center'},
                                {
                                    text: "Radio",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_radio'
                                },
                                {
                                    text: "Potencia",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_potencia'
                                },
                                {
                                    text: "Diametro",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_diametro'
                                },
                                {
                                    text: "Curva",style:'text-aling:center',flex : 1.5,sortable: true,align: 'center',
                                    dataIndex: '_curva'

                                },
                                {
                                    text: "Tipo",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_tipo'
                                },
                                {
                                    text: "Observacion",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_obser'
                                },
                                {
                                    text: "Medico",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_medico'
                                }
                            ]
                        }
                    ],
                    tbar: [
                        {
                            xtype : 'button',
                            id : 'btnLenteContactoAgregarOD',
                            text : 'Agregar',
                            iconCls : 'add'
                        },
                        {
                            xtype : 'button',
                            id : 'btnLenteContactoEliminarOD',
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
                            id   : 'dgvLenteContactoOjoIzquierdo',
                            store : storeLenteContactoOI,
                            sortableColumns : false,
                            width : 1300,
                            columns: [
                                {text: "Fecha",flex: 1,sortable: true,dataIndex: '_fecha',align: 'center'},
                                {text: "Esfera",flex: 0.8,sortable: true,dataIndex: '_esfera',align: 'center'},
                                {text: "Cilindro",flex : 0.8,sortable: true,dataIndex: '_cilindro',align: 'center'},
                                {text: "Eje",sortable: true,flex : 0.8,dataIndex: '_eje',align: 'center'},
                                {
                                    text: "Radio",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_radio'
                                },
                                {
                                    text: "Potencia",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_potencia'
                                },
                                {
                                    text: "Diametro",style:'text-aling:center',flex : 0.8,sortable: true,align: 'center',
                                    dataIndex: '_diametro'
                                },
                                {
                                    text: "Curva",style:'text-aling:center',flex : 1.5,sortable: true,align: 'center',
                                    dataIndex: '_curva'

                                },
                                {
                                    text: "Tipo",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_tipo'
                                },
                                {
                                    text: "Observacion",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_obser'
                                },
                                {
                                    text: "Medico",style:'text-aling:center',flex : 2,sortable: true,align: 'right',
                                    dataIndex: '_medico'
                                }
                            ]
                        }
                    ],
                    tbar: [
                        {
                            xtype : 'button',
                            id : 'btnLenteContactoAgregarOI',
                            text : 'Agregar',
                            iconCls : 'add'
                        },
                        {
                            xtype : 'button',
                            id : 'btnLenteContactoEliminarOI',
                            text : 'Eliminar',
                            iconCls : 'remove'
                        }

                    ]
                }
            ]
        });
        me.callParent(arguments);
        Ext.getCmp('dgvLenteContactoOjoDerecho').on('itemClick',this.accionSeleccionarGrillaOjoDerechoLC,this);
        Ext.getCmp('dgvLenteContactoOjoIzquierdo').on('itemClick',this.accionSeleccionarGrillaOjoIzquierdoLC,this);

        Ext.getCmp('btnLenteContactoAgregarOD').on('Click',this.accionAgregarLenteContactoOD,this);
        Ext.getCmp('btnLenteContactoAgregarOI').on('Click',this.accionAgregarLenteContactoOI,this);
        Ext.getCmp('btnLenteContactoEliminarOD').on('Click',this.accionEliminarLenteContactoOD,this);
        Ext.getCmp('btnLenteContactoEliminarOI').on('Click',this.accionEliminarLenteContactoOI,this);
    },
    accionEliminarLenteContactoOD:function(obj){
        var storeROD = Ext.getCmp('dgvLenteContactoOjoDerecho').getStore();
        storeROD.removeAll();
    },
    accionEliminarLenteContactoOI:function(obj){
        var storeROI = Ext.getCmp('dgvLenteContactoOjoIzquierdo').getStore();
        storeROI.removeAll();
    },
    accionAgregarLenteContactoOD:function(obj){
        var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.LenteContactoEditar');
        weditar.setTipo('OD');
        weditar.setEditar(0);
        weditar.show();
    },
    accionAgregarLenteContactoOI:function(obj){
        var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.LenteContactoEditar');
        weditar.setTipo('OI');
        weditar.setEditar(0);
        weditar.show();
    },
    accionSeleccionarGrillaOjoDerechoLC:function(obj,record, item, index, e, eOpts ){
        if(record){
            var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.LenteContactoEditar');
            weditar.down('form').loadRecord(record);
            weditar.setTipo('OD');
            weditar.setEditar(1);
            weditar.show();
        }else{
            Ext.Msg.alert("Aviso","Tiene que seleccionar el item!");
        }
    },
    accionSeleccionarGrillaOjoIzquierdoLC:function(obj,record, item, index, e, eOpts){
        if(record){
            var weditar = Ext.create('MyDesktop.app.views.servicio.consultorio.LenteContactoEditar');
            weditar.down('form').loadRecord(record);
            weditar.setTipo('OI');
            weditar.setEditar(1);
            weditar.show();
        }else{
            Ext.Msg.alert("Aviso","Tiene que seleccionar el item!");
        }
    }
    
});
