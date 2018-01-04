
Ext.define('MyDesktop.app.views.reportes.ListadoDePaciente', {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wlistadopaciente',
  requires : [
    'MyDesktop.app.stores.StockActual',
    'Ext.ux.desktop.InputTextMask',
    'Ext.ux.IFrame'
  ],
  id : 'wlistadopaciente',
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
        xtype:"label",
        text:'Fecha',
        style:{
          color:"black",
          fontWeight:"bold"
        }
      },
        {
          xtype : 'textfield',
          fieldLabel : '<b>Del</b>',
          allowBlank : true,
          id : 'dpFechaDel',
          itemId:"dpFechaDel",
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'right',
          labelWidth:80,
          width : 160,

          listeners : {
            specialkey : function(f, e) {
              if (e.getKey() == e.ENTER) {
              }
            }
          }
        },
        {
          xtype : 'textfield',
          fieldLabel : '<b>Al</b>',
          allowBlank : true,
          id : 'dpFechaAl',
          itemId:"dpFechaAl",
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'right',
          labelWidth:80,
          width : 160,

          format:"dd/mm/YYYY",
          margin:"0 0 0 -40",
          listeners : {
            specialkey : function(f, e) {
              if (e.getKey() == e.ENTER) {
              }
            }
          }
        },

        {
          xtype : 'combobox',
          fieldLabel : '<b>Sede</b>',
          id : 'cboSedeReportePaciente',
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
        }
     /*   ,
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
*/
    ,
        {
          xtype : 'button',
          iconCls : 'x-ico-lupa',
          id : 'btnBuscarListadoCajaReportePaciente',
          handler : function() {

            var _fechadel = Ext.getCmp('dpFechaDel').getValue();
            var _fechaal=Ext.getCmp("dpFechaAl").getValue();
           // var _saldo_inicial = Ext.getCmp('txtSaldoInicial').getValue();
            var _sede =Ext.getCmp('cboSedeReportePaciente').getValue();

            if(_sede==null)
            {Ext.Msg.alert('Error','Tiene que seleccionar el local!');return false;}
            var _url = 'reportes/imprimirPacientePorFechaYSede?fechadel='+_fechadel+"&fechaal="+_fechaal+"&sedeid="+_sede;
            var _rpt = Ext.getCmp('wlistadopaciente');
            _rpt.removeAll();
            _rpt.add({
              xtype : 'uxiframe', // #3
              src : _url          // #4
            });

          }
        },
        {
            xtype:"button",
            text:"Exportar a Excel",
            id:"btnExportarPacienteAExcel",
            itemId:"btnExportarPacienteAExcel",
            iconCls:"x-ico-excel"
        }

      ]

    });

    this.callParent(arguments);

  },
});
