Ext.define('MyDesktop.app.views.servicio.consultorio.LenteContactoEditar', {
  extend : 'Ext.window.Window',
  alias : 'widget.wlentecontactoeditar',
  config : {tipo : '', editar : 0},
  id : 'wlentecontactoeditar',
  initComponent : function() {
    me = this;
    var storeMedicos = Ext.create('MyDesktop.app.stores.Trabajadores');
    var idmedico = Ext.getCmp('cboMedicoConsultorio').getValue();

    Ext.apply(this, {
      title : 'Lente de Contacto del Ojo',
      width : 850,
      height : 290,
      modal : true,
      iconCls : 'user',
      layout : {type : 'vbox', align : 'stretch'},
      items : [
        {
          xtype : 'form',
          flex : 2,
          frame : false,
          bodyStyle : 'padding:5px 5px 0',
          id : 'frmDatosLenteContacto',
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
                  id : 'dpFechaLenteContacto',
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
                  id : 'txtLenteContactoEsfera',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_esfera'
                },
                {
                  fieldLabel : 'Cilindro',
                  id : 'txtLenteContactoCilindro',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_cilindro'
                },
                {
                  fieldLabel : 'Eje',
                  id : 'txtLenteContactoEje',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_eje'
                },
                {
                  fieldLabel : 'Radio',
                  id : 'txtLenteContactoRadio',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_radio'
                },
                {
                  fieldLabel : 'Potencia',
                  id : 'txtLenteContactoPotencia',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_potencia'
                },
                {
                  fieldLabel : 'Diametro',
                  id : 'txtLenteContactoDiametro',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_diametro'
                },
                {
                  fieldLabel : 'Curva',
                  id : 'txtLenteContactoCurva',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_curva'
                },
                {
                  fieldLabel : 'Tipo',
                  id : 'txtLenteContactoTipo',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_tipo'
                }

              ]
            },
            {
              xtype : 'fieldset',
              columnWidth : 0.5,
              defaults :
                  {xtype : 'textfield', labelWidth : 80, labelAlign : 'right'},
              // layout: 'hbox',
              padding : 10,
              items : [
                {
                  xtype : 'textarea',
                  fieldLabel : 'Observacion',
                  id : 'txtLenteContactoObser',
                  fieldStyle : 'text-transform:uppercase',
                  name : '_obser',
                  anchor : '100%;'
                },
                {
                  xtype : 'combo',
                  fieldLabel : 'Medico',
                  id : 'cboLenteContactoMedico',
                  name : '_idmed',
                  store : storeMedicos,
                  queryMode : 'local',
                  displayField : 'ncompleto',
                  valueField : 'id',
                  editable : false,
                  emptyText : '-- SELECCIONAR AL MEDICO --',
                  value : idmedico,
                  anchor : '100%;',
                  readOnly : true
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
          id : 'btnLenteContactoActualizar',
          scale : 'medium',
          iconCls : 'boton-save'
        },
        {
          xtype : 'button',
          text : 'Cerrar',
          scale : 'medium',
          id : 'btnLenteContactoCerrar',
          iconCls : 'boton-cancel',
          listeners : {click : function() { me.close(); }}
        }
      ]

    });

    this.callParent(arguments);
    Ext.getCmp('btnLenteContactoActualizar')
        .on('click', me.accionActualizarLenteContacto, this);
  },

  accionActualizarLenteContacto : function(obj) {
    var tipoGrilla = Ext.getCmp('wlentecontactoeditar').getTipo();
    var editar = Ext.getCmp('wlentecontactoeditar').getEditar();
    if (tipoGrilla == 'OD') {
      var store = Ext.getCmp('dgvLenteContactoOjoDerecho').getStore();
      var idcita = Ext.getCmp('txtIdCita').getValue();
      var idconsulta = Ext.getCmp('txtIdConsulta').getValue();
      store.removeAll();
      store.add({
        _idod : 1,
        _idconsul : (idconsulta != '' ? idconsulta : 0),
        _fecha : Ext.getCmp('dpFechaLenteContacto').getRawValue(),
        _esfera : Ext.getCmp('txtLenteContactoEsfera').getValue(),
        _cilindro : Ext.getCmp('txtLenteContactoCilindro').getValue(),
        _eje : Ext.getCmp('txtLenteContactoEje').getValue(),
        _radio : Ext.getCmp('txtLenteContactoRadio').getValue(),
        _potencia : Ext.getCmp('txtLenteContactoPotencia').getValue(),
        _diametro : Ext.getCmp('txtLenteContactoDiametro').getValue(),
        _curva : Ext.getCmp('txtLenteContactoCurva').getValue(),
        _tipo : Ext.getCmp('txtLenteContactoTipo').getValue(),
        _obser : Ext.getCmp('txtLenteContactoObser').getValue(),
        _idmed : Ext.getCmp('cboLenteContactoMedico').getValue(),
        _medico : Ext.getCmp('cboLenteContactoMedico').getRawValue()
      });
      Ext.getCmp('btnLenteContactoCerrar').fireEvent('click');
    } else {
      var store = Ext.getCmp('dgvLenteContactoOjoIzquierdo').getStore();
      var idcita = Ext.getCmp('txtIdCita').getValue();
      var idconsulta = Ext.getCmp('txtIdConsulta').getValue();
      store.removeAll();
      store.add({
        _idod : 1,
        _fecha : Ext.getCmp('dpFechaLenteContacto').getRawValue(),
        _esfera : Ext.getCmp('txtLenteContactoEsfera').getValue(),
        _cilindro : Ext.getCmp('txtLenteContactoCilindro').getValue(),
        _eje : Ext.getCmp('txtLenteContactoEje').getValue(),
        _radio : Ext.getCmp('txtLenteContactoRadio').getValue(),
        _potencia : Ext.getCmp('txtLenteContactoPotencia').getValue(),
        _diametro : Ext.getCmp('txtLenteContactoDiametro').getValue(),
        _curva : Ext.getCmp('txtLenteContactoCurva').getValue(),
        _tipo : Ext.getCmp('txtLenteContactoTipo').getValue(),
        _obser : Ext.getCmp('txtLenteContactoObser').getValue(),
        _idmed : Ext.getCmp('cboLenteContactoMedico').getValue(),
        _medico : Ext.getCmp('cboLenteContactoMedico').getRawValue()
      });
      Ext.getCmp('btnLenteContactoCerrar').fireEvent('click');
    }

  }
});
