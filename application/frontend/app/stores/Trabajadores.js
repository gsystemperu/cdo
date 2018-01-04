Ext.define('MyDesktop.app.stores.Trabajadores', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Trabajador',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
		property: 'id',
		direction: 'ASC'
    }],
    proxy : {
    	type : 'ajax',
    	api  :{read   : 'index.php/trabajadores/listartrabajadores'},
        //extraParams: {pid : 0 ,ppaterno :null,pmaterno:null,pnombres:null},
    	reader : {
    		type : 'json',
    		root : 'items'
    	}

    }

});

Ext.define('MyDesktop.app.stores.TrabajadoresTipo', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Trabajador',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/trabajadores/listarvendedoras'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});

Ext.define('MyDesktop.app.stores.Diseniadores', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Trabajador',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/trabajadores/listardiseniadores'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});

Ext.define('MyDesktop.app.stores.Medicos', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Trabajador',
    autoLoad: false,
    remoteSort: true,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/trabajadores/listarmedicos'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});


Ext.define('MyDesktop.app.stores.Tiendas', {
    extend : 'Ext.data.Store',
    requires :['MyDesktop.app.models.Trabajador'],
    model  : 'MyDesktop.app.models.Tienda',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/trabajadores/listartiendas'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});


Ext.define('MyDesktop.app.stores.TipoTrabajador', {
    extend : 'Ext.data.Store',
    requires :['MyDesktop.app.models.Trabajador'],
    model  : 'MyDesktop.app.models.TipoTrabajador',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/trabajadores/listartipotrabajadores'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});

Ext.define('MyDesktop.app.stores.Operarios', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Trabajador',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/trabajadores/listaroperarios'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});
