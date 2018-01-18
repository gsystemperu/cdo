/**
 * Created by eerazo on 30/12/14.
 */
Ext.define('MyDesktop.app.views.Login',{
    extend  : 'Ext.window.Window',
    requires : [
    'MyDesktop.app.stores.Trabajadores'
  ],
  initComponent : function() {
          var store = new Ext.create('MyDesktop.app.stores.Tiendas');

          Ext.apply(this, {
            id     : 'login',
            modal  : true,
            height: 195,
            width : 380,
            resizable: false,
            iconCls : 'user',
            border: false,
            autoShow : true,
            title : '[Ingreso del Sistema - ::..  Clinica de los Ojos ..::  ]',
            items :[
                {
                    xtype : 'form',
                    id  : 'frmlogin',
                    labelWidth: 50,
                    bodyPadding : '20px',
                    url: 'index.php/usuarios/login',
                    frame: true,
                    defaultType: 'textfield',
                    monitorValid: true,
                    items: [{
                        fieldLabel: '<b>Usuario</b>',
                        name: 'username',
                        width : 330,
                        fieldStyle:'text-transform:uppercase;color:red;',
                        value  : 'EERAZO'
                    },{
                        fieldLabel: '<b>Contrase&ntilde;a</b>',
                        name: 'password',
                        inputType: 'password',
                        width : 330,
                        allowBlank: false,
                        enableKeyEvents: true,
                        value  : '10021985',
                        listeners: {
                            keypress:function(textfield, e) {
                                if (e.button == 12) {
                                    doLogin();
                                }
                            }
                        }
                    },{
                      xtype : 'combobox',
                      fieldLabel : '<b>Sede</b>',
                      labelAlign : 'left',
                      name : 'sede',
                      padding : 2,
                      id : 'cboSede',
                      width : 330,
                      store :store,
                      queryMode : 'local',
                      displayField : 'descrip',
                      valueField : 'id',
                      forceSelection : true,
                      editable : false,
                      emptyText : '----- SELECCIONAR LA SEDE ------',
                      value : 1

                    }],
                    buttons:[{
                        text: 'Ingresar',
                        iconCls:'connect',
                        formBind: true,
                        id: 'submit',
                        width:150,
                        handler: function(){
                                  doLogin();
                        }
                    }]
                }

            ]
          });
            this.callParent(arguments);
  }


});
function doLogin(){
    login = Ext.getCmp('frmlogin');
    if(Ext.getCmp('cboSede').getValue() == null){ Ext.Msg.alert("Aviso","Seleccionar la sede !");return false; }

    if (login.getForm().isValid()) {
        login.getForm().submit({
            method: 'POST',
            waitTitle: 'Conectando',
            waitMsg: 'Enviando datos...',
            success:function(form, action){
                idusuario =action.result.usuario.user;
                nombusuar =action.result.usuario.datos;
                grupo     =action.result.usuario.grupo;
                Ext.util.Cookies.set('idusuario', '');
                Ext.util.Cookies.set('nombusuario', '');
                Ext.util.Cookies.set('idusuario', idusuario);
                Ext.util.Cookies.set('nombusuario', nombusuar);
                //Ext.util.Cookies.set('grupo',grupo);
                Ext.util.Cookies.set('sede',Ext.getCmp('cboSede').getValue());
                Ext.util.Cookies.set('nombresede',Ext.getCmp('cboSede').getRawValue());
                myDesktopApp = new MyDesktop.App();
                Ext.getCmp('login').close();
            },
            failure: function(form, action){
                if(action.failureType == 'server'){
                    MyDesktop.app.util.Util.showErrorMsg('Usuario y Contrase\xf1a incorrectas!');
                    return false;
                } else {
                    MyDesktop.app.util.Util.showErrorMsg('Servidor no responde: ' + action.response.responseText);
                    return false;
                }
                login.getForm().reset();
            }
        });
    }
}
