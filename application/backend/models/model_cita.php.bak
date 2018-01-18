<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_cita extends CI_Model
{
    function __construct() {parent::__construct();}
    function actualizarCita($id,$idmedico,$idpersona,$persona,$descripcion,$observacion,$tipocita,$usuario,$fecha,$precio,$sede){
        $sql = "SELECT * FROM om_general.fx_citas_actualizar(?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id,$idmedico,$idpersona,$persona,$descripcion,$observacion,$tipocita,$usuario,$fecha,$precio,$sede);
        $resultado = $this->db->query($sql,$param);
        $data['items'] = $resultado->result();
        return $data;
    }
    function listarCitasPorFechaMedico($fecha,$idmedico,$idsede){
        $sql = "SELECT * FROM om_general.fx_citas_listar(?,?,?)";
        $param = array($fecha,$idmedico,$idsede);
        $resultado = $this->db->query($sql,$param);
        $data['items'] = $resultado->result();
        return $data;
    }
    function pacientesParaAtencionMedica($fecha,$idmedico){
        $sql = "SELECT * FROM om_general.fx_citas_pacientes_para_atencion(?,?)";
        $param = array($fecha,$idmedico);
        $resultado = $this->db->query($sql,$param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function citasDelPaciente($idpaciente){
        $sql = "SELECT * FROM om_general.fx_citas_del_paciente(?)";
        $param = array($idpaciente);
        $resultado = $this->db->query($sql,$param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function datosDelPacientePorCita($idcita){
        $sql = "SELECT * FROM om_general.fx_datos_paciente_por_cita(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql,$param);
        return  $resultado->row_array();
    }
    function datosImpresionDiagnostico($idcita){
        $sql = "SELECT  diagnostico,tratamiento,to_char(proximacita,'dd/mm/YYYY')proximacita FROM om_general.cp_tb_consultorio WHERE idcita = ".$idcita ." AND item=1";
        $resultado = $this->db->query($sql);
        return  $resultado->row_array();
    }
    function eliminarCita($idcita,$sede){
      $sql = "SELECT * FROM om_general.fx_citas_eliminar(?,?)";
      $param = array($idcita,$sede);
      $resultado = $this->db->query($sql,$param);
      $data['items'] = $resultado->result();
      return $data;
    }

    function citas_sin_documento_venta($fechacita,$sede){
        $sql = "SELECT * FROM om_general.fx_citas_sin_documento_venta(?,?)";
        $param = array($fechacita,$sede);
        $resultado = $this->db->query($sql,$param);
        return  $resultado->result_array();
    }
    function listarCitasPorMedicoYRangoFechas($arreglo){
        $rs=$this->db->query
        (
        "select ci.idmed,
        per.idper,per.nombreper||' '||per.paternoper||' '||per.maternoper as paciente,ci.idsede,ci.fechacita
        from om_general.cp_tb_citas ci inner join om_general.cp_tb_persona per on ci.idper=per.idper inner join om_general.cp_tb_contrato co
        on per.idper=co.idper
        where ci.fechacita between '".$arreglo["fechadel"]."' and '".$arreglo["fechaal"]."' and ci.idmed='".$arreglo["idmed"]."'"
        );
        $flag=false;
        $data=array();
        if($rs->num_rows()>0){
            $flag=true;
            foreach($rs->result() as $row){
                $data[]=array
                (
                    "idmed"=>$row->idmed,
                    "idper"=>$row->idper,
                    "paciente"=>$row->paciente,
                    "idsede"=>$row->idsede,
                    "fechacita"=>$row->fechacita
                );
            }
        }
        return array
        (
            "success"=>$flag,
            "data"=>$data
        );
    }
    function listarContratoPorPersonaFechaYSede($arreglo){
        $rs=$this->db->query
        (
         "select *
        from om_general.cp_tb_contrato c inner join om_general.cp_tb_documentos_venta v on c.idcont=v.idcontrato  
        where c.femisioncont='".$arreglo["femisioncont"]."' and c.idper='".$arreglo["idper"]."' and c.idtienda='".$arreglo["idtienda"]."'"
        );
        $flag=false;
        $data=array();
        if($rs->num_rows()>0){
            $flag=true;
            foreach($rs->result() as $row){
                $data[]=array
                (
                    "idcont"=>$row->idcont,
                    "valtotalcont"=>$row->valtotalcont,
                    "numerodoc"=>$row->numerodoc,
                    "tipodocventa"=>$row->tipodocventa
                     
                );
            }
        }
        return array
        (
            "success"=>$flag,
            "data"=>$data
        );
    }

    function listaDetalleContratoPorContrato($arreglo){
        $rs=$this->db->query
        (
            "select * from om_general.cp_tb_contratodet d inner join om_general.cp_tb_documentos_venta  v 
on d.idcont=v.idcontrato inner join om_general.cp_tb_producto p on d.idprod=p.idprod

where d.idcont='".$arreglo["idcont"]."'"
        );
        $flag=false;
        $data=array();
        if($rs->num_rows()>0){
            $flag=true;
            foreach($rs->result() as $row){
                $data[]=array
                (
                    "idcont"=>$row->idcont,
                    "idprod"=>$row->idprod,
                    "precio"=>$row->precio,
                    "desprod"=>$row->desprod,
                    "tipodocventa"=>$row->tipodocventa,
                    "numerodoc"=>$row->numerodoc
                );
                    
            }
        }

        return array
        (
            "success"=>$flag,
            "data"=>$data
        );
    }


}
