Ext.define('MyDesktop.app.models.notapedido.NotaPedido', {
  extend : 'Ext.data.Model',
  fields : [
    {name : '_id'},
    {name : '_fecha'},
    {name : '_persona'},
    {name : '_subtotal', type : 'double'},
    {name : '_igv', type : 'double'},
    {name : '_total', type : 'double'},
    {name : '_numerodoc', type : 'string'}

  ]
});
