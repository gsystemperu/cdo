Ext.define("MyDesktop.app.views.Clientes", {
  extend : 'Ext.panel.Panel',
  alias : 'widget.wclientes',
  requires:['MyDesktop.app.stores.Clientes'],
  initComponent : function() {
    var storeclientes = Ext.create('MyDesktop.app.stores.ClientesBuscar');
    var storebusquedas = Ext.create('MyDesktop.app.stores.BusquedasPersonas');
    Ext.apply(this, {
      layout : 'fit',
      items : [
        {
          border : false,
          xtype : 'gridpanel',
          store : storeclientes,
          id : 'dgvcliente',
          itemId:"dgvcliente",
          sortableColumns : false,
          columns : [
            //  new Ext.grid.RowNumberer(),
            {
              text : "Id",
              flex : 0.3,
              sortable : true,
              dataIndex : '_idper',
            },
            {
              text : "Nombres",
              sortable : true,
              flex : 1,
              dataIndex : '_nombre'
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
              text : "Doc.Identidad",
              style : 'text-aling:center',
              flex : 1,
              sortable : true,
              dataIndex : '_numerodoc'

            },
            {
              text:"Razon Social",
              style:"text-align:center",
              flex:1,
              sortable:true,
              dataIndex:"_razonsocial"
            },
            {
              text : "R.U.C",
              style : 'text-aling:center',
              flex : 1,
              sortable : true,
              dataIndex : '_numeroruc'
            }
          ]
        }
      ],
      tbar : [
        {
          xtype : 'combobox',
          id : 'cboBuscarPor',
          emptyText : 'Tipo de Busqueda',
          store : storebusquedas,
          queryMode : 'local',
          displayField : 'descripcion',
          valueField : 'id',
          value : '0'

        },
        {
          xtype : 'textfield',
          id : 'txtbuscar',
          labelWidth : 50,
          fieldStyle : 'text-transform:uppercase',
          flex:1
        },
        {
          text : '<b>Buscar</b>',
          id : 'btnBuscarClie',
          iconCls : 'user',
          handler : function() {
            var texto = Ext.getCmp('txtbuscar').getValue();
            var idTipoBus = Ext.getCmp('cboBuscarPor').getValue();
            if (idTipoBus == null) {
              Ext.Msg.alert('Error', 'Seleccione el tipo de busqueda!');
              return false;
            }

            storeclientes.getProxy().extraParams = {
              'pid' : idTipoBus,
              'pdatospersona' : (idTipoBus != 1 ? texto : null)

            };
            storeclientes.loadPage(1);

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
            storeclientes.getProxy().extraParams = {
              'pid' : (idTipoBus == 1 ? texto : 0),
              'pdatospersona' : (idTipoBus == 0 ? texto : null)

            };
            storeclientes.loadPage(1);
          }
        },
        '-',
        {
          text : 'Nuevo',
          tooltip : 'Agregar Registro',
          iconCls : 'add',
          handler : function() {
            var config = {wcita : 0};
            var frm = Ext.create('MyDesktop.app.views.ClienteEditar', config);

          }
        },
        '-',
        {
          text : 'Modificar',
          tooltip : 'Mdificar opciones',
          iconCls : 'boton-edit',
          listeners :
              {click : function() { fs_RegistroModificarPersona(); }}
        }
      ],
     /* dockedItems : [
        {
          xtype : 'pagingtoolbar',
          id : 'ptbclientes',
          // store: storeclientes,   // same store GridPanel is using
          dock : 'bottom',
          displayInfo : true
        }
      ]*/

    });
    this.callParent(arguments);
  }

});
function fs_RegistroModificarPersona() {
  var grid = Ext.getCmp('dgvcliente');
  record = grid.getSelectionModel().getSelection();
  if (record[0]) {
    var editfrm = Ext.create('MyDesktop.app.views.ClienteEditar');
    editfrm.down('form').loadRecord(record[0]);
  } else {
    Ext.Msg.alert("Aviso", "Tiene que seleccionar un cliente!");
  }
}
