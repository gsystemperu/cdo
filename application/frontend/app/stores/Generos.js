Ext.define('MyDesktop.app.stores.Generos', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : 'M', descripcion : 'MASCULINO'},
    {id : 'F', descripcion : 'FEMENINO'}
  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.TipoDoc', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : 'B', descripcion : 'BOLETA'},
    {id : 'F', descripcion : 'FACTURA'},
    {id : 'N', descripcion : 'NOTA PEDIDO'}

  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.Estados', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '0', descripcion : 'ELIMINADO'},
    {id : '1', descripcion : 'ACTIVO'},
    {id : '2', descripcion : 'SUSPENDIDO'},
    {id : '3', descripcion : 'DESCANSO'},

  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.TipoDocumentos', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '0', descripcion : ''},
    {id : '1', descripcion : 'DOCUMENTO NACIONAL DE IDENTIDAD'},
    {id : '2', descripcion : 'PASAPORTE'},
    {id : '3', descripcion : 'CARNET POLICIAL'},

  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.Busquedas', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '0', descripcion : 'CODIGO'},
    {id : '1', descripcion : 'APELLIDO PATERNO'},
    {id : '2', descripcion : 'APELLIDO MATERNO'},
    {id : '3', descripcion : 'NOMBRES'}
  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.BusquedasPersonas', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '0', descripcion : 'APELLIDOS Y NOMBRES'},
    {id : '1', descripcion : 'CODIGO'},
    {id:"2",descripcion:"RAZON SOCIAL"},
    {id:"3",descripcion:"RUC"}
  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.BusquedasVentas', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '-1', descripcion : 'TODOS'},
    {id : '0', descripcion : 'CODIGO DOCUMENTO'},
    {id : '1', descripcion : 'CLIENTE'},
    {id : '2', descripcion : 'SOLO CANCELADOS'},
    {id : '3', descripcion : 'SOLO PROCESADOS'},
    {id : '4', descripcion : 'SOLO ELIMINADOS'},
    {id : '5', descripcion : 'SOLO TERMINADOS'}
  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.BusquedasCompras', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '-1', descripcion : 'TODOS'},
    {id : '0', descripcion : 'NUMERO DOCUMENTO'},
    {id : '1', descripcion : 'PROVEEDOR'}
  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.EstadoCivil', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '1', descripcion : 'SOLTERO'},
    {id : '2', descripcion : 'CASADO'},
    {id : '3', descripcion : 'VIUDO'},
    {id : '4', descripcion : 'DIVORCIADO'},

  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.Control', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '1', descripcion : 'SI'},
    {id : '0', descripcion : 'NO'},
  ],
  proxy : {type : 'memory'}
});

Ext.define('MyDesktop.app.stores.TipoMonedas', {
  extend : 'Ext.data.Store',
  fields : [ "id", "descripcion" ],
  data : [
    {id : '1', descripcion : 'SOLES'},
    {id : '2', descripcion : 'DOLARES'},
    {id : '3', descripcion : 'EUROS'},
  ],
  proxy : {type : 'memory'}
});
