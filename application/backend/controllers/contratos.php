<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contratos extends CI_Controller {

	function __construct() {
        parent::__construct();
        $this->load->model('Model_contrato');
  	}
	public function index(){}

	public function actualizar(){
		$_id 		= $this->input->post('pid', 0);
		$_fcontrato	= $this->input->post('pfcontrato', 0);
		$_persona	= $this->input->post('ppersona', 0);
		$_fentrega	= $this->input->post('pfentrega', 0);
		$_subtotal	= $this->input->post('psubtotal', 0);
		$_igvtot	= $this->input->post('pigvtot', 0);
		$_total 	= $this->input->post('ptotal', 0);
		$_pagcuenta	= $this->input->post('pacuenta', 0);
		$_iddise	= $this->input->post('piddise', 0);
		$_idvende	= $this->input->post('pidvende', 0);
		$_idtienda	= $this->input->post('pidtienda', 0);
		$_usuario	= $this->input->post('pusuario', 0);
                $_pagatodo  = $this->input->post('ppagatodo', 0);
                $_horafinal = $this->input->post('phorafinal', '');
                $_tipodoc   = $this->input->post('ptipodoc', '');
                $_idper     = $this->input->post('pidper', '');
                $_retension = $this->input->post('pretension', 0);
		$_idnotapedido = $this->input->post('pidnotapedido', 0);
		$_idformapago = $this->input->post('pidformapago', 0);
		$_pagocuenta1 = $this->input->post('ppagoacuenta1', 0);
		$_pagocuentafecha1 = $this->input->post('ppagoacuentafecha1', 0);
		$_pagocuenta2 = $this->input->post('ppagoacuenta2', 0);
		$_pagocuentafecha2 = $this->input->post('ppagoacuentafecha2', 0);
		$_pagocuenta3 = $this->input->post('ppagoacuenta3', 0);
		$_pagocuentafecha3 = $this->input->post('ppagoacuentafecha3', 0);
		$_tipomoneda = $this->input->post('ptipomoneda', 0);
		$_numerorecibohonorario =  $this->input->post('pnumerorecibohonorario', 0);

		$_idmedcirujano =  $this->input->post('idmedcirujano', 0);
		$_idvendedor    =  $this->input->post('idvendedor', 0);
		$_idproveedor   =  $this->input->post('idproveedor', 0);
		$_idmedexterno   =  $this->input->post('idmedexterno', 0);



		$rs = $this->Model_contrato->ADO_Actualizar($_id,$_fcontrato,$_persona,$_fentrega,$_subtotal,$_igvtot,$_total,$_pagcuenta,$_iddise,$_idvende,
		$_idtienda,$_usuario,$_pagatodo,$_horafinal,$_tipodoc,$_idper,$_idnotapedido,$_retension,$_idformapago,$_pagocuenta1,$_pagocuentafecha1,$_pagocuenta2,$_pagocuentafecha2,$_pagocuenta3,$_pagocuentafecha3,$_tipomoneda,$_numerorecibohonorario,
		$_idmedcirujano,$_idvendedor,$_idproveedor,$_idmedexterno
	);
		echo json_encode($rs);
	}
	public function actualizardetalle(){
		$_id  			= $this->input->post('pid', 0);
		$_idcontrato	= $this->input->post('pcontrato', 0);
		$_idproductos	= $this->input->post('pproductos', 0);
		$_cantidades	= $this->input->post('pcantidades', 0);
		$_medidas1		= $this->input->post('pmedidas1', 0);
		$_medidas2		= $this->input->post('pmedidas2', 0);
		$_precios		= $this->input->post('pprecios', 0);
        $_materiales    = $this->input->post('pmateriales', 0);
        $_bobinas       = $this->input->post('pbobinas', 0);
        $_operarios     = $this->input->post('poperarios', 0);
        $_observaciones = $this->input->post('observaciones', '');
        $_textoitems    = $this->input->post('textoitems', '');


        $rs = $this->Model_contrato->ADO_ActualizarDetalle($_id,$_idcontrato,$_idproductos,$_cantidades,$_medidas1,$_medidas2,$_precios,$_materiales,$_bobinas,$_operarios,$_observaciones,$_textoitems);
		echo json_encode($rs);
	}
	public function listarcontratos(){
        $_idcontrato = $this->input->get('pidcontrato',0);
        $_cliente = $this->input->get('pcliente',null);
        $_estado = $this->input->get('pestado',0);
       // $_fecha = $this->input->get('pfecha',null);
	  $_desde = $this->input->get('pdesde',null);
	  $_hasta = $this->input->get('phasta',null);
		$_sede  = $this->input->get('psede',0);

        if($_idcontrato == 0 && $_cliente == null && $_estado == 0 && $_desde == null && $_hasta ==null)
		    $rs = $this->Model_contrato->ADO_ListarContratos($_sede);
        else if($_desde !=null && $_hasta !=null){
			$rs = $this->Model_contrato->ADO_ListarContratos_RagoFechas($_desde,$_hasta,$_sede);
		}else{
			$rs = $this->Model_contrato->ADO_ListarContratosFiltro($_idcontrato,$_cliente, $_estado,null,$_sede);
		}
		echo json_encode($rs);
	}

  //@ contratos Notas
	public function listarcontratosnotas(){
        $_idcontrato 	= $this->input->get('pidcontrato',0);
        $_cliente 		= $this->input->get('pcliente',null);
        $_estado 			= $this->input->get('pestado',0);
       // $_fecha = $this->input->get('pfecha',null);
	  		$_desde 			= $this->input->get('pdesde',null);
	  		$_hasta 			= $this->input->get('phasta',null);
				$_sede  			= $this->input->get('psede',0);

        if($_idcontrato == 0 && $_cliente == null && $_estado == 0 && $_desde == null && $_hasta ==null)
		    	$rs = $this->Model_contrato->ADO_ListarContratosNotas($_sede);
        else if($_desde !=null && $_hasta !=null){
					$rs = $this->Model_contrato->ADO_ListarContratos_RagoFechasNotas($_desde,$_hasta,$_sede);
		}else{
			$rs = $this->Model_contrato->ADO_ListarContratosFiltroNotas($_idcontrato,$_cliente, $_estado,null,$_sede);
		}
		echo json_encode($rs);
	}

	//@ contratos honorarios
	public function listarcontratoshonorarios(){
				$_idcontrato 	= $this->input->get('pidcontrato',0);
				$_cliente 		= $this->input->get('pcliente',null);
				$_estado 			= $this->input->get('pestado',0);
			 // $_fecha = $this->input->get('pfecha',null);
				$_desde 			= $this->input->get('pdesde',null);
				$_hasta 			= $this->input->get('phasta',null);
				$_sede  			= $this->input->get('psede',0);

				if($_idcontrato == 0 && $_cliente == null && $_estado == 0 && $_desde == null && $_hasta ==null)
					$rs = $this->Model_contrato->ADO_ListarContratosHonorarios($_sede);
				else if($_desde !=null && $_hasta !=null){
					$rs = $this->Model_contrato->ADO_ListarContratos_RagoFechasHonorarios($_desde,$_hasta,$_sede);
		}else{
			$rs = $this->Model_contrato->ADO_ListarContratosFiltroHonorarios($_idcontrato,$_cliente, $_estado,null,$_sede);
		}
		echo json_encode($rs);
	}

	public function listardetallecontrato(){
		$_idcontrato = $this->input->get('idcontra',0);
		$rs = $this->Model_contrato->ADO_ListarDetalleContrato($_idcontrato);
		echo json_encode($rs);

	}
    public function listardetallecontratoregbobina(){
        $_idcontrato = $this->input->get('idcontra',0);
        $rs = $this->Model_contrato->ADO_ListarDetalleContratoRegBobina($_idcontrato);
        echo json_encode($rs);

    }

    public function actualizardetallebobina(){
		$_idcontrato    = $this->input->post('piddet',0);
		$_bobina  		= $this->input->post('pbobina',0);
        $_orden         = $this->input->post('porden',0);
        $_operario      = $this->input->post('poperario',0);
		$_usuario 	    = 'EERAZO';
		$rs = $this->Model_contrato->ADO_ActualizarDetalleBobina($_idcontrato,$_bobina,$_usuario,$_orden,$_operario);
		echo json_encode($rs);

	}
    public function listartotalescontrato(){
        $_idcontrato = $this->input->post('idcontra',0);
        $rs = $this->Model_contrato->ADO_ListarTotalesDeContrato($_idcontrato);
        echo json_encode($rs);
    }
    public function eliminarcontrato(){
        $_idcontrato = $this->input->post('idcontra',0);
        $rs = $this->Model_contrato->ADO_EliminarContrato($_idcontrato,'EERAZO');
        echo json_encode($rs);
    }
    public function actualizardocumentoventa(){
        $_iddocventa = $this->input->post('piddocventa',0);
        $_idcontrato = $this->input->post('pidcontrato',0);
        $_tipodoc    = $this->input->post('ptipodoc','');
        $_sw         = $this->input->post('psw','');
        $_usuario    = $this->input->post('pusuario','');
        $_numerodoc  = $this->input->post('pnumerodoc','');

        $rs = $this->Model_contrato->ADO_ActualizarContrato( $_iddocventa,$_idcontrato,$_tipodoc,$_sw,$_usuario,$_numerodoc);
        echo json_encode($rs);
    }
    public function existebobina(){
        $codigobobina    = $this->input->post('pbobina','');
        $rs = $this->Model_contrato->ADO_ExisteBobina($codigobobina);
        echo json_encode($rs);
    }

    public function buscarcontratocab(){
        $idcontrato    = $this->input->post('pidcontrato',0);
        $rs = $this->Model_contrato->ADO_BuscarContratoCab($idcontrato);
        echo json_encode($rs);
    }
    public function buscarcontratodet(){
        $idcontrato    = $this->input->post('pidcontrato',0);
        $rs = $this->Model_contrato->ADO_ListarDetalleContrato($idcontrato);
        echo json_encode($rs);
    }
    public function buscarcontratosfechasvendedor(){
        $desde    = $this->input->get('pdesde','');
        $hasta    = $this->input->get('phasta','');
        $idvendedor    = $this->input->get('pidvendedor',0);
        $idtienda      = $this->input->get('pidtienda',0);
        $tipocancel      = $this->input->get('ptipocancel',0);

        $rs = $this->Model_contrato->ADO_ContratoBuscarFechasVendedor($desde,$hasta,$idvendedor,$idtienda,$tipocancel);
        echo json_encode($rs);
    }
    public function clienteactualizar(){
        $idcontrato = $this->input->post('pidcontrato',0);
        $nombres    = $this->input->post('pnombres',0);
        $numruc     = $this->input->post('pnumruc',0);
        $rs = $this->Model_contrato->ADO_ClienteActualizar($idcontrato, $nombres, $numruc);
        echo json_encode($rs);
    }
	public function tienenotapedido(){
		$_idpersona = $this->input->post('pidpersona',0);
		$rs = $this->Model_contrato->ADO_TieneNotaPedido($_idpersona);
		echo json_encode($rs);
	}
	public function listarnotasdepedido(){
		$_idpersona = $this->input->get('pidpersona',0);
		$rs = $this->Model_contrato->ADO_BuscarNotaDePedidoCliente($_idpersona);
		echo json_encode($rs);
	}

    public function listarformapago(){
        $rs = $this->Model_contrato->ADO_ListarFormaPago();
        echo json_encode($rs);
    }

}
