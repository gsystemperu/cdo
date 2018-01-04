<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Model_paciente extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function listaBuscar($arreglo) {
        $data = array();
        $flag = FALSE;
        $sql="select idper as _idper ,concat(paternoper,' ',maternoper,' ',nombreper)as _ncompleto,"
                . " cast(date_part('year',age(fnaciper )) as int) AS _edad from om_general.cp_tb_persona "
                . "where concat(paternoper,' ',maternoper,' ',nombreper) like '%" . $arreglo["cadena"] . "%'";
        if ($arreglo["opcion"] == 1) {
            if ($arreglo["cadena"] != "") {
                $rs = $this->db->query($sql);
                if ($rs->num_rows() > 0) {
                    $flag = TRUE;
                    foreach ($rs->result() as $row) {
                        $data[] = array
                            (
                            "_idper" => $row->_idper,
                            "_ncompleto" => $row->_ncompleto,
                            "_edad"=>$row->_edad
                        );
                    }
                }
            }  
        }

        return array
            (
            "success" => $flag,
            "items" => $data
        );
    }

}
