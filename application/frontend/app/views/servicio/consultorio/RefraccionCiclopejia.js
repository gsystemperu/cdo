Ext.define("MyDesktop.app.views.servicio.consultorio.RefraccionCiclopejia", {
    extend: "Ext.form.Panel",
    config: {
        id: 0
    },
    id: "refraccionciclopejia",
    alias: "widget.refraccionciclopejia",
    border: true,
    bodyStyle: "padding:5px 5px 0",
    frame: true,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: "fieldset",
                    columnWidth: 0.5,
                    margin: "0 10 20 0",
                    default: {
                        anchor: "100%"
                    },
                    layout: {
                        type: "vbox"
                    },
                    items: [
                        {
                            xtype: "textfield",
                            fieldLabel: "<b>OD</b>",
                            name: "refracicloOD",
                            itemId: "refracicloOD",
                            id: "refracicloOD",
                            margin: "10 0 0 0",
                             
                            width: "100%"

                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "<b>OI</b>",
                            name: "refracicloOI",
                            itemId: "refracicloOI",
                            id: "refracicloOI",
                            margin: "5 0 10 0",
                           
                            width:"100%"
                        }

                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});