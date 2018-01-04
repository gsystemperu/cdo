Ext.define('MyDesktop.app.stores.Proveedores', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Proveedor',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    sorters: [{
		property: 'idprov',
		direction: 'ASC'
    }],
    proxy : {
    	type : 'ajax',
    	api  :{
    		read   : 'index.php/proveedores/listarproveedores'
        },
        extraParams: {pid : 0 ,ppaterno :null,pmaterno:null,pnombres:null},
    	reader : {
    		type : 'json',
    		root : 'items'
    	}

    }

});