
Ext.define('MyDesktop.app.views.BuscarProveedor', {
    extend: 'Ext.window.Window',
    alias : 'widget.wbuscarproveedor',
 	initComponent: function() {
    	var me = this;
    	/*storepaciente     = Ext.create('MyDesktop.app.stores.Pacientes');
    	storeTipoBusqueda = Ext.create('MyDesktop.app.stores.Busquedas');*/

    	 Ext.apply(me,{
    	 	title  :'Buscador de Pacientes',
    	 	width  : 600,
    	 	height : 300,
    	 	modal  : true,
    	 	layout : 'fit',
    	 	items:[
    	 		{
    	 			   xtype: 'gridpanel',
    	 			   id   : 'dgvBuscarPaciente',
    	 			  // store : storepaciente,
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
                                
                             }
                            ],//fin grid columns
                                viewConfig: {
                                    listeners: {
                                        itemdblclick: function(dataview, record, item, index, e) {
                                        /*	var paciente = record.get('_paterno')+' '+record.get('_materno')+' '+record.get('_nombre');
                                            var idpaci   = record.get('_idper');
                                        	Ext.getCmp('txtDatosPaciente').setValue(paciente);
                                            Ext.getCmp('txtIdPaciente').setValue(idpaci);
                                            me.destroy();*/
                                            
                                        }
                                   }
                            } // fin viewconfig
    	 		}

    	 	],
    	 	dockedItems: [{
                    xtype: 'pagingtoolbar',
                   // store: storepaciente,
                    dock: 'bottom',
                    displayInfo: true
            }],
    	 	tbar : [
    	 		{
    	 			xtype : 'combobox',
    	 			id    : 'cboBuscadorPacTipo',
    	 			//store : storeTipoBusqueda,
    	 			displayField: 'descripcion',
                    valueField: 'id',
                    editable: false,
                    emptyText: 'Tipo de Busqueda',

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
    	 					me.getBuscarPacientePorTipo();
    	 			}
    	 		}
    	 	]

    	 });
        this.callParent(arguments);
    },
    getBuscarPacientePorTipo:function(){
    	var x     = Ext.getCmp('cboBuscadorPacTipo').getValue();
    	var texto = Ext.getCmp('txtBuscarPacientePor').getValue();
    	if(x != null){
    				 storepaciente.getProxy().extraParams  = {
                                 page : 1,
                                 start: 0,
                                 limit: 25,
                                'pid'      : (x == 0? texto : 0),
                                'ppaterno' : (x == 1? texto : null),
                                'pmaterno' : (x == 2? texto : null),
                                'pnombres' : (x == 3? texto : null),    
                        };
                    storepaciente.loadPage(1);
                      
    	}
    }
});
  
