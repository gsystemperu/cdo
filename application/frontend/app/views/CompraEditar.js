ix = 0;
ult_id = 0;
Ext.define('MyDesktop.app.views.CompraEditar', {
  extend : 'Ext.window.Window',
  alias : 'widget.wcompraeditar',
  id : 'wcompraeditar',
  width : 600,
  height : 680,
  modal : true,
  floating : true,
  autoShow : true,
  title : '::: - Registro de Compras - :::',
  bodyPadding : 5,
  requires : [
    'MyDesktop.app.stores.Productos',
    'MyDesktop.app.stores.Proveedores',
    'MyDesktop.app.stores.Generos',
    'MyDesktop.app.stores.Compras',
    'MyDesktop.app.views.ProveedorEditar',
    'MyDesktop.app.stores.Mantenimientos'

  ],
  config : {tcDolares : 0},
  initComponent : function() {
    var ix = 0;
    var ult_id = 0;
    var me = this;
    storeproductos = Ext.create('MyDesktop.app.stores.Productos');
    storeproveedores = Ext.create('MyDesktop.app.stores.Proveedores');
    storetipomoneda = Ext.create('MyDesktop.app.stores.TipoMonedas');
    storetipodoc = Ext.create('MyDesktop.app.stores.TipoDoc');
    storedetallecompra = Ext.create('MyDesktop.app.stores.DetalleCompra');
    storeTipoMoneda = Ext.create('MyDesktop.app.stores.TipoMoneda');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');
    _mysede = Ext.util.Cookies.get('sede');

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
          items : [
            {
              xtype : 'fieldset',
              title : 'Sede',
              defaultType : 'textfield',
              layout : 'fit',
              items : [
                {
                  xtype:'combo',
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

                }
              ]
            },
            {
              xtype : 'fieldset',
              title : 'Datos del Proveedor',
              defaultType : 'textfield',
              layout : 'fit',
              items : [
                {
                  xtype : 'container',
                  layout : 'hbox',
                  margin : '0 0 5 6',
                  items : [
                    {
                      xtype : 'combobox',
                      id : 'cboProveedor',
                      store : storeproveedores,
                      queryMode : 'local',
                      valueField : '_idprov',
                      displayField : '_completo',
                      flex : 1,
                      editable : false,
                      triggerAction : 'all',
                      forceSelection : true,
                      emptyText : '--- Seleccionar el Proveedor ---'

                    },
                    {
                      xtype : 'button',
                      iconCls : 'add',
                      id : 'btnProveedorNuevo',
                      handler : function() {
                        var frm =
                            Ext.create('MyDesktop.app.views.ProveedorEditar');
                      }
                    }

                  ]
                }

              ]

            },
            {
              xtype : 'fieldset',
              columnWidth : 0.1,
              title : 'Datos Generales ',
              items : [

                {
                  xtype : 'container',
                  layout : 'hbox',
                  columnWidth : 0.2,
                  /* defaults:{
                     labelWidth : 100
                   },*/
                  margin : '0 0 5 6',
                  items : [
                    {
                      xtype : 'combo',
                      fieldLabel : 'Tipo',
                      id : 'cboTipoDoc',
                      store : storetipodoc,
                      query : 'local',
                      valueField : 'id',
                      displayField : 'descripcion',
                      width : 200,
                      labelWidth : 50,
                      editable : false,
                      value : 'F',
                      listeners : {
                        select : function(combo, records, eOpts) {
                          me.getCalcularContrato();
                        }
                      }
                    },
                    {
                      xtype : 'datefield',
                      flex : 1,
                      fieldLabel : 'Fecha',
                      labelAlign : 'right',
                      name : 'dfCompra',
                      id : 'dfCompra',
                      value : new Date(),
                      labelWidth : 45,

                    },
                    {
                      xtype : 'textfield',
                      flex : 1,
                      fieldLabel : 'Nro.Documento',
                      fieldStyle : 'text-align: right;',
                      id : 'txtNumeroDocumento',
                      labelAlign : 'right'

                    }

                  ]
                },
                {
                  xtype : 'container',
                  border : false,
                  flex : 1,
                  layout : 'hbox',
                  padding : '0 0 5 0',
                  items : [
                    {
                      xtype : 'checkbox',
                      fieldLabel : 'Moneda en <b>DOLARES </b>',
                      labelWidth : 150,
                      id : 'chkIngresoDolares'
                    },
                    {
                      xtype : 'numberfield',
                      id : 'txtTipoCambioDolares',
                      fieldLabel : 'Tipo de Cambio',
                      labelAlign : 'right',
                      fieldStyle : 'text-align:right',
                      decimalPrecision : 2,
                      step : 0.01,
                      decimalSeparator : '.',
                      width : 200,
                      disabled : true
                    }
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
                      layout : 'vbox',
                      margin : '0 0 10 6',
                      items : [
                        {

                          xtype : 'combobox',
                          fieldLabel : 'Producto',
                          id : 'cboProducto',
                          store : storeproductos,
                          valueField : 'id',
                          displayField : 'producto',
                          flex : 1,
                          width : 540,
                          editable : true,
                          //forceSelection : true,
                          queryMode : 'remote',
                          //typeAhead : true,
                          minChars : 2,
                          hideTrigger : true,
                          emptyText : '--- Seleccionar el Producto ---',
                          listeners : {
                            select : function(combo, record, index) {
                              Ext.getCmp('txtPreciocompra').setValue(record[0].get('precioventa'));
                              Ext.getCmp('txtCantidad').setValue('1');
                            },
                            change : function(field, newValue, oldValue) {
                              var _sede = Ext.getCmp('cboTienda').getValue();
                              if(_sede == null){Ext.Msg.alert("Aviso","Seleccionar la sede de los productos");return false;}
                              var store = field.getStore();
                              store.clearFilter();
                              store.filter({
                                property : 'producto',
                                anyMatch : false,
                                value : field.getValue()
                              });
                            },
                            scope : this
                          }

                        },
                        {
                          xtype : 'container',
                          layout : 'vbox',
                          flex : 1,
                          items : [
                            {

                              xtype : 'container',
                              layout : 'hbox',
                              border : false,
                              padding : '0 0 5 0',
                              items : [
                                {
                                  xtype : 'numberfield',
                                  id : 'txtPreciocompra',
                                  mane : 'preciocompra',
                                  fieldLabel : 'Precio Compra',
                                  fieldStyle : 'text-align:right',
                                  decimalPrecision : 2,
                                  step : 0.01,
                                  decimalSeparator : '.',
                                  width : 200
                                },
                                {
                                  xtype : 'numberfield',
                                  fieldLabel : 'Cantidad',
                                  id : 'txtCantidad',
                                  fieldStyle : 'text-align:center;size:15px',
                                  maxValue : 50,
                                  minValue : 0,
                                  flex : 0.5,
                                  value : 0,
                                  width : 180,
                                  labelAlign : 'right'
                                }
                              ]
                            }
                          ]
                        }
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
                      id : 'dgvDetalleCompra',
                      store : storedetallecompra,
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
                          width : 330
                        },
                        {
                          text : 'Precio',
                          dataIndex : 'precio',
                          width : 55,
                          align : 'center'
                        },
                        {
                          text : 'Cantidad',
                          dataIndex : 'cantidad',
                          width : 55,
                          align : 'center'
                        },
                        {
                          text : 'Total',
                          dataIndex : 'total',
                          align : 'right',
                          width : 60
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
                                    Ext.getCmp('dgvDetalleCompra').getStore();
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
                          var x = record.get('producto');
                          Ext.getCmp('cboProducto').setValue(x);
                          Ext.getCmp('txtPreciocompra')
                              .setValue(record.get('total') /
                                        record.get('cantidad'));
                          Ext.getCmp('txtCantidad')
                              .setValue(record.get('cantidad'));
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
                      handler : function() {
                        me.setInsertarItem(storedetallecompra);
                      }

                    },
                    {
                      xtype : 'button',
                      text : 'Modificar',
                      id : 'btnModificar',
                      iconCls : 'boton-edit',
                      handler : function() {
                        var grid = Ext.getCmp('dgvDetalleCompra');
                        var x = grid.getSelectionModel().getSelection()[0].get(
                            'id');
                        var store = Ext.getCmp('dgvDetalleCompra').getStore();
                        var record = store.findRecord("id", x);

                        if (record) {
                          var precio = Ext.getCmp('txtPreciocompra').getValue();
                          var cant = Ext.getCmp('txtCantidad').getValue();
                          var codbo = 0;
                          var mlineal = 0;
                          var total = precio * cant;

                          record.set('precio', precio);
                          record.set('cantidad', cant);
                          record.set('total', total);
                          record.set('codbobina', codbo);
                          record.set('mlineal', mlineal);
                          record.endEdit();
                          record.commit();
                          me.getCalcularContrato();
                          me.getLimpiarPanel();
                        }
                      }
                    }

                  ]
                }
              ]

            }, // fin fieldset Detalle
            {
              xtype : 'panel',
              border : false,
              // frame : true,
              layout : 'hbox',

              items : [

                {
                  xtype : 'panel',
                  border : false,
                  frame : true,
                  flex : 1,
                  padding : '5 0 0 300',
                  items : [
                    {
                      xtype : 'numberfield',
                      id : 'txtSubtotal',
                      name : 'subtotal',
                      fieldLabel : 'Sub Total',
                      decimalPrecision : 3,
                      // maxValue: 9999,
                      minValue : 0,
                      step : 0.01,
                      decimalSeparator : '.',
                      readOnly : true,
                      fieldStyle : 'text-align: right;',

                    },
                    {
                      xtype : 'numberfield',
                      fieldLabel : 'Igv',
                      id : 'txtIgv',
                      name : 'igv',
                      fieldStyle : 'text-align: right;',
                      decimalPrecision : 3,
                      minValue : 0,
                      step : 0.01,
                      decimalSeparator : '.',
                      readOnly : true,
                      enableKeyEvents : true,
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
                      fieldStyle : 'text-align: right;'
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
                  xytpe : 'button',
                  text : 'Guardar',
                  scale : 'medium',
                  iconCls : 'boton-save ',
                  handler : function() {
                    me.ActualizarCompra();
                    me.close();

                  }
                }

              ]

            }
          ],
          bbar : [
            '->',
            {
              xtype : 'checkbox',
              id : 'chkIncluirIgv',
              flex : 1,
              labelAlign : 'right',
              fieldLabel : 'Precio include el IGV ?',
              labelWidth : 250,
            }
          ]

        },

      ]
    });

    me.callParent(arguments);
    Ext.getCmp('chkIncluirIgv').on('change', this.getCalcularContrato, this);
    Ext.getCmp('chkIngresoDolares')
        .on('change', this.getActivarTipoCambio, this);
  },
  getActivarTipoCambio : function(e) {
    if (e.getValue() == true) {
      Ext.getCmp('txtTipoCambioDolares').setDisabled(false);
    } else {
      Ext.getCmp('txtTipoCambioDolares').setValue('').setDisabled(true);
    }
  },
  getCalcularContrato : function() {

    var store = Ext.getCmp('dgvDetalleCompra').getStore();
    var r = Ext.getCmp('cboTipoDoc').getValue();
    var inigv = Ext.getCmp('chkIncluirIgv').getValue();
    var tot = 0.0;
    var igv = 0.0;
    var stot = 0.0;
    store.each(function(record) {
      stot = parseFloat(stot) + parseFloat(record.get('total'));
    }, this);

    if (inigv == true) {
      if (r == "F") {
        Ext.getCmp('txtSubtotal').setValue(stot / 1.18);
        Ext.getCmp('txtIgv').setValue(stot - (stot / 1.18));
        Ext.getCmp('txtTotal').setValue(stot);
      } else {
        Ext.getCmp('txtSubtotal').setValue(stot);
        Ext.getCmp('txtIgv').setValue(0);
        Ext.getCmp('txtTotal').setValue(stot);
      }

    } else {
      if (r == "F") {
        tot = stot + (stot * 0.18);
        igv = (stot * 0.18);
      } else {
        tot = stot;
      }
      Ext.getCmp('txtSubtotal').setValue(stot.toFixed(3));
      Ext.getCmp('txtIgv').setValue(igv.toFixed(3));
      var total = (tot + igv);
      Ext.getCmp('txtTotal').setValue(total.toFixed(3));
    }

  },
  getLimpiarPanel : function() {
    Ext.getCmp('txtPreciocompra').setValue('');
    Ext.getCmp('txtCantidad').setValue('');
    // Ext.getCmp('txtCodigoBobina').setValue('');
    // Ext.getCmp('txtMetroLineal').setValue('');

  },
  getCamposVaciosPanel : function() {

    var sw = false;
    if (Ext.getCmp('cboProducto').getValue() == null)
      sw = true;
    if (Ext.getCmp('txtPrecioventa').getValue() == 0 ||
        Ext.getCmp('txtPrecioventa').getValue() == null)
      sw = true;
    if (Ext.getCmp('txtCantidad').getValue() == 0 ||
        Ext.getCmp('txtCantidad').getValue() == null)
      sw = true;
    if (Ext.getCmp('txtAncho').getValue() == 0 ||
        Ext.getCmp('txtAncho').getValue() == null)
      sw = true;
    if (Ext.getCmp('txtLargo').getValue() == 0 ||
        Ext.getCmp('txtLargo').getValue() == null)
      sw = true;

    return sw;
  },
  ActualizarCompra : function() {
    me = this;
    var x = 0;
    Ext.Ajax.request({
      url : 'index.php/compras/actualizar',
      params : {
        pid : 0,
        pidprov : Ext.getCmp('cboProveedor').getValue(),
        pfcompra : Ext.getCmp('dfCompra').getValue(),
        pnumerodoc : Ext.getCmp('txtNumeroDocumento').getValue(),
        pvalorcompra : Ext.getCmp('txtSubtotal').getValue(),
        pvalorigv : Ext.getCmp('txtIgv').getValue(),
        pvalortotal : Ext.getCmp('txtTotal').getValue(),
        ptipodoc : Ext.getCmp('cboTipoDoc').getValue(),
        pusuario :   Ext.util.Cookies.get('idusuario'),
        pincluyeigv : (Ext.getCmp('chkIncluirIgv').getValue() == true ? 1 : 0),
        ptipocambio : (Ext.getCmp('txtTipoCambioDolares').getValue() != ''
                           ? Ext.getCmp('txtTipoCambioDolares').getValue()
                           : 0),
        pidsede:Ext.getCmp('cboTienda').getValue()

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
            me.ActualizarCompraDetalle(item.ERROR, storedetallecompra)
            // Ext.getCmp('dgvContratos').getStore().reload();

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

    var idprod = Ext.getCmp('cboProducto').getValue();
    var producto = Ext.getCmp('cboProducto').getRawValue();
    var cantidad = Ext.getCmp('txtCantidad').getValue();
    var precio = Ext.getCmp('txtPreciocompra').getValue();
    // var codbobina   = Ext.getCmp('txtCodigoBobina').getValue();
    // var metrolineal = Ext.getCmp('txtMetroLineal').getValue();

    ix = ix + 1;

    store.add({
      id : ix,
      idprod : parseInt(idprod),
      producto : producto,
      precio : precio,
      cantidad : cantidad,
      total : (precio * cantidad),
      //  codbobina : (codbobina.length ==0?'0':codbobina),
      //  mlineal  : metrolineal

    });

    this.getLimpiarPanel();
    this.getCalcularContrato();
    // Ext.getCmp('txtPrecioventa').focus('',200);

  },

  ActualizarCompraDetalle : function(idcompra, store) {
    me = this;
    var idproductos = '';
    var cantidades = '';
    var precios = '';
    // var codbobinas   = '';
    var totales = '';
    // var metroslineales = '';

    store.each(function(rec) {
      idproductos = idproductos + ',' + rec.get('idprod').toString();
      cantidades = cantidades + ',' + rec.get('cantidad').toString();
      precios = precios + ',' + rec.get('precio').toString();
      totales = totales + ',' + rec.get('total').toString();

    });

    idproductos = '{' + idproductos.substring(1, idproductos.length) + '}';
    cantidades = '{' + cantidades.substring(1, cantidades.length) + '}';
    precios = '{' + precios.substring(1, precios.length) + '}';
    codbobinas = '{}';
    totales = '{' + totales.substring(1, totales.length) + '}';
    metroslineales = '{}';
    me.fx_ContratoGuardarDetalle(idcompra, idproductos, cantidades, precios,
                                 codbobinas, totales, metroslineales);
  },

  fx_ContratoGuardarDetalle : function(idcompra, idproductos, cantidades,
                                       precios, codbobinas, totales,
                                       metroslineales) {
    Ext.Ajax.request({
      url : 'index.php/compras/actualizardetalle',
      params : {
        pidcompra : idcompra,
        pproductos : idproductos,
        pcantidades : cantidades,
        pcodbobinas : codbobinas,
        pprecios : precios,
        pmlineales : metroslineales
      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        if (result.success) {
          Ext.each(result.items, function(item) {
            if (item.ERROR > 0) {
              /*Ext.getCmp('dgvCompras')
                  .getStore()
                  .load({
                    params : {
                      pdesde : null,
                      phasta : null,
                      pproveedor : null,
                      pnumerodoc : null
                    }
                  });*/
              Ext.getCmp('btnActualizarListaCompra').fireEvent('click');
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

});
