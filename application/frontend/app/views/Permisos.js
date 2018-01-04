var permisos = new Array();

Ext.define('MyDesktop.app.views.Permisos', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.wpermisos',
    require: ['MyDesktop.app.stores.Usuarios'],
    id     : 'wpermisos',
    initComponent : function(){
        me = this;
        storePerfiles = Ext.create('MyDesktop.app.stores.Perfiles');

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
                                    xtype :'treepanel',
                                    id : 'treeProgramas',
                                    store: Ext.create('Ext.data.TreeStore', {
                                        root: {
                                            text : 'Clinica de los Ojos',
                                            iconCls : 'ux-start-button-icon',
                                            expanded: true,
                                            children: [
                                                { text: "SPCO",id:'SPCO','expanded':true, iconCls:'app',
                                                    children:[
                                                        { text: "Maestros", id:'Maestros', leaf: true,checked: false },
                                                        { text: "Proveedores",id:'Proveedores', leaf: true,"checked": false},
                                                        { text: "Clientes",id:'Clientes', leaf: true,"checked": false},
                                                        { text: "Registro de Ventas",id:'Registro de Ventas', leaf: true,"checked": false},
                                                        { text: "Registro de Honorarios",id:'Registro de Honorarios', leaf: true,"checked": false},
                                                        { text: "Registro de Notas",id:'Registro de Notas', leaf: true,"checked": false},
                                                        { text: "Consultas Ventas",id:'Consultas Ventas', leaf: true,"checked": false},
                                                        { text: "Registro de Ingresos",id:'Registro de Ingresos', leaf: true,"checked": false},
                                                        { text: "Stock",id:'Stock', leaf: true,"checked": false},
                                                        { text: "Registro de Citas",id:'Registro de Citas', leaf: true,"checked": false},
                                                        { text: "Consultorio",id:'Consultorio', leaf: true,"checked": false},
                                                        { text: "Reporte Ventas",id:'ReporteVentas', leaf: true,"checked": false},
                                                        { text: "Reporte Compras",id:'ReporteCompras', leaf: true,"checked": false},
                                                        { text: "Reporte Paciente",id:'ReportePaciente', leaf: true,"checked": false},
                                                        { text: "Reporte Liquidacion Medico",id:'ReporteLiquidacionMed', leaf: true,"checked": false},
                                                        { text: "Consulta Historia Clinica",id:'Consulta Historia Paciente', leaf: true,"checked": false},
                                                        { text: "Usuarios",id:'Usuarios', leaf: true,"checked": false}
                                                    ]

                                                }/*Sistema 1*/




                                            ]
                                        }
                                    }),
                                    rootVisible:true,
                                    //useArrows: true,
                                   // store  : storeMenu,
                                    //multiSelect: true


                                }
                            ]
                        },

                    ]
                },
                {
                    xtype: 'panel',
                    frame : false,
                    flex: 0.8,
                    layout : {
                        type : 'fit',
                    },
                    border :false,
                    items :[
                        {
                            xtype : 'form',
                            bodyPadding : 10,
                            padding : '10 5 5 5',
                            layout : {
                                type : 'vbox',
                                align: 'stretch'
                            },
                            defaults:{
                                labelWidth : 150
                            },
                            id    : 'frmUsuarioPermisos',
                            items : [

                                {
                                    xtype : 'combo',
                                    fieldLabel: '<b>Tipo de Nivel</b>',
                                    id  : 'cboTipoNivel',
                                    store : storePerfiles,
                                    displayField : '_descripcion',
                                    valueField  : '_id_perfil',
                                    editable : false,
                                    queryMode :  'remote',
                                    emptyText : '-- Seleccionar el Perfil --',
                                    listeners : {
                                        change:function(){

                                               Ext.Ajax.request({
                                               url: 'index.php/usuarios/listarpermisosporperfil',
                                                params: {
                                                    vIdPerfil     :this.getValue()
                                                },
                                                success: function(conn, response, options, eOpts) {
                                                    var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                                                    permisos=[];
                                                    if (result.success) {
                                                        Ext.each(result.items, function(item) {
                                                          if(item._permiso !=null){permisos.push(item._menu);}
                                                        });
                                                            var treepanel = Ext.getCmp('treeProgramas');
                                                            var tree = treepanel.getStore();
                                                            root = treepanel.getRootNode();
                                                            root.findChildBy(function(child){
                                                                var text = child.data.text;
                                                                var PNode = tree.getNodeById(text);
                                                                var PChilds = PNode.childNodes;

                                                                Ext.each(PChilds,function(node,index){
                                                                  var node = tree.getNodeById(node.internalId);
                                                                 // console.log(node.internalId);
                                                                  if(permisos.indexOf(node.internalId)>=0)
                                                                  {
                                                                    node.set('checked',true);
                                                                  }else{
                                                                    node.set('checked',false);
                                                                  }
                                                                  treepanel.fireEvent('checkchange', node, node.get('checked'));
                                                                });

                                                            });
                                                       // console.log(permisos.indexOf("Stock"));

                                                    } else {MyDesktop.app.util.Util.showErrorMsg(conn.responseText);return false;}

                                                },
                                                failure: function(conn, response, options, eOpts) {}
                                            });





                                        }
                                    }


                                },
                                {
                                    xtype:'fieldset',
                                    columnWidth: 0.5,
                                    bodyPadding : '5 5 5 5',
                                    padding : '5 5 5 5',
                                    title: 'Ingresar Nuevo Perfil',
                                    collapsible: false,
                                    defaultType: 'textfield',
                                    defaults: {anchor: '100%'},
                                    layout: 'anchor',
                                    items :[{
                                        fieldLabel: 'Descripcion',
                                        name: '_descripcion',
                                        id  : '_descripcion'
                                    },
                                    {
                                        xtype : 'button',
                                        text  : 'Agregar',
                                        iconCls : 'boton-save',
                                        width : 100,
                                        handler:function(){Ext.getCmp('wpermisos').setAgregarNuevoPerfil(0,Ext.getCmp('_descripcion').getValue(),storePerfiles);}

                                    }
                                   ]
                                }



                            ]

                        }
                    ],
                    bbar : [

                        '->' ,
                        {
                            xtype : 'button',
                            text  : '<b>Actualizar Permisos al Perfil</b>',
                            iconCls : 'boton-save',
                            handler : function(){
                               me = Ext.getCmp('wpermisos');
                               var treepanel = Ext.getCmp('treeProgramas');
                               var tree = treepanel.getStore();
                               root = treepanel.getRootNode();
                               enviar = new Array();
                               root.findChildBy(function(child){
                                    var text = child.data.text;
                                    var PNode = tree.getNodeById(text);
                                    var PChilds = PNode.childNodes;
                                    Ext.each(PChilds,function(node,index){
                                       var node = tree.getNodeById(node.internalId);
                                       if(node.data.checked == true){
                                            enviar.push(node.internalId);
                                       }
                                   });
                               });
                                if(Ext.getCmp('cboTipoNivel').getValue()!=null)
                                    me.setCrearArraydePermisos(enviar,Ext.getCmp('cboTipoNivel').getValue());
                                else
                                    Ext.Msg.alert("Error","Tiene que seleccionar un perfil de usuario!");
                        }
                      }
                    ]
                }
            ]
        });

        this.callParent(arguments);

        /* var runner = new Ext.util.TaskRunner(),
         task = runner.start({
         run: getConsultaEmergencias,
         interval: 60000
         });
         */
    },
    setCrearArraydePermisos:function(permisos,idperfil){
        var enviar='';
        for (i = 0; i < permisos.length; ++i) {enviar  = enviar+','+permisos[i];}
        enviar ='{'+enviar.substring(1,enviar.length)+'}';
        console.log(enviar);
        Ext.Ajax.request({
            url: 'index.php/usuarios/actualizarpermisosaperfil',
            params: {
                vIdPerfil    : idperfil,
                vPermisos    : enviar
            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if (item.ERROR>0){
                            Ext.Msg.alert("Permisos","Se han actualizado los permisos del perfil de usuario!!");
                        }
                    });
                }
            }
        });



    },
    setAgregarNuevoPerfil:function(Id,Descripcion,store){
        Ext.Ajax.request({
            url: 'index.php/usuarios/agregarperfil',
            params: {
                vId          : Id,
                vDescripcion : Descripcion

            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if (item.ERROR>0){
                            store.reload();
                            Ext.getCmp('_descripcion').setValue('');
                         }
                    });
                }
            }

        });

    }
});
