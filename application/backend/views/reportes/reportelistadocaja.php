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

</style>
<html lang="en">
    <body style="padding:10px;">

        <div class="Titulo">
            Listado de Caja al <?php echo $fecha; ?>
            <br>
            <?php echo $tienda; ?>
        </div>
        <br>
        <br>
        <table class="Tabla" cellpadding="2" cellspacing="1" border="0">
            <tr>
                <th width="35" rowspan="2">Tipo</th>
                <th width="40"  rowspan="2">Numero</th>
                <th width="130"  rowspan="2">Cliente</th>
                <th width="50" colspan="2">Total <br>Emitido</th>
                <th width="50" colspan="2">Total <br>Cobrado</th>
                <th width="35" rowspan="2">Forma pago</th>
            </tr>
            <tr>
                <th width="50">Soles</th>
                <th width="50">Dolares</th>
                <th width="50">Soles</th>
                <th width="50">Dolares</th>
            </tr>
            <tr>
                <td colspan="3" align="right">Saldo Inicial</td>
                <td width="50" style="text-align: right"><?php echo number_format(0, 3); ?></td>
                <td width="50" style="text-align: right"><?php echo number_format(0, 3); ?></td>
                <td width="50" style="text-align: right"><?php echo number_format($saldoinicialnota, 3); ?></td>
                <td width="50" style="text-align: right"><?php echo number_format(0, 3); ?></td>
            </tr>

            <?php

            $totalNotaPedido    = 0;
            $totalBoletaFactura = 0;

            $totalpacientesnuevos=0;
            $totalpacientes=0;



            $i = 1;
            $total1 = 0;
            $total2 = 0;
            $total3 = 0;
            $total4 = 0;
            $totalcancelado = 0;
            $totalIngresos = 0;
            $totales_cobrados = 0;
            $idpersona=$reporte[0]['_idper'];

            foreach ($reporte as $item)
            {
                if($item['_tipodocumento'] == 'NOTA PEDIDO'){
                ?>
                <tr>
                    <td style="text-align: left"><?php echo $item['_tipodocumento']; ?></td>
                    <td style="text-align: left"><?php echo $item['_numerodoc']; ?></td>
                    <td style="text-align: left"><?php echo utf8_decode( $item['_cliente']); ?></td>
                    <!-- Total Emitido -->
                    <td style="text-align: right"><?php
                        if ($item['_tipomoneda'] == 'SOLES') {
                            echo number_format($item['_tgenerado'], 3);
                            $total1 = $total1 + $item['_tgenerado'];
                        } else {
                            echo "0.000";
                        }
                        ?>
                    </td>
                    <td style="text-align: right"><?php
                                if ($item['_tipomoneda'] == 'DOLARES') {
                                    echo number_format($item['_tgenerado'], 3);
                                    $total2 = $total2 + $item['_tgenerado'];
                                } else {
                                    echo "0.000";
                                }
                       ?>
                   </td>
                   <!-- ******************* -->

                   <!-- Total Cobrado     -->
                    <td style="text-align: right"><?php
                        if ($item['_tipomoneda'] == 'SOLES') {
                            if ($item['_idestado'] == 3)
                            {
                                echo "0.000";
                                $total3 = $total3 + 0;
                            } else {

                                if ($item['_tipodocumento'] == 'NOTA PEDIDO' || $item['_tipodocumento'] == 'HONORARIO') {
                                    if (trim($item['_formapago']) == 'EFECTIVO')
                                    {
                                        echo number_format($item['_tcobrado'], 3);
                                        //if($item['_tcobrado'] == 0){
                                        //  $total3 = $total3 + $item['_tgenerado'] ;
                                        //}else{
                                          $total3 = $total3 + $item['_tcobrado'] ;
                                        //}

                                    } else { // VISA
                                        echo "0.000";
                                        $total3 = $total3 + 0;

                                    }
                                  } else {
                                    if ($item['_idnotapedido'] == 0) {
                                        if (trim($item['_formapago']) == 'EFECTIVO') {
                                            echo number_format($item['_tgenerado'] - $item['_tcobrado'], 3);
                                        } else {
                                            echo "0.000";
                                        }
                                    } else {
                                        echo number_format($item['_tgenerado'] - $item['_tcobrado'], 3);
                                    }
                                }
                            }
                        } else {
                            echo "0.000";
                        } // fin if
                        ?>
                    </td>
                    <td style="text-align: right"><?php
                        if ($item['_tipomoneda'] == 'DOLARES')
                        {

                            if ($item['_idestado'] == 3)
                            {
                                echo "0.000";
                                $total4 = $total4 + 0;
                            } else {
                                if ($item['_tipodocumento'] == 'NOTA PEDIDO' || $item['_tipodocumento'] == 'HONORARIO') {
                                    if (trim($item['_formapago']) == 'EFECTIVO') {
                                        echo number_format($item['_tcobrado'], 3);

                                        //if($item['_tcobrado'] == 0){
                                        //  $total4 = $total4 + $item['_tgenerado'] ;
                                        //}else{
                                          $total4 = $total4 + $item['_tcobrado'] ;
                                        //}

                                    } else {
                                        echo "0.000";
                                        $total4 = $total4 + 0;
                                    }
                                } else {
                                    if ($item['_idnotapedido'] == 0) {
                                        if (trim($item['_formapago']) == 'EFECTIVO') {
                                            echo number_format($item['_tgenerado'], 3);
                                            $total4 = $total4 + $item['_tgenerado'];
                                        } else {
                                            echo "0.000";
                                            $total4 = $total4 + 0;
                                        }
                                    } else {
                                        echo number_format($item['_tcobrado'], 3);
                                        $total4 = $total4 + $item['_tcobrado'];
                                    }
                                }
                            }
                        } else {
                            echo "0.000";
                        }
                        ?>
                    </td>
                    <!-- *********************************** -->

                    <td style="text-align: center"><?php echo $item['_formapago']; ?></td>
                    <td style="text-align: center"><?php echo utf8_decode($item['_medico']); ?></td>
                </tr>
                <?php
                        $id = $item['_idcontrato'];
                        $sql =  $this->db->query("select p.desprod,c.cantidad,c.precio from om_general.cp_tb_contratodet  c
                        left join om_general.cp_tb_producto p on
                        c.idprod = p.idprod
                        where c.idcont = $id" );
                        foreach ($sql->result_array() as $row) { ?>
                             <tr>
                             <td>&nbsp;&nbsp;</td>
                             <td colspan="8"><?php  echo $row['desprod']; ?> </td>
                             </tr>

                       <?php
                       }

                    ?>


                        <?php
                        /*
                        //Variables de Contadores
                        if($item['_citas']<=1 && $item['_idper']==$idpersona && $i==1){
                            $totalpacientesnuevos = $totalpacientesnuevos + 1;
                        }else{
                            if($item['_citas']<=1 && $item['_idper']!=$idpersona){
                                $totalpacientesnuevos = $totalpacientesnuevos + 1;
                            }
                        }
                        if($i==1 && $item['_idper']==$idpersona){
                            $totalpacientes = $totalpacientes + 1;
                        }else{
                            if($item['_idper']!=$idpersona){
                                $totalpacientes = $totalpacientes + 1;
                            }
                        }
                        $idpersona =$item['_idper'];*/

                        $i++;
                      }

                    }
                    ?>
            <tr>
                <td colspan="8">&nbsp;&nbsp; </td>
            </tr>
            <tr>
                <td colspan="3"></td>
              <!--  <td style="text-align: right;border-top:2px solid;"><?php echo number_format($total1, 3); ?></td>
                <td  style="text-align: right;border-top:2px solid;"><?php echo number_format($total2, 3); ?></td>-->
                <td></td>
                <td></td>
                <td  style="text-align: right;border-top:2px solid;"><?php
                  $totalNotaPedido = $total3;
                  echo number_format($total3 + $saldoinicialnota, 3);
                ?></td>
                <td  style="text-align: right;border-top:2px solid;"><?php echo number_format($total4, 3); ?></td>
            </tr>

            <tr>
                <td colspan="3" align="right">Saldo Inicial</td>
                <td width="50" style="text-align: right"><?php echo number_format(0, 3); ?></td>
                <td width="50" style="text-align: right"><?php echo number_format(0, 3); ?></td>
                <td width="50" style="text-align: right"><?php echo number_format($saldoinicial, 3); ?></td>
                <td width="50" style="text-align: right"><?php echo number_format(0, 3); ?></td>
            </tr>
            <!-- Registro de boleta y factura -->

            <?php
            $i = 1;
            $total1 = 0;
            $total2 = 0;
            $total3 = 0;
            $total4 = 0;
            $totalcancelado = 0;
            $totalIngresos = 0;
            $idpersona = 0;
        foreach ($reporte as $item) {
                if($item['_tipodocumento'] <> 'NOTA PEDIDO'){
                ?>
                <tr>
                    <td style="text-align: left"><?php echo $item['_tipodocumento']; ?></td>
                    <td style="text-align: left"><?php echo $item['_numerodoc']; ?></td>
                    <td style="text-align: left"><?php echo utf8_decode($item['_cliente']); ?></td>
                    <td style="text-align: right"><?php
                        if ($item['_tipomoneda'] == 'SOLES') {
                            echo number_format($item['_tgenerado'], 3);
                            $total1 = $total1 + $item['_tgenerado'];
                        } else {
                            echo "0.000";
                        }
                        ?>
                    </td>
                    <td style="text-align: right"><?php
                                if ($item['_tipomoneda'] == 'DOLARES') {
                                    echo number_format($item['_tgenerado'], 3);
                                    $total2 = $total2 + $item['_tgenerado'];
                                } else {
                                    echo "0.000";
                                }
                       ?>
                   </td>
                    <td style="text-align: right"><?php
                        if ($item['_tipomoneda'] == 'SOLES') {
                            if ($item['_idestado'] == 3) {
                                echo "0.000";
                                $total3 = $total3 + 0;
                            } else {

                                if ($item['_tipodocumento'] == 'NOTA PEDIDO' || $item['_tipodocumento'] == 'HONORARIO') {
                                    if (trim($item['_formapago']) == 'EFECTIVO') {

                                        if($item['__saldo_cobrado_nota_pedido']!=''){
                                            echo number_format($item['__saldo_cobrado_nota_pedido'], 3);
                                            $total3 = $total3 + $item['__saldo_cobrado_nota_pedido'];
                                        }else{
                                              echo number_format($item['_tcobrado'], 3);
                                            $total3 = $total3 + $item['_tcobrado'];
                                        }

                                    } else {
                                        echo "0.000";
                                        $total3 = $total3 + 0;
                                    }
                                } else {
                                    if ($item['_idnotapedido'] == 0) {
                                        if (trim($item['_formapago']) == 'EFECTIVO') {
                                            //echo number_format($item['_tcobrado'], 3);
                                            //if($item['_tcobrado']==0){
                                            //    $total3 = $total3 + $item['_tgenerado'];
                                            //}else{
                                            //    $total3 = $total3 + $item['_tcobrado'];
                                            //}

                                            if($item['_idnotapedido']>0){
                                              echo  number_format($item['_saldo_cobrado_nota_pedido'], 3);
                                              $total3 = $total3 + $item['_saldo_cobrado_nota_pedido'];
                                            }
                                            else{
                                                echo number_format($item['_tcobrado'], 3);
                                                $total3 = $total3 + $item['_tcobrado'];
                                            }
                                        } else {
                                            echo "0.000";
                                            $total3 = $total3 + 0;
                                        }
                                    } else {
                                        if($item['_idnotapedido']>0){
                                          echo  number_format($item['_saldo_cobrado_nota_pedido'], 3);
                                          $total3 = $total3 + $item['_saldo_cobrado_nota_pedido'];
                                        }
                                        else{
                                            echo number_format($item['_tcobrado'], 3);
                                            $total3 = $total3 + $item['_tcobrado'];
                                        }

                                        //echo number_format($item['_tcobrado'], 3);
                                        //if($item['_tcobrado']==0){
                                        //    $total3 = $total3 + $item['_tgenerado'];
                                        //}else{
                                        //    $total3 = $total3 + $item['_tcobrado'];
                                        //}
                                    }
                                }
                            }
                        } else {
                            echo "0.000";
                        } // fin if
                        ?>
                    </td>
                    <td style="text-align: right"><?php
                        if ($item['_tipomoneda'] == 'DOLARES') {

                            if ($item['_idestado'] == 3) {
                                echo "0.000";
                                $total4 = $total4 + 0;
                            } else {
                                if ($item['_tipodocumento'] == 'NOTA PEDIDO' || $item['_tipodocumento'] == 'HONORARIO') {
                                    if (trim($item['_formapago']) == 'EFECTIVO') {
                                        echo number_format($item['_tgenerado'], 3);
                                        $total4 = $total4 + $item['_tgenerado'];
                                    } else {
                                        echo "0.000";
                                        $total4 = $total4 + 0;
                                    }
                                } else {
                                    if ($item['_idnotapedido'] == 0) {
                                        if (trim($item['_formapago']) == 'EFECTIVO')
                                        {
                                            echo number_format($item['_tgenerado'], 3);
                                            //if($item['_tcobrado']==0)
                                            //{
                                            //    $total4 = $total4 + $item['_tgenerado'];
                                            //}else{
                                                $total4 = $total4 + $item['_tcobrado'];
                                            //}
                                        } else {
                                            echo "0.000";
                                            $total4 = $total4 + 0;
                                        }
                                    } else {
                                        echo number_format($item['_tcobrado'], 3);

                                         //if($item['_tcobrado']==0)
                                          //{
                                          //    $total4 = $total4 + $item['_tgenerado'];
                                          //}
                                          //else{
                                            $total4 = $total4 + $item['_tcobrado'];
                                          //}
                                    }
                                }
                            }
                        } else {
                            echo "0.000";
                        }
                        ?>
                    </td>
                    <td style="text-align: center"><?php echo $item['_formapago']; ?></td>
                    <td style="text-align: center"><?php echo utf8_decode($item['_medico']); ?></td>
                </tr>

                 <?php
                        $id = $item['_idcontrato'];
                        $sql =  $this->db->query("select p.desprod,c.cantidad,c.precio from om_general.cp_tb_contratodet  c
                        left join om_general.cp_tb_producto p on
                        c.idprod = p.idprod
                        where c.idcont = $id" );
                        foreach ($sql->result_array() as $row) { ?>
                             <tr>
                             <td>&nbsp;&nbsp;</td>
                             <td colspan="8"><?php  echo $row['desprod']; ?> </td>
                             </tr>

                       <?php
                       }



                    ?>

                       <?php /*
                          if($item['_citas']<=1 && $item['_idper']==$idpersona && $i==1){
                            $totalpacientesnuevos = $totalpacientesnuevos + 1;
                        }else{
                            if($item['_citas']<=1 && $item['_idper']!=$idpersona){
                                $totalpacientesnuevos = $totalpacientesnuevos + 1;
                            }
                        }
                        if($i==1 && $item['_idper']==$idpersona){
                            $totalpacientes = $totalpacientes + 1;
                        }else{
                            if($item['_idper']!=$idpersona){
                                $totalpacientes = $totalpacientes + 1;
                            }
                        }
                        $idpersona =$item['_idper'];*/
                        $i++;




                      }
                    }
                    ?>
            <tr>
                <td colspan="8">&nbsp;&nbsp; </td>
            </tr>
            <tr>
                <td colspan="3"></td>
                <td></td>
                <td></td>
                <td  style="text-align: right;border-top:2px solid;"><?php
                  $totalBoletaFactura = $total3;
                  echo number_format($total3 + $saldoinicial, 3);
                  ?></td>
                <td  style="text-align: right;border-top:2px solid;"><?php echo number_format($total4, 3); ?></td>
            </tr>

            <!-- Fin Segunda parte -->

        </tr>
        <tr>
            <td colspan="5" style="text-align: right"> Ingresos </td>
            <td style="text-align: right"><?php
            //$totalIngresos = ( $total3 + $saldoinicial );
             $totalIngresos = ($totalNotaPedido + $totalBoletaFactura + $saldoinicialnota + $saldoinicial);
             echo number_format($totalIngresos, 3);
            //echo number_format(( $total3 + $saldoinicial), 3);
                    ?></td>
        </tr>
        <!--<tr>
            <td colspan="5" style="text-align: right"> Total </td>
            <td style="text-align: right"><?php echo number_format(($total3 + $saldoinicial) - 0, 3); ?></td>
        </tr>-->

        <tr>
            <td colspan="7">Totales  </td>
        </tr>
            <?php

                foreach ($resumen as $item)
                {
                    if($item['nuevo']==1){
                        $totalpacientesnuevos = $totalpacientesnuevos + 1;
                    }
                    $totalpacientes  = $totalpacientes + 1 ;
                }
            ?>
        <tr>
            <td colspan="3">Nro Pacientes : </td>
            <td colspan="4"><?php  echo $totalpacientes; ?></td>
        </tr>
        <tr>
            <td colspan="3">Nro Pacientes Nuevos : </td>
            <td colspan="4"><?php  echo $totalpacientesnuevos; ?></td>
        </tr>
        <?php
             foreach ($resumen_prod as $item)
             {
        ?>
            <tr>
            <td colspan="3"><?php echo $item['desprod'];  ?> : </td>
            <td colspan="4"><?php  echo $item['cantidad']; ?></td>

            </tr>
        <?php
               }

        ?>


    </table>
    <!--*******************************************************************-->
    <table style="width:85%;" class="Tabla" cellpadding="2" cellspacing="1.5" border="0">
        <tr>
            <th width="30" >Tipo</th>
            <th width="35" >N&uacute;mero Doc.</th>
            <th width="180" >Proveedor</th>
            <th width="37">Soles</th>
            <th width="37">Dolares</th>
        </tr>
       <!--<tr>
           <th width="37">Soles</th>
           <th width="37">Dolares</th>
   </tr>-->

<?php
$i = 1;
$total1 = 0;
$total2 = 0;
$total3 = 0;
$total4 = 0;
$totalcancelado = 0;
foreach ($reporte_compras as $item) {
    ?>
            <tr>
                <td style="text-align: left"><?php echo $item['_tipodocumento']; ?></td>
                <td style="text-align: left"><?php echo $item['_numerodoc']; ?></td>
                <td style="text-align: left"><?php echo $item['_proveedor']; ?></td>
                <td style="text-align: right">
    <?php
    if ($item['_tipocambio'] == '') {
        echo number_format($item['_total'], 3);
        $total1 = $total1 + $item['_total'];
    } else {
        echo "0.000";
    }
    ?>
                </td>
                <td style="text-align: right"><?php
            if ($item['_tipocambio'] != '') {
                echo number_format($item['_total'], 3);
                $total2 = $total2 + $item['_total'];
            } else {
                echo "0.000";
            }
            ?></td>

            </tr>

            <?php
                        $id = $item['_idcom'];
                        $sql =  $this->db->query("select pro.desprod,cd.cantidad,cd.precio from
                        om_general.cp_tb_comprasdet cd
                       LEFT JOIN om_general.cp_tb_producto pro on pro.idprod = cd.idprod
                       where cd.idcom =  $id" );
                        foreach ($sql->result_array() as $row) { ?>
                             <tr>
                             <td>&nbsp;&nbsp;</td>
                             <td colspan="4"><?php  echo $row['desprod']; ?> </td>
                             </tr>

                       <?php
                       }

                    ?>

                    <?php
                    $i++;
                }
                ?>
        <tr>
            <td colspan="5">&nbsp;&nbsp; </td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td align="right">Egresos </td>
            <td  style="text-align: right;border-top:2px solid;"><?php echo number_format($total1, 3); ?></td>
            <td  style="text-align: right;border-top:2px solid;"><?php echo number_format($total2, 3); ?></td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td align="right">Total </td>
            <td  style="text-align: right;border-top:2px solid;"><?php echo number_format($totalIngresos - $total1, 3); ?></td>
            <td  style="text-align: right;border-top:2px solid;"><?php echo number_format(0.0, 3); ?></td>
        </tr>

    </table>
    <br>
    <!--<table style="width:83.5%;" class="Tabla" cellpadding="2" cellspacing="1.5" border="0">

        <tr>
            <th width="50" >Paciente</th>
            <th width="40" >Tipo Cita</th>
         </tr>

         //<?php foreach ($pacientes as $item) { ?>
                  <tr>
                      <td>//<?php echo $item['_persona'] ?></td>
                      <td>//<?php echo $item['_tipocita'] ?></td>
                  </tr>

              //<?php } ?>
    </table>-->


</body>
</html>
