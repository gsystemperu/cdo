Ext.define('MyDesktop.app.stores.ConsultasContratos', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.ConsultaContrato',
    autoLoad  : true,
    remoteSort: true,
    autoSync  : true,
    pageSize  : 50,
    sorters: [{
        property: 'idcontrato',
        direction: 'ASC'
    }],
    proxy : {
        type : 'ajax',
        api  :{
            read   : 'index.php/contratos/buscarcontratosfechasvendedor'
        },
        extraParams: {pdesde : null ,phasta :null,pidvendedor:0,pidtienda:0,ptipocancel:1},
        reader : {
            type : 'json',
            root : 'items'
        }

    }

});
