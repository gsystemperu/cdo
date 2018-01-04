/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.consultorio.Diagnostico',{
    extend : 'Ext.form.Panel',
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
                    xtype :'textareafield',
                    fieldLabel : 'Diagnostico',
                    id : 'txtDiagnosticoDiagnostico',
                    anchor : '70%',
                    fieldStyle: 'text-transform:uppercase',
                    height:120
                },
                {
                    xtype :'textarea',
                    fieldLabel : 'Tratamiento',
                    id : 'txtDiagnosticoTratamiento',
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
                    itemId:"dfDiagnosticoProximaCita",
                    id : 'dfDiagnosticoProximaCita',
                    allowBlank:false
                    
                },
                {
                    xtype:"checkboxfield",
                    id:"checkdiagnosticoProximacita",
                    itemId:"checkdiagnosticoProximacita",
                    boxLabel:"Proxima cita Automatica a un año de la consulta",
                    checked:true,
                    margin:"20 0 0 155"
                }
            ]
        });
        me.callParent(arguments);
        Ext.getCmp('checkdiagnosticoProximacita').on('change',this.cambiaEstado,this);
    },
    cambiaEstado:function(check, newValue, oldValue, eOpts ){

        gridonsultas=Ext.ComponentQuery.query("wconsultorio #dgvatencionespaciente")[0];
        record=gridonsultas.getSelectionModel().getSelection();
        console.log(record[0].data._fechacita);

        if(newValue){


                         var fecha=record[0].data._fechacita;
                         var arreglofecha=fecha.split("/");
                         fecha=arreglofecha[0]+"/"+arreglofecha[1]+"/"+(parseInt(arreglofecha[2])+1);
                         Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setRawValue(fecha);
                         Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(true);
                          

                      /* var fecha  =Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].getRawValue();
                       var arreglofecha=fecha.split("/");
                       fecha=arreglofecha[0]+"/"+arreglofecha[1]+"/"+(parseInt(arreglofecha[2])+1);
                       Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setRawValue(fecha);
                       Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(true);*/
        }else{


                         var fecha=record[0].data._fechacita;
                         Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setRawValue(fecha);
                         Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(false);

                       
                     /*  Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setValue(new Date());
                       Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(false);*/
        }
    }
});