<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Inventario extends CI_Controller {

	function __construct() {parent::__construct();$this->load->model('model_inventario');}

	public function index(){}

	public function listar(){
		$data  = json_encode($this->model_inventario->listarInventarioTodos());
		$this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
            	$data
         );
	}
	public function stock(){
		$idsede = $this->input->get('pidsede', 0);
		$idprod = $this->input->get('pidprod', 0);
		$data  = json_encode($this->model_inventario->listarStockProducto($idsede,$idprod));
		$this->output
						->set_content_type('application/json')
						->set_status_header(200)
						->set_output(
							$data
				 );

	}
	public function stockimprimir($idsede){
		$detalle = $this->model_inventario->listarStockProductoHTML($idsede);
		$data['rsDetalle'] = $detalle;
		$this->load->view('reportes/header');
		$this->load->view('/reportes/stockproductos',$data);
		$html = $this->output->get_output();
		$this->load->library('dompdf_gen');
		$this->dompdf->load_html($html);
		$this->dompdf->render();
		$this->dompdf->stream("stockprod.pdf",array("Attachment"=>0));

	}


}
