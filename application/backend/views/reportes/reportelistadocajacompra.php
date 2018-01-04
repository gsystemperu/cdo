<?php
     ini_set("memory_limit","512M");
?>
<style>
    .Tabla{
     font-size: 10px;
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
   Listado de Ingresos al : <?php echo $fecha; ?>
   <br>
   <?php echo $tienda; ?>
</div>
<br>
<br>
<table style="width:100%;" class="Tabla" cellpadding="2" cellspacing="1.5" border="0">
    <tr>
        <th width="50" rowspan="2">Tipo</th>
        <th width="50"  rowspan="2">N&uacute;mero Documento</th>
        <th width="150"  rowspan="2">Proveedor</th>
        <th width="50" colspan="2">Total <br>Cancelado</th>
     </tr>
    <tr>
	<th width="50">Soles</th>
	<th width="50">Dolares</th>
    </tr>

   <?php
       $i = 1;
       $total1 = 0;
       $total2 = 0;
       $total3 = 0;
       $total4 = 0;
       $totalcancelado=0;
      foreach($reporte as $item)
       {
   ?>
          <tr>
               <td style="text-align: left"><?php echo $item['_tipodocumento'];  ?></td>
               <td style="text-align: left"><?php echo $item['_numerodoc'];  ?></td>
               <td style="text-align: left"><?php echo $item['_proveedor'];  ?></td>
               <td style="text-align: right"><?php
   			if ($item['_tipocambio'] == ''){
   				echo $item['_total'];
   				  $total1 = $total1 + $item['_total'];
   			}
   			else {
   				echo "0.000";
   			}
   		?></td>
               <td style="text-align: right"><?php
   			if ($item['_tipocambio'] != ''){
   				echo $item['_total'];
   				 $total2 = $total2 + $item['_total'];
   			}
   			else {
   				echo "0.000";
   			}
   		?></td>

           </tr>

   <?php
           $i++;
       }
   ?>
    <tr>
            <td colspan="3"></td>
            <td  style="text-align: right;border-top:2px solid;"><?php echo $total1;  ?></td>
            <td  style="text-align: right;border-top:2px solid;"><?php echo $total2;  ?></td>
    </tr>

</table>
</body>
</html>
