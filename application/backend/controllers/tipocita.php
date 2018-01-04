<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipocita extends CI_Controller {

    function __construct() {parent::__construct();$this->load->model('model_tipocita');}

    function buscar(){
        $_descripcion  = $this->input->post('vDescripcion');
        $_sede         = $this->input->post('vSede');

        $data  = json_encode($this->model_tipocita->ListarTipoDeCita($_descripcion,$_sede));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
                $data
            );
    }

    function buscartipo(){
        $_descripcion  = $this->input->get('vDescripcion');
        $_sede         = $this->input->get('vSede');

        $data  = json_encode($this->model_tipocita->ListarTipoDeCita($_descripcion,$_sede));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
                $data
            );
    }





}
