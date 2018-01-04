Ext.define("MyDesktop.app.views.Mantenimientos",{extend:"Ext.tab.Panel",alias:"widget.wmantenimientos",id:"wmantenimientos",layout:"fit",initComponent:function(){me=this;storeProductos=Ext.create("MyDesktop.app.stores.Productos");storeTrabajadores=Ext.create("MyDesktop.app.stores.Trabajadores");storeTipoTrabajador=Ext.create("MyDesktop.app.stores.TipoTrabajador");storeMaterial=Ext.create("MyDesktop.app.stores.Materiales");Ext.apply(me,{items:[{title:"Producto",flex:1,items:[{xtype:"panel",border:false,layout:{type:"hbox",anchor:"100%"},items:[{xtype:"panel",border:false,flex:2,bodyPadding:5,items:[{xtype:"gridpanel",id:"dgvproductos",store:storeProductos,sortableColumns:false,columns:[{text:"Id",dataIndex:"id",flex:0.5},{text:"Descripcion",dataIndex:"producto",flex:2.5},{text:"Estado",dataIndex:"estados",flex:0.5,renderer:function(a){if(a==0){return'<span style="color:red;font-weight:bold;">ELIMNA</span>'}else{if(a==1){return'<span style="color:green;font-weight:bold;">ACTIVO</span>'}else{return'<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>'}}}},{xtype:"actioncolumn",width:40,align:"center",items:[{iconCls:"remove",handler:function(d,e,c){var b=d.getStore().getAt(e);var a=b.get("id");FxEliminarProducto(a)}}]}],dockedItems:[{xtype:"pagingtoolbar",id:"ptbproductos",store:storeProductos,dock:"bottom",displayInfo:true}],listeners:{itemclick:function(c,a,d,b,f){FxEditarProducto()}}}]},{xtype:"panel",border:false,titleAlign:"center",flex:1,layout:{aling:"stretch",type:"fit"},height:425,bodyPadding:4,items:[{xtype:"form",id:"myFormProducto",frame:true,bodyPadding:1,layout:{type:"hbox",align:"stretch"},flex:2,items:[{xtype:"fieldset",flex:2,title:"Detalle de los Productos",defaults:{anchor:"100%",xtype:"textfield",allowBlank:true,labelWidth:150},items:[{xtype:"hiddenfield",name:"id",id:"txtIdProd"},{xtype:"label",width:30,text:"Descripcion :",style:"font-weight : bold;"},{id:"txtDesProd",name:"producto",fieldStyle:"text-transform:uppercase"},{xtype:"label",width:30,text:"Unidad Medida :",style:"font-weight : bold;"},{id:"txtUnidadMedProd",name:"unidadmedida",fieldStyle:"text-transform:uppercase"},{xtype:"label",width:30,text:"Numero Unidad Medida :",style:"font-weight : bold;"},{id:"txtNumUnidadMedProd",name:"numunidad",fieldStyle:"text-transform:uppercase"},{xtype:"container",layout:{type:"hbox"},width:400,border:false,defaults:{labelWidth:90,flex:1,padding:2},items:[{xtype:"textfield",fieldLabel:"<b>Stock Minimo</b>",name:"stockmin",id:"txtStockMinimoProd"},{xtype:"textfield",fieldLabel:"<b>Stock</b>",name:"stock",id:"txtStockProd"}]},{xtype:"container",layout:{type:"hbox"},width:400,border:false,defaults:{labelWidth:90,flex:1,padding:2},items:[{xtype:"combobox",fieldLabel:"<b>Maneja Stock</b>",name:"manstock",id:"cboManejaStockProd",displayField:"descripcion",valueField:"id",query:"local",store:Ext.create("Ext.data.ArrayStore",{fields:[{name:"id"},{name:"descripcion"}],data:[["S","SI"],["N","NO"]]}),editable:false},{xtype:"combobox",fieldLabel:"<b>Gastos</b>",name:"gastoprodu",id:"cboGastoProd",displayField:"descripcion",valueField:"id",query:"local",store:Ext.create("Ext.data.ArrayStore",{fields:[{name:"id"},{name:"descripcion"}],data:[["S","SI"],["N","NO"]]}),editable:false}]}]}],bbar:[{xtype:"button",text:"Nuevo",iconCls:"add",handler:function(){var a=Ext.getCmp("myFormProducto");a.getForm().reset();Ext.getCmp("txtDesProd").focus();Ext.getCmp("txtIdProd").setValue(0)}},{xtype:"button",text:"Guardar",iconCls:"boton-save",handler:function(){FxActualizarProducto()}}]}]}]}]},{title:"Trabajadores",flex:1,items:[{xtype:"panel",border:false,layout:"hbox",items:[{xtype:"panel",border:false,flex:2,layout:"fit",bodyPadding:5,items:[{xtype:"gridpanel",id:"dgvtrabajadores",store:storeTrabajadores,sortableColumns:false,height:410,columns:[{text:"Id",dataIndex:"id",flex:0.5},{text:"Ape. Paterno",dataIndex:"paterno",flex:1},{text:"Ape. Materno",dataIndex:"materno",flex:1},{text:"Nombres",dataIndex:"nombres",flex:1},{text:"Estado",dataIndex:"estados",flex:0.5,renderer:function(a){if(a==0){return'<span style="color:red;font-weight:bold;">ELIMNA</span>'}else{if(a==1){return'<span style="color:green;font-weight:bold;">ACTIVO</span>'}else{return'<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>'}}}},{xtype:"actioncolumn",width:40,align:"center",items:[{iconCls:"remove",handler:function(d,e,c){var b=d.getStore().getAt(e);var a=b.get("id");FxEliminarTrabajador(a)}}]}],dockedItems:[{xtype:"pagingtoolbar",id:"ptbtrabajadores",store:storeTrabajadores,dock:"bottom",displayInfo:true}],listeners:{itemclick:function(c,a,d,b,f){FxEditarTrabajador()}}}]},{xtype:"panel",border:false,titleAlign:"center",flex:1,layout:{aling:"stretch",type:"fit"},bodyPadding:4,height:420,items:[{xtype:"form",id:"myFormTrabajador",frame:true,bodyPadding:1,layout:{type:"hbox",align:"stretch"},items:[{xtype:"fieldset",flex:2,title:"Informacion del Trabajador",defaults:{anchor:"100%",xtype:"textfield",allowBlank:false,labelWidth:150},items:[{xtype:"hiddenfield",name:"id",id:"txtIdTraba"},{xtype:"label",width:30,text:"Apellido Paterno :",style:"font-weight : bold;"},{id:"txtPaternoTraba",name:"paterno",fieldStyle:"text-transform:uppercase"},{xtype:"label",width:30,text:"Apellido Materno :",style:"font-weight : bold;"},{id:"txtMaternoTrab",name:"materno",fieldStyle:"text-transform:uppercase"},{xtype:"label",width:30,text:"Nombres :",style:"font-weight : bold;"},{id:"txtNombresTrab",name:"nombres",fieldStyle:"text-transform:uppercase"},{xtype:"container",layout:{type:"hbox"},border:false,defaults:{labelWidth:120,flex:1,padding:2},items:[{xtype:"datefield",fieldLabel:"<b>Fecha Nacimiento</b>",name:"fnacimiento",id:"FechaNaciTrab"}]},{xtype:"container",layout:{type:"hbox"},border:false,defaults:{labelWidth:120,flex:1,padding:2},items:[{xtype:"combobox",fieldLabel:"<b>Sexo</b>",name:"sexo",id:"cboSexoTrab",displayField:"descripcion",valueField:"id",store:Ext.create("Ext.data.ArrayStore",{fields:[{name:"id"},{name:"descripcion"}],data:[["M","M"],["F","F"]]}),editable:false}]},,{xtype:"label",width:30,text:"Tipo de Cargo :",style:"font-weight : bold;"},{xtype:"combobox",id:"txtTipoCargoTrab",store:storeTipoTrabajador,name:"tipotra",query:"remote",displayField:"descripcion",valueField:"id",editable:false}]}],bbar:[{xtype:"button",text:"Nuevo",iconCls:"add",id:"btnNuevoTrab",handler:function(){var a=Ext.getCmp("myFormTrabajador");a.getForm().reset();Ext.getCmp("txtPaternoTraba").focus()}},{xtype:"button",text:"Guardar",id:"btnGuardarTrab",iconCls:"boton-save",handler:function(){FxActualizarTrabajador()}}]}]}]}]},{title:"Materiales",flex:1,items:[{xtype:"panel",border:false,layout:"hbox",items:[{xtype:"panel",border:false,flex:2,layout:"fit",bodyPadding:5,items:[{xtype:"gridpanel",id:"dgvmateriales",store:storeMaterial,sortableColumns:false,height:410,columns:[{text:"Id",dataIndex:"id",flex:0.5},{text:"Descripcion ",dataIndex:"descrip",flex:2},{text:"Largo",dataIndex:"_largo",flex:0.3},{text:"Ancho",dataIndex:"_ancho",flex:0.3},{text:"Medida",dataIndex:"medida",flex:1},{text:"Estado",dataIndex:"est",flex:0.5,renderer:function(a){if(a==0){return'<span style="color:red;font-weight:bold;">ELIMNA</span>'}else{if(a==1){return'<span style="color:green;font-weight:bold;">ACTIVO</span>'}else{return'<span style="color:#D7DF01;font-weight:bold;">SUSPEN</span>'}}}},{xtype:"actioncolumn",width:40,align:"center",items:[{iconCls:"remove",handler:function(d,e,c){var b=d.getStore().getAt(e);var a=b.get("id");FxEliminarMaterial(a)}}]}],listeners:{itemclick:function(c,a,d,b,f){FxEditarMaterial()}}}]},{xtype:"panel",border:false,titleAlign:"center",flex:1,layout:{aling:"stretch",type:"fit"},bodyPadding:4,height:420,items:[{xtype:"form",id:"myFormMaterial",frame:true,bodyPadding:1,layout:{type:"hbox",align:"stretch"},items:[{xtype:"fieldset",flex:2,title:"Informacion del Material",defaults:{anchor:"100%",xtype:"textfield",allowBlank:false,labelWidth:150},items:[{xtype:"hiddenfield",name:"id",id:"txtIdMat"},{xtype:"label",width:30,text:"Descripcion :",style:"font-weight : bold;"},{id:"txtDescripcionMat",name:"descrip",fieldStyle:"text-transform:uppercase"},{xtype:"label",width:30,text:"Medida :",style:"font-weight : bold;"},{id:"txtMedidaMat",name:"medida",fieldStyle:"text-transform:uppercase"},{xtype:"container",layout:{type:"hbox"},border:false,defaults:{labelWidth:50,flex:1,padding:2},items:[{xtype:"numberfield",fieldLabel:"<b>Ancho</b>",name:"_ancho",id:"txtAnchoMat",fieldStyle:"text-align:right",decimalPrecision:2,step:0.01,decimalSeparator:"."},{xtype:"numberfield",fieldLabel:"<b>Largo</b>",name:"_largo",id:"txtLargoMat",fieldStyle:"text-align:right",decimalPrecision:2,step:0.01,decimalSeparator:"."}]}]}],bbar:[{xtype:"button",text:"Nuevo",iconCls:"add",handler:function(){var a=Ext.getCmp("myFormMaterial");a.getForm().reset();Ext.getCmp("txtDescripcionMat").focus()}},{xtype:"button",text:"Guardar",id:"btnActualizarMat",iconCls:"boton-save",handler:function(){FxActualizarMaterial()}}]}]}]}]}]});this.callParent(arguments)}});function FxEditarTrabajador(){var a=Ext.getCmp("dgvtrabajadores");record=a.getSelectionModel().getSelection();if(record[0]){var b=Ext.getCmp("myFormTrabajador");b.loadRecord(record[0])}}function FxEditarProducto(){var a=Ext.getCmp("dgvproductos");record=a.getSelectionModel().getSelection();if(record[0]){var b=Ext.getCmp("myFormProducto");b.loadRecord(record[0])}}function FxEditarMaterial(){var a=Ext.getCmp("dgvmateriales");record=a.getSelectionModel().getSelection();if(record[0]){var b=Ext.getCmp("myFormMaterial");b.loadRecord(record[0])}}function FxActualizarProducto(){var a=Ext.getCmp("myFormProducto");id=Ext.getCmp("txtIdProd").getValue();descripcion=Ext.getCmp("txtDesProd").getValue();medida=Ext.getCmp("txtUnidadMedProd").getValue();nrounidades=Ext.getCmp("txtNumUnidadMedProd").getValue();usuario="SISTEMA";stockminimo=Ext.getCmp("txtStockMinimoProd").getValue();gasto=Ext.getCmp("cboGastoProd").getValue();manejastock=Ext.getCmp("cboManejaStockProd").getValue();stock=Ext.getCmp("txtStockProd").getValue();Ext.Ajax.request({url:"productos/actualizar",params:{vId:parseInt(id),vDescripcion:descripcion,vMedida:medida,vNroUnidades:nrounidades,vUsuario:usuario,vStockMinimo:stockminimo,vGasto:gasto,vManejaStock:manejastock},success:function(f,c,d,e){var b=MyDesktop.app.util.Util.decodeJSON(f.responseText);if(b.success){Ext.getCmp("dgvproductos").getStore().load();a.getForm().reset()}else{MyDesktop.app.util.Util.showErrorMsg(f.responseText);return false}},failure:function(e,b,c,d){}})}function FxEliminarProducto(b){var a=Ext.getCmp("myFormProducto");usuario="SISTEMA";Ext.Ajax.request({url:"productos/eliminar",params:{vId:parseInt(b),vUsuario:usuario},success:function(g,d,e,f){var c=MyDesktop.app.util.Util.decodeJSON(g.responseText);if(c.success){Ext.getCmp("dgvproductos").getStore().load()}else{MyDesktop.app.util.Util.showErrorMsg(g.responseText);return false}},failure:function(f,c,d,e){}})}function FxActualizarTrabajador(){var a=Ext.getCmp("myFormTrabajador");id=Ext.getCmp("txtIdTraba").getValue();paterno=Ext.getCmp("txtPaternoTraba").getValue();materno=Ext.getCmp("txtMaternoTrab").getValue();nombres=Ext.getCmp("txtNombresTrab").getValue();fechanaci=Ext.getCmp("FechaNaciTrab").getValue();sexo=Ext.getCmp("cboSexoTrab").getValue();tipotrab=Ext.getCmp("txtTipoCargoTrab").getValue();usuario="SISTEMA";Ext.Ajax.request({url:"trabajadores/actualizar",params:{vId:id,vPaterno:paterno,vMaterno:materno,vNombres:nombres,vFechaNaci:(fechanaci==""?"01/01/1900":fechanaci),vSexo:sexo,vTipoTrab:tipotrab,vUsuario:usuario},success:function(f,c,d,e){var b=MyDesktop.app.util.Util.decodeJSON(f.responseText);if(b.success){Ext.getCmp("dgvtrabajadores").getStore().load();a.getForm().reset()}else{MyDesktop.app.util.Util.showErrorMsg(f.responseText);return false}},failure:function(e,b,c,d){}})}function FxEliminarTrabajador(b){var a=Ext.getCmp("myFormTrabajador");usuario="SISTEMA";Ext.Ajax.request({url:"trabajadores/eliminar",params:{vId:parseInt(b),vUsuario:usuario},success:function(g,d,e,f){var c=MyDesktop.app.util.Util.decodeJSON(g.responseText);if(c.success){Ext.getCmp("dgvtrabajadores").getStore().load();a.getForm().reset()}else{MyDesktop.app.util.Util.showErrorMsg(g.responseText);return false}},failure:function(f,c,d,e){}})}function FxActualizarMaterial(){var a=Ext.getCmp("myFormMaterial");id=Ext.getCmp("txtIdMat").getValue();descripcion=Ext.getCmp("txtDescripcionMat").getValue();largo=Ext.getCmp("txtLargoMat").getValue();ancho=Ext.getCmp("txtAnchoMat").getValue();medida=Ext.getCmp("txtMedidaMat").getValue();Ext.Ajax.request({url:"productos/actualizarmaterial",params:{vId:id,vDescripcion:descripcion,vLargo:largo,vAncho:ancho,vMedida:medida},success:function(f,c,d,e){var b=MyDesktop.app.util.Util.decodeJSON(f.responseText);if(b.success){Ext.getCmp("dgvmateriales").getStore().load();a.getForm().reset()}else{MyDesktop.app.util.Util.showErrorMsg(f.responseText);return false}},failure:function(e,b,c,d){}})}function FxEliminarMaterial(b){var a=Ext.getCmp("myFormMaterial");usuario="SISTEMA";Ext.Ajax.request({url:"productos/eliminarmaterial",params:{vId:parseInt(b)},success:function(g,d,e,f){var c=MyDesktop.app.util.Util.decodeJSON(g.responseText);if(c.success){Ext.getCmp("dgvmateriales").getStore().load();a.getForm().reset()}else{MyDesktop.app.util.Util.showErrorMsg(g.responseText);return false}},failure:function(f,c,d,e){}})};