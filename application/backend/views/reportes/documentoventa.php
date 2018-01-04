
<?php $Cliente   = '';$Direccion = '';$Dni       = '';$SubTotal  =0;$Igv       =0;$Total     =0;
foreach($rsCab as $data){$Cliente    =  $data->cliente; /*$Direccion  = $data->_direccion;$Dni        = $data->_numero;*/}?>

<html>
<style>
    body{ font-family:sans-serif; font-size: 8px; letter-spacing: 3px }
    .textDerecha   {text-align: right;}
    .textIzquierda {text-align: left;}
    .textCentro    {text-align: center;}
    .detalle{ font-family:sans-serif; font-size: 9px; width: 100%; }
    .cliente{ font-family:sans-serif; font-size: 9px; width: 100%; }
    .separador{height: 30px;}
    .divdetalle{height: 130px;border: 0px solid}
</style>
<body>

<table border="0" class="cliente" >
    <tr>
        <td width="100"></td>
        <td class="textIzquierda" colspan="2"><?php
            $dias = array("DOMINGO","LUNES","MARTES","MIERCOLES","JUEVES","VIENES","SABADO");
            $meses = array("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AAGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
            echo $dias[date('w')]." ".date('d')." DE ".$meses[date('n')-1]. " DEL ".date('Y') ;
            ?></td>
    </tr>
    <tr>
        <td width="50"></td>
        <td class="textIzquierda" colspan="2"><?php echo $Cliente; ?> </td>
    </tr>
   <!-- <tr>
        <td width="50"></td>
        <td class="textIzquierda"><?php echo $Direccion;  ?> </td>
        <td class="textDerecha"><?php echo $Dni; ?></td>
    </tr>-->
</table>
<div class="separador"></div>
<div class="divdetalle">
    <table border="0" class="detalle" cellpadding="0" cellspacing="2">

        <?php
        $i = 1;
        $txtstotal = 0;
        $txtigv    = 0;
        $txttotal  = 0;

        foreach($rsDet as $row){?>
        <tr>
            <td class="textCentro" width="100"><?php echo $i; ?></td>
            <td class="textIzquierda" width="1000"><?php echo $row->descripcion ."   ". $row->medidas;  ?> </td>
            <td class="textCentro" width="100"><?php echo $row->cantidades;  ?></td>
            <td class="textDerecha" width="100"><?php echo  number_format($row->preciounitario,2,'.',''); ?></td>
        <tr>

            <?php
            $txtstotal = $txtstotal + $row->preciounitario;
            //$txtigv = $txtigv + $row->_igv;
           // $txttotal = $txttotal + $row->_total;

            }


            $SubTotal = number_format($txtstotal,2,'.','');
            //$Igv      = number_format($txtigv,2,'.','');
            //$Total    = number_format($txttotal,2,'.','');

            ?>


    </table>

</div>
<table class="detalle">
    <tr>
        <td colspan="3"></td>
        <td class="textDerecha"><?php echo $SubTotal; ?></td>
    </tr>
    <!--<tr>
        <td colspan="3"></td>
        <td class="textDerecha"><?php echo $Igv; ?></td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td class="textDerecha"><?php echo $Total; ?></td>
    </tr>-->
</table>


</body>
</html>

<script>
    window.print();
</script>
