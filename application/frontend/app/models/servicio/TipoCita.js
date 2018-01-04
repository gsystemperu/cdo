
Ext.define('MyDesktop.app.models.servicio.TipoCita',{
    extend : 'Ext.data.Model',
    fields: [
        {name : '_idtipocita',type:'int'},
        {name : '_descripcion',type :'string'},
        {name : '_precio',type:'float'},
        {name : '_moneda',type:'int'},
        {name : '_control',type:'int'},
        {name : '_estado',type:'int'}
    ]

});