/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.Biomicroscopia2', {
    extend: 'Ext.form.Panel',
    config: {id: 0},
    id: 'biomicroscopiaingreso2',
    alias: 'widget.biomicroscopiaingreso2',
    border: true,
    frame: true,
    initComponent: function () {
        me = this;
        Ext.applyIf(me, {
            layout: {type: 'vbox', align: 'stretch', padding: 5},
            autoScroll:true,
            defaults: {
                labelWidth: 150,
                xtype: 'textfield',
                style: 'font-size:15px;'

            },
            items: [
                {
                    xtype: 'label',
                    text: '',
                    labelAlign: 'center',
                    padding: 2,
                    hidden: true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    padding: '10 0 0 0',
                    // defaults : {labelAlign : 'right'},
                    bodyPadding: '10',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Parpados',
                            id: 'txtBiocroscopiaParpadosEstado2',
                            width: 700,
                            labelWidth: 70

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Ptosis',
                            id: 'txtBiocroscopiaPtosis2',
                            width: 130,
                            labelWidth: 50,
                            margin: "0 0 0 10"
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Posion',
                            id: 'txtBiocroscopiaPosion2',
                            width: 180,
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    padding: '5 0 0 0',
                    //defaults : {labelAlign : 'right'},
                    bodyPadding: '10',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Conjuntiva',
                            id: 'txtBiocroscopiaConjuntiva2',
                            width: 700,
                            labelWidth: 70
                        }

                    ]
                },
                {
                    xtype: "container",
                    layout: "hbox",
                    padding: "5 0 0 0",
                    bodyPadding: "10",
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cornea',
                            id: 'txtBiocroscopiaCornea2',
                            width: 700,
                            labelWidth: 70
                        }

                    ]
                },
                {
                    xtype: "container",
                    layout: "hbox",
                    padding: "5 0 0 0",
                    bodyPadding: "10",
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Iris',
                            id: 'txtBiocroscopiaIris2',
                            width: 700,
                            labelWidth: 70
                        }

                    ]
                },
                {
                    xtype: "container",
                    layout: "hbox",
                    padding: "5 0 10 0",
                    bodyPadding: "10",
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cristalino',
                            id: 'txtBiocroscopiaCristalinoDes2',
                            width: 700,
                            labelWidth: 70
                        }

                    ]
                },
                
                
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyPadding: '10',
                    frame: true,
                    title: 'Cristalino : Catarata ?',
                    hidden: true,
                    /*  defaults:{
                     labelAlign:'right'
                     },*/
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txtBiocroscopiaCristalinoCod2',
                            width: 50
                        },
                        {xtype: 'label', text: '', width: 10},
                        {
                            xtype: 'textfield',
                         //   id: 'txtBiocroscopiaCristalinoDes',
                            width: 400
                        }
                    ]

                },
                
                
                {
                    xtype: 'textfield',
                    labelWidth: 500,
                    fieldLabel:
                            'Angulo Irido-Corneal : Es estrecha la salida del humor acuosio en la camara anterior ?',
                    anchor: '70%',
                    id: 'txtAnguloIridoCorneal2'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Esclerotica',
                    id: 'txtBiocroscopiaEsclerotica2',
                    anchor: '25%'
                }
                ,
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Iris',
//                    id: 'txtBiocroscopiaIris',
//                    anchor: '25%'
//                },



                {
                  
                  xtype:"fieldset",
                  title:"PIO",
                  padding:"10",
                  width:160,
                  layout:{
                      type:"vbox"
                  },
                  items:[
                      {
                          xtype:"textfield",
                          fieldLabel:"OD",
                          width:80,
                          labelWidth:30,
                          id:"txtpio_od2",
                          fieldStyle: 'text-transform:uppercase'
                          
                          
                      },
                      {
                          xtype:"textfield",
                          fieldLabel:"OI",
                          width:80,
                          labelWidth:30,
                          fieldStyle: 'text-transform:uppercase',
                          id:"txtpio_id2"
                      }
                  ]
                    
                },
                {
                    xtype: 'panel',
                    title: 'Conducto Lagrimal',
                    frame: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 7,
                            vertical: false,
                            id: 'rbConductoLagrimal2',
                            items: [
                                
                                {
                                    boxLabel: 'Permeable',
                                    name: 'op',
                                    inputValue: '1', 'id': 'optPermeable2'
                                },
                                {
                                    boxLabel: 'SemiPermeable',
                                    name: 'op',
                                    inputValue: '2', 'id': 'optSemiPermeable2'
                                },
                                {
                                    boxLabel: 'Obstruido',
                                    name: 'op',
                                    inputValue: '3', 'id': 'Ostruido2'
                                },
                                {
                                    boxLabel: 'N.A.',
                                    name: 'op',
                                    inputValue: '0',
                                    id: 'opt_na2',
                                    checked:true
                                }

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 400,
                    layout: 'hbox',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            title: 'Cantidad de Lagrima',
                            border: false,
                            frame: true,
                            // bodyPadding:'5',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'mm',
                                    id: 'txtBiocroscopiaCantLagrima2',
                                    width: 150,
                                    labelWidth: 100
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Test de Shirmer',
                            border: false,
                            frame: true,
                            // bodyPadding:'5',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'mm',
                                    id: 'txtBiocroscopiaTestShirmer2',
                                    width: 150,
                                    labelWidth: 100
                                }

                            ]
                        }

                    ]
                },
            ]
        });
        me.callParent(arguments);
    }
});
