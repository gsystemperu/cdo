<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Compras extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('model_compra');
    }
    public function index(){ }
    public function actualizar(){
        $id 		        = $this->input->post('pid', 0);
        $idproveedor	    = $this->input->post('pidprov',0);
        $fechaCompra	    = $this->input->post('pfcompra', '');
        $numeroDocumento	= $this->input->post('pnumerodoc', '');
        $valorCompra        = $this->input->post('pvalorcompra', 0);
        $valorIgv           = $this->input->post('pvalorigv', 0);
        $valorTotal         = $this->input->post('pvalortotal', 0);
        $usuario            = $this->input->post('pusuario', '');
        $tipodoc            = $this->input->post('ptipodoc', '');
        $incluyeigv            = $this->input->post('pincluyeigv', '');
        $tipocambio            = $this->input->post('ptipocambio', '');
        $sede            = $this->input->post('pidsede', 0);
        $respuesta          = $this->model_compra->ADO_Actualizar($id,$idproveedor,$fechaCompra,$numeroDocumento,$valorCompra,$valorIgv,$valorTotal,$usuario,$tipodoc,$incluyeigv,$tipocambio,$sede);
        echo json_encode($respuesta);
    }
    public function actualizardetalle(){
        $idcompra    	= $this->input->post('pidcompra', 0);
        $idproductos	= $this->input->post('pproductos', 0);
        $codbobinas  	= $this->input->post('pcodbobinas', '');
        $cantidades	    = $this->input->post('pcantidades', 0);
        $precios		= $this->input->post('pprecios', 0);
        $mlineales      = $this->input->post('pmlineales', 0);
        $respuesta          = $this->model_compra->ADO_ActualizarDetalle($idcompra,$idproductos,$cantidades,$codbobinas,$precios,$mlineales);
        echo json_encode($respuesta);
    }
    public function listarcompras(){
        $desde    	= $this->input->get('pdesde', null);
        $hasta    	= $this->input->get('phasta', null);
        $sede    	= $this->input->get('psede', null);
        if (validar_fecha($desde)==false || validar_fecha($hasta)==false ) {
            $desde='';
            $hasta='';
        }
        $nombreproveedor	= $this->input->get('pproveedor', null);
        $numerodocumento	= $this->input->get('pnumerodoc', null);
       if($desde !='' || $hasta != ''){
            $respuesta          = $this->model_compra->ADO_Listar_Compras_Fechas($desde,$hasta,$sede);
      }else{
            $respuesta          = $this->model_compra->ADO_Listar_Filtrar('',$nombreproveedor,$numerodocumento,$sede);
      }
        echo json_encode($respuesta);
    }

    public function totalcompras(){
        $fechacompra    	= $this->input->post('pfechacompra', null);
        $nombreproveedor	= $this->input->post('pproveedor', null);
        $numerodocumento	= $this->input->post('pnumerodoc', null);
        $sede	            = $this->input->post('psede', null);
        $respuesta          = $this->model_compra->ADO_Total_FiltroCompras($fechacompra,$nombreproveedor,$numerodocumento,$sede);
        echo json_encode($respuesta);
    }
    public function compracabezera(){
      $idcompra     = $this->input->post('pidcompra', null);
      $respuesta          = $this->model_compra->ADO_Cabezera_Compra($idcompra);
      echo json_encode($respuesta);
      }
    public function detalledecompra(){
          $idcompra     = $this->input->post('pidcompra', null);
          $respuesta          = $this->model_compra->ADO_Detalle_Compra($idcompra);
          echo json_encode($respuesta);
    }
    public function eliminarcompra(){
        $idcompra     = $this->input->post('pidcompra', null);
        $usuario      = $this->input->post('pusuario', null);
        $respuesta    = $this->model_compra->ADO_Eliminar_Compra($idcompra, $usuario);
        echo json_encode($respuesta);
    }

    public function comprasstockactual(){
        $respuesta    = $this->model_compra->ADO_Compras_Stock_Actual();
        echo json_encode($respuesta);
    }

}
