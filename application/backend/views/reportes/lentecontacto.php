
<html>
<style>
   body{ font-family:sans-serif; font-size: 8px; letter-spacing: 3px }
    .textDerecha   {text-align: right;}
    .textIzquierda {text-align: left;}
    .textCentro    {text-align: center;}
    .detalle{ font-family:sans-serif; font-size: 9px; width: 400px; text-align: center;}
    .cliente{ font-family:sans-serif; font-size: 9px; width: 100%;  }
    .separador{height: 10px;}
    .divdetalle{height: 130px;border: 0px solid}
</style>
<body>
<div style="width:100%;height:240px;">
<!--<img src="./application/frontend/images/oftamiclog.jpg" style="width: 180px;height: 197px;">-->
</div>
     
    <table border="0" class="cliente" cellpadding="5" style="margin-top: 0px;">
      <tr>
          <td class="textIzquierda" colspan="2"><label style="margin-left: 60px;"><?php echo $paciente; ?> </label> </td>
      </tr>
      <!--
      <tr>
          <td class="textIzquierda" colspan="2">Direcci&oacute;n : <?php echo $direccion; ?> </td>
      </tr>
      <tr>
          <td class="textIzquierda" colspan="2">Telefono : <?php echo $telefono; ?> </td>
      </tr>
      -->
</table>
<div class="separador"></div>
<div class="divdetalle">

    <table border="0" class="detalle" cellpadding="0" cellspacing="2" style="width: 290px;">
      <tr>
            <td style="width:1px;" align="left">LENTES</td>
            <td style="margin-right: 20px;width: 10px;" align="center">ESF</td>
            <td style="margin-right: 5px;width: 10px;">CIL</td>
            <td style="margin-right: 5px;width: 10px;">EJE</td>
            <td style="margin-right: 5px;width: 10px;">DIP</td>
      </tr>
      <?php
      foreach($rsDetROD as $key=>$row){?>
      <tr>
           <td class="textIzquierda">OD</td>
           <td class="textCentro"><?php echo $row[0]->_esfera;  ?> </td>
           <td class="textCentro"><?php echo $row[0]->_cilindro;  ?> </td>
           <td class="textCentro"><?php echo $row[0]->_eje;  ?> </td>
         <!--  <td class="textCentro"><?php echo $row[0]->_dip_c;  ?> </td>-->
         <td class="textCentro">LEJOS</td>
      </tr>
      <?php } ?>
      <tr>
     <?php
      foreach($rsDetROI as $key=>$row1){?>
      
           <td class="textIzquierda">OI</td>
           <td class="textCentro"><?php echo $row1[0]->_esfera;  ?> </td>
           <td class="textCentro"><?php echo $row1[0]->_cilindro;  ?> </td>
           <td class="textCentro"><?php echo $row1[0]->_eje;  ?> </td>
           <td class="textCentro"><?php echo $_dip_lejos;?></td>
         <!--  <td class="textCentro"><?php echo $row1[0]->_dip_c;  ?> </td>-->
      
      <?php } ?>
      </tr>
      
       <?php
        foreach($rsDetOD as $key=>$row2){?>
        <tr>
            <td class="textIzquierda">OD </td>
            <!--<td class="textCentro"><?php echo $row2[0]->_esfera;  ?> </td>-->
            <td class="textCentro">ADD</td>
            <!--<td class="textCentro"><?php echo $row2[0]->_cilindro;  ?> </td>-->
            <td class="textCentro"><?php echo  $_add_cerca  ?> </td>
            <td class="textCentro"><?php echo $row2[0]->_eje;  ?> </td>
            <td class="textCentro">CERCA</td>
            <!--<td class="textCentro"><?php echo $row2[0]->_dip_c;  ?></td>-->
        </tr>
        <?php } ?>
       <?php
        foreach($rsDetOI as $key=>$row3){?>
        <tr>
            <td class="textIzquierda">OI </td>
            <td class="textCentro"><?php echo $row3[0]->_esfera;  ?> </td>
            <td class="textCentro"><?php echo $row3[0]->_cilindro;  ?> </td>
            <td class="textCentro"><?php echo $row3[0]->_eje;  ?> </td>
            <td class="textCentro"><?php echo  $_dip_cerca;  ?></td>
        </tr>
        <?php } ?>
    </table> 
</div> 
<table border="0" class="cliente" cellpadding="2" style="margin-top: -30px;" >
      <tr>
            <td class="textIzquierda" colspan="2"><strong>Dx:</strong> </td>
      </tr>
      <tr>
          <td>
                <div style="width: 380px;">
                      <?php echo $diagnostico;?>
                </div>
          </td>
      </tr>
      <tr>
          <td class="textIzquierda" colspan="2"><strong>Obs :</strong></td>
      </tr>
      <tr>
            <td><div style="width: 380px;">
                   <?php echo $_observacion; ?>
            </div></td>
      </tr>
      <tr>
          <td class="textIzquierda" colspan="2"><strong>Tx :</strong></td>
      </tr>
      <tr>
          <td><div style="width: 380px;">
                  <?php echo $tratamiento;?>
            </div></td>
      </tr>

</table>
<br>
<table border="0" class="cliente" cellpadding="2" style="width: 380px;">
      <tr>
          <td style="width: 80px;"><strong> <?php echo $fechacita; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Proxima Cita : <?php echo $proximacita; ?></strong></td>
          
<!--          <td style="width: 100px;"><strong>Proxima Cita : <?php echo $proximacita; ?></strong></td>  -->
      </tr>
<!--      <tr>
        <td style="width: 150px;"><strong>Proxima Cita : <?php echo $proximacita; ?></strong></td>
      </tr>-->
</table>

</body>
</html>

