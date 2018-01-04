<?php
class Model_tienda extends CI_Model{

	function __construct() {
		parent::__construct(); 
	}
	function ADO_Listar_Tiendas($arreglo){
		 
		$this->db->select("*");
		$this->db->from("om_general.cp_tb_tiendas");
		$this->db->where(array("idtienda"=>$arreglo["sedeid"]));
		$rs=$this->db->get();
		$arreglo=array();
		$flag=false;
		if($rs->num_rows()>0){
			$flag=true;
			foreach($rs->result() as $row){
				$arreglo[]=array
				(
					"idtienda"=>$row->idtienda,
					"descripcion"=>$row->descripcion,
                                        "direccion"=>$row->direccion
				);
			}
		}
		return array
		(
			"success"=>$flag,
			"data"=>$arreglo
		);

	}
}