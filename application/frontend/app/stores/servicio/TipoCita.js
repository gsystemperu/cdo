Ext.define('MyDesktop.app.stores.servicio.TipoCita', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.servicio.TipoCita',
    autoLoad: true,
    remoteSort: true,
    autoSync : true,
    proxy : {
        type : 'ajax',
        api  :{
            read   : 'tipocita/buscartipo'
        },
       extraParams: {vDescripcion : null,vSede :Ext.util.Cookies.get("sede")},
        reader : {
            type : 'json',
            root : 'items'
        }
    }
});
