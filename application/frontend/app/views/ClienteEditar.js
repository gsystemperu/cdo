Ext.define('MyDesktop.app.views.ClienteEditar', {
  extend : 'Ext.window.Window',
  alias : 'widget.clieditar',
  requires : [
    'MyDesktop.app.util.Util',
    'MyDesktop.app.util.Alert',
    'MyDesktop.app.stores.Generos',
     'Ext.ux.desktop.InputTextMask'
  ],
  id : 'wCliente',
  width : 500,
  height : 560,
  modal : true,
  floating : true,
  autoShow : true,
  title : 'Cliente',
  layout : {aling : 'stretch', type : 'fit'},
  config : {wcita : 0},
  initComponent : function() {
    var storeGenero = Ext.create('MyDesktop.app.stores.Generos');
    me = this;
    Ext.apply(me, {
      items : [
        {
          xtype : 'form',
          id : 'myFormCliente',
          bodyPadding : 5,
          layout : {type : 'hbox', align : 'stretch'},
          items : [
            {
              xtype : 'fieldset',
              flex : 2,
              title : 'Informaci&oacute;n Principal',
              defaults : {
                // afterLabelTextTpl: Packt.util.Util.required,
                anchor : '100%',
                xtype : 'textfield',
                allowBlank : true,
                labelWidth : 150

              },
              items : [
                {
                  xtype : 'hiddenfield',
                  fieldLabel : 'Label',
                  name : '_idper',
                  id : 'idper'
                },
                {
                  fieldLabel : 'Apellido Paterno',
                  name : '_paterno',
                  id : 'paternoper',
                  fieldStyle : 'text-transform:uppercase'
                },
                {
                  fieldLabel : 'Apellido Materno',
                  maxLength : 100,
                  name : '_materno',
                  id : 'maternoper',
                  fieldStyle : 'text-transform:uppercase'
                },
                {
                  fieldLabel : 'Nombres',
                  maxLength : 100,
                  name : '_nombre',
                  id : 'nombreper',
                  fieldStyle : 'text-transform:uppercase'
                },
                 
                {
                  fieldLabel : 'Correo',
                  name : '_correo',
                  id : 'correo',
                  vtype : 'email'

                },
                {
                  xtype : 'combobox',
                  fieldLabel : 'Sexo',
                  maxLength : 100,
                  name : '_sexo',
                  id : 'cboSexo',
                  store : storeGenero,
                  valueField : 'id',
                  displayField : 'descripcion',
                  editable : false
                },
                /*{
                  xtype : 'datefield',
                  fieldLabel : 'Fecha Nacimiento',
                  id : 'dtFechaNacimiento',
                  name : '_fnaciper',
                  // value : new Date(),
                  editable : false

                },*/
                 {
                    xtype : 'textfield',
                    fieldLabel: 'Fecha Nacimiento',
                    id  : 'dtFechaNacimiento',
                  name : '_fnaciper',
                    allowBlank:true,
                    plugins: [new Ext.ux.desktop.InputTextMask('99/99/9999')]

                },
                {
                  xtype : 'combobox',
                  fieldLabel : 'Tipo Documento',
                  name : '_iddoc',
                  id : 'iddocidentidad',
                  store : Ext.create('MyDesktop.app.stores.TipoDocumentos'),
                  queryMode : 'local',
                  displayField : 'descripcion',
                  valueField : 'id',
                  value : '1'

                },
                {
                  fieldLabel : 'Numero',
                  name : '_numerodoc',
                  id : 'numdocper',
                  fieldStyle : 'text-transform:uppercase;text-align:right'
                },
                {
                  fieldLabel:"Razon Social",
                  name:"_razonsocial",
                  itemId:"_razonsocial",
                  id:"razonsocial",
                  fieldStyle:"text-transform:uppercase"
                },
                {
                  fieldLabel : 'RUC',
                  name : '_numeroruc',
                  id : 'numrucper',
                  fieldStyle : 'text-transform:uppercase;text-align:right'
                },

                {
                  fieldLabel : 'Telefono',
                  name : '_telefono',
                  id : 'telper',
                  fieldStyle : 'text-transform:uppercase;text-align:right'
                },
                {
                  fieldLabel : 'Celular',
                  name : '_celular',
                  id : 'celper',
                  fieldStyle : 'text-transform:uppercase;text-align:right'
                },
                {
               	  fieldLabel : 'Direccion',
                  name : '_domicilio',
                  id : 'direper',
                  fieldStyle : 'text-transform:uppercase;text-align:right'
                },
                {
               	  fieldLabel : 'Lugar Nacimiento',
                  name : '_lugarnaci',
                  id : 'lugarnaciper',
                  fieldStyle : 'text-transform:uppercase;text-align:right'
                },

                {
                  xtype : 'combobox',
                  fieldLabel : 'Estado',
                  name : '_estado',
                  id : 'estado',
                  store : Ext.create('MyDesktop.app.stores.Estados'),
                  queryMode : 'local',
                  displayField : 'descripcion',
                  valueField : 'id',
                  value : '1'

                },
                {
                    xtype:"textfield",
                    fieldLabel:"Ocupacion",
                    name:"ocupacion",
                    itemId:"ocupacion",
                    id:"ocupacion",
                    fieldStyle:"text-transform:uppercase;text-align:left"
                }
              ]
            }
          ]
        }
      ],
      dockedItems : [
        {
          xtype : 'toolbar',
          flex : 1,
          dock : 'bottom',
          ui : 'footer',
          layout : {pack : 'end', type : 'hbox'},
          items : [
            {
              xtype : 'button',
              text : 'Cancelar',
              itemId : 'btnCancelar',
              iconCls : 'remove',
              scale : 'medium',
              handler : function() {
                win = Ext.getCmp('wCliente');
                win.close();
              }
            },
            {
              xtype : 'button',
              text : 'Grabar',
              itemId : 'btnGrabar',
              iconCls : 'add',
              scale : 'medium',
              handler : function() { fx__ClienteActualizar(); }
            }
          ]
        }
      ]
    });
    me.callParent(arguments);
  },

});

function fx__ClienteActualizar() {

  var w = Ext.getCmp('wCliente');
  var idper = 0;
  win = Ext.getCmp('wCliente');
  formPanel = Ext.getCmp('myFormCliente');
  if (formPanel.getForm().isValid()) {

    if (w.getWcita() == 0) {
      store = Ext.getCmp('dgvcliente').getStore();
    };
    idper = Ext.getCmp('idper').getValue(),
    paterno = Ext.getCmp('paternoper').getValue();
    materno = Ext.getCmp('maternoper').getValue();
    nombre = Ext.getCmp('nombreper').getValue();
    sexo = Ext.getCmp('cboSexo').getValue(),
    fnaci = Ext.getCmp('dtFechaNacimiento').getValue(),
    iddoctipo = Ext.getCmp('iddocidentidad').getValue();
    numdoc = Ext.getCmp('numdocper').getValue();
    numruc = Ext.getCmp('numrucper').getValue();
    estado = Ext.getCmp('estado').getValue();
    domicilio = Ext.getCmp('direper').getValue(), telefono = Ext.getCmp('telper').getValue();
    celular = Ext.getCmp('celper').getValue();
    correoper=Ext.getCmp('correo').getValue();
    idocupacion = '', estadocivil = '', lugarnaci = Ext.getCmp('lugarnaciper').getValue(), procede = '',
    usuario =  Ext.util.Cookies.get('idusuario');
    ocupacion=Ext.getCmp("ocupacion").getValue();
    razonsocial=Ext.getCmp("razonsocial").getValue();

              Ext.Ajax.request({
                url : 'index.php/clientes/actualizar',
                params : {
                  idper : idper,
                  paternoper : paterno,
                  maternoper : materno,
                  nombreper : nombre,
                  sexoper : sexo,
                  fnaciper : fnaci,
                  iddocidentidad : iddoctipo,
                  numdocper : numdoc,
                  numrucper : numruc,
                  estadoper : estado,
                  domicilioper : domicilio,
                  telefonoper : telefono,
                  celularper : celular,
                  idocupacionper : idocupacion,
                  estadocivilper : estadocivil,
                  lugarnaciper : lugarnaci,
                  procedeper : procede,
                  usuario : usuario,
                  correo:correoper,
                  ocupacion:ocupacion,
                  razonsocial:razonsocial
                },
                success : function(conn, response, options, eOpts) {
                  var result =
                      MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                  if (result.success) {
                    Ext.each(result.items, function(item) {
                      if (item.ERROR > 0) {
                        idper = item.ERROR;
                        if (w.getWcita() == 3){
                         // Ext.getCmp('cboPersona').setValue(item.ERROR);
                        } else if (w.getWcita() > 0) {
                           //Ext.getCmp('cboPaciente').setValue(item.ERROR);
                        }
                      }
                    });
                  } else {
                    MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
                    return false;
                  }

                  if (w.getWcita() == 0) {
                    store.getProxy().extraParams = {
                      'pid' : idper,
                      'ppaterno' : null,
                      'pmaterno' : null,
                      'pnombres' : null
                    };
                    store.loadPage(1);
                  };
                  win.close();
                },
                failure : function(conn, response, options, eOpts) {}
              });

  } else {
    Ext.Msg.alert("Error", "Falta Ingresar Datos");
  }
}
