Ext.define("MyDesktop.app.views.Proveedores", {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wproveedores',
  /*requires   : [
      'MyDesktop.app.stores.Proveedores',
      'MyDesktop.app.stores.Generos',
      'MyDesktop.app.views.ProveedorEditar'

  ],*/
  initComponent : function() {
    var storeproveedores = Ext.create('MyDesktop.app.stores.Proveedores');
    var storebusquedas = Ext.create('MyDesktop.app.stores.Busquedas');
    Ext.apply(this, {
      layout : 'fit',
      items : [
        {
          border : false,
          xtype : 'gridpanel',
          store : storeproveedores,
          id : 'dgvproveedor',
          sortableColumns : false,
          columns : [
            {
              text : "Id",
              flex : 0.3,
              sortable : true,
              dataIndex : '_idprov',
            },
            {
              text : "Apellido Paterno",
              flex : 1,
              sortable : true,
              dataIndex : '_paterno'
            },
            {
              text : "Apellido Materno",
              flex : 1,
              sortable : true,
              dataIndex : '_materno'
            },
            {
              text : "Nombres",
              sortable : true,
              flex : 1,
              dataIndex : '_nombre'
            },
            {
              text : "Doc.Identidad",
              style : 'text-aling:center',
              flex : 0.8,
              sortable : true,
              dataIndex : '_numerodoc',
              align : 'right',

            },
            {
              text : "R.U.C",
              style : 'text-aling:center',
              flex : 0.8,
              sortable : true,
              dataIndex : '_numeroruc',
              align : 'right',
            },
            {
              text : "Telefono",
              style : 'text-aling:center',
              flex : 0.8,
              sortable : true,
              dataIndex : '_telefono',
              align : 'right',

            },
            {
              text : "Celular",
              style : 'text-aling:center',
              flex : 0.8,
              sortable : true,
              dataIndex : '_celular',
              align : 'right',
            }
          ]
        }
      ],
      tbar : [
        {
          xtype : 'combobox',
          id : 'cboBuscarProvPor',
          emptyText : 'Tipo de Busqueda',
          store : storebusquedas,
          queryMode : 'local',
          displayField : 'descripcion',
          valueField : 'id',
          value : '0'

        },
        {
          xtype : 'textfield',
          id : 'txtbuscarProv',
          labelWidth : 50,
          fieldStyle : 'text-transform:uppercase'
        },
        {
          text : 'Buscar',
          id : 'btnBuscarProv',
          iconCls : 'user',
          handler : function() {
            console.log("test");
            var texto = Ext.getCmp('txtbuscarProv').getValue();
            var idTipoBus = Ext.getCmp('cboBuscarProvPor').getValue();
            if (idTipoBus == null) {
              Ext.Msg.alert('Error', 'Seleccione el tipo de busqueda!');
              return false;
            }

            storeproveedores.getProxy().extraParams = {
              'pid' : (idTipoBus == 0 ? texto : 0),
              'ppaterno' : (idTipoBus == 1 ? texto : null),
              'pmaterno' : (idTipoBus == 2 ? texto : null),
              'pnombres' : (idTipoBus == 3 ? texto : null),
            };
            storeproveedores.loadPage(1);

          }
        },
        '-',
        {
          text : 'Listar',
          tooltip : 'Agregar Registro',
          iconCls : 'icon-grid',
          handler : function() {
            var texto = null;
            var idTipoBus = 0;
            storeproveedores.getProxy().extraParams = {
              'pid' : (idTipoBus == 0 ? texto : 0),
              'ppaterno' : (idTipoBus == 1 ? texto : null),
              'pmaterno' : (idTipoBus == 2 ? texto : null),
              'pnombres' : (idTipoBus == 3 ? texto : null),
            };
            storeproveedores.loadPage(1);
          }
        },
        '-',
        {
          text : 'Nuevo',
          tooltip : 'Agregar Registro',
          iconCls : 'add',
          handler : function() {
            var frm = Ext.create('MyDesktop.app.views.ProveedorEditar');

          }
        },
        '-',
        {
          text : 'Modificar',
          tooltip : 'Mdificar opciones',
          iconCls : 'boton-edit',
          listeners :
              {click : function() { fx_RegistroModificarProveedor(); }}
        },
        '-',
        {

          xtype : 'splitbutton',
          text : 'Reportes',
          menu : {
            items : [
              {text : 'Imprimir el Proveedor'},
              {text : 'Listado de Proveedores'}
            ]
          }

        }
      ],
      dockedItems : [
        {
          xtype : 'pagingtoolbar',
          id : 'ptbproveedores',
          store : storeproveedores, // same store GridPanel is using
          dock : 'bottom',
          displayInfo : true
        }
      ]

    });
    this.callParent(arguments);
  }

});

function fx_RegistroModificarProveedor() {
  var grid = Ext.getCmp('dgvproveedor');
  record = grid.getSelectionModel().getSelection();
  if (record[0]) {
    var editfrm = Ext.create('MyDesktop.app.views.ProveedorEditar');
    editfrm.down('form').loadRecord(record[0]);
  } else {
    Ext.Msg.alert("Aviso", "Tiene que seleccionar un Proveedor!");
  }
}
