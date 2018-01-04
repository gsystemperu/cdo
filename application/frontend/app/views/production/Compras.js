var tipo=0;var valor=null;Ext.define("MyDesktop.app.views.Compras",{extend:"Ext.grid.Panel",alias:"widget.wcompras",requires:["MyDesktop.app.views.ContratoEditar","MyDesktop.app.stores.Compras","MyDesktop.app.stores.Generos","MyDesktop.app.views.CompraModificar","Ext.ux.IFrame"],id:"wcompras",initComponent:function(){storecompras=Ext.create("MyDesktop.app.stores.Compras");storefiltros=Ext.create("MyDesktop.app.stores.BusquedasCompras");var a=this;Ext.apply(a,{layout:"fit",id:"dgvCompras",sortableColumns:false,store:storecompras,columns:[{text:"Codigo",flex:0.5,sortable:true,dataIndex:"id",align:"left"},{text:"Fecha Doc.",flex:0.5,sortable:true,dataIndex:"fecha",align:"center"},{text:"Numero Doc.",flex:0.5,sortable:true,dataIndex:"numerodocumento",align:"center"},{text:"Tipo",flex:0.5,sortable:true,dataIndex:"tipo",align:"center"},{text:"Proveedor",flex:3,sortable:true,dataIndex:"proveedor",align:"left"},{xtype:"numbercolumn",format:"0,000.000",text:"Sub Total",flex:0.5,sortable:true,dataIndex:"subtotal",align:"right"},{xtype:"numbercolumn",format:"0,000.000",text:"Igv",flex:0.5,sortable:true,dataIndex:"igv",align:"right"},{xtype:"numbercolumn",format:"0,000.000",text:"Total",flex:0.5,sortable:true,dataIndex:"total",align:"right"},{text:"Estado",style:"text-aling:center",flex:0.6,sortable:true,dataIndex:"est",align:"center",renderer:function(g,d,c,h,f,e,b){switch(parseInt(c.get("est"))){case 4:return'<b style="color: #CC0000">ELIMINADO</b>';case 5:return'<b style="color: #FCC612">PROCESANDO</b>';case 6:return'<b style="color: #006400">TERMINADO</b>';case 1:return"<b>REGISTRADO</b>"}}}],listeners:{itemclick:function(d,b,f,c,g){if(b.get("est")!="1"){Ext.getCmp("btnEliminarCompra").setDisabled(true);Ext.getCmp("btnImprimirCompra").setDisabled(false);Ext.getCmp("btnEditarCompra").setDisabled(true)}else{Ext.getCmp("btnEliminarCompra").setDisabled(false);Ext.getCmp("btnImprimirCompra").setDisabled(false);Ext.getCmp("btnEditarCompra").setDisabled(false)}}},bbar:[{xtype:"tbfill"},{xtype:"textfield",id:"txtTotalCompras",labelWidth:200,fieldLabel:"<b>Total Compras </b>",readOnly:true,fieldStyle:"text-align: right;font-size:15px;"}],tbar:[{xtype:"button",text:"Nuevo",iconCls:"add",id:"btnNuevoCompra",handler:function(){var b=Ext.create("MyDesktop.app.views.CompraEditar")}},"-",{xtype:"button",text:"Editar",iconCls:"boton-edit",id:"btnEditarCompra",handler:function(){var b=Ext.getCmp("dgvCompras");record=b.getSelectionModel().getSelection();if(record[0]){var c=Ext.create("MyDesktop.app.views.CompraModificar");c.down("form").loadRecord(record[0]);c.setCargarDatosDeCompra(record[0].get("id"))}else{Ext.Msg.alert("Aviso","Tiene que seleccionar una las compras!")}}},"-",{xtype:"button",text:"Eliminar",iconCls:"remove",id:"btnEliminarCompra",disabled:true,handler:function(){var c=Ext.getCmp("dgvCompras");var b=c.getSelectionModel().getSelection()[0];Ext.Msg.show({title:"Sistema",msg:"Desea eliminar la compra seleccionada?",buttons:Ext.Msg.YESNO,icon:Ext.Msg.QUESTION,fn:function(f,e,d){if(f==="yes"){Ext.Ajax.request({url:"compras/eliminarcompra",params:{pidcompra:parseInt(b.get("id")),pusuario:"SISTEMA"},success:function(k,h,i,j){var g=MyDesktop.app.util.Util.decodeJSON(k.responseText);if(g.success){Ext.each(g.items,function(l){if(l.ERROR>0){Ext.getCmp("dgvCompras").getStore().reload();Ext.getCmp("btnEliminarCompra").setDisabled(true);Ext.getCmp("btnImprimirCompra").setDisabled(false)}})}else{MyDesktop.app.util.Util.showErrorMsg(k.responseText);return false}},failure:function(j,g,h,i){}})}}})}},"-",{xtype:"button",text:"Imprimir",iconCls:"boton-print",disabled:false,id:"btnImprimirCompra",handler:function(){combo=Ext.getCmp("btnComboFiltroCompras");dp=Ext.getCmp("dpFechaCompra");if(tipo!=1){var b=Ext.Date.format(dp.getValue(),"d/m/Y");a.imprimirListadoDeIngresos(2,b.toString())}else{a.imprimirListadoDeIngresos(combo.getValue(),Ext.getCmp("txtBuscadorCompras").getValue())}}},"-",{xtype:"button",text:"Actualizar Lista",iconCls:"icon-grid",id:"btnActualizarListaCompra",listeners:{click:function(){Ext.getCmp("dgvCompras").getStore().reload();a.getCalcularTotalesListado(tipo,valor)}}},{xtype:"combobox",fieldLabel:"Filtrar",id:"btnComboFiltroCompras",flex:0.5,labelWidth:35,store:storefiltros,valueField:"id",displayField:"descripcion",emptyText:"----- Seleccionar ----",query:"local",editable:false,listeners:{select:function(f,b,d){if(f.getValue()==0||f.getValue()==1){Ext.getCmp("txtBuscadorCompras").focus(true,200);Ext.getCmp("txtBuscadorCompras").setDisabled(false);Ext.getCmp("txtBuscadorCompras").setValue("")}else{Ext.getCmp("txtBuscadorCompras").focus(false,200);Ext.getCmp("txtBuscadorCompras").setDisabled(true);Ext.getCmp("txtBuscadorCompras").setValue("");var e=f.getValue();var c=Ext.getCmp("txtBuscadorCompras").getValue();tipo=e;valor=c;a.filtrarGrillaCompras(e,c);a.getCalcularTotalesListado(e,c)}}}},{xtype:"textfield",id:"txtBuscadorCompras",hasfocus:true,disabled:true,flex:0.5,listeners:{specialkey:function(d,g){if(g.getKey()==g.ENTER){var c=Ext.getCmp("btnComboFiltroCompras").getValue();var b=d.getValue();tipo=c;valor=b;a.filtrarGrillaCompras(c,b);a.getCalcularTotalesListado(c,b)}}}},"-",{xtype:"label",text:"Buscar Fecha"},{xtype:"datefield",value:new Date(),id:"dpFechaCompra",format:"d/m/Y",flex:0.3,listeners:{change:function(e,d,b){var c=Ext.Date.format(e.getValue(),"d/m/Y");tipo=2;valor=c.toString();a.filtrarGrillaCompras(2,c.toString());a.getCalcularTotalesListado(2,c.toString())}}}]});this.getCalcularTotalesListado(-1,"");tipo=-1;valor="";this.callParent(arguments)},getCalcularTotalesListado:function(b,a){var c;switch(b){case -1:c={pfechacompra:null,pproveedor:null,pnumerodoc:null};break;case 0:c={pfechacompra:null,pproveedor:null,pnumerodoc:a};break;case 1:c={pfechacompra:null,pproveedor:a,pnumerodoc:null};break;case 2:c={pfechacompra:a,pproveedor:null,pnumerodoc:null};break}Ext.Ajax.request({url:"compras/totalcompras",params:c,success:function(i,f,g,h){var e=MyDesktop.app.util.Util.decodeJSON(i.responseText);if(e.success){var d=e.total;Ext.util.Format.thousandSeparator=",";Ext.util.Format.decimalSeparator=".";d=Ext.util.Format.number(d,"0,000.000");Ext.getCmp("txtTotalCompras").setValue(d)}else{MyDesktop.app.util.Util.showErrorMsg(i.responseText);return false}},failure:function(g,d,e,f){}})},filtrarGrillaCompras:function(b,a){if(b==-1){storecompras.getProxy().extraParams={pfechacompra:null,pproveedor:null,pnumerodoc:null};storecompras.loadPage(1);return false}if(b==0){storecompras.getProxy().extraParams={pfechacompra:null,pproveedor:null,pnumerodoc:a};storecompras.loadPage(1);return false}if(b==1){storecompras.getProxy().extraParams={pfechacompra:null,pproveedor:a,pnumerodoc:null}}else{storecompras.getProxy().extraParams={pfechacompra:a,pproveedor:null,pnumerodoc:null}}storecompras.loadPage(1)},imprimirListadoDeIngresos:function(c,b){var a="";if(c==-1){pfechacompra="";pproveedor="",pnumerodoc="";a="reportes/imprimiringresoslistado?pfechacompra="+pfechacompra+"&pproveedor="+pproveedor+"&pnumerodoc="+pnumerodoc}if(c==0){pfechacompra="";pproveedor="";pnumerodoc=b;a="reportes/imprimiringresoslistado?pfechacompra="+pfechacompra+"&pproveedor="+pproveedor+"&pnumerodoc="+pnumerodoc}if(c==1){pfechacompra="";pproveedor=b;pnumerodoc="";a="reportes/imprimiringresoslistado?pfechacompra="+pfechacompra+"&pproveedor="+pproveedor+"&pnumerodoc="+pnumerodoc}else{if(c==2){pfechacompra=b;pproveedor="";pnumerodoc="";a="reportes/imprimiringresoslistado?pfechacompra="+pfechacompra+"&pproveedor="+pproveedor+"&pnumerodoc="+pnumerodoc}}tabpanel=Ext.getCmp("tpContenedorApp");if(!tabpanel.getChildByElement("tabpdfreportedecompras")){tabpanel.add({xtype:"panel",closable:true,id:"tabpdfreportedecompras",title:"Reporte de Compras",layout:"fit",items:[{xtype:"uxiframe",src:a}]})}tabpanel.setActiveTab("tabpdfreportedecompras")}});