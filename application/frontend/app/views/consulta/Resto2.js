/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.Resto2', {
  extend : 'Ext.form.Panel',
  config : {id : 0},
  id : 'restoingreso2',
  alias : 'widget.restoingreso2',
  border : true,
  frame : true,
  initComponent : function() {
    me = this;
    Ext.applyIf(me, {
      autoScroll : true,
      items : [
        {
          xtype : 'fieldset',
          title : 'Pupilas',
          flex : 0.5,
          layout : 'hbox',
          defaults : {width : 150},
          items : [
            {
              xtype : 'textfield',
              fieldLabel : 'Isocoricas',
              labelWidth : 70,
              flex : 0.5,
              id : 'txtRestoPupilasIguales2'
            },
            {
              xtype : 'textfield',
              fieldLabel : 'Redondas',
              labelWidth : 60,
              flex : 0.5,
              id : 'txtRestoPupilasRedondas2'
            },
            {
              xtype : 'textfield',
              fieldLabel : 'Fotoreactiva',
              labelWidth : 100,
              flex : 0.6,
              id : 'txtRestoPupilasRespondenLuz2'
            },
            {
              xtype : 'textfield',
              fieldLabel : 'Responden a la acomodacion',
              labelWidth : 190,
              flex : 1,
              id : 'txtRestoPupilasRespondenAcomo2'
            }
          ]
        },
        {
          xtype : 'fieldset',
          title : 'Motilidad Ocular',
          flex : 0.4,
          layout : 'fit',
          items : [ {xtype : 'textfield', id : 'txtRestoMotilidad2'} ]
        },
        {
          xtype : 'fieldset',
          title : 'Punto proximo de convergencia',
          flex : 0.4,
          layout : 'fit',
          items :
              [ {xtype : 'textfield', id : 'txtRestoPupilasPuntoProximo2'} ]
        },

        {
          xtype : 'fieldset',
          title : 'Cover Test : Endiforia Derecho / Izquierdo',
          flex : 0.3,
          layout : 'fit',
          items : [
            {
              xtype : 'checkboxgroup',
              id : 'chkgRestoCoverTest2',
              columns : 6,
              vertical : false,
              items : [
                {boxLabel : 'Esotropia', name : '1', inputValue : '1'},
                {boxLabel : 'Exotropia', name : '2', inputValue : '2'},
                {boxLabel : 'Esoforia', name : '3', inputValue : '3'},
                {boxLabel : 'Exoforia', name : '4', inputValue : '4'},
                {boxLabel : 'Hipertropia', name : '5', inputValue : '5'},
                {boxLabel : 'Hipotropia', name : '6', inputValue : '6'}
              ]
            }
          ]
        },
        {

          xtype : 'fieldset',
          title : 'Tonometria',
          flex : 1,
          layout : {type : 'vbox'},
          hidden:true,
          items : [
            {
              xtype : 'panel',
              frame : false,
              border : false,
              layout : 'hbox',
              items : [
                {xtype : 'label', text : 'Ojo Derecho', width : 150},
                {
                  xtype : 'textfield',
                  id : 'txtRestoTonometriaODcod2',
                  width : 50

                },
                {xtype : 'label', width : 10, text : ''},
                {
                  xtype : 'textfield',
                  id : 'txtRestoTonometriaODDesc2',
                  width : 450

                }
              ]
            },
            {
              xtype : 'panel',
              layout : 'hbox',
              frame : false,
              border : false,
              items : [
                {
                  xtype : 'label',
                  text : 'Ojo Izquierdo',
                  width : 150

                },
                {
                  xtype : 'textfield',
                  id : 'txtRestoTonometriaOIcod2',
                  width : 50
                },
                {xtype : 'label', text : '', width : 10},
                {
                  xtype : 'textfield',
                  flex : 3,
                  id : 'txtRestoTonometriaOIDesc2',
                  width : 450
                }
              ]
            }
          ]

        },
        {
          xtype : 'textfield',
          fieldLabel : 'Vision de Colores',
          id : 'txtRestoVisionColores2',
          anchor : '100%'
        },
        {
          xtype : 'textfield',
          fieldLabel : 'Prisma Vertical',
          id : 'txtRestoPrismaVertical2',
          anchor : '100%'
        },
        {
          xtype : 'fieldset',
          layout : 'fit',
          title : 'Filtro Rojo',
          items : [
            {
              xtype : 'checkboxgroup',
              columns : 2,
              vertical : false,
              id : 'ckbgFiltroRojo2',
              items : [
                {boxLabel : 'Suprime algun ojo?', name : '1', inputValue : '1'},
                {
                  boxLabel : 'Fusiona las imagenes presentadas?',
                  name : '2',
                  inputValue : '2'
                }

              ]
            }
          ]

        },
        {
          xtype : 'textfield',
          fieldLabel : 'Luces de Worth',
          id : 'txtRestoLucesWorth2',
          anchor : '100%'
        },
        {
          xtype : 'textfield',
          fieldLabel : 'Stereopsis',
          id : 'txtRestoStereopsis2',
          anchor : '100%'
        },
        {
          xtype : 'fieldset',
          layout : 'fit',
          title : 'Correspondencia Retiniana',
          items : [
            {
              xtype : 'radiogroup',
              columns : 2,
              vertical : false,
              id : 'chkgRestoCorrespondencia2',
              items : [
                {
                  boxLabel : 'Correspondencia Normal?',
                  name : 'opt',
                  inputValue : '1',
                  id : 'optNormal2'
                },
                {
                  boxLabel : 'Falsa macula?',
                  name : 'opt',
                  inputValue : '2',
                  id : 'optFalsa2'
                }

              ]
            }
          ]

        },
        {
          xtype : 'fieldset',
          title : 'Rejilla de Amsler',
          layout : 'hbox',
          items : [
            {
              xtype : 'textfield',
              fieldLabel : 'Ojo Derecho',
              id : 'txtRestoRejillaOjoDerecho2',
              width : 190
            },
            {
              xtype : 'textfield',
              fieldLabel : 'Ojo Izquierdo',
              id : 'txtRestoRejillaOjoIzquierdo2',
              labelAlign : 'right',
              width : 190
            }
          ]
        },
        {xtype : 'label', text : 'Campos visuales confrontacion'},
        {
          xtype : 'fieldset',
          layout : 'fit',
          title : 'Ojo Derecho',
          items : [
            {
              xtype : 'radiogroup',
              id : 'chkgRestoCampoVisualOD2',
              columns : 2,
              flex : 1,
              vertical : false,
              items : [
                {
                  boxLabel : 'Normal',
                  name : 'optod',
                  inputValue : '1',
                  id : 'optconfrontacionODnormal2'
                },
                {
                  boxLabel : 'Disminuido',
                  name : 'optod',
                  inputValue : '2',
                  id : 'optconfrontacionODdisminuido2'
                }

              ]
            }
          ]
        },
        {
          xtype : 'fieldset',
          layout : 'fit',
          title : 'Ojo Izquierdo',
          items : [
            {
              xtype : 'radiogroup',
              id : 'chkgRestoCampoVisualOI2',
              columns : 2,
              flex : 1,
              vertical : false,
              items : [
                {
                  boxLabel : 'Normal',
                  name : 'optoi',
                  inputValue : '1',
                  id : 'optconfrontacionOInormal2'
                },
                {
                  boxLabel : 'Disminuido',
                  name : 'optoi',
                  inputValue : '2',
                  id : 'optconfrontacionOIdisminuido2'
                }

              ]
            }
          ]
        }

      ]
    });
    me.callParent(arguments);
  }
});
