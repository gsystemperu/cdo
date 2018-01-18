Ext.define('MyDesktop.app.stores.citas.Citas', {
    extend : 'Ext.data.Store',
    model  : 'MyDesktop.app.models.cita.Cita',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
        api  :{	read   : 'index.php/citas/listar'},
        extraParams: {vfecha:null,vidmedico:0,vidsede:0},
        reader : {
            type : 'json',
            root : 'items'
        }
    }

});

/*
* @Descripcion : Store para el combo de consultorio medico
* */

 Ext.define('MyDesktop.app.stores.citas.PacientesParaAtencionMedica',{
    extend  : 'Ext.data.Store',
    requires : 'MyDesktop.app.models.cita.Cita',
    model   : 'MyDesktop.app.models.cita.PacienteParaAtencion',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
        api  :{	read   : 'index.php/citas/pacientesparaatencion'},
        extraParams: {vfecha:null,vidmedico:0},
        reader : {
            type : 'json',
            root : 'items'
        }
    }
});

/*
 * @Descripcion : Store historial de atenciones en consultorio
 * */

Ext.define('MyDesktop.app.stores.citas.HistorialConsultorioPaciente', {
    extend  : 'Ext.data.Store',
    requires : 'MyDesktop.app.models.cita.Cita',
    model   : 'MyDesktop.app.models.cita.Cita',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    proxy : {
        type : 'ajax',
        api  :{	read   : 'index.php/citas/citasdelpaciente'},
        extraParams: {vidpaciente:0},
        reader : {
            type : 'json',
            root : 'items'
        }
    }
});
