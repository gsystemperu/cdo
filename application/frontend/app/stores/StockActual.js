Ext.define('MyDesktop.app.stores.StockActual', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.Stock',
    autoLoad: false,
    remoteSort: true,
    autoSync : true,
    pageSize : 100,
    sorters: [{
        property: 'fecha',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{
            read   : 'index.php/inventario/stock'
        },
        extraParams: {pidsede : 0 ,pidprod:0},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});
