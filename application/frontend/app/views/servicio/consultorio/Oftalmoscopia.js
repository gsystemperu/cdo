/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.consultorio.Oftalmoscopia', {
  extend : 'Ext.form.Panel',
  config : {id : 0},
  id : 'oftalmoscopiaingreso',
  alias : 'widget.oftalmoscopiaingreso',
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
          id : 'txtOftalmoNervioOptico',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'MACULA: Problemas en la Retina Central?',
          id : 'txtOftalmoMacula',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'VASOS SANGUINEOS: Venas y Arterias de la Retina',
          id : 'txtOftalmoVasosSanguineos',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'COLOR: Exceso de Pigmento?',
          id : 'txtOftalmoColor',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'REFLEJO FOVEAL',
          id : 'txtOftalmoReflejoForeal',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'MEDIOS REFRACTIVOS OJO',
          id : 'txtOftalmoMediosRefractivos',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'ESTADO DE RETINA PERIFERICA',
          id : 'txtOftalmoEstadoRetinaPeriferica',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'ESTADO DE RETINA CENTRAL',
          id : 'txtOftalmoEstadoRetinaCentral',
          fieldStyle : 'text-transform:uppercase',
          anchor : '100%'
        },
        {
          fieldLabel : 'RELACION C/D',
          id : 'txtOftalmoRelacionCd',
          fieldStyle : 'text-transform:uppercase',
          anchor : '50%'
        }

      ]
    });
    me.callParent(arguments);
  }
});
