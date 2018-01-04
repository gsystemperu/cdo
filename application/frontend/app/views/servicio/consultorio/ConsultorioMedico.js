var __editar = 0;
var __idConsultorio = 0;

Ext.define('MyDesktop.app.views.servicio.consultorio.ConsultorioMedico', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wconsultorio',
    id: 'wconsulorio',
    config: {id: 0},
    requires: [
        'MyDesktop.app.stores.Trabajadores',
        'MyDesktop.app.views.servicio.consultorio.Refraccion',
        'MyDesktop.app.views.servicio.consultorio.LenteContacto',
        'MyDesktop.app.views.servicio.consultorio.Historia',
        'MyDesktop.app.views.servicio.consultorio.Biomicroscopia',
        'MyDesktop.app.views.servicio.consultorio.Oftalmoscopia',
        'MyDesktop.app.views.servicio.consultorio.Oftalmoscopia2',
        'MyDesktop.app.views.servicio.consultorio.Diagnostico',
        'MyDesktop.app.views.servicio.consultorio.Resto',
        'MyDesktop.app.views.servicio.consultorio.DipAdd',
        "MyDesktop.app.views.servicio.consultorio.RefraccionCiclopejia",
        'MyDesktop.app.stores.citas.Citas'

    ],
    initComponent: function () {
        var me = this;
        var storemedicos = Ext.create('MyDesktop.app.stores.Trabajadores');
        var storeProgramados =
                Ext.create('MyDesktop.app.stores.citas.PacientesParaAtencionMedica');
        var storeHisAtenciones =
                Ext.create('MyDesktop.app.stores.citas.HistorialConsultorioPaciente');

        var autoLoadCompras =
                {
                    run: function () {
                        me.accionSeleccionarSoloMedico();
                    },
                    interval: 10000   //* 1 => segundo => 1000
                }

        Ext.TaskManager.start(autoLoadCompras);

        Ext.applyIf(me, {
            layout: 'border',
            items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    width: 300,
                    layout: {align: 'stretch', type: 'vbox'},
                    title: 'Citas',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 0.5,
                            layout: 'fit',
                            bodyPadding: '5',
                            items: [
                                {
                                    xtype: 'datepicker',
                                    id: 'dtfechacitaConsulta',
                                    startDay: 1 // Start Lunes

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            autoScroll: true,
                            layout: {type: 'fit'},
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    title: 'Pacientes Programados',
                                    id: 'dgvpacientesprogramados',
                                    itemId: "dgvpacientesprogramados",
                                    store: storeProgramados,
                                    sortableColumns: false,
                                    viewConfig: {/*  no muestra el mensaje de cargando */
                                        loadMask: false
                                    },
                                    columns: [
                                        {
                                            xtype: "rownumberer",
                                            text: "Item",
                                            width: 30
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: '_idpaciente',
                                            flex: 0.5,
                                            text: 'Id',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Paciente',
                                            flex: 3,
                                            dataIndex: '_paciente'

                                        },
                                        {
                                            xtype: "gridcolumn",
                                            dataIndex: "_edad",
                                            hidden: true
                                                    //width:100,
                                                    //  text:"Edad"
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Estado',
                                            dataIndex: '_estado',
                                            flex: 0.8,
                                            renderer: function (value) {
                                                if (parseInt(value) == 5)
                                                    return '<span style="color:green;font-weight:bold;">ATENDIDO</span>';
                                                else
                                                    return '<span style="color:red;font-weight:bold;">NO ATENDIDO</span>';
                                            }
                                        }
                                    ],
                                    tools: [
                                        {
                                            type: 'refresh',
                                            tooltip: 'Refrescar el listado',
                                            handler: function () {
                                                Ext.getCmp('wconsulorio').accionSeleccionarMedico();
                                            }
                                        }
                                    ]
                                }
                            ],
                            tbar: [
                                {
                                    xtype: 'combobox',
                                    id: 'cboMedicoConsultorio',
                                    fieldLabel: '<b>Medico</b>',
                                    store: storemedicos,
                                    emptyText: '--Selecionar Medico--',
                                    labelWidth: 40,
                                    displayField: 'ncompleto',
                                    valueField: 'id',
                                    queryMode: 'remote',
                                    flex: 1,
                                    editable: false

                                }
                            ]
                        }
                    ]

                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: {align: 'stretch', type: 'vbox'},
                    // title: 'My Panel',
                    items: [
                        {
                            xtype: 'panel',
                            id: "panelRegistroDeAtenciones",
                            flex: 1,
                            autoScroll: true,
                            layout: {type: 'fit'},
                            // title : 'Registro de Atenciones del Paciente : ',
                            title: ".",
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'dgvatencionespaciente',
                                    itemId: "dgvatencionespaciente",
                                    store: storeHisAtenciones,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype:'templatecolumn',
                                            text: 'Fecha Cita - H.Aten.Consultorio',
                                            tpl: Ext.XTemplate([
                                              '<b>{_fechacita} - {_fechaconsultorio} {_horaconsultorio} </b>'
                                            ]),

                                            //'<{_fechacita} - {_horaconsultorio}',
                                            flex: 1.5

                                        },

                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Descripcion',
                                            dataIndex: '_descripcion',
                                            flex: 2.2,
                                            hidden: false
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Medico',
                                            dataIndex: '_medico',
                                            flex: 1.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Tipo de Cita',
                                            dataIndex: '_tipocita',
                                            flex: 1.5

                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Estado',
                                            dataIndex: '_estado',
                                            flex: 0.8,
                                            renderer: function (value) {
                                                if (parseInt(value) == 5)
                                                    return '<span style="color:green;font-weight:bold;">ATENDIDO</span>';
                                                else
                                                    return '<span style="color:red;font-weight:bold;">NO ATENDIDO</span>';
                                            }
                                        }
                                    ],
                                    viewConfig:{
                                      getRowClass: function(rec, rowIdx, params, store) {
                                          if(parseInt(rec.data._estado) ==4)
                                            return '';
                                          else
                                            return (rec.data._marcatxt == 0 ? 'red-row' : '');

                                      }
                                    },
                                    listeners: {
                                        itemclick: function (grid, record, item, index, event) {
                                            __editar = 0;
                                            __idConsultorio = 0;
                                            grid.up("wconsultorio").accionLimpiarFormularios();

                                            if (record.get('_estado') == '5') {  // Atendido

                                                // alert("5");
                                                Ext.getCmp('btnImprimirDiagnostico').setDisabled(false);
                                                Ext.getCmp('btnImprimirLenteContacto')
                                                        .setDisabled(false);
                                                Ext.getCmp('btnImprimirDiagnostico_A4').setDisabled(false);
                                                Ext.getCmp('btnImprimirLenteContacto_A4').setDisabled(false);
                                                Ext.getCmp('btnEditarFichaAtencion').setDisabled(false);
                                                Ext.getCmp("btnGuardarFichaAtension").setDisabled(true);
                                                Ext.getCmp("btnCancelarAtencion").setDisabled(true);
                                                Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(false);
                                                Ext.ComponentQuery.query("diagnosticoingreso #checkdiagnosticoProximacita")[0].setVisible(false);
                                                Ext.getCmp("myTabPanel").setDisabled(true);
                                                Ext.getCmp("myTabPanel").setActiveTab(0);
                                                Ext.getCmp("myTabPanelrefraccion").setActiveTab(0);


                                            } else {
                                                //  alert("otro");
                                                Ext.getCmp('btnImprimirDiagnostico').setDisabled(true);
                                                Ext.getCmp('btnImprimirLenteContacto')
                                                        .setDisabled(true);
                                                Ext.getCmp('btnImprimirDiagnostico_A4').setDisabled(true);
                                                Ext.getCmp('btnImprimirLenteContacto_A4')
                                                        .setDisabled(true);
                                                //  Ext.getCmp('btnEditarFichaAtencion').setDisabled(true);

                                                Ext.getCmp('btnEditarFichaAtencion').setDisabled(true);
                                                Ext.getCmp("btnGuardarFichaAtension").setDisabled(false);
                                                Ext.getCmp("btnCancelarAtencion").setDisabled(true);
                                                Ext.getCmp("myTabPanel").setDisabled(false);
                                                Ext.getCmp("myTabPanel").setActiveTab(0);
                                                Ext.getCmp("myTabPanelrefraccion").setActiveTab(0);


                                                var fecha = record.data._fechacita;
                                                var arreglofecha = fecha.split("/");
                                                fecha = arreglofecha[0] + "/" + arreglofecha[1] + "/" + (parseInt(arreglofecha[2]) + 1);
                                                Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setRawValue(fecha);
                                                Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(true);
                                                Ext.ComponentQuery.query("diagnosticoingreso #checkdiagnosticoProximacita")[0].setValue(true);
                                                Ext.ComponentQuery.query("diagnosticoingreso #checkdiagnosticoProximacita")[0].setVisible(true);

                                               try {

                                                    __idpersona = record.get('_idper');
                                                    var message = new Ext.LoadMask(Ext.getCmp('myTabPanel'),
                                                            {msg: " Cargando la informacion de historia clinica"});
                                                    message.show();
                                                    me.accionLLenarHistoriaAnteriorCita(__idpersona);
                                                    message.destroy();
                                                } catch (e) {
                                                    console.info("Error");
                                                }
                                            }// fin if

                                            if(record.get('_marcatxt')== 0){
                                              Ext.ComponentQuery.query('#btnVisualizarAtencion')[0].setDisabled(false);
                                              Ext.getCmp('btnEditarFichaAtencion').setDisabled(true);
                                            }else{
                                              Ext.ComponentQuery.query('#btnVisualizarAtencion')[0].setDisabled(true);
                                              Ext.getCmp('btnEditarFichaAtencion').setDisabled(false);
                                            }

                                        }
                                    } // fin listenes
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 3,
                            layout: {type: 'fit'},
                            id: 'panelFichas',
                            title: 'Ficha de Atencion',
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: '<b>Guardar Ficha <b>',
                                    iconCls: 'boton-add-consultamedica',
                                    id: 'btnGuardarFichaAtension',
                                    disabled: true

                                },
                                '-',
                                {
                                    xtype: 'button',
                                    id: 'btnImprimirDiagnostico',
                                    text: '<b>Diagnostico<b>',
                                    iconCls: 'boton-print',
                                    disabled: true,
                                    hidden: true

                                },
                                {
                                    xtype: 'button',
                                    id: 'btnImprimirDiagnostico_A4',
                                    text: '<b>Diagnostico A4<b>',
                                    iconCls: 'boton-print',
                                    disabled: true

                                },
                                '-',
                                {
                                    xtype: 'button',
                                    id: 'btnImprimirLenteContacto_A4',
                                    text: '<b>Refracción A4<b>',
                                    iconCls: 'boton-print',
                                    disabled: true

                                },
                                {
                                    xtype: 'button',
                                    id: 'btnImprimirLenteContacto',
                                    text: '<b>Refracción<b>',
                                    iconCls: 'boton-print',
                                    disabled: true,
                                    hidden: true

                                },
                                '-',
                                {
                                    xtype: 'button',
                                    id: 'btnEditarFichaAtencion',
                                    text: '<b>Editar Ficha<b>',
                                    iconCls: 'boton-edit',
                                    disabled: true

                                },
                                '-',
                                {
                                    xtype: 'button',
                                    id: 'btnCancelarAtencion',
                                    text: '<b>Cancelar<b>',
                                    iconCls: 'boton-cancel',
                                    hidden: true

                                },
                                '-',
                                {
                                    xtype: 'button',
                                    itemId: 'btnVisualizarAtencion',
                                    text: '<b>Ver Atención<b>',
                                    iconCls: 'icon-grid',
                                    disabled:true,
                                    hidden:true

                                }




//                                ,
//
//                                {
//                                    xtype: 'button',
//                                    id: 'btnImprimirDiagnostico_A4',
//                                    text: '<b>Diagnostico A4<b>',
//                                    iconCls: 'boton-print',
//                                    disabled: true
//
//                                },
//                                '-',
//                                {
//                                    xtype: 'button',
//                                    id: 'btnImprimirLenteContacto_A4',
//                                    text: '<b>Refracción A4<b>',
//                                    iconCls: 'boton-print',
//                                    disabled: true
//
//                                }





                            ],
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: 'myTabPanel',
                                    disabled: true,
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'Refraccion',
                                            id: 'tabRefraccion',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [
                                                {
                                                    xtype: "tabpanel",
                                                    id: "myTabPanelrefraccion",
                                                    activeTab: 0,
                                                    items: [
                                                        {
                                                            xtype: "panel",
                                                            title: "Ojos",
                                                            id: "tabojos",
                                                            layout: "fit",
                                                            padding: 5,
                                                            items: [
                                                                {
                                                                    xtype: 'refraccioningreso'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: "panel",
                                                            title: "AV / DIP / ADD / OBSERVACION",
                                                            itemId: "tabDippAdd",
                                                            layout: "fit",
                                                            padding: 5,
                                                            items: [
                                                                {
                                                                    xtype: "dipadd",
                                                                    hidden: false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: "panel",
                                                            hidden: false,
                                                            title: "REF. C/ CICLO.",
                                                            itemId: "tabRefraciclo",
                                                            id: "tabRefraciclo",
                                                            layout: {
                                                                type: "fit"
                                                            },
                                                            padding: 5,
                                                            items: [
                                                                {
                                                                    xtype: "refraccionciclopejia"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        },
                                        /* {
                                         xtype:"panel",
                                         title:"DIP/ADD",
                                         itemId:"tabDippAdd",
                                         layout:"fit",
                                         padding:5,
                                         items:[
                                         {
                                         xtype:"dipadd",
                                         hidden:false
                                         }
                                         ]
                                         },

                                         */
                                        {
                                            xtype: 'panel',
                                            title: 'Lentes de Contacto',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [
                                                {xtype: 'lentecontactoingreso'}

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Historia',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [{xtype: 'historiaingreso'}]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Biomicroscopia',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [{xtype: 'biomicroscopiaingreso'}]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Oftalmoscopia',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [
                                                {
                                                    xtype: "tabpanel",
                                                    layout: {
                                                        type: "fit"
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'oftalmoscopiaingreso',
                                                            title: "OD"
                                                        },
                                                        {
                                                            xtype: "oftalmoscopiaingreso2",
                                                            title: "OI"
                                                        }
                                                    ]

                                                }
                                            ]
//                              [
//                                {xtype : 'oftalmoscopiaingreso'}
//                              ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Diagnostico',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [{xtype: 'diagnosticoingreso'}]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Otros',
                                            layout: 'fit',
                                            padding: 5,
                                            items: [{xtype: 'restoingreso'}]
                                        }
                                    ]

                                } // fin TabPanel
                            ]
                        }
                    ]
                }
            ]

        }); // Fin Constructor

        me.callParent(arguments);

        Ext.getCmp('cboMedicoConsultorio')
                .on('select', me.accionSeleccionarMedico, this);
        Ext.getCmp('dgvpacientesprogramados')
                .on('itemclick', me.accionHistorialAtencionesPaciente, this);
        Ext.getCmp('btnGuardarFichaAtension')
                .on('click', me.accionGuardarAtencion, this);
        Ext.getCmp('btnCancelarAtencion')
                .on('click', me.accionLimpiarFormularios, this);
        Ext.getCmp('btnImprimirDiagnostico')
                .on('click', me.accionImprimirDiagnosticoConsultorio, this);
        Ext.getCmp('btnImprimirDiagnostico_A4')
                .on('click', me.accionImprimirDiagnosticoConsultorio_A4, this);
        Ext.getCmp('btnImprimirLenteContacto')
                .on('click', me.accionImprimirLenteContacto, this);
        Ext.getCmp('btnImprimirLenteContacto_A4')
                .on('click', me.accionImprimirLenteContacto_A4, this);
        Ext.getCmp('dtfechacitaConsulta')
                .on('select', me.accionSeleccionarMedico, this);
        Ext.getCmp('btnEditarFichaAtencion')
                .on('click', me.accionEditarTraerDatos, this);



    },
    accionSeleccionarSoloMedico: function (obj, value, eOpts) {
        var store = Ext.getCmp('dgvpacientesprogramados').getStore();
        store.getProxy().extraParams = {
            vfecha: Ext.getCmp('dtfechacitaConsulta').getValue(),
            vidmedico: Ext.getCmp('cboMedicoConsultorio').getValue()
        };
        store.load();
        //Ext.getCmp('dgvatencionespaciente').getStore().removeAll();

    },
    accionSeleccionarMedico: function (obj, value, eOpts) {

        //  alert("sasas");
        var store = Ext.getCmp('dgvpacientesprogramados').getStore();
        store.getProxy().extraParams = {
            vfecha: Ext.getCmp('dtfechacitaConsulta').getValue(),
            vidmedico: Ext.getCmp('cboMedicoConsultorio').getValue()
        };
        store.load();
        //   Ext.getCmp('dgvatencionespaciente').getStore().removeAll();
        Ext.getCmp('dgvatencionespaciente').getStore().load({
            params: {
                vidpaciente: 0
            }
        });
        Ext.getCmp('btnImprimirDiagnostico_A4').setDisabled(true);
        Ext.getCmp('btnImprimirLenteContacto_A4').setDisabled(true);
        Ext.getCmp('btnEditarFichaAtencion').setDisabled(true);
        Ext.getCmp("btnGuardarFichaAtension").setDisabled(true);
        obj.up("wconsultorio").accionLimpiarFormularios();
        Ext.getCmp("myTabPanel").setDisabled(true);
        Ext.getCmp("myTabPanel").setActiveTab(0);
        Ext.getCmp("myTabPanelrefraccion").setActiveTab(0);



    },
    accionHistorialAtencionesPaciente: function (obj, record, item, index, e) {
        var store = Ext.getCmp('dgvatencionespaciente').getStore();
        store.getProxy().extraParams = {vidpaciente: record.get('_idpaciente')};
        store.load();
        Ext.getCmp('panelRegistroDeAtenciones').setTitle("" + record.data._paciente + "------" + "Edad : " + record.data._edad);
        Ext.getCmp('btnImprimirDiagnostico_A4').setDisabled(true);
        Ext.getCmp('btnImprimirLenteContacto_A4').setDisabled(true);
        Ext.getCmp('btnEditarFichaAtencion').setDisabled(true);
        Ext.getCmp("btnGuardarFichaAtension").setDisabled(true);
        obj.up("wconsultorio").accionLimpiarFormularios();
        Ext.getCmp("myTabPanel").setDisabled(true);
        Ext.getCmp("myTabPanel").setActiveTab(0);
        Ext.getCmp("myTabPanelrefraccion").setActiveTab(0);
        console.log(record.data);



    },
    accionEditarTraerDatos: function (obj) {

        this.accionLimpiarFormularios();
        Ext.getCmp('btnEditarFichaAtencion').setDisabled(true);
        Ext.getCmp("btnGuardarFichaAtension").setDisabled(false);

        Ext.getCmp('btnImprimirDiagnostico_A4').setDisabled(false);
        Ext.getCmp('btnImprimirLenteContacto_A4').setDisabled(false);
        Ext.getCmp("myTabPanel").setDisabled(false);
        Ext.getCmp("myTabPanel").setActiveTab(0);
        Ext.getCmp("myTabPanelrefraccion").setActiveTab(0);

        __editar = 1;
        __idcita = 0;
        me = this;
        try {
            var record = Ext.getCmp('dgvatencionespaciente')
                    .getSelectionModel()
                    .getSelection();
            __idcita = record[0].get('_idcita');
            __idConsultorio = record[0].get('_idconsul');
            var message = new Ext.LoadMask(Ext.getCmp('myTabPanel'),
                    {msg: " Cargando la informacion..."});
            message.show();
            me.accionLlenarDiagnostico(__idcita);
            me.accionLLenarGrillaRefraccion(__idcita, 'OD');
            me.accionLLenarGrillaRefraccion(__idcita, 'OI');
            me.accionLLenarGrillaLenteContacto(__idcita, 'OD');
            me.accionLLenarGrillaLenteContacto(__idcita, 'OI');
            me.accionLLenarHistoria(__idcita);
            me.accionLLenarBiomicroscopia(__idcita);
            me.accionLlenarResto(__idcita);
            me.accionLlenarOftalmoscopia(__idcita);
            me.accionLlenarDipAdd(__idcita);
            message.destroy();
        } catch (e) {
            console.info("Error");
        }

    },
    /* Editar Registro */

    accionLlenarDipAdd: function (__idcita) {
        Ext.Ajax.request({
            url: "index.php/consultorio/dipaddodatos",
            params: {vidcita: __idcita},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('dipcerca').setValue(item._dip_cerca);
                    Ext.getCmp('diplejos').setValue(item._dip_lejos);
                    Ext.getCmp('addcerca').setValue(item._add_cerca);
                    Ext.getCmp('refraccion_observacion').setValue(item._observacion);
                    Ext.ComponentQuery.query("dipadd textfield#agudezavisual")[0].setValue(item._agudezavisual);
                    Ext.ComponentQuery.query("refraccionciclopejia textfield#refracicloOD")[0].setValue(item._refraciclo_od);
                    Ext.ComponentQuery.query("refraccionciclopejia textfield#refracicloOI")[0].setValue(item._refraciclo_oi);


                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionLlenarDiagnostico: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/diagnosticodatos',
            params: {vidcita: __idcita},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtDiagnosticoDiagnostico').setValue(item._diagnostico);
                    Ext.getCmp('txtDiagnosticoTratamiento').setValue(item._tratamiento);
                    Ext.getCmp('dfDiagnosticoProximaCita').setValue(item._proximacita);
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

        // __message.destroy();
    },
    accionLLenarGrillaRefraccion: function (__idcita, __ojo) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/refracciondatos',
            params: {vidcita: __idcita, vojo: __ojo},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (__ojo == 'OD') {
                        var store = Ext.getCmp('dgvRefraccionOjoDerecho').getStore();
                    } else {
                        var store = Ext.getCmp('dgvRefraccionOjoIzquierdo').getStore();
                    }
                    store.add({
                        _idod: 1,
                        _idconsul: item._idconsul,
                        _esfera: item._esfera,
                        _fecha: item._fecha,
                        _cilindro: item._cilindro,
                        _eje: item._eje,
                        _dip_l: item._dip_l,
                        _dip_c: item._dip_c,
                        _av: item._av,
                        _adiccion: item._adiccion,
                        _obser1: item._obser1,
                        _obser2: item._obser2,
                        _idmed: item._idmed,
                        _medico: item._medico
                    });

                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionLLenarGrillaLenteContacto: function (__idcita, __ojo) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/lentecontactodatos',
            params: {vidcita: __idcita, vojo: __ojo},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (__ojo == 'OD') {
                        var store = Ext.getCmp('dgvLenteContactoOjoDerecho').getStore();
                    } else {
                        var store = Ext.getCmp('dgvLenteContactoOjoIzquierdo').getStore();
                    }
                    store.add({
                        _idod: 1,
                        _idconsul: item._idconsul,
                        _esfera: item._esfera,
                        _fecha: item._fecha,
                        _cilindro: item._cilindro,
                        _eje: item._eje,
                        _dip_l: item._dip_l,
                        _dip_c: item._dip_c,
                        _av: item._av,
                        _adiccion: item._adiccion,
                        _obser1: item._obser1,
                        _obser2: item._obser2,
                        _idmed: item._idmed,
                        _medico: item._medico,
                        _radio:item._radio,
                        _potencia:item._potencia,
                        _diametro:item._diametro,
                        _curva:item._curva,
                        _tipo:item._tipo,
                       _obser:item._obser
                    });

                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionLLenarHistoria: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/historiadatos',
            params: {vidcita: __idcita},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtHistoriaAnamnesis').setValue(item._anamnesis);
                    Ext.getCmp('txtHistoriaDesdeGafas').setValue(item._usagafas);
                    Ext.getCmp('txtHistoriaProgreso').setValue(item._pregresion);
                    Ext.getCmp('txtHistoriaEnfermedad').setValue(item._enferoculares);
                    Ext.getCmp('txtHistoriaTratamiento').setValue(item._tratamiento);
                    Ext.getCmp('txtHistoriaAlergias').setValue(item._alergias);
                    Ext.getCmp('txtHistoriaUtlRevision').setValue(item._ultimarevision);
                    Ext.getCmp('txtHistoriaRecomendado').setValue(item._recomendado);
                    Ext.getCmp('txtHistoriaTipoCristal').setValue(item._tipocristal);
                    Ext.getCmp('txtHistoriaCristales').setValue(item._medcentrocristales);
                    Ext.getCmp('txtHistoriaAdicion').setValue(item._adiccion);
                    Ext.getCmp('txtHistoriaAgudeza').setValue(item._agudezavisual);
                    Ext.getCmp('txtHistoriaPrisma').setValue(item._prisma);


                    if(item._usagafas)
                      Ext.getCmp('txtHistoriaDesdeGafas').setFieldStyle('color:red;');
                    if(item._pregresion)
                      Ext.getCmp('txtHistoriaProgreso').setFieldStyle('color:red;');
                    if(item._enferoculares)
                      Ext.getCmp('txtHistoriaEnfermedad').setFieldStyle('color:red;');
                    if(item._alergias)
                      Ext.getCmp('txtHistoriaAlergias').setFieldStyle('color:red;');
                    if(item._ultimarevision)
                      Ext.getCmp('txtHistoriaUtlRevision').setFieldStyle('color:red;');
                    if(item._ap_otros)
                      Ext.getCmp('txt_historia_otros_ap_otros').setFieldStyle('color:red;');



                    Ext.getCmp('ojodere_sc').setValue(item.vojodere_sc);
                    Ext.getCmp("ojodere_cc").setValue(item.vojodere_cc);
                    Ext.getCmp("ojodere_ae").setValue(item.vojodere_ae);
                    Ext.getCmp("ojoizq_sc").setValue(item.vojoizq_sc);
                    Ext.getCmp("ojoizq_cc").setValue(item.vojoizq_cc);
                    Ext.getCmp("ojoizq_ae").setValue(item.vojoizq_ae);
                    Ext.getCmp("ultimarefraccion_od").setValue(item.vultimarefraccion_od);
                    Ext.getCmp("ultimarefraccion_oi").setValue(item.vultimarefraccion_oi);
                    Ext.getCmp("ultimarefraccion_add").setValue(item.vultimarefraccion_add);
                    Ext.getCmp("txt_historia_otros_ap_otros").setValue(item._ap_otros);


                    var historiaFamiliar = Ext.getCmp('chkgHistoriaFamiliar');
                    historiaFamiliar.setValue({
                        '1': (item._hf_estrabismo == 0 ? false : true),
                        '2': (item._hf_leucoma == 0 ? false : true),
                        '3': (item._hf_glaucoma == 0 ? false : true),
                        '4': (item._hf_hiperart == 0 ? false : true),
                        '5': (item._hf_catarata == 0 ? false : true),
                        '6': (item._hf_ojoseco == 0 ? false : true),
                        '7': (item._hf_diabetes == 0 ? false : true),
                    });

                    var antecedentesPersonales = Ext.getCmp('chkgAtecedentes');
                    antecedentesPersonales.setValue({
                        '1': (item._ap_estrabismo == 0 ? false : true),
                        '2': (item._ap_leucoma == 0 ? false : true),
                        '3': (item._ap_glaucoma == 0 ? false : true),
                        '4': (item._ap_hiperart == 0 ? false : true),
                        '5': (item._ap_catarataod == 0 ? false : true),
                        '6': (item._ap_catarataoi == 0 ? false : true),
                        '7': (item._ap_ojoseco == 0 ? false : true),
                        '8': (item._ap_diabetes == 0 ? false : true)
                    });

                    var historiaQuimica = Ext.getCmp('chkgHistoriaQuimica');
                    historiaQuimica.setValue({
                        '1': (item._azucar == 0 ? false : true),
                        '2': (item._hipertersion == 0 ? false : true),
                    });
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionLLenarHistoriaAnteriorCita: function (__idpersona) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/historiadatosanterior',
            params: {vidpersona: __idpersona},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtHistoriaDesdeGafas').setValue(item._usagafas);
                    Ext.getCmp('txtHistoriaProgreso').setValue(item._pregresion);
                    Ext.getCmp('txtHistoriaEnfermedad').setValue(item._enferoculares);
                    Ext.getCmp('txtHistoriaAlergias').setValue(item._alergias);
                    Ext.getCmp('txtHistoriaUtlRevision').setValue(item._ultimarevision);
                    Ext.getCmp("txt_historia_otros_ap_otros").setValue(item._ap_otros);
                    if(item._usagafas)
                      Ext.getCmp('txtHistoriaDesdeGafas').setFieldStyle('color:red;');
                    if(item._pregresion)
                      Ext.getCmp('txtHistoriaProgreso').setFieldStyle('color:red;');
                    if(item._enferoculares)
                      Ext.getCmp('txtHistoriaEnfermedad').setFieldStyle('color:red;');
                    if(item._alergias)
                      Ext.getCmp('txtHistoriaAlergias').setFieldStyle('color:red;');
                    if(item._ultimarevision)
                      Ext.getCmp('txtHistoriaUtlRevision').setFieldStyle('color:red;');
                    if(item._ap_otros)
                      Ext.getCmp('txt_historia_otros_ap_otros').setFieldStyle('color:red;');


                    var historiaFamiliar = Ext.getCmp('chkgHistoriaFamiliar');
                    historiaFamiliar.setValue({
                        '1': (item._hf_estrabismo == 0 ? false : true),
                        '2': (item._hf_leucoma == 0 ? false : true),
                        '3': (item._hf_glaucoma == 0 ? false : true),
                        '4': (item._hf_hiperart == 0 ? false : true),
                        '5': (item._hf_catarata == 0 ? false : true),
                        '6': (item._hf_ojoseco == 0 ? false : true),
                        '7': (item._hf_diabetes == 0 ? false : true),
                    });

                    var antecedentesPersonales = Ext.getCmp('chkgAtecedentes');
                    antecedentesPersonales.setValue({
                        '1': (item._ap_estrabismo == 0 ? false : true),
                        '2': (item._ap_leucoma == 0 ? false : true),
                        '3': (item._ap_glaucoma == 0 ? false : true),
                        '4': (item._ap_hiperart == 0 ? false : true),
                        '5': (item._ap_catarataod == 0 ? false : true),
                        '6': (item._ap_catarataoi == 0 ? false : true),
                        '7': (item._ap_ojoseco == 0 ? false : true),
                        '8': (item._ap_diabetes == 0 ? false : true)
                    });

                    var historiaQuimica = Ext.getCmp('chkgHistoriaQuimica');
                    historiaQuimica.setValue({
                        '1': (item._azucar == 0 ? false : true),
                        '2': (item._hipertersion == 0 ? false : true),
                    });
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionLLenarBiomicroscopia: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/biomicroscopiadatos',
            params: {vidcita: __idcita},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtBiocroscopiaCantLagrima').setValue(item._cantlagrima);
                    Ext.getCmp('txtBiocroscopiaTestShirmer').setValue(item._testshirmer);
                    Ext.getCmp('txtBiocroscopiaParpadosEstado')
                            .setValue(item._preparadoestado);
                    Ext.getCmp('txtBiocroscopiaPtosis').setValue(item._ptosis);
                    Ext.getCmp('txtBiocroscopiaPosion').setValue(item._posion);
                    Ext.getCmp('txtBiocroscopiaConjuntiva').setValue(item._conjuntiva);
                    Ext.getCmp('txtBiocroscopiaCornea').setValue(item._cornea);
                    Ext.getCmp('txtBiocroscopiaCristalinoCod')
                            .setValue(item._cristalinocod);
                    Ext.getCmp('txtBiocroscopiaCristalinoDes')
                            .setValue(item._cristalinodes);
                    Ext.getCmp('txtBiocroscopiaEsclerotica').setValue(item._esclerotica);
                    Ext.getCmp('txtBiocroscopiaIris').setValue(item._iris);
                    Ext.getCmp('txtAnguloIridoCorneal').setValue(item._iridocorneal);

                    Ext.getCmp("txtpio_od").setValue(item._pio_od);
                    Ext.getCmp("txtpio_id").setValue(item._pio_oi);

                    var conductoLagrimal = Ext.getCmp('rbConductoLagrimal');
                    switch (item._colagrimal) {
                        case '1':
                            Ext.getCmp('optPermeable').setValue(true);
                            break;
                        case '2':
                            Ext.getCmp('optSemiPermeable').setValue(true);
                            break;
                        case '3':
                            Ext.getCmp('Ostruido').setValue(true);
                            break;
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionLlenarOftalmoscopia: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/oftalmoscopiadatos',
            params: {vidcita: __idcita},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtOftalmoNervioOptico').setValue(item._papila);
                    Ext.getCmp('txtOftalmoMacula').setValue(item._macula);
                    Ext.getCmp('txtOftalmoVasosSanguineos')
                            .setValue(item._vasossanguineos);
                    Ext.getCmp('txtOftalmoColor').setValue(item._color);
                    Ext.getCmp('txtOftalmoReflejoForeal').setValue(item._reflejoforeal);
                    Ext.getCmp('txtOftalmoMediosRefractivos')
                            .setValue(item._mediosrefractivos);
                    Ext.getCmp('txtOftalmoEstadoRetinaPeriferica')
                            .setValue(item._retinaperiferica);
                    Ext.getCmp('txtOftalmoEstadoRetinaCentral')
                            .setValue(item._retinacentral);
                    Ext.getCmp('txtOftalmoRelacionCd').setValue(item._relacioncd);


                    Ext.getCmp('txtOftalmoNervioOptico2').setValue(item._papila2);
                    Ext.getCmp('txtOftalmoMacula2').setValue(item._macula2);
                    Ext.getCmp('txtOftalmoVasosSanguineos2')
                            .setValue(item._vasossanguineos);
                    Ext.getCmp('txtOftalmoColor2').setValue(item._color2);
                    Ext.getCmp('txtOftalmoReflejoForeal2').setValue(item._reflejoforeal2);
                    Ext.getCmp('txtOftalmoMediosRefractivos2')
                            .setValue(item._mediosrefractivos2);
                    Ext.getCmp('txtOftalmoEstadoRetinaPeriferica2')
                            .setValue(item._retinaperiferica2);
                    Ext.getCmp('txtOftalmoEstadoRetinaCentral2')
                            .setValue(item._retinacentral2);
                    Ext.getCmp('txtOftalmoRelacionCd2').setValue(item._relacioncd2);

                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionLlenarResto: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/restodatos',
            params: {vidcita: __idcita},
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtRestoPupilasIguales').setValue(item._pupilas_iguales);
                    Ext.getCmp('txtRestoPupilasRedondas')
                            .setValue(item._pupilas_redondas);
                    Ext.getCmp('txtRestoPupilasRespondenLuz')
                            .setValue(item._pupilas_responden);
                    Ext.getCmp('txtRestoPupilasRespondenAcomo')
                            .setValue(item._pupilas_acomodacion);
                    Ext.getCmp('txtRestoMotilidad').setValue(item._motilidadocular);
                    Ext.getCmp('txtRestoPupilasPuntoProximo')
                            .setValue(item._puntoconvergencia);
                    Ext.getCmp('txtRestoTonometriaODcod')
                            .setValue(item._tonometria_odcod);
                    Ext.getCmp('txtRestoTonometriaODDesc')
                            .setValue(item._tonometria_oddes);
                    Ext.getCmp('txtRestoTonometriaOIcod')
                            .setValue(item._tonometria_oicod);
                    Ext.getCmp('txtRestoTonometriaOIDesc')
                            .setValue(item._tonometria_oides);
                    Ext.getCmp('txtRestoVisionColores').setValue(item._visioncolores);
                    Ext.getCmp('txtRestoPrismaVertical').setValue(item._prismavertical);
                    Ext.getCmp('txtRestoLucesWorth').setValue(item._lucesworth);
                    Ext.getCmp('txtRestoStereopsis').setValue(item._stereopsis);
                    Ext.getCmp('txtRestoRejillaOjoDerecho')
                            .setValue(item._rejilla_ojoderecho);
                    Ext.getCmp('txtRestoRejillaOjoIzquierdo')
                            .setValue(item._rejilla_ojoizquierdo);

                    Ext.getCmp("ishijara_otros_test").setValue(item._test_ishijara);
                    Ext.getCmp("segundos_otros_test_esteriopsis").setValue(item._test_esteriopsis_segundos);


                    var coverTest = Ext.getCmp('chkgRestoCoverTest');
                    coverTest.setValue({
                        '1': (item._cover_esotropia == 1 ? true : false),
                        '2': (item._cover_exotropia == 1 ? true : false),
                        '3': (item._cover_esoforia == 1 ? true : false),
                        '4': (item.cover_exoforia == 1 ? true : false),
                        '5': (item._cover_hipertropia == 1 ? true : false),
                        '6': (item._cover_hipotropia == 1 ? true : false)
                    });
                    var filtroRojo = Ext.getCmp('ckbgFiltroRojo');
                    filtroRojo.setValue({
                        '1': (item._suprimealgunojo == 1 ? true : false),
                        '2': (item._fusionaimagenes == 1 ? true : false),
                    });
                    var restoCorrespondencia = Ext.getCmp('chkgRestoCorrespondencia');
                    if (item._retiniana_normal == 1)
                        Ext.getCmp('optNormal').setValue(true);
                    if (item._retiniana_falsa == 1)
                        Ext.getCmp('optFalsa').setValue(true);

                    var campoVisualOD = Ext.getCmp('chkgRestoCampoVisualOD');
                    if (item._confrontacion_od_normal == 1)
                        Ext.getCmp('optconfrontacionODnormal').setValue(true);
                    if (item._confrontacion_od_normal == 2)
                        Ext.getCmp('optconfrontacionODdisminuido').setValue(true);

                    var campoVisualOI = Ext.getCmp('chkgRestoCampoVisualOI');
                    if (item._confrontacion_oi_normal == 1)
                        Ext.getCmp('optconfrontacionOInormal').setValue(true);
                    if (item._confrontacion_oi_normal == 2)
                        Ext.getCmp('optconfrontacionOIdisminuido').setValue(true);

                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    //---------------------------------------
    accionGuardarAtencion: function (obj) {


        var sw =0;

        Ext.getCmp('btnEditarFichaAtencion').setDisabled(false);
        Ext.getCmp("btnGuardarFichaAtension").setDisabled(true);
        Ext.getCmp('btnImprimirDiagnostico_A4').setDisabled(true);
        Ext.getCmp('btnImprimirLenteContacto_A4').setDisabled(true);
        Ext.getCmp("myTabPanel").setActiveTab(0);
        Ext.getCmp("myTabPanelrefraccion").setActiveTab(0);
        Ext.getCmp("myTabPanel").setDisabled(true);

//        var message = new Ext.LoadMask(Ext.getCmp('myTabPanel'),
//                {msg: " Guardarnado la informacion..."});
//        message.show();
        try {
            var record = Ext.getCmp('dgvatencionespaciente')
                    .getSelectionModel()
                    .getSelection();
            var idcita = record[0].get('_idcita');
            var fcita = record[0].get('_fechacita');
            var me = this;
            
        } catch (e) {
            Ext.Msg.alert("Error", "Seleccionar la cita del paciente !");
            message.destroy();
            return false;
        }

        var _hoy = new Date(); _hoy =  Ext.util.Format.date(_hoy, 'd/m/Y') ;

        if(__idConsultorio == 0){
            __idConsultorio =0 ;
        }else{
            if(fcita.trim() == _hoy.trim()){
                __idConsultorio = __idConsultorio;
                sw = 0;
            }else{
                __idConsultorio = 0;
                sw = 1;
            }
        }

        //console.log(__idConsultorio);return false;

        Ext.Ajax.request({
            url: 'index.php/consultorio/actualizar',
            params: {
                vid:  __idConsultorio,    //(__idConsultorio == 0 ? 0 : __idConsultorio),
                vidcita: idcita,
                vfecha: fcita,
                vidmed: Ext.getCmp('cboMedicoConsultorio').getValue(),
                vproximacita: Ext.getCmp('dfDiagnosticoProximaCita').getValue(),
                vdiagnostico: Ext.getCmp('txtDiagnosticoDiagnostico').getValue(),
                vtratamiento: Ext.getCmp('txtDiagnosticoTratamiento').getValue(),
                vusuario: Ext.util.Cookies.get('idusuario'),
                vsw : sw
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                        var idConsulta = parseInt(item.ERROR);
                        var storeROD = Ext.getCmp('dgvRefraccionOjoDerecho').getStore();
                        var storeROI = Ext.getCmp('dgvRefraccionOjoIzquierdo').getStore();
                        var storeLCOD = Ext.getCmp('dgvLenteContactoOjoDerecho').getStore();
                        var storeLCOI = Ext.getCmp('dgvLenteContactoOjoIzquierdo').getStore();
                        me.accionGuardarRefraccionOjoDerecho(storeROD, idConsulta);
                        me.accionGuardarRefraccionOjoIzquierdo(storeROI, idConsulta);
                        me.accionGuardarLenteContactoOjoDerecho(storeLCOD, idConsulta);
                        me.accionGuardarLenteContactoOjoIzquierdo(storeLCOI, idConsulta);
                        me.accionGuardarBiocroscopia(idConsulta);
                        me.accionGuardarHistoria(idConsulta);
                        me.accionOftalmoscopiaActualizar(idConsulta);
                        me.accionDiagnosticoActualizar(idConsulta);
                        me.accionRestoActualizar(idConsulta);
                        me.accionDipaddActualizar(idConsulta);

                        var grid = Ext.getCmp('dgvatencionespaciente');
                        var rec = grid.getSelectionModel().getSelection()[0];
                        grid.getStore().load(function (records, operation, success) {
                            grid.getSelectionModel().select(rec.index, true);
                        });
                      //  message.destroy();
                    }
                });

                me.accionLimpiarFormularios();

            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionGuardarRefraccionOjoDerecho: function (store, idconsulta) {
        store.each(function (record) {
            Ext.Ajax.request({
                url: 'index.php/consultorio/refraccionactualizarojoderecho',
                params: {
                    vid: 0,
                    vidconsultorio: idconsulta,
                    vfecha: record.get('_fecha'),
                    vesfera: record.get('_esfera'),
                    vcilindro: record.get('_cilindro'),
                    veje: record.get('_eje'),
                    vdip_l: record.get('_dip_l'),
                    vdip_c: record.get('_dip_c'),
                    vav: record.get('_av'),
                    vadiccion: record.get('_adiccion'),
                    vobser1: record.get('_obser1'),
                    vobser2: record.get('_obser2'),
                    vidmed: record.get('_idmed'),
                    vusuario: Ext.util.Cookies.get('idusuario')
                },
                success: function (conn, response, options, eOpts) {
                    var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                    Ext.each(result.items, function (item) {
                        if (item.ERROR > 0) {
                            console.info("refraccion od");
                        }

                    });
                },
                failure: function (conn, response, options, eOpts) {
                }
            });
        });
    },
    accionGuardarRefraccionOjoIzquierdo: function (store, idconsulta) {
        store.each(function (record) {
            Ext.Ajax.request({
                url: 'index.php/consultorio/refraccionactualizarojoizquierdo',
                params: {
                    vid: 0,
                    vidconsultorio: idconsulta,
                    vfecha: record.get('_fecha'),
                    vesfera: record.get('_esfera'),
                    vcilindro: record.get('_cilindro'),
                    veje: record.get('_eje'),
                    vdip_l: record.get('_dip_l'),
                    vdip_c: record.get('_dip_c'),
                    vav: record.get('_av'),
                    vadiccion: record.get('_adiccion'),
                    vobser1: record.get('_obser1'),
                    vobser2: record.get('_obser2'),
                    vidmed: record.get('_idmed'),
                    vusuario: Ext.util.Cookies.get('idusuario')
                },
                success: function (conn, response, options, eOpts) {
                    var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                    Ext.each(result.items, function (item) {
                        if (item.ERROR > 0) {
                            console.info("refraccion oi");
                        }
                    });
                },
                failure: function (conn, response, options, eOpts) {
                }
            });
        });
    },
    accionImprimirDiagnosticoConsultorio: function () {
        try {
            var grid = Ext.getCmp('dgvatencionespaciente');
            var idcita = grid.getSelectionModel().getSelection()[0].get('_idcita');

        } catch (e) {
            MyDesktop.app.util.Util.showErrorMsg(
                    "No ha selecionado la cita del paciente!");
            return false;
        }
        var _url = 'reportes/imprimirficha/' + idcita.toString();
        xpos = (screen.width / 2) - (1000 / 2);
        ypos = (screen.height / 2) - (600 / 2);
        my =
                window.open(_url, "mywindow",
                        "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);
    },
    accionImprimirDiagnosticoConsultorio_A4: function () {
        try {
            var grid = Ext.getCmp('dgvatencionespaciente');
            var idcita = grid.getSelectionModel().getSelection()[0].get('_idcita');

        } catch (e) {
            MyDesktop.app.util.Util.showErrorMsg(
                    "No ha selecionado la cita del paciente!");
            return false;
        }
        var _url = 'reportes/imprimirficha_A4/' + idcita.toString();
        xpos = (screen.width / 2) - (1000 / 2);
        ypos = (screen.height / 2) - (600 / 2);
        my =
                window.open(_url, "mywindow",
                        "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);
    },
    accionImprimirLenteContacto: function () {
        try {
            var grid = Ext.getCmp('dgvatencionespaciente');
            var idcita = grid.getSelectionModel().getSelection()[0].get('_idcita');

        } catch (e) {
            MyDesktop.app.util.Util.showErrorMsg(
                    "No ha selecionado la cita del paciente!");
            return false;
        }
        console.log(idcita);
        var _url = 'reportes/imprimirlentecontacto/' + idcita.toString();
        xpos = (screen.width / 2) - (1000 / 2);
        ypos = (screen.height / 2) - (600 / 2);
        my = window.open(_url, "mywindow",
                "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);
    },
    accionImprimirLenteContacto_A4: function () {
        try {
            var grid = Ext.getCmp('dgvatencionespaciente');
            var idcita = grid.getSelectionModel().getSelection()[0].get('_idcita');

        } catch (e) {
            MyDesktop.app.util.Util.showErrorMsg(
                    "No ha selecionado la cita del paciente!");
            return false;
        }
        console.log(idcita);
        var _url = 'reportes/imprimirlentecontacto_A4/' + idcita.toString();
        xpos = (screen.width / 2) - (1000 / 2);
        ypos = (screen.height / 2) - (600 / 2);
        my = window.open(_url, "mywindow",
                "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);
    },
    accionGuardarLenteContactoOjoDerecho: function (store, idconsulta) {



        store.each(function (record) {
            console.log("potencia "+record.get('_potencia'));
            Ext.Ajax.request({
                url: 'index.php/consultorio/lentecontactoactualizarojoderecho',
                params: {
                    vid: 0,
                    vidconsultorio: idconsulta,
                    vfecha: record.get('_fecha'),
                    vesfera: record.get('_esfera'),
                    vcilindro: record.get('_cilindro'),
                    veje: record.get('_eje'),
                    vradio: record.get('_radio'),
                    vpotencia: record.get('_potencia'),
                    vdiametro: record.get('_diametro'),
                    vcurva: record.get('_curva'),
                    vtipo: record.get('_tipo'),
                    vproximarevision: new Date(),
                    vobser: record.get('_obser'),
                    vidmed: record.get('_idmed'),
                    vusuario: Ext.util.Cookies.get('idusuario')
                },
                success: function (conn, response, options, eOpts) {
                    var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                    Ext.each(result.items, function (item) {
                        if (item.ERROR > 0) {
                            console.info("lentecontacto od");
                        }

                    });
                },
                failure: function (conn, response, options, eOpts) {
                }
            });
        });
    },
    accionGuardarLenteContactoOjoIzquierdo: function (store, idconsulta) {
        store.each(function (record) {
            Ext.Ajax.request({
                url: 'index.php/consultorio/lentecontactoactualizarojoizquierdo',
                params: {
                    vid: 0,
                    vidconsultorio: idconsulta,
                    vfecha: record.get('_fecha'),
                    vesfera: record.get('_esfera'),
                    vcilindro: record.get('_cilindro'),
                    veje: record.get('_eje'),
                    vradio: record.get('_radio'),
                    vpotencia: record.get('_potencia'),
                    vdiametro: record.get('_diametro'),
                    vcurva: record.get('_curva'),
                    vtipo: record.get('_tipo'),
                    vproximarevision: new Date(),
                    vobser: record.get('_obser'),
                    vidmed: record.get('_idmed'),
                    vusuario: Ext.util.Cookies.get('idusuario')
                },
                success: function (conn, response, options, eOpts) {
                    var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                    Ext.each(result.items, function (item) {
                        if (item.ERROR > 0) {
                            console.info("lentecontacto oi");
                        }
                    });
                },
                failure: function (conn, response, options, eOpts) {
                }
            });
        });
    },
    accionGuardarBiocroscopia: function (idconsulta) {

        var conductolagrimal = Ext.getCmp('rbConductoLagrimal').getChecked();
        var _conductolagrimal = 0;
        for (var i = 0; i < conductolagrimal.length; i++) {
            _conductolagrimal = conductolagrimal[i].inputValue;
        }

        Ext.Ajax.request({
            url: 'index.php/consultorio/biomicroscopiaactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vconductolagrimal: _conductolagrimal,
                vcantidadlagrima: Ext.getCmp('txtBiocroscopiaCantLagrima').getValue(),
                vtestshimer: Ext.getCmp('txtBiocroscopiaTestShirmer').getValue(),
                vpreparadoestado: Ext.getCmp('txtBiocroscopiaParpadosEstado').getValue(),
                vtosis: Ext.getCmp('txtBiocroscopiaPtosis').getValue(),
                vposion: Ext.getCmp('txtBiocroscopiaPosion').getValue(),
                vconjuntiva: Ext.getCmp('txtBiocroscopiaConjuntiva').getValue(),
                vcornea: Ext.getCmp('txtBiocroscopiaCornea').getValue(),
                vcristalinocod: Ext.getCmp('txtBiocroscopiaCristalinoCod').getValue(),
                vcristalinodes: Ext.getCmp('txtBiocroscopiaCristalinoDes').getValue(),
                viridocorneal: Ext.getCmp('txtBiocroscopiaEsclerotica').getValue(),
                vesclerotica: Ext.getCmp('txtBiocroscopiaEsclerotica').getValue(),
                viris: Ext.getCmp('txtBiocroscopiaIris').getValue(),
                vtxtpio_od: Ext.getCmp("txtpio_od").getValue(),
                vtxtpio_id: Ext.getCmp("txtpio_id").getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionGuardarHistoria: function (idconsulta) {
        var historiafamiliar = Ext.getCmp('chkgHistoriaFamiliar').getChecked();
        var ht1 = 0;
        var ht2 = 0;
        var ht3 = 0;
        var ht4 = 0;
        var ht5 = 0;
        var ht6 = 0;
        var ht7 = 0;
        for (var i = 0; i < historiafamiliar.length; i++) {
            switch (historiafamiliar[i].inputValue) {
                case '1':
                    ht1 = 1;
                    break;
                case '2':
                    ht2 = 1;
                    break;
                case '3':
                    ht3 = 1;
                    break;
                case '4':
                    ht4 = 1;
                    break;
                case '5':
                    ht5 = 1;
                    break;
                case '6':
                    ht6 = 1;
                    break;
                case '7':
                    ht7 = 1;
                    break;
            }
        }

        var hq1 = 0;
        var hq2 = 0;
        var historiaquimica = Ext.getCmp('chkgHistoriaQuimica').getChecked();
        for (var i = 0; i < historiaquimica.length; i++) {
            switch (historiaquimica[i].inputValue) {
                case '1':
                    hq1 = 1;
                    break;
                case '2':
                    hq2 = 1;
                    break;
            }
        }

        var ante1 = 0;
        var ante2 = 0;
        var ante3 = 0;
        var ante4 = 0;
        var ante5 = 0;
        var ante6 = 0;
        var ante7 = 0;
        var ante8 = 0;

        var atecedentes = Ext.getCmp('chkgAtecedentes').getChecked();
        for (var i = 0; i < atecedentes.length; i++) {
            switch (atecedentes[i].inputValue) {
                case '1':
                    ante1 = 1;
                    break;
                case '2':
                    ante2 = 1;
                    break;
                case '3':
                    ante3 = 1;
                    break;
                case '4':
                    ante4 = 1;
                    break;
                case '5':
                    ante5 = 1;
                    break;
                case '6':
                    ante6 = 1;
                    break;
                case '7':
                    ante7 = 1;
                    break;
                case "8":
                    ante8 = 1;
                    break;
            }
        }

        Ext.Ajax.request({
            url: 'index.php/consultorio/historiaactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vanamnesis: Ext.getCmp('txtHistoriaAnamnesis').getValue(),
                vusagafas: Ext.getCmp('txtHistoriaDesdeGafas').getValue(),
                vprogresion: Ext.getCmp('txtHistoriaProgreso').getValue(),
                venferocular: Ext.getCmp('txtHistoriaEnfermedad').getValue(),
                vhf_estrabismo: ht1,
                vhf_leucoma: ht2,
                vhf_glaucoma: ht3,
                vhf_hiperart: ht4,
                vhf_catarata: ht5,
                vhf_ojoseco: ht6,
                vhf_diabetes: ht7,
                vazucar: hq1,
                vhipertension: hq1,
                vtratamiento: Ext.getCmp('txtHistoriaTratamiento').getValue(),
                valergias: Ext.getCmp('txtHistoriaAlergias').getValue(),
                vultimarevision: Ext.getCmp('txtHistoriaUtlRevision').getValue(),
                vrecomendado: Ext.getCmp('txtHistoriaRecomendado').getValue(),
                vap_estrabismo: ante1,
                vap_leucoma: ante2,
                vap_glaucoma: ante3,
                vap_hiperart: ante4,
                vap_ojoseco: ante7,
                vap_catarataod: ante5,
                vap_catarataoi: ante6,
                vap_diabetes: ante8,
                vtxt_historia_otros_ap_otros: Ext.getCmp("txt_historia_otros_ap_otros").getValue(),
                vtipocristal: Ext.getCmp('txtHistoriaTipoCristal').getValue(),
                vmedcentrocristales: Ext.getCmp('txtHistoriaCristales').getValue(),
                vprisma: Ext.getCmp('txtHistoriaPrisma').getValue(),
                vadiccion: Ext.getCmp('txtHistoriaAdicion').getValue(),
                vagudezavisual: Ext.getCmp('txtHistoriaAgudeza').getValue(),
                vojodere_sc: Ext.getCmp('ojodere_sc').getValue(),
                vojodere_cc: Ext.getCmp("ojodere_cc").getValue(),
                vojodere_ae: Ext.getCmp("ojodere_ae").getValue(),
                vojoizq_sc: Ext.getCmp("ojoizq_sc").getValue(),
                vojoizq_cc: Ext.getCmp("ojoizq_cc").getValue(),
                vojoizq_ae: Ext.getCmp("ojoizq_ae").getValue(),
                vultimarefraccion_od: Ext.getCmp("ultimarefraccion_od").getValue(),
                vultimarefraccion_oi: Ext.getCmp("ultimarefraccion_oi").getValue(),
                vultimarefraccion_add: Ext.getCmp("ultimarefraccion_add").getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionOftalmoscopiaActualizar: function (idconsulta) {

        Ext.Ajax.request({
            url: 'index.php/consultorio/oftalmoscopiaactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vpapila: Ext.getCmp('txtOftalmoNervioOptico').getValue(),
                vmacula: Ext.getCmp('txtOftalmoMacula').getValue(),
                vvasosanguineo: Ext.getCmp('txtOftalmoVasosSanguineos').getValue(),
                vcolor: Ext.getCmp('txtOftalmoColor').getValue(),
                vrefrejoforeal: Ext.getCmp('txtOftalmoReflejoForeal').getValue(),
                vmediosrefractivos:
                        Ext.getCmp('txtOftalmoMediosRefractivos').getValue(),
                vretinaperiferica:
                        Ext.getCmp('txtOftalmoEstadoRetinaPeriferica').getValue(),
                vretinacentral: Ext.getCmp('txtOftalmoEstadoRetinaCentral').getValue(),
                vrelacioncd: Ext.getCmp('txtOftalmoRelacionCd').getValue(),
                vpapila2: Ext.getCmp('txtOftalmoNervioOptico2').getValue(),
                vmacula2: Ext.getCmp('txtOftalmoMacula2').getValue(),
                vvasosanguineo2: Ext.getCmp('txtOftalmoVasosSanguineos2').getValue(),
                vcolor2: Ext.getCmp('txtOftalmoColor2').getValue(),
                vrefrejoforeal2: Ext.getCmp('txtOftalmoReflejoForeal2').getValue(),
                vmediosrefractivos2:
                        Ext.getCmp('txtOftalmoMediosRefractivos2').getValue(),
                vretinaperiferica2:
                        Ext.getCmp('txtOftalmoEstadoRetinaPeriferica2').getValue(),
                vretinacentral2: Ext.getCmp('txtOftalmoEstadoRetinaCentral2').getValue(),
                vrelacioncd2: Ext.getCmp('txtOftalmoRelacionCd2').getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionDipaddActualizar: function (idconsulta) {


        console.log(Ext.getCmp('dipcerca').getValue());
        console.log(Ext.getCmp('diplejos').getValue());
        console.log(Ext.getCmp('addcerca').getValue());
        console.log(Ext.getCmp('refraccion_observacion').getValue());
        console.log(Ext.ComponentQuery.query("dipadd textfield#agudezavisual"));
        Ext.Ajax.request({
            url: 'index.php/consultorio/dipaddactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vdip_cerca: Ext.getCmp('dipcerca').getValue(),
                vdip_lejos: Ext.getCmp('diplejos').getValue(),
                vadd_cerca: Ext.getCmp('addcerca').getValue(),
                vobservacion: Ext.getCmp('refraccion_observacion').getValue(),
                vagudezavisual: Ext.ComponentQuery.query("dipadd textfield#agudezavisual")[0].getValue(),
                vrefraciclo_od: Ext.ComponentQuery.query("refraccionciclopejia textfield#refracicloOD")[0].getValue(),
                vrefraciclo_oi: Ext.ComponentQuery.query("refraccionciclopejia textfield#refracicloOI")[0].getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')

            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionDiagnosticoActualizar: function (idconsulta) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/diagnosticoactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vdiagnostico: Ext.getCmp('txtDiagnosticoDiagnostico').getValue(),
                vtratamiento: Ext.getCmp('txtDiagnosticoTratamiento').getValue(),
                vproximacita: Ext.getCmp('dfDiagnosticoProximaCita').getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });

    },
    accionRestoActualizar: function (idconsulta) {
        var cover1 = 0;
        var cover2 = 0;
        var cover3 = 0;
        var cover4 = 0;
        var cover5 = 0;
        var cover6 = 0;
        var covertest = Ext.getCmp('chkgRestoCoverTest').getChecked();
        for (var i = 0; i < covertest.length; i++) {
            switch (covertest[i].inputValue) {
                case '1':
                    cover1 = 1;
                    break;
                case '2':
                    cover2 = 1;
                    break;
                case '3':
                    cover3 = 1;
                    break;
                case '4':
                    cover4 = 1;
                    break;
                case '5':
                    cover5 = 1;
                    break;
                case '6':
                    cover6 = 1;
                    break;
            }
        }
        var filtro1 = 0;
        var filtro2 = 0;
        var filtros = Ext.getCmp('ckbgFiltroRojo').getChecked();
        for (var i = 0; i < filtros.length; i++) {
            switch (filtros[i].inputValue) {
                case '1':
                    filtro1 = 1;
                    break;
                case '2':
                    filtro2 = 1;
                    break;
            }
        }
        var corres1 = 0;
        var corres2 = 0;
        var correspondencia = Ext.getCmp('chkgRestoCorrespondencia').getChecked();
        for (var i = 0; i < correspondencia.length; i++) {
            switch (correspondencia[i].inputValue) {
                case '1':
                    corres1 = 1;
                    break;
                case '2':
                    corres2 = 1;
                    break;
            }
        }

        var campovisual1OD = 0;
        var campovisual2OD = 0;
        var campovisual = Ext.getCmp('chkgRestoCampoVisualOD').getChecked();
        for (var i = 0; i < campovisual.length; i++) {
            switch (campovisual[i].inputValue) {
                case '1':
                    campovisual1OD = 1;
                    break;
                case '2':
                    campovisual2OD = 1;
                    break;
            }
        }
        var campovisual1OI = 0;
        var campovisual2OI = 0;
        var campovisual = Ext.getCmp('chkgRestoCampoVisualOI').getChecked();
        for (var i = 0; i < campovisual.length; i++) {
            switch (campovisual[i].inputValue) {
                case '1':
                    campovisual1OI = 1;
                    break;
                case '2':
                    campovisual2OI = 1;
                    break;
            }
        }

        Ext.Ajax.request({
            url: 'index.php/consultorio/restoactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vpupilas_iguales: Ext.getCmp('txtRestoPupilasIguales').getValue(),
                vpupilas_redondas: Ext.getCmp('txtRestoPupilasRedondas').getValue(),
                vpupilas_responden:
                        Ext.getCmp('txtRestoPupilasRespondenLuz').getValue(),
                vpupilas_acomodacion:
                        Ext.getCmp('txtRestoPupilasRespondenAcomo').getValue(),
                vmotilidadocular: Ext.getCmp('txtRestoMotilidad').getValue(),
                vpuntocovergencia:
                        Ext.getCmp('txtRestoPupilasPuntoProximo').getValue(),
                vcover_esotropia: cover1,
                vcover_exotropia: cover2,
                vcover_esoforia: cover3,
                vcover_exoforia: cover4,
                vcover_hipertropia: cover5,
                vcover_hipotropia: cover6,
                vtonometria_odcod: Ext.getCmp('txtRestoTonometriaODcod').getValue(),
                vtonometria_oddes: Ext.getCmp('txtRestoTonometriaODDesc').getValue(),
                vtonometria_oicod: Ext.getCmp('txtRestoTonometriaOIcod').getValue(),
                vtonometria_oides: Ext.getCmp('txtRestoTonometriaOIDesc').getValue(),
                vvisioncolores: Ext.getCmp('txtRestoVisionColores').getValue(),
                vprismavertical: Ext.getCmp('txtRestoPrismaVertical').getValue(),
                vsuprimealgunojo: filtro1,
                vfusionaimagenes: filtro2,
                vlucesworth: Ext.getCmp('txtRestoLucesWorth').getValue(),
                vstereopsis: Ext.getCmp('txtRestoStereopsis').getValue(),
                vretiniana_normal: corres1,
                vretiniana_falsa: corres2,
                vrejilla_ojoderecho:
                        Ext.getCmp('txtRestoRejillaOjoDerecho').getValue(),
                vrejilla_ojoizquierdo:
                        Ext.getCmp('txtRestoRejillaOjoIzquierdo').getValue(),
                vconfrontacion_od_normal: campovisual1OD,
                vconfrontacion_od_disminuido: campovisual2OD,
                vconfrontacion_oi_normal: campovisual1OI,
                vconfrontacion_oi_disminuido: campovisual1OI,
                vishijara_otros_test: Ext.getCmp("ishijara_otros_test").getValue(),
                vsegundos_otros_test_esteriopsis: Ext.getCmp("segundos_otros_test_esteriopsis").getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {
            }
        });
    },
    accionLimpiarFormularios: function () {
        Ext.getCmp('biomicroscopiaingreso').getForm().reset();
        Ext.getCmp('diagnosticoingreso').getForm().reset();
        Ext.getCmp('historiaingreso').getForm().reset();
        Ext.getCmp('oftalmoscopiaingreso').getForm().reset();
        Ext.getCmp('oftalmoscopiaingreso2').getForm().reset();
        Ext.getCmp('restoingreso').getForm().reset();
        Ext.getCmp('dipadd').getForm().reset();
        Ext.ComponentQuery.query("refraccionciclopejia")[0].getForm().reset();
        var storeROD = Ext.getCmp('dgvRefraccionOjoDerecho').getStore();
        storeROD.removeAll();
        var storeROI = Ext.getCmp('dgvRefraccionOjoIzquierdo').getStore();
        storeROI.removeAll();
        var storeLCOD = Ext.getCmp('dgvLenteContactoOjoDerecho').getStore();
        storeLCOD.removeAll();
        var storeLCOI = Ext.getCmp('dgvLenteContactoOjoIzquierdo').getStore();
        storeLCOI.removeAll();
        var tabpanel = Ext.getCmp('myTabPanel');
        tabpanel.setActiveTab('tabRefraccion');
    }

});
