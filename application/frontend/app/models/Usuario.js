Ext.define('MyDesktop.app.models.Usuario',{
	extend : 'Ext.data.Model',
	fields: [
		{name : '_usuid'	},
		{name : '_usudatos'},
		{name : '_usulogin'},
		{name : '_estado'},
        {name : '_id_perfil'},
	]

});

Ext.define('MyDesktop.app.models.Perfil',{
    extend : 'Ext.data.Model',
    fields: [
        {name : '_id_perfil'	},
        {name : '_descripcion'}
    ]
});


Ext.define('MyDesktop.app.models.Programas',{
	extend : 'Ext.data.Model',
	fields: [
		{name : '_id'	},
		{name : '_nombre'}
	
	]

});

