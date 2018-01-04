var __medico_id = 0;
Ext.define("MyDesktop.app.views.servicio.registro.RegistroCita", {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wregcita',
  initComponent : function() {
    me = this;
    var storeMedicos = Ext.create('MyDesktop.app.stores.Trabajadores');
    var storePacientes = Ext.create('MyDesktop.app.stores.Clientes');
    var storeTipoCita = Ext.create('MyDesktop.app.stores.servicio.TipoCita');
    var storeCitasPorMedico = Ext.create('MyDesktop.app.stores.citas.Citas');
    var autoLoadCompras =
    {
      run : function() {
          //var record = Ext.getCmp('dgvRegistroDeCitas').getSelectionModel().getSelection()[0];
         me.AccionActualizarListado();
      },
      interval : 10000   //* 1 => segundo => 1000
    }

    Ext.TaskManager.start(autoLoadCompras);


    Ext.apply(this, {
      layout : 'hbox',
      anchor: '100%',
      items : [
        {
          border : false,
          xtype : 'gridpanel',
          id : 'dgvRegistroDeCitas',
          store : storeCitasPorMedico,
          sortableColumns : false,
          flex : 2,
          height:640,
          title : 'REGISTRO DE CITAS DEL MEDICO ',
          viewConfig: { /*  no muestra el mensaje de cargando */
            loadMask:false

          },
          columns : [
  	      	{
	text : 'Fecha/Hora',
	flex:0.8,
	sortable:false,
	dataIndex:'_fecha'
},    
	{
              text : "Paciente",
              flex : 1,
              sortable : true,
              dataIndex : '_paciente'
            },
            {
              text : "Tipo Consulta",
              flex : 1,
              sortable : true,
              dataIndex : '_tipocita'
            },
            {text : "Medico", flex : 0.5, sortable : true, dataIndex : '_medico'},
            {
              text : "Atendido",
              style : 'text-aling:center',
              flex : 0.5,
              sortable : true,
              dataIndex : '_atendido',
              renderer : function(value, metaData, record, rowIndex, colIndex,
                                  store, view) {
                switch (value) {
                case 0:
                  return '<b style="color: #DF0315">NO ATENDIDO</b>';
                case 1:
                  return '<b style="color: #028B36">ATENDIDO</b>';
                }
              }

            }
          ]
        },
        {
          xtype : 'panel',
          flex : 1.2,
          bodyPadding : 5,
          border : false,
          items : [
            {
              xtype : 'form',
              id : 'myFormRegistroCita',
              title : 'Registro',
              frame : true,
              border : false,
              layout : {type : 'vbox', align : 'stretch', padding : 10},
              defaults : {labelAlign : 'right', labelWidth : 70},
              items : [
                {
                  xtype : 'datefield',
                  value : new Date(),
                  fieldLabel : 'Fecha',
                  editable : false,
                  id : 'dpFechaCita',
                  allowBlank : false

                },
                {
                  xtype : 'combo',
                  id : 'cboMedicoCita',
                  fieldLabel : 'Medico',
                  store : storeMedicos,
                  displayField : 'ncompleto',
                  valueField : 'id',
                  editable : false,
                  queryMode : 'remote',
                  emptyText : '-- SELECCIONAR AL MEDICO --',
                  allowBlank : false
                },
                {
                  xtype : 'container',
                  layout : 'hbox',
                  style : {paddingBottom : '5px'},
                  items : [
                    {
                      xtype:'hiddenfield',
                      id:'txtIdPersonaCita',
                    },
                    {
                      xtype:'textfield',
                      id:'txtDatosPersonaCita',
                      emptyText : '--- SELECIONAR AL PACIENTE ---',
                      flex : 3,
                      labelAlign : 'right',
                      labelWidth : 70,
                      fieldLabel:'Paciente'

                    },
                     {
                      xtype : 'button',
                      iconCls : 'x-ico-lupa',
                      flex : 0.2,
                      id : 'btnBuscarPacienteCita'
                    },
                    {
                      xtype : 'button',
                      iconCls : 'user-add',
                      flex : 0.2,
                      id : 'btnNuevoPacienteCita'
                    }
                  ]

                },

                {
                  xtype : 'textarea',
                  fieldLabel : 'Descripcion',
                  id : 'txtDescripcionCita',
                  allowBlank : true

                },
                {
                  xtype : 'textarea',
                  fieldLabel : 'Observaciones',
                  id : 'txtObservacionesCita',
                  allowBlank : true

                },
                {
                  xtype : 'combo',
                  id : 'cboTipoCita',
                  itemId:"cboTipoCita",
                  store : storeTipoCita,
                  fieldLabel : 'Tipo de Cita',
                  displayField : '_descripcion',
                  valueField : '_idtipocita',
                  queryMode : 'remote',
                  typeAhead : true,
                  emptyText : '-- SELECCIONAR EL TIPO DE CITA --',
                  editable : false,
                  require : true,
                  allowBlank : false
                }

              ],
              bbar : [
                {
                  xtype : 'button',
                  id : 'btnNuevaCita',
                  text : 'Nuevo',
                  iconCls : 'add',
                  handler : function() {
                    Ext.getCmp('myFormRegistroCita').getForm().reset();
                  }
                },
                {
                  xtype : 'button',
                  id : 'btnGuardarCita',
                  text : 'Guardar',
                  iconCls : 'boton-save'

                }
              ]
            }

          ]

        }
      ],
      tbar : [
        {
          text : 'Modificar',
          tooltip : 'Modificar la cita',
          id : 'btnEditarCita',
          iconCls : 'boton-edit'

        },
        {
          text : 'Eliminar',
          tooltip : 'Eliminar la cita del paciente',
          id : 'btnEliminarCita',
          iconCls : 'remove'

        },

        '-',
        {
          text : 'Actualizar Lista',
          id : 'btnRecargarListaCita',
          tooltip : 'Recargar Listado',
          iconCls : 'x-tool-panel-reload'

        },'-',
        {
          xtype : 'label',
          id : 'txtSedeNombreCita'
        }
      ]

    });
    this.callParent(arguments);
    Ext.getCmp('btnGuardarCita').on('click', me.AccionGuardarCita, this);
    Ext.getCmp('cboMedicoCita').on('change', me.AccionSeleccionarMedico, this);
    Ext.getCmp('btnRecargarListaCita')
        .on('click', me.AccionActualizarListado, this);
    Ext.getCmp('dpFechaCita').on('select', me.AccionSeleccionarFecha, this);
    Ext.getCmp('btnEditarCita').on('click', me.AccionEditarCita, this);
    Ext.getCmp('btnNuevoPacienteCita').on('click', me.AccionNuevoPaciente, this);
    Ext.getCmp('btnBuscarPacienteCita').on('click', me.AccionBuscarPaciente, this);
    Ext.getCmp('btnEliminarCita').on('click',me.AccionEliminarCita,this);
    if( parseInt(Ext.util.Cookies.get('sede')) == 1){
        Ext.getCmp('txtSedeNombreCita').setText('SEDE : CITAS PARA ' + Ext.util.Cookies.get('nombresede'));
    }else{
          Ext.getCmp('txtSedeNombreCita').setText('SEDE : CITAS PARA '+ Ext.util.Cookies.get('nombresede'));
    }
  },

AccionEliminarCita:function(){
  var grid = Ext.getCmp('dgvRegistroDeCitas');
  var record = grid.getSelectionModel().getSelection();
  me=this;
  Ext.Ajax.request({
    url : 'index.php/citas/eliminar',
    params : {
      vid : record[0].get('_idcita'),
      vusuario :  Ext.util.Cookies.get('idusuario'),

    },
    success : function(conn, response, options, eOpts) {
      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
      Ext.each(result.items, function(item) {
        if (item.ERROR > 0) {
          me.AccionActualizarListado();
        }
      });
    }
  });
},
  AccionBuscarPaciente:function(){
      _flagbuscadorpaciente="REGISTRO_CITA";
    var frm=Ext.create('MyDesktop.app.views.BuscarCliente');
    frm.show();
  },
  AccionActualizarListado : function() {
    var store   = Ext.getCmp('dgvRegistroDeCitas').getStore();
    var __idmed = Ext.getCmp('cboMedicoCita').getValue();
    if (__idmed != null)
      __medico_id = __idmed;
    store.getProxy().extraParams = {
      vfecha : Ext.getCmp('dpFechaCita').getValue(),
      vidmedico : __medico_id,
      vidsede : Ext.util.Cookies.get('sede')
    };
    store.load();
/*    store.load({
      callback: function() {
       if(sel_idx){
           Ext.getCmp('dgvRegistroDeCitas').getSelectionModel().select(sel_idx);
         }
       }
    });*/
  },
  AccionNuevoPaciente : function() {
    Ext.getCmp('txtDatosPersonaCita').setValue('');
    var config = {wcita : 1};
    var frm = Ext.create('MyDesktop.app.views.ClienteEditar', config);
  },
  AccionEditarCita : function(btn) {
    var grid = Ext.getCmp('dgvRegistroDeCitas');
    var record = grid.getSelectionModel().getSelection();
    var w = new Ext.create(
        'MyDesktop.app.views.servicio.registro.RegistroCitaEditar',
        {animateTarget : btn.id});
    w.setTitle('Registro  Paciente :' +
               '  ' + record[0].get('_paciente'));
    w.down('form').loadRecord(record[0]);
    w.show();
  },
  AccionSeleccionarFecha : function(obj) {
    if (Ext.getCmp('dpFechaCita').getValue() != null &&
        Ext.getCmp('cboMedicoCita').getValue() != null) {
      me = this;
      var store = Ext.getCmp('dgvRegistroDeCitas').getStore();
      store.getProxy().extraParams = {
        vfecha : Ext.getCmp('dpFechaCita').getValue(),
        vidmedico : Ext.getCmp('cboMedicoCita').getValue(),
        vidsede : Ext.util.Cookies.get('sede')
      };
      store.load();
    }
  },
  AccionSeleccionarMedico : function(obj, value, opt) {
    if (Ext.getCmp('dpFechaCita').getValue() != '') {
      me = this;
      var store = Ext.getCmp('dgvRegistroDeCitas').getStore();
      if (value != null)
        __medico_id = value;
      store.getProxy().extraParams = {
        vfecha : Ext.getCmp('dpFechaCita').getValue(),
        vidmedico : __medico_id,
        vidsede : Ext.util.Cookies.get('sede')
      };
      store.load();
    }
  },
  AccionGuardarCita : function() {
    me = this;
    try {
      var form = Ext.getCmp('myFormRegistroCita');
      if (form.isValid()) {
        Ext.Ajax.request({
          url : 'index.php/citas/actualizar',
          params : {
            vid : 0,
            vidmedico : Ext.getCmp('cboMedicoCita').getValue(),
            vidpersona : Ext.getCmp('txtIdPersonaCita').getValue(),
            vpersona : Ext.getCmp('txtDatosPersonaCita').getRawValue(),
            vdescripcion : Ext.getCmp('txtDescripcionCita').getValue(),
            vobservacion : Ext.getCmp('txtObservacionesCita').getValue(),
            vtipocita : Ext.getCmp('cboTipoCita').getValue(),
            vusuario :  Ext.util.Cookies.get('idusuario'),
            vfecha : Ext.getCmp('dpFechaCita').getValue(),
            vprecio : 0,
            vidsede :  Ext.util.Cookies.get('sede')
          },
          success : function(conn, response, options, eOpts) {
            var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
            Ext.each(result.items, function(item) {
              if (item.ERROR > 0) {
                __medico_id = Ext.getCmp('cboMedicoCita').getValue();
                Ext.getCmp('myFormRegistroCita').getForm().reset();
              }

            });
          },
          failure : function(conn, response, options, eOpts) {}
        });
      }
    } catch (e) {
      console.info("error en guardar");
    }

  }

});
