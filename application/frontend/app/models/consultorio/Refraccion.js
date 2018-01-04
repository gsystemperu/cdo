Ext.define("MyDesktop.app.models.consultorio.Refraccion", {
    extend : 'Ext.data.Model',
    fields: [
        {name : '_idod', type :'int'},
        {name : '_idconsul',type : 'int'},
        {name : '_fecha',type : 'string'},
        {name : '_esfera',type : 'string'},
        {name : '_cilindro',type : 'string'},
        {name : '_eje',type : 'string'},
        {name : '_dip_l',type : 'string'},
        {name : '_dip_c',type : 'string'},
        {name : '_av',type : 'string'},
        {name : '_adiccion',type : 'string'},
        {name : '_obser1',type : 'string'},
        {name : '_obser2',type : 'string'},
        {name : '_idmed',type : 'string'},
        {name : '_medico',type : 'string'}
    ]
});