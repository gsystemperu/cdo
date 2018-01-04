ix = 0;
ult_id = 0;
Ext.define("MyDesktop.app.views.ContratoModificarHonorario", {
  extend : 'Ext.window.Window',
  alias : 'widget.contratomodificarhonorario',
  width : 650,
  height : 710,
  modal : true,
  title : '.:.   Modificar Honorario  .:.',
  requires : [
    'MyDesktop.app.stores.Trabajadores',
    'MyDesktop.app.stores.Contratos',
    'MyDesktop.app.stores.Productos',
    'MyDesktop.app.stores.Generos'
  ],
  id : 'contratomodificarhonorario',
  bodyPadding : 5,
  config : {num : 0},
  autoShow : false,
  initComponent : function() {

    me = this;

    storeproductos = Ext.create('MyDesktop.app.stores.Productos');
    storemedico = Ext.create('MyDesktop.app.stores.Medicos');
    storevendedor = Ext.create('MyDesktop.app.stores.TrabajadoresTipo');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');
    storemateriales = Ext.create('MyDesktop.app.stores.Materiales');
    storedetallecontrato = Ext.create('MyDesktop.app.stores.DetalleContrato');
    storeformapago = Ext.create('MyDesktop.app.stores.FormaPago');
    storeTipoMoneda = Ext.create('MyDesktop.app.stores.TipoMoneda');
    _mysede = Ext.util.Cookies.get('sede');

    storevendedor = Ext.create('MyDesktop.app.stores.Medicos');
    storemedico.load({
      params:{
          ptipomedico:1,
          ptitulo : 'NIGUNO'
      }
    });

    storevendedor.load({
      params:{
          ptipomedico:3,
          ptitulo : 'NIGUNO'
      }
    });
        storeproveedores = Ext.create('MyDesktop.app.stores.Proveedores');
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
                      id : 'rbB',
                      checked : false,
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
                      checked : false,
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
                      boxLabel : 'NOTA',
                      name : 'rbdoc',
                      value : 'NP',
                      id : 'rbNp',
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
                      boxLabel : 'HONORARIOS',
                      name : 'rbdoc',
                      value : 'RH',
                      id : 'rbRh',
                      checked : false,
                        hidden : false,
                      listeners : {
                        change : function(cb, nv, ov) {
                          if (nv == true) {
                            Ext.getCmp('txtRetension').setVisible(true);
                            Ext.getCmp('txtIgv').setVisible(false);
                          }
                        }
                      }
                    },
                  ],
                },
                {
                  xtype : 'combobox',
                  fieldLabel : 'Sede',
                  labelAlign : 'right',
                  padding : '0 0 5 0',
                  flex : 1,
                  id : 'cboTienda',
                  store : storetiendas,
                  queryMode : 'local',
                  displayField : 'descrip',
                  name : 'idtiendas',
                  valueField : 'id',
                  editable : false,
                  emptyText : '----- Seleccionar la Sede ------',
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
                  name : 'idformapago',
                  padding : 2,
                  id : 'cboFormaPago',
                  store : storeformapago,
                  queryMode : 'local',
                  displayField : '_descripcion',
                  valueField : '_idfpag',
                  editable : false,
                  emptyText : '----- SELECCIONAR FORMA PAGO ------'
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
                  editable : false,
                  emptyText : '----- SELECCIONAR TIPO MONEDA ------'
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
                    {xtype : 'hiddenfield', id : 'txtIdContrato'},
                    {xtype : 'hiddenfield', id : 'txtIdPersona'},
                    {
                      xtype : 'textfield',
                      fieldLabel : 'Nombres',
                      name : 'cliente',
                      id : 'txtDatosCliente',
                      flex : 1,
                      fieldStyle : 'text-transform:uppercase',
                      labelWidth : 95,
                      labelAlign : 'right',
                      emptyText : '--- Seleccionar el Cliente ---'

                    },
                    {xtype : 'button', iconCls : 'x-ico-lupa'}

                  ]
                },
                {
                  xtype : 'container',
                  layout : 'vbox',
                  items : [
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Medico',
                      labelWidth : 95,
                      name : 'medico',
                      id : 'cboMedicoEdit',
                      margin : '0 0 5 6',
                      store : storemedico,
                      queryMode : 'local',
                      valueField : 'id',
                      displayField : 'ncompleto',
                      editable : false,
                      labelAlign : 'right',
                      emptyText : '--- Seleccionar el Medico ---',
                      anchor : '100%'

                    },
                    {
                      xtype : 'combobox',
                      fieldLabel : 'Medico Cirujano',
                      labelAlign : 'right',
                      id : 'cboMedCirujano',
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
                      fieldLabel : 'Vendedor',
                      labelAlign : 'right',
                      id : 'cboVendedor',
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
                      id : 'cboProveedor',
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
                    }
                  ]
                }

              ] // fin fieldset

            },
            {
              xtype : 'fieldset',
              columnWidth : 0.1,
              title : 'Fechas ',
              defaultType : 'textfield',
              hidden : true,
              items : [
                {
                  xtype : 'container',
                  layout : 'hbox',
                  columnWidth : 0.5,
                  margin : '0 0 5 6',
                  items : [
                    {
                      xtype : 'datefield',
                      width : 170,
                      fieldLabel : 'Entrega',
                      name : 'dfEntrega',
                      id : 'dfEntrega',
                      labelWidth : 60,
                      labelAlign : 'right',
                      hidden : true
                    },
                    /*{
                        xtype: 'datefield',
                        width : 170,
                        fieldLabel: 'Termina',
                        name: 'dfTermina',
                        id  : 'dfTermina',
                        labelWidth: 60,
                        labelAlign:'right'

                    },
                    {
                        xtype: 'timefield',
                        id  : 'horaTermina',
                        fieldLabel: 'Hora Termino',
                        minValue: '6:00 AM',
                        maxValue: '12:00 PM',
                        increment: 1,
                        width : 190,
                        labelAlign:'right'
                    }*/

                  ]
                }
              ]

            },
            {
              xtype : 'fieldset',
              columnWidth : 0.1,
              title : 'Detalle',
              defaultType : 'textfield',
              items : [
                {
                  xtype : 'container',
                  layout : 'fit',
                  frame : true,
                  border : false,
                  items : [
                    {
                      xtype : 'container',
                      layout : 'anchor',
                      columnWidth : 0.5,
                      items : [
                        {
                          xtype : 'combobox',
                          fieldLabel : 'Concepto',
                          id : 'cboProducto',
                          store : storeproductos,
                          labelAlign : 'right',
                          queryMode : 'remote',
                          valueField : 'id',
                          displayField : 'producto',
                          anchor : '100%',
                          editable : false,
                          //forceSelection : true,
                          emptyText : '  Seleccionar el Producto  ',
                          listeners : {
                            select : function(combo, record, index) {
                              // Ext.getCmp('txtPrecioventa').focus(false, 200);
                              Ext.getCmp('txtPrecioventa').setValue('');
                              Ext.getCmp('txtCantidad').setValue('');

                            }
                          }

                        },
                        {

                          xtype : 'container',
                          layout : 'hbox',
                          columnWidth : 0.5,
                          padding : '0 0 5 0',
                          items : [
                            {
                              xtype : 'numberfield',
                              id : 'txtPrecioventa',
                              mane : 'precioventa',
                              fieldLabel : 'Precio Venta',
                              fieldStyle : 'text-align:right',
                              decimalPrecision : 2,
                              step : 0.01,
                              decimalSeparator : '.',
                              currencySymbol : 'S/. ',
                              width : 200,
                              labelAlign : 'right'
                            },
                            {
                              xtype : 'numberfield',
                              fieldLabel : 'Cantidad',
                              id : 'txtCantidad',
                              fieldStyle : 'text-align:center;size:15px',
                              maxValue : 50,
                              minValue : 0,
                              flex : 0.5,
                              width : 10,
                              labelWidth : 200,
                              labelAlign : 'right'
                            },

                          ]
                        },
                        {
                          xtype : 'textfield',
                          id : 'txtObserItem',
                          anchor : '100%',
                          fieldLabel : 'Observacion',
                          labelAlign : 'right',
                          listeners : {
                            change : function(field, newValue) {
                              field.setValue(newValue.toUpperCase());
                            }
                          }
                        },
                      ]
                    }
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
                        {
                          text : 'Producto',
                          dataIndex : 'producto',
                          width : 410
                        },
                        {
                          text : 'Cantidad',
                          dataIndex : 'cantidad',
                          width : 55,
                          align : 'center'
                        },
                        {
                          xtype : 'numbercolumn',
                          text : 'Total',
                          dataIndex : 'total',
                          align : 'right',
                          width : 80,
                          renderer : Ext.util.Format.numberRenderer('0.000')
                        },
                        {
                          text : 'operario',
                          dataIndex : 'idope',
                          width : 200,
                          hidden : true
                        },
                        {
                          xtype : 'actioncolumn',
                          width : 40,
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
                          Ext.getCmp('cboProducto')
                              .setValue(record.get('idprod').toString());
                          Ext.getCmp('txtPrecioventa')
                              .setValue(record.get('total') /
                                        record.get('cantidad'));
                          Ext.getCmp('txtCantidad')
                              .setValue(record.get('cantidad'));
                          Ext.getCmp('txtObserItem')
                              .setValue(record.get('obser'));

                        }
                      }

                    }
                  ],
                  tbar : [
                    {
                      xtype : 'button',
                      text : 'Ingresar',
                      id : 'btnIngresar',
                      iconCls : 'add',
                      handler : function() { me.setInsertarItem(); }
                    },
                    {
                      xtype : 'button',
                      text : 'Actualizar',
                      id : 'btnModificar',
                      iconCls : 'boton-edit',
                      handler : function() {
                        var grid = Ext.getCmp('dgvDetalleContrato');
                        var x = grid.getSelectionModel().getSelection()[0].get(
                            'id');
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
                          Ext.Msg.alert("Aviso",
                                        "Item de detalle actualizado !!");
                        }

                      }
                    },
                    {
                      xtype :'textfield',
                      fieldLabel : '<b>Nota Pedido</b>',
                      id : 'txtNumeroPedido',
                      readOnly:true,
                      labelAlign:'right',



                    }

                  ]
                }
              ]

            }, // fin fieldset Detalle
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
                      hidden : true,
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
                      hidden : true,
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
                      hidden : false,
                      items : [
                        {
                          xtype : 'container',
                          layout : 'hbox',
                          hidden:false,
                          items : [
                            {
                              xtype : 'label',
                              text : 'Numero Recibo :',
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
                          xtype : 'numberfield',
                          id : 'txtPagoAcuenta3',
                          fieldLabel : 'Pago acuenta',
                          flex : 2,
                          decimalPrecision : 3,
                          minValue : 0,
                          step : 0.01,
                          decimalSeparator : '.',
                          fieldStyle : 'text-align:right',
                          hidden : true
                        },
                        {
                          xtype : 'datefield',
                          id : 'dtPagoAcuenta3',
                          flex : 1,
                          hidden : true
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
              border : false,
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
                  id : 'btnGuardar',
                  handler : function() {
                    me.ActualizarContrato(0);
                    me.close();

                  }
                },
                {
                  xytpe : 'button',
                  text : 'Guardar y Pagar',
                  scale : 'medium',
                  iconCls : 'boton-save ',
                  hidden : true,
                  handler : function() {
                    me.ActualizarContrato(1);
                    me.close();

                  }
                }

              ]

            }
          ]

        },

      ]
    });
    me.callParent(arguments);
    me.setCargarDatosDeProforma(me.getNum());
    Ext.getCmp('txtRetension').on('keypress', me.getCalcularRetension, this);

  },
  getCalcularRetension : function(obj, e, eOpts) {
    if (e.getKey() == e.ENTER) {
      var _subtotal = Ext.getCmp('txtSubtotal').getValue();
      var _retension = obj.getValue();
      var _total = _subtotal - _retension;
      Ext.getCmp('txtTotal').setValue(_total);
    }
  },
  setCargarDatosDeProforma : function(id) {
    Ext.Ajax.request({
      url : 'index.php/contratos/buscarcontratocab',
      params : {pidcontrato : id},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.each(result.items, function(item) {

          Ext.getCmp('dfEntrega').setValue(item.fechaemi);
          Ext.getCmp('txtIdPersona').setValue(item.idper);
          Ext.getCmp('txtDatosCliente').setValue(item.pers);
          Ext.getCmp('txtSubtotal').setValue(item.subtotal);
          Ext.getCmp('txtIgv').setValue(item.igv);
          if (item.perdise != null) {
            Ext.getCmp('cboMedicoEdit').setValue(item.perdise.toString());
          }
          Ext.getCmp('cboTienda').setValue(item.tienda.toString());
          Ext.getCmp('txtTotal').setValue(item.total);
          Ext.getCmp('txtIdContrato').setValue(item.id);
          Ext.getCmp('txtRetension').setValue(item.retension);
          Ext.getCmp('cboFormaPago').setValue(item.idformapago.toString());

          Ext.getCmp('txtPagoAcuenta1').setValue(item.pagacuenta1);
          Ext.getCmp('dtPagoAcuenta1').setValue(item.fpagacuenta1);
          Ext.getCmp('txtPagoAcuenta2').setValue(item.pagacuenta2);
          Ext.getCmp('dtPagoAcuenta2').setValue(item.fpagacuenta2);
          Ext.getCmp('txtPagoAcuenta3').setValue(item.pagacuenta3);
          Ext.getCmp('dtPagoAcuenta3').setValue(item.fpagacuenta3);
          Ext.getCmp('cboTipoMoneda').setValue(item.tipmoneda.toString());

          Ext.getCmp('txtNumeroPedido').setValue(item.notapedido);
          Ext.getCmp('txtNumeroReciboHonorario').setValue(item.recibo_num);
          Ext.getCmp('txtSerieReciboHonorario').setValue(item.recibo_doc);

          if (item.tipdoc == 'B') {
            Ext.getCmp('rbB').setValue(true);
          } else if (item.tipdoc == 'F') {
            Ext.getCmp('rbF').setValue(true);
          } else if (item.tipdoc == 'NP') {
            Ext.getCmp('rbNp').setValue(true);
          } else {
            Ext.getCmp('rbRh').setValue(true);
          }

          if (parseFloat(item.igv) != 0) {
            Ext.getCmp('ckbAplicarIgv').setRawValue(true);
            Ext.getCmp('ckbAplicarIgv').setValue(true);

          } else {
            Ext.getCmp('ckbAplicarIgv').setRawValue(false);
            Ext.getCmp('ckbAplicarIgv').setValue(false);
          }

        });
        var grid = Ext.getCmp('dgvDetalleContrato');
        var store = Ext.getCmp('dgvDetalleContrato').getStore();
        grid.getEl().mask('Cargando la informacion!!!');
        Ext.Ajax.request({
          url : 'index.php/contratos/buscarcontratodet',
          params : {pidcontrato : id},
          success : function(conn, response, options, eOpts) {
            var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
            Ext.each(result.items, function(item) {
              store.add({
                id : ix,
                idprod : parseInt(item.idpro),
                producto : item.idproducto,
                medida1 : 0, // item.medida1,
                medida2 : 0, // item.medida2,
                cantidad : item.cant,
                total : item.total,
                idmat : 0,    // item.idmate,
                material : 0, // item.idmaterial,
                bobina : '',  // item.bobina,
                idope : 0,    // item.idope,
                obser : item.observacion,
                textodet : '' // item.textoitem

              });
              ix++;
            });
            store.sync();
            grid.getEl().unmask();
            Ext.getCmp('contratomodificarhonorario').getCalcularContrato();
          }
        });
      }
    });

  },
  setInsertarItem : function() {
    /* if (this.getCamposVaciosPanel())
     {
         Ext.Msg.alert("Aviso","Ingrese los campos!");return false;
     }*/
    var store = Ext.getCmp('dgvDetalleContrato').getStore();
    var idprod = Ext.getCmp('cboProducto').getValue();
    // var r = Ext.getCmp('cboProducto').getStore().find('id', idprod);
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
      bobina : '',
      idope : 0,
      obser : obser,
      textodet : textodet
    });
    store.sync();
    this.getCalcularContrato();
    this.getLimpiarPanel();
    Ext.getCmp('txtPrecioventa').focus('', 200);

  },
  getLimpiarPanel : function() {
    Ext.getCmp('txtPrecioventa').setValue('');
    Ext.getCmp('txtCantidad').setValue('');
    Ext.getCmp('txtAncho').setValue('');
    Ext.getCmp('txtLargo').setValue('');
    Ext.getCmp('txtObserItem').setValue('');
    Ext.getCmp('txtTextoItem').setValue('');
    Ext.getCmp('cboProducto').setValue('');
    Ext.getCmp('cboMaterial').setValue('');
  },
  getCalcularContrato : function() {

    var store = Ext.getCmp('dgvDetalleContrato').getStore();
    var r = Ext.getCmp('ckbAplicarIgv').getValue();
    var total = 0.0;
    var igv = 0.0;
    var subtotal = 0.0;

    store.each(function(record) {
      subtotal = parseFloat(subtotal) + parseFloat(record.get('total'));
    });

    /*if (r == true) {
      total = subtotal + (subtotal * 0.18);
      igv = (subtotal * 0.18);
    } else {
      total = subtotal;
    }*/

    var retension = Ext.getCmp('txtRetension').getValue();
    if (parseFloat(retension) != 0) {
      total = subtotal - retension;
    }

    Ext.getCmp('txtSubtotal').setValue(subtotal / 1.18);
    Ext.getCmp('txtIgv').setValue(subtotal - (subtotal / 1.18));
    Ext.getCmp('txtRetension').setValue(0);
    Ext.getCmp('txtTotal').setValue(subtotal);

  },
  ActualizarContrato : function(btn) {
    var x = 0;
    var __tipoDoc = '';
    if (Ext.getCmp('rbB').getValue() == true) {
      __tipoDoc = 'B';
    } else if (Ext.getCmp('rbF').getValue() == true) {
      __tipoDoc = 'F';
    } else if (Ext.getCmp('rbNp').getValue() == true) {
      __tipoDoc = 'NP';
    } else {
      __tipoDoc = 'RH';
    }

    var store = Ext.getCmp('dgvDetalleContrato').getStore();
    Ext.Ajax.request({
      url : 'index.php/contratos/actualizar',
      params : {
        pid : Ext.getCmp('txtIdContrato').getValue(),
        pfcontrato : new Date(),
        ppersona : Ext.getCmp('txtDatosCliente').getValue(),
        pfentrega : new Date(),
        psubtotal : Ext.getCmp('txtSubtotal').getValue(),
        pigvtot : Ext.getCmp('txtIgv').getValue(),
        ptotal : Ext.getCmp('txtTotal').getValue(),
        pacuenta : 0,
        piddise : Ext.getCmp('cboMedicoEdit').getValue(),
        pidvende : 0,
        pidtienda : Ext.getCmp('cboTienda').getValue(),
        pusuario :  Ext.util.Cookies.get('idusuario'),
        ppagatodo : btn,
        phorafinal : "",
        ptipodoc : __tipoDoc,
        pidper : Ext.getCmp('txtIdPersona').getValue(),
        pretension : Ext.getCmp('txtRetension').getValue(),
        pidnotapedido :
            (__tipoDoc == 'RH' || __tipoDoc == 'NP' ? 0 : __idnotapedido),
        pidformapago : Ext.getCmp('cboFormaPago').getValue(),
        ppagoacuenta1 : Ext.getCmp('txtPagoAcuenta1').getValue(),
        ppagoacuentafecha1 : Ext.getCmp('dtPagoAcuenta1').getValue(),
        ppagoacuenta2 : Ext.getCmp('txtPagoAcuenta2').getValue(),
        ppagoacuentafecha2 : Ext.getCmp('dtPagoAcuenta2').getValue(),
        ppagoacuenta3 : Ext.getCmp('txtPagoAcuenta3').getValue(),
        ppagoacuentafecha3 : Ext.getCmp('dtPagoAcuenta3').getValue(),
        ptipomoneda : Ext.getCmp('cboTipoMoneda').getValue()
      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        if (result.success) {
          Ext.each(result.items, function(item) {
            if (item.ERROR < 0) {
              Ext.Msg.alert('Error',
                            "Error en Sistema ! Comunicarse con Sistemas");
              return false;
            }
            ActualizarContratoDetalleModificarHonorario(item.ERROR, store);
          });
        } else {
          MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
          return false;
        }

      },
      failure : function(conn, response, options, eOpts) {}
    });

  }
});
function ActualizarContratoDetalleModificarHonorario(_idcontrato, _store) {

  var store = _store; // Ext.getCmp('dgvDetalleContrato').getStore();
  var idproductos = '';
  var cantidades = '';
  var medidas1 = '';
  var medidas2 = '';
  var totales = '';
  var idmateriales = '';
  var bobina = '';
  var operario = '';
  var obseritem = '';
  var textoitem = '';

  store.each(function(rec) {
    idproductos = idproductos + ',' + rec.get('idprod').toString();
    cantidades = cantidades + ',' + rec.get('cantidad').toString();
    medidas1 = medidas1 + ',' + rec.get('medida1').toString();
    medidas2 = medidas2 + ',' + rec.get('medida2').toString();
    totales = totales + ',' + rec.get('total').toString();
    idmateriales = idmateriales + ',' + rec.get('idmat').toString();
    textoitem = textoitem + ',' +
                (rec.get('textodet') == '' ? '0' : rec.get('textodet'));
    obseritem = obseritem + ',' +
              (rec.get('obser')==''?'0': rec.get('obser'));

    if (rec.get('bobina') != '')
      bobina = bobina + ',' + rec.get('bobina');
    else
      bobina = bobina + ',0';

    if (rec.get('idope') != null)
      operario = operario + ',' + rec.get('idope');
    else
      operario = operario + ',0';

  });

  idproductos = '{' + idproductos.substring(1, idproductos.length) + '}';
  cantidades = '{' + cantidades.substring(1, cantidades.length) + '}';
  medidas1 = '{' + medidas1.substring(1, medidas1.length) + '}';
  medidas2 = '{' + medidas2.substring(1, medidas2.length) + '}';
  totales = '{' + totales.substring(1, totales.length) + '}';
  idmateriales = '{' + idmateriales.substring(1, idmateriales.length) + '}';
  bobina = '{' + bobina.substring(1, bobina.length) + '}';
  operario = '{' + operario.substring(1, operario.length) + '}';
  obseritem = '{' + obseritem.substring(1, obseritem.length) + '}';
  textoitem = '{' + textoitem.substring(1, textoitem.length) + '}';

  fx_ContratoGuardarDetalleModificarHonorario(_idcontrato, idproductos, cantidades,
                                     medidas1, medidas2, totales, idmateriales,
                                     bobina, operario, obseritem, textoitem);
}
function fx_ContratoGuardarDetalleModificarHonorario(
    _idcontrato, _productos, _cantidades, _medidas1, _medidas2, _precios,
    _idmateriales, _bobinas, _operarios, _observaciones, _textoitems) {
  Ext.Ajax.request({
    url : 'index.php/contratos/actualizardetalle',
    params : {
      pid : _idcontrato,
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
          if (item.ERROR > 0) {
            var grid = Ext.getCmp('dgvContratoshonorarios');
            var rec = grid.getSelectionModel().getSelection()[0];
            var indice = rec.index;
            Ext.getCmp('dgvContratoshonorarios')
                .getStore()
                .load(function(records, operation, success) {
                  Ext.getCmp('dgvContratoshonorarios')
                      .getSelectionModel()
                      .select(indice, true);
                });
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
