<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
function pdf_create($html, $filename='', $stream=TRUE) 
{
    require_once("dompdf/dompdf_config.inc.php");

    $dompdf = new DOMPDF();
    //$paper_size = array(0,0,200,360);
   // $dompdf->set_paper($paper_size);
    $dompdf->load_html($html);
    $dompdf->render();
   
    //$dompdf->set_paper(array(0,0, 12 * 72, 12 * 72), "portrait" ); // 12" x 12"
    if ($stream) {
        $dompdf->stream($filename.".pdf");
    } else {
        return $dompdf->output();
    }
}
?>