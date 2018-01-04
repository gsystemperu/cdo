
Ext.define('MyDesktop.app.views.inventario.Inventario', {
    extend: 'Ext.panel.Panel',
    config: {
        configName: null
    },
    layout : {
        type : 'hbox',
        anchor : '100%'
    },
    alias : 'widget.winventario',
    id    : 'winventario',
    border :false,
    initComponent: function() {
        
        me = this;
        Ext.apply(me,
        {
            items :[
                {
                    xtype : 'panel',
                    border : false,
                    flex : 3,
                    bodyPadding : 5,
                    style : 'background-color: #00ff00;',
                    items :[
                        {
                            xtype : 'gridpanel',
                            id   : 'dgvIventario',
                            sortableColumns :false,
                            columns : [
                                {text : 'Producto',dataIndex : 'prod',flex: 1},
                                {text : 'Producto',dataIndex : 'prod',flex: 1},
                                {text : 'Producto',dataIndex : 'prod',flex: 1},
                                {text : 'Producto',dataIndex : 'prod',flex: 1},
                            ]
                        }
                    ]
                },
                {
                    xtype : 'panel',
                    flex  : 1
                }
               
            ]     
        });

        this.callParent(arguments);
    }
});