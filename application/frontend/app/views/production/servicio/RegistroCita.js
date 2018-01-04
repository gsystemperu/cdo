Ext.define("MyDesktop.app.views.servicio.RegistroCita",{
    extend: 'Ext.panel.Panel',
    alias : 'widget.wregcita',
    initComponent : function(){
       // var storeclientes = Ext.create('MyDesktop.app.stores.Clientes');
       // var storebusquedas = Ext.create('MyDesktop.app.stores.Busquedas');
        Ext.apply(this,{
            layout : 'hbox',
            items: [
                {
                    border: false,
                    xtype: 'gridpanel',
                   // store: storeclientes,
                    id   : 'dgvcliente',
                    sortableColumns : false,
                    flex : 2,
                    columns: [
                        //  new Ext.grid.RowNumberer(),
                        {
                            text: "Id",
                            flex: 0.3,
                            sortable: true,
                            dataIndex: '_idper',
                        },
                        {
                            text: "Apellido Paterno",
                            flex: 1,
                            sortable: true,
                            dataIndex: '_paterno'
                        },
                        {
                            text: "Apellido Materno",
                            flex : 1,
                            sortable: true,
                            dataIndex: '_materno'
                        },
                        {
                            text: "Nombres",
                            sortable: true,
                            flex : 1,
                            dataIndex: '_nombre'
                        },
                        {
                            text: "Doc.Identidad",
                            style:'text-aling:center',
                            flex : 1,
                            sortable: true,
                            dataIndex: '_numerodoc'

                        },
                        {
                            text: "R.U.C",
                            style:'text-aling:center',
                            flex : 1,
                            sortable: true,
                            dataIndex: '_numeroruc'
                        }
                    ]
                },
                {
                    xtype : 'panel',
                    flex : 1,
                    bodyPadding:5,
                    border:false,
                    items:[
                        {
                            xtype : 'panel',
                            title : 'Registro',
                            frame:true,
                            border :false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                padding: 10
                            },
                             items : [
                                 {
                                     xtype : 'combo',
                                     id : 'cboMedico',
                                     fieldLabel:'Doctor'
                                 },
                                 {
                                     xtype : 'container',
                                     layout : 'hbox',
                                     border: false,
                                     padding : '0 0 10 0',
                                     items :[
                                         {
                                             xtype : 'textfield',
                                             id : 'txtDatosPaciente',
                                             fieldLabel:'Paciente',
                                             flex : 3
                                         },
                                         {
                                             xtype : 'button',
                                             id : 'btnBuscarPaciente',
                                             text : '..',
                                             flex : 0.2
                                         }
                                     ]

                                 },
                                 {
                                     xtype:'textarea',
                                     fieldLabel:'Descripcion',
                                     id : 'txtDescripcion'
                                 },
                                 {
                                     xtype:'textarea',
                                     fieldLabel:'Observaciones',
                                     id : 'txtObservaciones'
                                 },
                                 {
                                     xtype : 'combo',
                                     id : 'cboTipoCita',
                                     fieldLabel:'Tipo de Cita'
                                 },

                            ],
                            bbar :[
                                {
                                    xtype : 'button',
                                    id    : 'btnGuardarCita',
                                    text  : 'Guardar'

                                }
                            ]
                        }

                    ]

                }
            ],
            tbar:[
                {
                    xtype : 'combobox',
                    id    : 'cboBuscarPor',
                    emptyText: 'Tipo de Busqueda',
                  //  store : storebusquedas,
                    queryMode: 'local',
                    displayField: 'descripcion',
                    valueField: 'id',

                },
                {
                    xtype : 'textfield',
                    id   : 'txtbuscar',
                    labelWidth :50,
                    fieldStyle:'text-transform:uppercase'
                },{
                    text : '<b>Buscar</b>',
                    id   : 'btnBuscarClie',
                    iconCls : 'user',
                    handler: function(){
                        var texto  = Ext.getCmp('txtbuscar').getValue();
                        var idTipoBus = Ext.getCmp('cboBuscarPor').getValue();
                        if (idTipoBus  == null )
                        {
                            Ext.Msg.alert('Error','Seleccione el tipo de busqueda!');
                            return false;
                        }

                        /*   storeclientes.getProxy().extraParams  = {
                         'pid'      : (idTipoBus == 0? texto : 0),
                         'ppaterno' : (idTipoBus == 1? texto : null),
                         'pmaterno' : (idTipoBus == 2? texto : null),
                         'pnombres' : (idTipoBus == 3? texto : null),
                         };
                         storeclientes.loadPage(1);*/

                    }
                },'-',
                {
                    text:'Listar',
                    tooltip:'Agregar Registro',
                    iconCls:'icon-grid',
                    handler: function(){
                        var texto     = null;
                        var idTipoBus = 0;
                        /*  storeclientes.getProxy().extraParams  = {
                         'pid'      : (idTipoBus == 0? texto : 0),
                         'ppaterno' : (idTipoBus == 1? texto : null),
                         'pmaterno' : (idTipoBus == 2? texto : null),
                         'pnombres' : (idTipoBus == 3? texto : null),
                         };
                         storeclientes.loadPage(1);*/
                    }
                },'-',
                {
                    text:'Nuevo',
                    tooltip:'Agregar Registro',
                    iconCls:'add',
                    handler: function(){
                        var frm = Ext.create('MyDesktop.app.views.ClienteEditar');

                    }
                }, '-', {
                    text:'Modificar',
                    tooltip:'Mdificar opciones',
                    iconCls:'boton-edit',
                    listeners : {
                        click : function (){
                            fs_RegistroModificarPersona();
                        }
                    }
                },'-',{
                    text:'Ver Horario',
                    tooltip:'Ver horario de atencion',
                    iconCls:'boton-edit',
                    listeners : {
                        click : function (){

                        }
                    }

                }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                id   : 'ptbclientes',
                // store: storeclientes,   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }]


        });
        this.callParent(arguments);
    }

});
function fs_RegistroModificarPersona(){
    var grid = Ext.getCmp('dgvcliente');
    record = grid.getSelectionModel().getSelection();
    if(record[0]){
        var editfrm = Ext.create('MyDesktop.app.views.ClienteEditar');
        editfrm.down('form').loadRecord(record[0]);
    }else{
        Ext.Msg.alert("Aviso","Tiene que seleccionar un cliente!");

    }
}