<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Citas extends CI_Controller {

    function __construct() {parent::__construct();$this->load->model('model_cita');}

    public function index(){}

    public function actualizar()
    {
        $id= $this->input->post('vid',0);
        $idmedico= $this->input->post('vidmedico',0);
        $idpersona= $this->input->post('vidpersona',0);
        $persona= $this->input->post('vpersona',0);
        $descripcion= $this->input->post('vdescripcion',0);
        $observacion= $this->input->post('vobservacion',0);
        $tipocita= $this->input->post('vtipocita',0);
        $usuario= $this->input->post('vusuario',0);
        $fecha= $this->input->post('vfecha',0);
        $precio = $this->input->post('vprecio',0);
        $sede = $this->input->post('vidsede',0);
        $precio = 0.0;
        $data  = json_encode($this->model_cita->actualizarCita($id,$idmedico,$idpersona,$persona,$descripcion,$observacion,$tipocita,$usuario,$fecha,$precio,$sede));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
                $data
            );
    }

    public function listar()
    {
        $fecha= $this->input->get('vfecha',0);
        $idmedico= $this->input->get('vidmedico',0);
        $idsede= $this->input->get('vidsede',0);
        $data  = json_encode($this->model_cita->listarCitasPorFechaMedico($fecha,$idmedico,$idsede));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }

    public function pacientesparaatencion()
    {
        $fecha= $this->input->get('vfecha',0);
        $idmedico= $this->input->get('vidmedico',0);
        $data  = json_encode($this->model_cita->pacientesParaAtencionMedica($fecha,$idmedico));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
                $data
            );
    }

    public function citasdelpaciente()
    {
        $idpaciente= $this->input->get('vidpaciente',0);
        $data  = json_encode($this->model_cita->citasDelPaciente($idpaciente));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
                $data
            );
    }
    public function eliminar()
    {
        $idcita  = $this->input->post('vid',0);
        $usuario = $this->input->post('vusuario','');
        $data  = json_encode($this->model_cita->eliminarCita($idcita,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(
                $data
            );
    }

}
