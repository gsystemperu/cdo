<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Productos extends CI_Controller {

	function __construct() {
        parent::__construct();
        $this->load->model('model_producto');
  	}
	public function index(){}

	public function listarproductos(){
		$_id 		 = $this->input->get('pid', 0);
		$_producto	 = $this->input->get('pproducto', '');
		$_proveedor	 = $this->input->get('pproveedor', '');
		$_sede	    = $this->input->get('pidsede', '');
		$_limit      = $this->input->get('limit');
		$_start       = $this->input->get('start');
		$_query       = $this->input->get('query');

		if($_proveedor == '' && $_producto == '' && $_sede == ''){
				$rs = array();
		}else{
			$rs = $this->model_producto->ADO_Listar_Productos($_id,$_producto,$_proveedor,$_sede, $_limit,$_start);
		}
		echo json_encode($rs);
	}
    public function listarmaterial(){
        $rs = $this->model_producto->ADO_Listar_Material();
        echo json_encode($rs);
    }
    public function actualizar(){

		$id 		 	= $this->input->post('vId', 0);
		$descripcion 	= $this->input->post('vDescripcion', 0);
		$medida 		= $this->input->post('vMedida', 0);
		$nrounidades	= $this->input->post('vNroUnidades', 0);
		$usuario		= $this->input->post('vUsuario', 0);
		$stockminimo	= $this->input->post('vStockMinimo', 0);
		$gasto			= $this->input->post('vGasto', 0);
		$manejastock	= $this->input->post('vManejaStock', 0);
		$stock 			= $this->input->post('vStock', 0);
    $precio         = $this->input->post('vPrecio', 0);
		$sede       = $this->input->post('vSede', 0);

		$tipoproducto    = $this->input->post('vTipoProducto', 0);
		$pmexterno       = $this->input->post('vPgExterno', 0);
		$pmcirujano      = $this->input->post('vPgCirujano', 0);
		$pmtratante      = $this->input->post('vPgTratante', 0);

		$rs = $this->model_producto->ADO_Actualizar_Producto(($id==''?0:$id),$descripcion,$medida,$nrounidades,$usuario,$stockminimo,$gasto,$manejastock,$stock,$precio,$sede,
		$tipoproducto,
		$pmexterno ,
		$pmcirujano,
		$pmtratante  );
		echo json_encode($rs);

    }
    public function eliminar(){
    	$id 		 	= $this->input->post('vId', 0);
		$usuario		= $this->input->post('vUsuario', 0);
		$rs = $this->model_producto->ADO_Eliminar_Producto(($id==''?0:$id),$usuario);
		echo json_encode($rs);
    }
    /******* Materiales *************************/

    //select * from om_general.fx_material_actualizar(23,'XXXXX',100.1,100.1,'METROS')
    public function actualizarmaterial(){
    	$id 		 	= $this->input->post('vId', 0);
		$descripcion	= $this->input->post('vDescripcion', '');
		$largo			= $this->input->post('vLargo', 0);
		$ancho			= $this->input->post('vAncho', 0);
		$medida			= $this->input->post('vMedida', '');
        $flagstock			= $this->input->post('vFStock', '0');

		$id = ($id==''?0:$id);
    	$parametros = array(
			esNumeroCero($id),
			$descripcion,
			esNumeroCero($largo),
			esNumeroCero($ancho),
			$medida,
            $flagstock
			);

		$rs = $this->model_producto->ADO_Actualizar_Material($parametros);
		echo json_encode($rs);
    }
    public function eliminarmaterial(){
    	$id 		 	= $this->input->post('vId', 0);
		$id = ($id==''?0:$id);
		$rs = $this->model_producto->ADO_Eliminar_Material($id);
		echo json_encode($rs);
    }
}
