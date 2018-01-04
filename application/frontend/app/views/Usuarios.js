Ext.define('MyDesktop.app.views.Usuarios', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.wusuarios',
    requires : [ 'MyDesktop.app.stores.Usuarios'],
    initComponent : function(){
        me = this;
        storeusuarios = Ext.create('MyDesktop.app.stores.Usuarios');
        storePerfil   = Ext.create('MyDesktop.app.stores.Perfiles');

        Ext.apply(me,{
            layout : {
                align: 'stretch',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    layout: {
                        align: 'stretch',
                        type: 'fit'
                    },
                    border: false,
                    items: [
                        {
                            xtype : 'panel',
                            flex  : 2,
                            layout : 'fit',
                            border: false,
                            items :[
                                {
                                    xtype :'gridpanel',
                                    id    : 'dgvusuarios',
                                    store : storeusuarios,
                                    sortableColumns : false,
                                    columns:[
                                        {
                                            xtype : 'rownumberer'
                                        },
                                        {
                                            text : 'Id',
                                            dataIndex :'_usuid',
                                            flex : 0.5,
                                            hidden : true
                                        },
                                        {
                                            text  : 'Nombres y Apellidos',
                                            flex : 2,
                                            textAlign: 'left',
                                            dataIndex: '_usudatos'
                                        },
                                        {
                                            text  : 'Usuario',
                                            textAlign : 'right',
                                            flex : 0.9,
                                            dataIndex : '_usulogin'
                                        },
                                        {
                                            xtype : 'actioncolumn',
                                            width:20,
                                            items: [{
                                                iconCls : 'remove',
                                                tooltip: 'Eliminar',
                                                handler: function(grid, rowIndex, colIndex) {
                                                   var rec = grid.getStore().getAt(rowIndex);

                                                   Ext.Msg.confirm('Aviso', 'Esta seguro de eliminar al usuario seleccionado?',
                                                       function (e) {
                                                           if (e == 'yes') {
                                                               Ext.Ajax.request({
                                                                   url: 'index.php/usuarios/eliminarusuario',
                                                                   params: {
                                                                       vIdUsuario: rec.get('_usuid'),
                                                                       vUsuario : 'SISTEMA'
                                                                   },
                                                                   success: function (conn, response, options, eOpts) {
                                                                        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                                                                        if (result.success) {
                                                                            Ext.each(result.items, function(item) {
                                                                                if (item.ERROR>0){
                                                                                    Ext.getCmp('dgvusuarios').getStore().load();
                                                                                    Ext.getCmp('frmusuario').getForm().reset();
                                                                                }
                                                                            });
                                                                        }
                                                                   }

                                                               });
                                                           }
                                                       });

                                                }
                                            }]
                                        }


                                    ],
                                    viewConfig: {
                                        listeners: {
                                            /* --- Persistencia Seleccion */
                                         itemclick :function (dataview, record, item, index, e){
                                               var grid = Ext.getCmp('dgvusuarios');
                                               record = grid.getSelectionModel().getSelection();
                                                   if(record[0]){
                                                        Ext.getCmp('frmusuario').loadRecord(record[0]);
                                                    }

                                          }
                                      }
                                    }
                                    /*listeners : {
                                        click : function(){

                                        }
                                    }*/

                                }
                            ]
                        },

                    ]
                },
                {
                    xtype: 'panel',
                    flex: 0.8,
                    frame : 'true',
                    layout : {
                        type : 'fit',
                    },
                    border :false,
                    items :[
                        {
                           xtype : 'form',
                           padding : '10 5 10 5',
                           bodyPadding : '5',
                           layout : {
                                type : 'vbox',
                                align: 'stretch'
                           },
                           defaults:{
                             labelWidth : 150
                           },
                           id    : 'frmusuario',
                           items : [
                               {
                                   xtype:'hiddenfield',
                                   id  : 'txtIdUsuario',
                                   name : '_usuid'
                               },
                               {
                                   xtype : 'textfield',
                                   fieldLabel: '<b>Usuario</b>',
                                   id  : 'txtUsuario',
                                   name : '_usulogin',
                                   allowBlank : false

                               },
                               {
                                   xtype : 'textfield',
                                   fieldLabel: '<b>Contrase\xf1a</b>',
                                   id : 'txtClave',
                                   inputType : 'password',
                                   allowBlank : false
                               },
                               {
                                   xtype : 'textfield',
                                   fieldLabel: '<b>Nombres y Apellidos</b>',
                                   id : 'txtNomApe',
                                   name : '_usudatos',
                                   allowBlank : false
                               },
                               {
                                   xtype : 'combobox',
                                   id : 'cboPerfil',
                                   store : storePerfil,
                                   name : '_id_perfil',
                                   fieldLabel : '<b>Nivel Usuario</b>',
                                   valueField : '_id_perfil',
                                   displayField : '_descripcion',
                                   editable :false,
                                   queryMode : 'remote',
                                   allowBlank : false


                               }


                           ]

                        }
                    ],
                   bbar : [

                        '->' ,
                        {
                           xtype : 'button',
                           text  : '<b>Nuevo</b>',
                           iconCls : 'add',
                            handler :function(){me.setLimpiarFrm();}


                        },
                        {
                            xtype : 'button',
                            text  : '<b>Grabar</b>',
                            iconCls : 'boton-save',
                            handler:function(){me.actionGuardarUsuario();}
                        }

                    ]



                }
            ]



        });

        this.callParent(arguments);
    },
    setLimpiarFrm:function(){
        Ext.getCmp('frmusuario').getForm().reset();
        Ext.getCmp('txtUsuario').focus();
    },
    actionGuardarUsuario:function(){
        var frm = Ext.getCmp('frmusuario');
        if(frm.isValid()){
            Ext.Ajax.request({
                url: 'index.php/usuarios/actualizarusuario',
                params: {
                    vId         : Ext.getCmp('txtIdUsuario').getValue(),
                    vNomApe     : Ext.getCmp('txtNomApe').getValue(),
                    vLogin      : Ext.getCmp('txtUsuario').getValue(),
                    vClave      : Ext.getCmp('txtClave').getValue(),
                    vIdPerfil   : parseInt(Ext.getCmp('cboPerfil').getValue()),
                    vUsuario    : 'SISTEMA'
                },
                success: function(conn, response, options, eOpts) {
                    var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                    if (result.success) {
                        Ext.each(result.items, function(item) {
                            if (item.ERROR>0){
                                Ext.getCmp('dgvusuarios').getStore().load();
                                Ext.getCmp('frmusuario').getForm().reset();
                            }
                        });
                    }
                }

            });
        }
    }
});
