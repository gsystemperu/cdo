Ext.define('MyDesktop.app.stores.Mantenimientos',
           {extend : 'Ext.data.Store', proxy : {type : 'memory'}});

Ext.define('MyDesktop.app.stores.FormaPago', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.mantenimiento.FormaPago',
  autoLoad : true,
  remoteSort : true,
  autoSync : true,
  pageSize : 50,
  sorters : [ {property : '_idfpag'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/mantenimientos/listarformapago'},
    reader : {type : 'json', root : 'items'}
  }
});

Ext.define('MyDesktop.app.stores.DocumentoInterno', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.mantenimiento.DocumentoInterno',
  autoLoad : true,
  remoteSort : true,
  autoSync : true,
  pageSize : 50,
  sorters : [ {property : '_id'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/mantenimientos/listardocumentosinternos'},
    reader : {type : 'json', root : 'items'}
  }
});

Ext.define('MyDesktop.app.stores.TipoMoneda', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.mantenimiento.TipoMoneda',
  autoLoad : true,
  remoteSort : true,
  autoSync : true,
  pageSize : 50,
  sorters : [ {property : '_idmon'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/mantenimientos/listartipomoneda'},
    reader : {type : 'json', root : 'items'}
  }
});


Ext.define('MyDesktop.app.stores.Tiketeras', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.mantenimiento.Tiketera',
  autoLoad : true,
  remoteSort : true,
  autoSync : true,
  pageSize : 50,
  sorters : [ {property : '_id'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/mantenimientos/listartiketeras'},
    reader : {type : 'json', root : 'items'}
  }
});