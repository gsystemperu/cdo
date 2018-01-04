var reporte = 0;
Ext.define('MyDesktop.app.views.ConsultaContratos', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.wconsultacontratos',
    requires:[
        'MyDesktop.app.stores.ConsultasContratos',
        'MyDesktop.app.stores.Trabajadores',
        'MyDesktop.app.stores.Productos',
        'Ext.ux.IFrame'

    ],
    id   : 'wconsultacontratos',
    initComponent : function(){
        storecontratos    = Ext.create('MyDesktop.app.stores.ConsultasContratos');
        storetrabajadores = Ext.create('MyDesktop.app.stores.Trabajadores');
        storetiendas      = Ext.create('MyDesktop.app.stores.Tiendas');

        var me = this;
        Ext.apply(me,{
            layout : 'fit',
            id     : 'dgvContratosRegistratos',
            sortableColumns : false,
            store  : storecontratos,
            columns: [
                {xtype: 'rownumberer'},
                {
                    text: "Fecha Contrato",
                    flex: 0.8,
                    sortable: true,
                    dataIndex: 'fecontrato',
                    align: 'center'
                },
                {
                    text: "Sede de Origen",
                    flex: 2,
                    sortable: true,
                    dataIndex: 'tienda',
                    align: 'left'
                },
                {
                    text: "Medico",
                    flex: 2,
                    sortable: true,
                    dataIndex: 'trabajador',
                    align: 'left'
                },
                {

                    text: "Cliente",
                    flex : 2,
                    sortable: true,
                    dataIndex: 'cliente',
                    align: 'left'
                },
                {
                    xtype :'numbercolumn',
                    text: "Total de Venta",
                    flex : 1,
                    sortable: true,
                    dataIndex: 'totalcontrato',
                    align: 'right'


                },
                /*{
                    text: "Estado Contrato",
                    flex : 1,
                    sortable: true,
                    dataIndex: 'estado',
                    align: 'center'
                },*/
                {
                    text: "Tipo de Documento",
                    flex : 1,
                    sortable: true,
                    dataIndex: 'tipodoc',
                    align: 'center'
                },
                {
                    text: "Estado",
                    flex : 1,
                    sortable: true,
                    dataIndex: 'tdocestado',
                    align: 'left',
                    renderer:function(value, metaData, record, rowIndex, colIndex, store, view)
                    {
                         switch ( record.get("estado")){
                                   case 'ANULADO' :  return '<b style="color: #DF0315">'+value+'</b>';
                         }
                         return '<b >'+value+'</b>';
                                    
                    }
                }
            ],
            listeners: {itemclick: function(dv, record, item, index, e) {}},
            tbar :[
                {
                    xtype : 'button',
                    text  : 'Imprimir',
                    iconCls : 'boton-print',
                    disabled: false,
                    id   :'btnImprimirListaContratos',
                    handler:function(){
                        me.imprimirReporteContratoConsulta();

                    }
                },'-',
                {
                    xtype : 'button',
                    text  : 'Actualizar Lista',
                    iconCls : 'icon-grid',
                    id    : 'btnActualizarListaContratos',
                    listeners :{
                        click : function(){
                            //Ext.getCmp('dgvContratosRegistratos').getStore().reload();
                            // Ext.getCmp('cboPorTipoPago').getValue()
                             store = Ext.getCmp('dgvContratosRegistratos').getStore();
                            store.getProxy().extraParams  = {
                                'pdesde'       : '',
                                'phasta'       : '' ,
                                'pidvendedor'  : 0,
                                'pidtienda'    : 0,
                                'ptipocancel'  : Ext.getCmp('cboPorTipoPago').getValue()
                            };
                            store.load();
                             reporte = 0;

                        }
                    }

                },
                {
                    xtype : 'combobox',
                    fieldLabel : 'Medico',
                    id : 'btnComboTrabajador',
                    flex : 0.5,
                    labelWidth : 40,
                    store: storetrabajadores,
                    valueField :'id',
                    displayField :'ncompleto',
                    emptyText   : '----- Seleccionar ----',
                    queryMode  : 'local',
                    editable:false,
                    listeners: {
                        select: function(combo, record, index) {
                            store = Ext.getCmp('dgvContratosRegistratos').getStore();
                            store.getProxy().extraParams  = {
                                'pdesde'       : '',
                                'phasta'       : '' ,
                                'pidvendedor'  : combo.getValue(),
                                'pidtienda'    : 0,
                                'ptipocancel'  : Ext.getCmp('cboPorTipoPago').getValue()
                            };
                            store.load();
                            reporte = 1;

                        }
                    }
                },'-',
                {
                	 
                    xtype : 'combobox',
                    fieldLabel : 'Tienda',
                    id : 'btnComboTienda',
                    store :storetiendas,
                    valueField :'id',
                    displayField :'direc',
                    emptyText   : '----- Seleccionar ----',
                    queryMode  : 'local',
                    labelWidth : 50,
                    editable:false,
                    flex: 0.7,
                     listeners: {
                        select: function(combo, record, index) {
                            store = Ext.getCmp('dgvContratosRegistratos').getStore();
                            store.getProxy().extraParams  = {
                                'pdesde'       : '',
                                'phasta'       : '' ,
                                'pidvendedor'  : 0,
                                'pidtienda'    : combo.getValue(),
                                'ptipocancel'  : Ext.getCmp('cboPorTipoPago').getValue()
                            };
                            store.load();
                            reporte = 3;

                        }
                    }

                },'-',
                {
                    xtype : 'label',
                    text  : 'Desde'
                },
                {
                    xtype  : 'datefield',
                    value  : new Date(),
                    id     : 'dpDesde',
                    format:'d/m/Y',
                    flex : 0.3
                },
                {
                    xtype : 'label',
                    text  : 'Hasta'
                },
                {
                    xtype  : 'datefield',
                    value  : new Date(),

                    id     : 'dpHasta',
                    format:'d/m/Y',
                    flex : 0.3
                },
                {
                    xtype : 'combo',
                    id    : 'cboPorTipoPago',
                    store : new Ext.data.ArrayStore({
                        fields : ['id','descrip'],
                        data :[
                            [1,'Fecha Emisi\xf3n'],
                            [2,'Fecha Cancelaci\xf3n'],
                        ]
                    }),
                    displayField : 'descrip',
                    valueField   : 'id',
                    value : 1,
                    editable: false,
                    query  : 'local'


                },
                {
                    xtype : 'button',
                    text  : 'Buscar',
                    iconCls : 'x-ico-lupa',
                    handler:function(){
                        store = Ext.getCmp('dgvContratosRegistratos').getStore();
                        store.getProxy().extraParams  = {
                            'pdesde'       : Ext.getCmp('dpDesde').getValue(),
                            'phasta'       : Ext.getCmp('dpHasta').getValue() ,
                            'pidvendedor'  : 0,
                            'pidtienda'    : 0,
                            'ptipocancel'  : Ext.getCmp('cboPorTipoPago').getValue()
                        };
                        store.load();
                        reporte = 2;
                    }
                }
            ]




        });

        this.callParent(arguments);


    },

    imprimirReporteContratoConsulta:function(){
        switch (reporte)
        {
            case 1:
                var desde =   '';
                var hasta =   '';
                var idvendedor = Ext.getCmp('btnComboTrabajador').getValue();
                var idtienda   = 0;
                var tipocancel = 1;
                break;
            case 2:
                var desde =   Ext.getCmp('dpDesde').getRawValue();
                var hasta =   Ext.getCmp('dpHasta').getRawValue();
                var idvendedor = 0;
                var idtienda   = 0;
                var tipocancel = Ext.getCmp('cboPorTipoPago').getValue();
                break;
            case 3:
                var desde =   '';
                var hasta =   '';
                var idvendedor = 0;
                var idtienda   = Ext.getCmp('btnComboTienda').getValue();
                var tipocancel = 1;
                break;
            case 0 :
                var desde =   '';
                var hasta =   '';
                var idvendedor = 0;
                var idtienda   = 0;
                var tipocancel = 1;
                break;

        }

        var _url = 'reportes/imprimircontratosconsultas?pdesde='+desde + '&phasta='+hasta+'&pidvendedor='+idvendedor+'&pidtienda='+idtienda+'&ptipocancel='+tipocancel;
       /* xpos=(screen.width/2)-(1000/2);
        ypos=(screen.height/2)-(600/2);
        my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);*/
        tabpanel = Ext.getCmp('tpContenedorApp');
        if(!tabpanel.getChildByElement('tabpdfcontratoconsultas'))
        {
            tabpanel.add({
             xtype: 'panel',
             closable: true,
             id  : 'tabpdfcontratoconsultas',
             title: 'Reporte de Contratos',
             layout: 'fit',
             items: [
               {
                xtype: 'uxiframe', // #3
                src: _url // #4
               }
             ]  
             });  
        }
        tabpanel.setActiveTab('tabpdfcontratoconsultas');

    }
});


