var tipo = 0;
var valor = null;

Ext.define('MyDesktop.app.views.Compras', {
  extend : 'Ext.grid.Panel',
  alias : 'widget.wcompras',
  requires : [
    'MyDesktop.app.views.ContratoEditar',
    'MyDesktop.app.stores.Compras',
    'MyDesktop.app.stores.Generos',
    'MyDesktop.app.views.CompraModificar',
    'Ext.ux.IFrame',
    'Ext.ux.desktop.InputTextMask'

  ],
  id : 'wcompras',
  initComponent : function() {
    storecompras = Ext.create('MyDesktop.app.stores.Compras');
    storefiltros = Ext.create('MyDesktop.app.stores.BusquedasCompras');
    var me = this;
    _mysede = Ext.util.Cookies.get('sede');
    storecompras.load({
      params:{
        pdesde : null,
        phasta : null,
        pproveedor : null,
         pnumerodoc : null,
         psede : _mysede
      }
    });
    var autoLoadCompras =
    {
      /*Intervalo de tiempo de consulta 5 minutos
       *
       * 1 => segundo => 1000
       *
       * */
      run : function() {
        storecompras.reload();

        // var g_items =
        // Ext.getCmp('panDetalleGrilla').selModel.getSelections();

      },
      interval : 300000
    }

    Ext.TaskManager.start(autoLoadCompras);

    Ext.apply(me, {
      layout : 'fit',
      id : 'dgvCompras',
      sortableColumns : false,
      store : storecompras,
      columns : [
        {
          text : "Codigo",
          flex : 0.5,
          sortable : true,
          dataIndex : 'id',
          align : 'left'
        },
        {
          text : "Fecha Doc.",
          flex : 0.5,
          sortable : true,
          dataIndex : 'fecha',
          align : 'center'
        },
        {
          text : "Numero Doc.",
          flex : 0.5,
          sortable : true,
          dataIndex : 'numerodocumento',
          align : 'center'
        },
        {
          text : "Tipo",
          flex : 0.5,
          sortable : true,
          dataIndex : 'tipo',
          align : 'center'
        },
        {
          text : "Proveedor",
          flex : 3,
          sortable : true,
          dataIndex : 'proveedor',
          align : 'left'
        },
        {
          xtype : 'numbercolumn',
          format : '0,000.000',
          text : "Sub Total",
          flex : 0.5,
          sortable : true,
          dataIndex : 'subtotal',
          align : 'right'

        },
        {
          xtype : 'numbercolumn',
          format : '0,000.000',
          text : "Igv",
          flex : 0.5,
          sortable : true,
          dataIndex : 'igv',
          align : 'right'

        },
        {
          xtype : 'numbercolumn',
          format : '0,000.000',
          text : "Total",
          flex : 0.5,
          sortable : true,
          dataIndex : 'total',
          align : 'right'

        },
        {
          text : "Estado",
          style : 'text-aling:center',
          flex : 0.6,
          sortable : true,
          dataIndex : 'est',
          align : 'center',
          renderer : function(value, metaData, record, rowIndex, colIndex,
                              store, view) {
            switch (parseInt(record.get("est"))) {
            case 3:
              return '<b style="color: #CC0000">ANULADO</b>';
            case 1:
              return '<b>REGISTRADO</b>';
            }

          }

        },

      ],
      listeners : {

        itemclick : function(dv, record, item, index, e) {
          if (record.get("est") != '1') {
            Ext.getCmp('btnEliminarCompra').setDisabled(true);
            Ext.getCmp('btnImprimirCompra').setDisabled(false);
            Ext.getCmp('btnEditarCompra').setDisabled(true);
          } else {
            Ext.getCmp('btnEliminarCompra').setDisabled(false);
            Ext.getCmp('btnImprimirCompra').setDisabled(false);
            Ext.getCmp('btnEditarCompra').setDisabled(false);
          }

        }
      },
      bbar : [

        {xtype : 'tbfill'},
        {
          xtype : 'textfield',
          id : 'txtTotalCompras',
          labelWidth : 200,
          fieldLabel : '<b>Total Compras </b>',
          readOnly : true,
          fieldStyle : 'text-align: right;font-size:15px;'
        }
      ],
      tbar : [
        {
          xtype : 'button',
          text : 'Nuevo',
          iconCls : 'add',
          id : 'btnNuevoCompra',
          handler : function(btn) {
            var frm = Ext.create('MyDesktop.app.views.CompraEditar',
                                 {animateTarget : btn.id});
            frm.show(this, function() {});

          }
        },
        '-',
        {
          xtype : 'button',
          text : 'Editar',
          iconCls : 'boton-edit',
          id : 'btnEditarCompra',
          handler : function(btn) {

            var grid = Ext.getCmp('dgvCompras');
            var record = grid.getSelectionModel().getSelection();
            if (record[0]) {
              var frm = Ext.create(
                  'MyDesktop.app.views.CompraModificar',
                  {animateTarget : btn.id, idcompra : record[0].get('id')});
              frm.show(this, function() {});
            } else {
              Ext.Msg.alert("Aviso", "Tiene que seleccionar una las compras!");
            }

          }
        },
        '-',
        {
          xtype : 'button',
          text : 'Anular',
          iconCls : 'remove',
          id : 'btnEliminarCompra',
          disabled : true,
          handler : function() {
            var grid = Ext.getCmp('dgvCompras');
            var selectedRecord = grid.getSelectionModel().getSelection()[0];
            Ext.Msg.show({
              title : 'Sistema',
              msg : 'Desea eliminar la compra seleccionada?',
              buttons : Ext.Msg.YESNO,
              icon : Ext.Msg.QUESTION,
              fn : function(id, value, opt) {
                if (id === 'yes') {
                  Ext.Ajax.request({
                    url : 'index.php/compras/eliminarcompra',
                    params : {
                      pidcompra : parseInt(selectedRecord.get('id')),
                      pusuario :  Ext.util.Cookies.get('idusuario')
                    },
                    success : function(conn, response, options, eOpts) {
                      var result =
                          MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                      if (result.success) {
                        Ext.each(result.items, function(item) {
                          if (item.ERROR > 0) {
                            Ext.getCmp('dgvCompras').getStore().reload();
                            Ext.getCmp('btnEliminarCompra').setDisabled(true);
                            Ext.getCmp('btnImprimirCompra').setDisabled(false);
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
              }
            });

          }
        },
        '-',
        {
          xtype : 'button',
          text : 'Imprimir',
          iconCls : 'boton-print',
          disabled : false,
          id : 'btnImprimirCompra',
          handler : function() {
            combo = Ext.getCmp('btnComboFiltroCompras');
            desde = Ext.getCmp('dpFechaCompraDesde');
            hasta = Ext.getCmp('dpFechaCompraHasta');
            if (desde != '' || hasta != '') {
              me.imprimirListadoDeIngresos(2, 0);
            } else {
              me.imprimirListadoDeIngresos(
                  combo.getValue(),
                  Ext.getCmp('txtBuscadorCompras').getValue());
            }

          }
        },
        '-',
        {
          xtype : 'button',
          text : 'Actualizar Lista',
          iconCls : 'icon-grid',
          id : 'btnActualizarListaCompra',
          listeners : {
            click : function() {
              Ext.getCmp('dgvCompras')
                  .getStore()
                  .load({
                    params : {
                      pdesde : null,
                      phasta : null,
                      pproveedor : null,
                      pnumerodoc : null,
                     psede : _mysede
                    }
                  });
              me.getCalcularTotalesListado(tipo, valor,_mysede);
            }
          }

        },

        {
          xtype : 'combobox',
          fieldLabel : 'Filtrar',
          id : 'btnComboFiltroCompras',
          flex : 0.5,
          labelWidth : 35,
          store : storefiltros,
          valueField : 'id',
          displayField : 'descripcion',
          emptyText : '----- Seleccionar ----',
          query : 'local',
          editable : false,
          listeners : {
            select : function(combo, record, index) {
              if (combo.getValue() == 0 || combo.getValue() == 1) {
                Ext.getCmp('txtBuscadorCompras').focus(true, 200);
                Ext.getCmp('txtBuscadorCompras').setDisabled(false);
                Ext.getCmp('txtBuscadorCompras').setValue('');
              } else {
                Ext.getCmp('txtBuscadorCompras').focus(false, 200);
                Ext.getCmp('txtBuscadorCompras').setDisabled(true);
                Ext.getCmp('txtBuscadorCompras').setValue('');
                var t = combo.getValue();
                var v = Ext.getCmp('txtBuscadorCompras').getValue();
                tipo = t;
                valor = v;
                me.filtrarGrillaCompras(t, v,_mysede);
                me.getCalcularTotalesListado(t, v,_mysede);
              }
            }
          }

        },
        {
          xtype : 'textfield',
          id : 'txtBuscadorCompras',
          hasfocus : true,
          disabled : true,
          flex : 0.7,
          listeners : {
            specialkey : function(f, e) {
              if (e.getKey() == e.ENTER) {
                var t = Ext.getCmp('btnComboFiltroCompras').getValue();
                var v = f.getValue();
                tipo = t;
                valor = v;
                me.filtrarGrillaCompras(t, v,_mysede);
                me.getCalcularTotalesListado(t, v,_mysede);
              }
            }
          }
        },
        '-',
        {
          xtype : 'textfield',
          fieldLabel : 'Desde',
          allowBlank : true,
          id : 'dpFechaCompraDesde',
          flex : 0.5,
          labelWidth : 90,
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'right',
          /*listeners : {
            keyup : function(f, e) {
              if (e.keyCode == 13) {
                filtrarGrillaContrato(-2, f.getValue());
              }
            }
          }*/
        },
        {
          xtype : 'textfield',
          fieldLabel : 'Hasta',
          allowBlank : true,
          id : 'dpFechaCompraHasta',
          flex : 0.5,
          labelWidth : 90,
          labelAlign : 'right',
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          /*listeners : {
            keyup : function(f, e) {
              if (e.keyCode == 13) {
                filtrarGrillaContrato(-2, f.getValue());
              }
            }
          }*/
        },
        {
          xtype : 'button',
          iconCls : 'x-ico-lupa',
          id : 'btnBuscarRangoFechasCompras',
          handler : function() {

            me.filtrarGrillaCompras(2, '',_mysede);

            Ext.Ajax.request({
              url : 'index.php/compras/totalcompras',
              params :
              { pdesde : Ext.getCmp('dpFechaCompraDesde').getValue(),
                phasta : Ext.getCmp('dpFechaCompraHasta').getValue(),
                pproveedor : null,
                pnumerodoc : null,
                psede : _mysede
              },
              success : function(conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                  var x = result.total;
                  Ext.util.Format.thousandSeparator = ',';
                  Ext.util.Format.decimalSeparator = '.';
                  x = Ext.util.Format.number(x, "0,000.000");
                  Ext.getCmp('txtTotalCompras').setValue(x);

                } else {
                  MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
                  return false;
                }

              },
              failure : function(conn, response, options, eOpts) {}
            });
          }
        }

        /*{
          xtype : 'textfield',
          fieldLabel : 'Buscar Fecha',
          id : 'txtBuscarFecha',
          allowBlank : true,
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          listeners : {
            specialkey : function(f, e) {
              if (e.getKey() == e.ENTER) {
                var v = f.getValue();
                tipo = 2;
                me.filtrarGrillaCompras(tipo, v);
                me.getCalcularTotalesListado(tipo, v);
              }
            }
          }
        }*/
      ]
    });
    this.getCalcularTotalesListado(-1, '',_mysede);
    tipo = -1;
    valor = '';
    this.callParent(arguments);

  },
  getCalcularTotalesListado : function(tipo, valor,sede) {
    
    var params;
    switch (tipo) {
    case -1:
      params = {pfechacompra : null, pproveedor : null, pnumerodoc : null,psede:sede};
      break;
    case 0:
      params = {pfechacompra : null, pproveedor : null, pnumerodoc : valor,psede:sede};
      break;
    case 1:
      params = {pfechacompra : null, pproveedor : valor, pnumerodoc : null,psede:sede};
      break;
    case 2:
      params = {pfechacompra : valor, pproveedor : null, pnumerodoc : null,psede:sede};
      break;
    }
    Ext.Ajax.request({
      url : 'index.php/compras/totalcompras',
      params : params,
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
        if (result.success) {
          var x = result.total;
          Ext.util.Format.thousandSeparator = ',';
          Ext.util.Format.decimalSeparator = '.';
          x = Ext.util.Format.number(x, "0,000.000");
          Ext.getCmp('txtTotalCompras').setValue(x);

        } else {
          MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
          return false;
        }

      },
      failure : function(conn, response, options, eOpts) {}
    });
  },
  filtrarGrillaCompras : function(tipo, valor,sede) {
    me = this;

    if (tipo == -1) { // Buscar Por Codigo

      storecompras.getProxy().extraParams = {
        pdesde : null,
        phasta : null,
        pproveedor : null,
        pnumerodoc : null,
        psede : sede

      };
      storecompras.loadPage(1);
      me.getCalcularTotalesListado(tipo, valor,sede);
      return false;
    }
    if (tipo == 0) { // Buscar Por Codigo

      storecompras.getProxy().extraParams = {
        pdesde : null,
        phasta : null,
        pproveedor : null,
        pnumerodoc : valor,
        psede : sede

      };
      storecompras.loadPage(1);

      me.getCalcularTotalesListado(tipo, valor,sede);

      return false;
    }
    if (tipo == 1) { // Buscar por Proveedor
      storecompras.getProxy().extraParams = {
        pdesde : null,
        phasta : null,
        pproveedor : valor,
        pnumerodoc : null,
        psede : sede

      };

      me.getCalcularTotalesListado(tipo, valor,sede);
    } else { // Fecha compra
      storecompras.getProxy().extraParams = {
        pdesde : Ext.getCmp('dpFechaCompraDesde').getValue(),
        phasta : Ext.getCmp('dpFechaCompraHasta').getValue(),
        pproveedor : null,
        pnumerodoc : null,
        psede : sede

      };


    }
    storecompras.loadPage(1);

  },
  imprimirListadoDeIngresos : function(tipo, valor) {
    /* var pfechacompra    = null;
     var pproveedor      = null;
     var pnumerodoc      = null;*/
    var _url = '';
    if (tipo == -1) { // Buscar Por Codigo
      pfechacompra = '';
      pproveedor = '', pnumerodoc = '';
      _url = 'reportes/imprimiringresoslistado?pfechacompra=' +
             '&pproveedor=' + pproveedor + '&pnumerodoc=' + pnumerodoc;
    }
    if (tipo == 0) { // Buscar Por Codigo
      pfechacompra = '';
      pproveedor = '';
      pnumerodoc = valor;
      _url = 'reportes/imprimiringresoslistado?pfechacompra=' +
             '&pproveedor=' + pproveedor + '&pnumerodoc=' + pnumerodoc;
    }
    if (tipo == 1) { // Buscar por Proveedor
      pfechacompra = '';
      pproveedor = valor;
      pnumerodoc = '';
      _url = 'reportes/imprimiringresoslistado?pfechacompra=' +
             '&pproveedor=' + pproveedor + '&pnumerodoc=' + pnumerodoc;
    } else if (tipo == 2) { // Fecha compra
      pdesde = Ext.getCmp('dpFechaCompraDesde').getValue();
      phasta = Ext.getCmp('dpFechaCompraHasta').getValue();
      pproveedor = '';
      pnumerodoc = '';
      _url = 'reportes/imprimiringresoslistado?pdesde=' + pdesde + '&phasta=' +
             phasta + '&pproveedor=' + pproveedor + '&pnumerodoc=' + pnumerodoc;
    }

    /* xpos=(screen.width/2)-(1000/2);
     ypos=(screen.height/2)-(600/2);
     my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,
     width=1000,height=600");
     my.moveTo(xpos, ypos);*/
    tabpanel = Ext.getCmp('tpContenedorApp');
    if (!tabpanel.getChildByElement('tabpdfreportedecompras')) {
      tabpanel.add({
        xtype : 'panel',
        closable : true,
        id : 'tabpdfreportedecompras',
        title : 'Reporte de Compras',
        layout : 'fit',
        items : [
          {
            xtype : 'uxiframe', // #3
            src : _url          // #4
          }
        ]
      });
    }
    tabpanel.setActiveTab('tabpdfreportedecompras');

  }
});
