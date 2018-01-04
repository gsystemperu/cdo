/*Ext.define('MyDesktop.app.models.Stock',{
    extend : 'Ext.data.Model',
    fields: [
        {name : '_tipo'},
        {name : '_proveedor'},
        {name : '_cliente'},
        {name : '_idprod'},
        {name : '_producto'},
        {name : '_entrada'},
        {name : '_salida'},
        {name : '_fechahora'}
    ]

});*/

Ext.define('MyDesktop.app.models.Stock',{
    extend : 'Ext.data.Model',
    fields: [
        {name : '_producto'},
        {name : '_stock',type : 'int'}
    ]

});
