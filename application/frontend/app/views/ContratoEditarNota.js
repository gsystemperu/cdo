ix = 0;
ult_id = 0;
var __idpersona = 0;
var __idnotapedido = 0;
Ext.define('MyDesktop.app.views.ContratoEditarNota', {
  extend : 'Ext.window.Window',
  alias : 'widget.wcontratoeditarnota',
  id : 'wcontratoeditarnota',
  width : 650,
  height : 830,
  modal : true,
  floating : true,
  autoShow : true,
  title : '.:.  Registro de Nota  .:.',
  bodyPadding : 5,
  requires : [
    'MyDesktop.app.stores.Productos',
    'MyDesktop.app.stores.Trabajadores',
    'MyDesktop.app.views.documento.NotasDePedidoUsuario',
    'MyDesktop.app.views.ClienteEditar',
   // 'MyDesktop.app.stores.Contratos',
    'MyDesktop.app.stores.Generos'
  ],
  initComponent : function() {
    var ix = 0;
    var ult_id = 0;
    var me = this;
    storeproductos = Ext.create('MyDesktop.app.stores.Productos');
    storedisenio = Ext.create('MyDesktop.app.stores.Medicos');
    storevendedor = Ext.create('MyDesktop.app.stores.TrabajadoresTipo');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');
    storedetallecontrato = Ext.create('MyDesktop.app.stores.DetalleContrato');
    storemateriales = Ext.create('MyDesktop.app.stores.Materiales');
    storeformapago = Ext.create('MyDesktop.app.stores.FormaPago');
    storeclientes = Ext.create('MyDesktop.app.stores.Clientes');
    storeTipoMoneda = Ext.create('MyDesktop.app.stores.TipoMoneda');

    storevendedor = Ext.create('MyDesktop.app.stores.Medicos');

    _mysede = Ext.util.Cookies.get('sede');

    storedisenio.load({
      params:{
          ptipomedico:1,
          ptitulo : 'NIGUNO'
      }
    });
    storeproveedores = Ext.create('MyDesktop.app.stores.Proveedores');
    storevendedor.load({
      params:{
          ptipomedico:3,
          ptitulo : 'NIGUNO'
      }

    });
      storeproductos.getProxy().extraParams = {
        pid : 0,
        pproducto  : null,
        pproveedor : null,
        pidsede    : _mysede
      };
      storeproductos.clearFilter();
      storeproductos.load();

    Ext.applyIf(me, {
      items : [
        {
          xtype : 'panel',
          flex : 1,
          frame : true,
          border : false,
          layout : 'anchor',
          items : [
            {
              xtype : 'fieldset',
              title : 'Datos Documento',
              defaultType : 'textfield',
              layout : 'fit',
              items : [
                {

                  xtype : 'radiogroup',
                  fieldLabel : 'Tipo Documento',
                  labelAlign : 'right',
                  items : [
                    {
                      boxLabel : 'BOLETA',
                      name : 'rbdoc',
                      value : 'B',
                      id : 'rbBnota',
                      hidden : true,
                      listeners : {
                        change : function(cb, nv, ov) {
                          if (nv == true) {
                            Ext.getCmp('txtRetension').setVisible(false);
                            Ext.getCmp('txtIgv').setVisible(true);
                          }
                        }
                      }
                    },
                    {
                      boxLabel : 'FACTURA',
                      name : 'rbdoc',
                      value : 'F',
                      id : 'rbF',
                      hidden:true,
                      checked : false,
                      listeners : {
                        change : function(cb, nv, ov) {
                          if (nv == true) {
                            Ext.getCmp('txtRetension').setVisible(false);
                            Ext.getCmp('txtIgv').setVisible(true);
                          }
                        }
                      }
                    },
                    {
                      boxLabel : 'NOTA',
                      name : 'rbdoc',
                      value : 'NP',
                      id : 'rbNp',
                      checked : true,
                      listeners : {
                        change : function(cb, nv, ov) {
                          if (nv == true) {
                            Ext.getCmp('txtRetension').setVisible(false);
                            Ext.getCmp('txtIgv').setVisible(true);
                          }
                        }
                      }
                    },
                    {
                      boxLabel : 'HONORARIOS',
                      name : 'rbdoc',
                      value : 'RH',
                      id : 'rbRh',
                      checked : false,
                      hidden :true,
                      listeners : {
                        change : function(cb, nv, ov) {
                          if (nv == true) {
                            Ext.getCmp('txtRetension').setVisible(true);
                            Ext.getCmp('txtIgv').setVisible(false);
                            me.getCalcularContrato();
                          }
                        }
                      }
                    },
                  ],
                },

                {
                  xtype : 'combobox',
                  fieldLabel : 'Sede',
                  labelAlign : 'left',
                  name : 'idtiendas',
                  padding : 2,
                  id : 'cboTienda',
                  store : storetiendas,
                  queryMode : 'local',
                  displayField : 'descrip',
                  valueField : 'id',
                  //forceSelection : true,
                  editable : false,
                  emptyText : '----- SELECCIONAR LA SEDE ------',
                  value : _mysede,
                  listeners : {
                    change:function(){
                      var store = Ext.getCmp('cboProducto').getStore();
                      store.getProxy().extraParams = {
                        pid : 0,
                        pproducto  : null,
                        pproveedor : null,
                        pidsede    : this.getValue()
                      };
                      store.clearFilter();
                      Ext.getCmp('cboProducto').setValue('');
                      store.load();
                    }
                  }
                },
                {
                  xtype : 'combobox',
                  fieldLabel : 'Forma de Pago',
                  labelAlign : 'left',
                  name : 'idFormaPago',
                  padding : 2,
                  id : 'cboFormaPago',
                  store : storeformapago,
                  queryMode : 'local',
                  displayField : '_descripcion',
                  valueField : '_idfpag',
                  // forceSelection : true,
                  editable : false,
                  emptyText : '----- SELECCIONAR FORMA PAGO ------',
                  value : '1'
                },
                {
                  xtype : 'combobox',
                  fieldLabel : 'Tipo Moneda',
                  labelAlign : 'left',
                  name : 'idTipoMoneda',
                  padding : 2,
                  id : 'cboTipoMoneda',
                  store : storeTipoMoneda,
                  queryMode : 'local',
                  displayField : '_descripcion',
                  valueField : '_idmon',
                  // forceSelection : true,
                  editable : false,
                  emptyText : '----- SELECCIONAR TIPO MONEDA ------',
                  value : '1'
                }
              ]
            },

            {
              xtype : 'fieldset',
              title : 'Datos del Cliente',
              defaultType : 'textfield',
              layout : 'fit',
              items : [
                {
                  xtype : 'container',
                  layout : 'hbox',
                  margin : '0 0 5 6',
                  items : [
                    {
                      xtype : 'hiddenfield',
                      id : 'txtIdPersona'
                    },
                    {xtype : 'hiddenfield', id : 'txtIdNotaPedido', value : 0},
                    {
                      xtype : 'textfield',
                      id : 'txtDatosPersona',
                      emptyText : '--- SELECIONAR AL PACIENTE ---',
                      flex : 3,
                      labelAlign : 'right',
                      labelWidth : 95,
                      fieldLabel : 'Paciente',
                      readOnly : true

                    },
                    {
                      xtype : 'button',
                      id : 'btnBuscarPersona',
                      iconCls : 'x-ico-lupa'
                    },
                    {
                      xtype : 'button',
                      id : 'btnAgregarPersona',
                      iconCls : 'add'
                    },
                    {
                      xtype : 'button',
                      id : 'btnBuscarNotaPedido',
                      text : '<b>NP</b>'
                    }

                  ]
                },
                {
                  xtype : 'container',
                  layout : 'vbox',

                  items : [
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Medico Tratante',
                      labelAlign : 'right',
                      name : 'diseniador',
                      id : 'cboDise',
                      margin : '0 0 5 6',
                      store : storedisenio,
                      queryMode : 'local',
                      valueField : 'id',
                      displayField : 'ncompleto',
                      editable : false,
                      emptyText : '--- SELECCIONAR EL MEDICO ---',
                      width : 565,
                      labelWidth : 95,
                      flex : 1
                    },
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Medico Cirujano',
                      labelAlign : 'right',
                      itemId : 'cboMedCirujano',
                      margin : '0 0 5 6',
                      store : storedisenio,
                      queryMode : 'local',
                      valueField : 'id',
                      displayField : 'ncompleto',
                      editable : false,
                      emptyText : '--- SELECCIONAR EL MEDICO ---',
                      width : 565,
                      labelWidth : 95,
                      flex : 1
                    },
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Medico Externo',
                      labelAlign : 'right',
                      itemId : 'cboMedExterno',
                      margin : '0 0 5 6',
                      store : storedisenio,
                      queryMode : 'local',
                      valueField : 'id',
                      displayField : 'ncompleto',
                      editable : false,
                      emptyText : '--- SELECCIONAR EL MEDICO ---',
                      width : 565,
                      labelWidth : 95,
                      flex : 1
                    },
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Vendedor',
                      labelAlign : 'right',
                      itemId : 'cboVendedor',
                      margin : '0 0 5 6',
                      store : storevendedor,
                      queryMode : 'local',
                      valueField : 'id',
                      displayField : 'ncompleto',
                      editable : false,
                      emptyText : '--- SELECCIONAR EL VENDEDOR ---',
                      width : 565,
                      labelWidth : 95,
                      flex : 1
                    },
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Proveedor',
                      labelAlign : 'right',
                      itemId : 'cboProveedor',
                      margin : '0 0 5 6',
                      store : storeproveedores,
                      queryMode : 'local',
                      valueField : '_idprov',
                      displayField : '_paterno',
                      editable : false,
                      emptyText : '--- SELECCIONAR EL PROVEEDOR ---',
                      width : 565,
                      labelWidth : 95,
                      flex : 1
                    },

                  ]
                }

              ] // fin fieldset

            },

            {
              xtype : 'fieldset',
              title : 'Detalle',
              layout : {
                type : 'anchor'
                // anchor : '100'
              },
              defaultType : {
                type : 'textfield'

              },
              items : [
                {xtype : 'hidden', id : 'txtIdNotaPedido'},
                {
                  xtype : 'combobox',
                  fieldLabel : 'Concepto',
                  labelWidth : 100,
                  anchor : '100%',
                  id : 'cboProducto',
                  store : storeproductos,
                  labelAlign : 'right',
                  queryMode : 'remote',
                  valueField : 'id',
                  displayField : 'producto',
                  editable : true,
                  forceSelection : true,
                  emptyText : ' --- BUSCAR EL CONCEPTO --- ',
                  width : 570,
                //  typeAhead : true,
                  minChars : 1,
                  //hideTrigger : true,
                  listeners : {
                    select : function(combo, record, index) {
                      Ext.getCmp('txtPrecioventa')
                          .setValue(record[0].get('precioventa'));
                      Ext.getCmp('txtCantidad').setValue('1');
                    },
                    change : function(field, newValue, oldValue) {
                      var _sede = Ext.getCmp('cboTienda').getValue();
                      if(_sede == null){Ext.Msg.alert("Aviso","Seleccionar la sede de los productos");return false;}
                      var store = field.getStore();
                      store.clearFilter();
                      store.filter(
                        {
                          property : 'producto',
                          anyMatch : false,
                          value : field.getValue()
                        }
                      );
                    },
                    scope : this
                  }
                },

                {
                  xtype : 'container',
                  layout : 'hbox',
                  padding : '5 0 5 0',
                  items : [
                    {
                      xtype : 'numberfield',
                      id : 'txtPrecioventa',
                      mane : 'precioventa',
                      fieldLabel : 'Precio Venta',
                      labelAlign : 'right',
                      fieldStyle : 'text-align:right',
                      decimalPrecision : 2,
                      step : 0.01,
                      decimalSeparator : '.',
                      currencySymbol : 'S/. ',
                      width : 200
                    },
                    {
                      xtype : 'numberfield',
                      fieldLabel : 'Cantidad',
                      id : 'txtCantidad',
                      labelWidth : 50,
                      labelAlign : 'right',
                      fieldStyle : 'text-align:center;size:15px',
                      maxValue : 50,
                      minValue : 0,
                      width : 150,

                    },

                  ]
                },
                {
                  xtype : 'textfield',
                  id : 'txtObserItem',
                  fieldLabel : 'Observacion',
                  labelAlign : 'right',
                  anchor : '100%',
                  // width : 570,
                  listeners : {
                    change : function(field, newValue) {
                      field.setValue(newValue.toUpperCase());
                    }
                  }
                },

              ]
            },

            {
              xtype : 'panel',
              layout : 'fit',
              margin : '0 0 5 0',
              items : [
                {
                  xtype : 'grid',
                  flex : 1,
                  id : 'dgvDetalleContrato',
                  store : storedetallecontrato,
                  columns : [
                    {
                      text : 'Id',
                      dataIndex : 'id',
                      align : 'center',
                      width : 25,
                      hidden : true
                    },
                    {text : 'Producto', dataIndex : 'producto', flex : 2},
                    {
                      text : 'Material',
                      dataIndex : 'material',
                      width : 230,
                      hidden : true
                    },
                    {
                      text : 'Ancho',
                      dataIndex : 'medida1',
                      width : 50,
                      align : 'center',
                      hidden : true
                    },
                    {
                      text : 'Largo',
                      dataIndex : 'medida2',
                      width : 50,
                      align : 'center',
                      hidden : true
                    },
                    {
                      text : 'Cantidad',
                      dataIndex : 'cantidad',
                      flex : 0.5,
                      align : 'center'
                    },
                    {
                      text : 'Total',
                      dataIndex : 'total',
                      align : 'right',
                      flex : 0.8
                    },
                    {
                      xtype : 'actioncolumn',
                      width : 20,
                      align : 'center',
                      items : [
                        {
                          iconCls : 'remove',
                          handler : function(grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            var x = record.get('id');
                            var store =
                                Ext.getCmp('dgvDetalleContrato').getStore();
                            store.remove(store.findRecord("id", x));
                            me.getCalcularContrato();
                          }
                        }
                      ]
                    }
                  ],
                  height : 150,
                  listeners : {
                    itemdblclick : function(dv, record, item, index, e) {
                      var x = record.get('idprod');
                      Ext.getCmp('txtPrecioventa')
                          .setValue(record.get('total') /
                                    record.get('cantidad'));
                      Ext.getCmp('txtCantidad')
                          .setValue(record.get('cantidad'));
                      Ext.getCmp('txtObserItem').setValue(record.get('obser'));
                    },
                  }

                }
              ],
              tbar : [
                {
                  xtype : 'button',
                  text : 'Ingresar',
                  id : 'btnIngresar',
                  iconCls : 'add',
                  handler : function() {
                    me.setInsertarItem(storedetallecontrato);
                  }

                },
                {
                  xtype : 'button',
                  text : 'Modificar',
                  id : 'btnModificar',
                  iconCls : 'boton-edit',
                  handler : function() {
                    var grid = Ext.getCmp('dgvDetalleContrato');
                    var x =
                        grid.getSelectionModel().getSelection()[0].get('id');
                    var store = Ext.getCmp('dgvDetalleContrato').getStore();
                    var record = store.findRecord("id", x);
                    if (record) {
                      var precio = Ext.getCmp('txtPrecioventa').getValue();
                      var cant = Ext.getCmp('txtCantidad').getValue();
                      var ancho = 0; // Ext.getCmp('txtAncho').getValue();
                      var largo = 0; // Ext.getCmp('txtLargo').getValue();
                      var obser = Ext.getCmp('txtObserItem').getValue();
                      var textodet =
                          ''; // Ext.getCmp('txtTextoItem').getValue();

                      var total = precio * cant;
                      record.set('medida1', ancho);
                      record.set('medida2', largo);
                      record.set('cantidad', cant);
                      record.set('total', total);
                      record.set('obser', obser);
                      record.set('textodet', textodet);

                      record.endEdit();
                      record.commit();
                      me.getCalcularContrato();
                      Ext.Msg.alert("Aviso", "Item de detalle actualizado !!");
                    }
                  }
                }

              ]

            }, // fin panel detalle grilla

            {
              xtype : 'panel',
              border : false,
              frame : true,
              layout : 'hbox',
              items : [
                {
                  xtype : 'fieldset',
                  flex : 1,
                  items : [
                    {
                      xtype : 'container',
                      layout : 'hbox',
                      hidden:false,
                      items : [
                        {
                          xtype : 'label',
                          text : 'Numero Recibo:',
                          width : 105,

                        },
                        {
                          xtype : 'textfield',
                          id : 'txtSerieReciboHonorario',
                          width : 70,
                          desabled : true,
                          align : 'right'
                        },
                        {
                          xtype : 'textfield',
                          id : 'txtNumeroReciboHonorario',
                          width : 100,
                          desabled : true,
                          align : 'right'
                        }
                      ]
                    },
                    {
                      xtype : 'container',
                      layout : 'hbox',
                      //hidden:true,
                      items : [
                        {
                          xtype : 'numberfield',
                          fieldLabel : 'Pago acuenta',
                          id : 'txtPagoAcuenta1',
                          flex : 2,
                          decimalPrecision : 3,
                          minValue : 0,
                          step : 0.01,
                          decimalSeparator : '.',
                          fieldStyle : 'text-align:right'

                        },
                        {
                          xtype : 'datefield',
                          id : 'dtPagoAcuenta1',
                          flex : 1
                        }
                      ]
                    },
                    {
                      xtype : 'container',
                      layout : 'hbox',
                      //hidden:true,
                      items : [
                        {
                          xtype : 'numberfield',
                          id : 'txtPagoAcuenta2',
                          fieldLabel : 'Pago acuenta',
                          flex : 2,
                          decimalPrecision : 3,
                          minValue : 0,
                          step : 0.01,
                          decimalSeparator : '.',
                          fieldStyle : 'text-align:right'

                        },
                        {
                          xtype : 'datefield',
                          id : 'dtPagoAcuenta2',
                          flex : 1
                        }
                      ]
                    },
                    {
                      xtype : 'container',
                      layout : 'hbox',
                      //hidden:true,
                      items : [
                        {
                          xtype : 'numberfield',
                          id : 'txtPagoAcuenta3',
                          fieldLabel : 'Pago acuenta',
                          flex : 2,
                          decimalPrecision : 3,
                          minValue : 0,
                          step : 0.01,
                          decimalSeparator : '.',
                          fieldStyle : 'text-align:right'
                        },
                        {
                          xtype : 'datefield',
                          id : 'dtPagoAcuenta3',
                          flex : 1
                        }
                      ]
                    },
                  ]
                },
                {
                  xtype : 'panel',
                  frame : false,
                  flex : 1,
                  padding : '0 0 0 40',
                  items : [
                    {
                      xtype : 'numberfield',
                      id : 'txtSubtotal',
                      name : 'subtotal',
                      fieldLabel : 'Sub Total',
                      decimalPrecision : 3,
                      minValue : 0,
                      step : 0.01,
                      decimalSeparator : '.',
                      readOnly : true,
                      width : 250,
                      labelWidth : 120,
                      labelAlign : 'right',
                      fieldStyle : 'text-align:right'

                    },
                    {
                      xtype : 'numberfield',
                      fieldLabel : 'Retension',
                      id : 'txtRetension',
                      name : 'retension',
                      labelAlign : 'right',
                      decimalPrecision : 3,
                      minValue : 0,
                      step : 0.01,
                      decimalSeparator : '.',
                      enableKeyEvents : true,
                      width : 250,
                      labelWidth : 120,
                      fieldStyle : 'text-align:right',
                      hidden : true

                    },
                    {
                      xtype : 'numberfield',
                      fieldLabel : 'Igv',
                      id : 'txtIgv',
                      name : 'igv',
                      labelAlign : 'right',
                      decimalPrecision : 3,
                      minValue : 0,
                      step : 0.01,
                      decimalSeparator : '.',
                      readOnly : true,
                      enableKeyEvents : true,
                      width : 250,
                      labelWidth : 120,
                      fieldStyle : 'text-align:right'

                    },
                    {
                      xtype : 'numberfield',
                      fieldLabel : 'Total ',
                      id : 'txtTotal',
                      name : 'total',
                      decimalPrecision : 3,
                      minValue : 0,
                      step : 0.01,
                      decimalSeparator : '.',
                      readOnly : true,
                      width : 250,
                      labelWidth : 120,
                      labelAlign : 'right',
                      fieldStyle : 'text-align:right'

                    },

                  ]
                }

              ]

            },
            {
              xtype : 'panel',
              frame : false,
              buttons : [
                {
                  xytpe : 'button',
                  text : 'Cancelar',
                  scale : 'medium',
                  iconCls : 'boton-cancel ',
                  handler : function() {
                    ix = 0;
                    me.close();
                  }
                },
                '-',
                {
                  xtype : 'checkboxfield',
                  boxLabel : 'El Precio incluye I.G.V',
                  inputValue : 1,
                  id : 'ckbAplicarIgv',
                  disabled : true,
                  listeners : {
                    change : function(cb, checked) {
                      if (Ext.getCmp('rbB').getValue() == true ||
                          Ext.getCmp('rbF').getValue() == true ||
                          Ext.getCmp('rbNp').getValue() == true) {
                        me.getCalcularContrato();
                      }
                    }
                  }
                },
                '-',
                {
                  xytpe : 'button',
                  text : 'Guardar',
                  scale : 'medium',
                  iconCls : 'boton-save ',
                  handler : function() {
                    me.ActualizarContrato(1);

                  }
                }

              ]

            }
          ]

        }

      ]
    });

    me.callParent(arguments);

    Ext.getCmp('btnBuscarNotaPedido')
        .on('click', me.personaTieneNotaPedido, this);
    Ext.getCmp('txtRetension').on('keypress', me.getCalcularRetension, this);
    Ext.getCmp('btnAgregarPersona').on('click', me.accionAgregarPersona, this);
    Ext.getCmp('btnBuscarPersona').on('click', me.accionBuscarPaciente, this);

  },
  accionBuscarPaciente : function() {
      _flagbuscadorpaciente="CONTRATO_EDITAR";
    var frm = Ext.create('MyDesktop.app.views.BuscarCliente');
    var store=Ext.ComponentQuery.query("pacbuscar gridpanel#dgvBuscarPaciente")[0].getStore();
                                                store.load({
                                                    params:{


                                                       pid : -1 ,pdatospersona :null
                                                   }
                                                });
    frm.show();
  },
  accionAgregarPersona : function(btn) {
    var config = {wcita : 3}; /* 3 => Venta de Contratos */
    var w = Ext.create('MyDesktop.app.views.ClienteEditar', config);
  },
  getCalcularRetension : function(obj, e, eOpts) {
    if (e.getKey() == e.ENTER) {
      var _subtotal = Ext.getCmp('txtSubtotal').getValue();
      var _retension = obj.getValue();
      var _total = _subtotal - _retension;
      Ext.getCmp('txtTotal').setValue(_total);
    }
  },
  getCalcularContrato : function() {
    /*
      Los precios estan ya includo el IGV
     */
    var store = Ext.getCmp('dgvDetalleContrato').getStore();
    var r = Ext.getCmp('ckbAplicarIgv').getValue();
    var total = 0.0;
    var igv = 0.0;
    var subtotal = 0.0;
    store.each(function(record) {
      subtotal = parseFloat(subtotal) + parseFloat(record.get('total'));
    }, this);
    if (Ext.getCmp('rbRh').getValue() == true) {
      Ext.getCmp('txtSubtotal').setValue(subtotal);
      Ext.getCmp('txtIgv').setValue(0);
      Ext.getCmp('txtRetension').setValue(0);
      Ext.getCmp('txtTotal').setValue(subtotal);
    } else {
      Ext.getCmp('txtSubtotal').setValue(subtotal / 1.18);
      Ext.getCmp('txtIgv').setValue(subtotal - (subtotal / 1.18));
      Ext.getCmp('txtRetension').setValue(0);
      Ext.getCmp('txtTotal').setValue(subtotal);
    }
  },
  getLimpiarPanel : function() {
    Ext.getCmp('txtPrecioventa').setValue('');
    Ext.getCmp('txtCantidad').setValue('');
    Ext.getCmp('txtObserItem').setValue('');
    Ext.getCmp('cboProducto').setValue('');
  },
  getCamposVaciosPanel : function() {

    var sw = false;
    if (Ext.getCmp('cboProducto').getValue() == null)
      sw = true;
   // if (Ext.getCmp('txtPrecioventa').getValue() == 0)
// ||
 //       Ext.getCmp('txtPrecioventa').getValue() == null)
   //   sw = true;
    if (Ext.getCmp('txtCantidad').getValue() == 0 ||
        Ext.getCmp('txtCantidad').getValue() == null)
      sw = true;
    /* if(Ext.getCmp('txtAncho').getValue() == 0 ||
     Ext.getCmp('txtAncho').getValue() == null)
           sw = true;
     if(Ext.getCmp('txtLargo').getValue() == 0 ||
     Ext.getCmp('txtLargo').getValue() == null)
           sw = true ;*/
    return sw;
  },
  ActualizarContrato : function(btn) {
    var __tipoDoc = '';
    var __numeroRecibo='';

    /*if (Ext.getCmp('rbB').getValue() == true) {
      __tipoDoc = 'B';
    } else if (Ext.getCmp('rbF').getValue() == true) {
      __tipoDoc = 'F';
    } else if (Ext.getCmp('rbNp').getValue() == true) {*/
      __tipoDoc = 'N';
    /*} else {
      __tipoDoc = 'RH';
    }
    if(__tipoDoc == 'RH'){*/
        if( Ext.getCmp('txtSerieReciboHonorario').getValue()=='' ||  Ext.getCmp('txtNumeroReciboHonorario').getValue()=='' )
        {
          Ext.Msg.alert("Ingrese el numero del recibo ","Aviso");
          Ext.getCmp('txtSerieReciboHonorario').focus();
          return false;
        }else{
          __numeroRecibo =  Ext.getCmp('txtSerieReciboHonorario').getValue().toString() +'-'+ Ext.getCmp('txtNumeroReciboHonorario').getValue().toString();
        }
    /*}*/

    var x = 0;
    Ext.Ajax.request({
      url : 'index.php/contratos/actualizar',
      params : {
        pid : 0,
        pfcontrato : new Date(), // Ext.getCmp('dfEntrega').getValue(),
        ppersona : Ext.getCmp('txtDatosPersona').getValue(),
        pfentrega : new Date(), // Ext.getCmp('dfEntrega').getValue(),
        psubtotal : Ext.getCmp('txtSubtotal').getValue(),
        pigvtot : Ext.getCmp('txtIgv').getValue(),
        ptotal : Ext.getCmp('txtTotal').getValue(),
        pacuenta : 0, // Ext.getCmp('txtPagoCuenta').getValue(),
        piddise : Ext.getCmp('cboDise').getValue(),
        pidvende : 0, // Ext.getCmp('cboVendedora').getValue(),
        pidtienda : Ext.getCmp('cboTienda').getValue(),
        pusuario :  Ext.util.Cookies.get('idusuario'),
        ppagatodo : btn,
        phorafinal : '', // Ext.getCmp('horaTermina').getRawValue(),
        ptipodoc : __tipoDoc,
        pidper : Ext.getCmp('txtIdPersona').getValue(),
        pretension : Ext.getCmp('txtRetension').getValue(),
        pidnotapedido : (__tipoDoc == 'RH' || __tipoDoc == 'NP'? 0: Ext.getCmp('txtIdNotaPedido').getValue()),
        pidformapago : Ext.getCmp('cboFormaPago').getValue(),
        ppagoacuenta1 : Ext.getCmp('txtPagoAcuenta1').getValue(),
        ppagoacuentafecha1 : Ext.getCmp('dtPagoAcuenta1').getValue(),
        ppagoacuenta2 : Ext.getCmp('txtPagoAcuenta2').getValue(),
        ppagoacuentafecha2 : Ext.getCmp('dtPagoAcuenta2').getValue(),
        ppagoacuenta3 : Ext.getCmp('txtPagoAcuenta3').getValue(),
        ppagoacuentafecha3 : Ext.getCmp('dtPagoAcuenta3').getValue(),
        ptipomoneda : Ext.getCmp('cboTipoMoneda').getValue(),
        pnumerorecibohonorario: __numeroRecibo,
        idmedcirujano : Ext.ComponentQuery.query('#cboMedCirujano')[0].getValue(),
        idvendedor    :Ext.ComponentQuery.query('#cboVendedor')[0].getValue(),
        idproveedor   :Ext.ComponentQuery.query('#cboProveedor')[0].getValue(),
        idmedexterno  : Ext.ComponentQuery.query('#cboMedExterno')[0].getValue(),

      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        if (result.success) {
          Ext.each(result.items, function(item) {
            if (item.ERROR < 0) {
              Ext.Msg.alert('Error',
                            "Error en Sistema ! Comunicarse con Sistemas");
              return false;
            } else {
              console.log("Llego a ActualizarContratoDetalle " +
                          item.ERROR.toString());
              ActualizarContratoDetalleNota(item.ERROR, storedetallecontrato);
            }

          });
        } else {
          MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
          return false;
        }

      },
      failure : function(conn, response, options, eOpts) {}
    });

  },

  setInsertarItem : function(store) {
    if (this.getCamposVaciosPanel()) {
      Ext.Msg.alert("Aviso", "Ingrese los campos!");
      return false;
    }
    var storegrid = Ext.getCmp('dgvDetalleContrato').getStore();
    var idprod = Ext.getCmp('cboProducto').getValue();
    var producto = Ext.getCmp('cboProducto').getRawValue();
    var precioprod = Ext.getCmp('txtPrecioventa').getValue();
    var cantidad = Ext.getCmp('txtCantidad').getValue();
    var medida1 = 0;
    var medida2 = 0;
    var total = precioprod * cantidad;
    var idmat = 0;
    var material = '';
    var obser = Ext.getCmp('txtObserItem').getValue();
    var textodet = '';

    ix = ix + 1;
    store.add({
      id : ix,
      idprod : parseInt(idprod),
      producto : producto,
      medida1 : medida1,
      medida2 : medida2,
      cantidad : cantidad,
      total : total,
      idmat : idmat,
      material : material,
      obser : obser,
      textodet : textodet
    });
    this.getLimpiarPanel();
    this.getCalcularContrato();
    Ext.getCmp('txtPrecioventa').focus('', 200);

  }, // fin metodo
  personaTieneNotaPedido : function(){
    if(Ext.getCmp("txtIdPersona").getValue()==""){
        Ext.Msg.show({
           title:"Mensaje",
           msg:"Seleccione un paciente...!",
           buttons:Ext.Msg.OK,
           buttonText:{
               ok:"Aceptar"
           },
           icon:Ext.Msg.ERROR
        });
        return false;
    }
    var mensaje = Ext.getCmp('wcontratoeditar');
    if (Ext.getCmp('rbB').getValue() == true || Ext.getCmp('rbF').getValue() == true) {
      mensaje.getEl().mask('Buscando notas de pedido');
      __idpersona = Ext.getCmp('txtIdPersona').getValue();
      Ext.Ajax.request({
        url : 'index.php/contratos/tienenotapedido',
        params : {pidpersona : __idpersona},
        success : function(conn, response, options, eOpts) {
          var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
          if (parseInt(result[0].sw) != 0) {
            config = {idpersona : __idpersona};
            var w = Ext.create(
                'MyDesktop.app.views.documento.NotasDePedidoUsuario', config);
            if (w.isVisible() == true) {
              mensaje.getEl().unmask();
            }
          } else {
            mensaje.getEl().unmask();
          }

        },
        failure : function(conn, response, options, eOpts) {}
      });
    }
  }

}); /* End Objeto */

function ActualizarContratoDetalleNota(_idcontrato, _store) {

  console.log("Llego a ActualizarContratoDetalle!!!!" + _idcontrato.toString());

  var store = _store; // Ext.getCmp('dgvDetalleContrato').getStore();
  var idproductos = '';
  var cantidades = '';
  var medidas1 = '';
  var medidas2 = '';
  var totales = '';
  var idmateriales = '';
  var bobinas = '';
  var operarios = '';
  var obseritem = '';
  var textoitem = '';

  //{name : 'obser'},
  //{name : 'textodet'}

  store.each(function(rec) {
    idproductos = idproductos + ',' + rec.get('idprod').toString();
    cantidades = cantidades + ',' + rec.get('cantidad').toString();
    medidas1 = medidas1 + ',' + rec.get('medida1').toString();
    medidas2 = medidas2 + ',' + rec.get('medida2').toString();
    totales = totales + ',' + rec.get('total').toString();
    idmateriales = idmateriales + ',' + rec.get('idmat').toString();
    bobinas = bobinas + ',0';
    operarios = operarios + ',0';
    obseritem =
        obseritem + ',' + (rec.get('obser') == '' ? '0' : rec.get('obser'));
    textoitem = textoitem + ',' +
                (rec.get('textodet') == '' ? '0' : rec.get('textodet'));
  });

  idproductos = '{' + idproductos.substring(1, idproductos.length) + '}';
  cantidades = '{' + cantidades.substring(1, cantidades.length) + '}';
  medidas1 = '{' + medidas1.substring(1, medidas1.length) + '}';
  medidas2 = '{' + medidas2.substring(1, medidas2.length) + '}';
  totales = '{' + totales.substring(1, totales.length) + '}';
  idmateriales = '{' + idmateriales.substring(1, idmateriales.length) + '}';
  bobinas = '{' + bobinas.substring(1, bobinas.length) + '}';
  operarios = '{' + operarios.substring(1, operarios.length) + '}';
  obseritem = '{' + obseritem.substring(1, obseritem.length) + '}';
  textoitem = '{' + textoitem.substring(1, textoitem.length) + '}';
  fx_ContratoGuardarDetalleRegNota(_idcontrato, idproductos, cantidades, medidas1,
                               medidas2, totales, idmateriales, bobinas,
                               operarios, obseritem, textoitem);
}
function fx_ContratoGuardarDetalleRegNota(
    _idcontrato, _productos, _cantidades, _medidas1, _medidas2, _precios,
    _idmateriales, _bobinas, _operarios, _observaciones, _textoitems) {
  console.log("Llego a fx_ContratoGuardarDetalle!!!!" + _idcontrato.toString());
  Ext.Ajax.request({
    url : 'index.php/contratos/actualizardetalle',
    params : {
      pid : 0,
      pcontrato : _idcontrato,
      pproductos : _productos,
      pcantidades : _cantidades,
      pmedidas1 : _medidas1,
      pmedidas2 : _medidas2,
      pprecios : _precios,
      pmateriales : _idmateriales,
      pbobinas : _bobinas,
      poperarios : _operarios,
      observaciones : _observaciones,
      textoitems : _textoitems

    },
    success : function(conn, response, options, eOpts) {
      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
      if (result.success) {
        Ext.each(result.items, function(item) {
          console.log("Llego a crear el detalle " + item.ERROR.toString());
          if (parseInt(item.ERROR) > 0) {
            Ext.getCmp('dgvContratosNota').getStore().reload();
            Ext.getCmp('wcontratoeditarnota').close();
            return true;
          }

        });
      } else {
        MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
        return false;
      }

    },
    failure : function(conn, response, options, eOpts) {}
  });
}
