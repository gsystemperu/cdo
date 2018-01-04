<?php
ini_set("memory_limit", "120M");
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
    .TituloMed {
        font-size: 12px;
        font-weight: bold;
        text-align: left;;

        font-family: monospace;
    }

</style>
<html lang="en">
    <body style="padding:10px;">
        <div class="Titulo">
              Liquidaci&oacute;n Desde : <?php echo $desde; ?> Hasta : <?php echo $hasta; ?>

            <br>
            <?php echo 'SEDE :' . $tienda; ?>
        </div>
        <p>
        <div class="TituloMed">
        M&Eacute;DICO : <?php echo utf8_decode( $medico );  ?>
      </div>
        <table class="Tabla" cellpadding="2" cellspacing="1">
            <tr>
                <th width="30" height="15">Nro.</th>
                <th width="50">Fecha</th>
                <th width="300">Paciente</th>
                <th width="80">Tipo</th>
                <th width="80">Pago</th>
            </tr>
            <?php
            $i = 1;
            $total = 0;
            $suma = utf8_decode($detalle[0]['tipo']);
            $total = 0;
            $totalgeneral=0;
            foreach($detalle as $item)
            {
                $totalgeneral = $totalgeneral +  $item['pago'];
                if($suma == utf8_decode($item['tipo'])){
                ?>
                <tr>
                    <td style="text-align: center" height="5"><?php echo $i;  ?></td>
                    <td style="text-align: center" height="5"><?php echo $item['fecha'];  ?></td>
                    <td style="text-align: left" height="5"><?php echo utf8_decode($item['paciente']);  ?></td>
                    <td style="text-align: center" height="5"><?php echo utf8_decode($item['tipo']);  ?></td>
                    <td style="text-align: right" height="5"><?php echo $item['pago'];  ?></td>
                </tr>
                <?php 
                    $id = $item['idcon'];
                    $sql =  $this->db->query("
                    SELECT p.desprod FROM 
                    om_general.cp_tb_contratodet  d
                    INNER JOIN om_general.cp_tb_producto p
                    ON d.idprod = p.idprod
                    where d.idcont = $id");
                    foreach ($sql->result_array() as $row) {     
                    
                ?>
                      <tr>
                          <td>&nbsp;&nbsp;</td>
                          <td colspan="4"><?php echo $row['desprod']; ?></td>
                      </tr>
                
                    <?php } ?>
               
                <?php
                  $total = $total +  $item['pago'];
              }else{
                $suma = utf8_decode($item['tipo']);
               ?>
               <tr>
                   <td style="text-align: right;height:25px;"  colspan="4"><SGTRONG>TOTAL</STRONG></td>
                   <td style="text-align: right;border-top-style: solid;" ><?php echo number_format( $total,2,'.',' ' );  ?></td>
               </tr>
               <tr>
                   <td style="text-align: center" height="5"><?php echo $i;  ?></td>
                   <td style="text-align: center" height="5"><?php echo $item['fecha'];  ?></td>
                   <td style="text-align: left" height="5"><?php echo utf8_decode($item['paciente']);  ?></td>
                   <td style="text-align: center" height="5"><?php echo utf8_decode($item['tipo']);  ?></td>
                   <td style="text-align: right" height="5"><?php echo $item['pago'];  ?></td>
               </tr>
              <?php
                  $total = 0;
                  $total = $total +  $item['pago'];
            } //fin if

                $i++;
            }
            ?>

            <?php 
                    $id = $item['idcon'];
                    $sql =  $this->db->query("
                    SELECT p.desprod FROM 
                    om_general.cp_tb_contratodet  d
                    INNER JOIN om_general.cp_tb_producto p
                    ON d.idprod = p.idprod
                    where d.idcont = $id");
                    foreach ($sql->result_array() as $row) {     
                    
                ?>
                      <tr>
                          <td>&nbsp;&nbsp;</td>
                          <td colspan="4"><?php echo $row['desprod']; ?></td>
                      </tr>
                
                    <?php } ?>
            <tr>
                <td style="text-align: right;height:30px;"colspan="4"><SGTRONG>TOTAL</STRONG></td>
                <td style="text-align: right;border-top-style: solid;"><?php echo number_format( $total,2,'.',' ' );  ?></td>
            </tr>
            <tr>
                <td style="text-align: right;height:20px;"  colspan="4"><SGTRONG>TOTAL GENERAL</STRONG></td>
                <td style="text-align: right;border-top-style: solid;" height="5"><?php echo number_format( $totalgeneral,2,'.',' ' );  ?></td>
            </tr>
        </table>

      </body>
</html>
