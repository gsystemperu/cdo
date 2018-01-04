<?php
ini_set("memory_limit","120M");
?>
<style>
    .Tabla{font-size: 8px;padding-left: 40px;}
    .Tabla th {font-weight: bold;background-color: #7d7a7a;color: #dddddd;text-align: center;font-family: monospace;}
    .Tabla td {font-family: monospace;}
    .Titulo {font-size: 12px;font-weight: bold;text-align: center;font-family: monospace;text-decoration: underline;}
    .Tipo {font-family: underline;font-size: 10px;padding-left: 40px;font-family: monospace;}

</style>
<html lang="en">
<body>
<div class="Titulo">
    Sistema de Gigantografias SVentas<br><br>
    Reporte  : Listado de Trabajadores
</div>
<br>
<br>
<table class="Tabla" cellpadding="2" cellspacing="1">
    <tr>
        <th width="20">Nro.</th>
        <th width="50">C&oacute;digo</th>
        <th width="60">Nombres</th>
        <th width="80">Ape. Paterno</th>
        <th width="80">Ape. Manterno</th>
        <th width="50">Fe.Nacimiento</th>
        <th width="150">Cargo</th>
    </tr>
    <?php
    $i = 1;
    $total = 0;
    foreach($reporte as $item)
    {
        ?>
        <tr>
            <td style="text-align: center" height="5"><?php echo $i;  ?></td>
            <td style="text-align: center" height="5"><?php echo $item['id'];  ?></td>
            <td style="text-align: left" height="5"><?php echo $item['nombres'];  ?></td>
            <td style="text-align: left" height="5"><?php echo $item['paterno'];  ?></td>
            <td style="text-align: left" height="5"><?php echo $item['materno'];  ?></td>
            <td style="text-align: center" height="5"><?php echo $item['fnacimiento'];  ?></td>
            <td style="text-align: center" height="5"><?php echo utf8_decode($item['descripcion']);  ?></td>
        </tr>

        <?php

        $i++;
    }
    ?>
</table>
</body>
</html>
