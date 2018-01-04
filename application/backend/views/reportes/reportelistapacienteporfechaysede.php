 
<head>
	<title></title>
	<style type="text/css">
	 
@page{
		
  margin-top: 5px;
  margin-left: 25px;
  margin-bottom: 40px;

  
}
hr {background-color: black;
  height: 0.5px; }
 

	
</head>
<body >
 
    <h4  >LISTADO DE PACIENTES</h4>
    <hr >
    <br>
<h4 > DEL <?php echo $fechadel?> AL <?php echo $fechaal?>
  < 

<br>
 
 
</h4>
<!--</h4>Sede : &nbsp;<?php echo $tienda ?></h4>-->

<?php 

 for($i=0;$i<count($data_cabecera_medico);$i++){
 	if($i==0){

 	}
			echo "DOCTOR(RA)   :  ".$data_cabecera_medico["data"][$i]["medico"];
			echo "<br><br>";
			 $contador=1;
			for($j=0;$j<count($data_detalle_paciente["data"]);$j++){
				if($data_detalle_paciente["data"][$j]["idmed"]==$data_cabecera_medico["data"][$i]["idmed"]){
				echo "<font style='font-size:10px;'>".$contador++.".- </font>";	echo "<font style='font-size:10px;'>".utf8_decode($data_detalle_paciente["data"][$j]["paciente"])."</font>";
					echo "<br>";
					$contador;
				}
			}
			echo "<br>";
	} 

	?>

</body>
 
