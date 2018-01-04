/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.Historia2', {
    extend: 'Ext.form.Panel',
    config: {id: 0},
    id: 'historiaingreso2',
    alias: 'widget.historiaingreso2',
    border: true,
    frame: true,
    initComponent: function () {
        me = this;
        Ext.applyIf(me, {
            defaults: {
                labelWidth: 150,
                xtype: 'textfield'

            },
            layout: {type: 'anchor', padding: 10},
            autoScroll: true,
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Anamnesis',
                    id: 'txtHistoriaAnamnesis2',
                    anchor: '100%'

                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {xtype: 'label', text: 'Historia Ocular', labelWidth: 100},
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            border: true,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Desde cuando gafas?',
                                    width: 200,
                                    labelAlign: 'right',
                                    id: 'txtHistoriaDesdeGafas2'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cual ha sido su progresion?',
                                    width: 200,
                                    labelAlign: 'right',
                                    id: 'txtHistoriaProgreso2'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Enfermedades oculares?',
                                    width: 200,
                                    labelAlign: 'right',
                                    id: 'txtHistoriaEnfermedad2'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'HISTORIA FAMILIAR',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            id: 'chkgHistoriaFamiliar2',
                            columns: 7,
                            vertical: false,
                            items: [
                                {boxLabel: 'Estrabismo', name: '1', inputValue: '1'},
                                {boxLabel: 'Leucoma', name: '2', inputValue: '2'},
                                {boxLabel: 'Glaucoma', name: '3', inputValue: '3'},
                                {boxLabel: 'HiperArt.', name: '4', inputValue: '4'},
                                {boxLabel: 'Catarata', name: '5', inputValue: '5'},
                                {boxLabel: 'Ojo Seco', name: '6', inputValue: '6'},
                                {boxLabel: 'Diabetes', name: '7', inputValue: '7'},
                            ]
                        }
                    ]

                },
                {
                    xtype: 'fieldset',
                    title: 'ANTECEDENTES PERSONALES',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            id: 'chkgAtecedentes2',
                            columns: 7,
                            vertical: false,
                            items: [
                                {boxLabel: 'Estrabismo', name: '1', inputValue: '1'},
                                {boxLabel: 'Leucoma', name: '2', inputValue: '2'},
                                {boxLabel: 'Glaucoma', name: '3', inputValue: '3'},
                                {boxLabel: 'HiperArt.', name: '4', inputValue: '4'},
                                {boxLabel: 'Catarata', name: '5', inputValue: '5'},
                                {boxLabel: 'Ojo Seco', name: '6', inputValue: '6'},
                                {boxLabel: 'Diabetes', name: '7', inputValue: '7'}

                            ]
                        }
                    ]

                },
                {
                    xtype: 'fieldset',
                    title: 'HISTORIA QUIMICA',
                    hidden: true,
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            id: 'chkgHistoriaQuimica2',
                            columns: 2,
                            vertical: false,
                            items: [
                                {boxLabel: 'Azucar', name: '1', inputValue: '1'},
                                {boxLabel: 'Hipertension', name: '2', inputValue: '2'}
                            ]
                        }
                    ]

                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Tx. Actual',
                    id: 'txtHistoriaTratamiento2',
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Alergias',
                    id: 'txtHistoriaAlergias2',
                    anchor: '100%'
                },
                {
                    xtype: "container",
                    hidden: false,
                    layout: {
                        type: "hbox"

                    },
                    items: [
                        {
                            xtype: "fieldset",
                            title: "Vision",
                            hidden: false,
                            items: [
                                {
                                    xtype: "container",
                                    margin: "0 0 10 0",
                                    layout: {
                                        type: "hbox"
                                    },
                                    items: [
                                        {
                                            xtype: "label",
                                            text: "OD",
                                            margin: "23 0 0 0"
                                        },
                                        {
                                            xtype: "textfield",
                                            fieldLabel: "SC",
                                            labelAlign: "top",
                                            width: 50,
                                            id: "ojodere_sc2",
                                            fieldStyle: 'text-transform:uppercase',
                                            margin: "0 0 0 20"
                                        },
                                        {
                                            xtype: "textfield",
                                            fieldLabel: "CC",
                                            labelAlign: "top",
                                            width: 50,
                                            id: "ojodere_cc2",
                                            fieldStyle: 'text-transform:uppercase',
                                            margin: "0 0 0 10"

                                        },
                                        {
                                            xtype: "textfield",
                                            fieldLabel: "AE",
                                            labelAlign: "top",
                                            width: 50,
                                            id: "ojodere_ae2",
                                            fieldStyle: 'text-transform:uppercase',
                                            margin: "0 0 0 10"
                                        }
                                    ]
                                },
                                {
                                    xtype: "container",
                                    margin: "0 0 10 0",
                                    layout: {
                                        type: "hbox"
                                    },
                                    items: [
                                        {
                                            xtype: "label",
                                            text: "OI",
                                            margin: "0 0 0 0"
                                        },
                                        {
                                            xtype: "textfield",
                                            labelAlign: "top",
                                            width: 50,
                                            margin: "0 0 0 24",
                                            fieldStyle: 'text-transform:uppercase',
                                            id: "ojoizq_sc2"
                                        },
                                        {
                                            xtype: "textfield",
                                            labelAlign: "top",
                                            width: 50,
                                            margin: "0 0 0 10",
                                            fieldStyle: 'text-transform:uppercase',
                                            id: "ojoizq_cc2"

                                        },
                                        {
                                            xtype: "textfield",
                                            labelAlign: "top",
                                            width: 50,
                                            margin: "0 0 0 10",
                                            fieldStyle: 'text-transform:uppercase',
                                            id: "ojoizq_ae2"
                                        }
                                    ]
                                }




                            ]

                        },
                        {
                            xtype: "fieldset",
                            margin: "0 0 0 20",
                            padding: "5 10 0 10",
                            title: "Ultima Refraccion",
                            items: [
                                {
                                    xtype: "container",
                                    layout: {
                                        type: "vbox"
                                    },
                                    items: [
                                        {
                                            xtype: "container",
                                            layout: {
                                                type: "vbox"
                                            },
                                            items: [
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel: "OD",
                                                    labelWidth: 80,
                                                    width: 120,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    id: "ultimarefraccion_od2"

                                                },
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel: "OI",
                                                    labelWidth: 80,
                                                    width: 120,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    id: "ultimarefraccion_oi2"
                                                },
                                                {
                                                    xtype: "textfield",
                                                    fieldLabel: "ADD",
                                                    labelWidth: 80,
                                                    width: 120,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    id: "ultimarefraccion_add2"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]

                        }
                    ]
                }


                ,
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ultima Revision',
                    id: 'txtHistoriaUtlRevision2',
                    anchor: '100%',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Recomendado por',
                    id: 'txtHistoriaRecomendado2',
                    anchor: '100%'
                },
                {
                    xtype: 'fieldset',
                    title: 'ANTIGUA GRADUACION',
                    layout: 'hbox',
                    padding: "0 5 10 0",
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        width: 160

                    },
                    items: [
                        {
                            fieldLabel: 'Tipo de cristal',
                            labelWidth: 80,
                            id: 'txtHistoriaTipoCristal2'
                        },
                        {
                            fieldLabel: 'Med.Cent.Cristales',
                            labelWidth: 100,
                            id: 'txtHistoriaCristales2'

                        },
                        {
                            fieldLabel: 'Prisma',
                            labelWidth: 50,
                            id: 'txtHistoriaPrisma2'
                        },
                        {
                            fieldLabel: 'Adicion',
                            labelWidth: 50,
                            id: 'txtHistoriaAdicion2'
                        },
                        {
                            fieldLabel: 'Agudeza Visual',
                            id: 'txtHistoriaAgudeza2',
                            labelwidth: 80
                        }
                    ]
                }

            ]
        });
        me.callParent(arguments);
    }
});
