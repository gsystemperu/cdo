Ext.define('MyDesktop.app.views.inventario.Contenedor', {
    extend: 'Ext.tab.Panel',
    alias : 'widget.wcontenedor',
    id    : 'wcontenedor',
    layout : 'fit',
    requires: [
    	'MyDesktop.app.views.inventario.Inventario'
    ],
    initComponent : function(){
    	me = this;
    	Ext.apply(me,{
    		items :[
    				{
    					title   : 'Inventario',
    					flex    : 1,
    					padding : 10,
    					items   :[{ xtype : 'winventario'}]
    				},
    				
    				{
    					title  : 'Kardex',
    					flex   : 1,
    					items  :[
    						{
    							xtype : 'panel',
    							border : false,
    							layout : 'hbox',
    							items :[
    								{
    									xtype  : 'panel',
    									border : false,
    									flex   : 2,
    									layout : 'fit',
    									bodyPadding : 5,
    									items :[
    										{
    											xtype : 'gridpanel',
    											id    : 'dgvtrabajadores',
    											//store :storeTrabajadores,
    											 sortableColumns : false,
    											height : 550,
    											columns:[
    												{
    													text : 'Id',
    													dataIndex: 'id',
    													flex : 0.5
    													
													},
													{
														text : 'Ape. Paterno',
														dataIndex : 'paterno',
														flex : 1
														
													},
													{
														text : 'Ape. Materno',
														dataIndex : 'materno',
														flex : 1
														
													},
													{
														text : 'Nombres',
														dataIndex : 'nombres',
														flex : 1
														
													},
													{
														text  : 'Estado',
														dataIndex : 'estados',
														flex : 0.5,
														renderer : function(value){
															if(value == 0)
                                                               return '<span style="color:red;font-weight:bold;">ELIMNA</span>';
                                                            else if(value == 1)
                                                               		return '<span style="color:green;font-weight:bold;">ACTIVO</span>';
                                                               	else
                                                               		return '<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>';	 
														}	
														
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
                                                                	 FxEliminarTrabajador(x);
                                                              		
	                                                            }
	                                                        }
	                                                    ]
                                             	    }
    											],
    											dockedItems: [{
											        xtype: 'pagingtoolbar',
											        id  : 'ptbtrabajadores',
											        //store: storeTrabajadores,   
											        dock: 'bottom',
											        displayInfo: true
											    }],
    											listeners:{
    												 itemclick: function(dv, record, item, index, e) {
    												 	 FxEditarTrabajador();
												    }
    											}
    										}
    									]
    								
    								},
    								{
    									xtype  : 'panel',
    									border : false,
    									titleAlign : 'center',
    									flex   : 1,
    									layout : {
									    	aling : 'stretch',
									    	type  : 'fit'
									    },
									  	bodyPadding : 4,
									  	height : 420,	
									    items: [
    										{
    											xtype: 'form',
									            id   :'myFormTrabajador',
									            frame : true,
									            bodyPadding: 1,
									            layout: {
									                type: 'hbox',
									                align: 'stretch'
									            },
									            items :[
									            	 {
									                    xtype: 'fieldset',
									                    flex: 2,
									                    title: 'Informacion del Trabajador',
									                    defaults: {
									                        anchor: '100%',
									                        xtype: 'textfield',
									                        allowBlank: false,
									                        labelWidth: 150
									                    },
									                    items :[
									                    		{
									                            	xtype: 'hiddenfield',
									                            	name : 'id',
									                            	id : 'txtIdTraba',

									                        	},
									                        	{
									                        		xtype:'label',
									                        		width : 30,
									                        		text  : 'Apellido Paterno :',
									                        		style : 'font-weight : bold;'
									                        	},
									                        	{
									                        		id    : 'txtPaternoTraba',
									                        		name  : 'paterno',
									                        		fieldStyle:'text-transform:uppercase'

									                        	},
									                        	{
									                        		xtype:'label',
									                        		width : 30,
									                        		text  : 'Apellido Materno :',
									                        		style : 'font-weight : bold;'
									                        		
									                        	},
									                        	{
									                        		id : 'txtMaternoTrab',
									                        		name : 'materno',
									                        		fieldStyle:'text-transform:uppercase'			
									                        	},
									                        	{
									                        		xtype:'label',
									                        		width : 30,
									                        		text  : 'Nombres :',
									                        		style : 'font-weight : bold;'
									                        		
									                        	},
									                        	{
									                        		id : 'txtNombresTrab',
									                        		name : 'nombres',
									                        		fieldStyle:'text-transform:uppercase'			
									                        	},
									                        	{
									                        		xtype:'container',
									                        		layout:{
									                        			type:'hbox'
									                        		},
									                        		border:false,
									                        		defaults:{
									                        				labelWidth:120,
									                        				flex :1,
									                        				padding : 2
									                        		},
									                        		items:[
									                        			{
									                        				xtype : 'datefield',
									                        				fieldLabel :'<b>Fecha Nacimiento</b>',
									                        				name : 'fnacimiento',
									                        				id   : 'FechaNaciTrab'

									                        				
									                        			}
									                        		]
									                        	},
									                        	{
									                        		xtype:'container',
									                        		layout:{
									                        			type:'hbox'
									                        		},
									                        		border:false,
									                        		defaults:{
									                        				labelWidth:120,
									                        				flex :1,
									                        				padding : 2
									                        		},
									                        		items:[
									                        			{
									                        				xtype : 'combobox',
									                        				fieldLabel :'<b>Sexo</b>',
									                        				name : 'sexo',
									                        				id   : 'cboSexoTrab',
									                        				displayField : 'descripcion',
																			valueField : 'id',
									                        				store : Ext.create('Ext.data.ArrayStore',{
									                        					  fields :[{name : 'id'},{name : 'descripcion'}],
									                        					  data : [['M','M'],['F','F']]
																			}),
																			editable :false

									                        				
									                        			}
									                        		]
									                        	},
									                        	,
									                        	{
									                        		xtype:'label',
									                        		width : 30,
									                        		text  : 'Tipo de Cargo :',
									                        		style : 'font-weight : bold;'

									                        	},
									                        	{
									                        		xtype : 'combobox',
									                        		id    : 'txtTipoCargoTrab',
									                        		//store : storeTipoTrabajador,
									                        		name  : 'tipotra',
									                        		query : 'remote',
									                        		displayField : 'descripcion',
									                        		valueField  : 'id',
									                        		editable :false,
                                                                    value : '1'

									                        	},
									                        	
									                        	
									                    ]
													}
									            ],
									            bbar :[
									            	{
									            		xtype : 'button',
									            		text  : 'Nuevo',
									            		iconCls : 'add',
									            		id  : 'btnNuevoTrab',
									            		handler : function(){
									            			var frm  = Ext.getCmp('myFormTrabajador');
									            			frm.getForm().reset();
									            			Ext.getCmp('txtPaternoTraba').focus();
									            		}
									            	},
		    										{
		    											xtype : 'button',
		    											text  : 'Guardar',
		    											id  : 'btnGuardarTrab',
		    											iconCls : 'boton-save',
		    											handler:function(){
		    												FxActualizarTrabajador();
		    											}
		    										},
                                                    {
                                                        xtype : 'button',
                                                        text  : 'Imprimir Listado',
                                                        id  : 'btnPrintTrabaj',
                                                        iconCls : 'boton-print'

                                                    }
		    										
		    										
		    									]
		    									
    										}
        								]
									 }// fin panel detalle
								 ] // panel hbox
							}] // panel medicamento

    									

    				},// fin Grupos Medicamentos

                  

    		] // fin item principal

    	});
    	this.callParent(arguments);
    }
});
