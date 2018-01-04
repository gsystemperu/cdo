<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mantenimientos extends CI_Controller {

    function __construct() {parent::__construct();$this->load->model('model_mantenimiento');}

      function listartipomoneda(){
            $data  = json_encode($this->model_mantenimiento->ListarTipoMoneda());
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }
      function actualizartipomoneda(){
            $id 		 = $this->input->post('pid',0);
            $descripcion = $this->input->post('pdescripcion','');
            $simbolo     = $this->input->post('psimbolo','');
            $tipocambio  = $this->input->post('ptipocambio',0);
            $data  = json_encode($this->model_mantenimiento->ActualizarTipoMoneda($id,$descripcion,$simbolo,$tipocambio));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }
      function eliminartipomoneda(){
            $id 		= $this->input->post('pid', 0);
            $data  = json_encode($this->model_mantenimiento->EliminarTipoMoneda($id));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }

      /*-- Documentos internos */
      function listardocumentosinternos(){
            $data  = json_encode($this->model_mantenimiento->ListarDocumentosInternos());
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }
      function actualizardocumentointerno(){
            $id 		= $this->input->post('pid', 0);
            $idsede     = $this->input->post('pidsede', 0);
            $anio       = $this->input->post('panio', 0);
            $tipo       = $this->input->post('ptipo', 0);
            $numero     = $this->input->post('pnumero', 0);
            $serie      = $this->input->post('pserie', '');

            $data  = json_encode($this->model_mantenimiento->ActualizarDocumentosInternos($id,$idsede,$anio,$tipo,$numero,$serie));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }
      function eliminardocumentointerno(){
            $id 		= $this->input->post('pid', 0);
            $data  = json_encode($this->model_mantenimiento->EliminarDocumentoInterno($id));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );

      }
      /*--- Formas de Pago   */
      function listarformapago(){
            $data  = json_encode($this->model_mantenimiento->ListarFormasPago());
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );

      }
      function actualizarformapago(){
            $id 		     = $this->input->post('pid', 0);
            $descripcion     = $this->input->post('pdescripcion', '');
            $data  = json_encode($this->model_mantenimiento->ActualizarFormaPago($id,$descripcion));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }
      function eliminarformapago(){
            $id 		= $this->input->post('pid', 0);
            $data  = json_encode($this->model_mantenimiento->EliminarFormaPago($id));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }

       /*-- Registro de tiketeras */
      function listartiketeras()
      {
            $data  = json_encode($this->model_mantenimiento->ListarTiketeras());
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }

       function actualizartiketera(){
            
            $id =  $this->input->post('pid', 0);
            $serie =$this->input->post('pserie', 0);
            $autorizacion =$this->input->post('pautorizacion', 0);
            $correlativo =$this->input->post('pcorrelativo', 0);
            $tienda =$this->input->post('ptienda', 0);

            $data  = json_encode($this->model_mantenimiento->ActualizarTiketera($id,$serie,$autorizacion,$correlativo,$tienda));
            $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output(
              $data
           );
      }

}
