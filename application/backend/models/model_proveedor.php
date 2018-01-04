<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_proveedor extends CI_Model {
	private $table;
	private $table_fields;
	private $schema;

    function __construct() {
        parent::__construct();
        
    }
    function ADO_Listar_Proveedores($_id, $_paterno,$_materno,$_nombres,$_limit, $_start){
      
       $resultado = $this->db->query("SELECT * FROM om_general.fx_proveedor_buscar("
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
  
    /*
pidestado integer,pdomicilio character varying, ptelefono character varying, pcelular character varying, pidocupa integer, 
pestadocivil integer, plugarnaci character varying, pprocede character varying
    */
    function ADO_Actualizar_Proveedor($_id,$_paterno,$_materno,$_nombre,$_sexo,$_fechanaci,$_idtipodoc,
        $_numerodoc,$_numeroruc,
        $_estado,$_domicilio,$_domicialio_fiscal,$_telefono,$_celular,$_departamento,$_provincia,$_distrito,$_usuario)
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
            .','.esCadenaNulo(strtoupper($_domicialio_fiscal))
            .','.esCadenaNulo($_telefono)
            .','.esCadenaNulo($_celular)
            .','.esCadenaNulo(strtoupper($_departamento))
            .','.esCadenaNulo(strtoupper($_provincia))
            .','.esCadenaNulo(strtoupper($_distrito))
            
            .','.esCadenaNulo(strtoupper($_usuario));


        $resultado = $this->db->query("SELECT * FROM om_general.fx_proveedor_actualizar(".$parametros.")");
        
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;

       
    }
    /*Datos Historia Clinica Reporte*/
  /*  function ADO_Paciente_Buscar_Datos($_idpersona){
         $parametros = $_idpersona;
         $resultado = $this->db->query("SELECT * FROM om_general.og_paciente_buscar_datos(".$parametros.")");
         //$resultdata['pacientedatos'] = $resultado->result_array();
         return $resultado->result_array();
    }
     function ADO_Paciente_Historia_Atenciones($_idpersona){
         $parametros = $_idpersona;
         $resultado = $this->db->query("SELECT * FROM om_general.og_paciente_hc_citas_atendidas(".$parametros.")");
         return $resultado->result_array();
    }
    function ADO_Paciente_Historia_Clinica_Detalle($_idpersona){
         $parametros = $_idpersona;
         $resultado = $this->db->query("SELECT * FROM om_general.og_paciente_detalle_historia_clinica(".$parametros.")");
         return $resultado->result_array();
    }*/

}