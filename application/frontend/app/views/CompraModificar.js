
ix = 0;
ult_id = 0;

Ext.define('MyDesktop.app.views.CompraModificar', {
  extend : 'Ext.window.Window',
  alias : 'widget.compramodificar',
  width : 580,
  height : 680,
  modal : true,
  title : ':: . Modificar Compra . ::',
  autoShow : true,
  requires : [
    'MyDesktop.app.stores.Productos',
    'MyDesktop.app.stores.Proveedores',
    'MyDesktop.app.stores.Generos',
    'MyDesktop.app.stores.Compras',
    'MyDesktop.app.views.ProveedorEditar'

  ],
  config : {idcompra : 0},
  initComponent : function() {
    me = this;
    storeproductos = Ext.create('MyDesktop.app.stores.Productos');
    storeproveedores = Ext.create('MyDesktop.app.stores.Proveedores');
    storetipomoneda = Ext.create('MyDesktop.app.stores.TipoMonedas');
    storetipodoc = Ext.create('MyDesktop.app.stores.TipoDoc');
    storedetallecompra = Ext.create('MyDesktop.app.stores.DetalleCompra');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');

    Ext.applyIf(this, {
      items : [
        {
          xtype : 'form',
          id : 'frmcompramodificar',

          flex : 1,
          frame : true,
          border : false,
          items : [
            {xtype : 'hiddenfield', name : 'id', id : 'txtIdCompra'},
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
                  //triggerAction : 'all',
                  editable : false,
                  emptyText : '----- SELECCIONAR LA SEDE ------',
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
                      name : '_idprov',
                      valueField : '_idprov',
                      displayField : '_completo',
                      flex : 1,
                      editable : false,
                      triggerAction : 'all',
                      // forceSelection: true,
                      emptyText : '--- Seleccionar el Proveedor ---'

                    },

                  ]
                }

              ] // fin fieldset

            },
            {
              xtype : 'fieldset',
              columnWidth : 0.1,
              title : 'Datos Generales ',
              items : [

                {
                  xtype : 'container',
                  layout : 'hbox',
                  columnWidth : 0.5,
                  margin : '0 0 5 6',
                  items : [
                    {
                      xtype : 'combo',
                      fieldLabel : 'Tipo',
                      id : 'cboTipoDoc',
                      store : storetipodoc,
                      queryMode : 'local',
                      name : 'tipdoc',
                      valueField : 'id',
                      displayField : 'descripcion',
                      width : 150,
                      labelWidth : 50,
                      editable : false,
                      listeners : {
                        select : function(combo, records, eOpts) {
                          // alert(combo.getValue());
                          me.getCalcularContrato(
                              Ext.getCmp('dgvDetalleCompra').getStore());
                        }
                      }
                    },
                    {
                      xtype : 'datefield',
                      name : 'fecha',
                      flex : 1,
                      fieldLabel : 'Fecha',
                      name : 'dfCompra',
                      id : 'dfCompra',
                      minValue : new Date(),
                      value : new Date(),
                      labelWidth : 50,
                      labelAlign : 'right'

                    },
                    {
                      xtype : 'textfield',
                      flex : 1,
                      fieldLabel : 'Nro.Documento',
                      fieldStyle : 'text-align: right;',
                      id : 'txtNumeroDocumento',
                      labelWidth : 100,
                      name : 'numerodocumento'

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
                          width : 520,
                          store : storeproductos,
                          valueField : 'id',
                          displayField : 'producto',
                          flex : 1,
                          editable : false,
                          forceSelection : true,
                          queryMode : 'local',
                          emptyText : '--- Seleccionar el Producto ---',
                          listeners : {
                            select : function(combo, record, index) {
                              Ext.getCmp('txtPreciocompra')
                                  .setValue(record[0].get('precioventa'))
                                  .focus();
                              Ext.getCmp('txtCantidad').setValue('0');
                            },
                            /*change : function(field, newValue, oldValue) {

                              var store = field.getStore();
                              store.clearFilter();
                              store.filter({
                                property : 'producto',
                                anyMatch : false,
                                value : field.getValue()
                              });
                            },
                            scope : this*/
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
                              // flex   : 1,
                              items : [
                                {
                                  xtype : 'numberfield',
                                  id : 'txtPreciocompra',
                                  mane : 'preciocompra',
                                  fieldLabel : 'Precio Compra',
                                  fieldStyle : 'text-align:right',
                                  decimalPrecision : 2,
                                  step : 0.01,
                                  decimalSeparator : '.'
                                },

                              ]
                            },
                            {
                              xtype : 'container',
                              layout : 'hbox',
                              border : false,
                              padding : '0 0 5 0',
                              items : [
                                {
                                  xtype : 'numberfield',
                                  fieldLabel : 'Cantidad',
                                  id : 'txtCantidad',
                                  fieldStyle : 'text-align:center;size:15px',
                                  minValue : 1,
                                  flex : 0.5,
                                  value : 0

                                },

                              ]

                            },

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
                          width : 300
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
                                // store.sync();
                                me.getCalcularContrato(store);
                              }
                            }
                          ]
                        }
                      ],
                      height : 150,
                      listeners : {
                        itemdblclick : function(dv, record, item, index, e) {
                          var x = record.get('idprod');
                          Ext.getCmp('cboProducto').setValue(x.toString());
                          Ext.getCmp('txtPreciocompra')
                              .setValue(record.get('total') /
                                        record.get('cantidad'));
                          Ext.getCmp('txtCantidad')
                              .setValue(record.get('cantidad'));
                          Ext.getCmp('txtPreciocompra').focus();

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
                          var codbo =
                              ''; // Ext.getCmp('txtCodigoBobina').getValue();
                          var total = precio * cant;
                          record.set('precio', total);
                          record.set('cantidad', cant);
                          record.set('total', total);
                          record.set('codbobina', codbo);
                          record.endEdit();
                          record.commit();
                          me.getCalcularContrato(store);
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
              layout : 'hbox',

              items : [

                {
                  xtype : 'panel',
                  border : false,
                  frame : true,
                  flex : 1,
                  padding : '5 0 0 280',
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
                  text : 'Modificar',
                  scale : 'medium',
                  iconCls : 'boton-save ',
                  handler : function() {
                    me.modificarCompra(storedetallecompra);
                    me.close();

                  }
                }

              ]

            }
          ]

        },

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

    });

    this.callParent(arguments);
    me.getDatosDeCompraCab(me.getIdcompra(), me);
    Ext.getCmp('chkIncluirIgv').on('change', me.getCalcularCompra, this);
  },
  getDatosDeCompraCab : function(_idcompra, obj) {
    me = this;
    Ext.Ajax.request({
      url : 'index.php/compras/compracabezera',
      params : {pidcompra : parseInt(_idcompra)},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.each(result.items, function(item) {
          Ext.getCmp('txtIdCompra').setValue(item._idcompra);
          Ext.getCmp('cboProveedor').setValue(item._idprov.toString());
          Ext.getCmp('cboTipoDoc').setValue(item._tipodoc.toString());
          Ext.getCmp('txtNumeroDocumento').setValue(item._numerodoc);
          Ext.getCmp('dfCompra').setValue(item._fechadoc);

          Ext.getCmp('cboTienda').setValue(item._idsede.toString());
          obj.setCargarDatosDeCompra(parseInt(_idcompra));
          if (item._incluyeigv == 1) {
            Ext.getCmp('chkIncluirIgv').setValue(true);
          } else {
            Ext.getCmp('chkIncluirIgv').setValue(false);
          }
          if (item._tipocambio != 0) {
            Ext.getCmp('chkIngresoDolares').setValue(true);
            Ext.getCmp('txtTipoCambioDolares')
                .setValue(item._tipocambio)
                .setDisabled(false);
          } else {
            Ext.getCmp('chkIngresoDolares').setValue(false);
            Ext.getCmp('txtTipoCambioDolares').setValue(0).setDisabled(true);
          }
        });

      }
    });
  },
  getCalcularContrato : function(store) {
    // var store = Ext.getCmp('dgvDetalleCompra').getStore();
    var r = Ext.getCmp('cboTipoDoc').getValue();
    var tot = 0.0;
    var igv = 0.0;
    var stot = 0.0;
    var inigv = Ext.getCmp('chkIncluirIgv').getValue();
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
  setInsertarItem : function() {

    store = Ext.getCmp('dgvDetalleCompra').getStore();

    var idprod = Ext.getCmp('cboProducto').getValue();
    var producto = Ext.getCmp('cboProducto').getRawValue();
    var cantidad = Ext.getCmp('txtCantidad').getValue();
    var precio = Ext.getCmp('txtPreciocompra').getValue();
    var codbobina = '';
    var metrolineal = 0;

    ix = ix + 1;

    store.add({
      id : ix,
      idprod : parseInt(idprod),
      producto : producto,
      precio : precio,
      cantidad : cantidad,
      total : (precio * cantidad),
      codbobina : (codbobina.length == 0 ? '0' : codbobina),
      mlineal : metrolineal

    });

    store.sync();
    // ----this.getLimpiarPanel();
    this.getCalcularCompra();
    //---Ext.getCmp('txtPrecioventa').focus('',200);

  },
  getCalcularCompra : function() {
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
  setCargarDatosDeCompra : function(id) {
    Ext.Ajax.request({
      url : 'index.php/compras/detalledecompra',
      params : {pidcompra : id},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        var store = Ext.getCmp('dgvDetalleCompra').getStore();
        var message = new Ext.LoadMask(Ext.getCmp('dgvDetalleCompra'),
                                       {msg : " Buscando la informacion..."});
        message.show();
        Ext.each(result.items, function(item) {
          store.add({
            id : ix,
            idprod : parseInt(item.idproducto),
            producto : item.descripcion,
            precio : item.preprod,
            cantidad : item.cant,
            total : (item.preprod * item.cant),
            codbobina : (item.bobina.length == 0 ? '0' : item.bobina),
            mlineal : item.lineal

          });

          ix++;
        });
        store.sync();
        message.destroy();
        me.getCalcularCompra();
      }
    });
  },
  modificarCompra : function(store) {
    me = this;
    var x = 0;
    Ext.Ajax.request({
      url : 'index.php/compras/actualizar',
      params : {
        pid : parseInt(Ext.getCmp('txtIdCompra').getValue()),
        pidprov : Ext.getCmp('cboProveedor').getValue(),
        pfcompra : Ext.getCmp('dfCompra').getValue(),
        pnumerodoc : Ext.getCmp('txtNumeroDocumento').getValue(),
        pvalorcompra : Ext.getCmp('txtSubtotal').getValue(),
        pvalorigv : Ext.getCmp('txtIgv').getValue(),
        pvalortotal : Ext.getCmp('txtTotal').getValue(),
        ptipodoc : Ext.getCmp('cboTipoDoc').getValue(),
        pusuario :  Ext.util.Cookies.get('idusuario'),
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
            me.actualizarCompraDetalle(item.ERROR, store);

          });
        } else {
          MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
          return false;
        }

      },
      failure : function(conn, response, options, eOpts) {}
    });

  },
  actualizarCompraDetalle : function(idcompra, store) {
    me = this;
    var idproductos = '';
    var cantidades = '';
    var precios = '';
    var codbobinas = '';
    var totales = '';
    var metroslineales = '';

    store.each(function(rec) {
      idproductos = idproductos + ',' + rec.get('idprod').toString();
      cantidades = cantidades + ',' + rec.get('cantidad').toString();
      precios = precios + ',' + rec.get('precio').toString();
      totales = totales + ',' + rec.get('total').toString();
    });

    idproductos = '{' + idproductos.substring(1, idproductos.length) + '}';
    cantidades = '{' + cantidades.substring(1, cantidades.length) + '}';
    precios = '{' + precios.substring(1, precios.length) + '}';
    codbobinas = '{' + codbobinas.substring(1, codbobinas.length) + '}';
    totales = '{' + totales.substring(1, totales.length) + '}';
    codbobinas = '{}';
    metroslineales = '{}';

    metroslineales =
        '{' + metroslineales.substring(1, metroslineales.length) + '}';
    me.ContratoModificarDetalle(idcompra, idproductos, cantidades, precios,
                                codbobinas, totales, metroslineales, store);
  },

  ContratoModificarDetalle : function(idcompra, idproductos, cantidades,
                                      precios, codbobinas, totales,
                                      metroslineales, store) {

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
