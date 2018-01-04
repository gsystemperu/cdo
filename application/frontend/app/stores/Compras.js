Ext.define('MyDesktop.app.stores.Compras', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.Compra',
  autoLoad : false,
  remoteSort : true,
  autoSync : true,
  pageSize : 1000,
  sorters : [ {property : 'id', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/compras/listarcompras'},
    extraParams :
        {pdesde : null, phasta : null, pproveedor : null, pnumerodoc : null,psede : null},
    reader : {type : 'json', root : 'items'}
 
  }

});

Ext.define('MyDesktop.app.stores.DetalleCompra', {
  extend : 'Ext.data.Store',
  requires : [ 'MyDesktop.app.models.Producto' ],
  model : 'MyDesktop.app.models.DetalleCompra'
});
