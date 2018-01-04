Ext.define('MyDesktop.app.stores.consultorio.Refraccion', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.Refraccion',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true
});

//@Descripcion : Refraccion Ojo Izquierdo

Ext.define('MyDesktop.app.stores.consultorio.RefraccionOI', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.Refraccion',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'memory'
    }
});

Ext.define('MyDesktop.app.stores.consultorio.RefraccionOIEditar', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.Refraccion',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
        api  :{	read   : 'index.php/consultorio/refraccionojoizquierdo'},
        extraParams: {vidconsulta:0},
        reader : {type : 'json',root : 'items'}
    }
});

//@Descripcion : Refraccion Ojo Derecho

Ext.define('MyDesktop.app.stores.consultorio.RefraccionOD', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.Refraccion',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'memory'
    }
});


Ext.define('MyDesktop.app.stores.consultorio.RefraccionODEditar', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.Refraccion',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
        api  :{	read   : 'index.php/consultorio/refraccionojoderecho'},
        extraParams: {vidconsulta:0},
        reader : {type : 'json',root : 'items'}
    }
});

