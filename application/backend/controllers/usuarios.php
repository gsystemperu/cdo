<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuarios extends CI_Controller {

	function __construct() {
        parent::__construct();
        $this->load->model('model_usuario');
  	}
	public function index() {
	
	}
	
	public function login() {
		$user_check = $this->model_usuario->check_login( strtoupper($this->input->post('username')), $this->input->post('password'));
		if(intval($user_check)) {
			$user_data = $this->model_usuario->userdata_by_id($user_check);
			$cookie = array(
				'name'   => APP_NAME.'_access',
				'value'  => json_encode(array('id' => $user_data->row('usuid'), 'user' => $user_data->row('usulogin'), 'pass' => $user_data->row('usuclave'))),
				//'expire' => time()+86500
			);
			set_cookie($cookie);
			$this->session->set_userdata(array(APP_NAME.'_access' => true));
			$data['success'] = true;
			$data['usuario'] = array('user'=>$user_data->row('usulogin'),'datos'=>$user_data->row('usudatos'));
		} else {
			$data['success'] = false;
		}
		
	  echo json_encode($data);
	}
	
	public function logout() {
		$this->session->unset_userdata(APP_NAME.'_access');
		delete_cookie(APP_NAME.'_access');
		//redirect('/cdi', 'refresh');
	}
	public function accesos(){
		$idusuario =$this->input->post('usuario');
		$menu =$this->input->post('menu');
		$rs = $this->model_usuario->Acceso_Usuario($idusuario,$menu);
		echo json_encode($rs);
	}
	public function listar(){
		$rs = $this->model_usuario->listar();
		echo json_encode($rs);	
	}
	public function listarprogramas(){
		$rs = $this->model_usuario->listarProgramas();
		echo json_encode($rs);	
	}
	public function codigobarratest(){
		echo genera_codigo_barra39("10333333RPLCSJDM",false);
	}
    //****************************************************************************************************************
    public function listarperfiles(){
        $rs = $this->model_usuario->Listar_Perfiles();
        echo json_encode($rs);
    }
    public function agregarperfil(){
        $Id 		 = $this->input->post('vId', 0);
        $Descripcion	 = $this->input->post('vDescripcion', '');
        $rs = $this->model_usuario->Agregar_Perfil($Id, $Descripcion);
        echo json_encode($rs);

    }
    public function actualizarusuario(){
        $Id 		        = $this->input->post('vId','');
        $NombresApellidos   = $this->input->post('vNomApe','');
        $Login              = $this->input->post('vLogin','');
        $Clave              = $this->input->post('vClave','');
        $IdPerfil           = $this->input->post('vIdPerfil',0);
        $Usuario            = $this->input->post('vUsuario',0);
        $rs = $this->model_usuario->Actualizar_Usuario(($Id==''?0:$Id),$NombresApellidos,$Login,$Clave,$IdPerfil,$Usuario);
        echo json_encode($rs);
    }
    public function listarpermisosporperfil(){
        $IdPerfil 		 = $this->input->post('vIdPerfil', 0);
        $rs = $this->model_usuario->Listar_Permisos_Por_Perfil($IdPerfil);
        echo json_encode($rs);

    }
    public function actualizarpermisosaperfil(){
        $IdPerfil 		 = $this->input->post('vIdPerfil', 0);
        $Permisos 		 = $this->input->post('vPermisos', '');
        $rs = $this->model_usuario->Actualizar_Permisos_a_Perfil($IdPerfil,$Permisos);
        echo json_encode($rs);
    }

	 public function eliminarusuario(){
        $IdUsuario 		 = $this->input->post('vIdUsuario', 0);
		$Usuario 		 = $this->input->post('vUsuario', 0);
        $rs = $this->model_usuario->Eliminar_Usuario($IdUsuario,$Usuario);
        echo json_encode($rs);
    }

	
}