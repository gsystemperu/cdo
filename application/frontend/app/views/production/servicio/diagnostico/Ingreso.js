/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.diagnostico.Ingreso',{
    extend : 'Ext.panel.Panel',
    config:{
        id : 0
    },
    id : 'diagnosticoingreso',
    alias: 'widget.diagnosticoingreso',
    border:true,
    frame : true,
    initComponent:function(){
        me = this;
        Ext.applyIf(me,{
            layout: {
                type: 'vbox',
                align: 'stretch',
                padding: 5
            },
            defaults: {
                labelWidth: 150,
                xtype : 'textfield',
                style:'font-size:15px;'

            },
            items:[
                {
                    xtype :'textarea',
                    fieldLabel : 'Diagnostico'
                },
                {
                    xtype :'textarea',
                    fieldLabel : 'Tratamiento'
                },
                {
                    xtype : 'datefield',
                    editable:false,
                    fieldLabel:'Proxima Cita',
                    value: new Date()
                }
            ]
        });
        me.callParent(arguments);
    }
});