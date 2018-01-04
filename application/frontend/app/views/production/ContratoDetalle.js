Ext.define("MyDesktop.app.views.ContratoDetalle",{extend:"Ext.window.Window",alias:"widget.contratodet",requires:["MyDesktop.app.stores.Contratos"],id:"wcontratodet",width:700,height:330,modal:true,autoShow:true,title:"Detalle del contrato",initComponent:function(){me=this;var a=Ext.create("MyDesktop.app.stores.ContratosDet");a.getProxy().extraParams={idcontra:me.getIdContrato()};Ext.apply(this,{items:[{xtype:"panel",flex:2,layout:"fit",height:230,items:me.getGrillaDetalle(a)},{xtype:"panel",title:"<b>Ingrese el codigo del material a usar</b>",border:true,frame:true,layout:"hbox",style:"padding:10px",items:[{xtype:"textfield",id:"txtIdContrato",width:300,readOnly:true,hidden:true},{xtype:"textfield",id:"txtOrden",width:300,readOnly:true,hidden:true},{xtype:"textfield",width:150,id:"txtCodigoBobina",fieldStyle:"text-transform:uppercase;text-size:16px;text-align: center; ",allowBlank:false},{xtype:"button",text:"<b>Actualizar</b>",iconCls:"boton-save",id:"btnActualizarBobina",handler:me.setAsignarBobinaDb},{xtype:"button",text:"<b>Salir</b>",width:100,iconCls:"x-ico-salir",handler:function(b){Ext.getCmp("wcontratodet").close()}}]}]});this.callParent()},setAsignarBobinaDb:function(){try{Ext.Ajax.request({url:"contratos/existebobina",params:{pbobina:Ext.getCmp("txtCodigoBobina").getValue()},success:function(f,c,d,e){var b=MyDesktop.app.util.Util.decodeJSON(f.responseText);if(b.existe=="f"){Ext.Msg.alert("Error","El codigo de bobina no existe en la base de datos!");return false}else{if(Ext.getCmp("txtCodigoBobina").getValue()==null){Ext.Msg.alert("Error","Ingrese el codigo de la bobina!");Ext.getCmp("txtCodigoBobina").focus();return false}if(Ext.getCmp("txtCodigoBobina").isValid()==false){Ext.Msg.alert("Error","El largo del codigo no debe de ser mayor a 10 digitos!");Ext.getCmp("txtCodigoBobina").focus();return false}Ext.Ajax.request({url:"contratos/actualizardetallebobina",params:{piddet:Ext.getCmp("txtIdContrato").getValue(),pbobina:Ext.getCmp("txtCodigoBobina").getValue(),porden:Ext.getCmp("txtOrden").getValue()},success:function(k,h,i,j){var g=MyDesktop.app.util.Util.decodeJSON(k.responseText);if(g.success){Ext.each(g.items,function(l){if(l.ERROR<0){Ext.Msg.alert("Error","Error en Sistema ! Comunicarse con Sistemas");return false}Ext.getCmp("dgvDetalleContrato").getStore().reload();Ext.getCmp("dgvContratos").getStore().reload();Ext.getCmp("wcontratodet").close()})}else{MyDesktop.app.util.Util.showErrorMsg(k.responseText);return false}},failure:function(j,g,h,i){}})}},failure:function(e,b,c,d){return false}})}catch(a){Ext.Msg.alert("Aviso","Seleccione el registro para asignar la bobina");return false}},getGrillaDetalle:function(a){return{xtype:"grid",store:a,id:"dgvDetalleContrato",flex:2,border:false,columns:[{text:"id",dataIndex:"iddet",hidden:true,flex:0.5},{text:"Producto",dataIndex:"idproducto",flex:1},{text:"Largo",dataIndex:"medida1",flex:0.5,align:"center"},{text:"Ancho",dataIndex:"medida2",flex:0.5,align:"center"},{text:"Material",dataIndex:"idmaterial",flex:2,align:"left"},{text:"Bobina",dataIndex:"bobina",flex:1,align:"center"}],listeners:{itemclick:function(d,b,f,c,g){Ext.getCmp("txtCodigoBobina").focus();Ext.getCmp("txtCodigoBobina").setValue(b.get("bobina"));Ext.getCmp("txtIdContrato").setValue(b.get("idcontrato"));Ext.getCmp("txtOrden").setValue(b.get("orden"))}}}},getIdContrato:function(){var b=Ext.getCmp("dgvContratos");var a=b.getSelectionModel().getSelection()[0];return a.get("idcontrato")}});