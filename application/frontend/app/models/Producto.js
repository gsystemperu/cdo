Ext.define('MyDesktop.app.models.Producto', {
    extend: 'Ext.data.Model',
    fields:[
    	{name:'id'},
    	{name:'producto'},
    	{name:'unidadmedida'},
    	{name:'numunidad'},
    	{name:'precioventa'},
    	{name:'ultprecioventa'},
    	{name:'stockmin'},
    	{name:'gastoprodu'},
    	{name:'manstock'},
    	{name:'stock'},
    	{name:'estados'},
      {name:'sede'},
      {name:'rbtipoproducto' ,type : 'string'},
    	{name:'ppagomedicotratante' ,type : 'float'},
    	{name:'ppagomedicocirujano', type : 'float'},
      {name:'ppagomedicoexterno', type : 'float'},

     ]
});


Ext.define('MyDesktop.app.models.DetalleContrato', {
    extend: 'Ext.data.Model',
    fields:[
        {name : 'id'},
        {name  :'idprod'},
        {name : 'producto'},
        {name : 'medida1'},
        {name : 'medida2'},
        {name : 'cantidad'},
        {name : 'total'},
        {name : 'idmat'},
        {name : 'material'},
        {name : 'bobina'},
        {name : 'idope'},
        {name : 'obser'},
        {name : 'textodet'}
    ]
});

Ext.define('MyDesktop.app.models.Material', {
    extend: 'Ext.data.Model',
    fields:[
        {name : 'id'},
        {name  :'descrip'},
        {name  :'_largo'},
        {name  :'_ancho'},
        {name  :'medida'},
        {name  :'est'},
        {name  :'mstock'}
    ]
});

Ext.define('MyDesktop.app.models.DetalleCompra', {
    extend: 'Ext.data.Model',
    fields:[
        {name : 'id'},
        {name  :'idprod'},
        {name : 'producto'},
        {name : 'precio'},
        {name : 'cantidad'},
        {name : 'total'}

    ]
});
