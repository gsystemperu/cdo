Ext.define("MyDesktop.app.views.BuscarProveedor",{extend:"Ext.window.Window",alias:"widget.wbuscarproveedor",initComponent:function(){var a=this;Ext.apply(a,{title:"Buscador de Pacientes",width:600,height:300,modal:true,layout:"fit",items:[{xtype:"gridpanel",id:"dgvBuscarPaciente",columns:[{header:"Id",dataIndex:"_idper",hidden:false,flex:0.5},{header:"Apellido Paterno",dataIndex:"_paterno",flex:1},{header:"Apellido Materno",dataIndex:"_materno",flex:1},{header:"Apellido Nombres",dataIndex:"_nombre",flex:1}],viewConfig:{listeners:{itemdblclick:function(c,b,f,d,g){}}}}],dockedItems:[{xtype:"pagingtoolbar",dock:"bottom",displayInfo:true}],tbar:[{xtype:"combobox",id:"cboBuscadorPacTipo",displayField:"descripcion",valueField:"id",editable:false,emptyText:"Tipo de Busqueda"},{xtype:"textfield",id:"txtBuscarPacientePor",fieldStyle:"text-transform:uppercase",flex:2},{xtype:"button",text:"Buscar",flex:1,handler:function(){a.getBuscarPacientePorTipo()}}]});this.callParent(arguments)},getBuscarPacientePorTipo:function(){var b=Ext.getCmp("cboBuscadorPacTipo").getValue();var a=Ext.getCmp("txtBuscarPacientePor").getValue();if(b!=null){storepaciente.getProxy().extraParams={page:1,start:0,limit:25,pid:(b==0?a:0),ppaterno:(b==1?a:null),pmaterno:(b==2?a:null),pnombres:(b==3?a:null)};storepaciente.loadPage(1)}}});