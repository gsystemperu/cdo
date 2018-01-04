/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.Oftalmoscopia2_2', {
  extend : 'Ext.form.Panel',
  config : {id : 0},
  id : 'oftalmoscopiaingreso2_2',
  alias : 'widget.oftalmoscopiaingreso2_2',
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
          id : 'txtOftalmoNervioOptico2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'MACULA: Problemas en la Retina Central?',
          id : 'txtOftalmoMacula2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'VASOS SANGUINEOS: Venas y Arterias de la Retina',
          id : 'txtOftalmoVasosSanguineos2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'COLOR: Exceso de Pigmento?',
          id : 'txtOftalmoColor2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'REFLEJO FOVEAL',
          id : 'txtOftalmoReflejoForeal2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'MEDIOS REFRACTIVOS OJO',
          id : 'txtOftalmoMediosRefractivos2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'ESTADO DE RETINA PERIFERICA',
          id : 'txtOftalmoEstadoRetinaPeriferica2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'ESTADO DE RETINA CENTRAL',
          id : 'txtOftalmoEstadoRetinaCentral2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'RELACION C/D',
          id : 'txtOftalmoRelacionCd2_2',
          fieldStyle : 'text-transform:uppercase',
          anchor : '50%'
        }

      ]
    });
    me.callParent(arguments);
  }
});
