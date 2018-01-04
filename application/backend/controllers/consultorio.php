<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Consultorio extends CI_Controller {

    function __construct() {parent::__construct();$this->load->model('model_consultorio');}

    public function index(){}
    public function actualizar(){

        $id = $this->input->post('vid');
        $idcita= $this->input->post('vidcita');
        $fecha= $this->input->post('vfecha');
        $idmed= $this->input->post('vidmed');
        $proximacita= $this->input->post('vproximacita');
        $diagnostico= $this->input->post('vdiagnostico');
        $tratamiento= $this->input->post('vtratamiento');
        $usuario= $this->input->post('vusuario');
        $sw= $this->input->post('vsw');

        $data  = json_encode($this->model_consultorio->actualizar(esNumeroCero($id),esNumeroCero($idcita),$fecha,$idmed,$proximacita,$diagnostico,$tratamiento,$usuario,$sw));
        $this->output
        ->set_content_type('application/json')
        ->set_status_header(200)
        ->set_output($data);
    }

    public function refraccionactualizarojoizquierdo()
    {
        $id = $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsultorio');
        $fecha= $this->input->post('vfecha');
        $esfera= $this->input->post('vesfera');
        $cilindro= $this->input->post('vcilindro');
        $eje= $this->input->post('veje');
        $dip_l= $this->input->post('vdip_l');
        $dip_c= $this->input->post('vdip_c');
        $av= $this->input->post('vav');
        $adiccion= $this->input->post('vadiccion');
        $obser1= $this->input->post('vobser1');
        $obser2= $this->input->post('vobser2');
        $idmed= $this->input->post('vidmed');
        $usuario= $this->input->post('vusuario');

        $data  = json_encode($this->model_consultorio->refraccion_actualizar_ojo_izquierdo($id,$idconsultorio,$fecha,$esfera,$cilindro,$eje,$dip_l,$dip_c,$av,$adiccion,$obser1,$obser2,$idmed,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }

    public function refraccionactualizarojoderecho()
    {
        $id = $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsultorio');
        $fecha= $this->input->post('vfecha');
        $esfera= $this->input->post('vesfera');
        $cilindro= $this->input->post('vcilindro');
        $eje= $this->input->post('veje');
        $dip_l= $this->input->post('vdip_l');
        $dip_c= $this->input->post('vdip_c');
        $av= $this->input->post('vav');
        $adiccion= $this->input->post('vadiccion');
        $obser1= $this->input->post('vobser1');
        $obser2= $this->input->post('vobser2');
        $idmed= $this->input->post('vidmed');
        $usuario= $this->input->post('vusuario');

        $data  = json_encode($this->model_consultorio->refraccion_actualizar_ojo_derecho($id,$idconsultorio,$fecha,$esfera,$cilindro,$eje,$dip_l,$dip_c,$av,$adiccion,$obser1,$obser2,$idmed,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);

    }
    /*---------------------------------------------------*/
    public function lentecontactoactualizarojoizquierdo()
    {
        $id = $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsultorio');
        $fecha= $this->input->post('vfecha');
        $esfera= $this->input->post('vesfera');
        $cilindro= $this->input->post('vcilindro');
        $eje= $this->input->post('veje');
        $radio= $this->input->post('vradio');
        $potencia= $this->input->post('vpotencia');
        $diametro= $this->input->post('vdiametro');
        $curva= $this->input->post('vcurva');
        $tipo= $this->input->post('vtipo');
        $proximarevision= $this->input->post('vproximarevision');
        $obser= $this->input->post('vobser');
        $idmed= $this->input->post('vidmed');
        $usuario= $this->input->post('vusuario');

        $data  = json_encode($this->model_consultorio->lentecontacto_actualizar_ojo_izquierdo($id,$idconsultorio,$fecha,$esfera,$cilindro,$eje,$radio,$potencia,$diametro,$curva,$tipo,$obser,$idmed,$proximarevision,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }

    public function lentecontactoactualizarojoderecho()
    {
        $id = $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsultorio');
        $fecha= $this->input->post('vfecha');
        $esfera= $this->input->post('vesfera');
        $cilindro= $this->input->post('vcilindro');
        $eje= $this->input->post('veje');
        $radio= $this->input->post('vradio');
        $potencia= $this->input->post('vpotencia');
        $diametro= $this->input->post('vdiametro');
        $curva= $this->input->post('vcurva');
        $tipo= $this->input->post('vtipo');
        $proximarevision= $this->input->post('vproximarevision');
        $obser= $this->input->post('vobser');
        $idmed= $this->input->post('vidmed');
        $usuario= $this->input->post('vusuario');

        $data  = json_encode($this->model_consultorio->lentecontacto_actualizar_ojo_derecho($id,$idconsultorio,$fecha,$esfera,$cilindro,$eje,$radio,$potencia,$diametro,$curva,$tipo,$obser,$idmed,$proximarevision,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);

    }
    /*-------------------------------------------------------*/
   public function biomicroscopiaactualizar(){
       $id = $this->input->post('vid');
       $idconsultorio= $this->input->post('vidconsul');
       $conductolagrimal= $this->input->post('vconductolagrimal');
       $cantidadlagrima= $this->input->post('vcantidadlagrima');
       $testshirmer= $this->input->post('vtestshimer');
       $preparadoestado= $this->input->post('vpreparadoestado');
       $tosis= $this->input->post('vtosis');
       $posion= $this->input->post('vposion');
       $conjuntiva= $this->input->post('vconjuntiva');
       $cornea= $this->input->post('vcornea');
       $cristalinocod= $this->input->post('vcristalinocod');
       $cristalinodes= $this->input->post('vcristalinodes');
       $iridocorneal= $this->input->post('viridocorneal');
       $esclerotica= $this->input->post('vesclerotica');
       $iris= $this->input->post('viris');
       
       $txtpio_od=  $this->input->post("vtxtpio_od");
       $txtpio_id=  $this->input->post("vtxtpio_id");
       
       $usuario= $this->input->post('vusuario');

       $data = json_encode($this->model_consultorio->actualizar_biomicroscopia($id,$idconsultorio,$conductolagrimal,$cantidadlagrima,$testshirmer,$preparadoestado,$tosis,$posion,$conjuntiva,$cornea,$cristalinocod,$cristalinodes,$iridocorneal,$esclerotica,$iris,$txtpio_od,$txtpio_id,$usuario));
       $this->output
           ->set_content_type('application/json')
           ->set_status_header(200)
           ->set_output($data);
   }
    public function historiaactualizar(){
        $id = $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsul');
        $anamnesis= $this->input->post('vanamnesis');
        $usagafas= $this->input->post('vusagafas');
        $progresion= $this->input->post('vprogresion');
        $enferoculares= $this->input->post('venferocular');
        $hf_estrabismo = $this->input->post('vhf_estrabismo');
        $hf_leucoma= $this->input->post('vhf_leucoma');
        $hf_glaucoma= $this->input->post('vhf_glaucoma');
        $hf_hiperart= $this->input->post('vhf_hiperart');
        $hf_catarata= $this->input->post('vhf_catarata');
        $hf_ojoseco= $this->input->post('vhf_ojoseco');
        $hf_diabetes= $this->input->post('vhf_diabetes');
        $azucar= $this->input->post('vazucar');
        $hipertension= $this->input->post('vhipertension');
        $tratamiento= $this->input->post('vtratamiento');
        $alergias= $this->input->post('valergias');
        $ultimarevision= $this->input->post('vultimarevision');
        $recomendado= $this->input->post('vrecomendado');
        $ap_estrabismo= $this->input->post('vap_estrabismo');
        $ap_leucoma= $this->input->post('vap_leucoma');
        $ap_glaucoma= $this->input->post('vap_glaucoma');
        $ap_hiperart= $this->input->post('vap_hiperart');
        $ap_ojoseco= $this->input->post('vap_ojoseco');
        $ap_catarataod= $this->input->post('vap_catarataod');
        $ap_catarataoi=  $this->input->post("vap_catarataoi");
        $ap_diabetes= $this->input->post('vap_diabetes');
        $txt_historia_otros_ap_otros=  $this->input->post("vtxt_historia_otros_ap_otros");
        $tipocristal= $this->input->post('vtipocristal');
        $medcetrocristales= $this->input->post('vmedcentrocristales');
        $prisma= $this->input->post('vprisma');
        $adiccion= $this->input->post('vadiccion');
        $agudezavisual= $this->input->post('vagudezavisual');
        
        
        $ojodere_sc=  $this->input->post("vojodere_sc");
        $ojodere_cc=  $this->input->post("vojodere_cc");
        $ojodere_ae=  $this->input->post("vojodere_ae");
        
        $ojoizq_sc=  $this->input->post("vojoizq_sc");
        $ojoizq_cc=  $this->input->post("vojoizq_cc");
        $ojoizq_ae=  $this->input->post("vojoizq_ae");
        
        $ultimarefraccion_od=  $this->input->post("vultimarefraccion_od");
        $ultimarefraccion_oi=  $this->input->post("vultimarefraccion_oi");
        $ultimarefraccion_add=  $this->input->post("vultimarefraccion_add");
        
        $usuario= $this->input->post('vusuario');

       $data = json_encode($this->model_consultorio->actualizar_historia($id,$idconsultorio,$anamnesis,$usagafas,$progresion,$enferoculares,$hf_estrabismo ,$hf_leucoma,$hf_glaucoma,$hf_hiperart,$hf_catarata,$hf_ojoseco,
            $hf_diabetes, $azucar,$hipertension,$tratamiento,$alergias,$ultimarevision,$recomendado,$ap_estrabismo,$ap_leucoma,$ap_glaucoma,$ap_hiperart,$ap_ojoseco,$ap_catarataod,$ap_catarataoi,
            $ap_diabetes,$tipocristal,$medcetrocristales,$prisma,$adiccion,$agudezavisual,$usuario,$ojodere_sc,$ojodere_cc,$ojodere_ae, $ojoizq_sc,$ojoizq_cc,$ojoizq_ae,$ultimarefraccion_od,$ultimarefraccion_oi,$ultimarefraccion_add,$txt_historia_otros_ap_otros));
       $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }

    public function oftalmoscopiaactualizar(){
        $id= $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsul');
        $papila= $this->input->post('vpapila');
        $macula= $this->input->post('vmacula');
        $vasosanguineos= $this->input->post('vvasosanguineo');
        $color= $this->input->post('vcolor');
        $preflejoforeal= $this->input->post('vrefrejoforeal');
        $mediosrefractivos= $this->input->post('vmediosrefractivos');
        $retinaperiferica= $this->input->post('vretinaperiferica');
        $retinacentral= $this->input->post('vretinacentral');
        $relacioncd= $this->input->post('vrelacioncd');
        
        $papila2= $this->input->post('vpapila2');
        $macula2= $this->input->post('vmacula2');
        $vasosanguineos2= $this->input->post('vvasosanguineo2');
        $color2= $this->input->post('vcolor2');
        $preflejoforeal2= $this->input->post('vrefrejoforeal2');
        $mediosrefractivos2= $this->input->post('vmediosrefractivos2');
        $retinaperiferica2= $this->input->post('vretinaperiferica2');
        $retinacentral2= $this->input->post('vretinacentral2');
        $relacioncd2= $this->input->post('vrelacioncd2');
        
        
        
        $usuario= $this->input->post('vusuario');

        $data = json_encode($this->model_consultorio->actualizar_oftalmoscopia($id,$idconsultorio,$papila,$macula,$vasosanguineos,$color,$preflejoforeal,$mediosrefractivos,$retinaperiferica,$retinacentral,$relacioncd,$papila2,$macula2,$vasosanguineos2,$color2,$preflejoforeal2,$mediosrefractivos2,$retinaperiferica2,$retinacentral2,$relacioncd2,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }
    public function diagnosticoactualizar(){

        /*vidconsul : idconsulta,
        vdiagnostico : Ext.getCmp('txtDiagnosticoDiagnostico').getValue(),
        vtratamiento : Ext.getCmp('txtDiagnosticoTratamiento').getValue(),
        vproximacita : Ext.getCmp('dfDiagnosticoProximaCita').getValue(),
    */

        $id= $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsul');
        $diagnostico= $this->input->post('vdiagnostico');
        $tratamiento= $this->input->post('vtratamiento');
        $proximacita= $this->input->post('vproximacita');
        $usuario= $this->input->post('vusuario');

        $data = json_encode($this->model_consultorio->actualizar_diagnostico($id,$idconsultorio,$diagnostico,$tratamiento,$proximacita,$usuario));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }
    public function dipaddactualizar(){
      $id=$this->input->post("vid");
      $idconsultorio=$this->input->post("vidconsul");
      $vdip_cerca=$this->input->post("vdip_cerca");
      $vdip_lejos=$this->input->post("vdip_lejos");
      $vadd_cerca=$this->input->post("vadd_cerca");
      $vobservacion=$this->input->post("vobservacion");
      $agudezavisual=  $this->input->post("vagudezavisual");
      $refraciclo_od=  $this->input->post("vrefraciclo_od");
      $refraciclo_oi= $this->input->post("vrefraciclo_oi");
      $usuario= $this->input->post('vusuario');

      $arreglo=array
      (
        "id"=>$id,
        "idconsultorio"=>$idconsultorio,
        "vdip_cerca"=>$vdip_cerca,
        "vdip_lejos"=>$vdip_lejos,
        "vadd_cerca"=>$vadd_cerca,
        "vobservacion"=>$vobservacion,
        "vagudezavisual"=>$agudezavisual,
        "vrefraciclo_od"=>$refraciclo_od,
        "vrefraciclo_oi"=>$refraciclo_oi,
        "usuario"=>$usuario
      );

      $data=json_encode($this->model_consultorio->actualizar_dipadd($arreglo));
       $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);



    }

    public function restoactualizar(){
        $id= $this->input->post('vid');
        $idconsultorio= $this->input->post('vidconsul');
        $pupilas_iguales = $this->input->post('vpupilas_iguales');
        $pupilas_redondas= $this->input->post('vpupilas_redondas');
        $pupilas_responden= $this->input->post('vpupilas_responden');
        $pupilas_acomodacion= $this->input->post('vpupilas_acomodacion');
        $motilidadocular= $this->input->post('vmotilidadocular');
        $puntoconvergencia= $this->input->post('vpuntocovergencia');
        $cover_esotropia= $this->input->post('vcover_esotropia');
        $cover_exotropia= $this->input->post('vcover_exotropia');
        $cover_esoforia= $this->input->post('vcover_esoforia');
        $cover_exoforia= $this->input->post('vcover_exoforia');
        $cover_hipertropia= $this->input->post('vcover_hipertropia');
        $cover_hipotropia= $this->input->post('vcover_hipotropia');
        $tonometria_odcod= $this->input->post('vtonometria_odcod');
        $tonometria_oddes= $this->input->post('vtonometria_oddes');
        $tonometria_oicod= $this->input->post('vtonometria_oicod');
        $tonometria_oides= $this->input->post('vtonometria_oides');
        $visioncolores= $this->input->post('vvisioncolores');
        $prismavertical= $this->input->post('vprismavertical');
        $suprimealgunojo= $this->input->post('vsuprimealgunojo');
        $fusionaimagenes = $this->input->post('vfusionaimagenes');
        $lucesworth= $this->input->post('vlucesworth');
        $stereopsis= $this->input->post('vstereopsis');
        $retiniana_normal= $this->input->post('vretiniana_normal');
        $retiniana_falsa= $this->input->post('vretiniana_falsa');
        $rejilla_ojoderecho= $this->input->post('vrejilla_ojoderecho');
        $rejilla_ojoizquierdo= $this->input->post('vrejilla_ojoizquierdo');
        $confrontacion_od_normal= $this->input->post('vconfrontacion_od_normal');
        $confrontacion_od_disminuido= $this->input->post('vconfrontacion_od_disminuido');
        $confrontacion_oi_normal= $this->input->post('vconfrontacion_oi_normal');
        $confrontacion_oi_disminuido= $this->input->post('vconfrontacion_oi_disminuido');
        $ishijara_otros_test=  $this->input->post("vishijara_otros_test");
        $segundos_otros_test_esteriopsis=  $this->input->post("vsegundos_otros_test_esteriopsis");
        $usuario= $this->input->post('vusuario');

        $data = json_encode($this->model_consultorio->actualizar_resto($id,$idconsultorio,$pupilas_iguales ,$pupilas_redondas,$pupilas_responden,$pupilas_acomodacion,$motilidadocular,$puntoconvergencia,$cover_esotropia,
            $cover_exotropia,$cover_esoforia,$cover_exoforia,$cover_hipertropia,$cover_hipotropia,$tonometria_odcod,$tonometria_oddes,$tonometria_oicod,$tonometria_oides,
            $visioncolores,$prismavertical,$suprimealgunojo,$fusionaimagenes ,$lucesworth,$stereopsis,$retiniana_normal,$retiniana_falsa,$rejilla_ojoderecho,$rejilla_ojoizquierdo,
            $confrontacion_od_normal,$confrontacion_od_disminuido,$confrontacion_oi_normal,$confrontacion_oi_disminuido,$usuario,$ishijara_otros_test,$segundos_otros_test_esteriopsis));
        $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output($data);
    }
    /*
      Metodos para edirar consulta medica.
    */

    public function refracciondatos()
     {
         $idcita = $this->input->post('vidcita');
         $ojo = $this->input->post('vojo');
         $data  = json_encode($this->model_consultorio->refraccion_datos($idcita,$ojo));
         $this->output
              ->set_content_type('application/json')
              ->set_status_header(200)
              ->set_output($data);
     }
     public function lentecontactodatos()
      {
          $idcita = $this->input->post('vidcita');
          $ojo = $this->input->post('vojo');
          $data  = json_encode($this->model_consultorio->lentecontato_datos($idcita,$ojo));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
      public function historiadatos()
      {
          $idcita = $this->input->post('vidcita');
          $data  = json_encode($this->model_consultorio->historia_datos($idcita));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
       public function historiadatosanterior()
      {
          $idpersona = $this->input->post('vidpersona');
          $data  = json_encode($this->model_consultorio->historia_datos_anterior($idpersona));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
      public function biomicroscopiadatos()
      {
          $idcita = $this->input->post('vidcita');
          $data  = json_encode($this->model_consultorio->biomicroscopia_datos($idcita));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
      public function restodatos()
      {
          $idcita = $this->input->post('vidcita');
          $data  = json_encode($this->model_consultorio->resto_datos($idcita));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
      public function oftalmoscopiadatos()
      {
          $idcita = $this->input->post('vidcita');
          $data  = json_encode($this->model_consultorio->oftalmoscopia_datos($idcita));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
      public function diagnosticodatos()
      {
          $idcita = $this->input->post('vidcita');
          $data  = json_encode($this->model_consultorio->diagnostico_datos($idcita));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }
      public function dipaddodatos(){
          $idcita = $this->input->post('vidcita');
          $data  = json_encode($this->model_consultorio->dipadd_datos($idcita));
          $this->output
               ->set_content_type('application/json')
               ->set_status_header(200)
               ->set_output($data);
      }

}
