<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_trabajador extends CI_Model {
	private $table;
	private $table_fields;
	private $schema;

    function __construct() {parent::__construct(); }
    function ADO_Listar_Trabajadores($_id, $_paterno,$_materno,$_nombres,$_limit, $_start){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_trabajador_buscar("
            .esNumeroNulo($_id)
            .','.esCadenaNulo(strtoupper($_paterno))
            .','.esCadenaNulo(strtoupper($_materno))
            .','.esCadenaNulo(strtoupper($_nombres))
            .','.esNumeroNulo($_limit)
            .','.esNumeroNulo($_start).")");

        $cant = 0;
        if($resultado->num_rows() > 0) {
            $rows = $resultado->result_array();
                foreach ($rows as $row) {$cant = $row['registros']; break; }
            }
        $data['success'] = true;
     	$data['total']   = $cant;
     	$data['items']   = $resultado->result();

     	return $data;
    }

    function ADO_Listar_TrabajadoresHTML($_id, $_paterno,$_materno,$_nombres,$_limit, $_start){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_trabajador_buscar("
            .esNumeroNulo($_id)
            .','.esCadenaNulo(strtoupper($_paterno))
            .','.esCadenaNulo(strtoupper($_materno))
            .','.esCadenaNulo(strtoupper($_nombres))
            .','.esNumeroNulo($_limit)
            .','.esNumeroNulo($_start).")");

        return $resultado->result_array();
    }

    function ADO_Listar_TipoTrabajadores(){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_tipotrabajador_listar()");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }
    function ADO_Listar_TrabajadoresPorTipo($_tipo){
        $resultado = $this->db->query("SELECT * FROM om_general.fx_trabajar_listar_tipo(".esNumeroNulo($_tipo).")");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }

		function ADO_Listar_MedicosPorTipo($_tipo,$_titulo){
				$param = esNumeroNulo($_tipo)
				.','.esCadenaNulo($_titulo);
				$resultado = $this->db->query("SELECT * FROM om_general.fx_trabajar_listar_tipo(".$param.")");

				$data['success'] = true;
				$data['total'] = $resultado->num_rows();
				$data['items'] = $resultado->result();

				return $data;
		}

    function ADO_Listar_Tiendas(){
        $resultado = $this->db->query("SELECT * FROM  om_general.fx_tiendas_listar()");
        $data['success'] = true;
        $data['total'] = $resultado->num_rows();
        $data['items'] = $resultado->result();

        return $data;
    }
    function ADO_Actualizar_Tienda($parametros){
        $sql = "SELECT * FROM om_general.fx_tienda_actualizar(?,?,?,?)";
        $resultado = $this->db->query($sql,$parametros);
        $data['success'] = true;
        return  $data;
    }

    //select * from om_general.fx_trabajador_actualizar(4,'AAxxxx','AA','VVV','01/01/1980','F',1,'FLEX')
    function ADO_Actualizar_Trabajador($parametros){
        $sql = "SELECT * FROM om_general.fx_trabajador_actualizar(?,?,?,?,?,?,?,?)";
        $resultado = $this->db->query($sql,$parametros);
        $data['success'] = true;
        return  $data;
    }
    function ADO_Eliminar_Trabajador($parametros){
        $sql = "SELECT * FROM om_general.fx_trabajador_eliminar(?,?)";
        $resultado = $this->db->query($sql,$parametros);
        $data['success'] = true;
        return  $data;
    }
    function ADO_Listar_Trabajador_Por_Id($arreglo){
        $this->db->select("idtra,paternotra||' '||maternotra||' '||nombretra as medico");
        $this->db->from("trabajador");
        $this->db->where(array("idtra"=>$arreglo["idtra"]));
        $rs=$this->db->get();
        $flag=false;
        $data=array();
        if($rs->num_rows()>0){
            $flag=true;
            $row=$rs->row();
            $data[]=array("idtra"=>$row->idtra,"medico"=>$row->medico);
        }
        return array
        (
            "success"=>$flag,
            "data"=>$data
        );
    }
    function ADO_Listar_Medico_Por_Sede_Y_Fecha_Cita($arreglo){
        /*
        $this->db->select("ci.idmed ,tra.paternotra||' '||tra.maternotra||' '||tra.nombretra as medico ");
        $this->db->from("om_general.cp_tb_citas ci");
        $this->db->join("om_general.cp_tb_trabajador tra","ci.idmed=tra.idtra");
        $this->db->where("ci.fechacita between '2016-03-26' and '2016-03-26'");
        $this->db->group_by("ci.idmed,tra.paternotra,tra.maternotra,tra.nombretra");
        $this->db->order_by("ci.idmed","asc");
        $rs=$this->db->get();
        */

        $rs=$this->db->query
        (
            "select ci.idmed ,tra.paternotra||' '||tra.maternotra||' '||tra.nombretra as medico
            from om_general.cp_tb_citas ci inner join om_general.cp_tb_trabajador tra on
            ci.idmed=tra.idtra inner join om_general.cp_tb_contrato co on
            ci.idper=co.idper where ci.fechacita between '".$arreglo["fechadel"]."' and '".$arreglo["fechaal"]."'
            and ci.idsede='".$arreglo["sedeid"]."'
            group by ci.idmed,tra.paternotra,tra.maternotra,tra.nombretra
            order by ci.idmed asc"
        );
        $flag=false;
        $data=array();
        if($rs->num_rows()>0){
            $flag=true;
            foreach($rs->result() as $row){
                $data[]=array
                (
                    "idmed"=>$row->idmed,
                    "medico"=>$row->medico
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
