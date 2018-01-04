
Ext.define('MyDesktop.app.views.reportes.ListadoDeCajaCompra', {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wlistadocajacompra',
  requires : [ 'Ext.ux.desktop.InputTextMask', 'Ext.ux.IFrame' ],
  id : 'wlistadocajacompra',
  initComponent : function() {
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
          id : 'dpFechaCompra',
          itemId:"dpFechaCompra",
          plugins : [ new Ext.ux.desktop.InputTextMask('99/99/9999') ],
          enableKeyEvents : true,
          labelAlign : 'left',
          width : 180,
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
          id : 'cboSedeRpt2',
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
          xtype : 'button',
          iconCls : 'x-ico-lupa',
          id : 'btnBuscarListadoCajaCompra',
          handler : function() {
            var _fecha = Ext.getCmp('dpFechaCompra').getValue();
            var _sede =Ext.getCmp('cboSedeRpt2').getValue();
            if(_sede==null)
            {Ext.Msg.alert('Error','Tiene que seleccionar el local!');return false;}
            var _url = 'reportes/reportelistacajacompras?pfecha=' + _fecha+'&psede='+_sede;
            var _rpt = Ext.getCmp('wlistadocajacompra');
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
