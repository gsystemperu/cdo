Ext.define('MyDesktop.app.util.Util', {

    statics: {

        required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',

        decodeJSON: function(text) {

            var result = Ext.JSON.decode(text, true);

            if (!result) {
                result = {};
                result.success = false;
                result.msg = text;
            }

            return result;
        },

        showErrorMsg: function(text) {

            Ext.Msg.show({
                title: 'Error!',
                msg: text,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },
        showOkMsg: function(text) {

            Ext.Msg.show({
                title: 'Aviso!',
                msg: text,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
        },
        getFechaActual: function() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {dd = '0' + dd}
            if (mm < 10) {mm = '0' + mm}
            today = dd + '/' + mm + '/' + yyyy;
            return today;
        },
	getFechaActualf2:function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if(dd<10){dd = '0'+dd}
	if(mm<10){ mm='0'+ mm}
	today = dd + '-'+mm+'-'+ yyyy;
	return today; 
	},
        getDiaSemana:function(fecha){
            fecha=fecha.split('/');  
            if(fecha.length!=3){  return null; }  
            var regular =[0,3,3,6,1,4,6,2,5,0,3,5];   
            var bisiesto=[0,3,4,0,2,5,0,3,6,1,4,6];   
            var semana=['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];  
            var dia=fecha[0];  
            var mes=fecha[1]-1;  
            var anno=fecha[2];  
            if((anno % 4 == 0) && !(anno % 100 == 0 && anno % 400 != 0))  
                mes=bisiesto[mes];  
            else  
                mes=regular[mes];  
            return semana[Math.ceil(Math.ceil(Math.ceil((anno-1)%7)+Math.ceil((Math.floor((anno-1)/4)-Math.floor((3*(Math.floor((anno-1)/100)+1))/4))%7)+mes+dia%7)%7)];  
        },
        getMes:function(fecha){
            fecha = fecha.split('/');
            if(fecha.length!=3){return null;}
            var mes= fecha[1];
            switch (parseInt(mes))
            {
                case 1 : return 'ENERO'; break;
                case 2 : return 'FEBRERO'; break;
                case 3 : return 'MARZO'; break;
                case 4 : return 'ABRIL'; break;
                case 5 : return 'MAYO'; break;
                case 6 : return 'JUNIO'; break;
                case 7 : return 'JULIO'; break;
                case 8 : return 'AGOSTO'; break;
                case 9 : return 'SEPTIEMBRE'; break;
                case 10 : return 'OCTUBRE'; break;
                case 11 : return 'NOVIEMBRE'; break;
                case 12 : return 'DICIEMBRE'; break;
            }
        },
        getEsElMesActual:function(fecha){
            var fecha   = fecha.split('/');
            var x = new Date().getMonth()+1;
                if(x == parseInt(fecha[1]))
                {
                    return 1;
                }else{
                    return 0; 
                }
        },
        isValidateDate:function(value){
             f = value.split('/');
             value = f[1] +'/'+f[0]+'/'+f[2];
             return!!(function(d){return(d!=='Invalid Date'&&!isNaN(d))})(new Date(value));
        }

    }
});
