Ext.define('MyDesktop.app.stores.TipoMonedas', {
    extend: 'Ext.data.Store',
    model : 'MyDesktop.app.models.TipoMoneda',
    autoSync: true,
    autoLoad : true,
    proxy : {
    	type : 'ajax',
    	api  :{
    		read   : 'index.php/tipomonedas/listartipomonedas'
        },
       reader : {
    		type : 'json',
    		root : 'items'
    	}

    }

});