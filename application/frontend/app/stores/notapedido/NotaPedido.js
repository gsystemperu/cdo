Ext.define('MyDesktop.app.stores.notapedido.NotaPedido', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.notapedido.NotaPedido',
  autoLoad : false,
  remoteSort : true,
  autoSync : true,
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listarnotasdepedido'},
    extraParams : {pidpersona : 0},
    reader : {type : 'json', root : 'items'}
  }

});
