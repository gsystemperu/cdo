Ext.define("MyDesktop.app.stores.Paciente", {
    extend: "Ext.data.Store",
    model: "MyDesktop.app.models.Paciente",
    
    remoteSort: true,
    
    sorters:[
        {
            property:"idper",
            direction:"desc"
        }
    ],
    proxy:{
        type:"ajax",
        api:{
            read:"index.php/paciente/listaBuscar"
        },
        reader:{
            type:"json",
            root:"items"
        },
        extraParams:{
            opcion:0
        }
    }
});