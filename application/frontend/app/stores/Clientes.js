Ext.define('MyDesktop.app.stores.Clientes', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Cliente',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    pageSize : 100,
    sorters: [{
		property: 'idper',
		direction: 'ASC'
    }],
    proxy : {
    	type : 'ajax',
    	api  :{
    		read   : 'index.php/clientes/listarclientes'
        },
        extraParams: {pid : 0 ,ppaterno :null,pmaterno:null,pnombres:null},
    	reader : {
    		type : 'json',
    		root : 'items'
    	}

    }

});

Ext.define('MyDesktop.app.stores.ClientesBuscar', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Cliente',
    autoLoad: false,
    remoteSort: true,
    autoSync : true,
    pageSize : 1000,
    sorters: [{
        property: 'idper',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{
            read   : 'index.php/clientes/buscarclientes'
        },
        extraParams: {pid : 0 ,pdatospersona :null},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});