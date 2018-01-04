Ext.define('MyDesktop.app.views.documento.NotasDePedidoUsuario', {
  extend : 'Ext.window.Window',
  width : 600,
  height : 300,
  autoShow : true,
  modal : true,
  layout : 'fit',
  config : {idpersona : 0},
  requires : [ 'MyDesktop.app.stores.notapedido.NotaPedido' ],
  initComponent : function() {
    me = this;
    var storeNotasDePedido =
        Ext.create('MyDesktop.app.stores.notapedido.NotaPedido');

    storeNotasDePedido.getProxy().extraParams = {
      pidpersona : me.getIdpersona()
    };
    storeNotasDePedido.load();

    Ext.applyIf(me, {
      title : 'Busqueda de Notas de Pedido del Cliente',
      items : [
        {
          xtype : 'gridpanel',
          id : 'dgvNotasDePedido',
          sortableColumns : false,
          store : storeNotasDePedido,
          columns : [
            {
              text : "Documento",
              flex : 0.5,
              sortable : true,
              dataIndex : '_numerodoc',
              align : 'center'
            },
            {
              text : "Fecha Doc.",
              flex : 0.8,
              sortable : true,
              dataIndex : '_fecha',
              align : 'center'
            },
            {
              text : "Cliente",
              flex : 2,
              sortable : true,
              dataIndex : '_persona',
              align : 'left'
            },
            /*{
              text : "Sub total",
              flex : 0.5,
              sortable : true,
              dataIndex : '_subtotal',
              align : 'center'
            },
            {
              text : "Igv",
              flex : 0.5,
              sortable : true,
              dataIndex : '_igv',
              align : 'right'
            },*/
            {
              xtype:'numbercolumn',
              text : "Total",
              flex : 0.5,
              sortable : true,
              dataIndex : '_total',
              align : 'right'
            }
          ]
        }
      ],
      tbar : [
        {
          xtype : 'button',
          text : 'Salir',
          iconCls : 'x-ico-salir',
          handler : function() { me.close(); }
        }

      ]

    });
    me.callParent(arguments);

    Ext.getCmp('dgvNotasDePedido')
        .on('itemclick', me.getSeleccionarNotaPedido, this);
  },
  getSeleccionarNotaPedido : function(dg, record, index, eOpts) {
    this.getCargarDatosDeVenta(record.get('_id'));
  },
  getCargarDatosDeVenta : function(id) {
    ix = 0;
    Ext.Ajax.request({
      url : 'index.php/contratos/buscarcontratocab',
      params : {pidcontrato : id},
      success : function(conn, response, options, eOpts) {
        var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);

        Ext.each(result.items, function(item) {
          Ext.getCmp('txtSubtotal').setValue(item.subtotal);
          Ext.getCmp('txtIgv').setValue(item.igv);
          if (item.perdise != null) {
            Ext.getCmp('cboDise').setValue(item.perdise.toString());
          }
          Ext.getCmp('cboTienda').setValue(item.tienda.toString());
          Ext.getCmp('txtIdNotaPedido').setValue(item.id);
          Ext.getCmp('cboFormaPago').setValue(item.idformapago.toString());
          Ext.getCmp("cboTipoMoneda").setValue(item.tipmoneda);
          Ext.getCmp("txtPagoAcuenta1").setValue(item.pagacuenta1);
          Ext.getCmp("txtPagoAcuenta2").setValue(item.pagacuenta2);
          Ext.getCmp("txtPagoAcuenta3").setValue(item.pagacuenta3);

          Ext.ComponentQuery.query('#dtPagoAcuenta1')[0].setValue(item.fpagacuenta1);
          __total_acuenta=0;
          if(parseFloat(item.pagacuenta1)>0){
              __total_acuenta = __total_acuenta + parseFloat(item.pagacuenta1)

          }
          if(parseFloat(item.pagacuenta2)>0){
              __total_acuenta = __total_acuenta + parseFloat(item.pagacuenta2)

          }
          if(parseFloat(item.pagacuenta3)>0){
              __total_acuenta = __total_acuenta + parseFloat(item.pagacuenta3)

          }

          //console.log(parseFloat(item.total) - __total_acuenta);
          Ext.getCmp('txtTotal').setValue( parseFloat( item.total) );
          if(__total_acuenta>0)
            Ext.ComponentQuery.query('#txtSaldoCobrar')[0].setValue(parseFloat( item.total) - parseFloat(__total_acuenta))

          if (item.tipdoc == 'B') {
            Ext.getCmp('rbB').setValue(true);
          } else if(item.tipdoc=='F') {
            Ext.getCmp('rbF').setValue(true);
          }
          if (parseFloat(item.igv) != 0) {
            Ext.getCmp('ckbAplicarIgv').setRawValue(true);
            Ext.getCmp('ckbAplicarIgv').setValue(true);

          } else {
            Ext.getCmp('ckbAplicarIgv').setRawValue(false);
            Ext.getCmp('ckbAplicarIgv').setValue(false);
          }

          Ext.ComponentQuery.query('#cboMedCirujano')[0].setValue(item._idmedcirujano);
          Ext.ComponentQuery.query('#cboProveedor')[0].setValue(item._idproveedor);
          Ext.ComponentQuery.query('#cboVendedor')[0].setValue(item._idvendedor);

          Ext.ComponentQuery.query('#cboMedExterno')[0].setValue(item._idmedexterno);

        });
        var grid = Ext.getCmp('dgvDetalleContrato');
        grid.getEl().mask('Cargando la informacion!!!');
        Ext.Ajax.request({
          url : 'index.php/contratos/buscarcontratodet',
          params : {pidcontrato : id},
          success : function(conn, response, options, eOpts) {
            var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
            var store = grid.getStore();
            Ext.each(result.items, function(item) {
              store.add({
                id : ix,
                idprod : parseInt(item.idpro),
                producto : item.idproducto,
                medida1 : 0,
                medida2 : 0,
                cantidad : item.cant,
                total : item.total,
                idmat : 0,
                material : 0,
                bobina : '',
                idope : 0,
                obser : item.observacion,
                textodet : ''

              });
              ix++;
            });
            store.sync();
            grid.getEl().unmask();
            Ext.getCmp('wcontratoeditar').getCalcularContrato();

          }
        });
      }
    });

    this.close();

  }

});
