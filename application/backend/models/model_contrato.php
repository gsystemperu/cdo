<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_contrato extends CI_Model {
	function __construct() {parent::__construct();}

   function ADO_Actualizar($_id, $_fcontrato,$_persona,$_fentrega,$_subtotal,$_igvtot,$_total,$_pagcuenta,
                            $_iddise,$_idvende,$_idtienda,$_usuario,$_pagatodo,$_horafinal,$_tipodoc,$_idper,$_idnotapedido,$_retension,
$_idformapago,$_pagocuenta1,$_pagocuentafecha1,$_pagocuenta2,$_pagocuentafecha2,$_pagocuenta3,$_pagocuentafecha3,$_tipomoneda,$_numerorecibohonorario,
$_idmedcirujano,$_idvendedor,$_idproveedor, $_idmedexterno){
        	 $reciboHono = explode("-", $_numerorecibohonorario);

	    $resultado = $this->db->query("SELECT * FROM om_general.fx_contrato_actualizar("
             .esNumeroNulo($_id)
   	    .','.esCadenaNulo(strtoupper($_fcontrato))
   	    .','.esCadenaNulo(strtoupper($_persona))
   	    .','.esCadenaNulo(strtoupper($_fentrega))
   	    .','.esNumeroNulo($_subtotal)
   	    .','.esNumeroNulo($_igvtot)
   	    .','.esNumeroNulo($_total)
   	    .','.esNumeroNulo($_pagcuenta)
   	    .','.esNumeroNulo($_iddise)
   	    .','.esNumeroNulo($_idvende)
   	    .','.esNumeroNulo($_idtienda)
   	    .','.esCadenaNulo($_usuario)
   	    .','.esCadenaNulo($_pagatodo)
   	    .','.esCadenaNulo($_horafinal)
   	    .','.esCadenaNulo($_tipodoc)
   	    .','.esNumeroCero($_idper)
   	    .','.esNumeroCero($_idnotapedido)
   	    .','.esNumeroCero($_retension)
	    .','.esNumeroCero($_idformapago)
	    .','.esNumeroCero($_pagocuenta1)
	    .','.esCadenaNulo($_pagocuentafecha1)
	    .','.esNumeroCero($_pagocuenta2)
	    .','.esCadenaNulo($_pagocuentafecha2)
          .','.esNumeroCero($_pagocuenta3)
	    .','.esCadenaNulo($_pagocuentafecha3)
	    .','.esNumeroCero($_tipomoneda)
			.','.esCadenaNulo($reciboHono[0])
			.','.esCadenaNulo($reciboHono[1])
			.','.esNumeroCero($_idmedcirujano)
			.','.esNumeroCero($_idvendedor)
			.','.esNumeroCero($_idproveedor)
			.','.esNumeroCero($_idmedexterno)
	    .")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    function ADO_ListaTiketeraPorSede($arreglo){
        $sql="select * from om_general.cp_tb_tiketera where idtienda='".$arreglo["idtienda"]."'";
				$rs= $this->db->query($sql);
        $data["success"]=TRUE;
        $data["total"]=$rs->num_rows();
        $data["items"]=$rs->result();
        return $data;

    }
    function ADO_ListaPersonaPorId($arreglo){
        $sql="select * from om_general.cp_tb_persona where idper='".$arreglo["idper"]."'";
        $rs=  $this->db->query($sql);
        $data["success"]=true;
        $data['total'] = $rs->num_rows();
        $data['items'] = $rs->result();
        return $data;
    }
    function ADO_ListarDocumentoPorcontrato($arreglo){
        $sql="select  id,idcontrato,tipodocventa,usucrea,to_char(fechacrea,'dd/mm/YYYY HH12:MI AM') fechacrea,numerodoc  from om_general.cp_tb_documentos_venta where idcontrato='".$arreglo["idcontrato"]."'";
        $rs=  $this->db->query($sql);
        $data["success"]=true;
        $data['total'] = $rs->num_rows();
        $data['items'] = $rs->result();
        return $data;
    }

    function ADO_ActualizarDetalle($_id,$_idcontrato,$_idproductos,$_cantidades,$_medidas1,
        $_medidas2,$_precios,$_materiales,$_bobinas,$_operarios,$_observaciones,$_textoitems){

        $resultado = $this->db->query("SELECT * FROM om_general.fx_contratodetalle_actualizar("
            .esNumeroNulo($_idcontrato)
            .','.esCadenaNulo($_idproductos)
            .','.esCadenaNulo($_cantidades)
          	.','.esCadenaNulo($_precios)
         	.",".esCadenaNulo($_observaciones)
        	.")");

        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }
    public function ADO_ListarContratos($sede){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado($sede)");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
		//@@ contratos notas
		public function ADO_ListarContratosNotas($sede){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_nota($sede)");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }

		//@@ contratos honorarios
		public function ADO_ListarContratosHonorarios($sede){
				$resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_honorario($sede)");
				$data['success'] = true;
				$data['total'] = $resultado->num_rows();
				$data['items'] = $resultado->result();
				return $data;
		}

    public function ADO_ListarDetalleContrato($_idcontrato){
        $resultado = $this->db->query("SELECT * FROM  om_general.fx_contrato_listar_detalle(".esCadenaNulo($_idcontrato).")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_ListarDetalleContratoRegBobina($_idcontrato){
        $resultado = $this->db->query("SELECT * FROM  om_general.fx_contrato_listar_detalle2(".esCadenaNulo($_idcontrato).")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }

    public function ADO_ActualizarDetalleBobina($_id,$_bobina,$_usuario,$_orden,$_operario){
        $param = $_id
        .','.esCadenaNulo($_bobina)
        .','.esCadenaNulo($_usuario)
        .','.esNumeroCero($_orden)
        .','.esNumeroCero($_operario);

        /*echo "SELECT * FROM  om_general.fx_contrato_detalle_bobina(".$param.")";
        die();*/
        $resultado = $this->db->query("SELECT * FROM  om_general.fx_contrato_detalle_bobina(".$param.")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_ListarTotalesDeContrato($_idcontrato){
        $resultado = $this->db->query("SELECT * FROM  om_general.fx_contrato_listar_totales(".esCadenaNulo($_idcontrato).")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_EliminarContrato($_idcontrato,$_usuario){
        $param =esNumeroNulo($_idcontrato)
            .','.esCadenaNulo($_usuario);
        $resultado = $this->db->query("SELECT * FROM  om_general.fx_contrato_eliminar(".$param.")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }

    public function ADO_ActualizarContrato($_id,$_idcontrato,$_tipodoc,$_sw,$_usuario,$_numerodoc){
        $param =esNumeroCero($_id)
        .','.esNumeroNulo($_idcontrato)
        .','.esCadenaNulo($_tipodoc)
        .','.esNumeroCero($_sw)
        .','.esCadenaNulo($_usuario)
        .','.esCadenaNulo($_numerodoc);

        $resultado = $this->db->query("SELECT * FROM  om_general.fx_documentoventa_actualizar(".$param.")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_ContratoCabecera($_idcontrato){
        $param =esNumeroCero($_idcontrato);
        $resultado = $this->db->query("SELECT * FROM om_general.fx_venta_cabecera(".$param.")");
        return $resultado->result_array();
    }
    public function ADO_ContratoCabeceraHtml($_idcontrato){
        $param =esNumeroCero($_idcontrato);
        $resultado = $this->db->query("SELECT * FROM om_general.fx_venta_cabecera(".$param.")");
        return $resultado->result();
    }

    public function ADO_ContratoDetalle($_idcontrato){
        $param =esNumeroCero($_idcontrato);
        $resultado = $this->db->query("SELECT * FROM om_general.fx_venta_detalle(".$param.")");
        return $resultado->result_array();
    }
    public function ADO_ContratoDetalleHtml($_idcontrato){
        $param =esNumeroCero($_idcontrato);
        $resultado = $this->db->query("SELECT * FROM om_general.fx_venta_detalle(".$param.")");
        return $resultado->result();
    }
    public function ADO_ListarContratosFiltro($_idcontrato,$_cliente, $_estado,$_fecha,$_sede){
        //SELECT * FROM om_general.fx_contratos_listado_filtro(0,NULL,2)
        $param =esCadenaNulo($_idcontrato)
        .','.esCadenaNulo($_cliente)
        .','.esNumeroCero($_estado)
        .','.esCadenaNulo(invertir_fecha2($_fecha)
				.','.esNumeroCero($_sede)
			);

        $resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_filtro(".$param.")");
        return $resultado->result_array();
    }
		//@ Listado Contratos Filtro Notas
		public function ADO_ListarContratosFiltroNotas($_idcontrato,$_cliente, $_estado,$_fecha,$_sede){
				//SELECT * FROM om_general.fx_contratos_listado_filtro(0,NULL,2)
				$param =esCadenaNulo($_idcontrato)
				.','.esCadenaNulo($_cliente)
				.','.esNumeroCero($_estado)
				.','.esCadenaNulo(invertir_fecha2($_fecha)
				.','.esNumeroCero($_sede)
			);

				$resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_filtro_nota(".$param.")");
				return $resultado->result_array();
		}

		//@ Listado Contratos Filtro honorarios
		public function ADO_ListarContratosFiltroHonorarios($_idcontrato,$_cliente, $_estado,$_fecha,$_sede){
				//SELECT * FROM om_general.fx_contratos_listado_filtro(0,NULL,2)
				$param =esCadenaNulo($_idcontrato)
				.','.esCadenaNulo($_cliente)
				.','.esNumeroCero($_estado)
				.','.esCadenaNulo(invertir_fecha2($_fecha)
				.','.esNumeroCero($_sede)
			);

				$resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_filtro_honorario(".$param.")");
				return $resultado->result_array();
		}

    public function ADO_ExisteBobina($codigobobina){
        $sw='';

        $resultado = $this->db->query("SELECT * FROM om_general.fx_exite_bobina_codigo(".esCadenaNulo($codigobobina).")");

        foreach ($resultado->result() as $row){$sw = $row->sw;}
        $data['success'] = true;
        $data['existe'] = $sw;
        return $data;
    }

    public function ADO_BuscarContratoCab($idcontrato){
        $param =esNumeroCero($idcontrato);
				$resultado = $this->db->query("SELECT * FROM om_general.fx_contrato_cabecera(".$param.")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_BuscarContratoDet($idcontrato){
        $param =esNumeroCero($idcontrato);
        $resultado = $this->db->query("SELECT * FROM om_general.fx_contrato_detalle(".$param.")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_ContratoBuscarFechasVendedor($desde,$hasta,$idvendedor,$idtienda,$tipocancel){
        $param =esCadenaNulo($desde)
        .','.esCadenaNulo($hasta)
        .','.esNumeroCero($idvendedor)
        .','.esNumeroCero($idtienda)
        .','.esNumeroCero($tipocancel);

        $resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_busquedas(".$param.")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }
    public function ADO_ContratoBuscarFechasVendedorHrml($desde,$hasta,$idvendedor,$idtienda,$tipocancel){
           if($desde !='' && $hasta !=''){
               $param = esCadenaNulo(invertir_fecha2($desde))
                   .','.esCadenaNulo(invertir_fecha2($hasta))
                   .','.esNumeroCero($idvendedor)
                   .','.esNumeroCero($idtienda)
                   .','.esNumeroCero($tipocancel);
           }else{

               $param = esCadenaNulo($desde)
                   .','.esCadenaNulo($hasta)
                   .','.esNumeroCero($idvendedor)
                   .','.esNumeroCero($idtienda)
                   .','.esNumeroCero($tipocancel);
           }



        $resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_busquedas(".$param.")");
        return $resultado->result_array();
    }

     public function ADO_TiendasListado(){
        $resultado = $this->db->query("SELECT * FROM om_general.cp_tb_tiendas WHERE estado =1");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();
        return $data;
    }

    public function ADO_ClienteActualizar($idcontrato, $nombres, $numruc){
        $param = esNumeroCero($idcontrato)
        .','.esCadenaNulo($nombres)
        .','.esCadenaNulo($numruc);
        $resultado  = $this->db->query("SELECT * FROM om_general.fx_venta_cliente_actualizar(".$param.")");
        $data['success'] = true;
        $data['items'] = $resultado->result();
        return $data;

    }
	public function ADO_TieneNotaPedido($idpersona){
	  $resultado  = $this->db->query("SELECT * FROM  om_general.fx_tiene_nota_pedido($idpersona)");
        return $resultado->result();
	}
	public function ADO_BuscarNotaDePedidoCliente($idpersona){
	  	$resultado  = $this->db->query("SELECT * FROM  om_general.fx_buscar_nota_pedido_cab($idpersona)");
 		$data['success'] = true;
 		$data['items'] = $resultado->result();
	  	return $data;
	}

    public function ADO_ListarFormaPago(){
        $resultado  = $this->db->query("SELECT * FROM  om_general.fx_forma_pago_listar()");
        $data['success'] = true;
        $data['items'] = $resultado->result();
        return $data;
    }

	  public function ADO_ListarContratos_RagoFechas($desde,$hasta,$sede){
		$param = esCadenaNulo($desde).','.esCadenaNulo($hasta).','.esNumeroCero($sede);
		$resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_rango_fechas(".$param.")");
            $data['success'] = true;
            $data['total'] = $resultado->num_rows();
            $data['items'] = $resultado->result();
            return $data;
    }
		//@@ Listado contratos notas fechas
		public function ADO_ListarContratos_RagoFechasNotas($desde,$hasta,$sede){
		$param = esCadenaNulo($desde).','.esCadenaNulo($hasta).','.esNumeroCero($sede);
		$resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_rango_fechas_nota(".$param.")");
            $data['success'] = true;
            $data['total'] = $resultado->num_rows();
            $data['items'] = $resultado->result();
            return $data;
    }

		//@@ Listado contratos Fechas honorarios
		public function ADO_ListarContratos_RagoFechasHonorarios($desde,$hasta,$sede){
		$param = esCadenaNulo($desde).','.esCadenaNulo($hasta).','.esNumeroCero($sede);
		$resultado = $this->db->query("SELECT * FROM om_general.fx_contratos_listado_rango_fechas_honorario(".$param.")");
						$data['success'] = true;
						$data['total'] = $resultado->num_rows();
						$data['items'] = $resultado->result();
						return $data;
		}


	public function ADO_ListadoDeCajaHTML($fecha,$sede){
          $param = esCadenaNulo($fecha).','.esNumeroCero($sede);
          $resultado = $this->db->query("SELECT * FROM om_general.fx_reportes_listado_caja(".$param.")");
          return $resultado->result_array();
	}
	public function ADO_TiendaNombre($sede){
		 $resultado = $this->db->query("SELECT * FROM om_general.cp_tb_tiendas WHERE estado =1 and idtienda=".$sede);
		 return $resultado->result_array();
 }

 public function ADO_PagoMedico($sede,$medico,$desde,$hasta){
	  $param = esNumeroCero($sede)
		.','.esNumeroCero($medico)
		.','.esCadenaNulo($desde)
        .','.esCadenaNulo($hasta);
        //echo "SELECT * FROM om_general.sp_pago_medico ($param)";die();
		$resultado = $this->db->query("SELECT * FROM om_general.sp_pago_medico (". $param .")" );
		return $resultado->result_array();
	}

}
