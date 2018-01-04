var _flagbuscadorpaciente="";
Ext.define('MyDesktop.app.views.Procesos', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wprocesos',
    requires: [
        'MyDesktop.app.views.Contrato',
        'MyDesktop.app.views.ContratoEditar',
        'MyDesktop.app.views.FacturaBoleta',
        'MyDesktop.app.views.Mantenimientos',
        'MyDesktop.app.views.Clientes',
        'MyDesktop.app.views.Proveedores',
        'MyDesktop.app.views.Compras',
        'MyDesktop.app.views.CompraEditar',
        'MyDesktop.app.views.StockIngresos',
        'MyDesktop.app.views.ConsultaContratos',
        'MyDesktop.app.views.servicio.registro.RegistroCita',
        'MyDesktop.app.views.servicio.consultorio.ConsultorioMedico',
        'MyDesktop.app.views.reportes.ListadoDeCaja',
        'MyDesktop.app.views.reportes.ListadoDeCajaCompra',
        'MyDesktop.app.views.reportes.ListadoDePaciente',
        'MyDesktop.app.views.reportes.LiquidacionMedico',
        'MyDesktop.app.views.consulta.ConsultaHistoriaPaciente',
        'MyDesktop.app.views.UsuarioMenu',
        'MyDesktop.app.views.ExportarExcel',
        'MyDesktop.app.views.ContratoNota',
        'MyDesktop.app.views.ContratoHonorario',
        'MyDesktop.app.views.ContratoEditarNota',
        'MyDesktop.app.views.ContratoModificarNota',
        'MyDesktop.app.views.ContratoEditarHonorario',
        'MyDesktop.app.views.ContratoModificarHonorario'

                //'MyDesktop.app.views.inventario.Contenedor'

    ],
    layout: {type: 'fit'},
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {align: 'stretch', type: 'vbox'},
                    items: [
                        {
                            xtype: 'toolbar',
                            border: true,
                            // flex: 1,
                            items: [
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Tablas',
                                    items: [
                                        {
                                            text: 'Maestros',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-tool',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Maestros")
                                            }

                                        },
                                        {
                                            text: 'Proveedores',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-proveedor',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Proveedores")
                                            }

                                        },
                                        {
                                            text: 'Clientes',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-cliente2',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Clientes");
                                                /*var store=Ext.ComponentQuery.query("wclientes gridpanel#dgvcliente")[0].getStore();
                                                store.load({
                                                    params:{


                                                       pid : -1 ,pdatospersona :null
                                                   }
                                                });*/

                                            }

                                        }
                                    ]
                                },
                                {
                                    xtype: 'buttongroup',
                                    columns: 4,
                                    title: 'Ventas',
                                    items: [
                                        {
                                            text: 'Registrar',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-ventas',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Registro de Ventas")
                                            }

                                        },
                                        {
                                            text: 'Registrar Nota',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-ventas',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Registro de Notas")
                                            }

                                        },
                                        {
                                            text: 'Registrar Honorario',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-ventas',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Registro de Honorarios")
                                            }

                                        },
                                        {
                                            text: 'Consultas',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-consultacontrato',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Consultas Ventas")
                                            }

                                        }

                                    ]
                                },
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Compras',
                                    items: [
                                        {
                                            text: 'Registrar',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-compras',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Registro de Ingresos")
                                            }
                                        },
                                        {
                                            text: 'Stock',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-stock',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Stock")
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Servicio',
                                    items: [
                                        {
                                            text: 'Registrar Cita',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-citas',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Registro de Citas");
                                                console.log("ddddd"+Ext.util.Cookies.get("sede"));
                                                var store=Ext.ComponentQuery.query("wregcita combo#cboTipoCita")[0].getStore();
                                              //  store.removeAll();
                                                store.load({
                                                   params:{
                                                       vSede:Ext.util.Cookies.get("sede")
                                                   }
                                                });
                                            }

                                        },
                                        {
                                            text: 'Consultorio Medico',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-consultorio',
                                            iconAlign: 'top',
                                            handler: function () {
                                                me.getItemClick("Consultorio");

                                                /*Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setValue(new Date());
                                                 var fecha  =Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].getRawValue();
                                                 var arreglofecha=fecha.split("/");
                                                 fecha=arreglofecha[0]+"/"+arreglofecha[1]+"/"+(parseInt(arreglofecha[2])+1);
                                                 Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setRawValue(fecha);
                                                 Ext.ComponentQuery.query("diagnosticoingreso #dfDiagnosticoProximaCita")[0].setReadOnly(true);

                                                 Ext.ComponentQuery.query("diagnosticoingreso #checkdiagnosticoProximacita")[0].setValue(true);*/


                                            }

                                        },
                                    ]
                                },
                                {
                                    xtype: 'buttongroup',
                                    columns: 3,
                                    title: 'Reportes',
                                    items: [
                                        {
                                            xtype: 'splitbutton',
                                            text: 'Reportes',
                                            id: 'btnReportesVentas',
                                            scale: 'large',
                                            iconCls: 'img-reportes',
                                            iconAlign: 'top',
                                            menu: [
                                                {
                                                    text: 'Reporte de Ventas',
                                                    handler: function () {
                                                        me.getItemClick("ReporteVentas");
                                                        estableceFechaActualReporteVentas();
                                                    }
                                                },
                                                {
                                                    text: 'Reporte de Compras',
                                                    handler: function () {
                                                        me.getItemClick("ReporteCompras");
                                                        estableceFechaActualReporteCompras();
                                                    }
                                                },
                                                {
                                                    text: "Reporte de Pacientes",
                                                    handler: function () {
                                                        me.getItemClick("ReportePaciente");
                                                        estableceFechaActual();

                                                    }
                                                },
						                                    {
                                                    text: "Exportar Excel",
                                                    handler: function () {
                                                      var win = Ext.create('Ext.window.Window', {
                                                          id: 'w-exportexcel',
                                                          title: 'Exportar Excel',
                                                          width: 450,
                                                          height: 100,
                                                          iconCls: 'notepad',
                                                          animCollapse: false,
                                                          border: false,
                                                          layout: 'fit',
                                                          autoShow: true,
                                                          closeAction: 'destroy',
                                                          modal: true,
                                                          items: [
                                                              {
                                                                  xtype: 'wexportarexcel'

                                                              }
                                                          ]
                                                      });

                                                        //me.getItemClick("ReportePaciente");
                                                        //estableceFechaActual();


                                                    }
                                                },
                                                {
                                                    text: "Liquidacion Medicos",
                                                    handler: function () {
                                                        me.getItemClick("ReporteLiquidacionMed");
                                                        //estableceFechaActual();

                                                    }
                                                }


                                            ]

                                        }
                                    ]
                                },
                                {
                                    xtype: "buttongroup",
                                    columns: 3,
                                    title: "Consulta",
                                // title:"No Ingresar",
                                    hidden:false,
                                    items: [
                                        {
                                            xtype: "splitbutton",
                                            text: "Paciente",
                                         // text:"En Desarrollo",
                                            id: "btnConsultaPaciente",
                                            scale: "large",
                                            iconCls: "img-citas",
                                            iconAlign: "top",
                                            menu: [
                                                {
                                                    text: "Historia",
                                                    handler: function () {
                                                        me.getItemClick("Consulta Historia Paciente");

                                                    }
                                                }
                                            ]

                                        }
                                    ]
                                },
                                {
                                    xtype: "buttongroup",
                                    columns: 3,
                                    title: "Seguridad",
                                // title:"No Ingresar",
                                    hidden:false,
                                    items: [
                                       {
                                            text: 'Usuarios',
                                            scale: 'large',
                                            rowspan: 3,
                                            iconCls: 'img-permisos',
                                            iconAlign: 'top',
                                            handler: function () {
                                                   me.getItemClick("Usuarios")
                                            }

                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            region: 'center',
                            id: 'tpContenedorApp',
                            activeTab: 0,
                            flex: 8,
                            layoutOnTabChange: true,
                            resizeTabs: true,
                            defaults: {layout: 'fit', autoScroll: true}
                        }
                    ]
                }
            ] // fin container
        });

        me.callParent(arguments);
    },
    getItemClick: function (item) {
        Ext.Ajax.request({
            url: 'index.php/usuarios/accesos',
            params: {
                usuario: Ext.util.Cookies.get('idusuario'),
                menu:item
            },
            success: function (conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if(result[0].pasa==0){
                    Ext.Msg.alert("Acceso","El usuario no tiene el permiso para ingresar al modulo");
                }else{
                    if(item=='Usuarios'){
                        var win = Ext.create('Ext.window.Window', {
                            id: 'w-usuarios',
                            title: 'Usuarios y Permisos del Sistema',
                            width: 950,
                            height: 460,
                            iconCls: 'notepad',
                            animCollapse: false,
                            border: false,
                            layout: 'fit',
                            autoShow: true,
                            closeAction: 'destroy',
                            modal: true,
                            items: [
                                {
                                    xtype: 'usuariosmenu',

                                }
                            ]
                        });
                    }else
                    {
                        tabpanel = Ext.getCmp('tpContenedorApp');
                        if (!tabpanel.getChildByElement('tab' + item)) {
                            tabpanel.add({
                                title: item,
                                id: 'tab' + item,
                                closable: true,
                                flex: 1,
                                items: [
                                    {
                                        xtype: getVistaMostrar(item)

                                    }
                                ]
                            });
                        }
                        tabpanel.setActiveTab('tab' + item);
                    }
                }
            }

        });
    }

});
function estableceFechaActualReporteCompras(){
    var hoy = new Date();
    dia = formatoDosDigitos(hoy.getDate());
    mes = formatoDosDigitos(hoy.getMonth() + 1);
    anio = hoy.getFullYear();
    fecha_actual = String(dia + "/" + mes + "/" + anio);
    Ext.ComponentQuery.query("wlistadocajacompra")[0].down("#dpFechaCompra").setValue(fecha_actual);
   // Ext.ComponentQuery.query("wlistadopaciente")[0].down("#dpFechaAl").setValue(fecha_actual);
}
function estableceFechaActualReporteVentas(){
    var hoy = new Date();
    dia = formatoDosDigitos(hoy.getDate());
    mes = formatoDosDigitos(hoy.getMonth() + 1);
    anio = hoy.getFullYear();
    fecha_actual = String(dia + "/" + mes + "/" + anio);
    Ext.ComponentQuery.query("wlistadocaja")[0].down("#dpFecha").setValue(fecha_actual);
   // Ext.ComponentQuery.query("wlistadopaciente")[0].down("#dpFechaAl").setValue(fecha_actual);
}
function estableceFechaActual() {
    var hoy = new Date();
    dia = formatoDosDigitos(hoy.getDate());
    mes = formatoDosDigitos(hoy.getMonth() + 1);
    anio = hoy.getFullYear();
    fecha_actual = String(dia + "/" + mes + "/" + anio);
    Ext.ComponentQuery.query("wlistadopaciente")[0].down("#dpFechaDel").setValue(fecha_actual);
    Ext.ComponentQuery.query("wlistadopaciente")[0].down("#dpFechaAl").setValue(fecha_actual);
}
function formatoDosDigitos(x) {
    if (x < 10) {
        x = "0" + x;
    }
    return x;
}
function getVistaMostrar(item) {

    var app = '';

    switch (item) {
        case "Maestros":
            app = "wmantenimientos";
            break;
        case "Registro de Ventas":
            app = "wcontrato";
            break;
        case "Clientes":
            app = "wclientes";
            break;
        case "Proveedores":
            app = "wproveedores";
            break;
        case "Registro de Ingresos":
            app = "wcompras";
            break;
        case "Stock":
            app = "wstockingresos";
            break;
        case "Consultas Ventas":
            app = "wconsultacontratos";
            break;
        case "Registro de Citas":
            app = "wregcita";
            break;
        case "Consultorio":
            app = "wconsultorio";
            break;
        case "ReporteVentas":
            app = "wlistadocaja";
            break;
        case "ReporteCompras":
            app = "wlistadocajacompra";
            break;
        case "ReportePaciente":
            app = "wlistadopaciente";
            break;
        case "Consulta Historia Paciente":
            app = "wconsultahiostoriapaciente";
            break;

        case "Registro de Notas":
            app = "wcontratonota";
            break;

        case "Registro de Honorarios":
            app = "wcontratohonorario";
            break;

        case "ReporteLiquidacionMed":
                app = "wliquidacionmedico";
                break;

    }

    return app;
}
