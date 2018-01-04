Ext.define('MyDesktop.app.stores.contabilidad.PlanContable', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.contabilidad.PlanContable',
    autoLoad: true,
    remoteSort: true,
    autoSync : true, 
    proxy : {
        type : 'ajax',
        api  :{
            read   : '/sakila/actor/storeactores'
        },
       // extraParams: {pid : 0 ,ppaterno :null,pmaterno:null,pnombres:null},
        reader : {
            type : 'json',
            root : 'items'
        }
    }

});