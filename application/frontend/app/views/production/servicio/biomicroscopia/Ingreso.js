/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.biomicroscopia.Ingreso',{
    extend : 'Ext.panel.Panel',
    config:{
        id : 0
    },
    id : 'biomicroscopiaingreso',
    alias: 'widget.biomicroscopiaingreso',
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
            items : [
                {
                    xtype : 'label',
                    text:'PATOLOGIAS DEL OJO',
                    labelAlign:'center',
                    padding:2
                },{
                    xtype:'panel',
                    title:'Conducto Lagrimal',
                    frame:true,
                    layout:'fit',
                    items:[
                        {
                            xtype: 'radiogroup',
                            columns:7,
                            vertical: false,
                            items: [
                                { boxLabel: 'Permeable', name: 'rb', inputValue: '1' },
                                { boxLabel: 'SemiPermeable', name: 'rb', inputValue: '2' },
                                { boxLabel: 'Ostruido', name: 'rb', inputValue: '7' },

                            ]
                        }
                    ]
                },{
                    xtype:'panel',
                    frame:true,
                    layout:'hbox',
                    items:[
                        {
                           xtype:'panel',
                           flex:1,
                           title:'Cantidad de Lagrima',
                           border:false,
                           bodyPadding:'10',
                           items:[
                               {
                                   xtype:'textfield',
                                   fieldLabel:'mm',
                                   id : 'txtCantLagrima'
                               }

                           ]
                        },
                        {
                            xtype:'panel',
                            flex:1,
                            title:'Test de Shirmer',
                            border:false,
                            bodyPadding:'10',
                            items:[
                                {
                                    xtype:'textfield',
                                    fieldLabel:'mm',
                                    id : 'txtTestShirmer'
                                }

                            ]
                        }

                    ]
                },
                {
                    xtype : 'container',
                    layout : 'hbox',
                    padding: '10 0 0 0',
                    defaults:{
                        labelAlign:'right'
                    },
                    bodyPadding:'5',
                    items:[
                        {
                            xtype : 'textfield',
                            fieldLabel:'Parpados Estado'
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel:'Ptosis'
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel:'Posion'
                        }
                    ]
                },
                {
                    xtype : 'container',
                    layout : 'hbox',
                    padding: '10 0 10 0',
                    defaults:{
                        labelAlign:'right'
                    },
                    bodyPadding:'5',
                    items:[
                        {
                            xtype : 'textfield',
                            fieldLabel:'Conjuntiva'
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel:'Cornea'
                        }
                    ]
                },
                {
                    xtype : 'panel',
                    layout : 'hbox',
                    bodyPadding:'10',
                    frame:true,
                    title : 'Cristalino : Catarata ?',
                    defaults:{
                        labelAlign:'right'
                    },
                    items : [
                        {
                            xtype : 'textfield',
                            flex: 0.5
                        },
                        {
                            xtype : 'textfield',
                            flex: 3
                        }
                    ]

                },
                {
                    xtype : 'textfield',
                   labelWidth:500,
                    fieldLabel:'Angulo Irido-Corneal : Es estrecha la salida del humor acuosio en la camara anterior ?'
                },
                {
                    xtype : 'textfield',
                    fieldLabel:'Esclerotica'
                },
                {
                    xtype : 'textfield',
                    fieldLabel:'Iris'
                }


            ]
        });
        me.callParent(arguments);
    }
});