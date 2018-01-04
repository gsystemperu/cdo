Ext.define('MyDesktop.app.views.ExportarExcel', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.wexportarexcel',
    id : 'wexportarexcel',
    initComponent : function(){
        me = this;
        Ext.apply(me,{
          layout:'hbox',
          bodyPadding:15,
          items:[
            {
              xtype : 'textfield',
              fieldLabel : '<b>Fecha  :</b>',
              allowBlank : true,
              id : 'dpFecha',
              itemId:"dpFecha",
              plugins : [ new Ext.ux.desktop.InputTextMask('99-99-9999') ],
              enableKeyEvents : true,
              labelAlign : 'right',
              labelWidth:90,
              width : 170,
              format:"dd-mm-YYYY",
              margin:"0 0 0 -40",
              value : MyDesktop.app.util.Util.getFechaActualf2()
            },
            {
              xtype:'button',
              id:'btnExportarCumple',
              text : 'Exportar Cumpleaños'
            },
            {
              xtype:'button',
              id:'btnExportarProximaCita',
              text : 'Exportar Proximas Citas'
            }
          ]
          });
        this.callParent(arguments);
        Ext.getCmp('btnExportarCumple').on('click', me.exportarExcelCumpleanios,this);
        Ext.getCmp('btnExportarProximaCita').on('click', me.exportarExcelProximasCitas,this);
    },
    exportarExcelCumpleanios: function(){

      _url = 'reportes/exportacumpleanios/' + Ext.getCmp('dpFecha').getValue();
      my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=800,height=400");


    },
    exportarExcelProximasCitas: function(){
      _url = 'reportes/exportaproximascitas/' + Ext.getCmp('dpFecha').getValue();
      my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=800,height=400");

    }

});

