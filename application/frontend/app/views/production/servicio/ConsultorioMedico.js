/**
 * Created by Eddy on 27/07/15.
 */

var idficharegistro = 0;
var idcita          = 0;
var clickEdit       = 0;
var quimicaTmp  = new Array();
var focusTexto  = 0;
var mydata = new Array();
Ext.define('MyDesktop.app.views.servicio.ConsultorioMedico',{
    extend : 'Ext.panel.Panel',
    alias : 'widget.wconsultorio',
    id    : 'wconsulorio',
    config: {
        id : 0
    },
    requires:[
        'MyDesktop.app.stores.Trabajadores',
        'MyDesktop.app.views.servicio.refraccion.Ingreso',
        'MyDesktop.app.views.servicio.lentecontacto.Ingreso',
        'MyDesktop.app.views.servicio.historia.Ingreso',
        'MyDesktop.app.views.servicio.biomicroscopia.Ingreso',
        'MyDesktop.app.views.servicio.oftalmoscopia.Ingreso',
        'MyDesktop.app.views.servicio.diagnostico.Ingreso'

    ],

    initComponent:function(){
        var me = this;
        var storemedicos     = Ext.create('MyDesktop.app.stores.Trabajadores');

       /* var storepacientes   = Ext.create('MyDesktop.mvc.stores.Pacientes');
        var storebusquedas   = Ext.create('MyDesktop.mvc.stores.Busquedas');

       /* storemedicos.load({
            params:{
                idsede :  Ext.util.Cookies.get('sede')
            }
        });*/

       /* var storecitaspordia = Ext.create('MyDesktop.mvc.stores.CitasPorDia');
        var storecitasporpaciente = Ext.create('MyDesktop.mvc.stores.CitasPorPaciente');

        var storediagnostico = Ext.create('MyDesktop.mvc.stores.DiagnosticosActivos');
        storediagnostico.getProxy().extraParams = {pdescripcion  : null};
        storediagnostico.reload();
        var storemedicamentos      = Ext.create('MyDesktop.mvc.stores.Medicamentos');
        storemedicamentos.getProxy().extraParams = {idmeditipo  : 1};
        storemedicamentos.reload();
        var storetratamientos      = Ext.create('MyDesktop.mvc.stores.Tratamientos');
        /*-- Stores Temporales para los detalles de la ficha de atencion --*/
      /*  var storediagnosticopaciente = Ext.create('MyDesktop.mvc.stores.DiagnosticoPacienteConsulta');
        var storemedicamentopaciente = Ext.create('MyDesktop.mvc.stores.MedicamentoPacienteConsulta');
        var storemedicamentoquimicapaciente = Ext.create('MyDesktop.mvc.stores.MedicamentoQuimicaPacienteConsulta');
        var storetratamientopaciente = Ext.create('MyDesktop.mvc.stores.TratamientoPacienteConsulta');



        /*-- Store Citas que tiene el medico para anestesia ---*/
      /* var storeCitasAnestesiaMedico = Ext.create('MyDesktop.mvc.stores.CitasMedicoAnestesia');

        var autoLoadCitasAnestesia =
        {
            /*Intervalo de tiempo de consulta 5 minutos
             *
             * 1 => segundo => 1000
             *
             * */
        /*    run : function()
            {
                storeCitasAnestesiaMedico.load();
                var grid = Ext.getCmp('dgvpacientesprogramados');
                var rec = grid.getSelectionModel().getSelection()[0];
                if(rec){

                    grid.getStore().reload(
                        {
                            scope: this,
                            callback:function(records, operation, success){
                                grid.getSelectionModel().select(rec.index, true);
                                switch (parseInt(focusTexto)){
                                    case 1 :   Ext.getCmp('txtCompoQui').focus(false, 20); break;
                                    case 2 :   Ext.getCmp('txtMedicamentoFichaObservacion').focus(false, 20);break;
                                    case 3 :   Ext.getCmp('txtPlanDeTrabajo').focus(false, 20);break;
                                    case 4 :   Ext.getCmp('txtObservacionDiagnosticoPaciente').focus(false, 20);break;
                                    case 5 :   Ext.getCmp('txtTratamientoFichaObservacion').focus(false, 20);break;
                                    case 6 :   Ext.getCmp('txtObservacionesMedico').focus(false, 20);break;
                                }
                            }
                        });
                }




            },
            interval: 12000
        };

        Ext.TaskManager.start(autoLoadCitasAnestesia);*/


        Ext.applyIf(me, {
            layout: 'border',
            items: [
               /* {
                    xtype : 'panel',
                    region : 'east',
                    layout : {
                        aling : 'stretch',
                        type : 'fit'
                    },
                    title : 'Anestesia',
                    flex : 0.4,
                    titleAlign : 'center',
                    items: [
                        {
                            xtype :'gridpanel',
                            id    : 'dgvcitasanestecia',
                          //  store : storeCitasAnestesiaMedico,
                            sortableColumns : false,
                            iconCls : 'folder-usuario',
                            titleAlign : 'center',
                            maskOnDisable:false,
                            columns:[
                                {
                                    xtype : 'rownumberer'
                                },
                                {
                                    text : 'Id',
                                    dataIndex :'vidcita',
                                    flex : 0.5,
                                    hidden : true
                                },
                                {
                                    xtype : 'templatecolumn',
                                    text   : 'Detalle',
                                    tpl   : '<b>Paciente :</b> {vpersona} </br><b>M&eacute;dico   :</b> {vmedico} </br> <b>Inicia :</b> {vhorainicio} <b> - Finaliza :</b> {vhorafinal}',
                                    flex  : 2
                                },
                                {
                                    text : 'Estado',
                                    dataIndex : 'vseguimiento',
                                    flex : 0.2,

                                    renderer: function(value){
                                        var x = value.split('&');
                                        //-- x[0] == hora, x[1] == minuto
                                        if(parseInt(x[0])<0)
                                        {
                                            return '<span style="font-weight:bold;" class="ban-roja">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                                        }else if(parseInt(x[0])>0)
                                        {return '<span style="font-weight:bold;" class="ban-verde">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                                        }else if (parseInt(x[0])==0 && parseInt(x[1])<0 ){
                                            return '<span style="font-weight:bold;" class="ban-roja">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                                        }else if (parseInt(x[0])==0 && (parseInt(x[1])>=5 && parseInt(x[1])<=30)){
                                            return '<span style="font-weight:bold;" class="ban-amarilla">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                                        }else {
                                            return '<span style="font-weight:bold;" class="ban-roja">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                                        }
                                    }

                                }

                            ]
                            /*tools :[
                             { type : 'panel-reload',
                             id   : 'btnRefrescarListaUrgente',
                             tooltip : 'Actualizar Urgentes Anestecia',
                             handler : function(){
                             storeCitasAnestesiaMedico.reload();
                             }
                             }

                             ]
                        }
                    ]
                },*/
                {
                    xtype: 'panel',
                    region: 'west',
                    width: 300,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    title: 'Citas',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 0.5,
                            layout: 'fit',
                            bodyPadding:'5',
                            items : [
                                {
                                    xtype: 'datepicker',
                                    id   : 'dtfechacita',
                                    startDay: 1 // Start Lunes

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            autoScroll: true,
                            layout: {
                                type: 'fit'
                            },

                            items: [
                                {
                                    xtype: 'gridpanel',
                                    title: 'Pacientes Programados',
                                    id   : 'dgvpacientesprogramados',
                                  //  store :storecitaspordia,
                                    sortableColumns : false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'idpersona',
                                            flex : 0.5,
                                            text: 'Id',
                                            hidden:true
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Paciente',
                                            flex: 3,
                                            dataIndex: 'persona',

                                        }
                                    ]

                                }
                            ],
                            tbar:[
                                {
                                    xtype : 'combobox',
                                    id    : 'cboConsultaMedico',
                                    fieldLabel :'<b>Medico</b>',
                                    store      : storemedicos,
                                    emptyText  : '--Selecionar Medico--',
                                    labelWidth : 40,
                                    displayField: 'ncompleto',
                                    valueField  : 'id',
                                    queryMode   : 'local',
                                    flex : 1,
                                    editable : false
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    //title: 'My Panel',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            autoScroll: true,
                            layout: {
                                type: 'fit'
                            },
                            title: 'Registro de Atenciones del Paciente',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id   : 'dgvatencionespaciente',
                                  //  store: storecitasporpaciente,
                                    sortableColumns : false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Fecha',
                                            dataIndex: 'fechacita',
                                            //renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                                            flex : 0.6

                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Inicio',
                                            dataIndex: 'horainicio',
                                            flex : 0.6

                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Termina',
                                            dataIndex: 'horafinal',
                                            flex : 0.6

                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Descripcion',
                                            dataIndex: 'descripcion',
                                            flex: 1.5,
                                            hidden : true
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Medico',
                                            dataIndex: 'medico',
                                            flex: 1.5
                                        },

                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Tipo de Cita',
                                            dataIndex: 'tipocitades',
                                            flex: 2.5,
                                            renderer:function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if( record.get('tipocita') == 105)return '<span style="color:green;font-weight:bold;">' + value + '</span>';
                                                else return  value;

                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Estado',
                                            dataIndex: 'atendido',
                                            flex: 0.8,
                                            renderer: function(value){
                                                if(value == 6)
                                                    return '<span style="color:green;font-weight:bold;">ATENDIDO</span>';
                                                else
                                                    return '<span style="color:red;font-weight:bold;">NO ATENDIDO</span>';
                                            }
                                        }
                                    ],
                                    listeners: {
                                        itemclick:function( grid, record, item, index, event){
                                            idficharegistro = 0;
                                            clickEdit       = 0;
                                            var x = record.get('atendido');
                                            if( parseInt(x) == 6){
                                                Ext.getCmp('btnImprinirFicha').setDisabled(false);
                                                Ext.getCmp('btnImprimirReceta').setDisabled(false);
                                            }else{
                                                Ext.getCmp('btnImprinirFicha').setDisabled(true);
                                                Ext.getCmp('btnImprimirReceta').setDisabled(true);
                                            }
                                            Ext.getCmp('txtPlanDeTrabajo').focus();
                                        }
                                    }// fin listenes
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 3,
                            layout: {
                                type: 'fit'
                            },
                            id : 'panelFichas',
                            title: 'Ficha de Atencion',
                            tbar :[
                                {
                                    xtype : 'button',
                                    text  : '<b>Guardar la Ficha <b>',
                                    iconCls:'boton-add-consultamedica',
                                    id   : 'btnGuardarFichaAtension'

                                },'-',{
                                    xtype  : 'button',
                                    id     : 'btnImprinirFicha',
                                    text   :'<b>Imprimir Ficha<b>',
                                    iconCls:'boton-print',
                                    disabled:true,

                                },'-',{
                                    xtype  : 'button',
                                    id     : 'btnImprimirReceta',
                                    text   :'<b>Imprimir Receta<b>',
                                    iconCls:'boton-print',
                                    disabled:true,

                                },'-',{
                                    xtype  : 'button',
                                    id     : 'btnEditarFichaAtencion',
                                    text   :'<b>Editar Ficha<b>',
                                    iconCls:'boton-edit'

                                },'-',{
                                    xtype  : 'button',
                                    id     : 'btnCancelarAtencion',
                                    text   :'<b>Cancelar<b>',
                                    iconCls:'boton-cancel',

                                },'-',{
                                    xtype  : 'button',
                                    id     : 'btnSalirAtencion',
                                    text   :'<b> Salir <b>',
                                    iconCls:'x-button-salir',
                                    handler:function(){
                                        Ext.getCmp('w-consultamed').close();
                                      //  Ext.TaskManager.stop(autoLoadCitasAnestesia);
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id   : 'myTabPanel',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            title: 'Datos Personales',
                                            layout : 'fit',
                                            padding : 5,
                                            items : [
                                                {
                                                    xtype:'fieldset',
                                                    title: 'Detalle',
                                                    items:[
                                                        {
                                                            xtype     : 'textareafield',
                                                            height    : 370,
                                                            anchor    : '100%',
                                                            id        : 'txtPlanDeTrabajo',
                                                            grow      : true,
                                                            fieldStyle:'text-transform:uppercase'
                                                        }

                                                    ]
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Refraccion',
                                            layout : 'fit',
                                            padding : 5,
                                            items : [
                                                { xtype :'refraccioningreso'}

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Lentes de Contacto',
                                            layout : 'fit',
                                            padding : 5,
                                            items : [
                                                {xtype:'lentecontactoingreso' }

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Historia',
                                            layout : 'fit',
                                            padding : 5,
                                            items : [
                                                { xtype:'historiaingreso' }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Biomicroscopia',
                                            layout : 'fit',
                                            padding : 5,
                                            items:[{xtype:'biomicroscopiaingreso'}]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Oftalmoscopia',
                                            layout : 'fit',
                                            padding : 5,
                                            items:[{xtype:'oftalmoscopiaingreso'}]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Diagnostico',
                                            layout : 'fit',
                                            padding : 5,
                                            items:[{xtype :'diagnosticoingreso'}]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Resto',
                                            layout : 'fit',
                                            padding : 5
                                        },
                                    ]

                                }//fin TabPanel
                            ]
                        }
                    ]
                }
            ]




        }); // Fin Constructor

        me.callParent(arguments);

      /*  Ext.getCmp('cboConsultaMedico').on('select',me.FiltrarCitasPorMedicoYdia,this);
        Ext.getCmp('dtfechacita').on('select',me.FiltrarCitasPorMedicoYdia,this);
        Ext.getCmp('btnNuevoDiagnostico').on('click',me.AbrirMaestros,this);
        Ext.getCmp('btnNuevoMedicamento').on('click',me.AbrirMaestros,this);
        Ext.getCmp('btnNuevoTratamiento').on('click',me.AbrirMaestros,this);
        Ext.getCmp('btnGuardarFichaAtension').on('click',me.GuardarFichaDeAtension,this);
        Ext.getCmp('dgvpacientesprogramados').on('itemclick',me.ListarCitasDelPaciente,this);
        Ext.getCmp('btnEditarFichaAtencion').on('click',me.EditarFichaPaciente,this);
        Ext.getCmp('btnImprinirFicha').on('click',me.ImprimirFicha,this);
        Ext.getCmp('btnImprimirReceta').on('click',me.ImprimirReceta,this);
        Ext.getCmp('btnCancelarAtencion').on('click',me.LimpiarFicha,this);*/

       /* Ext.getCmp('txtCompoQui').on('focus',function(){
            focusTexto = 1;
        },this);
        Ext.getCmp('txtMedicamentoFichaObservacion').on('focus',function(){
            focusTexto = 2;
        },this);
        Ext.getCmp('txtPlanDeTrabajo').on('focus',function(){
            focusTexto = 3;
        },this);
        Ext.getCmp('txtObservacionDiagnosticoPaciente').on('focus',function(){
            focusTexto = 4;
        },this);
        Ext.getCmp('txtTratamientoFichaObservacion').on('focus',function(){
            focusTexto = 5;
        },this);
        Ext.getCmp('txtObservacionesMedico').on('focus',function(){
            focusTexto = 6;
        },this);*/


    },
    LimpiarCajasQuimica:function(){
        var form  =  Ext.getCmp('frmCompuestoQuimicoFichaPaciente').getForm();
        var campos = form.getFields();
        Ext.each(campos.items,function(f){
            var id = f.inputEl.dom.id;
            id = id.substring(0,id.indexOf('-'));
            Ext.getCmp(id).setValue('');
        });
    },
    FiltrarCitasPorMedicoYdia:function(obj){
        var fecha  = Ext.getCmp('dtfechacita').getValue()
        var idmed =  Ext.getCmp('cboConsultaMedico').getValue();
        var store = Ext.getCmp('dgvpacientesprogramados').getStore();
        store.load({
            params : {
                idmedico  : idmed,
                fechacita : fecha
            }
        })
        var storeanestesia = Ext.getCmp('dgvcitasanestecia').getStore();
        storeanestesia.getProxy().extraParams = { idmedico : idmed };
        storeanestesia.load();
        Ext.getCmp('dgvatencionespaciente').getStore().load({
            params:{
                idpaciente : 0
            }
        });


    },
    AbrirMaestros:function(btn){
        var w = Ext.create('Ext.window.Window',{
            width : 800,
            height : 480,
            title : 'Mantenimientos',
            layout : 'fit',
            modal : true,
            items : [
                {
                    xtype : 'mantenimientos'
                }
            ]
        });
        w.show();
    },
    GuardarFichaDeAtension:function(btn){
        try{
            var grid         = Ext.getCmp('dgvatencionespaciente');
            var idcita       = grid.getSelectionModel().getSelection()[0].get('idcita');
            var idper        = grid.getSelectionModel().getSelection()[0].get('idpersona');
            var estado       = grid.getSelectionModel().getSelection()[0].get('atendido');
        }catch(e){Ext.Msg.alert("Aviso","No ha selecionado una cita del paciente!");return false;}


        x       = Ext.getCmp('dgvdiagnosticospaciente').getStore().getCount();
        y       = Ext.getCmp('dgvmedicamentopaciente').getStore().getCount();
        z       = Ext.getCmp('dgvtratamientopaciente').getStore().getCount();
        var proximacita  = Ext.getCmp('dtProximaFechaCita').getValue();
        if(Ext.Date.format(proximacita,'d/m/Y') == MyDesktop.mvc.util.Util.getFechaActual())
        {
            MyDesktop.mvc.util.Util.showErrorMsg("La fecha de la <b>proxima cita</b> es igual al dia de hoy!");
            return false;
        }

        /* Ficha de Diagnostico */
        //var observacionDiag  = Ext.getCmp('txtObservacionDiagnosticoPaciente').getValue();
        var store       = Ext.getCmp('dgvdiagnosticospaciente').getStore();
        var id_diag     = '';
        var id_medi     = '';
        var id_trata    = '';
        //str.replace("Microsoft","W3Schools");
        var observacionDiag='';
        store.each(function(rec){
            id_diag         = id_diag +','+rec.get('id').toString();
            observacionDiag = observacionDiag +','+rec.get('textomedico').toString().replace(',',' ');
        });

        /* Ficha de Medicamento */
        //var observacionMedi  = Ext.getCmp('txtMedicamentoFichaObservacion').getValue();
        var store       = Ext.getCmp('dgvmedicamentopaciente').getStore();
        var observacionMedi ='';
        var quimicaMedi     ='';
        store.each(function(rec){
            id_medi          = id_medi +','+rec.get('id').toString();
            observacionMedi  = observacionMedi  +','+rec.get('textomedico').toString().replace(',',' ');
            quimicaMedi  = quimicaMedi  +','+rec.get('observacion').toString().replace(',',' ');

        });

        /* Ficha de Tratamiento */
        var store       = Ext.getCmp('dgvtratamientopaciente').getStore();
        var observacionTrata ='';
        store.each(function(rec){
            id_trata          = id_trata +','+rec.get('id').toString();
            observacionTrata  = observacionTrata  +','+rec.get('textomedico').toString().replace(',',' ');
        });



        id_diag ='{'+id_diag.substring(1,id_diag.length)+'}';
        id_medi ='{'+id_medi.substring(1,id_medi.length)+'}';
        id_trata='{'+id_trata.substring(1,id_trata.length)+'}';

        observacionDiag = '{'+observacionDiag.substring(1,observacionDiag.length)+'}';
        observacionMedi = '{'+observacionMedi.substring(1,observacionMedi.length)+'}';
        quimicaMedi     = '{'+quimicaMedi.substring(1,quimicaMedi.length)+'}';
        observacionTrata = '{'+observacionTrata.substring(1,observacionTrata.length)+'}';

        var plantrabajo  = Ext.getCmp('txtPlanDeTrabajo').getValue();
        var observaciones = Ext.getCmp('txtObservacionesMedico').getValue();

        var me = this;
        if(clickEdit == 0)
            idficharegistro = 0;
        else
            clickEdit       = 0;


        /* var lines = Ext.getCmp('txtCompoQui').getValue().split('\n');
         for(var i = 0;i < lines.length;i++){
         console.log(lines[i]);
         //code here using lines[i] which will give you each line
         }*/
        // console.log(quimicaTmp);

        if(parseInt(estado)==6)
        {
            Ext.Msg.confirm("Aviso","La ficha de atencion ya fue atendida, Desea Usted Actualizarla ?",
                function(btn) {
                    if (btn === 'no')
                    {return false;}
                    else{
                        Ext.Ajax.request({
                            url: 'consultamedica/guardarconsulta',
                            params: {
                                pidficha   : idficharegistro ,
                                pidcita    : idcita,
                                pidpaci    : idper,
                                ptratamiento : '',
                                pplantrabajo : plantrabajo,
                                pproximacita : proximacita,
                                pobservaciones : observaciones

                            },
                            success: function(conn, response, options, eOpts) {
                                var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                                if (result.success) {
                                    Ext.each(result.items, function(item) {
                                        if (item.ERROR>0){
                                            idficharegistro = item.ERROR;
                                            if(parseInt(x) != 0){ me.GuardarFichaDiagnosticos(idficharegistro,id_diag,observacionDiag);}             // fs_GuardarFichaDiagnosticos(idficharegistro,id_diag,observacionDiag);}
                                            if(parseInt(y) != 0){ me.GuardarFichaMedicamentos(idficharegistro,id_medi,observacionMedi,quimicaMedi);}                                                     // fs_GuardarFichaMedicamentos(idficharegistro,id_medi,observacionMedi);}
                                            if(parseInt(z) != 0){ me.GuardarFichaTratamientos(idficharegistro,id_trata,observacionTrata);}                                                    // fs_GuardarFichaTratamientos(idficharegistro,id_trata,observacionTrata);}

                                            Ext.getCmp('dgvatencionespaciente').getStore().reload();
                                            Ext.Msg.alert("Aviso","Ficha de atencion Guardada!");
                                            me.LimpiarFicha();
                                        }
                                    });
                                } else {
                                    MyDesktop.mvc.util.Util.showErrorMsg(conn.responseText);
                                    return false;
                                }

                            },
                            failure: function(conn, response, options, eOpts) {}
                        });

                    }
                }

            );
        }else
        {

            Ext.Ajax.request({
                url: 'consultamedica/guardarconsulta',
                params: {
                    pidficha   : idficharegistro ,
                    pidcita    : idcita,
                    pidpaci    : idper,
                    ptratamiento : '',
                    pplantrabajo : plantrabajo,
                    pproximacita : proximacita,
                    pobservaciones : observaciones

                },
                success: function(conn, response, options, eOpts) {
                    var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                    if (result.success) {
                        Ext.each(result.items, function(item) {
                            if (item.ERROR>0){
                                idficharegistro = item.ERROR;
                                if(parseInt(x) != 0){ me.GuardarFichaDiagnosticos(idficharegistro,id_diag,observacionDiag);}             // fs_GuardarFichaDiagnosticos(idficharegistro,id_diag,observacionDiag);}
                                if(parseInt(y) != 0){ me.GuardarFichaMedicamentos(idficharegistro,id_medi,observacionMedi,quimicaMedi);}                                                     // fs_GuardarFichaMedicamentos(idficharegistro,id_medi,observacionMedi);}
                                if(parseInt(z) != 0){ me.GuardarFichaTratamientos(idficharegistro,id_trata,observacionTrata);}                                                    // fs_GuardarFichaTratamientos(idficharegistro,id_trata,observacionTrata);}


                                Ext.getCmp('dgvatencionespaciente').getStore().reload();
                                Ext.Msg.alert("Aviso","Ficha de atencion Guardada!");
                                me.LimpiarFicha();
                                //me.GuardarFichaQuimica(idficharegistro,composicion);


                            }
                        });
                    } else {
                        MyDesktop.mvc.util.Util.showErrorMsg(conn.responseText);
                        return false;
                    }

                },
                failure: function(conn, response, options, eOpts) {}
            });
        }
    },
    GuardarFichaQuimica:function(_idficha,_composicion){
        Ext.Ajax.request({
            url: 'consultamedica/medicamentoquimicainsertar',
            params: {
                vId             : _idficha,
                vDescripcion    : _composicion
            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if (item.ERROR>0){}
                    });
                } else {
                    MyDesktop.mvc.util.Util.showErrorMsg(conn.responseText);
                    return false;
                }

            },
            failure: function(conn, response, options, eOpts) {}
        });
    },
    GuardarFichaDiagnosticos:function(_idficha,_diagnosticos,_observacion){
        Ext.Ajax.request({
            url: 'consultamedica/guardarconsultadiagnosticos',
            params: {
                piddiag         : 0,
                pidficha        : _idficha,
                pdiagnosticos   : _diagnosticos,
                pobservacion    : _observacion

            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if (item.ERROR>0){
                            // console.log(item.ERROR);

                        }
                    });
                } else {
                    MyDesktop.mvc.util.Util.showErrorMsg(conn.responseText);
                    return false;
                }

            },
            failure: function(conn, response, options, eOpts) {}
        });
    },
    GuardarFichaMedicamentos:function(_idficha,_medicamentos,_observacion,_quimica){
        Ext.Ajax.request({
            url: 'consultamedica/guardarconsultamedicamentos',
            params: {
                pidmedi        : 0,
                pidficha       : _idficha,
                pmedicamentos  : _medicamentos,
                pobservacion   : _observacion,
                pquimica       : _quimica

            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if (item.ERROR>0){
                            //idficharegistro = item.ERROR;

                        }
                    });
                } else {
                    MyDesktop.mvc.util.Util.showErrorMsg(conn.responseText);
                    return false;
                }

            },
            failure: function(conn, response, options, eOpts) {}
        });
    },
    GuardarFichaTratamientos:function(_idficha,_tratamientos,_observacion){
        Ext.Ajax.request({
            url: 'consultamedica/guardarconsultatratamientos',
            params: {
                pidtrata       : 0,
                pidficha       : _idficha,
                ptratamientos  : _tratamientos,
                pobservacion   : _observacion

            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if (item.ERROR>0){
                            // idficharegistro = item.ERROR;

                        }
                    });
                } else {
                    MyDesktop.mvc.util.Util.showErrorMsg(conn.responseText);
                    return false;
                }

            },
            failure: function(conn, response, options, eOpts) {}
        });
    },
    LimpiarStores:function(){
        var storediag = Ext.getCmp('dgvdiagnosticospaciente').getStore();
        storediag.removeAll();
        var storeMedi = Ext.getCmp('dgvmedicamentopaciente').getStore();
        storeMedi.removeAll();
        var storeTrata = Ext.getCmp('dgvtratamientopaciente').getStore();
        storeTrata.removeAll();
    },
    LimpiarFicha:function(){

        var storediag = Ext.getCmp('dgvdiagnosticospaciente').getStore();
        storediag.removeAll();
        var storeMedi = Ext.getCmp('dgvmedicamentopaciente').getStore();
        storeMedi.removeAll();
        var storeTrata = Ext.getCmp('dgvtratamientopaciente').getStore();
        storeTrata.removeAll();
        Ext.getCmp('txtObservacionDiagnosticoPaciente').setValue('');
        Ext.getCmp('txtMedicamentoFichaObservacion').setValue('');
        Ext.getCmp('txtTratamientoFichaObservacion').setValue('');
        Ext.getCmp('txtPlanDeTrabajo').setValue('');
        Ext.getCmp('txtObservacionesMedico').setValue('');
        Ext.getCmp('dtProximaFechaCita').setValue(new Date());
        Ext.getCmp('myTabPanel').setActiveTab(0);

        Ext.getCmp('btnImprinirFicha').setDisabled(true);
        Ext.getCmp('btnImprimirReceta').setDisabled(true);
        Ext.getCmp('txtCompoQui').setValue('');
    },
    ListarCitasDelPaciente:function(obj, rec, item, index, e,eOpts ){
        store = Ext.getCmp('dgvatencionespaciente').getStore();
        store.load({
            params :{
                idpaciente : parseInt(rec.get('idpersona'))
            }
        });
        this.LimpiarFicha();
    },
    EditarFichaPaciente:function(btn){

        this.LimpiarStores();


        clickEdit = 1;
        try{
            var grid         = Ext.getCmp('dgvatencionespaciente');
            var idcita       = grid.getSelectionModel().getSelection()[0].get('idcita');
            var idmedico     = grid.getSelectionModel().getSelection()[0].get('idmedico');
            var fecha        = grid.getSelectionModel().getSelection()[0].get('fechacita');

            if( parseInt( Ext.getCmp('cboConsultaMedico').getValue() ) != idmedico  ) {
                Ext.Msg.alert("Aviso","Imposible Editar Cita");
                return false;
            }

            var f = new Date;
            if(fecha < Ext.Date.format(f, 'd/m/Y') ){
                Ext.Msg.alert("Aviso","Imposible Editar Cita");
                return false;
            }


            var message = new Ext.LoadMask(Ext.getCmp('panelFichas'), {msg:" Buscando la informacion..."});
            message.show();

            /* Cabezera */
            Ext.Ajax.request({url: 'consultamedica/find',
                params: { pid  : idcita },
                success: function(conn, response, options, eOpts) {

                    var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                    //console.log(result.items[0].idconsulmed);
                    idficharegistro = result.items[0].idconsulmed;
                    Ext.getCmp('txtPlanDeTrabajo').setValue(result.items[0].plantrabajoconsultamed);
                    Ext.getCmp('dtProximaFechaCita').setValue(result.items[0].proximacita);
                    Ext.getCmp('txtObservacionesMedico').setValue(result.items[0].observaciones);
                    message.destroy();
                },
                failure: function(conn, response, options, eOpts) {}
            });

            message.show();
            Ext.Ajax.request({url: 'consultamedica/finddiag',
                params: { pid  : idcita },
                success: function(conn, response, options, eOpts) {
                    var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                    console.log(result);
                    if (result.success) {
                        var storediagnosticopaciente = Ext.getCmp('dgvdiagnosticospaciente').getStore();
                        Ext.each(result.items, function(item) {
                            storediagnosticopaciente.add({id : item.id,descripcion : item.descrip ,textomedico : item.obser});
                        });
                    }

                    message.destroy();
                },
                failure: function(conn, response, options, eOpts) {}
            });
            message.show();
            Ext.Ajax.request({url: 'consultamedica/findtrat',
                params: { pid  : idcita },
                success: function(conn, response, options, eOpts) {
                    var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                    console.log(result);
                    if (result.success) {
                        var storetratamientopaciente = Ext.getCmp('dgvtratamientopaciente').getStore();
                        Ext.each(result.items, function(item) {
                            storetratamientopaciente.add({id : item.id,descripcion : item.descrip ,textomedico : item.obser });
                        });
                    }

                    message.destroy();
                },
                failure: function(conn, response, options, eOpts) {}
            });
            message.show();
            Ext.Ajax.request({url: 'consultamedica/findmedi',
                params: { pid  : idcita },
                success: function(conn, response, options, eOpts) {
                    var result = MyDesktop.mvc.util.Util.decodeJSON(conn.responseText);
                    console.log(result);
                    if (result.success) {
                        var storemedicamentopaciente = Ext.getCmp('dgvmedicamentopaciente').getStore();
                        Ext.each(result.items, function(item) {
                            storemedicamentopaciente.add({id : item.id,descripcion : item.descrip ,textomedico : item.obser ,guardado:1 ,observacion: item.quimica}); /* observacion => Quimica del Medicamento */
                        });
                    }
                    message.destroy();
                },
                failure: function(conn, response, options, eOpts) {}
            });

        }catch(e){
            MyDesktop.mvc.util.Util.showErrorMsg("No ha selecionado la cita del paciente!");
            return false;
        }
    },
    ImprimirFicha:function(btn){
        try{
            var grid         = Ext.getCmp('dgvatencionespaciente');
            var idcita       = grid.getSelectionModel().getSelection()[0].get('idcita');

        }catch(e){
            MyDesktop.mvc.util.Util.showErrorMsg("No ha selecionado la cita del paciente!");
            return false;
        }
        var _url = 'reportes/imprimirficha/'+idcita.toString();
        xpos=(screen.width/2)-(1000/2);
        ypos=(screen.height/2)-(600/2);
        my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);
    },
    ImprimirReceta:function(btn){
        try{
            var grid         = Ext.getCmp('dgvatencionespaciente');
            var idcita       = grid.getSelectionModel().getSelection()[0].get('idcita');

        }catch(e){
            MyDesktop.mvc.util.Util.showErrorMsg("No ha selecionado la cita del paciente!");
            return false;
        }

        var _url = 'reportes/imprimirreceta/'+idcita.toString();
        xpos=(screen.width/2)-(1000/2);
        ypos=(screen.height/2)-(600/2);
        mywindow = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=1000,height=600");
        mywindow.moveTo(xpos, ypos);

    }

});