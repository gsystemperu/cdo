/**
 * Created by Eddy on 28/07/15.
 */

Ext.define('MyDesktop.app.views.servicio.refraccion.Ingreso',{
    extend : 'Ext.panel.Panel',
    config:{
        id:0
    },
    alias : 'widget.refraccioningreso',
    id : 'refraccionIngreso',
    initComponent:function(){
        me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype : 'panel',
                    title : 'Ojo Derecho',
                    flex : 1,
                    height : 190,
                    items : [
                        {
                            border: false,
                            xtype: 'gridpanel',
                           // store: storeproveedores,
                            id   : 'dgvRefraccinOjoDerecho',
                            sortableColumns : false,
                            columns: [
                                {
                                    text: "Id",
                                    flex: 0.3,
                                    sortable: true,
                                    dataIndex: '_idprov',
                                },
                                {
                                    text: "Apellido Paterno",
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: '_paterno'
                                },
                                {
                                    text: "Apellido Materno",
                                    flex : 1,
                                    sortable: true,
                                    dataIndex: '_materno'
                                },
                                {
                                    text: "Nombres",
                                    sortable: true,
                                    flex : 1,
                                    dataIndex: '_nombre'
                                },
                                {
                                    text: "Doc.Identidad",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_numerodoc',
                                    align: 'right',

                                },
                                {
                                    text: "R.U.C",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_numeroruc',
                                    align: 'right',
                                },
                                {
                                    text: "Telefono",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_telefono',
                                    align: 'right',

                                },
                                {
                                    text: "Celular",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_celular',
                                    align: 'right',
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype : 'panel',
                    title : 'Ojo Izquierdo',
                    flex : 1,
                    height : 190,
                    items : [
                        {
                            border: false,
                            xtype: 'gridpanel',
                            //store: storeproveedores,
                            id   : 'dgvRefraccionOjoIzquierdo',
                            sortableColumns : false,
                            columns: [
                                {
                                    text: "Id",
                                    flex: 0.3,
                                    sortable: true,
                                    dataIndex: '_idprov',
                                },
                                {
                                    text: "Apellido Paterno",
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: '_paterno'
                                },
                                {
                                    text: "Apellido Materno",
                                    flex : 1,
                                    sortable: true,
                                    dataIndex: '_materno'
                                },
                                {
                                    text: "Nombres",
                                    sortable: true,
                                    flex : 1,
                                    dataIndex: '_nombre'
                                },
                                {
                                    text: "Doc.Identidad",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_numerodoc',
                                    align: 'right',

                                },
                                {
                                    text: "R.U.C",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_numeroruc',
                                    align: 'right',
                                },
                                {
                                    text: "Telefono",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_telefono',
                                    align: 'right',

                                },
                                {
                                    text: "Celular",
                                    style:'text-aling:center',
                                    flex : 0.8,
                                    sortable: true,
                                    dataIndex: '_celular',
                                    align: 'right',
                                }
                            ]
                        }
                    ]
                },

            ]
        });
        me.callParent(arguments);
    }

});
