<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Clinica de la Piel</title>

	<style type="text/css">

	::selection{ background-color: #E13300; color: white; }
	::moz-selection{ background-color: #E13300; color: white; }
	::webkit-selection{ background-color: #E13300; color: white; }
	html { margin: 0px}
	body {
		background-color: #fff;
		margin-left : 10px;
		margin-right: 10px;
		margin-bottom: 10px;
		margin-top: 0px;
        font: 13px/20px normal monospace;
		color: #4F5155;
	}

	a {
		color: #003399;
		background-color: transparent;
		font-weight: normal;
	}

	h1 {
		color: #444;
		background-color: transparent;
		border-bottom: 1px solid #D0D0D0;
		font-size: 19px;
		font-weight: normal;
		margin: 0 0 14px 0;*/
		padding: 14px 15px 10px 15px;
	}
	.cabezera {
		height: 130px;
		color: #444;
		background-color: transparent;
		border-bottom: 1px solid #D0D0D0;
		font-size: 19px;
		font-weight: normal;
		margin: 0 0 14px 0;*/
		padding: 14px 15px 10px 15px;
	}
	code {
		font-family: Consolas, Monaco, Courier New, Courier, monospace;
		font-size: 12px;
		background-color: #f9f9f9;
		border: 1px solid #D0D0D0;
		color: #002166;
		display: block;
		margin: 14px 0 14px 0;
		padding: 12px 10px 12px 10px;
	}

	#body{
		margin: 0 15px 0 15px;
	}
	
	p.footer{
		text-align: right;
		font-size: 11px;
		border-top: 1px solid #D0D0D0;
		line-height: 32px;
		padding: 0 10px 0 10px;
		margin: 20px 0 0 0;
	}
	
	#container{
		margin: 10px;
		border: 1px solid #D0D0D0;
		-webkit-box-shadow: 0 0 8px #D0D0D0;
	}
	.negrita{font-weight: bold;}
	.x-letra-detalle{
		font-size: 11px;
	}
	.x-letra-detalle-t{
		font-size: 14px;
	}
	</style>
</head>
<body>
<div id="cabecera" style="height:240px;">
	<!--	<img src="./application/frontend/images/oftamiclog.jpg" style="width: 200px;height: 197px;">-->
</div>
<table style="width:400px;">
    <tr>
        <td colspan="3"><label style="margin-left: 60px;"><?php echo utf8_decode( $paciente );  ?></label></td>
    </tr>
    <tr>
    	<td style="height: 25px;"></td>
    </tr>
    <tr>
        <td colspan="3"><strong>Dx</strong></td>
    </tr>
    <tr>
        <td >
            <div style="width: 380px;height: 80px;"><?php echo utf8_decode($diagnostico); ?></div>
        </td>
    </tr>
    <tr>
        <td colspan="3"><strong>Tx</strong></td>
    </tr>
    <tr>
        <td colspan="3">
            <div style="height: 100px;width: 380px;" ><?php echo utf8_decode($tratamiento); ?></div>
        </td>
    </tr>
  <!--  <tr>
        <td colspan="3"><strong>Proxima Cita</strong></td>
    </tr>
   <!-- <tr>
        <td colspan="3">
            <div style="border: 0px solid;"><?php echo $proximacita; ?></div>
        </td>
    </tr>-->
</table>
<br>
<table border="0" class="cliente" cellpadding="2" style="width: 380px;">
      <tr>
          <td style="width: 80px;"><strong> <?php echo $fechacita; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Proxima Cita : <?php echo $proximacita; ?></strong></td>
<!--           &nbsp;
          <td style="width: 100px;"><strong>Proxima Cita : <?php echo $proximacita; ?></strong></td> -->
      </tr>
      
<!--      <tr>
      	<td style="width: 150px;">
      		<strong>Proxima Cita : <?php echo $proximacita ?></strong>
      	</td>
      </tr>-->
</table>
</body>
</html>