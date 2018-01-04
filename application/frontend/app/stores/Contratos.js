Ext.define('MyDesktop.app.stores.Contratos', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.Contrato',
  autoLoad : false,
  remoteSort : true,
  autoSync : true,
  pageSize : 25,
  sorters : [ {property : 'idcontrato', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listarcontratos'},
    extraParams : {
      pidcontrato : 0,
      pcliente : null,
      pestado : 0,
      pdesde : null,
      phasta : null,
      psede  : 0
    },
    reader : {type : 'json', root : 'items'}

  }
});

//@ Listar Contratos Notas
Ext.define('MyDesktop.app.stores.ContratosNotas', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.Contrato',
  autoLoad : false,
  remoteSort : true,
  autoSync : true,
  pageSize : 25,
  sorters : [ {property : 'idcontrato', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listarcontratosnotas'},
    extraParams : {
      pidcontrato : 0,
      pcliente : null,
      pestado : 0,
      pdesde : null,
      phasta : null,
      psede  : 0
    },
    reader : {type : 'json', root : 'items'}

  }
});

//@ Listar Contratos Honorarios
Ext.define('MyDesktop.app.stores.ContratosHonorarios', {
  extend : 'Ext.data.Store',
  model : 'MyDesktop.app.models.Contrato',
  autoLoad : false,
  remoteSort : true,
  autoSync : true,
  pageSize : 25,
  sorters : [ {property : 'idcontrato', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listarcontratoshonorarios'},
    extraParams : {
      pidcontrato : 0,
      pcliente : null,
      pestado : 0,
      pdesde : null,
      phasta : null,
      psede  : 0
    },
    reader : {type : 'json', root : 'items'}

  }
});


Ext.define('MyDesktop.app.stores.ContratosDet', {
  extend : 'Ext.data.Store',
  requires : [ 'MyDesktop.app.models.Contrato' ],
  model : 'MyDesktop.app.models.ContratoDet',
  autoLoad : false,
  remoteSort : false,
  autoSync : false,
  pageSize : 30,
  sorters : [ {property : 'iddet', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listardetallecontrato'},
    extraParams : {idcontra : 0},
    reader : {type : 'json', root : 'items'}

  }

});

Ext.define('MyDesktop.app.stores.ContratosDetRegBobinas', {
  extend : 'Ext.data.Store',
  requires : [ 'MyDesktop.app.models.Contrato' ],
  model : 'MyDesktop.app.models.ContratoDet',
  autoLoad : false,
  remoteSort : false,
  autoSync : false,
  pageSize : 30,
  sorters : [ {property : 'iddet', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listardetallecontratoregbobina'},
    extraParams : {idcontra : 0},
    reader : {type : 'json', root : 'items'}

  }

});

Ext.define('MyDesktop.app.stores.FormaPago', {
  extend : 'Ext.data.Store',
  requires : [ 'MyDesktop.app.models.Contrato' ],
  model : 'MyDesktop.app.models.FormaPago',
  autoLoad : true,
  remoteSort : true,
  autoSync : true,
  pageSize : 100,
  sorters : [ {property : '_idfpag', direction : 'ASC'} ],
  proxy : {
    type : 'ajax',
    api : {read : 'index.php/contratos/listarformapago'},
    reader : {type : 'json', root : 'items'}

  }

});
