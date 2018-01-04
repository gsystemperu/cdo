Ext.define('MyDesktop.app.views.ContratoDetalle', {
    extend: 'Ext.window.Window',
    alias : 'widget.contratodet',
    requires   : [
        'MyDesktop.app.stores.Contratos',
        'MyDesktop.app.stores.Trabajadores',

    ],
    id    : 'wcontratodet',
    width : 1500,
    height: 330,
    modal : true,
    autoShow : true,
    title : ':: . Detalle del Contrato . ::',
    config : {
        num : 0
    },
    
    initComponent: function () {
    me = this;

    var storeDetalle = Ext.create('MyDesktop.app.stores.ContratosDetRegBobinas');
    var storeOperario= Ext.create('MyDesktop.app.stores.Operarios');

    storeDetalle.getProxy().extraParams  = {idcontra : parseInt(me.getNum())};
    storeDetalle.load();
    Ext.apply(this,{
        items: [
            {
                xtype  : 'panel',
                flex   : 2 ,
                width : 1500,
                height :230,
                autoScroll:true,
                items : me.getGrillaDetalle(storeDetalle)
            },
            {
                xtype : 'panel',
                title : '<b>Ingrese el codigo del material a usar</b>',
                border : true,
                frame : true,
                layout : 'hbox',
                style  : 'padding:10px' ,
                items:[
                    {
                        xtype : 'textfield',
                        id    : 'txtIdContrato',
                        width :300,
                        readOnly:true,
                        hidden : true
                        
                    },
                    {
                        xtype : 'textfield',
                        id    : 'txtOrden',
                        width :300,
                        readOnly:true,
                        hidden : true

                    },
                    {
                        xtype : 'textfield',
                        width : 250,
                        id   : 'txtCodigoBobina',
                        fieldLabel : '<b>Codigo</b>',
                        fieldStyle:'text-transform:uppercase;text-size:16px;text-align: center; ',
                        allowBlank: false

                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: '<b>Operario</b>',
                        width :400,
                        store :storeOperario,
                        labelWidth : 100,
                        displayField : 'ncompleto',
                        valueField : 'id',
                        editable : false,
                        emptyText : '--- Seleccionar un Operario ---',
                        query : 'remote',
                        id  : 'cboOperarioBobina'

                    },
                    {
                        xtype : 'button',
                        text  : '<b>Actualizar</b>',
                        iconCls :'boton-save',
                        id  : 'btnActualizarBobina',
                        handler: me.setAsignarBobinaDb
                    },
                    {
                        xtype : 'button',
                        text  : '<b>Salir</b>',
                        width : 100,
                        iconCls :'x-ico-salir',
                        //padding : '10 0 0 0',
                        handler: function(e){
                            Ext.getCmp('wcontratodet').close();
                        }
                    }
                ]
                

            }

        ]
            
        
    });

    this.callParent();
    },
    setAsignarBobinaDb:function(){
    try{
        Ext.Ajax.request({
            url: 'index.php/contratos/existebobina',
            params: {pbobina     : Ext.getCmp('txtCodigoBobina').getValue() },
            success: function(conn, response, options, eOpts) {
                var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                if (result.existe == 'f'){
                    Ext.Msg.alert("Error","El codigo de bobina no existe en la base de datos!");
                    return false;
                }else{
                    if(Ext.getCmp('txtCodigoBobina').getValue() == null)
                    {Ext.Msg.alert("Error","Ingrese el codigo de la bobina!"); Ext.getCmp('txtCodigoBobina').focus(); return false;}
                    if(Ext.getCmp('txtCodigoBobina').isValid()==false)
                    {
                        Ext.Msg.alert("Error","El largo del codigo no debe de ser mayor a 10 digitos!");
                        Ext.getCmp('txtCodigoBobina').focus()
                        return false;
                    }

                    if(Ext.getCmp('cboOperarioBobina').getValue() == 0){
                        Ext.Msg.alert("Error","Tiene que seleccionar un operario !!!");
                        return false;
                    }

                   /* if( Ext.getCmp('txtIdContrato').getValue() == '')
                    {
                        Ext.Msg.alert("Aviso","Seleccione el registro para asignar la bobina");
                        return false;
                    }*/

                    Ext.Ajax.request({
                        url: 'index.php/contratos/actualizardetallebobina',
                        params: {
                            piddet     : Ext.getCmp('txtIdContrato').getValue(),
                            pbobina    : Ext.getCmp('txtCodigoBobina').getValue(),
                            porden     : Ext.getCmp('txtOrden').getValue(),
                            poperario  : Ext.getCmp('cboOperarioBobina').getValue()
                        },
                        success: function(conn, response, options, eOpts) {
                            var result = MyDesktop.app.util.Util.decodeJSON(conn.responseText);
                            if (result.success) {
                                Ext.each(result.items, function(item) {
                                    if (item.ERROR<0){
                                        Ext.Msg.alert('Error',"Error en Sistema ! Comunicarse con Sistemas");
                                        return false;
                                    }
                                    Ext.getCmp('dgvDetalleContrato').getStore().reload();
                                    Ext.getCmp('dgvContratos').getStore().reload();

                                    //Ext.getCmp('wcontratodet').close();


                                });
                            } else {MyDesktop.app.util.Util.showErrorMsg(conn.responseText);return false;}

                        },
                        failure: function(conn, response, options, eOpts) {}
                    });
                }
            },
            failure: function(conn, response, options, eOpts) {return false;}
        });
    }catch(ex){
        Ext.Msg.alert("Aviso","Seleccione el registro para asignar la bobina");
        return false;
    }


    },
    getGrillaDetalle : function(_store){
        return {
            xtype :'grid',
            store : _store,
            id    : 'dgvDetalleContrato',
            width:1800,
            border:false,
            autoScroll : true,
            columns:[
                {
                    text : 'id',
                    dataIndex: 'iddet',
                    hidden : true,
                    flex : 0.5
                },
                /*{
                    text : 'Producto',
                    dataIndex: 'idproducto',
                    flex :2,
                    hidden: true
                },
                {
                    text : 'Largo',
                    dataIndex: 'medida1',
                    flex :0.5,
                    align : 'center',
                    hidden: true
                },
                {
                    text : 'Ancho',
                    dataIndex: 'medida2',
                    flex :0.5,
                    align : 'center',
                    hidden: true
                },*/
                {
                    text : 'Observaci\xF3n',
                    dataIndex: 'observacion',
                    flex :4,
                    align : 'left'

                },
                {
                    text : 'Dise\xF1ador',
                    dataIndex: 'diseniador',
                    flex :2,
                    align : 'left'

                },
                {
                    text : 'Vendedor',
                    dataIndex: 'vendedor',
                    flex :2,
                    align : 'left'

                },
                {
                    text : 'Material',
                    dataIndex: 'idmaterial',
                    flex :1,
                    align : 'left'
                },
                {
                    text     : 'Bobina',
                    dataIndex: 'bobina',
                    flex     : 1,
                    align    : 'center',
                },
                {
                    text : 'Operario',
                    dataIndex : 'operario',
                    flex: 2,
                    align: 'center'
                }
            ],
            listeners: {
                itemclick: function(dv, record, item, index, e) {
                        Ext.getCmp('txtCodigoBobina').focus();
                        Ext.getCmp('txtCodigoBobina').setValue(record.get('bobina'));
                        Ext.getCmp('txtIdContrato').setValue(record.get('idcontrato'));
                        Ext.getCmp('txtOrden').setValue(record.get('orden'));
                        
                        
                                                             
                }
            }
                    
        };
    },
    /*getIdContrato:function(){
        var grid = Ext.getCmp('dgvContratos');
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        return selectedRecord.get('idcontrato');
    }*/
});