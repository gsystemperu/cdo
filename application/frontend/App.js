Ext.define('MyDesktop.App', {
  extend : 'Ext.ux.desktop.App',

  requires : [
    'Ext.window.MessageBox',
    'Ext.ux.desktop.ShortcutModel',
    'Ext.ux.desktop.Wallpaper',

    //***************** Vistar del Sistema  *******************************/
    'MyDesktop.RegistroProcesos',
    //'MyDesktop.RegistroContabilidad',
    'MyDesktop.RegistroUsuario'
  ],

  stores :
      [ 'MyDesktop.app.stores.Clientes', 'MyDesktop.app.stores.Busquedas' ],

  init : function() {
    // custom logic before getXYZ methods get called...
    this.callParent();

    // now ready...
  },

  getModules : function() { /*Menu de Inicio del Sistema*/
                            return [
                              new MyDesktop.RegistroProcesos(),
                              //  new MyDesktop.RegistroContabilidad(),
                              new MyDesktop.RegistroUsuario()

                            ];
  },

  getDesktopConfig : function() {
    var me = this, ret = me.callParent();

    return Ext.apply(ret, {
      contextMenuItems : [
        {text : 'Personalizar Pantalla', handler : me.onSettings, scope : me}
      ],

      /*Iconos de Escritorio*/
      // shortcuts:  me.getStoreModulosDeUsuario() ,
      shortcuts : Ext.create(
          'Ext.data.Store',
          {
            model : 'Ext.ux.desktop.ShortcutModel',
            data : [
              {name : 'SPCO', iconCls : 'iconSVenta', module : 'w-procesos'}

            ]
          }),
      wallpaper : 'application/frontend/wallpapers/Dark-Sencha.jpg',
      wallpaperStretch : false
    });
  },
  getStoreModulosDeUsuario : function() {
    return Ext.create('Ext.data.Store', {
      model : 'Ext.ux.desktop.ShortcutModel',
      autoLoad : true,
      remoteSort : true,
      autoSync : true,
      proxy : {
        type : 'ajax',
        api : {read : 'index.php/usuarios/accesos'},
        extraParams : {idusuario : Ext.util.Cookies.get('idusuario')},
        reader : {type : 'json', root : 'items'}

      }
    });
  },
  // config for the start menu
  getStartConfig : function() {
    var me = this, ret = me.callParent();

    return Ext.apply(ret, {
      title : '<b> .::. Modulos .::. </b>',
      iconCls : 'user',
      height : 300,
      toolConfig : {
        width : 100,
        items : [
          {
            text : 'Pantalla',
            iconCls : 'settings',
            handler : me.onSettings,
            scope : me,
            height : 30
          },
          '-',
          {
            text : 'Salir',
            iconCls : 'logout',
            handler : me.onLogout,
            scope : me,
            height : 30
          }
        ]
      }
    });
  },

  getTaskbarConfig : function() {
    var ret = this.callParent();

    return Ext.apply(ret, {
      quickStart : [
        // { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win'
        // },
        // { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
      ],
      trayItems : [
        //{ xtype: 'label', text : Ext.util.Cookies.get('nombusuario') ,flex: 1
        //}, // Poner Aqui al Nombre de Usuario
        {xtype : 'trayclock', flex : 1}
      ]
    });
  },

  onLogout : function() {
    Ext.Msg.confirm('Salir del Sistema', 'Esta seguro de cerrar la seccion?',
                    function(e) {
                      if (e == 'yes') {
                        Ext.Ajax.request({
                          url : 'index.php/usuarios/logout',
                          success : function() {
                            Ext.util.Cookies.clear();
                            window.location = '/cdo';
                          }
                        });
                      }
                    });

  },

  onSettings : function() {
    var dlg = new MyDesktop.Settings({desktop : this.desktop});
    dlg.show();
  }
});
