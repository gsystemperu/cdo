/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.historia.Ingreso',{
    extend : 'Ext.panel.Panel',
    config:{
        id : 0
    },
    id : 'historiaingreso',
    alias: 'widget.historiaingreso',
    border:true,
    frame : true,
    initComponent:function(){
        me = this;
        Ext.applyIf(me,{
            layout: {
                type: 'vbox',
                align: 'stretch',
                padding: 10
            },
            defaults: {
                labelWidth: 150,
                xtype : 'textfield'

            },
            items : [
                {
                    xtype : 'textfield',
                    fieldLabel : 'Anamnesis',
                    id : 'txtAnamnesis'
                },
                {
                    xtype : 'container',
                    layout : 'hbox',
                    items : [
                        {
                           xtype  : 'label',
                           text  : 'Historia Ocular',
                           labelWidth:100
                        },
                        {
                            xtype :'container',
                            layout : 'hbox',
                            border :true,
                            /*defaults:{
                                labelWidth:200
                            },*/
                            items :[
                                {
                                    xtype : 'textfield',
                                    fieldLabel:'Desde cuando gafas?',
                                    width :200,
                                    labelAlign:'right'
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel:'Cual ha sido su progresion?',
                                    width :200,
                                    labelAlign:'right'
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel:'Enfermedades oculares?',
                                    width :200,
                                    labelAlign:'right'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldset',
                    title : 'HISTORIA FAMILIAR',
                    layout: 'fit',
                    items : [
                        {
                            xtype: 'checkboxgroup',
                            columns:7,
                            vertical: false,
                            items: [
                                { boxLabel: 'Estrabismo', name: 'rb', inputValue: '1' },
                                { boxLabel: 'Leucoma', name: 'rb', inputValue: '2' },
                                { boxLabel: 'Glaucoma', name: 'rb', inputValue: '3' },
                                { boxLabel: 'HiperArt.', name: 'rb', inputValue: '4' },
                                { boxLabel: 'Catarata', name: 'rb', inputValue: '5' },
                                { boxLabel: 'Ojo Seco', name: 'rb', inputValue: '6' },
                                { boxLabel: 'Diabetes', name: 'rb', inputValue: '7' },

                            ]
                        }
                    ]

                },
                {
                    xtype : 'fieldset',
                    title : 'HISTORIA QUIMICA',
                    items : [
                        {
                            xtype: 'checkboxgroup',
                            columns:2,
                            vertical: false,
                            items: [
                                { boxLabel: 'Azucar', name: 'rb', inputValue: '1' },
                                { boxLabel: 'Hipertension', name: 'rb', inputValue: '2' },
                            ]
                        }
                    ]

                },
                {
                    xtype : 'textfield',
                    fieldLabel : 'Tratamiento',
                    id : 'txtTratamiento'
                },
                {
                    xtype : 'textfield',
                    fieldLabel : 'Alergias Concidas',
                    id : 'txtAlergias'
                },
                {
                    xtype : 'textfield',
                    fieldLabel : 'Ultima Revision',
                    id : 'txtUtlRevision'
                },
                {
                    xtype : 'textfield',
                    fieldLabel : 'Recomendado por',
                    id :'txtRecomendado'
                },
                {
                    xtype : 'fieldset',
                    title : 'ANTECEDENTES PERSONALES',
                    layout: 'fit',
                    items : [
                        {
                            xtype: 'checkboxgroup',
                            columns:7,
                            vertical: false,
                            items: [
                                { boxLabel: 'Estrabismo', name: 'rb', inputValue: '1' },
                                { boxLabel: 'Leucoma', name: 'rb', inputValue: '2' },
                                { boxLabel: 'Glaucoma', name: 'rb', inputValue: '3' },
                                { boxLabel: 'HiperArt.', name: 'rb', inputValue: '4' },
                                { boxLabel: 'Catarata', name: 'rb', inputValue: '5' },
                                { boxLabel: 'Ojo Seco', name: 'rb', inputValue: '6' },
                                { boxLabel: 'Diabetes', name: 'rb', inputValue: '7' },


                            ]
                        }
                    ]

                },
                {
                    xtype : 'fieldset',
                    title : 'ANTIGUA GRADUACION',
                    layout: 'hbox',
                    defaults:{
                        xtype : 'textfield',
                        labelAlign:'right',
                        flex:1

                    },
                    items : [
                        {
                            fieldLabel: 'Tipo de cristal',
                            labelWidth:100
                        },
                        {
                            fieldLabel: 'Med.Cent.Cristales',
                            width:100
                        },
                        {
                            fieldLabel: 'Prisma',
                            labelWidth:50
                        },
                        {
                            fieldLabel: 'Adicion',
                            labelWidth:50
                        },
                        {
                            fieldLabel: 'Agudeza Visual'
                        }]
                }

            ]
        });
        me.callParent(arguments);
    }
});