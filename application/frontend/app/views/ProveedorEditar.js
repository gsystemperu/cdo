Ext.define('MyDesktop.app.views.ProveedorEditar', {
    extend: 'Ext.window.Window',
    alias : 'widget.proveditar',
    requires   : [
    'MyDesktop.app.util.Util',
    'MyDesktop.app.util.Alert',
    //'MyDesktop.app.stores.Generos'

    ],
    id    : 'wProveedor',
    width : 500,
    height: 330,
    modal : true,
    floating : true,
    autoShow : true,
    title : 'Proveedor',
    layout : {
    	aling : 'stretch',
    	type  : 'fit'
    },
    initComponent: function() {
        me = this;
        Ext.apply(me, {
            items: [
                {
                    xtype: 'form',
                    id   :'myFormProveedor',
                    bodyPadding: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 2,
                            title: 'Informaci&oacute;n Principal',
                            defaults: {
                                anchor: '100%',
                                xtype: 'textfield',
                                allowBlank: true,
                                labelWidth: 150

                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    fieldLabel: 'Label',
                                    name : '_idprov',
                                    id : 'idprov',
                                },
                                {
                                    fieldLabel: 'Apellido Paterno',
                                    name: '_paterno',
                                    id: 'paternoprov',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'Apellido Materno',
                                    maxLength: 100,
                                    name: '_materno',
                                    id: 'maternoprov',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'Nombres',
                                    maxLength: 100,
                                    name: '_nombre',
                                    id: 'nombreprov',
                                    fieldStyle:'text-transform:uppercase'
                                },
                                {
                                    fieldLabel: 'RUC',
                                    name: '_numeroruc',
                                    id :'numrucprov',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
                                },

                                {
                                    fieldLabel: 'Telefono',
                                    name: '_telefono',
                                    id :'telper',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
                                },
                                {
                                    fieldLabel: 'Celular',
                                    name: '_celular',
                                    id :'celper',
                                    fieldStyle:'text-transform:uppercase;text-align:right'
                                },

                                {
                                    xtype     : 'combobox',
                                    fieldLabel: 'Estado',
                                    name      : '_estado',
                                    id      : 'estado',
                                    store     : Ext.create('MyDesktop.app.stores.Estados'),
                                    queryMode : 'local',
                                    displayField: 'descripcion',
                                    valueField: 'id',
                                    value  :  '1'

                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        pack: 'end',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            itemId: 'btnCancelar',
                            iconCls: 'remove',
                            scale : 'medium',
                            handler: function(){
                                win = Ext.getCmp('wProveedor');
                                win.close();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Grabar',
                            itemId: 'btnGrabar',
                            iconCls: 'add',
                            scale : 'medium',
                            handler:function(){
                                fx__ProveedorActualizar();
                            }
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },


});

function fx__ProveedorActualizar(){
        var idper = 0;
        win = Ext.getCmp('wProveedor');
        formPanel = Ext.getCmp('myFormProveedor');
        if (formPanel.getForm().isValid()) {

            try{
                store   = Ext.getCmp('dgvproveedor').getStore();
            }catch(ex){
                store  = null;
            }

            idper   =   Ext.getCmp('idprov').getValue(),
            paterno =   Ext.getCmp('paternoprov').getValue();
            materno =   Ext.getCmp('maternoprov').getValue();
            nombre  =   Ext.getCmp('nombreprov').getValue();
            sexo    =   '',
            fnaci   =   '',
            iddoctipo   =  0,
            numdoc      =   '',
            numruc      =   Ext.getCmp('numrucprov').getValue();
            estado      =    Ext.getCmp('estado').getValue();
            domicilio   =    '',
            domicilio_fiscal   =  '',
            telefono    =    Ext.getCmp('telper').getValue();
            celular      =    Ext.getCmp('celper').getValue();
            departamento      =  '',
            provincia      =    '',
            distrito      =    ''
            usuario      =    Ext.util.Cookies.get('idusuario') 
             Ext.Ajax.request({
                url: 'index.php/proveedores/actualizar',
                params: {
                             idprov      : idper,
                             paternoprov : paterno,
                             maternoprov : materno,
                             nombreprov  : nombre,
                             sexoprov    : sexo,
                             fnaciprov   : fnaci,
                             iddocidentidad : iddoctipo,
                             numdocprov  : numdoc,
                             numrucprov : numruc,
                             estadoprov  : estado ,
                             domicilioprov: domicilio ,
                             domiciliofiscalprov: domicilio_fiscal ,
                             telefonoprov:  telefono  ,
                             celularprov:  celular  ,
                             departamentoprov :departamento,
                             provinciaprov    :provincia,
                             distritoprov     :distrito,
                             usuario    : usuario
                },
                success: function(conn, response, options, eOpts) {
                      var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                      if (result.success) {
                               Ext.each(result.items, function(item) {
                                      if (item.ERROR>0){
                                            idper = item.ERROR;


                                      }
                               });
                        } else {
                                    MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
                                    return false;
                        }
                    try{
                        store.getProxy().extraParams  = {
                            'pid'      : idper,
                            'ppaterno' : null,
                            'pmaterno' : null,
                            'pnombres' : null,
                        };
                        store.loadPage(1);
                    }catch(ex){
                        Ext.getCmp('cboProveedor').getStore().reload();
                    }

                    win.close();
                },
                failure: function(conn, response, options, eOpts) {}
            });

        }else{
            Ext.Msg.alert("Error","Falta Ingresar Datos");
        }

}
