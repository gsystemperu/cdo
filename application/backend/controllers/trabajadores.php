<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Trabajadores extends CI_Controller {

	function __construct() {
        parent::__construct();
        $this->load->model('model_trabajador');
  	}
	public function index(){}

	public function listartrabajadores(){
		$_id 		 = $this->input->get('pid', 0);
		$_paterno	 = $this->input->get('ppaterno', '');
		$_materno	 = $this->input->get('pmaterno', '');
		$_nombres	 = $this->input->get('pnombres', '');
		$_limit      = $this->input->get('limit');
		$_start       = $this->input->get('start');

		$rs = $this->model_trabajador->ADO_Listar_Trabajadores($_id, $_paterno,$_materno,$_nombres,$_limit, $_start);
		echo json_encode($rs);
	}
	public function listartipotrabajadores(){
		$rs = $this->model_trabajador->ADO_Listar_TipoTrabajadores();
		echo json_encode($rs);
	}
	public function listardiseniadores(){
		$rs = $this->model_trabajador->ADO_Listar_TrabajadoresPorTipo(1);
		echo json_encode($rs);
	}
	public function listarvendedoras(){
		$rs = $this->model_trabajador->ADO_Listar_TrabajadoresPorTipo(3);
		echo json_encode($rs);
	}
    public function listaroperarios(){
        $rs = $this->model_trabajador->ADO_Listar_TrabajadoresPorTipo(2);
        echo json_encode($rs);
    }

		public function listarmedicos(){
			$_tipomedico	 = $this->input->get('ptipomedico', 1);
			$_titulotodos	 = $this->input->get('ptitulo', 'TODOS');
			$rs = $this->model_trabajador->ADO_Listar_MedicosPorTipo($_tipomedico,$_titulotodos);
			echo json_encode($rs);
		}

	public function listartiendas(){
		$rs = $this->model_trabajador->ADO_Listar_Tiendas();
		echo json_encode($rs);
	}
    public function actualizartienda(){
        $id		     = $this->input->post('vId', '0');
        $descrip	 = $this->input->post('vDescripcion', '');
        $direccion	 = $this->input->post('vDireccion', '');
        $telefono	 = $this->input->post('vTelefono', '');
        $id = ($id==''?0:$id);
        $parametros = array(esNumeroCero($id),$direccion,$telefono,$descrip);
        $rs = $this->model_trabajador->ADO_Actualizar_Tienda($parametros);
        echo json_encode($rs);


    }
	public function actualizar(){
		$id		     = $this->input->post('vId', '');
		$paterno	 = $this->input->post('vPaterno', '');
		$materno	 = $this->input->post('vMaterno', '');
		$nombres	 = $this->input->post('vNombres', '');
		$fechanaci      = $this->input->post('vFechaNaci');
		$sexo      		= $this->input->post('vSexo');
		$tipotrab      		= $this->input->post('vTipoTrab');
		$usuario      		= $this->input->post('vUsuario');
		$fechanaci = ($fechanaci==''?'01/01/1900':$fechanaci);
		$id = ($id==''?0:$id);
		$parametros = array(esNumeroCero($id),$paterno,$materno,$nombres,$fechanaci,$sexo,esNumeroCero($tipotrab),$usuario);
		$rs = $this->model_trabajador->ADO_Actualizar_Trabajador($parametros);
		echo json_encode($rs);

	}
	public function eliminar(){
		$id		     	    = $this->input->post('vId', 0);
		$usuario      		= $this->input->post('vUsuario');
		$id = ($id==''?0:$id);
		$parametros = array(esNumeroCero($id),$usuario);
		$rs = $this->model_trabajador->ADO_Eliminar_Trabajador($parametros);
		echo json_encode($rs);

	}


}
