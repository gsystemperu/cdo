Ext.define('MyDesktop.app.stores.Usuarios', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Usuario',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 50,
    sorters: [{
		property: '_id',
		direction: 'ASC'
    }],
    proxy : {
    	type : 'rest',
    	api  :{
    		read   : 'index.php/usuarios/listar'
        },
        //extraParams: {pid : 0 ,pdatos :null},
    	reader : {
    		type : 'json',
    		root : 'items'
    	}

    }

});

Ext.define('MyDesktop.app.stores.Perfiles', {
    extend : 'Ext.data.Store',
    requires:['MyDesktop.app.models.Usuario'],
    model  : 'MyDesktop.app.models.Perfil',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 50,
    sorters: [{
        property: '_id_perfil',
        direction: 'ASC'
    }],
    proxy : {
        type : 'rest',
        api  :{
            read   : 'index.php/usuarios/listarperfiles'
        },
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});

/*
Ext.define('MyDesktop.app.stores.Programas', {
    extend : 'Ext.data.Store',
    //requires:['MyDesktop.app.models.Usuario']
    model  : 'MyDesktop.app.models.Programas',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 50,
    sorters: [{
        property: '_id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'rest',
        api  :{
            read   : 'usuarios/listarprogramas'
        },
        //extraParams: {pid : 0 ,pdatos :null},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});*/