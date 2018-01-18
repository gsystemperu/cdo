
Ext.define('MyDesktop.app.views.reportes.ListadoDeCaja', {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wlistadocaja',
  requires : [
    'MyDesktop.app.stores.StockActual',
    'Ext.ux.desktop.InputTextMask',
    'Ext.ux.IFrame'
  ],
  id : 'wlistadocaja',
  initComponent : function() {
    // storestockactual = Ext.create('MyDesktop.app.stores.StockActual');
    // storeProductos = Ext.create('MyDesktop.app.stores.Productos');
    storetiendas = Ext.create('MyDesktop.app.stores.Tiendas');

    var me = this;
    Ext.apply(me, {
      layout : 'fit',
      items : [],
      tbar : [
        {
          xtype : 'textfield',
          fieldLabel : '<b>Fecha</b>',
          allowBlank : true,
          id : 'dpFecha',
          itemId:"dpFecha",
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
          fieldLabel : '<b>Sede</b>',
          id : 'cboSede',
          labelAlign:'right',
          width:400,
          store : storetiendas,
          queryMode : 'local',
          displayField : 'descrip',
          valueField : 'id',
          forceSelection : true,
          editable : false,
          emptyText : '----- SELECCIONAR LA SEDE ------',
          labelWidth:50,
          value:1
        },
        {
          xtype : 'numberfield',
          fieldLabel : '<b>Salto Inicial</b>',
          id : 'txtSaldoInicial',
          enableKeyEvents : true,
          labelAlign : 'left',
          width : 180,
          labelWidth : 80,
          labelAlign:'right',
          fieldStyle : 'text-align:right',
          decimalPrecision : 2,
          step : 0.01,
          decimalSeparator : '.',
          currencySymbol : 'S/. ',
          value : 0.0
        },
        {
          xtype : 'numberfield',
          fieldLabel : '<b>Salto Inicial Notas</b>',
          id : 'txtSaldoInicialNotas',
          enableKeyEvents : true,
          labelAlign : 'left',
          width : 200,
          labelWidth : 120,
          labelAlign:'right',
          fieldStyle : 'text-align:right',
          decimalPrecision : 2,
          step : 0.01,
          decimalSeparator : '.',
          currencySymbol : 'S/. ',
          value : 0.0
        },
        {
          xtype : 'button',
          iconCls : 'x-ico-lupa',
          id : 'btnBuscarListadoCaja',
          handler : function() {
            var _fecha = Ext.getCmp('dpFecha').getValue();
            var _saldo_inicial = Ext.getCmp('txtSaldoInicial').getValue();
            var _saldo_inicial_notas = Ext.getCmp('txtSaldoInicialNotas').getValue();
            var _sede =Ext.getCmp('cboSede').getValue();
            if(_sede==null)
            {Ext.Msg.alert('Error','Tiene que seleccionar el local!');return false;}
            var _rpt = Ext.getCmp('wlistadocaja');
            var _url = 'reportes/reportelistacajaventas?pfecha=' + _fecha+'&psede='+_sede + '&psaldoinicial='+ _saldo_inicial+'&saldoinicialnotas='+_saldo_inicial_notas;
            _rpt.removeAll();
            _rpt.add({
              xtype : 'uxiframe', // #3
              src : _url          // #4
            });
          }
        }

      ]

    });

    this.callParent(arguments);

  },
});
