<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_compra extends CI_Model
{
    function __construct() {parent::__construct();}

    function ADO_Actualizar($id,$idproveedor,$fechaCompra,$numeroDocumento,$valorCompra,$valorIgv,$valorTotal,$usuario,$tipodoc
,$incluyeigv,$tipocambio,$sede){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_compra_actualizar("
            .esNumeroCero($id)
            .','.esNumeroCero($idproveedor)
            .','.esCadenaNulo($fechaCompra)
            .','.esCadenaNulo($numeroDocumento)
            .','.esNumeroNulo($valorCompra)
            .','.esNumeroNulo($valorIgv)
            .','.esNumeroNulo($valorTotal)
            .','.esCadenaNulo($usuario)
            .','.esCadenaNulo($tipodoc)
            .','.esNumeroNulo($incluyeigv)
            .','.esNumeroNulo($tipocambio)
            .','.esNumeroNulo($sede)
            .")");

        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    function listar(){
        $data['success'] = true;
        return $data;
    }

    function ADO_ActualizarDetalle($idcompra,$idproductos,$cantidades,$codbobinas,$precios,$mlineales){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_compradetalle_actualizar("
            .esNumeroCero($idcompra)
            .','.esCadenaNulo($idproductos)
            .','.esCadenaNulo($cantidades)
            .','.esCadenaNulo($precios)
            .")");

        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }
    function ADO_Listar_Filtrar($fechacompra,$nombreproveedor,$numerodocumento,$sede){
            $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_listar_filtro("
            .esCadenaNulo(invertir_fecha2($fechacompra))
            .','.esCadenaNulo($nombreproveedor)
            .','.esCadenaNulo($numerodocumento)
            .','.esNumeroCero($sede)
            .")");

        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }
    function ADO_Total_FiltroCompras($fechacompra,$nombreproveedor,$numerodocumento,$sede){
        $total = 0;

        $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_listar_filtro("
            .esCadenaNulo(invertir_fecha2($fechacompra))
            .','.esCadenaNulo($nombreproveedor)
            .','.esCadenaNulo($numerodocumento)
            .','.esNumeroCero($sede)
            .")");


        foreach ($resultado->result() as $row)
        {
            $total = $total + $row->total;
        }

        $data['success'] = true;
        $data['total'] = $total;

        return $data;
    }
      function ADO_Listar_Compras_Fechas($desde,$hasta,$sede){
            $param = esCadenaNulo($desde).",".esCadenaNulo($hasta).",".esNumeroCero($sede);
            $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_listar_fechas($param)");
            $data['items'] = $resultado->result();
            return $data;
      }
      function ADO_Cabezera_Compra($idcompra){
            $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_buscar_cab(".esNumeroCero($idcompra).")");
            $data['items'] = $resultado->result();
            return $data;
    }
    function ADO_Detalle_Compra($idcompra){

        $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_detalle("
            .esNumeroCero($idcompra).")");

        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }
    function ADO_Eliminar_Compra($idcompra,$usuario){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_compra_eliminar("
            .esNumeroCero($idcompra)
            .','.esCadenaNulo($usuario).")");

        $data['success'] = true;
        $data['items'] = $resultado->result();

        return $data;
    }

    function ADO_Compras_Stock_Actual(){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_stock_productos()");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    /* Reporte Pdf  */

     function ADO_Listar_FiltrarPdf($fechacompra,$nombreproveedor,$numerodocumento,$desde,$hasta,$sede){
       if($desde != '' && $hasta !=''){
            $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_listar_fechas("
                  .esCadenaNulo(invertir_fecha2($desde))
                  .','.esCadenaNulo(invertir_fecha2($hasta))
                  .','.esNumeroCero($sede).
                  ")");

       }else{
            $resultado = $this->db->query("SELECT * FROM om_general.fx_compras_listar_filtro("
                  .esCadenaNulo(invertir_fecha2($fechacompra))
                  .','.esCadenaNulo($nombreproveedor)
                  .','.esCadenaNulo($numerodocumento)
                  .','.esNumeroCero($sede)
                  .")");
       }
        return $resultado->result_array();
    }
      public function ADO_ListadoDeCajaHTML($fecha,$sede){
	      $param = esCadenaNulo($fecha).','.esNumeroCero($sede);
            $resultado = $this->db->query("SELECT * FROM om_general.fx_reporte_listado_caja_compras(".$param.")");
          	return $resultado->result_array();
	}


}
