<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

require_once APPPATH . "/third_party/fpdf/fpdf.php";
require_once APPPATH . "/libraries/export-xls.class.php";

class Reportes extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->library('pdf_js');
        $this->load->model('model_trabajador');
        $this->load->model('model_cita');
        $this->load->model('model_producto');
        $this->load->model('model_contrato');
        $this->load->model('model_consultorio');
        $this->load->model('model_compra');
        $this->load->model("model_tienda");
        $this->load->model("model_cliente");

        //$this->load->library('Pdf');
    }

    public function index() {

    }

    public function tienda() {
        $rs = $this->model_tienda->ADO_Listar_Tiendas();
    }

    public function imprimirdocumentoventafactura($_idcontrato) {

        $borde = 0;
        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
        $direccionsede = $this->model_tienda->ADO_Listar_Tiendas(array("sedeid" => $cab[0]->_idtienda));
        $documento = $this->model_contrato->ADO_ListarDocumentoPorcontrato(array("idcontrato" => $_idcontrato));
        $persona = $this->model_contrato->ADO_ListaPersonaPorId(array("idper" => $cab[0]->_idper));
        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
        $tiketera = $this->model_contrato->ADO_ListaTiketeraPorSede( array("idtienda" => $cab[0]->_idtienda) );

        //$pdf=new FPDF();
        $pdf = new Pdf_js('P', 'mm', 'A4');
        $pdf->SetMargins(0, 0, 0);

        $pdf->AddPage();

        $pdf->setXY(6, 5);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(0, 5, "CLINICA DE OJOS COMPUTARIZADA OFTALMIC ", $borde, 2, "L");
        $pdf->Cell(0, 5, "LASER EIRL", $borde, 2, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(55, 5, $direccionsede["data"][0]["direccion"], $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(6);
        $pdf->Cell(10, 5, "R.U.C : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, "20509201197", $borde, 2, "L");
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 7);
        // $pdf->Cell(65, 5, "AUTORIZACION ", $borde, 2, "L");
        $pdf->Cell(35, 5, "AUTORIZACION #MAQ. REG. :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, $tiketera["items"][0]->nroautorizacion, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(6);

        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(38, 5, "DESCRIPCION", $borde, 0, "L");
        $pdf->Cell(7, 5, "CANT", $borde, 0, "L");
        $pdf->Cell(10, 5, "P.UNI.", $borde, 0, "R");
        $pdf->Cell(10, 5, "IMP.", $borde, 2, "R");
        $pdf->setX(6);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        //$pdf->Ln(5);
        foreach ($det as $row) {
            $pdf->setX(6);
            $pdf->setFont("Arial", "", 7);
            $pdf->MultiCell(65, 4, $row->descripcion, $borde, "L");
            $pdf->setX(36);
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(7, 5, $row->cantidades, $borde, 0, "R");
            $pdf->Cell(14, 5, number_format($row->preciounitario, 2, ".", ","), $borde, 0, "R");
            $pdf->Cell(14, 5, number_format($row->preciounitario * $row->cantidades, 2, ".", ","), $borde, 1, "R");
        }
        $pdf->Ln(5);
        $pdf->setX(42);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(15, 5, "SubTotal :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(14, 5, number_format($cab[0]->subtotal, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(42);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(15, 5, "IGV :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(14, 5, number_format($cab[0]->igv, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(42);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(15, 5, "Total :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(14, 5, number_format($cab[0]->total, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(6);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(20, 5, "R.U.C : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(65, 5, $persona["items"][0]->numrucper, $borde, 2, "L");
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 8);
        //  $pdf->Cell(20, 5, "RAZON SOCIAL : ", $borde, 0, "L");
        $pdf->MultiCell(65, 4, $persona["items"][0]->razonsocial, $borde, "L");
        $pdf->setX(6);
        //    $pdf->Cell(20, 5, "DIRECCION : ", $borde, 0, "L");
        $pdf->MultiCell(65, 4, $persona["items"][0]->domiciper, $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 8);
        //$pdf->Cell(20, 5, date("d/m/Y  H:i"), $borde, 2, "L");
        $pdf->Cell(20, 5, $documento["items"][0]->fechacrea, $borde, 2, "L");

        $pdf->Cell(12, 5, "TICKET : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(4, 5, $documento["items"][0]->tipodocventa, $borde, 0, "L");
        $pdf->Cell(26, 5, $tiketera["items"][0]->serie, $borde, 0, "L");
        $pdf->Cell(30, 5, $documento["items"][0]->numerodoc, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(20);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(50, 5, utf8_decode ("¡GRACIAS POR SU COMPRA...!"), $borde, 2, "L");
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 6);
        $pdf->MultiCell(60, 5, utf8_decode( "UNA VEZ RECIBIDA LA MERCADERÍA NO SE ACEPTAN DEVOLUCIONES."), $borde, "L");
        $pdf->Ln(3);
        $pdf->setX(7);
        $pdf->Cell(12, 5, "USUARIO : ", $borde, 0, "L");
        $pdf->Cell(40, 5, $cab[0]->_usucrea, $borde, 0, "L");
        $pdf->AutoPrint(true);
        $pdf->output();


//        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
//        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
//        $data['rsCab'] = $cab;
//        $data['rsDet'] = $det;
//        $this->load->view('/reportes/documentoventa',$data);
    }

    public function imprimirdocumentoventafactura2($_idcontrato) {

        $borde = 0;
        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
        $direccionsede = $this->model_tienda->ADO_Listar_Tiendas(array("sedeid" => $cab[0]->_idtienda));
        $documento = $this->model_contrato->ADO_ListarDocumentoPorcontrato(array("idcontrato" => $_idcontrato));
        $persona = $this->model_contrato->ADO_ListaPersonaPorId(array("idper" => $cab[0]->_idper));
        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
        $tiketera = $this->model_contrato->ADO_ListaTiketeraPorSede($cab[0]->_idtienda);

        //$pdf=new FPDF();
        $pdf = new Pdf_js('P', 'mm', 'A4');
        $pdf->SetMargins(0, 0, 0);

        $pdf->AddPage();

        $pdf->setXY(0, 5);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(63, 5, "CONSULTORIOS OFTALMOLOGICOS", $borde, 2, "C");
        $pdf->setX(0);
        $pdf->Cell(63, 5, "DEL PERU S.A.C.", $borde, 2, "C");
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(63, 5, $direccionsede["data"][0]["direccion"], $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(0);
        $pdf->Cell(10, 5, "R.U.C : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, "20536583263", $borde, 2, "L");
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        // $pdf->Cell(65, 5, "AUTORIZACION ", $borde, 2, "L");
        $pdf->Cell(35, 5, "AUTORIZACION #MAQ. REG. :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, $tiketera["items"][0]->nroautorizacion, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(0);

        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(30, 5, "DESCRIPCION", $borde, 0, "L");
        $pdf->Cell(7, 5, "CANT", $borde, 0, "L");
        $pdf->Cell(12, 5, "P.UNI.", $borde, 0, "R");
        $pdf->Cell(12, 5, "IMP.", $borde, 2, "R");
        $pdf->setX(0);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        //$pdf->Ln(5);
        foreach ($det as $row) {
            $pdf->setX(0);
            $pdf->setFont("Arial", "", 7);
            $pdf->MultiCell(65, 4, $row->descripcion, $borde, "L");
            $pdf->setX(30);
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(7, 5, $row->cantidades, $borde, 0, "R");
            $pdf->Cell(12, 5, number_format($row->preciounitario, 2, ".", ","), $borde, 0, "R");
            $pdf->Cell(12, 5, number_format($row->preciounitario * $row->cantidades, 2, ".", ","), $borde, 1, "R");
        }
        $pdf->Ln(5);
        $pdf->setX(34);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(15, 5, "SubTotal :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(12, 5, number_format($cab[0]->subtotal, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(34);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(15, 5, "IGV :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(12, 5, number_format($cab[0]->igv, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(34);
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(15, 5, "Total :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(12, 5, number_format($cab[0]->total, 2, ".", ","), $borde, 2, "R");
        $pdf->setX(0);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        $pdf->setFont("Arial", "", 9);
        $pdf->Cell(20, 5, "R.U.C : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(65, 5, $persona["items"][0]->numrucper, $borde, 2, "L");
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 8);
        //  $pdf->Cell(20, 5, "RAZON SOCIAL : ", $borde, 0, "L");
        $pdf->MultiCell(65, 4, $persona["items"][0]->razonsocial, $borde, "L");
        $pdf->setX(0);
        //    $pdf->Cell(20, 5, "DIRECCION : ", $borde, 0, "L");
        $pdf->MultiCell(65, 4, $persona["items"][0]->domiciper, $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 8);
        //$pdf->Cell(20, 5, date("d/m/Y  H:i"), $borde, 2, "L");
        $pdf->Cell(40, 5, $documento["items"][0]->fechacrea, $borde, 2, "L");

        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(15, 5, "SERIE : ", $borde, 0, "L");
        $pdf->Cell(45, 5, $tiketera["items"][0]->serie, $borde, 1, "L");
        $pdf->setX(0);
        $pdf->Cell(18, 5, "TICKET : ", $borde, 0, "L");

        $pdf->Cell(4, 5, $documento["items"][0]->tipodocventa, $borde, 0, "C");

        $pdf->Cell(30, 5, $documento["items"][0]->numerodoc, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(63, 5, utf8_decode( "¡GRACIAS POR SU COMPRA...!"), $borde, 2, "C");
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 6);
        $pdf->MultiCell(63, 5,utf8_decode( "UNA VEZ RECIBIDA LA MERCADERÍA NO SE ACEPTAN DEVOLUCIONES."), $borde, "L");
        $pdf->Ln(3);
        $pdf->setX(0);
        $pdf->Cell(14, 5, "USUARIO : ", $borde, 0, "L");
        $pdf->Cell(40, 5, $cab[0]->_usucrea, $borde, 0, "L");
        $pdf->AutoPrint(true);
        $pdf->output();


//        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
//        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
//        $data['rsCab'] = $cab;
//        $data['rsDet'] = $det;
//        $this->load->view('/reportes/documentoventa',$data);
    }

    public function imprimirdocumentoventaboleta($_idcontrato) {

        $borde = 0;
        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
        $direccionsede = $this->model_tienda->ADO_Listar_Tiendas(array("sedeid" => $cab[0]->_idtienda));
        $documento = $this->model_contrato->ADO_ListarDocumentoPorcontrato(array("idcontrato" => $_idcontrato));
        $persona = $this->model_contrato->ADO_ListaPersonaPorId(array("idper" => $cab[0]->_idper));
        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
        $tiketera = $this->model_contrato->ADO_ListaTiketeraPorSede( array("idtienda"=> $cab[0]->_idtienda));

        //$pdf=new FPDF();
        $pdf = new Pdf_js('P', 'mm', 'A4');
        $pdf->AddPage();

        $pdf->setXY(6, 5);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(0, 5, "CLINICA DE OJOS COMPUTARIZADA OFTALMIC ", $borde, 2, "L");
        $pdf->Cell(0, 5, "LASER EIRL", $borde, 2, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(55, 5, $direccionsede["data"][0]["direccion"], $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(10, 5, "R.U.C : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, "20509201197", $borde, 2, "L");
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(35, 5, "AUTORIZACION #MAQ. REG. :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, $tiketera["items"][0]->nroautorizacion, $borde, 2, "L");
        $pdf->setX(6);
        $pdf->Ln(5);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(38, 5, "DESCRIPCION", $borde, 0, "L");
        $pdf->Cell(7, 5, "CANT", $borde, 0, "L");
        $pdf->Cell(10, 5, "P.UNI.", $borde, 0, "R");
        $pdf->Cell(10, 5, "IMP.", $borde, 2, "R");
        $pdf->setX(6);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        //$pdf->Ln(5);
        foreach ($det as $row) {
            $pdf->setX(6);
            $pdf->setFont("Arial", "", 7);
            $pdf->MultiCell(65, 4, $row->descripcion, $borde, "L");
            $pdf->setX(20);
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(7, 5, $row->cantidades, $borde, 0, "R");
            $pdf->Cell(12, 5, number_format($row->preciounitario, 2, ".", ","), $borde, 0, "R");
            $pdf->Cell(12, 5, number_format($row->preciounitario * $row->cantidades, 2, ".", ","), $borde, 1, "R");
        }
        $pdf->Ln(5);
        $pdf->setX(24);
        $pdf->Cell(15, 5, "Total :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(12, 5, number_format($cab[0]->total, 2, ".", ","), $borde, 2, "R");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(6);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        $pdf->Cell(20, 5, "D.N.I : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, $persona["items"][0]->numdocper, $borde, 2, "L");
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(20, 4, "CLIENTE : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(45, 4, $persona["items"][0]->paternoper . " " . $persona["items"][0]->maternoper . " " . $persona["items"][0]->nombreper, $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 8);
        //$pdf->Cell(24, 5, date("d/m/Y  H:i"), $borde, 2, "L");
        $pdf->Cell(20, 5, $documento["items"][0]->fechacrea, $borde, 2, "L");

        $pdf->Cell(12, 5, "TICKET : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(4, 5, $documento["items"][0]->tipodocventa, $borde, 0, "L");
        $pdf->Cell(26, 5, $tiketera["items"][0]->serie, $borde, 0, "L");
        $pdf->Cell(30, 5, $documento["items"][0]->numerodoc, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(20);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(50, 5, utf8_decode("¡GRACIAS POR SU COMPRA...!"), $borde, 2, "L");
        $pdf->setX(6);
        $pdf->setFont("Arial", "", 6);
        $pdf->MultiCell(60, 5, utf8_decode("UNA VEZ RECIBIDA LA MERCADERÍA NO SE ACEPTAN DEVOLUCIONES."), $borde, "L");
        $pdf->Ln(3);
        $pdf->setX(6);
        $pdf->Cell(12, 5, "USUARIO : ", $borde, 0, "L");
        $pdf->Cell(40, 5, $cab[0]->_usucrea, $borde, 0, "L");
        $pdf->AutoPrint(true);
        $pdf->output();

//        $borde = 0;
//        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
//        $direccionsede = $this->model_tienda->ADO_Listar_Tiendas(array("sedeid" => $cab[0]->_idtienda));
//        $documento = $this->model_contrato->ADO_ListarDocumentoPorcontrato(array("idcontrato" => $_idcontrato));
//        $persona = $this->model_contrato->ADO_ListaPersonaPorId(array("idper" => $cab[0]->_idper));
//        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
//
//        $pdf = new Pdf_js('P', 'mm', 'A4');
//        $pdf->AddPage();
//        $pdf->setXY(1, 5);
//        $pdf->setFont("Arial", "B", 6);
//        $pdf->Cell(65, 7, strtoupper("Clinica de Ojos Computarizada Oftalmic Laser EIRL"), $borde, 2, "L");
//        $pdf->Cell(65, 7, $direccionsede["data"][0]["direccion"], $borde, 2, "L");
//        $pdf->Cell(65, 7, "20509201197", $borde, 2, "L");
//        $pdf->Cell(5, 7, $documento["items"][0]->tipodocventa, $borde, 0, "L");
//        $pdf->Cell(25, 7, $documento["items"][0]->numerodoc, $borde, 2, "L");
//        $pdf->setX(1);
//        $pdf->Cell(65, 7, $persona["items"][0]->paternoper . " " . $persona["items"][0]->maternoper . " " . $persona["items"][0]->nombreper, $borde, 2, "L");
//        $pdf->Cell(65, 7, $persona["items"][0]->numdocper, $borde, 2, "L");
//        $pdf->Ln(5);
//        $pdf->setX(1);
//        $pdf->setFont("Arial", "B", 6);
//        foreach ($det as $row) {
//            $pdf->setX(1);
//            $pdf->Cell(51, 5, $row->descripcion, $borde, 0, "L");
//            $pdf->Cell(5, 5, $row->cantidades, $borde, 0, "L");
//            $pdf->Cell(10, 5, number_format($row->preciounitario * $row->cantidades, 2, ".", ","), $borde, 1, "L");
//        }
//        $pdf->Ln(5);
//        $pdf->setX(1);
//        $pdf->Cell(20, 5, date("d/m/Y"), $borde, 0, "L");
//        $pdf->setX(43);
//        $pdf->Cell(14, 5, "Total :", $borde, 0, "L");
//        $pdf->Cell(10, 5, number_format($cab[0]->total, 2, ".", ","), $borde, 2, "L");
//        $pdf->Ln(5);
//        $pdf->setX(15);
//        $pdf->Cell(50, 6, "�GRACIAS POR SU COMPRA...!", $borde, 2, "L");
//        $pdf->setX(1);
//        $pdf->setFont("Arial", "B", 5);
//        $pdf->Cell(50, 6, "UNA VEZ RECIBIDA LA MERCADER�A NO SE ACEPTAN DEVOLUCIONES.", $borde, 2, "L");
//        $pdf->AutoPrint(true);
//        $pdf->output();
    }

    public function imprimirdocumentoventaboleta2($_idcontrato) {

        $borde = 0;
        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
        $direccionsede = $this->model_tienda->ADO_Listar_Tiendas(array("sedeid" => $cab[0]->_idtienda));
        $documento = $this->model_contrato->ADO_ListarDocumentoPorcontrato(array("idcontrato" => $_idcontrato));
        $persona = $this->model_contrato->ADO_ListaPersonaPorId(array("idper" => $cab[0]->_idper));
        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
        $tiketera = $this->model_contrato->ADO_ListaTiketeraPorSede($cab[0]->_idtienda);

        //$pdf=new FPDF();
        $pdf = new Pdf_js('P', 'mm', 'A4');
        $pdf->AddPage();

        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(63, 5, "CONSULTORIOS OFTALMOLOGICOS", $borde, 2, "C");
        $pdf->Cell(63, 5, "DEL PERU S.A.C.", $borde, 2, "C");
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(63, 5, $direccionsede["data"][0]["direccion"], $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(10, 5, "R.U.C : ", $borde, 0, "L");
        $pdf->Cell(65, 5, "20536583263", $borde, 2, "L");
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(35, 5, "AUTORIZACION #MAQ. REG. :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, $tiketera["items"][0]->nroautorizacion, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(30, 5, "DESCRIPCION", $borde, 0, "L");
        $pdf->Cell(7, 5, "CANT", $borde, 0, "L");
        $pdf->Cell(12, 5, "P.UNI.", $borde, 0, "R");
        $pdf->Cell(12, 5, "IMP.", $borde, 2, "R");
        $pdf->setX(0);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        //$pdf->Ln(5);
        foreach ($det as $row) {
            $pdf->setX(0);
            $pdf->setFont("Arial", "", 7);
            $pdf->MultiCell(65, 4, $row->descripcion, $borde, "L");
            $pdf->setX(30);
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(7, 5, $row->cantidades, $borde, 0, "R");
            $pdf->Cell(12, 5, number_format($row->preciounitario, 2, ".", ","), $borde, 0, "R");
            $pdf->Cell(12, 5, number_format($row->preciounitario * $row->cantidades, 2, ".", ","), $borde, 1, "R");
        }
        $pdf->Ln(5);
        $pdf->setX(34);
        $pdf->Cell(15, 5, "Total :", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(12, 5, number_format($cab[0]->total, 2, ".", ","), $borde, 2, "R");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(0);
        $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
        $pdf->Cell(20, 5, "D.N.I : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 8);
        $pdf->Cell(65, 5, $persona["items"][0]->numdocper, $borde, 2, "L");
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(20, 4, "CLIENTE : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->MultiCell(45, 4, $persona["items"][0]->paternoper . " " . $persona["items"][0]->maternoper . " " . $persona["items"][0]->nombreper, $borde, "L");
        $pdf->setFont("Arial", "", 7);
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 8);
        //$pdf->Cell(24, 5, date("d/m/Y  H:i"), $borde, 2, "L");
        $pdf->Cell(63, 5, $documento["items"][0]->fechacrea, $borde, 2, "L");

        $pdf->Cell(15, 5, "SERIE : ", $borde, 0, "L");
        $pdf->Cell(45, 5, $tiketera["items"][0]->serie, $borde, 1, "L");
        $pdf->setX(0);
        $pdf->Cell(18, 5, "TICKET : ", $borde, 0, "L");
        $pdf->setFont("Arial", "", 10);
        $pdf->Cell(4, 5, $documento["items"][0]->tipodocventa, $borde, 0, "L");
        $pdf->Cell(30, 5, $documento["items"][0]->numerodoc, $borde, 2, "L");
        $pdf->Ln(5);
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 7);
        $pdf->Cell(63, 5, utf8_decode( "¡GRACIAS POR SU COMPRA...!"), $borde, 2, "C");
        $pdf->setX(0);
        $pdf->setFont("Arial", "", 6);
        $pdf->MultiCell(63, 5, "UNA VEZ RECIBIDA LA MERCADER�A NO SE ACEPTAN DEVOLUCIONES.", $borde, "C");
        $pdf->Ln(3);
        $pdf->setX(0);
        $pdf->Cell(14, 5, "USUARIO : ", $borde, 0, "L");
        $pdf->Cell(40, 5, $cab[0]->_usucrea, $borde, 0, "L");
        $pdf->AutoPrint(true);
        $pdf->output();

//        $borde = 0;
//        $cab = $this->model_contrato->ADO_ContratoCabeceraHtml($_idcontrato);
//        $direccionsede = $this->model_tienda->ADO_Listar_Tiendas(array("sedeid" => $cab[0]->_idtienda));
//        $documento = $this->model_contrato->ADO_ListarDocumentoPorcontrato(array("idcontrato" => $_idcontrato));
//        $persona = $this->model_contrato->ADO_ListaPersonaPorId(array("idper" => $cab[0]->_idper));
//        $det = $this->model_contrato->ADO_ContratoDetalleHtml($_idcontrato);
//
//        $pdf = new Pdf_js('P', 'mm', 'A4');
//        $pdf->AddPage();
//        $pdf->setXY(1, 5);
//        $pdf->setFont("Arial", "B", 6);
//        $pdf->Cell(65, 7, strtoupper("Clinica de Ojos Computarizada Oftalmic Laser EIRL"), $borde, 2, "L");
//        $pdf->Cell(65, 7, $direccionsede["data"][0]["direccion"], $borde, 2, "L");
//        $pdf->Cell(65, 7, "20509201197", $borde, 2, "L");
//        $pdf->Cell(5, 7, $documento["items"][0]->tipodocventa, $borde, 0, "L");
//        $pdf->Cell(25, 7, $documento["items"][0]->numerodoc, $borde, 2, "L");
//        $pdf->setX(1);
//        $pdf->Cell(65, 7, $persona["items"][0]->paternoper . " " . $persona["items"][0]->maternoper . " " . $persona["items"][0]->nombreper, $borde, 2, "L");
//        $pdf->Cell(65, 7, $persona["items"][0]->numdocper, $borde, 2, "L");
//        $pdf->Ln(5);
//        $pdf->setX(1);
//        $pdf->setFont("Arial", "B", 6);
//        foreach ($det as $row) {
//            $pdf->setX(1);
//            $pdf->Cell(51, 5, $row->descripcion, $borde, 0, "L");
//            $pdf->Cell(5, 5, $row->cantidades, $borde, 0, "L");
//            $pdf->Cell(10, 5, number_format($row->preciounitario * $row->cantidades, 2, ".", ","), $borde, 1, "L");
//        }
//        $pdf->Ln(5);
//        $pdf->setX(1);
//        $pdf->Cell(20, 5, date("d/m/Y"), $borde, 0, "L");
//        $pdf->setX(43);
//        $pdf->Cell(14, 5, "Total :", $borde, 0, "L");
//        $pdf->Cell(10, 5, number_format($cab[0]->total, 2, ".", ","), $borde, 2, "L");
//        $pdf->Ln(5);
//        $pdf->setX(15);
//        $pdf->Cell(50, 6, "�GRACIAS POR SU COMPRA...!", $borde, 2, "L");
//        $pdf->setX(1);
//        $pdf->setFont("Arial", "B", 5);
//        $pdf->Cell(50, 6, "UNA VEZ RECIBIDA LA MERCADER�A NO SE ACEPTAN DEVOLUCIONES.", $borde, 2, "L");
//        $pdf->AutoPrint(true);
//        $pdf->output();
    }

    public function imprimirficha_A4($idcita) {

        $paciente = $this->model_cita->datosDelPacientePorCita($idcita);
        $diagnostico = $this->model_cita->datosImpresionDiagnostico($idcita);
        $data["idper"] = $paciente["_idper"];
        $data["historiaclinica"] = $paciente["_historiaclinica"];
        $data['paciente'] = $paciente['_paciente'];
        $data['dni'] = $paciente['_numdoc'];
        $data['ruc'] = $paciente['_numruc'];
        $data["fechacita"] = $paciente["_fechacita"];
        $data['diagnostico'] = $diagnostico['diagnostico'];
        $data['tratamiento'] = $diagnostico['tratamiento'];
        $data['proximacita'] = $diagnostico['proximacita'];

        $borde = 0;
        $fpdf = new FPDF();
        $fpdf->AddPage();

        //LADO IZQUIERDO
        $fpdf->setXY(10, 0);
        $fpdf->Image("./application/frontend/images/oftamiclog.jpg", 10, 10);
        $fpdf->setFont("Arial", "B", 8);
        $fpdf->setXY(5, 70);
        $fpdf->Cell(65, 10, utf8_decode( "Av. Perú 3428 - S.M.P."), $borde, 0, "C");
        $fpdf->Ln(10);
        $fpdf->setX(5);
        $fpdf->Cell(65, 10, "Telef : 5682505", $borde, 0, "C");
        $fpdf->Ln(10);
        $fpdf->setX(5);
        $fpdf->Cell(65, 10, "Av. Carlos Izaguirre 752 - Los Olivos", $borde, 0, "C");
        $fpdf->Ln(10);
        $fpdf->setX(5);
        $fpdf->Cell(65, 10, "Telef : 5231844", $borde, 0, "C");


        //LADO DERECHO
        $fpdf->setXY(80, 5);
        //  $fpdf->cell(70);
        $fpdf->Cell(40, 10, "H.C : " . $data["historiaclinica"], $borde, 0);
        $fpdf->Cell(80, 10, "" . utf8_decode($data["paciente"]), $borde, 0);
        $fpdf->setXY(80, 15);
        $fpdf->Cell(10, 10, "Dx : ", $borde, 0);
        $fpdf->setXY(85, 25);
        $fpdf->MultiCell(110, 6, utf8_decode($data['diagnostico']), $borde);
        $fpdf->setXY(80, 55);
        $fpdf->Cell(10, 10, "Tx : ", $borde, 0);
        $fpdf->setXY(85, 65);
        $fpdf->MultiCell(110, 6, utf8_decode($data['tratamiento']), $borde);
        $fpdf->setXY(80, 135);
        $fpdf->Cell(60, 10, $data["fechacita"], $borde, 0);
        $fpdf->setXY(140, 135);
        $fpdf->Cell(60, 10, "Proxima Cita : " . $data['proximacita'], $borde, 0);


        $fpdf->output();
    }

    public function imprimirlentecontacto_A4($idcita) {

        $paciente = $this->model_cita->datosDelPacientePorCita($idcita);
        $detOD = $this->model_consultorio->lentecontato_datos($idcita, 'OD');
        $detOI = $this->model_consultorio->lentecontato_datos($idcita, 'OI');
        $detROD = $this->model_consultorio->refraccion_datos($idcita, 'OD');
        $detROI = $this->model_consultorio->refraccion_datos($idcita, 'OI');
        $dipadd = $this->model_consultorio->dipadd_datos($idcita);
        $diagnostico = $this->model_cita->datosImpresionDiagnostico($idcita);


        $data["idper"] = $paciente["_idper"];
        $data["historiaclinica"] = $paciente["_historiaclinica"];
        $data['paciente'] = $paciente['_paciente'];
        $data['dni'] = $paciente['_numdoc'];
        $data['ruc'] = $paciente['_numruc'];
        $data['fechacita'] = $paciente['_fechacita'];
        $data['rsDetOD'] = $detOD;
        $data['rsDetOI'] = $detOI;
        $data['rsDetROD'] = $detROD;
        $data['rsDetROI'] = $detROI;
        $data['diagnostico'] = $diagnostico['diagnostico'];
        $data['tratamiento'] = $diagnostico['tratamiento'];
        $data['proximacita'] = $diagnostico['proximacita'];
        $data["observacion"] = $diagnostico["observacion"];
        $data["_dip_lejos"] = $dipadd["items"][0]->_dip_lejos;
        $data["_dip_cerca"] = $dipadd["items"][0]->_dip_cerca;
        $data["_add_cerca"] = $dipadd["items"][0]->_add_cerca;
        $data["_observacion"] = $dipadd["items"][0]->_observacion;

        $borde = 0;
        $fpdf = new FPDF();
        $fpdf->AddPage();


        //LADO IZQUIERDO
        $fpdf->setXY(10, 0);
        $fpdf->Image("./application/frontend/images/oftamiclog.jpg", 10, 10);
        $fpdf->setFont("Arial", "B", 8);
        $fpdf->setXY(5, 70);
        $fpdf->Cell(65, 10, utf8_decode("Av. Perú 3428 - S.M.P."), $borde, 0, "C");
        $fpdf->Ln(10);
        $fpdf->setX(5);
        $fpdf->Cell(65, 10, "Telef : 5682505", $borde, 0, "C");
        $fpdf->Ln(10);
        $fpdf->setX(5);
        $fpdf->Cell(65, 10, "Av. Carlos Izaguirre 752 - Los Olivos", $borde, 0, "C");
        $fpdf->Ln(10);
        $fpdf->setX(5);
        $fpdf->Cell(65, 10, "Telef : 5231844", $borde, 0, "C");


        //LADO DERECHO
        $fpdf->setXY(80, 0);
        //  $fpdf->cell(70);
        $fpdf->Cell(40, 10, "H.C :" . $data["historiaclinica"], $borde, 0);
        $fpdf->Cell(80, 10, utf8_decode($data['paciente']), $borde, 0);

        $fpdf->setXY(80, 15);

        $fpdf->Cell(20, 8, "LENTES", 1, 0);
        $fpdf->Cell(15, 8, "ESF", 1, 0);
        $fpdf->Cell(15, 8, "CIL", 1, 0);
        $fpdf->Cell(15, 8, "EJE", 1, 0);
        $fpdf->Cell(15, 8, "DIP", 1, 1);

        $fpdf->setXY(80, 23);
        $fpdf->Cell(20, 7, "OD", 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetROD']['items'][0]->_esfera, 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetROD']["items"][0]->_cilindro, 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetROD']["items"][0]->_eje, 1, 0);
        $fpdf->Cell(15, 7, "LEJOS", 1, 1);

        $fpdf->setXY(80, 30);
        $fpdf->Cell(20, 7, "OI", 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetROI']["items"][0]->_esfera, 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetROI']["items"][0]->_cilindro, 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetROI']["items"][0]->_eje, 1, 0);
        $fpdf->Cell(15, 7, $data["_dip_lejos"], 1, 1);

        $fpdf->setXY(80, 37);
        $fpdf->Cell(20, 7, "OD", 1, 0);
        $fpdf->Cell(15, 7, "ADD", 1, 0);
        $fpdf->Cell(15, 7, $data["_add_cerca"], 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetOD']["items"][0]->_eje, 1, 0);
        $fpdf->Cell(15, 7, "CERCA", 1, 1);

        $fpdf->setXY(80, 44);
        $fpdf->Cell(20, 7, "OI", 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetOI']["items"][0]->_esfera, 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetOI']["items"][0]->_cilindro, 1, 0);
        $fpdf->Cell(15, 7, $data['rsDetOI']["items"][0]->_eje, 1, 0);
        $fpdf->Cell(15, 7, $data["_dip_cerca"], 1, 1);

        $fpdf->setXY(80, 53);
        $fpdf->Cell(20, 7, "Dx :", $borde, 0);
        $fpdf->setXY(85, 60);
        $fpdf->MultiCell(110, 5, utf8_decode($data['diagnostico']), $borde);
        $fpdf->setXY(80, 78);
        $fpdf->Cell(20, 7, "Obs :", $borde, 0);
        $fpdf->setXY(85, 85);
        $fpdf->MultiCell(110, 5, utf8_decode($data["_observacion"]), $borde);
        $fpdf->setXY(80, 100);
        $fpdf->Cell(20, 7, "Tx :", $borde, 0);
        $fpdf->setXY(85, 107);
        $fpdf->MultiCell(110, 5, utf8_decode($data['tratamiento']), $borde);

        $fpdf->setXY(80, 140);
        $fpdf->Cell(60, 6, $data['fechacita'], $borde, 0);
        $fpdf->setXY(140, 140);
        $fpdf->Cell(60, 6, "Proxima Cita : " . $data['proximacita'], $borde, 0);


        $fpdf->output();
    }

    public function imprimirPacientePorFechaYSede() {

        $fechadel = $this->input->get("fechadel");
        $fechaal = $this->input->get("fechaal");
        $sedeid = $this->input->get("sedeid");


        $pdf = new FPDF('L', 'mm', 'A4');
        $pdf->AddPage();

        $pdf->setFont("Arial", "B", 10);
        $pdf->Cell(0, 10, "LISTADO DE PACIENTES DEL : " . $fechadel . "  AL : " . $fechaal . "", 0, 1, "C");
        $pdf->setFont("Arial", "B", 9);
        // $pdf->Cell(50,10,"Del : ".$fechadel."  Al : ".$fechaal." ",0,1,L);
        $pdf->Line(10, 20, 285, 20);
        $pdf->Ln(10);

        $rs_cabecera_medico = $this->model_trabajador->ADO_Listar_Medico_Por_Sede_Y_Fecha_Cita(array("fechadel" => $fechadel, "fechaal" => $fechaal, "sedeid" => $sedeid));
        $rs_cabecera_medico = $rs_cabecera_medico["data"];
        $total = 0;

        foreach ($rs_cabecera_medico as $row) {
            $pdf->setFont("Arial", "B", 9);
            $pdf->Cell(50, 10, "DOCTOR(A) : " . $row["medico"], 0, 1);
            $pdf->Ln(5);
            $pdf->setFont("Arial", "B", 8);
            $pdf->Cell(11);
            //	$pdf->Cell(80,10,"PACIENTE",0,1);
            $pdf->Ln(1);
            $pdf->setFont("Arial", "", 8);
            $rs_detalle_paciente = $this->model_cita->listarCitasPorMedicoYRangoFechas(array("fechadel" => $fechadel, "fechaal" => $fechaal, "idmed" => $row["idmed"]));
            $rs_detalle_paciente = $rs_detalle_paciente["data"];
            $item = 1;
            foreach ($rs_detalle_paciente as $row2) {
                $pdf->Cell(10, 10, $item . " .-", 0, 0);
                $pdf->Cell(1);
                $pdf->Cell(70, 10, $row2["paciente"], 0, 0);
                $pdf->cell(1);
                $rs_contrato_paciente = $this->model_cita->listarContratoPorPersonaFechaYSede(array("femisioncont" => $row2["fechacita"], "idper" => $row2["idper"], "idtienda" => $row2["idsede"]));
                $rs_contrato_paciente = $rs_contrato_paciente["data"];

                foreach ($rs_contrato_paciente as $row3) {
                    $pdf->cell(10, 10, $row3["tipodocventa"], 0, 0);
                    $pdf->cell(1);
                    $pdf->cell(25, 10, $row3["numerodoc"], 0, 0);
                    $pdf->Cell(1);
                    $pdf->cell(15, 10, number_format((float) $row3["valtotalcont"], 2, '.', ''), 0, 0);
                    $pdf->cell(1);
                    $rs_contratodet_paciente = $this->model_cita->listaDetalleContratoPorContrato(array("idcont" => $row3["idcont"]));
                    $rs_contratodet_paciente = $rs_contratodet_paciente["data"];
                    $total+=$row3["valtotalcont"];
                    foreach ($rs_contratodet_paciente as $row4) {
                        $pdf->cell(15, 10, number_format((float) $row4["precio"], 2, '.', ''), 0, 0);
                        $pdf->cell(1);
                        $pdf->cell(70, 10, utf8_decode($row4["desprod"]), 0, 1);
                        $pdf->cell(1);
                        //$pdf->cell(10,10,$row4["tipodocventa"],0,1);
                        $pdf->Ln(-4);
                        $pdf->cell(135);
                    }


                    $pdf->Ln(2);
                    $pdf->cell(92);
                }

                $pdf->Ln(10);
                $item++;
            }
            $pdf->Ln(0);
        }
        $pdf->Ln(10);
        $pdf->setFont("Arial", "B", 10);
        $pdf->cell(107);
        $pdf->cell(20, 10, "Total : " . number_format((float) $total, 2, '.', ''), 0, 1);


        $pdf->Output();


        /*
          $fechadel=$this->input->get("fechadel");
          $fechaal=$this->input->get("fechaal");
          $sedeid=$this->input->get("sedeid");
          $rs_tienda=$this->model_tienda->ADO_Listar_Tiendas(array("sedeid"=>$sedeid));
          $rs_cabecera_medico=$this->model_trabajador->ADO_Listar_Medico_Por_Fecha_Cita(array("fechadel"=>$fechadel,"fechaal"=>$fechaal));
          $rs_detalle_paciente=$this->model_cita->listarCitasPorRangoFechas(array("fechadel"=>$fechadel,"fechaal"=>$fechaal));
          $data=array
          (
          "fechadel"=>$fechadel,
          "fechaal"=>$fechaal,
          "sedeid"=>$sedeid,
          "tienda"=>$rs_tienda["data"][0]["descripcion"],
          "data_cabecera_medico"=>$rs_cabecera_medico,
          "data_detalle_paciente"=>$rs_detalle_paciente
          );

          // $this->load->view('reportes/header');
          $this->load->view('reportes/reportelistapacienteporfechaysede',$data);
          $html = $this->output->get_output();
          $this->load->library('dompdf_gen');
          $this->dompdf->load_html($html);
          $this->dompdf->render();
          $this->dompdf->stream("listadecaja.pdf",array("Attachment"=>0));

         */
    }

    /**/

    public function imprimirficha($idcita) {
        $paciente = $this->model_cita->datosDelPacientePorCita($idcita);
        $diagnostico = $this->model_cita->datosImpresionDiagnostico($idcita);
        $data['paciente'] = $paciente['_paciente'];
        $data['dni'] = $paciente['_numdoc'];
        $data['ruc'] = $paciente['_numruc'];
        $data["fechacita"] = $paciente["_fechacita"];
        $data['diagnostico'] = $diagnostico['diagnostico'];
        $data['tratamiento'] = $diagnostico['tratamiento'];
        $data['proximacita'] = $diagnostico['proximacita'];

        $this->load->view('reportes/ficha_atencion', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("fichaatencion.pdf", array("Attachment" => 0));
    }

    /* ------------------ */

    /* == Reporte de lentes de contactos == */

    public function imprimirlentecontacto($idcita) {
        $paciente = $this->model_cita->datosDelPacientePorCita($idcita);
        $detOD = $this->model_consultorio->lentecontato_datos($idcita, 'OD');
        $detOI = $this->model_consultorio->lentecontato_datos($idcita, 'OI');
        $detROD = $this->model_consultorio->refraccion_datos($idcita, 'OD');
        $detROI = $this->model_consultorio->refraccion_datos($idcita, 'OI');
        $dipadd = $this->model_consultorio->dipadd_datos($idcita);
        $diagnostico = $this->model_cita->datosImpresionDiagnostico($idcita);



        $data['paciente'] = $paciente['_paciente'];
        $data['dni'] = $paciente['_numdoc'];
        $data['ruc'] = $paciente['_numruc'];
        $data['fechacita'] = $paciente['_fechacita'];
        $data['rsDetOD'] = $detOD;
        $data['rsDetOI'] = $detOI;
        $data['rsDetROD'] = $detROD;
        $data['rsDetROI'] = $detROI;
        $data['diagnostico'] = $diagnostico['diagnostico'];
        $data['tratamiento'] = $diagnostico['tratamiento'];
        $data['proximacita'] = $diagnostico['proximacita'];
        $data["observacion"] = $diagnostico["observacion"];
        $data["_dip_lejos"] = $dipadd["items"][0]->_dip_lejos;
        $data["_dip_cerca"] = $dipadd["items"][0]->_dip_cerca;
        $data["_add_cerca"] = $dipadd["items"][0]->_add_cerca;
        $data["_observacion"] = $dipadd["items"][0]->_observacion;


        //$this->load->view('/reportes/lentecontacto',$data);
        $this->load->view('reportes/header');
        $this->load->view('reportes/lentecontacto', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("lentescontacto.pdf", array("Attachment" => 0));
    }

    public function imprimircontratosconsultas() {
        $desde = $this->input->get('pdesde', '');
        $hasta = $this->input->get('phasta', '');
        $idvendedor = $this->input->get('pidvendedor', 0);
        $idtienda = $this->input->get('pidtienda', 0);
        $tipocancel = $this->input->get('ptipocancel', 0);
        $data['reporte'] = $this->model_contrato->ADO_ContratoBuscarFechasVendedorHrml($desde, $hasta, $idvendedor, $idtienda, $tipocancel);
        $this->load->view('reportes/header');
        $this->load->view('reportes/reportecontratosconsultas', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadocontratos.pdf", array("Attachment" => 0));
    }

    /*     * ***************************************** */
    /*  Reportes de Caja                     */
    /*     * ***************************************** */

    public function reportelistacajaventas() {
        $fecha = $this->input->get('pfecha', '');
        $sede = $this->input->get('psede', '');
        $saldoinicial = $this->input->get('psaldoinicial', '0');
        $saldoinicialnota = $this->input->get('saldoinicialnotas', '0');
        $tienda = $this->model_contrato->ADO_TiendaNombre($sede);


        $data['fecha'] = $fecha;
        $data['tienda'] = $tienda[0]["descripcion"];
        $data['saldoinicial'] = $saldoinicial;
        $data['saldoinicialnota'] = $saldoinicialnota;
        $data['reporte'] = $this->model_contrato->ADO_ListadoDeCajaHTML($fecha, $sede);
        $data['reporte_compras'] = $this->model_compra->ADO_ListadoDeCajaHTML($fecha, $sede);
        $data['pacientes'] = $this->model_cita->citas_sin_documento_venta($fecha, $sede);
        $data['resumen'] = $this->model_contrato->ADO_ConteoPago($fecha,$sede);
        $data['resumen_prod'] = $this->model_contrato->ADO_ConteoProd($fecha,$sede);


        $this->load->view('reportes/header');
        $this->load->view('reportes/reportelistadocaja', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadecaja.pdf", array("Attachment" => 0));
    }

    /*     * ***************************************** */
    /*  Reportes de Pago medicos                     */
    /*     * ***************************************** */

    public function reportepagomedicos() {
        $desde = $this->input->get('desde', '');
        $hasta = $this->input->get('hasta', '');
        $sede = $this->input->get('sede', 0);
        $medico = $this->input->get('medico', 0);
        $mediconombre = $this->input->get('nombremedico', 0);

        $tienda = $this->model_contrato->ADO_TiendaNombre($sede);

        $data['desde'] = $desde;
        $data['hasta'] = $desde;
        $data['tienda'] = $tienda[0]["descripcion"];
        $data['medico'] = $mediconombre;
        $data['detalle'] = $this->model_contrato->ADO_PagoMedico($sede,$medico,$desde,$hasta);

        $this->load->view('reportes/header');
        $this->load->view('reportes/reportepagomedico', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("reportepagomnedico.pdf", array("Attachment" => 0));
    }

    public function reportelistacajacompras() {
        $fecha = $this->input->get('pfecha', '');
        $sede = $this->input->get('psede', '');
        $tienda = $this->model_contrato->ADO_TiendaNombre($sede);
        $data['fecha'] = $fecha;
        $data['tienda'] = $tienda[0]["descripcion"];
        $data['reporte'] = $this->model_compra->ADO_ListadoDeCajaHTML($fecha, $sede);
        $data['pacientes'] = $this->model_compra->ADO_ListadoDeCajaHTML($fecha, $sede);
        $this->load->view('reportes/header');
        $this->load->view('reportes/reportelistadocajacompra', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadecaja.pdf", array("Attachment" => 0));
    }

    /*     * ************************************** */

    public function imprimiringresoslistado() {

        $fechacompra = $this->input->get('pfechacompra', '');
        $desde = $this->input->get('pdesde', '');
        $hasta = $this->input->get('phasta', '');
        $nombreproveedor = $this->input->get('pproveedor', '');
        $numerodocumento = $this->input->get('pnumerodoc', '');

        $data['reporte'] = $this->model_compra->ADO_Listar_FiltrarPdf($fechacompra, $nombreproveedor, $numerodocumento, $desde, $hasta);
        if ($desde != '' || $hasta != '') {
            $data['tipo'] = 'Solo ingresos desde  ' . $desde . ' hasta ' . $hasta;
        } else if ($nombreproveedor != '') {
            $data['tipo'] = 'Solo ingresos del proveedor ';
        } else if ($numerodocumento != '') {
            $data['tipo'] = 'Solo ingresos del numero de documento ' . $nombreproveedor;
        } else {
            $data['tipo'] = 'Todos los ingresos ';
        }
        $this->load->view('reportes/header');
        $this->load->view('reportes/reportedeingresos', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadoingresos.pdf", array("Attachment" => 0));
    }

    public function imprimirlistadoproducto() {
        $data['reporte'] = $this->model_producto->ADO_Listar_ProductosHTML(0, null, null, null, null);
        $this->load->view('reportes/header');
        $this->load->view('reportes/listadoproductos', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadodeproductos.pdf", array("Attachment" => 0));
    }

    public function imprimirlistadotrabajador() {
        $data['reporte'] = $this->model_trabajador->ADO_Listar_TrabajadoresHTML(0, null, null, null, null, null);
        $this->load->view('reportes/header');
        $this->load->view('reportes/listadotrabajadores', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadodetrabajadores.pdf", array("Attachment" => 0));
    }

    public function imprimirlistadomateriales() {
        $data['reporte'] = $this->model_producto->ADO_Listar_MaterialHtml();
        $this->load->view('reportes/header');
        $this->load->view('reportes/listadomateriales', $data);
        $html = $this->output->get_output();
        $this->load->library('dompdf_gen');
        $this->dompdf->load_html($html);
        $this->dompdf->render();
        $this->dompdf->stream("listadodemateriales.pdf", array("Attachment" => 0));
    }


     public function exportacumpleanios($fecha){

        ini_set('memory_limit', '512M');

            ob_clean();

        $filename = 'cumpleanios.xls';
        #create an instance of the class
        $xls = new ExportXLS($filename);
        #lets set some headers for top of the spreadsheet
        #
       $header = "REGISTRO DE CUMPLEA�OS"; // single first col text
       $xls->addHeader($header);

        #add blank line
        $header = null;
        $xls->addHeader($header);

        #add 2nd header as an array of 3 columns
        $header[] = "Item";
        $header[] = "Paciente";
        $header[] = "Direccion";
        $header[] = "Fecha nacimiento";
        $header[] = "Telefono Fijo";
        $header[] = "Celular";
        $header[] = "Correo";
        $xls->addHeader($header);
        $rs = $this->model_cliente->ADO_Listar_Cumpleanios($fecha);
        if($rs->num_rows() > 0)
        {
            $rows = $rs->result_array();
            $x=1;
           foreach ($rows as $row)
            {
               $xrow[] = array(0=> $x , 1=> utf8_decode( $row['_persona']),2=> utf8_decode( $row['_direccion']), 3=> $row['_fechanaci'], 4=>$row['_telefono'],5=> $row['_celular'],6=>$row['_correo']);
                $x++;
           }
           $xls->addRow($xrow);
        }


        $xls->sendFile();
    }


    public function exportaproximascitas($fecha){

       ini_set('memory_limit', '512M');


ob_clean();
        $filename = 'proximascitas.xls';
        #create an instance of the class
        $xls = new ExportXLS($filename);
       //lets set some headers for top of the spreadsheet
        #
        $header = "REGISTRO DE PROXIMAS CITAS"; // single first col text
        $xls->addHeader($header);

        #add blank line
        $header = null;
        $xls->addHeader($header);

        #add 2nd header as an array of 3 columns
        $header[] = "Item";
        $header[] = "Paciente";
	$header[] = "Sexo";
	$header[] = "Edad";
	$header[] = "Fecha Cita";
        $header[] = "Proxima Cita";
	$header[] = "Sede de Atencion";
        $header[] = "Telefono Fijo";
        $header[] = "Celular";
        $header[] = "Correo";
        $xls->addHeader($header);
        $rs = $this->model_cliente->ADO_Listar_ProximasCitas($fecha);
       if($rs->num_rows() > 0)
       {
           $rows = $rs->result_array();
            $x=1;
            foreach ($rows as $row)
           {
                 $xrow[] = array(
                  0=> $x ,
                  1=> utf8_decode($row['_persona']),
                  2=> $row['_sexo'],
                  3=> $row['_edad'],
                  4=> $row['_fechacita'],
                  5=>$row['_proximacita'],
                  6=>$row['_local'],
                  7=> $row['_telefono'],
                  8=>$row['_celular'],
                  9=>$row['_correo']
                );

                $x++;
           }
           $xls->addRow($xrow);
       }
        $xls->sendFile();
    }


}
