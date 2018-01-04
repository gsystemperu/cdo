
Ext.define('MyDesktop.app.views.BuscarCliente', {
    extend: 'Ext.window.Window',
    alias : 'widget.pacbuscar',
    requires:['MyDesktop.app.stores.Clientes'],
 	initComponent: function() {
    	var me = this;
    	var storeclientes = Ext.create('MyDesktop.app.stores.ClientesBuscar');
        var storebusquedas = Ext.create('MyDesktop.app.stores.BusquedasPersonas');

    	 Ext.apply(me,{
    	 	title  :'Buscador de Pacientes',
    	 	width  : 700,
    	 	height : 300,
    	 	modal  : true,
    	 	layout : 'fit',
    	 	items:[
    	 		{
    	 			   xtype: 'gridpanel',
    	 			   id   : 'dgvBuscarPaciente',
                                   itemId:"dgvBuscarPaciente",
    	 			   store : storeclientes,
                       columns: [
                            {
                                header: 'Id',
                                dataIndex: '_idper',
                                hidden: false,
                                flex : 0.5
                            },
                            {
                                header: 'Apellido Paterno',
                                dataIndex: '_paterno',
                                flex : 1
                             },
                             {
                                header: 'Apellido Materno',
                                dataIndex: '_materno',
                                flex : 1


                             },
                             {
                                header: 'Apellido Nombres',
                                dataIndex: '_nombre',
                                flex : 1

                             },
                             {
                                 header:"Razon Social",
                                 dataIndex:"_razonsocial",
                                 flex:1
                             },
                             {
                                 header:"RUC",
                                 dataIndex:"_numeroruc",
                                 flex:1
                             }
                            ],//fin grid columns
                                viewConfig: {
                                    listeners: {
                                        itemdblclick: function(dataview, record, item, index, e) {
                                           var paciente="";
                                          // console.log(Ext.getCmp("rbF").getValue());
                                     // try{

                                           if(_flagbuscadorpaciente=="CONTRATO_EDITAR"){
                                              if(Ext.getCmp("rbF").getValue()==true){
                                              paciente=record.get("_razonsocial");
                                           }else{
                                             paciente= record.get('_paterno')+' '+record.get('_materno')+' '+record.get('_nombre');
                                           }
                                            var idpaci   = record.get('_idper');
                                            Ext.getCmp('txtDatosPersona').setValue(paciente);
                                            Ext.getCmp('txtIdPersona').setValue(idpaci);
                                            Ext.ComponentQuery.query('#txtDatosPersona')[0].setValue(paciente);
                                            Ext.ComponentQuery.query('#txtIdPersona')[0].setValue(idpaci);
                                            me.destroy();
                                           }else if(_flagbuscadorpaciente=="REGISTRO_CITA"){
                                            var idpaci   = record.get('_idper');
                                            paciente= record.get('_paterno')+' '+record.get('_materno')+' '+record.get('_nombre');
                                            Ext.getCmp('txtDatosPersonaCita').setValue(paciente);
                                            Ext.getCmp('txtIdPersonaCita').setValue(idpaci);
                                            me.destroy();
                                           }



                                  //    }catch(e){
					   // paciente= record.get('_paterno')+' '+record.get('_materno')+' '+record.get('_nombre');
					//}
//                                            var idpaci   = record.get('_idper');
//                                            Ext.getCmp('txtDatosPersonaCita').setValue(paciente);
//                                            Ext.getCmp('txtIdPersonaCita').setValue(idpaci);
//                                            me.destroy();
                                        }
                                   }
                            } // fin viewconfig
    	 		}

    	 	],
    	 	tbar : [
    	 		{
    	 			xtype : 'combobox',
    	 			id    : 'cboBuscadorPacTipo',
    	 			store : storebusquedas,
    	 			displayField: 'descripcion',
                    valueField: 'id',
                    editable: false,
                    emptyText: 'Tipo de Busqueda',
                    value:'0'

    	 		},
    	 		{
    	 			xtype :'textfield',
    	 			id     : 'txtBuscarPacientePor',
    	 			fieldStyle:'text-transform:uppercase',
    	 			flex  : 2
    	 		},
    	 		{
    	 			xtype : 'button',
    	 			text  :'Buscar',
    	 			flex :  1,
    	 			handler: function(){
    	 					me.getBuscarPacientePorTipo(storeclientes);
    	 			}
    	 		}
    	 	]

    	 });
        this.callParent(arguments);
    },
    getBuscarPacientePorTipo:function(storeclientes){
    		var texto = Ext.getCmp('txtBuscarPacientePor').getValue();
            var idTipoBus = Ext.getCmp('cboBuscadorPacTipo').getValue();
            if (idTipoBus == null) {
              Ext.Msg.alert('Error', 'Seleccione el tipo de busqueda!');
              return false;
            }

            storeclientes.getProxy().extraParams = {
             // 'pid' : (idTipoBus == 1 ? texto : 0),
               'pid' : idTipoBus,
              'pdatospersona' : (idTipoBus != 1 ? texto : null)

            };
            storeclientes.loadPage(1);

    }
});
