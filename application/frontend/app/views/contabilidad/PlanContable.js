Ext.define('MyDesktop.app.views.contabilidad.PlanContable', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.wplancontable',
    layout : 'fit',
    id    : 'wplancontable',
    initComponent : function(){
        me = this;
        store = Ext.create('MyDesktop.app.stores.contabilidad.PlanContable');
   
        Ext.apply(me,{
            layout :{
                type : 'hbox',
                anchor: '100%'

            },
            items:[
                {
                    xtype : 'grid',
                    flex : 1,
                    id   : 'dgvPlanContable',
                    height : 650,
                    padding:'5 5 5 5',
                    sortableColumns : false,
                    store : store,
                    columns:[
                        {
                            text : 'Id',
                            dataIndex: 'actor_id',
                            flex : 0.5,
                            hidden : false

                        },
                        {
                            text : 'Codigo',
                            dataIndex: 'first_name',
                            flex : 1
                        },
                        {
                            text : 'Descripcion',
                            dataIndex : 'last_name',
                            flex : 2.5

                        },

                        {
                            xtype : 'actioncolumn',
                            width : 40,
                            align : 'center',
                            items :[
                                {
                                    iconCls :'remove',
                                    handler: function (grid, rowIndex, colIndex){
                                        var record  = grid.getStore().getAt(rowIndex);
                                        var x       = record.get('id');
                                       // FxEliminarProducto(x);
                                    }
                                }
                            ]
                        }

                    ]

                },// Fin de Grilla
                {
                    xtype  : 'panel',
                    border : false,
                    titleAlign : 'center',
                    flex   : 1,
                    layout : {
                        aling : 'stretch',
                        type  : 'fit'
                    },
                    height : 425,
                    bodyPadding : 4,
                    items: [
                        {
                            xtype: 'form',
                            id   :'myFormPlanContable',
                            frame : true,
                            bodyPadding: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            flex   : 2,
                            items :[
                                {
                                    xtype: 'fieldset',
                                    flex: 2,
                                    title: 'Detalle del Plan Contable',
                                    defaults: {
                                        anchor: '100%',
                                        xtype: 'textfield',
                                        allowBlank: true,
                                        labelWidth: 150
                                    },
                                    items :[
                                        {
                                            xtype: 'hiddenfield',
                                            name : 'id',
                                            id : 'txtIdProd',

                                        },
                                        {
                                            xtype:'label',
                                            width : 30,
                                            text  : 'Descripcion :',
                                            style : 'font-weight : bold;'
                                        },
                                        {
                                            id    : 'txtDesProd',
                                            name  : 'producto',
                                            fieldStyle:'text-transform:uppercase',

                                        },
                                        {
                                            xtype:'label',
                                            width : 30,
                                            text  : 'Unidad Medida :',
                                            style : 'font-weight : bold;'

                                        },
                                        {
                                            id    : 'txtUnidadMedProd',
                                            name  : 'unidadmedida',
                                            fieldStyle:'text-transform:uppercase',

                                        },
                                        {
                                            xtype:'label',
                                            width : 30,
                                            text  : 'Numero Unidad Medida :',
                                            style : 'font-weight : bold;'

                                        },
                                        {
                                            id    : 'txtNumUnidadMedProd',
                                            name  : 'numunidad',
                                            fieldStyle:'text-transform:uppercase',

                                        },

                                    ]
                                }
                            ],
                            bbar :[
                                {
                                    xtype : 'button',
                                    text  : 'Nuevo',
                                    iconCls : 'add',
                                    handler : function(){
                                        var frm  = Ext.getCmp('myFormProducto');
                                        frm.getForm().reset();
                                        Ext.getCmp('txtDesProd').focus();
                                        Ext.getCmp('txtIdProd').setValue(0);
                                    }
                                },
                                {
                                    xtype : 'button',
                                    text  : 'Guardar',
                                    iconCls : 'boton-save',
                                    handler:function(){
                                       // FxActualizarProducto();
                                    }
                                }


                            ]
                        }
                    ]
                }// fin panel detalle

            ]// Fin de Items
        });
        this.callParent(arguments);
    }

});