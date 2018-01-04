var tipdoc ='C';
Ext.define('MyDesktop.app.views.FacturaBoleta', {
    extend: 'Ext.window.Window',
    alias : 'widget.facturaboleta',
    id    : 'wfacturaboleta',
    width : 450,
    height: 480,
    modal : true,
    autoShow : true,
    bodyPadding :'5 5 5 5',
    title : 'Entrega y Cobro del Contrato',
    config : {
        num : 0
    },
    initComponent : function(){
       me = this;
       me.setTotalesDeContrato();
       Ext.apply(me,{
          layout : 'fit',
          items :[
              {
                  xtype : 'panel',
                  frame : true,
                  items:[
                      {
                          xtype : 'fieldset',
                          title: 'Selecionar el tipo de documento',
                          items :[
                              {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Tipo',
                                   id : 'grupodocumento',
                                    columns: 2,
                                    vertical: false,
                                    items: [
                                        { boxLabel: 'Boleta', name: 'rb', inputValue: 'B' },
                                        { boxLabel: 'Factura', name: 'rb', inputValue: 'F'},
                                        { boxLabel: 'Contrato', name: 'rb', inputValue: 'C',checked : true},
                                    ],
                                  listeners : {
                                      change : function(field, newValue, oldValue){
                                            tipdoc = newValue['rb'];
                                            switch (newValue['rb']){
                                                case 'F':
                                                        Ext.getCmp('txtNumeroFactura').setDisabled(false).focus();
                                                        Ext.getCmp('txtCliente').setDisabled(false);
                                                        Ext.getCmp('txtRuc').setDisabled(false);
                                                break;
                                                case  'B':
                                                        Ext.getCmp('txtNumeroFactura').setDisabled(false).setValue('').focus();
                                                        Ext.getCmp('txtCliente').setDisabled(true).setValue('');
                                                        Ext.getCmp('txtRuc').setDisabled(true).setValue('');
                                                break;
                                                default :
                                                    Ext.getCmp('txtNumeroFactura').setDisabled(true).setValue('');
                                                    Ext.getCmp('txtCliente').setDisabled(true).setValue('');
                                                    Ext.getCmp('txtRuc').setDisabled(true).setValue('');

                                            }
                                      }
                                  }
                              }
                          ]
                      },
                      {
                          xtype : 'fieldset',
                          title: 'Resumen del Contrato',
                          layout : 'vbox',
                          items:[
                              {
                                xtype : 'hiddenfield',
                                id    : 'txtIdContrato'
                              },
                               {
                                  xtype:'textfield',
                                  id   : 'txtNumeroFactura',
                                  fieldLabel:'Numero Doc',
                                  fieldStyle: 'text-align: right;',
                                  disabled: true

                              },
                              {
                                  xtype : 'textfield',
                                  id  : 'txtCliente',
                                  fieldLabel: 'Cliente',
                                  fieldStyle: 'text-align: left;',
                                  disabled: true,
                                  width : 400
                              },
                              {
                                  xtype : 'textfield',
                                  id  : 'txtRuc',
                                  fieldLabel: 'Ruc',
                                  fieldStyle: 'text-align: right;',
                                  disabled: true,

                              },
                              {
                                  xtype : 'textfield',
                                  id    : 'txtDireccion',
                                  fieldLabel: 'Direcci\xf3n',
                                  fieldStyle: 'text-align: left;',
                                  disabled: true,
                                  width : 400
                              },
                              {
                                  xtype:'textfield',
                                  id   : 'txtMonto',
                                  fieldLabel:'Monto',
                                  fieldStyle: 'text-align: right;',
                                  readOnly : true

                              },
                              {
                                  xtype:'textfield',
                                  fieldLabel:'Igv',
                                  id  : 'txtIgv',
                                  fieldStyle: 'text-align: right;',
                                  readOnly : true

                              },
                              {
                                  xtype:'textfield',
                                  fieldLabel:'Total',
                                  id   : 'txtTotal',
                                  fieldStyle: 'text-align: right;',
                                  readOnly : true

                              }
                          ]
                      },
                      {
                          xtype : 'fieldset',
                          title: 'Resumen de Pago a cuenta',
                          layout : 'vbox',
                          items:[
                              {
                                  xtype:'textfield',
                                  id   : 'txtPagoAcuenta',
                                  fieldLabel:'Monto',
                                  fieldStyle: 'text-align: right;',
                                  readOnly : true
                              }

                          ]
                      },
                      {
                          xtype : 'container',
                          items:[
                              {
                                  xtype      :'checkbox',
                                  fieldLabel :  '<b>* CANCELO TODO EL SALDO</b>',
                                  id         :'ckbCancelaSaldo',
                                  labelWidth : 220


                              }
                          ]
                      },
                      {
                          xtype : 'button',
                          text  : '<b>GUARDAR ENTREGA</b>',
                          scale : 'large',
                          handler:function(){
                            me.setGuardarVenta();
                          }
                      }
                  ]
              }
          ]



       });
      this.callParent(arguments);

    },
    setTotalesDeContrato:function(){
        Ext.Ajax.request({
            url: 'index.php/contratos/listartotalescontrato',
            params: {
                idcontra     :parseInt(this.getNum())
            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                      Ext.getCmp('txtIdContrato').setValue(item.idcontrato);
                      Ext.getCmp('txtMonto').setValue(item.monto);
                      Ext.getCmp('txtIgv').setValue(item.igv);
                      Ext.getCmp('txtTotal').setValue(item.total);
                      Ext.getCmp('txtPagoAcuenta').setValue((item.pagacuenta==null?0:item.pagacuenta));
                    });
                } else {MyDesktop.app.util.Util.showErrorMsg(conn.responseText);return false;}

            },
            failure: function(conn, response, options, eOpts) {}
        });
    },
    setGuardarVenta:function(){
        var tipodo = Ext.getCmp('grupodocumento').getValue();
        var pagacu = Ext.getCmp('ckbCancelaSaldo').getValue();
        var numdoc = Ext.getCmp('txtNumeroFactura').getValue();
        var id     = Ext.getCmp('txtIdContrato').getValue();
        var clie   = Ext.getCmp('txtCliente').getValue();
        var ruc    = Ext.getCmp('txtRuc').getValue();
        Ext.Ajax.request({
            url: 'index.php/contratos/actualizardocumentoventa',
            params: {
                piddocventa :0,
                pidcontrato : id,
                ptipodoc    : tipodo.rb,
                psw         : (pagacu == true?1:0),
                pusuario    : Ext.util.Cookies.get('idusuario'),
                pnumerodoc  : numdoc
            },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if(item.ERROR>0){
                           if (tipdoc == 'F'){
                               me.setActualizarCliente(id,clie,ruc);
                           }else{
                               Ext.getCmp('dgvContratos').getStore().reload();
                               Ext.getCmp('wfacturaboleta').close();
                               me.setImprimirDocumentoVenta(parseInt(id));
                           }



                        }
                    });
                } else {MyDesktop.app.util.Util.showErrorMsg(conn.responseText);return false;}

            },
            failure: function(conn, response, options, eOpts) {}
        });
    },
    setActualizarCliente:function(idcontrato,cliente,ruc){
        me = this;
        Ext.Ajax.request({
            url : 'index.php/contratos/clienteactualizar',
            params :{
                pidcontrato : idcontrato,
                pnombres    : cliente ,
                pnumruc     : ruc
            },
            success : function(conn,response,options,eOpts){
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    Ext.each(result.items, function(item) {
                        if(item.ERROR>0){
                            me.setImprimirDocumentoVenta(parseInt(idcontrato));
                            Ext.getCmp('dgvContratos').getStore().reload();
                            Ext.getCmp('wfacturaboleta').close();
                        }
                    });
                }
            }
        });
    },
   /* getIdContrato:function(){
        var grid = Ext.getCmp('dgvContratos');
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        return selectedRecord.get('idcontrato');
    },*/
    setImprimirDocumentoVenta:function(idcontrato){
        var _url = 'reportes/imprimirdocumentoventa/'+parseInt(idcontrato).toString();
        xpos=(screen.width/2)-(1000/2);
        ypos=(screen.height/2)-(600/2);
        my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=1000,height=600");
        my.moveTo(xpos, ypos);
        setTimeout(function() {
            my.close();
        }, 1000);


    }
});
