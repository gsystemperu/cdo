<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_inventario extends CI_Model {

    function __construct() {parent::__construct(); }

    function listarInventarioTodos(){
        $sql = "SELECT *  FROM om_general.fx_productos_inventario()";
        $param = array();
        $resultado = $this->db->query($sql,$param);
        return $resultado->result();
    }

		function listarStockProducto($idsede,$idproducto){
			$sql = "SELECT *  FROM om_general.fx_stock_sede(?)";
			$param = array($idsede);
			$resultado = $this->db->query($sql,$param);
			$data['success'] = true;
			$data['total'] = $resultado->num_rows();
			$data['items'] = $resultado->result();
			return $data;
		}
    function listarStockProductoHTML($idsede){
      $sql = "SELECT *  FROM om_general.fx_stock_sede(?)";
			$param = array($idsede);
			$resultado = $this->db->query($sql,$param);
      return $resultado->result();
    }



}
