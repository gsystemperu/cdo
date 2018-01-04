Ext.define('MyDesktop.app.stores.consultorio.LenteContacto', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.LenteContacto',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true
});

//@Descripcion : Refraccion Ojo Izquierdo

Ext.define('MyDesktop.app.stores.consultorio.LenteContactoOI', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.LenteContacto',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'memory'
    }
});

Ext.define('MyDesktop.app.stores.consultorio.LenteContactoOIEditar', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.LenteContacto',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
       // api  :{	read   : 'index.php/consultorio/refraccionojoizquierdo'},
        extraParams: {vidconsulta:0},
        reader : {type : 'json',root : 'items'}
    }
});

//@Descripcion : Refraccion Ojo Derecho

Ext.define('MyDesktop.app.stores.consultorio.LenteContactoOD', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.LenteContacto',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'memory'
    }
});


Ext.define('MyDesktop.app.stores.consultorio.LenteContactoODEditar', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.consultorio.Refraccion',
    autoLoad  : false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
      //  api  :{	read   : 'index.php/consultorio/refraccionojoderecho'},
        extraParams: {vidconsulta:0},
        reader : {type : 'json',root : 'items'}
    }
});

