Ext.define('MyDesktop.app.views.Mantenimientos', {
  extend : 'Ext.tab.Panel',
  alias : 'widget.wmantenimientos',
  id : 'wmantenimientos',
  layout : 'fit',
  requires :
      [ 'MyDesktop.app.stores.Mantenimientos', 'MyDesktop.app.stores.Generos' ],
  initComponent : function() {
    me = this;
    storeProductos = Ext.create('MyDesktop.app.stores.Productos');
    storeTrabajadores = Ext.create('MyDesktop.app.stores.Trabajadores');
    storeTipoTrabajador = Ext.create('MyDesktop.app.stores.TipoTrabajador');
    storeLocales = Ext.create('MyDesktop.app.stores.Tiendas');
    storeTipoMoneda = Ext.create('MyDesktop.app.stores.TipoMoneda');
    storeFormaPago = Ext.create('MyDesktop.app.stores.FormaPago');
    //storeDocumentoInterno = Ext.create('MyDesktop.app.stores.DocumentoInterno');
    storeTiketeras = Ext.create('MyDesktop.app.stores.Tiketeras');
    storeTipoDocumentos = Ext.create('MyDesktop.app.stores.TipoDoc');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');

    Ext.apply(me, {
      items : [
        {
          title : 'Producto',
          flex : 1,
          items : [
            {
              xtype : 'panel',
              border : false,
              layout : {
                type : 'hbox',
                anchor : '100%'

              },

              items : [
                {
                  xtype : 'panel',
                  border : false,
                  flex : 2,
                  bodyPadding : 5,
                  items : [
                    {
                      xtype : 'gridpanel',
                      id : 'dgvproductos',
                      store : storeProductos,
                      sortableColumns : false,
                      height : 550,
                      columns : [
                        {
                          text : 'Id',
                          dataIndex : 'id',
                          flex : 0.5

                        },
                        {
                          text : 'Descripcion',
                          dataIndex : 'producto',
                          flex : 2.5

                        },
                        {
                          text : 'Estado',
                          dataIndex : 'estados',
                          flex : 0.5,
                          renderer : function(value) {
                            if (value == 0)
                              return '<span style="color:red;font-weight:bold;">ELIMNA</span>';
                            else if (value == 1)
                              return '<span style="color:green;font-weight:bold;">ACTIVO</span>';
                            else
                              return '<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>';
                          }

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
                                FxEliminarProducto(x);
                              }
                            }
                          ]
                        }

                      ],
                      /*dockedItems : [
                        {
                          xtype : 'pagingtoolbar',
                          id : 'ptbproductos',
                          store : storeProductos,
                          dock : 'bottom',
                          displayInfo : true
                        }
                      ],*/
                      listeners : {
                        itemclick : function(dv, record, item, index, e) {
                          FxEditarProducto();
                        }
                      }
                    }
                  ],

                },
                {
                  xtype : 'panel',
                  border : false,
                  titleAlign : 'center',
                  flex : 1,
                  layout : {aling : 'stretch', type : 'fit'},
                  height : 450,
                  bodyPadding : 4,
                  items : [
                    {
                      xtype : 'form',
                      id : 'myFormProducto',
                      frame : true,
                      bodyPadding : 1,
                      layout : {type : 'hbox', align : 'stretch'},
                      flex : 2,
                      items : [
                        {
                          xtype : 'fieldset',
                          flex : 2,
                          title : 'Detalle de los Productos',
                          defaults : {
                            anchor : '100%',
                            xtype : 'textfield',
                            allowBlank : true,
                            labelWidth : 150
                          },
                          items : [
                            {
                              xtype : 'hiddenfield',
                              name : 'id',
                              id : 'txtIdProd',
                              value : 0

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Sede :',
                              style : 'font-weight : bold;'
                            },
                            {
                              xtype : 'combobox',
                              id : 'cboSedeMant',
                              labelAlign:'right',
                              store : storetiendas,
                              queryMode : 'local',
                              displayField : 'descrip',
                              valueField : 'id',
                              forceSelection : true,
                              editable : false,
                              emptyText : '----- SELECCIONAR LA SEDE ------',
                              labelWidth:50,
                              listeners : {
                                change:function(obj){
                                  storeProductos.getProxy().extraParams = {
                                    pid : 0,
                                    pproducto  : null,
                                    pproveedor : null,
                                    pidsede    : this.getValue()
                                  };
                                  storeProductos.loadPage(1);
                                }
                              }

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Descripcion :',
                              style : 'font-weight : bold;'
                            },
                            {
                              id : 'txtDesProd',
                              name : 'producto',
                              fieldStyle : 'text-transform:uppercase',

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Precio Venta :',
                              style : 'font-weight : bold;',
                              hidden : false,

                            },
                            {
                              xtype : 'numberfield',
                              id : 'txtPrecioVentaProd',
                              name : 'precioventa',
                              fieldStyle : 'text-transform:uppercase',
                              hidden : false,
                              fieldStyle : 'text-align:left',
                              decimalPrecision : 2,
                              step : 0.01,
                              decimalSeparator : '.'

                            },

                            {
                              xtype : 'container',
                              layout : {type : 'hbox'},
                              width : 400,
                              border : false,
                              defaults :
                                  {labelWidth : 90, flex : 1, padding : 2},
                              items : [
                                {
                                  xtype : 'numberfield',
                                  fieldLabel : '<b>Stock Minimo</b>',
                                  name : 'stockmin',
                                  id : 'txtStockMinimoProd',
                                  readonly : true,
                                  value : 0

                                },
                                {
                                  xtype : 'numberfield',
                                  fieldLabel : '<b>Stock</b>',
                                  name : 'stock',
                                  id : 'txtStockActualProd',
                                  value : 0

                                }
                              ]
                            },
                            {
                              xtype : 'container',
                              layout : {type : 'hbox'},
                              width : 400,
                              border : false,
                              defaults :
                                  {labelWidth : 90, flex : 1, padding : 2},
                              items : [
                                {
                                  xtype : 'combobox',
                                  fieldLabel : '<b>Maneja Stock</b>',
                                  name : 'manstock',
                                  id : 'cboManejaStockProd',
                                  displayField : 'descripcion',
                                  valueField : 'id',
                                  query : 'local',
                                  store :
                                      Ext.create('Ext.data.ArrayStore',
                                                 {
                                                   fields : [
                                                     {name : 'id'},
                                                     {name : 'descripcion'}
                                                   ],
                                                   data : [
                                                     [ 'S', 'SI' ],
                                                     [ 'N', 'NO' ]
                                                   ]
                                                 }),
                                  value : 'S',
                                  editable : false,
                                  hidden : false,

                                },

                              ]
                            },
                            {
                                  xtype: 'radiogroup',
                                  columns: 2,
                                  vertical: true,
                                  itemId : 'rbTipoProducto',
                                  name   : 'rbTipoProducto',
                                  items: [
                                      { boxLabel: 'Consulta' , name: 'tipoproducto', itemId : 'tbconsulta', inputValue: 'Consulta', checked: true },
                                      { boxLabel: 'Operación', name: 'tipoproducto', itemId : 'tboperacion', inputValue: 'Operación'},
                                      { boxLabel: 'Examen'   , name:'tipoproducto',  itemId : 'tbexamen', inputValue: 'Examén' },
                                      { boxLabel: 'Control'  , name: 'tipoproducto', itemId : 'tbcontrol', inputValue: 'Control' },

                                  ]
                            },
                            {
                              xtype:'container',
                              layout:{
                                type:'vbox',
                                align :'stretch'
                              },
                              items:[
                                { xtype:'label',text : 'Pago x Médico',
                                  padding : '5 5 5 5 '},
                                {
                                  xtype:'numberfield',
                                  itemId : 'pagomedicotratante',
                                  name : 'ppagomedicotratante',
                                  flex : 1,
                                  fieldLabel : '<b>Tratante</b>',
                                  value : 0
                                },
                                {
                                  xtype:'numberfield',
                                  itemId : 'pagomedicocirujano',
                                  name : 'ppagomedicocirujano',
                                  flex : 1,
                                  fieldLabel : '<b>Cirujano</b>',
                                  value : 0

                                },
                                {
                                  xtype:'numberfield',
                                  itemId : 'pagomedicoexterno',
                                  name : 'ppagomedicoexterno',
                                  flex : 1,
                                  fieldLabel : '<b>Externo</b>',
                                  value : 0
                                }

                              ]
                            }
                          ]
                        }
                      ],
                      bbar : [
                        {
                          xtype : 'button',
                          text : 'Nuevo',
                          iconCls : 'add',
                          handler : function() {
                            /*var frm = Ext.getCmp('myFormProducto');frm.getForm().reset();*/
                            Ext.getCmp('txtDesProd').setValue('');
                            Ext.getCmp('txtPrecioVentaProd').setValue('0');
                            Ext.getCmp('txtStockMinimoProd').setValue('0');
                            Ext.getCmp('txtStockActualProd').setValue('0');
                            Ext.getCmp('txtDesProd').focus();
                            Ext.getCmp('txtIdProd').setValue(0);

                            Ext.ComponentQuery.query('#pagomedicoexterno')[0].setValue('0');
                            Ext.ComponentQuery.query('#pagomedicocirujano')[0].setValue('0');
                            Ext.ComponentQuery.query('#pagomedicotratante')[0].setValue('0');


                          }
                        },
                        {
                          xtype : 'button',
                          text : 'Guardar',
                          iconCls : 'boton-save',
                          id : 'btnGuardarProducto',

                        },
                        {
                          xtype : 'button',
                          text : 'Imprimir Listado',
                          iconCls : 'boton-print',
                          id : 'btnPrintProd'
                        },
                        {
                          xtype : 'button',
                          text : 'Actualizar Listado',
                          iconCls : 'x-tool-panel-reload',
                          id : 'btnActualizarListProd'
                        }

                      ]
                    }
                  ]
                } // fin panel detalle
              ]   // panel hbox
            }
          ] // panel medicamento

        }, // fin tab inventario
        /*---*/
        {
          title : 'Medicos',
          flex : 1,
          items : [
            {
              xtype : 'panel',
              border : false,
              layout : 'hbox',
              items : [
                {
                  xtype : 'panel',
                  border : false,
                  flex : 2,
                  layout : 'fit',
                  bodyPadding : 5,
                  items : [
                    {
                      xtype : 'gridpanel',
                      id : 'dgvtrabajadores',
                      store : storeTrabajadores,
                      sortableColumns : false,
                      height : 550,
                      columns : [
                        {
                          text : 'Id',
                          dataIndex : 'id',
                          flex : 0.5

                        },
                        {
                          text : 'Ape. Paterno',
                          dataIndex : 'paterno',
                          flex : 1

                        },
                        {
                          text : 'Ape. Materno',
                          dataIndex : 'materno',
                          flex : 1

                        },
                        {
                          text : 'Nombres',
                          dataIndex : 'nombres',
                          flex : 1

                        },
                        {
                          text : 'Estado',
                          dataIndex : 'estados',
                          flex : 0.5,
                          renderer : function(value) {
                            if (value == 0)
                              return '<span style="color:red;font-weight:bold;">ELIMNA</span>';
                            else if (value == 1)
                              return '<span style="color:green;font-weight:bold;">ACTIVO</span>';
                            else
                              return '<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>';
                          }

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
                                FxEliminarTrabajador(x);

                              }
                            }
                          ]
                        }
                      ],
                      /*dockedItems : [
                        {
                          xtype : 'pagingtoolbar',
                          id : 'ptbtrabajadores',
                          store : storeTrabajadores,
                          dock : 'bottom',
                          displayInfo : true
                        }
                      ],*/
                      listeners : {
                        itemclick : function(dv, record, item, index, e) {
                          FxEditarTrabajador();
                        }
                      }
                    }
                  ]

                },
                {
                  xtype : 'panel',
                  border : false,
                  titleAlign : 'center',
                  flex : 1,
                  layout : {aling : 'stretch', type : 'fit'},
                  bodyPadding : 4,
                  height : 420,
                  items : [
                    {
                      xtype : 'form',
                      id : 'myFormTrabajador',
                      frame : true,
                      bodyPadding : 1,
                      layout : {type : 'hbox', align : 'stretch'},
                      items : [
                        {
                          xtype : 'fieldset',
                          flex : 2,
                          title : 'Informacion del Trabajador',
                          defaults : {
                            anchor : '100%',
                            xtype : 'textfield',
                            allowBlank : false,
                            labelWidth : 150
                          },
                          items : [
                            {
                              xtype : 'hiddenfield',
                              name : 'id',
                              id : 'txtIdTraba',

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Apellido Paterno :',
                              style : 'font-weight : bold;'
                            },
                            {
                              id : 'txtPaternoTraba',
                              name : 'paterno',
                              fieldStyle : 'text-transform:uppercase'

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Apellido Materno :',
                              style : 'font-weight : bold;'

                            },
                            {
                              id : 'txtMaternoTrab',
                              name : 'materno',
                              fieldStyle : 'text-transform:uppercase'
                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Nombres :',
                              style : 'font-weight : bold;'

                            },
                            {
                              id : 'txtNombresTrab',
                              name : 'nombres',
                              fieldStyle : 'text-transform:uppercase'
                            },
                            {
                              xtype : 'container',
                              layout : {type : 'hbox'},
                              border : false,
                              defaults :
                                  {labelWidth : 120, flex : 1, padding : 2},
                              items : [
                                {
                                  xtype : 'datefield',
                                  fieldLabel : '<b>Fecha Nacimiento</b>',
                                  name : 'fnacimiento',
                                  id : 'FechaNaciTrab'

                                }
                              ]
                            },
                            {
                              xtype : 'container',
                              layout : {type : 'hbox'},
                              border : false,
                              defaults :
                                  {labelWidth : 120, flex : 1, padding : 2},
                              items : [
                                {
                                  xtype : 'combobox',
                                  fieldLabel : '<b>Sexo</b>',
                                  name : 'sexo',
                                  id : 'cboSexoTrab',
                                  displayField : 'descripcion',
                                  valueField : 'id',
                                  store :
                                      Ext.create('Ext.data.ArrayStore',
                                                 {
                                                   fields : [
                                                     {name : 'id'},
                                                     {name : 'descripcion'}
                                                   ],
                                                   data : [
                                                     [ 'M', 'M' ],
                                                     [ 'F', 'F' ]
                                                   ]
                                                 }),
                                  editable : false

                                }
                              ]
                            },
                            ,
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Tipo de Cargo :',
                              style : 'font-weight : bold;'

                            },
                            {
                              xtype : 'combobox',
                              id : 'txtTipoCargoTrab',
                              store : storeTipoTrabajador,
                              name : 'tipotra',
                              query : 'remote',
                              displayField : 'descripcion',
                              valueField : 'id',
                              editable : false,
                              value : '1'

                            }


                          ]
                        }
                      ],
                      bbar : [
                        {
                          xtype : 'button',
                          text : 'Nuevo',
                          iconCls : 'add',
                          id : 'btnNuevoTrab',
                          handler : function() {
                            var frm = Ext.getCmp('myFormTrabajador');
                            frm.getForm().reset();
                            Ext.getCmp('txtPaternoTraba').focus();
                          }
                        },
                        {
                          xtype : 'button',
                          text : 'Guardar',
                          id : 'btnGuardarTrab',
                          iconCls : 'boton-save',
                          handler : function() { FxActualizarTrabajador(); }
                        },
                        {
                          xtype : 'button',
                          text : 'Imprimir Listado',
                          id : 'btnPrintTrabaj',
                          iconCls : 'boton-print'

                        }

                      ]

                    }
                  ]
                } // fin panel detalle
              ]   // panel hbox
            }
          ] // panel medicamento

        }, // fin Grupos Medicamentos
        {
          title : 'Tipo Moneda y Cambio / Documentos Internos',
          flex : 1,
          layout : {type : 'hbox', align : 'stretch'},
          items : [
            {
              xtype : 'panel',
              flex : 1,
              title : 'Tipo de Moneda y Cambio',
              layout : {type : 'vbox', align : 'stretch', padding : 5},
              items : [
                {
                  xtype : 'gridpanel',
                  flex : 1,
                  padding : 5,
                  store : storeTipoMoneda,
                  id : 'dgvTipoMoneda',
                  columns : [
                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_descripcion',
                      text : 'Descripcion',
                      flex : 1
                    },
                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_simbolomon',
                      text : 'Simbolo',
                      flex : 0.5
                    },
                    {
                      xtype : 'numbercolumn',
                      dataIndex : '_tipocambio',
                      text : 'Tipo de Cambio',
                      flex : 0.5
                    }

                  ],
                  listeners : {
                    itemclick : function(dv, record, item, index, e) {
                      var grid = Ext.getCmp('dgvTipoMoneda');
                      record = grid.getSelectionModel().getSelection();
                      if (record[0]) {
                        var frm = Ext.getCmp('frmTipoMonedaCambio');
                        frm.loadRecord(record[0]);
                      }
                    }
                  }
                },
                {
                  xtype : 'form',
                  flex : 1,
                  frame : true,
                  padding : 5,
                  bodyPadding : 10,
                  id : 'frmTipoMonedaCambio',
                  items : [
                    {
                      xtype : 'hiddenfield',
                      id : 'txtIdTipoMoneda',
                      name : '_idmon'
                    },
                    {
                      xtype : 'textfield',
                      anchor : '100%',
                      fieldLabel : 'Descripcion',
                      id : 'txtDesTipoMoneda',
                      name : '_descripcion'
                    },
                    {
                      xtype : 'textfield',
                      anchor : '100%',
                      fieldLabel : 'Simbolo',
                      id : 'txtSimboloTipoMoneda',
                      name : '_simbolomon'
                    },
                    {
                      xtype : 'numberfield',
                      anchor : '100%',
                      fieldLabel : 'Tipo de Cambio',
                      id : 'txtTipoCambio',
                      name : '_tipocambio',
                      decimalPrecision : 2,
                      step : 0.01,
                      decimalSeparator : '.'
                    }
                  ],
                  dockedItems : [
                    {
                      xtype : 'toolbar',
                      dock : 'bottom',
                      items : [
                        {
                          xtype : 'button',
                          text : 'Nuevo',
                          id : 'btnNuevoTipoCambio',
                          iconCls : 'add'
                        },
                        {
                          xtype : 'button',
                          text : 'Grabar',
                          id : 'btnGrabarTipoCambio',
                          iconCls : 'boton-save '
                        },
                        {
                          xtype : 'button',
                          text : 'Eliminar',
                          id : 'btnEliminarTipoCambio',
                          iconCls : 'remove'
                        },
                        {
                          xtype : 'button',
                          text : 'Actualizar Lista',
                          id : 'btnActualizarLista',
                          iconCls : 'reload'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              xtype : 'panel',
              flex : 1,
              title : 'Documento Interno Tiketera',
              layout : {type : 'vbox', align : 'stretch', padding : 5},
              items : [
                {
                  xtype : 'gridpanel',
                  flex : 1,
                  padding : 5,
                  id : 'dgvTiketeras',  //'dgvDocumentoInterno',
                  store : storeTiketeras,

                  columns : [
                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_tienda',
                      text : 'Sede',
                      flex : 2
                    },
                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_serie',
                      text : 'Serie',
                      flex : 1
                    },
                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_autorizacion',
                      text : 'Autorizacion',
                      flex : 1
                    },

                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_correlativo',
                      text : 'Correlativo',
                      flex : 0.8
                    }
                  ],
                  listeners : {
                    itemclick : function(dv, record, item, index, e) {
                      var grid = Ext.getCmp('dgvTiketeras');
                      record = grid.getSelectionModel().getSelection();
                      if (record[0]) {
                        var frm = Ext.getCmp('frmDocumentoInterno');
                        frm.loadRecord(record[0]);
                      }

                    }
                  }
                },
                {
                  xtype : 'form',
                  flex : 1,
                  frame : true,
                  id : 'frmDocumentoInterno',
                  padding : 5,
                  bodyPadding : 10,
                  items : [
                    {
                      xtype : 'hiddenfield',
                      id : 'txtIdTiketera',
                      name : '_id'
                    },
                    {
                      xtype : 'combobox',
                      anchor : '100%',
                      id : 'cboLocalTiketera',
                      store : storeLocales,
                      queryMode : 'local',
                      valueField : 'id',
                      displayField : 'descrip',
                      fieldLabel : 'Local',
                      name : '_idtienda',
                      editable : false
                    },
                    {
                      xtype : 'textfield',
                      anchor : '100%',
                      fieldLabel : 'Serie',
                      id : 'txtSerieTiketera',
                      name : '_serie'
                    },
                     {
                      xtype : 'textfield',
                      anchor : '100%',
                      fieldLabel : 'Autorizacion',
                      id : 'txtAutorizacion',
                      name : '_autorizacion'
                    },
                    {
                      xtype : 'textfield',
                      anchor : '100%',
                      fieldLabel : 'Correlativo',
                      id : 'txtCorrelativo',
                      name : '_correlativo'
                    }
                  ],
                  dockedItems : [
                    {
                      xtype : 'toolbar',
                      dock : 'bottom',
                      items : [
                        {
                          xtype : 'button',
                          text : 'Nuevo',
                          id : 'btnNuevoDocInterno',
                          iconCls : 'add'
                        },
                        {
                          xtype : 'button',
                          text : 'Grabar',
                          id : 'btnGrabarDocInterno',
                          iconCls : 'boton-save '
                        },
                        /*{
                          xtype : 'button',
                          text : 'Eliminar',
                          id : 'btnEliminarDocInterno',
                          iconCls : 'remove'
                        }*/
                      ]
                    }
                  ]
                }
              ]
            },

            {
              xtype : 'panel',
              flex : 1,
              title : 'Formas de Pago',
              layout : {type : 'vbox', align : 'stretch', padding : 5},
              items : [
                {
                  xtype : 'gridpanel',
                  flex : 1,
                  padding : 5,
                  id : 'dgvFormasDePago',
                  store : storeFormaPago,
                  columns : [
                    {
                      xtype : 'gridcolumn',
                      dataIndex : '_descripcion',
                      text : 'Descripcion',
                      flex : 1
                    }
                  ],
                  listeners : {
                    itemclick : function(dv, record, item, index, e) {
                      var grid = Ext.getCmp('dgvFormasDePago');
                      record = grid.getSelectionModel().getSelection();
                      if (record[0]) {
                        var frm = Ext.getCmp('frmFormaDePago');
                        frm.loadRecord(record[0]);
                      }

                    }
                  }
                },
                {
                  xtype : 'form',
                  flex : 1,
                  frame : true,
                  id : 'frmFormaDePago',
                  padding : 5,
                  bodyPadding : 10,
                  items : [
                    {
                      xtype : 'hiddenfield',
                      id : 'txtIdFormaPago',
                      name : '_idfpag'
                    },
                    {
                      xtype : 'textfield',
                      anchor : '100%',
                      fieldLabel : 'Descripcion',
                      id : 'txtDescripcionFormaPago',
                      name : '_descripcion'
                    }
                  ],
                  dockedItems : [
                    {
                      xtype : 'toolbar',
                      dock : 'bottom',
                      items : [
                        {
                          xtype : 'button',
                          text : 'Nuevo',
                          id : 'btnNuevoFormaPago',
                          iconCls : 'add'
                        },
                        {
                          xtype : 'button',
                          text : 'Grabar',
                          id : 'btnGrabarFormaPago',
                          iconCls : 'boton-save '
                        },
                        {
                          xtype : 'button',
                          text : 'Eliminar',
                          id : 'btnEliminarFormaPago',
                          iconCls : 'remove'
                        }
                      ],

                    }
                  ]
                }
              ]
            }
          ]
        }, // fin Grupo TipoMoneda Cambio/ documentos internos

        {
          title : 'Locales',
          flex : 1,
          items : [
            {
              xtype : 'panel',
              border : false,
              layout : 'hbox',
              items : [
                {
                  xtype : 'panel',
                  border : false,
                  flex : 2,
                  layout : 'fit',
                  bodyPadding : 5,
                  items : [
                    {
                      xtype : 'gridpanel',
                      id : 'dgvlocales',
                      store : storeLocales,
                      sortableColumns : false,
                      height : 550,
                      columns : [
                        {
                          text : 'Id',
                          dataIndex : 'id',
                          flex : 0.5

                        },
                        {
                          text : 'Descripcion ',
                          dataIndex : 'descrip',
                          flex : 2

                        },
                        {
                          text : 'Direccion',
                          dataIndex : 'direc',
                          flex : 2

                        },
                        {
                          text : 'Estado',
                          dataIndex : 'est',
                          flex : 0.5,
                          renderer : function(value) {
                            if (value == 0)
                              return '<span style="color:red;font-weight:bold;">ELIMNA</span>';
                            else if (value == 1)
                              return '<span style="color:green;font-weight:bold;">ACTIVO</span>';
                            else
                              return '<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>';
                          }

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
                                FxEliminarMaterial(x);

                              }
                            }
                          ]
                        }

                      ],
                      listeners : {
                        itemclick : function(dv, record, item, index, e) {
                          var grid = Ext.getCmp('dgvlocales');
                          record = grid.getSelectionModel().getSelection();
                          if (record[0]) {
                            var frm = Ext.getCmp('myFormLocales');
                            frm.loadRecord(record[0]);
                          }
                        }
                      }

                    }
                  ],

                },
                {
                  xtype : 'panel',
                  border : false,
                  titleAlign : 'center',
                  flex : 1,
                  layout : {aling : 'stretch', type : 'fit'},
                  bodyPadding : 4,
                  height : 300,
                  items : [
                    {
                      xtype : 'form',
                      id : 'myFormLocales',
                      frame : true,
                      bodyPadding : 1,
                      layout : {type : 'hbox', align : 'stretch'},
                      items : [
                        {
                          xtype : 'fieldset',
                          flex : 2,
                          title : 'Informacion del Local',
                          defaults : {
                            anchor : '100%',
                            xtype : 'textfield',
                            allowBlank : false,
                            labelWidth : 150
                          },
                          items : [
                            {
                              xtype : 'hiddenfield',
                              name : 'id',
                              id : 'txtIdLocal',
                              value : 0

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Descripcion :',
                              style : 'font-weight : bold;'
                            },
                            {
                              id : 'txtDescripcionLocal',
                              name : 'descrip',
                              fieldStyle : 'text-transform:uppercase'

                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Direccion :',
                              style : 'font-weight : bold;',

                            },
                            {
                              id : 'txtDireccionLocal',
                              name : 'direc',
                              fieldStyle : 'text-transform:uppercase',
                              allowBlank : true,
                            },
                            {
                              xtype : 'label',
                              width : 30,
                              text : 'Telefono :',
                              style : 'font-weight : bold;',

                            },
                            {
                              id : 'txtTelefoLocal',
                              name : 'telef',
                              fieldStyle : 'text-transform:uppercase',
                              allowBlank : true,

                            },

                          ]
                        }
                      ],
                      bbar : [
                        {
                          xtype : 'button',
                          text : 'Nuevo',
                          iconCls : 'add',
                          handler : function() {
                            var frm = Ext.getCmp('myFormLocales');
                            frm.getForm().reset();
                            Ext.getCmp('txtDescripcionLocal').focus();
                            Ext.getCmp('txtIdLocal').setValue(0);
                          }
                        },
                        {
                          xtype : 'button',
                          text : 'Guardar',
                          id : 'btnActualizarLocal',
                          iconCls : 'boton-save'

                        },
                        {
                          xtype : 'button',
                          text : 'Imprimir Listado',
                          id : 'btnPrintMate',
                          iconCls : 'boton-print'

                        },

                      ],

                    }
                  ]
                } // fin panel detalle
              ]   // panel hbox
            }
          ] // panel medicamento

        }, // fin Grupos Locales

      ] // fin item principal

    });
    this.callParent(arguments);

    Ext.getCmp('btnPrintProd').on('click', me.ImprimirListadoProductos, this);
    Ext.getCmp('btnActualizarListProd').on('click', me.ActualizarListadoProductos, this);

    Ext.getCmp('btnPrintTrabaj')
        .on('click', me.ImprimirListadoTrabajadores, this);
    Ext.getCmp('btnGuardarProducto').on('click', me.ActualizarProducto, this);
    Ext.getCmp('btnActualizarLocal').on('click', me.ActualizarLocales, this);
    Ext.getCmp('btnNuevoTipoCambio').on('click', me.NuevoTipoMoneda, this);
    Ext.getCmp('btnGrabarTipoCambio')
        .on('click', me.ActualizarTipoMoneda, this);
    Ext.getCmp('btnEliminarTipoCambio')
        .on('click', me.EliminarTipoMoneda, this);
    Ext.getCmp('btnNuevoFormaPago').on('click', me.NuevoFormaPago, this);
    Ext.getCmp('btnGrabarFormaPago').on('click', me.ActualizarFormaPago, this);
    Ext.getCmp('btnEliminarFormaPago').on('click', me.EliminarFormaPago, this);
    Ext.getCmp('btnNuevoDocInterno')
        .on('click', me.NuevoDocumentoInterno, this);
    Ext.getCmp('btnGrabarDocInterno')
        .on('click', me.ActualizarDocumentoInterno, this);
    /*Ext.getCmp('btnEliminarDocInterno')
.on('click', me.EliminarDocumentoInterno, this);*/

  },
  /*** acciones para TipoMoneda,DocumentoInterno,FormaPago ***/
  ActualizarListadoProductos:function(){
    Ext.getCmp('dgvproductos').getStore().load();
  },
  NuevoFormaPago : function() {
    Ext.getCmp('frmFormaDePago').getForm().reset();
    Ext.getCmp('txtDescripcionFormaPago').focus();
  },
  ActualizarFormaPago : function() {
    var id = Ext.getCmp('txtIdFormaPago').getValue();
    if(id == '' || id == null){ id = 0; }
    var descripcion = Ext.getCmp('txtDescripcionFormaPago').getValue();
    Ext.Ajax.request({
      url : 'index.php/mantenimientos/actualizarformapago',
      params : {pid : id, pdescripcion : descripcion},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.getCmp('dgvFormasDePago').getStore().load();
        Ext.getCmp('frmFormaDePago').getForm().reset();
      },
      failure : function(conn, response, options, eOpts) {}
    });
  },
  EliminarFormaPago : function() {
    var id = Ext.getCmp('txtIdFormaPago').getValue();
    Ext.Ajax.request({
      url : 'index.php/mantenimientos/eliminarformapago',
      params : {pid : parseInt(id)},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.getCmp('dgvFormasDePago').getStore().load();
        Ext.getCmp('frmFormaDePago').getForm().reset();
      },
      failure : function(conn, response, options, eOpts) {}
    });
  },

  NuevoTipoMoneda : function() {
    Ext.getCmp('frmTipoMonedaCambio').getForm().reset();
    Ext.getCmp('txtDesTipoMoneda').focus();
  },
  ActualizarTipoMoneda : function() {
    var id = Ext.getCmp('txtIdTipoMoneda').getValue();
    var descripcion = Ext.getCmp('txtDesTipoMoneda').getValue();
    var simbolo = Ext.getCmp('txtSimboloTipoMoneda').getValue();
    var tipocambio = Ext.getCmp('txtTipoCambio').getValue();
    Ext.Ajax.request({
      url : 'index.php/mantenimientos/actualizartipomoneda',
      params : {
        pid : (id == '' ? 0 : parseInt(id)),
        pdescripcion : descripcion,
        psimbolo : simbolo,
        ptipocambio : tipocambio
      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.getCmp('dgvTipoMoneda').getStore().load();
        Ext.getCmp('frmTipoMonedaCambio').getForm().reset();
      },
      failure : function(conn, response, options, eOpts) {}
    });
  },
  EliminarTipoMoneda : function() {
    var id = Ext.getCmp('txtIdTipoMoneda').getValue();
    Ext.Ajax.request({
      url : 'index.php/mantenimientos/eliminartipomoneda',
      params : {pid : parseInt(id)},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.getCmp('dgvTipoMoneda').getStore().load();
        Ext.getCmp('frmTipoMonedaCambio').getForm().reset();
      },
      failure : function(conn, response, options, eOpts) {}
    });
  },

  NuevoDocumentoInterno : function() {
    Ext.getCmp('frmDocumentoInterno').getForm().reset();
    Ext.getCmp('cboLocalTiketera').focus();
  },
  ActualizarDocumentoInterno : function() {
    var id = Ext.getCmp('txtIdTiketera').getValue();
    var idsede = Ext.getCmp('cboLocalTiketera').getValue();
    var serie = Ext.getCmp('txtSerieTiketera').getValue();
    var autorizacion = Ext.getCmp('txtAutorizacion').getValue();
    var correlativo = Ext.getCmp('txtCorrelativo').getValue();

    Ext.Ajax.request({
      url : 'index.php/mantenimientos/actualizartiketera',
      params : {
        pid : (id == '' ? 0 : parseInt(id)),
        pserie : serie,
        pautorizacion : autorizacion,
        pcorrelativo : correlativo,
        ptienda : idsede
      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.getCmp('dgvTiketeras').getStore().load();
        Ext.getCmp('frmDocumentoInterno').getForm().reset();
      },
      failure : function(conn, response, options, eOpts) {}
    });
  },
  /*EliminarDocumentoInterno : function() {
    var id = Ext.getCmp('txtIdDocInterno').getValue();
    Ext.Ajax.request({
      url : 'index.php/mantenimientos/eliminardocumentointerno',
      params : {pid : parseInt(id)},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        Ext.getCmp('dgvDocumentoInterno').getStore().load();
        Ext.getCmp('frmDocumentoInterno').getForm().reset();
      },
      failure : function(conn, response, options, eOpts) {}
    });
},*/

  /**********************************************************/
  ImprimirListadoProductos : function() {

    var _url = 'reportes/imprimirlistadoproducto';
    var tabpanel = Ext.getCmp('tpContenedorApp');
    if (!tabpanel.getChildByElement('tabrptproductos')) {
      tabpanel.add({
        xtype : 'panel',
        closable : true,
        id : 'tabrptproductos',
        title : 'Listado de Productos',
        layout : 'fit',
        items : [
          {
            xtype : 'uxiframe', // #3
            src : _url          // #4
          }
        ]
      });
    }
    tabpanel.setActiveTab('tabrptproductos');
  },
  ImprimirListadoTrabajadores : function() {
    var _url = 'reportes/imprimirlistadotrabajador';
    var tabpanel = Ext.getCmp('tpContenedorApp');
    if (!tabpanel.getChildByElement('tabrpttrabajadores')) {
      tabpanel.add({
        xtype : 'panel',
        closable : true,
        id : 'tabrpttrabajadores',
        title : 'Listado de Trabajadores',
        layout : 'fit',
        items : [
          {
            xtype : 'uxiframe', // #3
            src : _url          // #4
          }
        ]
      });
    }
    tabpanel.setActiveTab('tabrpttrabajadores');
  },
  ActualizarProducto : function(btn) {
    var frm = Ext.getCmp('myFormProducto');
    id = Ext.getCmp('txtIdProd').getValue();
    descripcion = Ext.getCmp('txtDesProd').getValue();
    medida = '';
    nrounidades = '';
    usuario = Ext.util.Cookies.get('idusuario');
    stockminimo = Ext.getCmp('txtStockMinimoProd').getValue();
    gasto = '', manejastock = Ext.getCmp('cboManejaStockProd').getValue();
    stock = Ext.getCmp('txtStockActualProd').getValue();
    precio = Ext.getCmp('txtPrecioVentaProd').getValue();
    sede = Ext.getCmp('cboSedeMant').getValue();
    if(sede == null){Ext.Msg.alert("Aviso","Seleccionar la sede del producto"); return false;}

    rbTipoProducto = Ext.ComponentQuery.query('#rbTipoProducto')[0].getValue();
    rbTipoProducto = rbTipoProducto.tipoproducto;
    txtpmExterno   = Ext.ComponentQuery.query('#pagomedicoexterno')[0].getValue();
    txtpmCirujano  = Ext.ComponentQuery.query('#pagomedicocirujano')[0].getValue();
    txtpmTratante  = Ext.ComponentQuery.query('#pagomedicotratante')[0].getValue();


    Ext.Ajax.request({
      url : 'index.php/productos/actualizar',
      params : {
        vId : parseInt(id),
        vDescripcion : descripcion,
        vMedida : medida,
        vNroUnidades : nrounidades,
        vUsuario : usuario,
        vStockMinimo : stockminimo,
        vGasto : gasto,
        vManejaStock : manejastock,
        vStock : stock,
        vPrecio : precio,
        vSede : sede,
        vTipoProducto : rbTipoProducto,
        vPgExterno : txtpmExterno,
        vPgCirujano : txtpmCirujano,
        vPgTratante : txtpmTratante
      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        if (result.success) {
          _store = Ext.getCmp('dgvproductos').getStore();
          _store.getProxy().extraParams = {
            pid : 0,
            pproducto  : null,
            pproveedor : null,
            pidsede    : Ext.getCmp('cboSedeMant').getValue()
          };
          _store.loadPage(1);

        } else {
          MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
          return false;
        }
      },
      failure : function(conn, response, options, eOpts) {}
    });

  },
  ActualizarLocales : function() {

    var frm = Ext.getCmp('myFormLocales');
    var id = Ext.getCmp('txtIdLocal').getValue();
    var descripcion = Ext.getCmp('txtDescripcionLocal').getValue();
    var direccion = Ext.getCmp('txtDireccionLocal').getValue();
    var telefono = Ext.getCmp('txtTelefoLocal').getValue();

    Ext.Ajax.request({
      url : 'index.php/trabajadores/actualizartienda',
      params : {
        vId : id,
        vDescripcion : descripcion,
        vDireccion : direccion,
        vTelefono : telefono
      },
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        if (result.success) {
          Ext.getCmp('dgvlocales').getStore().load();
          frm.getForm().reset();
        } else {
          MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
          return false;
        }
      },
      failure : function(conn, response, options, eOpts) {}
    });

  },
});

/**************** Modificaciones ********************************/
function FxEditarTrabajador() {
  var grid = Ext.getCmp('dgvtrabajadores');
  record = grid.getSelectionModel().getSelection();
  if (record[0]) {
    var frm = Ext.getCmp('myFormTrabajador');
    frm.loadRecord(record[0]);
  }
}
function FxEditarProducto() {
  var grid = Ext.getCmp('dgvproductos');
  record = grid.getSelectionModel().getSelection();
  if (record[0]) {
    var frm = Ext.getCmp('myFormProducto');
    switch (record[0].get('rbtipoproducto')) {
      case 'Consulta': Ext.ComponentQuery.query('#tbconsulta')[0].setValue(true); break;
      case 'Examén': Ext.ComponentQuery.query('#tbexamen')[0].setValue(true);break;
      case 'Operación':Ext.ComponentQuery.query('#tboperacion')[0].setValue(true);break;
      case 'Control':Ext.ComponentQuery.query('#tbcontrol')[0].setValue(true);break;
      default :
        Ext.ComponentQuery.query('#tbconsulta')[0].setValue(false);
        Ext.ComponentQuery.query('#tbexamen')[0].setValue(false);
        Ext.ComponentQuery.query('#tboperacion')[0].setValue(false);
        Ext.ComponentQuery.query('#tbcontrol')[0].setValue(false);
    }
    frm.loadRecord(record[0]);


  }
}

/******************* Actualizar ****************************************/

function FxEliminarProducto(id) {
  var frm = Ext.getCmp('myFormProducto');
  // id 		 	= Ext.getCmp('txtIdProd').getValue();
  usuario = Ext.util.Cookies.get('idusuario');
  Ext.Ajax.request({
    url : 'index.php/productos/eliminar',
    params : {vId : parseInt(id), vUsuario : usuario},
    success : function(conn, response, options, eOpts) {
      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
      if (result.success) {
        Ext.getCmp('dgvproductos').getStore().load();
      } else {
        MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
        return false;
      }
    },
    failure : function(conn, response, options, eOpts) {}
  });
}

function FxActualizarTrabajador() {
  var frm = Ext.getCmp('myFormTrabajador');
  id = Ext.getCmp('txtIdTraba').getValue();
  paterno = Ext.getCmp('txtPaternoTraba').getValue();
  materno = Ext.getCmp('txtMaternoTrab').getValue();
  nombres = Ext.getCmp('txtNombresTrab').getValue();
  fechanaci = Ext.getCmp('FechaNaciTrab').getValue();
  sexo = Ext.getCmp('cboSexoTrab').getValue();
  tipotrab = Ext.getCmp('txtTipoCargoTrab').getValue();
  usuario = Ext.util.Cookies.get('idusuario');


  Ext.Ajax.request({
    url : 'index.php/trabajadores/actualizar',
    params : {
      vId : id,
      vPaterno : paterno,
      vMaterno : materno,
      vNombres : nombres,
      vFechaNaci : (fechanaci == '' ? '01/01/1900' : fechanaci),
      vSexo : sexo,
      vTipoTrab : tipotrab,
      vUsuario : usuario
    },
    success : function(conn, response, options, eOpts) {
      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
      if (result.success) {
        Ext.getCmp('dgvtrabajadores').getStore().load();
        frm.getForm().reset();
      } else {
        MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
        return false;
      }
    },
    failure : function(conn, response, options, eOpts) {}
  });
}

function FxEliminarTrabajador(id) {
  var frm = Ext.getCmp('myFormTrabajador');
  usuario = Ext.util.Cookies.get('idusuario');
  Ext.Ajax.request({
    url : 'index.php/trabajadores/eliminar',
    params : {vId : parseInt(id), vUsuario : usuario},
    success : function(conn, response, options, eOpts) {
      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
      if (result.success) {
        Ext.getCmp('dgvtrabajadores').getStore().load();
        frm.getForm().reset();
      } else {
        MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
        return false;
      }
    },
    failure : function(conn, response, options, eOpts) {}
  });
}

function FxEliminarMaterial(id) {
  var frm = Ext.getCmp('myFormMaterial');
  usuario = Ext.util.Cookies.get('idusuario');
  Ext.Ajax.request({
    url : 'index.php/productos/eliminarmaterial',
    params : {
      vId : parseInt(id)

    },
    success : function(conn, response, options, eOpts) {
      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
      if (result.success) {
        Ext.getCmp('dgvmateriales').getStore().load();
        frm.getForm().reset();
      } else {
        MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
        return false;
      }
    },
    failure : function(conn, response, options, eOpts) {}
  });
}
