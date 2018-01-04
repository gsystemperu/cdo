<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

function genera_codigo_barra39($_texto,$_img_text = false){
    require_once(APPPATH."third_party/Barcode39.php");

	$bc = new Barcode39($_texto);
	$bc->barcode_text = $_img_text;
	

	return $bc->draw();
	
}