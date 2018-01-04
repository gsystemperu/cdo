<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Paciente extends CI_Controller{
    
    function __construct() {
        parent::__construct();
        $this->load->model("model_paciente","paciente");
        
  	}
        
    function listaBuscar(){
        $arreglo=array
            (
            "opcion"=>  $this->input->get("opcion"),
            "cadena"=> strtoupper(trim($this->input->get("cadena")))
            );
        $rs=  $this->paciente->listaBuscar($arreglo);
        echo json_encode($rs);
    }
}

