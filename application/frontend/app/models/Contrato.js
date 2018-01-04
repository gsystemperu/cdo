Ext.define('MyDesktop.app.models.Contrato', {
  extend : 'Ext.data.Model',
  fields : [
    {name : 'idcontrato'},
    {name : 'numeroseriedoc'},
    {name : 'tipodoc',type:"string"},
    {name : 'fechaemision'},
    {name : 'cliente'},
    {name : 'fechaentrega'},
    {name : 'iddisenio'},
    {name : 'diseniador'},
    {name : 'idvende'},
    {name : 'vendedor'},
    {name : 'idtiendas'},
    {name : 'direcciontienda'},
    {name : 'iestado'},
    {name : 'estadocontra'},
    {name : 'cantreg'},
    {name : 'cantproce'},
    {name : 'pagado'},
    {name : 'horafinal'},
    {name : 'idformapago'},
    {name : 'formapago'}
  ]

});

Ext.define('MyDesktop.app.models.ContratoDet', {
  extend : 'Ext.data.Model',
  fields : [
    {name : 'iddet'},
    {name : 'idcontrato'},
    {name : 'idpro'},
    {name : 'idproducto'},
    {name : 'cant'},
    {name : 'medida1'},
    {name : 'medida2'},
    {name : 'prec'},
    {name : 'bobina'},
    {name : 'idmaterial'},
    {name : 'idmate'},
    {name : 'orden'},
    {name : 'total'},
    {name : 'operario'},
    {name : 'observacion'},
    {name : 'textoitem'},
    {name : 'diseniador'},
    {name : 'vendedor'}

  ]

});

Ext.define('MyDesktop.app.models.FormaPago', {
  extend : 'Ext.data.Model',
  fields : [ {name : '_idfpag'}, {name : '_descripcion'} ]
});
