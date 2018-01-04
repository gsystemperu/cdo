/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.consulta.DipAdd2', {
  extend : 'Ext.form.Panel',
  config : {id : 0},
  id : 'dipadd2',
  alias : 'widget.dipadd2',
  border : true,
  bodyStyle: 'padding:5px 5px 0',
  frame : true,
  initComponent : function() {
    var me = this;  
    Ext.applyIf(me, {
      items : [
        {
          xtype:"fieldset",
          columnWidth:0.5,
          margin:"0 10 20 0",
          title:"<b>DIP</b>",
          defaults:{
            anchor:"100%"
          },
          layout:{
            type:"vbox"
          },
          items:[
               
                {
                  xtype:"textfield",
                  fieldLabel:"<b>Lejos</b>",
                  name:"diplejos",
                  itemId:"diplejos2",
                  id:"diplejos2",
                  margin:"0 0 10 0"
                },
                 {
                  
                  xtype:"textfield",
                  fieldLabel:"<b>Cerca</b>",
                  name:"dipcerca",
                  itemId:"dipcerca2",
                  id:"dipcerca2"
                }
          ]

        },
        {
          xtype:"fieldset",
          columnWidth:0.5,
          title:"<b>ADD</b>",
          margin:"0 10 10 0",
          defaults:{
            anchor:"100%"
          },
          layout:{
            type:"vbox"
          },
          items:[
            {
              xtype:"textfield",
              fieldLabel:"<b>Cerca</b>",
              name:"addcerca",
              itemId:"addcerca2",
              id:"addcerca2",
              margin:"0 0 10 0"
            }
          ]
        },
        {
            xtype:"textareafield",
            fieldLabel:"<b>Observacion</b>",
            name:"refraccion_observacion",
            itemId:"refraccion_observacion2",
            id:"refraccion_observacion2",
            anchor:"100%",
            margin:"0 0 10 10"
                    
            
        }

      ]
    });
    me.callParent(arguments);
//    Ext.getCmp('dipcerca').on('change',this.convertirAMayuscula,this);
//    Ext.getCmp('diplejos').on('change',this.convertirAMayuscula,this);
//    Ext.getCmp('addcerca').on('change',this.convertirAMayuscula,this);
//    Ext.getCmp("refraccion_observacion").on("change",this.convertirAMayuscula,this);

  },
  
//  convertirAMayuscula:function(field, newValue, oldValue, eOpts ){
//     field.setValue(newValue.toUpperCase());
//  }

});
