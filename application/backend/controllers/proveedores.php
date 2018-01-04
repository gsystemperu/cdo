<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Proveedores extends CI_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('model_proveedor');
  	}
	public function index()
	{}
	public function listarproveedores(){
		$_id 		 = $this->input->get('pid', 0);
		$_paterno	 = $this->input->get('ppaterno', '');
		$_materno	 = $this->input->get('pmaterno', '');
		$_nombre	 = $this->input->get('pnombres', '');
		$_limit      = $this->input->get('limit');
		$_start      = $this->input->get('start');

		$rs = $this->model_proveedor->ADO_Listar_Proveedores($_id,$_paterno,$_materno,$_nombre,$_limit,$_start);
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
		$_id 		 = $this->input->post('idprov', 0);
		$_paterno	 = $this->input->post('paternoprov', '');
		$_materno	 = $this->input->post('maternoprov', '');
		$_nombre	 = $this->input->post('nombreprov', '');
		$_sexo		 = $this->input->post('sexoprov', '');
		$_fechanaci	 = $this->input->post('fnaciprov', '');
		$_idtipodoc	 = $this->input->post('iddocidentidad', 0);
		$_numerodoc	 = $this->input->post('numdocprov', '');
		$_numeroruc	 = $this->input->post('numrucprov', '');

		$_estado 		= $this->input->post('estadoprov', '');
		$_domicilio 	= $this->input->post('domicilioprov', '');
		$_domicilio_fiscal 	= $this->input->post('domiciliofiscalprov', '');
		$_telefono 		= $this->input->post('telefonoprov', '');
		$_celular 		= $this->input->post('celularprov', '');
		$_departamento 		= $this->input->post('departamentoprov', '');
		$_provincia 		= $this->input->post('provinciaprov', '');
		$_distrito 		= $this->input->post('distritoprov', '');
		$_usuario  		= $this->input->post('usuario', '');

		$rs = $this->model_proveedor->ADO_Actualizar_Proveedor(($_id==''?0:$_id),$_paterno,$_materno,$_nombre,$_sexo,
		$_fechanaci,($_idtipodoc==''?0:$_idtipodoc),$_numerodoc,$_numeroruc,
		$_estado,$_domicilio,$_domicilio_fiscal,$_telefono,$_celular,$_departamento,$_provincia,$_distrito,$_usuario);
		echo json_encode($rs);
		
	}
	
}
