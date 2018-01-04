/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.Oftalmoscopia2_1', {
  extend : 'Ext.form.Panel',
  config : {id : 0},
  id : 'oftalmoscopiaingreso2_1',
  alias : 'widget.oftalmoscopiaingreso2_1',
  border : true,
  frame : true,
  initComponent : function() {
    var me = this;
    Ext.applyIf(me, {
      layout : {type : 'vbox', align : 'stretch', padding : '10'},
      defaults : {
        labelWidth : 300,
        xtype : 'textfield',
        padding : '5 5 5 5'

      },
      items : [
        {
          fieldLabel : 'PAPILA :Como esta la entrada del nervio optico?',
          id : 'txtOftalmoNervioOptico2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'MACULA: Problemas en la Retina Central?',
          id : 'txtOftalmoMacula2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'VASOS SANGUINEOS: Venas y Arterias de la Retina',
          id : 'txtOftalmoVasosSanguineos2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'COLOR: Exceso de Pigmento?',
          id : 'txtOftalmoColor2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'REFLEJO FOVEAL',
          id : 'txtOftalmoReflejoForeal2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'MEDIOS REFRACTIVOS OJO',
          id : 'txtOftalmoMediosRefractivos2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'ESTADO DE RETINA PERIFERICA',
          id : 'txtOftalmoEstadoRetinaPeriferica2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'ESTADO DE RETINA CENTRAL',
          id : 'txtOftalmoEstadoRetinaCentral2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'RELACION C/D',
          id : 'txtOftalmoRelacionCd2_1',
          fieldStyle : 'text-transform:uppercase',
          anchor : '50%'
        }

      ]
    });
    me.callParent(arguments);
  }
});
