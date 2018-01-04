var tipo = 0;
var valor = null;

Ext.define('MyDesktop.app.views.StockIngresos', {
  extend : 'Ext.grid.Panel',
  alias : 'widget.wstockingresos',
  requires :
      [ 'MyDesktop.app.stores.StockActual', 'Ext.ux.desktop.InputTextMask' ],
  id : 'wstockingresos',
  initComponent : function() {
    storestockactual = Ext.create('MyDesktop.app.stores.StockActual');
    storeProductos = Ext.create('MyDesktop.app.stores.Productos');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');

    var autoLoadCompras =
    {
      /*Intervalo de tiempo de consulta 5 minutos
       *
       * 1 => segundo => 1000
       *
       * */
      run : function() {
        storestockactual.reload();

      },
      interval : 300000
    }

    // Ext.TaskManager.start(autoLoadCompras);

    var me = this;
    Ext.apply(me, {
      layout : 'fit',
      id : 'dgvStockActual',
      sortableColumns : false,
      store : storestockactual,
      columns : [

        {
          text : "PRODUCTO",
          flex : 1,
          sortable : false,
          dataIndex : '_producto',
          align : 'left'
        },

        {
          xtype : 'numbercolumn',
          text : "STOCK ACTUAL",
          flex : 0.5,
          sortable : false,
          dataIndex : '_stock',
          align : 'right',
          format:'0'

        },

      ],
      listeners : {itemclick : function(dv, record, item, index, e) {}},

      tbar : [
        {
          xtype : 'button',
          text : 'Imprimir',
          iconCls : 'boton-print',
          disabled : false,
          id : 'btnImprimirStockActual',
          handler : function() {
             me.imprimirReporteStockActual();
          }
        },
        '-',
        {
          xtype : 'combobox',
          fieldLabel : '<b>Sede</b>',
          id : 'cboSedeStock',
          labelAling : 'right',
          store : storetiendas,
          queryMode : 'local',
          displayField : 'descrip',
          valueField : 'id',
          forceSelection : true,
          editable : false,
          emptyText : '----- SELECCIONAR LA SEDE ------',
          width : 400

        },
        /*{
          xtype : 'textfield',
          fieldLabel : '<b>Desde</b>',
          allowBlank : true,
          id : 'dpFechaDesde',
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'right',
          width : 180,
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
        },
        {
          xtype : 'textfield',
          fieldLabel : '<b>Hasta</b>',
          allowBlank : true,
          id : 'dpFechaHasta',
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'right',
          width : 180,
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
        },*/
        {
          xtype : 'button',
          iconCls : 'x-ico-lupa',
          id : 'btnBuscarStock',
          width : 100,
        }

      ]

    });

    this.callParent(arguments);
    Ext.getCmp('btnBuscarStock').on('click', me.consultarStockDelProducto, this);
  },
  consultarStockDelProducto:function(){
    storestockactual.getProxy().extraParams = {
      pidsede : Ext.getCmp('cboSedeStock').getValue(),
      pidprod : 0
    };
    storestockactual.loadPage(1);
  },
  imprimirReporteStockActual : function() {

    var _url =
        'inventario/stockimprimir/' + Ext.getCmp('cboSedeStock').getValue().toString();
    xpos = (screen.width / 2) - (1000 / 2);
    ypos = (screen.height / 2) - (600 / 2);
    my =
        window.open(_url, "mywindow",
                    "location=1,status=1,scrollbars=1,  width=1000,height=600");
    my.moveTo(xpos, ypos);

  }
});
