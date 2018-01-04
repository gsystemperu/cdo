Ext.define('MyDesktop.app.views.servicio.consultorio.RefraccionEditar', {
  extend : 'Ext.window.Window',
  alias : 'widget.wregistrocitaeditar',
  config : {tipo : '', editar : 0},
  id : 'wregistrocitaeditar',
  initComponent : function() {
    me = this;
    var storeMedicos = Ext.create('MyDesktop.app.stores.Trabajadores');
    var idmedico = Ext.getCmp('cboMedicoConsultorio').getValue();

    Ext.apply(this, {
      title : 'Refraccion del Ojo',
      width : 550,
      height : 250,
      modal : true,
      iconCls : 'user',
      layout : {type : 'vbox', align : 'stretch'},
      items : [
        {
          xtype : 'form',
          flex : 2,
          frame : false,
          bodyStyle : 'padding:5px 5px 0',
          id : 'frmDatosRefraccion',
          items : [
            {
              xtype : 'fieldset',
              columnWidth : 0.5,
              title : 'Paciente',
              hidden : true,
              defaults : {anchor : '100%'},
              layout : 'anchor',
              items : [
                {xtype : 'hiddenfield', id : 'txtIdCita', name : '_idcita'},
                {
                  xtype : 'hiddenfield',
                  id : 'txtIdConsulta',
                  name : '_idconsulta'
                }
              ]
            },
            {
              xtype : 'fieldset',
              columnWidth : 0.5,
              defaults : {anchor : '50%'},
              layout : 'anchor',
              items : [
                {
                  xtype : 'datefield',
                  fieldLabel : 'Fecha',
                  id : 'dpFechaRefraccion',
                  width : 150,
                  value : new Date(),
                  name : '_fecha',
                  allowBlank : false

                }
              ]
            },
            {
              xtype : 'fieldset',
              columnWidth : 0.5,
              defaults : {
                xtype : 'textfield',
                width : 100,
                labelWidth : 50,
                labelAlign : 'right'
              },
              layout : 'hbox',
              padding : 10,
              items : [
                {
                  fieldLabel : 'Esfera',
                  id : 'txtRefraccionEsfera',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_esfera'
                },
                {
                  fieldLabel : 'Cilindro',
                  id : 'txtRefraccionCilindro',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_cilindro'
                },
                {
                  fieldLabel : 'Eje',
                  id : 'txtRefraccionEje',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_eje'
                },
                {
                  fieldLabel : 'DIP. L',
                  id : 'txtRefraccionDip_l',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_dip_l',
                  hidden:true
                },
                {
                  fieldLabel : 'DIP. C',
                  id : 'txtRefraccionDip_c',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_dip_c',
                  hidden:true
                },
                {
                  fieldLabel : 'AV',
                  id : 'txtRefraccionAv',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_av'
                },
                {
                  fieldLabel : 'Adiccion',
                  id : 'txtRefraccionAdiccion',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_adiccion',
                  hidden:true
                }

              ]
            },
            {
              xtype : 'fieldset',
              columnWidth : 0.5,
              defaults : {anchor : '100%', xtype : 'textarea'},
              layout : 'anchor',
              padding : 10,
              items : [
                {
                  fieldLabel : 'Observacion 1',
                  id : 'txtRefraccionObser1',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_obser1',
                  hidden:true
                },
                {
                  fieldLabel : 'Observacion 2',
                  id : 'txtRefraccionObser2',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_obser2',
                  hidden:true
                },
                {
                  xtype : 'combo',
                  fieldLabel : 'Medico',
                  id : 'cboRefraccionMedico',
                  name : '_idmed',
                  store : storeMedicos,
                  queryMode : 'local',
                  displayField : 'ncompleto',
                  valueField : 'id',
                  editable : false,
                  readOnly : true,
                  emptyText : '-- SELECCIONAR AL MEDICO --',
                  value : idmedico
                }
              ]

            }
          ]
        }
      ],
      bbar : [
        {
          xtype : 'button',
          text : 'Actualizar',
          id : 'btnRefraccionActualizar',
          scale : 'medium',
          iconCls : 'boton-save'
        },
        {
          xtype : 'button',
          text : 'Cerrar',
          scale : 'medium',
          id : 'btnModCerrar',
          iconCls : 'boton-cancel',
          listeners : {click : function() { me.close(); }}
        }
      ]

    });

    this.callParent(arguments);
    Ext.getCmp('btnRefraccionActualizar')
        .on('click', me.accionActualizarRefraccion, this);
  },

  accionActualizarRefraccion : function(obj) {
    var tipoGrilla = Ext.getCmp('wregistrocitaeditar').getTipo();
    var editar = Ext.getCmp('wregistrocitaeditar').getEditar();
    if (tipoGrilla == 'OD') {
      var store = Ext.getCmp('dgvRefraccionOjoDerecho').getStore();
      var idcita = Ext.getCmp('txtIdCita').getValue();
      var idconsulta = Ext.getCmp('txtIdConsulta').getValue();
      store.removeAll();
      store.add({
        _idod : 1,
        _idconsul : (idconsulta != '' ? idconsulta : 0),
        _fecha : Ext.getCmp('dpFechaRefraccion').getRawValue(),
        _esfera : Ext.getCmp('txtRefraccionEsfera').getValue(),
        _cilindro : Ext.getCmp('txtRefraccionCilindro').getValue(),
        _eje : Ext.getCmp('txtRefraccionEje').getValue(),
        _dip_l : Ext.getCmp('txtRefraccionDip_l').getValue(),
        _dip_c : Ext.getCmp('txtRefraccionDip_c').getValue(),
        _av : Ext.getCmp('txtRefraccionAv').getValue(),
        _adiccion : Ext.getCmp('txtRefraccionAdiccion').getValue(),
        _obser1 : Ext.getCmp('txtRefraccionObser1').getValue(),
        _obser2 : Ext.getCmp('txtRefraccionObser2').getValue(),
        _idmed : Ext.getCmp('cboRefraccionMedico').getValue(),
        _medico : Ext.getCmp('cboRefraccionMedico').getRawValue()
      });
      Ext.getCmp('btnModCerrar').fireEvent('click');
    } else {
      var store = Ext.getCmp('dgvRefraccionOjoIzquierdo').getStore();
      var idcita = Ext.getCmp('txtIdCita').getValue();
      var idconsulta = Ext.getCmp('txtIdConsulta').getValue();
      store.removeAll();
      store.add({
        _idod : 1,
        _idconsul : (idconsulta != '' ? idconsulta : 0),
        _fecha : Ext.getCmp('dpFechaRefraccion').getRawValue(),
        _esfera : Ext.getCmp('txtRefraccionEsfera').getValue(),
        _cilindro : Ext.getCmp('txtRefraccionCilindro').getValue(),
        _eje : Ext.getCmp('txtRefraccionEje').getValue(),
        _dip_l : Ext.getCmp('txtRefraccionDip_l').getValue(),
        _dip_c : Ext.getCmp('txtRefraccionDip_c').getValue(),
        _av : Ext.getCmp('txtRefraccionAv').getValue(),
        _adiccion : Ext.getCmp('txtRefraccionAdiccion').getValue(),
        _obser1 : Ext.getCmp('txtRefraccionObser1').getValue(),
        _obser2 : Ext.getCmp('txtRefraccionObser2').getValue(),
        _idmed : Ext.getCmp('cboRefraccionMedico').getValue(),
        _medico : Ext.getCmp('cboRefraccionMedico').getRawValue()
      });
      Ext.getCmp('btnModCerrar').fireEvent('click');
    }

  }
});
