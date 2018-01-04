
Ext.define('MyDesktop.app.views.reportes.LiquidacionMedico', {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wliquidacionmedico',
  requires : [
    'MyDesktop.app.stores.StockActual',
    'Ext.ux.desktop.InputTextMask',
    'Ext.ux.IFrame'
  ],
  itemId : 'wliquidacionmedico',
  initComponent : function() {
    // storestockactual = Ext.create('MyDesktop.app.stores.StockActual');
    // storeProductos = Ext.create('MyDesktop.app.stores.Productos');
    //storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');
    storeMedicos = Ext.create('MyDesktop.app.stores.Medicos');
    storeMedicos.load({
      params:{
          ptipomedico:1,
          ptitulo : 'NIGUNO'
      }
    });
    var me = this;
    Ext.apply(me, {
      layout : 'fit',
      items : [],
      tbar : [
        {
          xtype : 'textfield',
          fieldLabel : '<b>Desde</b>',
          allowBlank : true,
          itemId:"rplDesde",
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'left',
          width : 180,

          listeners : {
            specialkey : function(f, e) {
              if (e.getKey() == e.ENTER){
              }
            }
          }
        },
        {
          xtype : 'textfield',
          fieldLabel : '<b>Hasta</b>',
          allowBlank : true,
          itemId:"rplHasta",

          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'left',
          width : 180,
          listeners : {
            specialkey : function(f, e) {
              if (e.getKey() == e.ENTER){
              }
            }
          }
        },
        {
          xtype : 'combobox',
          fieldLabel : '<b>Médico</b>',
          itemId : 'cboMedicoPago',
          labelAlign:'right',
          width:400,
          store : storeMedicos,
          queryMode : 'local',
          valueField : 'id',
          displayField : 'ncompleto',
          forceSelection : true,
          editable : false,
          emptyText : '----- SELECCIONAR MEDICO ------',
          labelWidth:50,
          value:1
        },
        {
          xtype : 'button',
          iconCls : 'x-ico-lupa',
          itemId : 'btnBuscarLiquidacionMed',
          handler : function() {

            Ext.ComponentQuery.query('#wliquidacionmedico')[0].mask('...cargando');
            var _fDesde = Ext.ComponentQuery.query('#rplDesde')[0].getValue();
            var _fHasta = Ext.ComponentQuery.query('#rplHasta')[0].getValue();
            var _mysede = Ext.util.Cookies.get('sede');
            var _medico  = Ext.ComponentQuery.query('#cboMedicoPago')[0].getValue();
            var _mednombre =Ext.ComponentQuery.query('#cboMedicoPago')[0].getRawValue();
            console.log(_mysede);

            var _url = 'reportes/reportepagomedicos?desde=' + _fDesde+'&hasta=' +_fHasta+' &sede='+_mysede+ '&medico='+ _medico+' &nombremedico='+ _mednombre ;
            var _rpt = Ext.ComponentQuery.query('#wliquidacionmedico')[0];
            _rpt.removeAll();
            _rpt.add({
              xtype : 'uxiframe', // #3
              src : _url          // #4
            });

            Ext.ComponentQuery.query('#wliquidacionmedico')[0].unmask();
          }
        }

      ]

    });

    this.callParent(arguments);

  },
});
