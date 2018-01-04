<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_mantenimiento extends CI_Model
{
    function __construct() {parent::__construct();}

      function ListarTipoMoneda(){
            $sql = cadena_pg('fx_tipo_moneda_listar',0,'om_general');
            $param = array();
            $resultado = $this->db->query($sql,$param);
            $data['sucess']=true;
            $data['total'] = $resultado->num_rows();
            $data['items'] = $resultado->result();
            return $data;
      }
      function ActualizarTipoMoneda($id,$descripcion,$simbolo,$tipocambio){
            $sql = cadena_pg('fx_tipo_moneda_actualizar',4,'om_general');
            $param = array(
                  esNumeroCero($id),
                  $descripcion,
                  $simbolo,
                  esNumeroCero($tipocambio)
            );
            $resultado = $this->db->query($sql,$param);
            $data['sucess']=true;
            $data['items'] = $resultado->result();
            return $data;
      }
      function EliminarTipoMoneda($id){
            $sql = cadena_pg('fx_tipo_moneda_eliminar',1,'om_general');
            $param = array(
                  esNumeroCero($id)
            );
            $resultado = $this->db->query($sql,$param);
            $data['items'] = $resultado->result();
            return $data;
      }

      function ListarDocumentosInternos(){
            $sql = cadena_pg('fx_documentos_internos_listar',0,'om_general');
            $param = array();
            $resultado = $this->db->query($sql,$param);
            $data['sucess']=true;
            $data['total'] = $resultado->num_rows();
            $data['items'] = $resultado->result();
            return $data;
      }



      function ActualizarDocumentosInternos($id,$idsede,$anio,$tipo,$numero,$serie){
            $sql = cadena_pg('fx_documentos_internos_actualizar',6,'om_general');
            $param = array(
                  esNumeroCero($id),
                  $idsede,
                  $anio,
                  $tipo,
                  $numero,
                  $serie
            );
            $resultado = $this->db->query($sql,$param);
            $data['items'] = $resultado->result();
            return $data;
      }
      function EliminarDocumentoInterno($id){
            $sql = cadena_pg('fx_documentos_internos_eliminar',1,'om_general');
            $param = array(
                  esNumeroCero($id)
            );
            $resultado = $this->db->query($sql,$param);
            $data['items'] = $resultado->result();
            return $data;
      }

      function ListarFormasPago(){
            $sql = cadena_pg('fx_forma_pago_listar',0,'om_general');
            $param = array();
            $resultado = $this->db->query($sql,$param);
            $data['sucess']=true;
            $data['total'] = $resultado->num_rows();
            $data['items'] = $resultado->result();
            return $data;
      }
      function ActualizarFormaPago($id,$descripcion){
            $sql = cadena_pg('fx_forma_pago_actualizar',2,'om_general');
            $param = array(
                  esNumeroCero($id),
                  $descripcion
            );
            $resultado = $this->db->query($sql,$param);
            $data['items'] = $resultado->result();
            return $data;
      }
      function EliminarFormaPago($id){
            $sql = cadena_pg('fx_forma_pago_eliminar',1,'om_general');
            $param = array(
                  esNumeroCero($id)
            );
            $resultado = $this->db->query($sql,$param);
            $data['items'] = $resultado->result();
            return $data;
      }

       function ListarTiketeras(){
            $sql = cadena_pg('fx_tiketera_lista',0,'om_general');
            $param = array();
            $resultado = $this->db->query($sql,$param);
            $data['sucess']=true;
            $data['total'] = $resultado->num_rows();
            $data['items'] = $resultado->result();
            return $data;
      }
      function ActualizarTiketera($id,$serie,$autorizacion,$correlativo,$tienda){
            $sql = cadena_pg('fx_tikerera_actualizar',5,'om_general');
            $param = array(
                  esNumeroCero($id),
                  $serie,
                  $autorizacion,
                  $correlativo,
                  $tienda
            );
            //print_r($param);die();
            $resultado = $this->db->query($sql,$param);
            $data['items'] = $resultado->result();
            return $data;
      }

}
