Ext.define('MyDesktop.app.views.ContratoNota', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.wcontratonota',
    id: 'wcontratonota',
    requires: [
        //'MyDesktop.app.views.ContratoEditar',
        //'MyDesktop.app.views.ContratoModificar',
        'MyDesktop.app.stores.Contratos',
        'MyDesktop.app.views.ContratoDetalle',
        'MyDesktop.app.views.FacturaBoleta',
        'MyDesktop.app.stores.Generos',
        'Ext.ux.IFrame'
    ],
    initComponent: function () {
        storecontratos = Ext.create('MyDesktop.app.stores.ContratosNotas');
        _mysede = Ext.util.Cookies.get('sede');
        storecontratos.getProxy().extraParams={
          pidcontrato : 0,
          pcliente : null,
          pestado : 0,
          pdesde : null,
          phasta : null,
          psede  : _mysede
        };
        storecontratos.load();
        storefiltros = Ext.create('MyDesktop.app.stores.BusquedasVentas');
        storeTipoMoneda = Ext.create('MyDesktop.app.stores.TipoMoneda');
        me = this;
        Ext.apply(me, {
            layout: 'fit',
            id: 'dgvContratosNota',
            sortableColumns: false,
            store: storecontratos,
            columns: [
                {
                    text: "Codigo",
                    flex: 0.4,
                    sortable: true,
                    dataIndex: 'idcontrato',
                    align: 'left',
                    hidden: true,
                },
                {
                    text: "Documento",
                    flex: 0.4,
                    sortable: true,
                    dataIndex: 'numeroseriedoc',
                    align: 'left',
                },
                {
                    text: "Tipo",
                    flex: 0.2,
                    sortable: true,
                    dataIndex: 'tipodoc',
                    align: 'left',
                },
                {
                    text: "Fecha <br>Vencimiento",
                    flex: 0.5,
                    sortable: true,
                    dataIndex: 'fechaentrega',
                    align: 'center'
                },
                {
                    text: "Hora<br>Final",
                    flex: 0.3,
                    sortable: true,
                    dataIndex: 'horafinal',
                    align: 'center',
                    hidden: true
                },
                {
                    text: "Cliente",
                    flex: 1,
                    sortable: true,
                    dataIndex: 'cliente',
                    align: 'left'
                },
                {
                    text: "Medico",
                    sortable: true,
                    flex: 1,
                    dataIndex: 'diseniador',
                    align: 'left'
                },
                {
                    text: "Tienda",
                    flex: 1.5,
                    sortable: true,
                    dataIndex: 'direcciontienda',
                    align: 'center'

                },
                {
                    text: "Estado",
                    style: 'text-aling:center',
                    flex: 0.6,
                    sortable: true,
                    dataIndex: 'estadocontra',
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex,
                            store, view) {
                        switch (parseInt(record.get("iestado"))) {
                            case 3:
                                return '<b style="color: #DF0315">' + value + '</b>';
                        }
                        return '<b >' + value + '</b>';

                    }

                },
                {
                    text: 'Forma Pago',
                    style: 'text-aling:center',
                    flex: 0.9,
                    sortable: true,
                    dataIndex: 'formapago',
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex,
                            store, view) {
                        return '<b>' + value + '</b>';
                    }
                },
                {
                    xtype: 'templatecolumn',
                    tpl: '<b>{cantproce} de {cantreg}</b>',
                    flex: 0.3,
                    align: 'center',
                    hidden: true

                }
            ],
            listeners: {
                itemclick: function (dv, record, item, index, e) {

                    this.grillaBotonesEstado(record.get("iestado"), record.get("pagado"),record.get("tipodoc"));
                }
            },
            tbar: [
                {
                    xtype: 'button',
                    text: 'Nuevo',
                    iconCls: 'add',
                    id: 'btnNuevoContratoNota',
                    handler: function (btn) {
                        var frm = Ext.create('MyDesktop.app.views.ContratoEditarNota',{animateTarget: btn.id});
                        frm.show(this, function () {
                        });

                    }
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Editar',
                    iconCls: 'boton-edit',
                    id: 'btnEditarContratoNota',
                    handler: function (btn) {

                       // alert("asasa");
                        var grid = Ext.getCmp('dgvContratosNota');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];

                        var conf = {
                            num: parseInt(selectedRecord.get('idcontrato')),
                            animateTarget: btn.id
                        };
                        var frm = Ext.create('MyDesktop.app.views.ContratoModificarNota', conf);
                        frm.show(this, function () {
                        });

                    }
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Anular',
                    iconCls: 'remove',
                    id: 'btnEliminarContratoNota',
                    disabled: true,
                    handler: function () {
                        var grid = Ext.getCmp('dgvContratosNota');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        Ext.Msg.show({
                            title: 'Sistema',
                            msg: 'Desea anular el registro seleccionado?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function (id, value, opt) {
                                if (id === 'yes') {
                                    Ext.Ajax.request({
                                        url: 'index.php/contratos/eliminarcontrato',
                                        params:
                                                {idcontra: parseInt(selectedRecord.get('idcontrato'))},
                                        success: function (conn, response, options, eOpts) {
                                            var result =
                                                    MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                                            if (result.success) {
                                                Ext.each(result.items, function (item) {
                                                    if (item.ERROR > 0) {
                                                        Ext.getCmp('dgvContratosNota').getStore().reload();
                                                    }

                                                });
                                            } else {
                                                MyDesktop.app.util.Util.showErrorMsg(conn.responseText);
                                                return false;
                                            }

                                        },
                                        failure: function (conn, response, options, eOpts) {
                                        }
                                    });

                                    Ext.getCmp('dgvContratosNota').getStore().reload();
                                }
                            }
                        });

                    }
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Imprimir',
                    iconCls: 'boton-print',
                    disabled: true,
                    id: 'btnImprimirContratoNota',
                    handler: function () {

                        // try {
                        var grid = Ext.getCmp('dgvContratosNota');
                        var record = grid.getSelectionModel().getSelection()[0];
                        var idcontrato = record.get('idcontrato');
                        var tipodoc = record.get("tipodoc");
                        var _url = "";
                        if (tipodoc== "F") {

                            if(Ext.util.Cookies.get("sede")==1){
                                 _url = 'reportes/imprimirdocumentoventafactura/' + parseInt(idcontrato).toString();
                            }else{
                                 _url = 'reportes/imprimirdocumentoventafactura2/' + parseInt(idcontrato).toString();
                            }


                            my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=800,height=400");
                        } else if (tipodoc == "B" ) {
                             if(Ext.util.Cookies.get("sede")==1){
                                  _url = 'reportes/imprimirdocumentoventaboleta/' + parseInt(idcontrato).toString();
                             }else{
                                 _url = 'reportes/imprimirdocumentoventaboleta2/' + parseInt(idcontrato).toString();
                             }


                            my = window.open(_url, "mywindow", "location=1,status=1,scrollbars=1,  width=800,height=400");
                        } else {
                            Ext.Msg.show({
                                title: "Mensaje",
                                msg: "Solo se puede imprimir Boleta o Factura...!",
                                buttons: Ext.Msg.OK,
                                buttonText: {
                                    ok: "Aceptar"
                                },
                                icon: Ext.Msg.ERROR
                            });
                        }


                        /* } catch (e) {
                         MyDesktop.app.util.Util.showErrorMsg(
                         "No ha selecionado un contrato registrado!");
                         return false;
                         }*/



                        // setTimeout(function() { my.close(); }, 1000);

                    }
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Actualizar Lista',
                    iconCls: 'icon-grid',
                    id: 'btnActualizarContratosNota',
                    handler: function () {
                        var grid = Ext.getCmp('dgvContratosNota');
                        var rec = grid.getSelectionModel().getSelection()[0];
                        grid.getStore().load(function (records, operation, success) {
                            grid.getSelectionModel().select(rec.index, true);
                        });

                    }
                },
                {
                    xtype: 'button',
                    text: 'Registrar Bobinas',
                    iconCls: 'icon-grid',
                    disabled: true,
                    id: 'btnContratoAsignarBobinaNota',
                    handler: function (btn) {
                        var grid = Ext.getCmp('dgvContratos');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var frm = Ext.create('MyDesktop.app.views.ContratoDetalle', {
                            animateTarget: btn.id,
                            num: selectedRecord.get('idcontrato')
                        });
                        frm.show(this, function () {
                        });

                    },
                    hidden: true
                },
                {
                    xtype: 'button',
                    text: 'Registrar Entrega',
                    iconCls: 'icon-grid',
                    disabled: true,
                    id: 'btnContratoRegistroSalidaNota',
                    handler: function (btn) {
                        var grid = Ext.getCmp('dgvContratos');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var frm = Ext.create('MyDesktop.app.views.FacturaBoleta', {
                            animateTarget: btn.id,
                            num: selectedRecord.get('idcontrato')
                        });
                        frm.show(this, function () {
                        });

                    },
                    hidden: true
                },
                '-',
                {
                    xtype: 'combobox',
                    fieldLabel: 'Filtrar',
                    id: 'btnComboFiltroNota',
                    flex: 0.5,
                    labelWidth: 35,
                    store: storefiltros,
                    valueField: 'id',
                    displayField: 'descripcion',
                    emptyText: '----- Seleccionar ----',
                    query: 'local',
                    editable: false,
                    listeners: {
                        select: function (combo, record, index) {
                            if (combo.getValue() == 0 || combo.getValue() == 1) {
                                Ext.getCmp('txtBuscadorNota').focus(true, 200);
                                Ext.getCmp('txtBuscadorNota').setDisabled(false);
                                Ext.getCmp('txtBuscadorNota').setValue('');
                            } else {
                                Ext.getCmp('txtBuscadorNota').focus(false, 200);
                                Ext.getCmp('txtBuscadorNota').setDisabled(true);
                                Ext.getCmp('txtBuscadorNota').setValue('');
                                var t = combo.getValue();
                                var v = Ext.getCmp('txtBuscadorNota').getValue();
                                filtrarGrillaContratoNota(t, v);
                            }
                        }
                    }

                },
                {
                    xtype: 'textfield',
                    id: 'txtBuscadorNota',
                    hasfocus: true,
                    disabled: true,
                    flex: 0.7,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function (f, e) {
                            if (e.keyCode == 13) {
                                var t = Ext.getCmp('btnComboFiltroNota').getValue();
                                var v = f.getValue();
                                filtrarGrillaContratoNota(t, v);
                            }
                        }
                    }
                },
                '-',
                {
                    xtype: 'textfield',
                    fieldLabel: 'Desde',
                    allowBlank: true,
                    id: 'dpFechaContratoDesdeNota',
                    flex: 0.5,
                    labelWidth: 90,
                    plugins: [new Ext.ux.desktop.InputTextMask('99/99/9999')],
                    enableKeyEvents: true,
                    labelAlign: 'right',
                    /*listeners : {
                     keyup : function(f, e) {
                     if (e.keyCode == 13) {
                     filtrarGrillaContrato(-2, f.getValue());
                     }
                     }
                     }*/
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Hasta',
                    allowBlank: true,
                    id: 'dpFechaContratoHastaNota',
                    flex: 0.5,
                    labelWidth: 90,
                    labelAlign: 'right',
                    plugins: [new Ext.ux.desktop.InputTextMask('99/99/9999')],
                    enableKeyEvents: true,
                    /*listeners : {
                     keyup : function(f, e) {
                     if (e.keyCode == 13) {
                     filtrarGrillaContrato(-2, f.getValue());
                     }
                     }
                     }*/
                },
                {
                    xtype: 'button',
                    iconCls: 'x-ico-lupa',
                    id: 'btnBuscarRangoFechasNota',
                    handler: function () {
                        filtrarGrillaContratoNota(-3, null);
                    }
                }
            ]
        });
        this.callParent(arguments);

    },
//    imprimirDocumentoVenta: function () {
//        try {
//            var grid = Ext.getCmp('dgvContratos');
//            var idcontrato = grid.getSelectionModel().getSelection()[0].get('idcontrato');
//            var tipodoc = grid.getSelectionModel().getSelection()[0].get("tipodoc");
//
//        } catch (e) {
//            MyDesktop.app.util.Util.showErrorMsg(
//                    "No ha selecionado un contrato registrado!");
//            return false;
//        }
//        var _url = 'reportes/imprimirdocumentoventa/' + parseInt(idcontrato).toString();
//        xpos = (screen.width / 2) - (1000 / 2);
//        ypos = (screen.height / 2) - (600 / 2);
//        my =
//                window.open(_url, "mywindow",
//                        "location=1,status=1,scrollbars=1,  width=1000,height=600");
//        my.moveTo(xpos, ypos);
//        setTimeout(function () {
//            my.close();
//        }, 1000);
//
//    },


    grillaBotonesEstado: function (_estado, _pagado,_tipodoc) {
        /*
         * 1;"REGISTRADO"
         2;"CANCELADO"
         3;"ENTREGADO"
         4;"ELIMINADO"
         5;"PROCESANDO"
         6;"TERMINADO"

         * */
        switch (parseInt(_estado)) {

            case 1: // Registrado
                Ext.getCmp('btnEliminarContratoNota').setDisabled(false);
                Ext.getCmp('btnNuevoContratoNota').setDisabled(false);
                Ext.getCmp('btnEditarContratoNota').setDisabled(false);
                Ext.getCmp('btnImprimirContratoNota').setDisabled(true);
                Ext.getCmp('btnContratoAsignarBobinaNota').setDisabled(false);
                if (_pagado != '') {
                    Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(false);
                } else {
                    Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(false);
                }
                ;
                break;
            case 2: // Cancelado => estado cuando se cobro el trabajo
                Ext.getCmp('btnEliminarContratoNota').setDisabled(false);
                Ext.getCmp('btnNuevoContratoNota').setDisabled(false);
                Ext.getCmp('btnEditarContratoNota').setDisabled(false);
                Ext.getCmp('btnImprimirContratoNota').setDisabled(false);
                Ext.getCmp('btnContratoAsignarBobinaNota').setDisabled(false);
                Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(true);


                break;
            case 4: // Eliminado
                Ext.getCmp('btnEliminarContratoNota').setDisabled(true);
                Ext.getCmp('btnNuevoContratoNota').setDisabled(false);
                Ext.getCmp('btnEditarContratoNota').setDisabled(true);
                Ext.getCmp('btnImprimirContratoNota').setDisabled(true);
                Ext.getCmp('btnContratoAsignarBobinaNota').setDisabled(false);
                Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(true);
                ;
                break;
            case 3: // Eliminado
                Ext.getCmp('btnEliminarContratoNota').setDisabled(true);
                Ext.getCmp('btnNuevoContratoNota').setDisabled(false);
                Ext.getCmp('btnEditarContratoNota').setDisabled(true);
                Ext.getCmp('btnImprimirContratoNota').setDisabled(true);
                Ext.getCmp('btnContratoAsignarBobinaNota').setDisabled(false);
                Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(true);
                ;
                break;
            case 5: // Procesando
                Ext.getCmp('btnEliminarContratoNota').setDisabled(false);
                Ext.getCmp('btnNuevoContratoNota').setDisabled(false);
                Ext.getCmp('btnEditarContratoNota').setDisabled(false);
                Ext.getCmp('btnImprimirContratoNota').setDisabled(true);
                Ext.getCmp('btnContratoAsignarBobinaNota').setDisabled(false);
                if (_pagado != '') {
                    Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(false);
                } else {
                    Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(false);
                }
                ;
                break;
            case 6: // Terminado
                Ext.getCmp('btnEliminarContratoNota').setDisabled(false);
                Ext.getCmp('btnNuevoContratoNota').setDisabled(false);
                Ext.getCmp('btnEditarContratoNota').setDisabled(false);
                Ext.getCmp('btnImprimirContratoNota').setDisabled(false);
                Ext.getCmp('btnContratoAsignarBobinaNota').setDisabled(false);
                Ext.getCmp('btnContratoRegistroSalidaNota').setDisabled(false);
                ;
                break;
        }
    }
});
function filtrarGrillaContratoNota(_tipo, _valor) {
    if (_tipo == -2) {
        sw = MyDesktop.app.util.Util.isValidateDate(_valor);
        storecontratos.getProxy().extraParams = {
            pidcontrato: 0,
            pcliente: null,
            pestado: 0,
            pfecha: (sw == true ? _valor : ''),
            psede : Ext.util.Cookies.get('sede')
        };
        storecontratos.loadPage(1);
        return false;
    }

    if (_tipo == -3) { /*Rango por fechas*/
        // sw = MyDesktop.app.util.Util.isValidateDate(_valor);
        storecontratos.getProxy().extraParams = {
            pidcontrato: 0,
            pcliente: null,
            pestado: 0,
            pdesde: Ext.getCmp('dpFechaContratoDesdeNota').getValue(),
            phasta: Ext.getCmp('dpFechaContratoHastaNota').getValue(),
            psede : Ext.util.Cookies.get('sede')
        };
        storecontratos.loadPage(1);
        return false;
    }
    if (_tipo == -1) {
        storecontratos.getProxy().extraParams =
                {pidcontrato: 0, pcliente: null, pestado: 0, pfecha: null};
    } else {
        storecontratos.getProxy().extraParams = {
            pidcontrato: (_tipo == 0 ? _valor : 0),
            pcliente: (_tipo == 1 ? _valor : null),
            pestado: (_tipo > 1 ? _tipo : 0),
            pfecha: null,
            psede : Ext.util.Cookies.get('sede')
        };
    }
    storecontratos.loadPage(1);
}
