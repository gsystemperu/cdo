var __editar = 0;
var __idConsultorio = 0;



Ext.define('MyDesktop.app.views.consulta.ConsultaFotosAtenciones', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wconsultafotosatenciones',
    id: 'wconsultafotosatenciones',
    config: {
        id: 0
    },
    requires: [
        'MyDesktop.app.stores.Trabajadores',
        'MyDesktop.app.views.consulta.Refraccion2',
        'MyDesktop.app.views.consulta.LenteContacto2',
        'MyDesktop.app.views.consulta.Historia2',
        'MyDesktop.app.views.consulta.Biomicroscopia2',
        'MyDesktop.app.views.consulta.Oftalmoscopia2_1',
        'MyDesktop.app.views.consulta.Oftalmoscopia2_2',
        'MyDesktop.app.views.consulta.Diagnostico2',
        'MyDesktop.app.views.consulta.Resto2',
        'MyDesktop.app.views.consulta.DipAdd2',
        'MyDesktop.app.stores.citas.Citas',
        "MyDesktop.app.stores.Paciente"

    ],
    initComponent: function () {
        var me = this;

        var storepaciente = Ext.create("MyDesktop.app.stores.Paciente");
        var storemedicos = Ext.create('MyDesktop.app.stores.Trabajadores');
        var storeProgramados =
            Ext.create('MyDesktop.app.stores.citas.PacientesParaAtencionMedica');
        var storeHisAtenciones_consulta =
            Ext.create('MyDesktop.app.stores.citas.HistorialConsultorioPaciente');

        var storeFotosPaciente = Ext.create('MyDesktop.app.stores.citas.FotosPaciente');

        //        var autoLoadCompras =
        //                {
        //                    run: function () {
        //                        me.accionSeleccionarSoloMedico();
        //                    },
        //                    interval: 10000   //* 1 => segundo => 1000
        //                }
        //
        //        Ext.TaskManager.start(autoLoadCompras);

        Ext.applyIf(me, {
            layout: 'border',
            items: [{
                    xtype: 'panel',
                    region: 'west',
                    flex : 1,
                    layout: {
                        align: 'stretch',
                        type: 'fit'
                    },
                    title: 'Visualizador de Foto',
                    items: [
                            {
                                xtype:'image',
                                flex: 1,
                                itemId : 'igmFotoRender',
                                /*listeners : {
                                load : {
                                    element : 'el',  //the rendered img element
                                    fn : console.log
                                    }
                                }*/
                            }
                      
                    ] // fin de item lado izquierdo

                },
                {
                    xtype: 'panel',
                    region: 'center',
                    flex: 0.5,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    
                    items:[
                        {
                            xtype:'form',
                            bodyPadding:10,
                            id:'frmFotoOCT',
                            items: [
                            {
                                xtype:'hiddenfield',
                                name : 'codigopacienteoct',
                                id : 'txtcodigoOct'
                            },
                            {
                                xtype: 'filefield',
                                name: 'fotooct',
                                fieldLabel: '<b>OCT</b>',
                               // labelWidth: 120,
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '70%',
                                buttonText: 'Buscar'
                            },{
                                xtype:'button',text:'Enviar Servidor',
                                handler:function(){
                                    if(Ext.getCmp('txtcodigoOct').getValue()==''){Ext.Msg.alert("Error","Seleccionar a un paciente");return false;}
                                    var form = Ext.getCmp('frmFotoOCT').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url : '../subirfotooct.php',
                                            waitMsg: 'Enviando foto al servidor...',
                                            success: function(fp, o) {
                                                Ext.Msg.alert('Exito', 'La fotografia fue subida');
                                                var _store = Ext.getCmp('dgvFotosCargadasPaciente').getStore();
                                                _store.load();
                                            }
                                        });
                                    }
                                }

                            }],

                            
                        },
                         {
                            xtype:'form',
                            bodyPadding:10,
                            id:'frmFotoDV',
                            items: [
                             {
                                xtype:'hiddenfield',
                                name : 'codigopacientedv',
                                id : 'txtcodigoDv'
                            },
                            {
                                xtype: 'filefield',
                                name: 'fotodv',
                                fieldLabel: '<b>Diagnostico Visual</b>',
                                //labelWidth:120,
                                msgTarget: 'side',
                                allowBlank: false,
                                anchor: '70%',
                                buttonText: 'Buscar'
                            },
                            {
                                xtype:'button',text:'Enviar Servidor',
                                handler:function(){
                                    if(Ext.getCmp('txtcodigoDv').getValue()==''){Ext.Msg.alert("Error","Seleccionar a un paciente");return false;}
                                    var form = Ext.getCmp('frmFotoDV').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url : '../subirfotodv.php',
                                            waitMsg: 'Enviando foto al servidor...',
                                            success: function(fp, o) {
                                                Ext.Msg.alert('Exito', 'La fotografia fue subida');
                                                var _store = Ext.getCmp('dgvFotosCargadasPaciente').getStore();
                                                _store.load();
                                            }
                                        });
                                    }
                                }

                            }]

                          
                            
                        },
                        {

                            xtype:'grid',
                            autoScroll:true,
                            id:'dgvFotosCargadasPaciente',
                            title :'Registro de Fotografias del cliente ',
                            store : storeFotosPaciente,
                            height: 230,
                            columns:[
                                {text:'Tipo',flex: 1,dataIndex:'_tipo'},
                                {text:'Fecha',flex: 1,dataIndex:'_fecha'},
                                {
                                    xtype : 'actioncolumn',
                                    width : 40,
                                    align : 'center',
                                    items : [
                                        {
                                        iconCls : 'remove',
                                        handler : function(grid, rowIndex, colIndex) {
                                            var record = grid.getStore().getAt(rowIndex);
                                             Ext.Ajax.request({
                                                url: "index.php/consultorio/eliminarphoto",
                                                params: {
                                                    id   :  record.get('_id'),
                                                    tipo :  record.get('_tipo')
                                                },
                                                success: function (conn, response, options, eOpts) {
                                                        Ext.getCmp('dgvFotosCargadasPaciente').getStore().load();
                                                },
                                                failure: function (conn, response, options, eOpts) {}
                                            });
                                        }
                                        }
                                    ]
                                    }
                            ],
                             listeners: {
                                        itemclick: function (grid, record, item, index, event) {
                                            var objfoto = Ext.ComponentQuery.query("#igmFotoRender")[0];
                                            if(record.get('_tipo')=='OCT'){
                                                objfoto.setSrc('/fotos/oct/'+  record.get('_id').toString()  +'.jpg')
                                            }else if(record.get('_tipo')=='DV'){
                                                objfoto.setSrc('/fotos/dv/' +  record.get('_id').toString()  + '.jpg')
                                            }
                                        }
                             }
                        }
                    ]
                   
                    
                   
                }
            ]

        }); // Fin Constructor

        me.callParent(arguments);

     
        /*Ext.getCmp('cboMedicoConsultorio_consulta')
            .on('select', me.accionSeleccionarMedico, this);
        Ext.getCmp('dgvpacientesprogramados_consulta')
            .on('itemclick', me.accionHistorialAtencionesPaciente, this);
        Ext.getCmp("dgvpacientesprogramados_consulta").on("select", me.accionHistorialAtencionesPaciente2, this);
        */

       /* Ext.getCmp('btnGuardarFichaAtension_consulta')
            .on('click', me.accionGuardarAtencion, this);
        Ext.getCmp('btnCancelarAtencion_consulta')
            .on('click', me.accionLimpiarFormularios, this);
        Ext.getCmp('btnImprimirDiagnostico_consulta')
            .on('click', me.accionImprimirDiagnosticoConsultorio, this);
        Ext.getCmp('btnImprimirDiagnostico_A4_consulta')
            .on('click', me.accionImprimirDiagnosticoConsultorio_A4, this);
        Ext.getCmp('btnImprimirLenteContacto_consulta')
            .on('click', me.accionImprimirLenteContacto, this);
        Ext.getCmp('btnImprimirLenteContacto_A4_consulta')
            .on('click', me.accionImprimirLenteContacto_A4, this);
        Ext.getCmp('dtfechacitaConsulta_consulta')
            .on('select', me.accionSeleccionarMedico, this);
        Ext.getCmp('btnEditarFichaAtencion_consulta')
            .on('click', me.accionEditarTraerDatos, this);*/

        //Ext.getCmp("btnbuscar_consultahistoriapaciente2").on("click", me.accionBuscarPaciente, this);
       // Ext.getCmp("txtbuscar_consultahistoriapaciente2").on("keypress", me.accionEnterBuscarPaciente, this);
       // Ext.getCmp("btnrefrescar_consultahistoriapaciente2").on("click", me.accionRefrescarPaciente, this);

    },

    accionEnterBuscarPaciente: function (field, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            var cadena = Ext.getCmp("txtbuscar_consultahistoriapaciente2").getValue();
            var store = Ext.getCmp('dgvpacientesprogramados_consulta2').getStore();
            store.removeAll();
            store.load({
                params: {
                    opcion: 1,
                    cadena: cadena
                }
            });
            Ext.getCmp("txtbuscar_consultahistoriapaciente2").focus();
        }
    },
    accionRefrescarPaciente: function (btn, e, opc) {
        Ext.getCmp("txtbuscar_consultahistoriapaciente2").reset();
        var store = Ext.getCmp('dgvpacientesprogramados_consulta2').getStore();
        store.removeAll();
        store.load({
            params: {
                opcion: 0
            }
        });
        Ext.getCmp("txtbuscar_consultahistoriapaciente2").focus();

    },
    accionBuscarPaciente: function (btn, e, opc) {
        var cadena = Ext.getCmp("txtbuscar_consultahistoriapaciente2").getValue();
        var store = Ext.getCmp('dgvpacientesprogramados_consulta2').getStore();
        store.removeAll();
        store.load({
            params: {
                opcion: 1,
                cadena: cadena
            }
        });
        Ext.getCmp("txtbuscar_consultahistoriapaciente2").focus();
    },
    accionSeleccionarSoloMedico: function (obj, value, eOpts) {
        var store = Ext.getCmp('dgvpacientesprogramados_consulta2').getStore();
        store.getProxy().extraParams = {
            vfecha: Ext.getCmp('dtfechacitaConsulta').getValue(),
            vidmedico: Ext.getCmp('cboMedicoConsultorio_consulta').getValue()
        };
        store.load();
        //Ext.getCmp('dgvatencionespaciente').getStore().removeAll();

    },
    accionSeleccionarMedico: function (obj, value, eOpts) {
        var store = Ext.getCmp('dgvpacientesprogramados_consulta2').getStore();
        store.getProxy().extraParams = {
            vfecha: Ext.getCmp('dtfechacitaConsulta_consulta').getValue(),
            vidmedico: Ext.getCmp('cboMedicoConsultorio_consulta').getValue()
        };
        store.load();
        Ext.getCmp('dgvatencionespaciente_consulta').getStore().removeAll();

    },
    accionHistorialAtencionesPaciente: function (obj, record, item, index, e) {

        var store = Ext.getCmp('dgvatencionespaciente_consulta').getStore();
        store.getProxy().extraParams = {
            vidpaciente: record.get('_idper')
        };
        store.load();
        var edad = record.data._edad != null ? record.data._edad : "";
        Ext.getCmp('panelRegistroDeAtenciones_consulta').setTitle("Registro de Atenciones del Paciente  :  " + record.data._ncompleto + "------" + "Edad : " + edad);


    },
    accionHistorialAtencionesPaciente2: function (obj, record, index, eOpts) {
        var store = Ext.getCmp('dgvatencionespaciente_consulta').getStore();
        store.getProxy().extraParams = {
            vidpaciente: record.get('_idper')
        };
        store.load();
        var edad = record.data._edad != null ? record.data._edad : "";
        Ext.getCmp('panelRegistroDeAtenciones_consulta').setTitle("Registro de Atenciones del Paciente  :  " + record.data._ncompleto + "------" + "Edad : " + edad);
    },
    accionEditarTraerDatos: function (obj) {


        this.accionLimpiarFormularios();
        __editar = 1;
        __idcita = 0;
        me = this;
        try {
            var record = Ext.getCmp('dgvatencionespaciente_consulta')
                .getSelectionModel()
                .getSelection();
            __idcita = record[0].get('_idcita');
            __idConsultorio = record[0].get('_idconsul');
            var message = new Ext.LoadMask(Ext.getCmp('myTabPanel_consulta'), {
                msg: " Cargando la informacion..."
            });
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
            params: {
                vidcita: __idcita
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('dipcerca2').setValue(item._dip_cerca);
                    Ext.getCmp('diplejos2').setValue(item._dip_lejos);
                    Ext.getCmp('addcerca2').setValue(item._add_cerca);
                    Ext.getCmp('refraccion_observacion2').setValue(item._observacion);


                });
            },
            failure: function (conn, response, options, eOpts) {}
        });
    },
    accionLlenarDiagnostico: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/diagnosticodatos',
            params: {
                vidcita: __idcita
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtDiagnosticoDiagnostico2').setValue(item._diagnostico);
                    Ext.getCmp('txtDiagnosticoTratamiento2').setValue(item._tratamiento);
                    Ext.getCmp('dfDiagnosticoProximaCita2').setValue(item._proximacita);
                });
            },
            failure: function (conn, response, options, eOpts) {}
        });

        // __message.destroy();
    },
    accionLLenarGrillaRefraccion: function (__idcita, __ojo) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/refracciondatos',
            params: {
                vidcita: __idcita,
                vojo: __ojo
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (__ojo == 'OD') {
                        var store = Ext.getCmp('dgvRefraccionOjoDerecho2').getStore();
                    } else {
                        var store = Ext.getCmp('dgvRefraccionOjoIzquierdo2').getStore();
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
            failure: function (conn, response, options, eOpts) {}
        });

    },
    accionLLenarGrillaLenteContacto: function (__idcita, __ojo) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/lentecontactodatos',
            params: {
                vidcita: __idcita,
                vojo: __ojo
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (__ojo == 'OD') {
                        var store = Ext.getCmp('dgvLenteContactoOjoDerecho2').getStore();
                    } else {
                        var store = Ext.getCmp('dgvLenteContactoOjoIzquierdo2').getStore();
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
            failure: function (conn, response, options, eOpts) {}
        });

    },
    accionLLenarHistoria: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/historiadatos',
            params: {
                vidcita: __idcita
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtHistoriaAnamnesis2').setValue(item._anamnesis);
                    Ext.getCmp('txtHistoriaDesdeGafas2').setValue(item._usagafas);
                    Ext.getCmp('txtHistoriaProgreso2').setValue(item._pregresion);
                    Ext.getCmp('txtHistoriaEnfermedad2').setValue(item._enferoculares);
                    Ext.getCmp('txtHistoriaTratamiento2').setValue(item._tratamiento);
                    Ext.getCmp('txtHistoriaAlergias2').setValue(item._alergias);
                    Ext.getCmp('txtHistoriaUtlRevision2').setValue(item._ultimarevision);
                    Ext.getCmp('txtHistoriaRecomendado2').setValue(item._recomendado);
                    Ext.getCmp('txtHistoriaTipoCristal2').setValue(item._tipocristal);
                    Ext.getCmp('txtHistoriaCristales2').setValue(item._medcentrocristales);
                    Ext.getCmp('txtHistoriaAdicion2').setValue(item._adiccion);
                    Ext.getCmp('txtHistoriaAgudeza2').setValue(item._agudezavisual);
                    Ext.getCmp('txtHistoriaPrisma2').setValue(item._prisma);

                    Ext.getCmp('ojodere_sc2').setValue(item.vojodere_sc);
                    Ext.getCmp("ojodere_cc2").setValue(item.vojodere_cc);
                    Ext.getCmp("ojodere_ae2").setValue(item.vojodere_ae);
                    Ext.getCmp("ojoizq_sc2").setValue(item.vojoizq_sc);
                    Ext.getCmp("ojoizq_cc2").setValue(item.vojoizq_cc);
                    Ext.getCmp("ojoizq_ae2").setValue(item.vojoizq_ae);
                    Ext.getCmp("ultimarefraccion_od2").setValue(item.vultimarefraccion_od);
                    Ext.getCmp("ultimarefraccion_oi2").setValue(item.vultimarefraccion_oi);
                    Ext.getCmp("ultimarefraccion_add2").setValue(item.vultimarefraccion_add);


                    var historiaFamiliar = Ext.getCmp('chkgHistoriaFamiliar2');
                    historiaFamiliar.setValue({
                        '1': (item._hf_estrabismo == 0 ? false : true),
                        '2': (item._hf_leucoma == 0 ? false : true),
                        '3': (item._hf_glaucoma == 0 ? false : true),
                        '4': (item._hf_hiperart == 0 ? false : true),
                        '5': (item._hf_catarata == 0 ? false : true),
                        '6': (item._hf_ojoseco == 0 ? false : true),
                        '7': (item._hf_diabetes == 0 ? false : true),
                    });

                    var antecedentesPersonales = Ext.getCmp('chkgAtecedentes2');
                    antecedentesPersonales.setValue({
                        '1': (item._ap_estrabismo == 0 ? false : true),
                        '2': (item._ap_leucoma == 0 ? false : true),
                        '3': (item._ap_glaucoma == 0 ? false : true),
                        '4': (item._ap_hiperart == 0 ? false : true),
                        '5': (item._ap_catarata == 0 ? false : true),
                        '6': (item._ap_ojoseco == 0 ? false : true),
                        '7': (item._ap_diabetes == 0 ? false : true),
                    });

                    var historiaQuimica = Ext.getCmp('chkgHistoriaQuimica2');
                    historiaQuimica.setValue({
                        '1': (item._azucar == 0 ? false : true),
                        '2': (item._hipertersion == 0 ? false : true),
                    });
                });
            },
            failure: function (conn, response, options, eOpts) {}
        });

    },
    accionLLenarBiomicroscopia: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/biomicroscopiadatos',
            params: {
                vidcita: __idcita
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtBiocroscopiaCantLagrima2').setValue(item._cantlagrima);
                    Ext.getCmp('txtBiocroscopiaTestShirmer2').setValue(item._testshirmer);
                    Ext.getCmp('txtBiocroscopiaParpadosEstado2')
                        .setValue(item._preparadoestado);
                    Ext.getCmp('txtBiocroscopiaPtosis2').setValue(item._ptosis);
                    Ext.getCmp('txtBiocroscopiaPosion2').setValue(item._posion);
                    Ext.getCmp('txtBiocroscopiaConjuntiva2').setValue(item._conjuntiva);
                    Ext.getCmp('txtBiocroscopiaCornea2').setValue(item._cornea);
                    Ext.getCmp('txtBiocroscopiaCristalinoCod2')
                        .setValue(item._cristalinocod);
                    Ext.getCmp('txtBiocroscopiaCristalinoDes2')
                        .setValue(item._cristalinodes);
                    Ext.getCmp('txtBiocroscopiaEsclerotica2').setValue(item._esclerotica);
                    Ext.getCmp('txtBiocroscopiaIris2').setValue(item._iris);
                    Ext.getCmp('txtAnguloIridoCorneal2').setValue(item._iridocorneal);

                    Ext.getCmp("txtpio_od2").setValue(item._pio_od);
                    Ext.getCmp("txtpio_id2").setValue(item._pio_oi);

                    var conductoLagrimal = Ext.getCmp('rbConductoLagrimal2');
                    switch (item._colagrimal) {
                        case '1':
                            Ext.getCmp('optPermeable2').setValue(true);
                            break;
                        case '2':
                            Ext.getCmp('optSemiPermeable2').setValue(true);
                            break;
                        case '3':
                            Ext.getCmp('Ostruido2').setValue(true);
                            break;
                    }
                });
            },
            failure: function (conn, response, options, eOpts) {}
        });
    },
    accionLlenarOftalmoscopia: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/oftalmoscopiadatos',
            params: {
                vidcita: __idcita
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtOftalmoNervioOptico2_1').setValue(item._papila);
                    Ext.getCmp('txtOftalmoMacula2_1').setValue(item._macula);
                    Ext.getCmp('txtOftalmoVasosSanguineos2_1')
                        .setValue(item._vasossanguineos);
                    Ext.getCmp('txtOftalmoColor2_1').setValue(item._color);
                    Ext.getCmp('txtOftalmoReflejoForeal2_1').setValue(item._reflejoforeal);
                    Ext.getCmp('txtOftalmoMediosRefractivos2_1')
                        .setValue(item._mediosrefractivos);
                    Ext.getCmp('txtOftalmoEstadoRetinaPeriferica2_1')
                        .setValue(item._retinaperiferica);
                    Ext.getCmp('txtOftalmoEstadoRetinaCentral2_1')
                        .setValue(item._retinacentral);
                    Ext.getCmp('txtOftalmoRelacionCd2_1').setValue(item._relacioncd);


                    Ext.getCmp('txtOftalmoNervioOptico2_2').setValue(item._papila2);
                    Ext.getCmp('txtOftalmoMacula2_2').setValue(item._macula2);
                    Ext.getCmp('txtOftalmoVasosSanguineos2_2')
                        .setValue(item._vasossanguineos);
                    Ext.getCmp('txtOftalmoColor2_2').setValue(item._color2);
                    Ext.getCmp('txtOftalmoReflejoForeal2_2').setValue(item._reflejoforeal2);
                    Ext.getCmp('txtOftalmoMediosRefractivos2_2')
                        .setValue(item._mediosrefractivos2);
                    Ext.getCmp('txtOftalmoEstadoRetinaPeriferica2_2')
                        .setValue(item._retinaperiferica2);
                    Ext.getCmp('txtOftalmoEstadoRetinaCentral2_2')
                        .setValue(item._retinacentral2);
                    Ext.getCmp('txtOftalmoRelacionCd2_2').setValue(item._relacioncd2);

                });
            },
            failure: function (conn, response, options, eOpts) {}
        });
    },
    accionLlenarResto: function (__idcita) {
        Ext.Ajax.request({
            url: 'index.php/consultorio/restodatos',
            params: {
                vidcita: __idcita
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    Ext.getCmp('txtRestoPupilasIguales2').setValue(item._pupilas_iguales);
                    Ext.getCmp('txtRestoPupilasRedondas2')
                        .setValue(item._pupilas_redondas);
                    Ext.getCmp('txtRestoPupilasRespondenLuz2')
                        .setValue(item._pupilas_responden);
                    Ext.getCmp('txtRestoPupilasRespondenAcomo2')
                        .setValue(item._pupilas_acomodacion);
                    Ext.getCmp('txtRestoMotilidad2').setValue(item._motilidadocular);
                    Ext.getCmp('txtRestoPupilasPuntoProximo2')
                        .setValue(item._puntoconvergencia);
                    Ext.getCmp('txtRestoTonometriaODcod2')
                        .setValue(item._tonometria_odcod);
                    Ext.getCmp('txtRestoTonometriaODDesc2')
                        .setValue(item._tonometria_oddes);
                    Ext.getCmp('txtRestoTonometriaOIcod2')
                        .setValue(item._tonometria_oicod);
                    Ext.getCmp('txtRestoTonometriaOIDesc2')
                        .setValue(item._tonometria_oides);
                    Ext.getCmp('txtRestoVisionColores2').setValue(item._visioncolores);
                    Ext.getCmp('txtRestoPrismaVertical2').setValue(item._prismavertical);
                    Ext.getCmp('txtRestoLucesWorth2').setValue(item._lucesworth);
                    Ext.getCmp('txtRestoStereopsis2').setValue(item._stereopsis);
                    Ext.getCmp('txtRestoRejillaOjoDerecho2')
                        .setValue(item._rejilla_ojoderecho);
                    Ext.getCmp('txtRestoRejillaOjoIzquierdo2')
                        .setValue(item._rejilla_ojoizquierdo);

                    var coverTest = Ext.getCmp('chkgRestoCoverTest2');
                    coverTest.setValue({
                        '1': (item._cover_esotropia == 1 ? true : false),
                        '2': (item._cover_exotropia == 1 ? true : false),
                        '3': (item._cover_esoforia == 1 ? true : false),
                        '4': (item.cover_exoforia == 1 ? true : false),
                        '5': (item._cover_hipertropia == 1 ? true : false),
                        '6': (item._cover_hipotropia == 1 ? true : false)
                    });
                    var filtroRojo = Ext.getCmp('ckbgFiltroRojo2');
                    filtroRojo.setValue({
                        '1': (item._suprimealgunojo == 1 ? true : false),
                        '2': (item._fusionaimagenes == 1 ? true : false),
                    });
                    var restoCorrespondencia = Ext.getCmp('chkgRestoCorrespondencia2');
                    if (item._retiniana_normal == 1)
                        Ext.getCmp('optNormal2').setValue(true);
                    if (item._retiniana_falsa == 1)
                        Ext.getCmp('optFalsa2').setValue(true);

                    var campoVisualOD = Ext.getCmp('chkgRestoCampoVisualOD2');
                    if (item._confrontacion_od_normal == 1)
                        Ext.getCmp('optconfrontacionODnormal2').setValue(true);
                    if (item._confrontacion_od_normal == 2)
                        Ext.getCmp('optconfrontacionODdisminuido2').setValue(true);

                    var campoVisualOI = Ext.getCmp('chkgRestoCampoVisualOI2');
                    if (item._confrontacion_oi_normal == 1)
                        Ext.getCmp('optconfrontacionOInormal2').setValue(true);
                    if (item._confrontacion_oi_normal == 2)
                        Ext.getCmp('optconfrontacionOIdisminuido2').setValue(true);

                });
            },
            failure: function (conn, response, options, eOpts) {}
        });
    },
    //---------------------------------------
    accionGuardarAtencion: function (obj) {

        var message = new Ext.LoadMask(Ext.getCmp('myTabPanel_consulta'), {
            msg: " Guardarnado la informacion..."
        });
        message.show();
        try {
            var record = Ext.getCmp('dgvatencionespaciente_consulta')
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

        Ext.Ajax.request({
            url: 'index.php/consultorio/actualizar',
            params: {
                vid: (__idConsultorio == 0 ? 0 : __idConsultorio),
                vidcita: idcita,
                vfecha: fcita,
                vidmed: Ext.getCmp('cboMedicoConsultorio_consulta').getValue(),
                vproximacita: Ext.getCmp('dfDiagnosticoProximaCita').getValue(),
                vdiagnostico: Ext.getCmp('txtDiagnosticoDiagnostico').getValue(),
                vtratamiento: Ext.getCmp('txtDiagnosticoTratamiento').getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {
                        var idConsulta = parseInt(item.ERROR);
                        var storeROD = Ext.getCmp('dgvRefraccionOjoDerecho').getStore();
                        var storeROI = Ext.getCmp('dgvRefraccionOjoIzquierdo').getStore();
                        var storeLCOD = Ext.getCmp('dgvLenteContactoOjoDerecho').getStore();
                        var storeLCOI =
                            Ext.getCmp('dgvLenteContactoOjoIzquierdo').getStore();
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

                        var grid = Ext.getCmp('dgvatencionespaciente_consulta');
                        var rec = grid.getSelectionModel().getSelection()[0];
                        grid.getStore().load(function (records, operation, success) {
                            grid.getSelectionModel().select(rec.index, true);
                        });
                        message.destroy();
                    }
                });
                me.accionLimpiarFormularios();

            },
            failure: function (conn, response, options, eOpts) {}
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
                failure: function (conn, response, options, eOpts) {}
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
                failure: function (conn, response, options, eOpts) {}
            });
        });
    },
    accionImprimirDiagnosticoConsultorio: function () {
        try {
            var grid = Ext.getCmp('dgvatencionespaciente_consulta');
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
            var grid = Ext.getCmp('dgvatencionespaciente_consulta');
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
            var grid = Ext.getCmp('dgvatencionespaciente_consulta');
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
            var grid = Ext.getCmp('dgvatencionespaciente_consulta');
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
                failure: function (conn, response, options, eOpts) {}
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
                failure: function (conn, response, options, eOpts) {}
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
                    if (item.ERROR > 0) {}
                });
            },
            failure: function (conn, response, options, eOpts) {}
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
                vap_ojoseco: ante5,
                vap_catarata: ante6,
                vap_diabetes: ante7,
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
                    if (item.ERROR > 0) {}
                });
            },
            failure: function (conn, response, options, eOpts) {}
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
                vmediosrefractivos: Ext.getCmp('txtOftalmoMediosRefractivos').getValue(),
                vretinaperiferica: Ext.getCmp('txtOftalmoEstadoRetinaPeriferica').getValue(),
                vretinacentral: Ext.getCmp('txtOftalmoEstadoRetinaCentral').getValue(),
                vrelacioncd: Ext.getCmp('txtOftalmoRelacionCd').getValue(),
                vpapila2: Ext.getCmp('txtOftalmoNervioOptico2').getValue(),
                vmacula2: Ext.getCmp('txtOftalmoMacula2').getValue(),
                vvasosanguineo2: Ext.getCmp('txtOftalmoVasosSanguineos2').getValue(),
                vcolor2: Ext.getCmp('txtOftalmoColor2').getValue(),
                vrefrejoforeal2: Ext.getCmp('txtOftalmoReflejoForeal2').getValue(),
                vmediosrefractivos2: Ext.getCmp('txtOftalmoMediosRefractivos2').getValue(),
                vretinaperiferica2: Ext.getCmp('txtOftalmoEstadoRetinaPeriferica2').getValue(),
                vretinacentral2: Ext.getCmp('txtOftalmoEstadoRetinaCentral2').getValue(),
                vrelacioncd2: Ext.getCmp('txtOftalmoRelacionCd2').getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {}
                });
            },
            failure: function (conn, response, options, eOpts) {}
        });
    },
    accionDipaddActualizar: function (idconsulta) {


        console.log(Ext.getCmp('dipcerca').getValue());
        console.log(Ext.getCmp('diplejos').getValue());
        console.log(Ext.getCmp('addcerca').getValue());
        console.log(Ext.getCmp('refraccion_observacion').getValue());
        Ext.Ajax.request({
            url: 'index.php/consultorio/dipaddactualizar',
            params: {
                vid: 0,
                vidconsul: idconsulta,
                vdip_cerca: Ext.getCmp('dipcerca').getValue(),
                vdip_lejos: Ext.getCmp('diplejos').getValue(),
                vadd_cerca: Ext.getCmp('addcerca').getValue(),
                vobservacion: Ext.getCmp('refraccion_observacion').getValue(),
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {}
                });
            },
            failure: function (conn, response, options, eOpts) {}
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
                    if (item.ERROR > 0) {}
                });
            },
            failure: function (conn, response, options, eOpts) {}
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
                vpupilas_responden: Ext.getCmp('txtRestoPupilasRespondenLuz').getValue(),
                vpupilas_acomodacion: Ext.getCmp('txtRestoPupilasRespondenAcomo').getValue(),
                vmotilidadocular: Ext.getCmp('txtRestoMotilidad').getValue(),
                vpuntocovergencia: Ext.getCmp('txtRestoPupilasPuntoProximo').getValue(),
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
                vrejilla_ojoderecho: Ext.getCmp('txtRestoRejillaOjoDerecho').getValue(),
                vrejilla_ojoizquierdo: Ext.getCmp('txtRestoRejillaOjoIzquierdo').getValue(),
                vconfrontacion_od_normal: campovisual1OD,
                vconfrontacion_od_disminuido: campovisual2OD,
                vconfrontacion_oi_normal: campovisual1OI,
                vconfrontacion_oi_disminuido: campovisual1OI,
                vusuario: Ext.util.Cookies.get('idusuario')
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                Ext.each(result.items, function (item) {
                    if (item.ERROR > 0) {}
                });
            },
            failure: function (conn, response, options, eOpts) {}
        });
    },
    accionLimpiarFormularios: function () {
        Ext.getCmp('biomicroscopiaingreso2').getForm().reset();
        Ext.getCmp('diagnosticoingreso2').getForm().reset();
        Ext.getCmp('historiaingreso2').getForm().reset();
        Ext.getCmp('oftalmoscopiaingreso2_1').getForm().reset();
        Ext.getCmp('oftalmoscopiaingreso2_2').getForm().reset();
        Ext.getCmp('restoingreso2').getForm().reset();
        Ext.getCmp('dipadd2').getForm().reset();
        var storeROD = Ext.getCmp('dgvRefraccionOjoDerecho2').getStore();
        storeROD.removeAll();
        var storeROI = Ext.getCmp('dgvRefraccionOjoIzquierdo2').getStore();
        storeROI.removeAll();
        var storeLCOD = Ext.getCmp('dgvLenteContactoOjoDerecho2').getStore();
        storeLCOD.removeAll();
        var storeLCOI = Ext.getCmp('dgvLenteContactoOjoIzquierdo2').getStore();
        storeLCOI.removeAll();
        var tabpanel = Ext.getCmp('myTabPanel_consulta');
        tabpanel.setActiveTab('tabRefraccion_consulta');
    }

});