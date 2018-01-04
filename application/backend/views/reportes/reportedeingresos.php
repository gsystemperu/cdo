<?php 
     ini_set("memory_limit","120M"); 
?>
<style>
    .Tabla{
     font-size: 8px;
     padding-left: 40px;

    }
    .Tabla th {
        font-weight: bold;
        background-color: #7d7a7a;
        color: #dddddd;
        text-align: center;
        font-family: monospace;
    }
    .Tabla td {
        font-family: monospace;
    }
   

    .Titulo {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        font-family: monospace;
        text-decoration: underline;
    }
    .Tipo {
        font-family: underline;
        font-size: 10px;
        padding-left: 40px;
         font-family: monospace;
        /*font-weight: bold;*/
    }

</style>
<html lang="en">
<body>
<div class="Titulo">
    Listado de Compras
</div>
<br>

<div class="Tipo">
Tipo :  <?php echo  $tipo; ?>
</div>
<br>
<table class="Tabla" cellpadding="2" cellspacing="1">
    <tr>
        <th></th>
        <th width="35">Fecha <BR> Compra</th>
        <th width="50">Tipo <br> Documento</th>
        <th width="30">N&uacute;mero</th>
        <th width="130">Proveedor </th>
        <th width="50">Sub Total</th>
        <th width="50">Igv</th>
        <th width="50">Total</th>
        <th width="80">Estado Documento</th>
    </tr>
<?php
    $i = 1;
    $total = 0;
   foreach($reporte as $item)
    {
?>
        <tr>
            <td style="text-align: center" height="5"><?php echo $i;  ?></td>
            <td style="text-align: center" height="5"><?php echo $item['fecha'];  ?></td>
            <td style="text-align: left" height="5"><?php echo $item['tipo'];  ?></td>
            <td style="text-align: left" height="5"><?php echo $item['numerodocumento'];  ?></td>
            <td style="text-align: left" height="5"><?php echo $item['proveedor'];  ?></td>
            <td style="text-align: right" height="5"><?php echo $item['subtotal'];  ?></td>
            <td style="text-align: right" height="5"><?php echo $item['igv'];  ?></td>
            <td style="text-align: right" height="5"><?php echo $item['total'];  ?></td>
            <td style="text-align: center" height="5"><?php 
            
            switch ( $item['est'])
            {
                            case 4 :  echo '<b style="color: #CC0000">ELIMINADO</b>';
                            case 5 :  echo '<b style="color: #FCC612">PROCESANDO</b>';
                            case 6 :  echo '<b style="color: #006400">TERMINADO</b>';
                            case 1 :  echo '<b>REGISTRADO</b>';
            }

            ?></td>
        </tr>

<?php
        $total = $total + $item['total'];
        $i++;
    }
?>
    <tr>
        <td colspan="7" style="text-align: right"> <b>TOTAL</b>  </td>
        <td style="text-align: right"><?php echo $total;  ?></td>
    </tr>
</table>
</body>
</html>
