<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_cliente extends CI_Model {
	private $table;
	private $table_fields;
	private $schema;

    function __construct() {parent::__construct(); }
    function ADO_Listar_Clientes($_id, $_paterno,$_materno,$_nombres,$_limit, $_start){
   

       $resultado = $this->db->query("SELECT * FROM om_general.fx_persona_buscar("
            .esNumeroNulo($_id)
            .','.esCadenaNulo(strtoupper($_paterno))
            .','.esCadenaNulo(strtoupper($_materno))
            .','.esCadenaNulo(strtoupper($_nombres))
            .','.esNumeroNulo($_limit)
            .','.esNumeroNulo($_start).")");

        $cant = 0;
        if($resultado->num_rows() > 0) {
            $rows = $resultado->result_array();
                foreach ($rows as $row) {$cant = $row['_cantidad']; break; }
            }
        $data['success'] = true;
     	$data['total']   = $cant;
     	$data['items']   = $resultado->result();

     	return $data;
    }

    function ADO_Buscar_Clientes($_id, $_datospersona){
   
        
       $resultado = $this->db->query("SELECT * FROM om_general.fx_persona_buscar("
            .esNumeroNulo($_id)
            .','.esCadenaNulo(strtoupper($_datospersona)).")");

        $cant = 0;
        $data['success'] = true;
        $data['total']   = $cant;
        $data['items']   = $resultado->result();

        return $data;
    }
    function ADO_Listar_Ocupaciones(){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_listar_ocupacion()");
        
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;   
    }
   
    function ADO_Actualizar_Cliente($_id,$_paterno,$_materno,$_nombre,$_sexo,$_fechanaci,$_idtipodoc,$_numerodoc,$_numeroruc,
        $_estado,$_domicilio,$_telefono,$_celular,$_idocupacion,$_estadocivil, $_lugarnaci, $_procede,$_usuario,$_correo,$_ocupacion,$_razonsocial)
    {
            $parametros =
            $_id
            .','.esCadenaNulo(strtoupper($_paterno))
            .','.esCadenaNulo(strtoupper($_materno))
            .','.esCadenaNulo(strtoupper($_nombre))
            .','.esCadenaNulo($_sexo)
            .','.esCadenaNulo($_fechanaci)
            .','.$_idtipodoc
            .','.esCadenaNulo($_numerodoc)
            .','.esCadenaNulo($_numeroruc)
            .','.$_estado
            .','.esCadenaNulo(strtoupper($_domicilio))
            .','.esCadenaNulo($_telefono)
            .','.esCadenaNulo($_celular)
            .','.esNumeroNulo($_idocupacion)
            .','.esNumeroNulo($_estadocivil)
            .','.esCadenaNulo(strtoupper($_lugarnaci))
            .','.esCadenaNulo(strtoupper($_procede))
            .','.esCadenaNulo(strtoupper($_usuario))
            .','.esCadenaNulo($_correo)
            .','.esCadenaNulo(strtoupper($_ocupacion))
            .','.esCadenaNulo(strtoupper($_razonsocial))
            ;


        $resultado = $this->db->query("SELECT * FROM om_general.fx_persona_actualizar(".$parametros.")");
        
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;

       
    }
    	function ADO_Listar_Cumpleanios($fecha){

       $resultado = $this->db->query("SELECT * FROM om_general.sp_correo_compleanios('$fecha')");

			 return   $resultado;

    }

		function ADO_Listar_ProximasCitas($fecha){

       $resultado = $this->db->query("SELECT * FROM om_general.sp_correo_proxima_cita('$fecha')");

			 return   $resultado;

    } 

}
