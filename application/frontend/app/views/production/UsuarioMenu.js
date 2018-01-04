Ext.define("MyDesktop.app.views.UsuarioMenu",{extend:"Ext.panel.Panel",alias:"widget.usuariosmenu",requires:["MyDesktop.app.views.Usuarios","MyDesktop.app.views.Permisos"],layout:{type:"fit"},initComponent:function(){var a=this;Ext.applyIf(a,{items:[{xtype:"container",layout:{align:"stretch",type:"vbox"},items:[{xtype:"toolbar",border:true,id:"tbUsuarioMenu",items:[{xtype:"buttongroup",columns:3,title:"Mantenimiento",items:[{text:"Usuarios",scale:"large",rowspan:3,iconCls:"img-cliente2",iconAlign:"top",handler:function(){a.getItemClick("Usuarios")}},{text:"Permisos",scale:"large",rowspan:3,iconCls:"img-permisos",iconAlign:"top",handler:function(){a.getItemClick("Permisos")}}]},{xtype:"buttongroup",columns:1,width:120,title:"Conf. Perfiles",items:[{text:"Visualizar",scale:"large",rowspan:3,iconCls:"img-tool",iconAlign:"top",handler:function(){a.getItemClick("Consultar")}}]}]},{xtype:"tabpanel",region:"center",id:"tpContenedorAppUsuarios",activeTab:0,flex:8,layoutOnTabChange:true,resizeTabs:true,defaults:{layout:"fit",autoScroll:true}}]}]});a.callParent(arguments)},getItemClick:function(a){tabpanel=Ext.getCmp("tpContenedorAppUsuarios");if(!tabpanel.getChildByElement("tab"+a)){tabpanel.add({title:a,id:"tab"+a,closable:true,flex:1,items:[{xtype:getVistaUsuariosMostrar(a)}]})}tabpanel.setActiveTab("tab"+a)}});function getVistaUsuariosMostrar(a){var b="";switch(a){case"Usuarios":b="wusuarios";break;case"Permisos":b="wpermisos";break}return b};