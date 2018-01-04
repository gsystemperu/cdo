/**
 * Created by Eddy on 28/07/15.
 */
Ext.define("MyDesktop.app.views.consulta.Diagnostico2",{
    extend : 'Ext.form.Panel',
    config:{
        id : 0
    },
    id : 'diagnosticoingreso2',
    alias: 'widget.diagnosticoingreso2',
    border:true,
    frame : true,
    initComponent:function(){
       var me = this;
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
                    xtype :'textareafield',
                    fieldLabel : 'Diagnostico',
                    id : 'txtDiagnosticoDiagnostico2',
                    anchor : '70%',
                    fieldStyle: 'text-transform:uppercase',
                    height:120
                },
                {
                    xtype :'textarea',
                    fieldLabel : 'Tratamiento',
                    id : 'txtDiagnosticoTratamiento2',
                    anchor : '70%',
                    fieldStyle: 'text-transform:uppercase',
                    height:120
                },

                {
                    xtype : 'datefield',
                    editable:false,
                    fieldLabel:'Proxima Cita',
                    value: new Date(),
                    format:"d/m/Y",
                    itemId:"dfDiagnosticoProximaCita2",
                    id : 'dfDiagnosticoProximaCita2',
                    allowBlank:false
                    
                },
                {
                    xtype:"checkboxfield",
                    id:"checkdiagnosticoProximacita2",
                    itemId:"checkdiagnosticoProximacita2",
                    boxLabel:"Proxima cita Automatica a un año de la consulta",
                    checked:true,
                    margin:"20 0 0 155"
                }
            ]
        });
       me.callParent(arguments);
       
    }
    
    
 
    
});