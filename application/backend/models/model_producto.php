<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_producto extends CI_Model {
	function __construct() {parent::__construct();}

    function ADO_Listar_Productos($_id, $_producto, $_proveedor,$_sede, $_limit, $_start){
 			$resultado = $this->db->query("SELECT * FROM om_general.fx_producto_buscar("
            .esNumeroNulo($_id)
            .','.esCadenaNulo(strtoupper($_producto))
            .','.esCadenaNulo(strtoupper($_proveedor))
						.','.esNumeroNulo($_sede)
            .','.esNumeroNulo($_limit)
            .','.esNumeroNulo($_start).")");

        /*$cant = 0;
        if($resultado->num_rows() > 0) {
            $rows = $resultado->result_array();
                foreach ($rows as $row) {$cant = $row['registros']; break; }
            }*/
        $data['success'] = true;
     		$data['total']   = $resultado->num_rows();
     		$data['items']   = $resultado->result();

     	return $data;
    }
    function ADO_Listar_ProductosHTML($_id, $_producto, $_proveedor,$_sede, $_limit, $_start){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_producto_buscar("
            .esNumeroNulo($_id)
            .','.esCadenaNulo(strtoupper($_producto))
            .','.esCadenaNulo(strtoupper($_proveedor))
						.','.esNumeroNulo($_sede)
            .','.esNumeroNulo($_limit)
            .','.esNumeroNulo($_start).")");
        return $resultado->result_array();
     }
    /*function ADO_Listar_Material(){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_material_listar()");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;

    }*/

    function ADO_Actualizar_Producto($id,$descripcion,$medida,$nrounidades,$usuario,$stockminimo,$gasto,$manejastock,$stock,$precio,$sede,$tipoproducto,$pmexterno ,$pmcirujano,$pmtratante )
    {

        $sql = "SELECT * FROM om_general.fx_producto_actualizar(?,?,?,?,?,?,?,?,?,?,?, ?,?,?,? )";
        $resultado = $this->db->query($sql,array(esNumeroCero($id),$descripcion,$medida,esNumeroCero($nrounidades),$usuario,esNumeroCero($stockminimo),$gasto,$manejastock,esNumeroCero($stock),esNumeroCero($precio),esNumeroCero($sede), $tipoproducto,esNumeroCero($pmexterno) ,esNumeroCero($pmcirujano),esNumeroCero($pmtratante) ));
				$data['success'] = true;
        return  $data;
    }
    function ADO_Eliminar_Producto($id,$usuario)
    {
        $id = esNumeroCero($id);
        $sql = "SELECT * FROM om_general.fx_producto_eliminar(?,?)";
        $resultado = $this->db->query($sql,array($id,$usuario));
        $data['success'] = true;
        return  $data;
    }

    /***************** Materiales *******************************/

    function ADO_Eliminar_Material($id)
    {
        $id = esNumeroCero($id);
        $sql = "SELECT * FROM om_general.fx_material_eliminar(?)";
        $resultado = $this->db->query($sql,array($id));
        $data['success'] = true;
        return  $data;
    }
    function ADO_Actualizar_Material($parametros)
    {
        $sql = "SELECT * FROM om_general.fx_material_actualizar(?,?,?,?,?,?)";
        $resultado = $this->db->query($sql,$parametros);
        $data['success'] = true;
        return  $data;
    }
    function ADO_Listar_Material()
    {
        $sql = "SELECT * FROM om_general.fx_material_listar()";
        $resultado = $this->db->query($sql);
        $data['success'] = true;
        $data['total']   = $resultado->num_rows();
        $data['items']   = $resultado->result();
        return $data;

    }
    function ADO_Listar_MaterialHtml()
    {
        $sql = "SELECT * FROM om_general.fx_material_listar()";
        $resultado = $this->db->query($sql);
        return $resultado->result_array();
    }

}
