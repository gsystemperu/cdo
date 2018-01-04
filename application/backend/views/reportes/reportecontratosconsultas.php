<?php 
     ini_set("memory_limit","120M"); 
?>
<style>
    .Tabla{
     font-size: 8px;
     font-family: monospace;

    }
    .Tabla th {
        font-weight: bold;
        background-color: #7d7a7a;
        color: #dddddd;
        text-align: center;
    }
    .Titulo {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        text-decoration: underline;
        font-family: monospace;
    }

</style>
<html lang="en">
<body style="padding:10px;">
<div class="Titulo">
    Reporte de Ventas
</div>
<br>
<br>
<table class="Tabla" cellpadding="2" cellspacing="1" border="0">
    <tr>
        <th></th>
        <th width="50">Fecha<br>Venta</th>
        <th width="100">Tienda <br>de Origen</th>
        <th width="100">Medico</th>
        <th width="120">Cliente</th>
        <th>Total Contrato</th>
        <th>Estado</th>
        <th>Tipo Documento</th>
        <th>Estado Documento</th>
    </tr>
<?php
    $i = 1;
    $total = 0;
    $totalcancelado=0;
   foreach($reporte as $item)
    {
?>
        <tr>
            <td style="text-align: center"><?php echo $i;  ?></td>
            <td style="text-align: center"><?php echo $item['fecontrato'];  ?></td>
            <td style="text-align: left"><?php echo $item['tienda'];  ?></td>
            <td style="text-align: left"><?php echo $item['trabajador'];  ?></td>
            <td style="text-align: left"><?php echo $item['cliente'];  ?></td>
            <td style="text-align: right"><?php echo $item['totalcontrato'];  ?></td>
            <td style="text-align: center"><?php echo $item['estado'];  ?></td>
            <td style="text-align: center"><?php echo $item['tipodoc'];  ?></td>
            <td style="text-align: center"><?php echo $item['tdocestado'];  ?></td>
        </tr>

<?php
        $total = $total + $item['totalcontrato'];
        if($item['tipodoc']!=''){
            $totalcancelado=$totalcancelado+$item['totalcontrato'];
        }
        $i++;
    }
?>
    <tr>
        <td colspan="6">&nbsp;&nbsp;</td>
    </tr>
    <tr>
        <td colspan="5" style="text-align: right"> Total  </td>
        <td style="text-align: right"><?php echo $total;  ?></td>
    </tr>
        <tr>
        <td colspan="5" style="text-align: right"> Total Cancelado </td>
        <td style="text-align: right"><?php echo $totalcancelado;  ?></td>
    </tr>
    <tr>
        <td colspan="5" style="text-align: right"> Saldo </td>
        <td style="text-align: right"><?php echo ($total - $totalcancelado);  ?></td>
    </tr>
</table>
</body>
</html>
