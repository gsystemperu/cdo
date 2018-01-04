
Ext.define('MyDesktop.app.stores.Ocupacion', {
    extend   : 'Ext.data.Store',
    model    : 'MyDesktop.app.models.Ocupacion',
    autoLoad : true,
    autoSync : true,
    proxy : {
        type : 'ajax',
        api  :{
                     read   : 'index.php/clientes/listarocupaciones'
        },
        //extraParams: {pid : 0 ,ppaterno :null,pmaterno:null,pnombres:null},
        reader : {
            type : 'json',
            root : 'items'
        }

    }
});