<?php
        $lang = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
        $lang = substr($lang,0,2);

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>::-. Clinica de los Ojos .-::</title>

    <link rel="stylesheet" type="text/css" href="application/frontend/css/desktop.css" />
    <script type="text/javascript" src="../extjs/shared/include-ext.js"></script>
    <script type="text/javascript" src="../extjs/locale/ext-lang-es.js"></script>

    <script type="text/javascript">
        var idusuario  ='';
        var nombusuario='';

        Ext.Loader.setPath({
            'Ext.ux.desktop': 'application/frontend/js',
             MyDesktop      : 'application/frontend',
            //'Ext.plugin'    : 'application/frontend/ux'

        });

        Ext.define('GlobalVars', {
            singleton: true,
            userdata: Ext.decode(Ext.util.Cookies.get('aplicacionbase_access'))
        });


        Ext.require('MyDesktop.App');
        Ext.require('MyDesktop.app.views.Login');
        var myDesktopApp;
        Ext.onReady(function () {
            var me = this;
                me.splashscreen = Ext.getBody().mask(' GlobalSoft S.A.  ','splashscreen');
                me.splashscreen.addCls('splashscreen');
                Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {cls: 'x-splash-icon'});
                var task = new Ext.util.DelayedTask(function() {
                    me.splashscreen.fadeOut({
                        duration: 1000,
                        remove:true
                    });
                    me.splashscreen.next().fadeOut({
                        duration: 1000,
                        remove:true,
                        listeners: {
                            afteranimate: function(el, startTime, eOpts ){
                              // myDesktopApp = new MyDesktop.App();
                               var login = Ext.create('MyDesktop.app.views.Login');

                            }
                        }
                    });
                });
                task.delay(2000);

        });

    </script>
    <!-- </x-compile> -->
</head>

<body>
<!--
    <a href="http://www.delaweb.pe" target="_blank" alt="www.deLaWEb.pe"
       id="poweredby"><div></div></a>-->


</body>
</html>
