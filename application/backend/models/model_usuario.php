<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Model_usuario extends CI_Model {

	private $table;
	private $table_fields;
	private $schema;

    function __construct() {
        parent::__construct();
		$this->table  = 'om_general.cp_tb_usuario'; //'users';
		$this->table_fields = array(
			$this->table.'.usuid',
			$this->table.'.usudatos',
			$this->table.'.usulogin',
			$this->table.'.usuclave',
			$this->table.'.estado'
		);
		$this->table_fields_join = array();
    }

    function check_login($username, $password, $decode_pass = true) {


		$password = $decode_pass ? md5($password) : $password;
		$password = $password;

		$users_db_search_data = array(
			'cp_tb_usuario.usulogin' => $username,
			'cp_tb_usuario.usuclave' => $password,
		);

        $this->db->select('cp_tb_usuario.usuid');
        $this->db->where($users_db_search_data);
		$this->db->from('om_general.cp_tb_usuario');

		$users_db_query = $this->db->get();

		if ($users_db_query->num_rows == 1) {
			return $users_db_query->row('usuid');
		} else {
			return false;
		}
    }

	function userdata_by_id($id) {
		$users_db_search_data = array(
			'om_general.cp_tb_usuario.usuid' => $id,
		);

		$this->db->where($users_db_search_data);
		$this->db->from('om_general.cp_tb_usuario');
		$users_db_query = $this->db->get();

		if ($users_db_query->num_rows == 1) {
			return $users_db_query;
		} else {
			return false;
		}
	}
	/*CRUD*/
	 function get_all_entries($filter = array(), $limit = '15', $offset = '0', $order = '') {
		$this->db->select(implode(', ', array_merge($this->table_fields, $this->table_fields_join)));
		$this->db->from($this->table);

		if (is_array($filter) && count($filter) > 0) generate_filter($filter);

		if ($order > '') {
		    $this->db->order_by($order);
		}

		$this->db->limit($limit, $offset);

		$news_db_query = $this->db->get();

		if ($news_db_query->num_rows > 0) {
		    return $news_db_query->result();
		} else {
		    return false;
		}
    }

	function count_all_entries($filter = array()) {
        $this->db->from($this->table);

		if (is_array($filter) && count($filter) > 0) generate_filter($filter);

        return $this->db->count_all_results();
    }
    function listar_modulos($_idusuario){

    	$resultado = $this->db->query("SELECT * FROM om_general.fx_usuario_accesos(".esCadenaNulo($_idusuario).")");
    	$data_array = array();
        $index = 0;
        if($resultado->num_rows() > 0) {
            $rows = $resultado->result_array();
                foreach ($rows as $row)
                	{
                		$data_array[$index] = array('name'=>$row['name'],'iconCls'=>$row['iconcls'],'module'=>$row['module']);
                		$index++;
                 	}
            }

        $data['success'] = true;
     	$data['total'] = $resultado->num_rows();
     	$data['items'] = $data_array;

     	return $data;
    }
    function listar(){
    	$resultado = $this->db->query("SELECT * FROM om_general.fx_usuario_listar()");
        $data['success'] = true;
        $data['total']   = $resultado->num_rows();
        $data['items']   = $resultado->result();
        return $data;
    }
     /* function listarProgramas(){
    	$resultado = $this->db->query("SELECT * FROM om_general.og_listar_programas()");
        $data['success'] = true;
        $data['total']   = $resultado->num_rows();
        $data['items']   = $resultado->result();
        return $data;
    }*/
    //*************** *******************************************************************
    function Listar_Perfiles(){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_perfil_listar()");
        $data['success'] = true;
        $data['total']   = $resultado->num_rows();
        $data['items']   = $resultado->result();
        return $data;
    }
    function Agregar_Perfil($Id, $Descripcion){
        $sql = "SELECT * FROM om_general.fx_perfil_agregar (?,?)";
        $resultado = $this->db->query($sql,array($Id,$Descripcion));
        $data['success'] = true;
        $data['total']   = $resultado->num_rows();
        $data['items']   = $resultado->result();
        return $data;
    }

    function Actualizar_Usuario($Id,$NombresApellidos,$Login,$Clave,$IdPerfil,$Usuario){
        $sql = "SELECT * FROM om_general.fx_usuario_actualizar(?,?,?,?,?,?)";
       
        $resultado = $this->db->query($sql,array($Id,$NombresApellidos,$Login,$Clave,$IdPerfil,$Usuario));
        $data['success'] = true;
        $data['items']   = $resultado->result();
        return $data;
    }
    /*function Listar_Permisos_Por_Perfil($IdPerfil){
        $data = array();
        $sql = "SELECT * FROM om_general.fx_programas_listar()";
        $rs = $this->db->query($sql);
        if($rs->num_rows() > 0) {
            $rows = $rs->result_array();
            foreach($rows as $row1){
                $sql2 = "SELECT * FROM om_general.fx_perfil_permisos(?,?)";
                $rs2  = $this->db->query($sql2,array($IdPerfil,$row1['_idprograma']));
                $data[$row1['_programa']] =$rs2->result();
            }
        }
       return $data ;
    }*/
    function Listar_Permisos_Por_Perfil($IdPerfil){
        $data = array();
        $sql = "SELECT * FROM om_general.fx_perfil_permisos(?,?)";
        $rs  = $this->db->query($sql,array($IdPerfil,0));
        $data['success'] = true;
        $data['items']   = $rs->result();
        return $data;
    }

    function Actualizar_Permisos_a_Perfil($IdPerfil,$Permisos){
        $data = array();
        $sql = "SELECT * FROM om_general.fx_perfil_actualizar_permisos(?,?)";
        $rs  = $this->db->query($sql,array($IdPerfil,$Permisos));
        $data['success'] = true;
        $data['items']   = $rs->result();
        return $data;
    }

    function Eliminar_Usuario($IdUsuario,$Usuario){
        
        $sql = "SELECT * FROM om_general.fx_usuario_eliminar(?,?)";
        $rs  = $this->db->query($sql,array($IdUsuario,$Usuario));
        $data['success'] = true;
        $data['items']   = $rs->result();
        return $data;
    }

    function Acceso_Usuario($IdUsuario,$Menu){
        $sql = "SELECT * FROM om_general.fx_usuario_acceso_menu(?,?)";
        $rs  = $this->db->query($sql,array($IdUsuario,$Menu));
        return $rs->result();
    }
}
