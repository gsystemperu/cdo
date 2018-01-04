<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_tipocita extends CI_Model
{
    function __construct() {parent::__construct();}

    function ListarTipoDeCita($_descripcion,$_sede){

        $sql = "SELECT * FROM om_general.fx_tipocita_listar(?,?)";
        $param = array(
            ($_descripcion=='0'?null:$_descripcion),
            $_sede

        );
        $resultado = $this->db->query($sql,$param);
        $data['sucess']=true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;

    }

}
