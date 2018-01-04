Ext.define("MyDesktop.app.models.consultorio.LenteContacto", {
    extend : 'Ext.data.Model',
    fields: [
        {name : '_idod', type :'int'},
        {name : '_idconsul',type : 'int'},
        {name : '_fecha',type : 'string'},
        {name : '_esfera',type : 'string'},
        {name : '_cilindro',type : 'string'},
        {name : '_eje',type : 'string'},
        {name : '_radio',type : 'string'},
        {name : '_potencia',type : 'string'},
        {name : '_diametro',type : 'string'},
        {name : '_curva',type : 'string'},
        {name : '_tipo',type : 'string'},
        {name : '_obser',type : 'string'},
        {name : '_idmed',type : 'string'},
        {name : '_medico',type : 'string'}
    ]
});
