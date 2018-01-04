Ext.define('MyDesktop.app.models.Compra',{
    extend : 'Ext.data.Model',
    fields: [
        {name : 'id'},
        {name : 'fecha'},
        {name : 'numerodocumento'},
        {name : 'tipo'},
        {name : 'proveedor'},
        {name : 'subtotal', type: 'float'},
        {name : 'igv', type: 'float'},
        {name : 'total',type: 'float'},
        {name : 'est'},
        {name : 'tipdoc'},
        {name : '_idprov'}


    ]

});