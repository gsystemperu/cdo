
Ext.define('MyDesktop.app.views.servicio.registro.RegistroCitaEditar', {
    extend 	: 'Ext.window.Window',
    alias 	: 'widget.wregistrocitaeditar',
    statics : {idgrilla : 0},
    //requires : ['MyDesktop.mvc.stores.Generos','MyDesktop.mvc.stores.Salas'],
    initComponent: function() {
        me = this;
        var storeMedicos = Ext.create('MyDesktop.app.stores.Trabajadores');
        var storeTipoCita = Ext.create('MyDesktop.app.stores.servicio.TipoCita');
        Ext.apply(this, {
            title : 'Detalle de Cita del Paciente',
            width : 550,
            height : 380,
            modal : true,
            iconCls: 'user',
            layout : {
                type : 'vbox',
                align : 'stretch'
            } ,
            items  : [
                {
                    xtype : 'form',
                    flex : 2,
                    frame: false,
                    bodyStyle: 'padding:5px 5px 0',
                    id    : 'frmDatosCitaMod',
                    items : [
                        {
                            xtype    : 'fieldset',
                            columnWidth : 0.5,
                            title    : 'Paciente',
                            hidden   :true,
                            defaults : { anchor : '100%'},
                            layout   : 'anchor',
                            items : [
                                {
                                    xtype : 'hiddenfield',
                                    id    : 'txtIdCitaMod',
                                    name  : '_idcita'

                                },
                                {
                                    xtype : 'hiddenfield',
                                    id    : 'txtIdPacienteMod',
                                    name  : '_idper'

                                },
                                {xtype : 'hiddenfield',id    : 'txtPacienteMod',name  : '_paciente'}
                               
                            ]
                        },
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            defaults: {anchor: '50%'},
                            layout: 'anchor',
                            items :[{
                                xtype : 'datefield',
                                fieldLabel : 'Fecha',
                                id    : 'dpFechaMod',
                                width : 150,
                                minValue : new Date(),
                                name   : '_fecha',
                                allowBlank:false
                                
                            }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items :[
                                {
                                    xtype : 'combo',
                                    id : 'cboMedicoMod',
                                    fieldLabel:'Medico',
                                    store :storeMedicos,
                                    displayField : 'ncompleto',
                                    valueField : 'id',
                                    editable:false,
                                    queryMode:'local',
                                    emptyText:'-- SELECCIONAR AL MEDICO --',
                                    allowBlank:false,
                                    name : '_idmed',
                                    allowBlank:false
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            padding : 10,
                            items:[
                                 {
                                    xtype : 'textareafield',
                                    grow  : true,
                                    height : 60 ,
                                    fieldLabel : 'Descripci\xf3n',
                                    id    : 'txtDescripcionMod',
                                    fieldStyle:'text-transform:uppercase',
                                    name : '_descripcion',
                                    allowBlank:false
                                 },{
                                    xtype : 'textareafield',
                                    grow  : true,
                                    height : 60,
                                    fieldLabel : 'Observaciones',
                                    id    : 'txtObservacionMod',
                                    fieldStyle:'text-transform:uppercase',
                                    name : '_observacion',
                                    allowBlank:false
                                },{
                                    xtype : 'combo',
                                    fieldLabel: 'Tipo Cita',
                                    id    : 'cboTipoCitaMod',
                                    store : storeTipoCita,
                                    displayField : '_descripcion',
                                    valueField   : '_idtipocita',
                                    editable : false,
                                    name     : '_idtipocita',
                                    queryMode : 'local',
                                    allowBlank:false
                                },
                                {
                                    xtype : 'numberfield',
                                    fieldLabel: 'Precio',
                                    id  : 'txtModPrecioCita',
                                    width : 100,
                                    name : 'precita',
                                    minValue: 0.0,
                                    decimalPrecision:2,
                                    step:0.01,
                                    decimalSeparator:'.',
                                    fieldStyle: 'text-align: right;'
                                 }
                            ]
                        }  
                    ]
                }
            ],
            bbar : [{
                xtype : 'button',
                text  : 'Actualizar',
                id    : 'btnActualizarMod',
                scale : 'medium',
                iconCls : 'boton-save',
            },{
                xtype : 'button',
                text  : 'Cerrar',
                scale : 'medium',
                id    : 'btnModCerrar',
                iconCls : 'boton-cancel',
                listeners: {click: function(){me.close();}}
            }
            ]



        });

        this.callParent(arguments);
        Ext.getCmp('btnActualizarMod').on('click',me.accionActualizarCita,this);
    },
    accionActualizarCita:function(){
        me = this;
        var frm = Ext.getCmp('frmDatosCitaMod');
        if (frm.getForm().isValid()) {
            try{
                Ext.Ajax.request({
                    url: 'index.php/citas/actualizar',
                    params: {
                            vid : Ext.getCmp('txtIdCitaMod').getValue(),
                            vidmedico:Ext.getCmp('cboMedico').getValue(),
                            vidpersona:Ext.getCmp('txtIdPacienteMod').getValue(),
                            vpersona :Ext.getCmp('txtPacienteMod').getValue(),
                            vdescripcion:Ext.getCmp('txtDescripcionMod').getValue(),
                            vobservacion:Ext.getCmp('txtObservacionMod').getValue(),
                            vtipocita :Ext.getCmp('cboTipoCitaMod').getValue(),
                            vusuario  :'PRUEBAS',
                            vfecha    :Ext.getCmp('dpFechaMod').getValue(),
                            vprecio   : 0
                    },
                    success: function(conn, response, options, eOpts) {
                            var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                            Ext.each(result.items, function(item) {
                                if(item.ERROR>0){
                                    me.close();
                                    var grid = Ext.getCmp('dgvRegistroDeCitas');
                                    var rec = grid.getSelectionModel().getSelection()[0];
                                    grid.getStore().load(
                                        function(records, operation, success){grid.getSelectionModel().select(rec.index, true);}
                                    );
                                }
                            });
                     },
                        failure: function(conn, response, options, eOpts) {}
                    });
                
            }catch(e){
                console.info("error en guardar");
            }  
        }
    }


});

