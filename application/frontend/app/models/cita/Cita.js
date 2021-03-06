Ext.define("MyDesktop.app.models.cita.Cita", {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_fecha'},
        {name: '_idcita'},
        {name: '_idper'},
        {name: '_paciente'},
        {name: '_idtipocita', type: 'int'},
        {name: '_tipocita'},
        {name: '_idmed'},
        {name: '_medico'},
        {name: '_descripcion'},
        {name: '_observacion'},
        {name: '_precio'},
        {name: '_atendido', type: 'int'},
        {name: '_fechacita', type: 'string'},
        {name: '_estado', type: 'int'},
        {name: '_idconsul', type: 'int'},
        {name: '_marcatxt', type: 'int'},
        {name: '_horaconsultorio', type: 'string'},
        {name: '_fechaconsultorio', type: 'string'}
        

    ]
});

/*
 * @descripcion : Modelo para el combo de consultorio medico
 * */
Ext.define("MyDesktop.app.models.cita.PacienteParaAtencion", {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_idpaciente', type: 'int'},
        {name: '_paciente', type: 'string'},
        {name: "_edad", type: "int"},
        {name: '_estado', type: 'int'}

    ]
});



/*
 * @descripcion : Modelo fotos del paciente
 * */
Ext.define("MyDesktop.app.models.cita.Foto", {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'int'},
        {name: '_idper', type: 'string'},
        {name: "_tipo", type: "string"},
        {name: '_fecha', type: 'string'}

    ]
});

