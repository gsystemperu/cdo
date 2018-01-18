<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Model_consultorio extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function actualizar($id, $idcita, $fecha, $idmed, $proximacita, $diagnostico, $tratamiento, $usuario,$sw) {
        $param = esNumeroCero($id)
                . ',' . esNumeroCero($idcita)
                . ',' . esCadenaNulo($fecha)
                . ',' . esCadenaNulo($idmed)
                . ',' . esCadenaNulo($proximacita)
                . ',' . esCadenaNulo($diagnostico)
                . ',' . esCadenaNulo($tratamiento)
                . ',' . esCadenaNulo(strtoupper($usuario))
                . ',' . esNumeroCero($sw);

        $sql = "SELECT * FROM om_general.fx_consultorio_actualizar(" . $param . ")";
        $resultado = $this->db->query($sql);
        $data['items'] = $resultado->result();
        return $data;
    }

    function refraccion_actualizar_ojo_derecho($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $dip_l, $dip_c, $av, $adiccion, $obser1, $obser2, $idmed, $usuario) {
        $sql = "SELECT * FROM om_general.fx_consultorio_refraccion_actualizar_od(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $dip_l, $dip_c, $av, $adiccion, $obser1, $obser2, $idmed, $usuario);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function refraccion_actualizar_ojo_izquierdo($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $dip_l, $dip_c, $av, $adiccion, $obser1, $obser2, $idmed, $usuario) {
        $sql = "SELECT * FROM om_general.fx_consultorio_refraccion_actualizar_oi(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $dip_l, $dip_c, $av, $adiccion, $obser1, $obser2, $idmed, $usuario);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function lentecontacto_actualizar_ojo_derecho($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $radio, $potencia, $diametro, $curva, $tipo, $obser, $idmed, $proximarevision, $usuario) {
        $sql = "SELECT * FROM om_general.fx_consultorio_lentecontacto_actualizar_od(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $radio, $potencia, $diametro, $curva, $tipo, $obser, $idmed, $proximarevision, $usuario);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function lentecontacto_actualizar_ojo_izquierdo($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $radio, $potencia, $diametro, $curva, $tipo, $obser, $idmed, $proximarevision, $usuario) {
        $sql = "SELECT * FROM om_general.fx_consultorio_lentecontacto_actualizar_oi(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $fecha, $esfera, $cilindro, $eje, $radio, $potencia, $diametro, $curva, $tipo, $obser, $idmed, $proximarevision, $usuario);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function actualizar_biomicroscopia($id, $idconsultorio, $conductolagrimal, $cantidadlagrima, $testshirmer, $preparadoestado, $tosis, $posion, $conjuntiva, $cornea, $cristalinocod, $cristalinodes, $iridocorneal, $esclerotica, $iris,$txtpio_od,$txtpio_id,$usuario) {
        $sql = "SELECT * FROM om_general.fx_consultorio_biomicroscopia_actualizar(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $conductolagrimal, $cantidadlagrima, $testshirmer, $preparadoestado, $tosis, $posion, $conjuntiva, $cornea, $cristalinocod, $cristalinodes, $iridocorneal, $esclerotica, $iris,$txtpio_od,$txtpio_id ,$usuario);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function actualizar_historia($id, $idconsultorio, $anamnesis, $usagafas, $progresion, $enferoculares, $hf_estrabismo, $hf_leucoma, $hf_glaucoma, $hf_hiperart, $hf_catarata, $hf_ojoseco, $hf_diabetes, $azucar, $hipertension, $tratamiento, $alergias, $ultimarevision, $recomendado, $ap_estrabismo, $ap_leucoma, $ap_glaucoma, $ap_hiperart, $ap_ojoseco, $ap_catarataod,$ap_catarataoi, $ap_diabetes, $tipocristal, $medcetrocristales, $prisma, $adiccion, $agudezavisual, $usuario,$ojodere_sc,$ojodere_cc,$ojodere_ae, $ojoizq_sc,$ojoizq_cc,$ojoizq_ae,$ultimarefraccion_od,$ultimarefraccion_oi,$ultimarefraccion_add,$txt_historia_otros_ap_otros) {
        $sql = "SELECT * FROM om_general.fx_consultorio_historia_actualizar(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $anamnesis, $usagafas, $progresion, $enferoculares, $hf_estrabismo, $hf_leucoma, $hf_glaucoma, $hf_hiperart, $hf_catarata, $hf_ojoseco,
            $hf_diabetes, $azucar, $hipertension, $tratamiento, $alergias, $ultimarevision, $recomendado, $ap_estrabismo, $ap_leucoma, $ap_glaucoma, $ap_hiperart, $ap_ojoseco, $ap_catarataod,$ap_catarataoi,
            $ap_diabetes, $tipocristal, $medcetrocristales, $prisma, $adiccion, $agudezavisual, $usuario,$ojodere_sc,$ojodere_cc,$ojodere_ae, $ojoizq_sc,$ojoizq_cc,$ojoizq_ae,$ultimarefraccion_od,$ultimarefraccion_oi,$ultimarefraccion_add,$txt_historia_otros_ap_otros);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function actualizar_oftalmoscopia($id, $idconsultorio, $papila, $macula, $vasosanguineos, $color, $preflejoforeal, $mediosrefractivos, $retinaperiferica, $retinacentral, $relacioncd,$papila2,$macula2,$vasosanguineos2,$color2,$preflejoforeal2,$mediosrefractivos2,$retinaperiferica2,$retinacentral2,$relacioncd2 ,$usuario) {
        $sql = "SELECT * FROM om_general.fx_consultorio_oftalmoscopia_actualizar(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $papila, $macula, $vasosanguineos, $color, $preflejoforeal, $mediosrefractivos, $retinaperiferica, $retinacentral, $relacioncd,$papila2,$macula2,$vasosanguineos2,$color2,$preflejoforeal2,$mediosrefractivos2,$retinaperiferica2,$retinacentral2,$relacioncd2 ,$usuario);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function actualizar_diagnostico($id, $idconsultorio, $diagnostico, $tratamiento, $proximacita, $usuario) {
        $param = esNumeroCero($id)
                . ',' . esNumeroCero($idconsultorio)
                . ',' . esCadenaNulo($diagnostico)
                . ',' . esCadenaNulo($tratamiento)
                . ',' . esCadenaNulo($proximacita)
                . ',' . esCadenaNulo($usuario);

        $sql = "SELECT * FROM om_general.fx_consultorio_diagnostico_actualizar(" . $param . ")";
        $param = array($id, $idconsultorio, $diagnostico, $tratamiento, $proximacita, $usuario);


        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function actualizar_dipadd($arreglo) {

        $param = esNumeroCero($arreglo["id"])
                . ',' . esNumeroCero($arreglo["idconsultorio"])
                . ',' . esCadenaNulo($arreglo["vdip_cerca"])
                . ',' . esCadenaNulo($arreglo["vdip_lejos"])
                . ',' . esCadenaNulo($arreglo["vadd_cerca"])
                . ',' . esCadenaNulo($arreglo["vobservacion"])
                . ',' . esCadenaNulo($arreglo["vagudezavisual"])
                . ',' . esCadenaNulo($arreglo["vrefraciclo_od"])
                . ',' . esCadenaNulo($arreglo["vrefraciclo_oi"])
                . ',' . esCadenaNulo($arreglo["usuario"]);

        $sql = "SELECT * FROM om_general.fx_consultorio_dipadd_actualizar(" . $param . ")";
        $param = array
            (
            $arreglo["id"], $arreglo["idconsultorio"], $arreglo["vdip_cerca"], $arreglo["vdip_lejos"], $arreglo["vadd_cerca"],$arreglo["vobservacion"],$arreglo["vagudezavisual"],$arreglo["vrefraciclo_od"],$arreglo["vrefraciclo_oi"],$arreglo["usuario"]
        );

        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function actualizar_resto($id, $idconsultorio, $pupilas_iguales, $pupilas_redondas, $pupilas_responden, $pupilas_acomodacion, $motilidadocular, $puntoconvergencia, $cover_esotropia, $cover_exotropia, $cover_esoforia, $cover_exoforia, $cover_hipertropia, $cover_hipotropia, $tonometria_odcod, $tonometria_oddes, $tonometria_oicod, $tonometria_oides, $visioncolores, $prismavertical, $suprimealgunojo, $fusionaimagenes, $lucesworth, $stereopsis, $retiniana_normal, $retiniana_falsa, $rejilla_ojoderecho, $rejilla_ojoizquierdo, $confrontacion_od_normal, $confrontacion_od_disminuido, $confrontacion_oi_normal, $confrontacion_oi_disminuido, $usuario,$ishijara_otros_test,$segundos_otros_test_esteriopsis) {
        $sql = "SELECT * FROM om_general.fx_consultorio_resto_actualizar(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $param = array($id, $idconsultorio, $pupilas_iguales, $pupilas_redondas, $pupilas_responden, $pupilas_acomodacion, $motilidadocular, $puntoconvergencia, $cover_esotropia,
            $cover_exotropia, $cover_esoforia, $cover_exoforia, $cover_hipertropia, $cover_hipotropia, $tonometria_odcod, $tonometria_oddes, $tonometria_oicod, $tonometria_oides,
            $visioncolores, $prismavertical, $suprimealgunojo, $fusionaimagenes, $lucesworth, $stereopsis, $retiniana_normal, $retiniana_falsa, $rejilla_ojoderecho, $rejilla_ojoizquierdo,
            $confrontacion_od_normal, $confrontacion_od_disminuido, $confrontacion_oi_normal, $confrontacion_oi_disminuido, $usuario,$ishijara_otros_test,$segundos_otros_test_esteriopsis);

        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    /* Datos */

    function refraccion_datos($idcita, $ojo) {
        $sql = "SELECT * FROM om_general.fx_refraccion_datos(?,?)";
        $param = array($idcita, $ojo);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function lentecontato_datos($idcita, $ojo) {
        $sql = "SELECT * FROM om_general.fx_lentecontacto_datos(?,?)";
        $param = array($idcita, $ojo);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function historia_datos($idcita) {
        $sql = "SELECT * FROM om_general.fx_historia_datos(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }
    function historia_datos_anterior($idpersona) {
        $sql = "SELECT * FROM om_general.fx_historia_datos_anterior(?)";
        $param = array($idpersona);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function biomicroscopia_datos($idcita) {
        $sql = "SELECT * FROM om_general.fx_biomicroscopia_datos(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function resto_datos($idcita) {
        $sql = "SELECT * FROM om_general.fx_resto_datos(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function oftalmoscopia_datos($idcita) {
        $sql = "SELECT * FROM om_general.fx_oftalmoscopia_datos(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function diagnostico_datos($idcita) {
        $sql = "SELECT * FROM om_general.fx_diagnostico_datos(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

    function dipadd_datos($idcita) {
        $sql = "SELECT * FROM om_general.fx_dipadd_datos(?)";
        $param = array($idcita);
        $resultado = $this->db->query($sql, $param);
        $data['items'] = $resultado->result();
        return $data;
    }

}
