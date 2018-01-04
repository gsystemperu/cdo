Ext.define('MyDesktop.app.stores.Productos', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync : true,
    pageSize : 25,
    sorters: [{
  		property: 'id',
  		direction: 'ASC'
    }],
    proxy : {
    	type : 'ajax',
    	api  :{read   : 'index.php/productos/listarproductos'},
        extraParams: {pid : 0 ,pproducto :null,pproveedor:null,pidsede:null},
    	reader : {
    		type : 'json',
    		root : 'items'
    	}

    }

});

Ext.define('MyDesktop.app.stores.DetalleContrato',
{   extend : 'Ext.data.Store',
    requires:['MyDesktop.app.models.Producto'],
    model  : 'MyDesktop.app.models.DetalleContrato'
});

Ext.define('MyDesktop.app.stores.Materiales', {
    extend : 'Ext.data.Store',
    requires:['MyDesktop.app.models.Producto'],
    model  : 'MyDesktop.app.models.Material',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{read   : 'index.php/productos/listarmaterial'},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});
