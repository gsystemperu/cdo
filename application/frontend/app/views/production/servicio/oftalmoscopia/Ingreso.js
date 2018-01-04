/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.oftalmoscopia.Ingreso',{
    extend : 'Ext.panel.Panel',
    config:{
        id : 0
    },
    id : 'oftalmoscopiaingreso',
    alias: 'widget.oftalmoscopiaingreso',
    border:true,
    frame : true,
    initComponent:function(){
        var me = this;
        Ext.applyIf(me,{
            layout: {
                type: 'vbox',
                align: 'stretch',
                padding: '10'
            },
            defaults: {
                labelWidth: 300,
                xtype : 'textfield',
                padding:'5 5 5 5'

            },
            items : [
                {
                    fieldLabel : 'PAPILA :¿Como esta la entrada del nervio optico?',
                    id : 'txtNervioOptico'
                },
                {
                    fieldLabel : 'MACULA: ¿Problemas en la Retina Central?',
                    id : 'txtMacula'
                },
                {
                    fieldLabel : 'VASOS SANGUINEOS: Venas y Arterias de la Retina',
                    id : 'txtVasosSanguineos'
                },
                {
                    fieldLabel : 'COLOR: ¿Exceso de Pigmento?',
                    id : 'txtColor'
                },
                {
                    fieldLabel : 'REFLEJOFOREAL',
                    id : 'txtReflejoForeal'
                },
                {
                    fieldLabel : 'MEDIOS REFRACTIVOS OJO',
                    id : 'txtMediosRefractivos'
                },
                {
                    fieldLabel : 'ESTADO DE RETINA PERIFERICA',
                    id : 'txtEstadoRetinaPeriferica'
                },
                {
                    fieldLabel : 'ESTADO DE RETINA CENTRAL',
                    id : 'txtEstadoRetinaCentral'
                },
                {
                    fieldLabel : 'RELACION C/D',
                    id : 'txtRelacionCd'
                }

            ]
        });
        me.callParent(arguments);
    }
});
