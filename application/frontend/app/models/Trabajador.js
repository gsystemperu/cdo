Ext.define('MyDesktop.app.models.Trabajador', {
    extend: 'Ext.data.Model',
    fields:[
    	{name:'registros'},
    	{name:'id'},
    	{name:'paterno'},
        {name:'materno'},
        {name:'nombres'},
        {name:'fnacimiento'},
        {name:'sexo'},
        {name:'tipotra'},
        {name:'descripcion'},
        {name:'estados'},
        {name:'ncompleto'},

     ]
});

Ext.define('MyDesktop.app.models.Tienda', {
    extend: 'Ext.data.Model',
    fields:[
        {name:'id'},
        {name:'direc'},
        {name:'telef'},
        {name:'movil'},
        {name:'descrip'},
        {name:'est'}
     ]
});

Ext.define('MyDesktop.app.models.TipoTrabajador', {
    extend: 'Ext.data.Model',
    fields:[
        {name:'id'},
        {name:'descripcion'}

     ]
});
