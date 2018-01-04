<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Clientes extends CI_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('model_cliente');
  	}
	public function index()
	{}
	public function listarclientes(){
		$_id 		 = $this->input->get('pid', 0);
		$_paterno	 = $this->input->get('ppaterno', '');
		$_materno	 = $this->input->get('pmaterno', '');
		$_nombre	 = $this->input->get('pnombres', '');
		$_limit      = $this->input->get('limit');
		$_start       = $this->input->get('start');

		$rs = $this->model_cliente->ADO_Listar_Clientes($_id,$_paterno,$_materno,$_nombre,$_limit,$_start);
		echo json_encode($rs);
	}
	public function buscarclientes(){
		$_id 		 	 = $this->input->get('pid', 0);
		$_datospersona	 = $this->input->get('pdatospersona', '');
		$rs = $this->model_cliente->ADO_Buscar_Clientes($_id,$_datospersona);
		echo json_encode($rs);
	}
	/*public function listartipodocumentos(){
		$rs = $this->model_paciente->ADO_Listar_TipoDocumentos();
		echo json_encode($rs);
	}*/
	public function listarocupaciones(){
		$rs = $this->model_cliente->ADO_Listar_Ocupaciones();
		echo json_encode($rs);
	}
	public function actualizar(){
		$_id 		 = $this->input->post('idper', 0);
		$_paterno	 = $this->input->post('paternoper', '');
		$_materno	 = $this->input->post('maternoper', '');
		$_nombre	 = $this->input->post('nombreper', '');
		$_sexo		 = $this->input->post('sexoper', '');
		$_fechanaci	 = $this->input->post('fnaciper', '');
		$_idtipodoc	 = $this->input->post('iddocidentidad', 0);
		$_numerodoc	 = $this->input->post('numdocper', '');
		$_numeroruc	 = $this->input->post('numrucper', '');

		$_estado 		= $this->input->post('estadoper', '');
		$_domicilio 	= $this->input->post('domicilioper', '');
		$_telefono 		= $this->input->post('telefonoper', '');
		$_celular 		= $this->input->post('celularper', '');
		$_idocupacion 	= $this->input->post('idocupacionper', '');
		$_estadocivil 	= $this->input->post('estadocivilper', '');
		$_lugarnaci 	= $this->input->post('lugarnaciper', '');
		$_procede  		= $this->input->post('procedeper', '');
		$_usuario  		= $this->input->post('usuario', '');
		$_correo  		= $this->input->post('correo', '');
                $_ocupacion=  $this->input->post("ocupacion");
                $_razonsocial=  $this->input->post("razonsocial");


		$rs = $this->model_cliente->ADO_Actualizar_Cliente(($_id==''?0:$_id),$_paterno,$_materno,$_nombre,$_sexo,$_fechanaci,($_idtipodoc==''?0:$_idtipodoc),$_numerodoc,$_numeroruc,
		$_estado,$_domicilio,$_telefono,$_celular,$_idocupacion,$_estadocivil, $_lugarnaci, $_procede,$_usuario,$_correo,$_ocupacion,$_razonsocial);
		echo json_encode($rs);
		
	}
	/*public function grabarfoto(){
			$tmpArchivo    = $_FILES['picture']['tmp_name'];
  			$NombreArchivo = $_FILES['picture']['name'];
  			$idper         = $_POST['idper'];
  			$nombreCarpeta = 'C:/xampp/htdocs/cdi/application/frontend/fotos/';
			move_uploaded_file($tmpArchivo, $nombreCarpeta.strval($idper).'.jpg');
  			$data = array('error' =>1);
  			echo json_encode($data);
  	}*/
}
