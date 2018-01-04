<?php

function pintarApostrofe($cadena) {
    return str_replace("'", "\'", $cadena);
}

// Funcion de JUAN JAIMES
function esCadenaNulo($objeto) {
    if (!empty($objeto)) {
        $retorna = $objeto;
        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
        $retorna = stripslashes($retorna);
        return $retorna;
    }
    return "NULL";
}
function esCadenaCero($objeto) {
    if (!empty($objeto)) {
        $retorna = $objeto;
        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
        $retorna = stripslashes($retorna);
        return $retorna;
    }
    return "0";
}

// Funcion de JUAN JAIMES
function esNumeroNulo($objeto) {
    if (!empty($objeto) && trim($objeto) != "") {
        return $objeto;
    }
    return "NULL";
}

// Funcion de JUAN JAIMES
function esNumeroCero($objeto) {
    if (!empty($objeto) && trim($objeto) != "") {
        return $objeto;
    }
    return "0";
}

// Funcion de JUAN JAIMES
function cadena_vacio_a_nulo($objeto) {
    if (!empty($objeto)) {
        $retorna = $objeto;
        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
        $retorna = stripslashes($retorna);
        return $retorna;
    }
    return "NULL";
}

// Funcion de JUAN JAIMES
function numero_vacio_a_nulo($objeto) {
    if (!empty($objeto) && trim($objeto) != "") {
        return $objeto;
    }
    return "NULL";
}

// Funcion de JUAN JAIMES
function pinta($objeto) {
    if (trim($objeto) == "NULL" || trim($objeto) == NULL || trim($objeto) == "")
        $objeto = '';

    //return utf8_encode($objeto);
    return utf8_decode($objeto);
    //return $objeto;
}

// Funcion de JUAN JAIMES
function pintapg($objeto) {
    if (trim($objeto) == "NULL" || trim($objeto) == NULL || trim($objeto) == "")
        $objeto = '';

    //return utf8_encode($objeto);
    return utf8_decode($objeto);
    //return $objeto;
}

function pinta_pdf($objeto) {
    //return utf8_encode($objeto);
    return utf8_decode($objeto);
    //return $objeto; //CON ESTE ESTABA
}

// Funcion de JUAN JAIMES
function utf8_code($objeto) {
    //return utf8_encode($objeto);
    return utf8_decode($objeto);
    //return htmlentities($objeto);
}

function numero_vacio_a_cero($objeto) {
    if (!empty($objeto) && trim($objeto) != "") {
        return $objeto;
    }
    return "0";
}

function bool_a_numero($objeto) {
    if ($objeto == 'true') {
        return "1";
    }
    return "0";
}

// Funcion de JUAN JAIMES
function guarda($objeto) {
    //return utf8_encode($objeto);
    return utf8_decode($objeto);
    //return $objeto;
}

// Funcion de JUAN JAIMES
function enviar($objeto) {
    //return utf8_encode($objeto);
    return utf8_decode($objeto);
    //return $objeto;
}

function ceros_izq($valor, $longitud) {
    $retorna_valor = $valor;
    if (!empty($valor))
        $retorna_valor = str_repeat("0", $longitud - strlen($valor)) . $valor;
    return $retorna_valor;
}

// Funcion de JUAN JAIMES
function retorna_algo($expresion, $blancos_derecha = '') {
    $retorna = empty($expresion) || trim($expresion) == "" ? "&nbsp;" : $expresion;

    if ($blancos_derecha == "S") {
        $expresion_result = "";
        for ($i = 0; $i <= strlen($retorna); $i++) {
            switch (substr($retorna, $i, 1)) {
                case " ":
                    $expresion_result = $expresion_result . "&nbsp;";
                    break;

                default:
                    $expresion_result = $expresion_result . substr($retorna, $i, 1);
            }
        }
        return $expresion_result;
    }

    return $retorna;
}

// Funcion de JUAN JAIMES
function retorna_sin_espacio($objeto) {
    if (!empty($objeto) && trim($objeto) != "") {
        return $objeto;
    }
    return "";
}

// Funcion de JUAN JAIMES
function retorna_sin_cero($objeto) {
    if (!empty($objeto) && trim($objeto) != "" && trim($objeto) != "0") {
        return $objeto;
    }
    return "";
}

function fecha_a_texto($pFecha) {
    $mes = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre');
    $aFecha = explode("/", $pFecha);
    $texto = $aFecha[0] . " de " . $mes[$aFecha[1] - 1] . " del " . $aFecha[2];
    return $texto;
}

function dia($pDia) {
    if (strtolower($pDia) == 'monday')
        return 'lunes';
    if (strtolower($pDia) == 'tuesday')
        return 'martes';
    if (strtolower($pDia) == 'wednesday')
        return 'mi&eacute;rcoles';
    if (strtolower($pDia) == 'thursday')
        return 'jueves';
    if (strtolower($pDia) == 'friday')
        return 'viernes';
    if (strtolower($pDia) == 'saturday')
        return 'sábado';
    if (strtolower($pDia) == 'sunday')
        return 'domingo';
}

function horam($pHora) {
    if ($pHora == '')
        return '';
    $aHora = array('12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11');
    if (substr($pHora, 0, 2) > 11)
        return $aHora[substr($pHora, 0, 2) - 12] . ':' . substr($pHora, 3, 2) . ' p.m.';
    return substr($pHora, 0, 5) . ' a.m.';
}

function nombremes($mes) {
    $nmes = "";
    switch ($mes) {
        case 1:
            $nmes = "Enero";
            break;
        case 2:
            $nmes = "Febrero";
            break;
        case 3:
            $nmes = "Marzo";
            break;
        case 4:
            $nmes = "Abril";
            break;
        case 5:
            $nmes = "Mayo";
            break;
        case 6:
            $nmes = "Junio";
            break;
        case 7:
            $nmes = "Julio";
            break;
        case 8:
            $nmes = "Agosto";
            break;
        case 9:
            $nmes = "Setiembre";
            break;
        case 10:
            $nmes = "Octubre";
            break;
        case 11:
            $nmes = "Noviembre";
            break;
        case 12:
            $nmes = "Diciembre";
            break;
    }
    return $nmes;
}

function cadena_sql($pDbsql, $pProcedAlmacenado, $pParametros, $pEsquema = "", $pRetorna = "") {
    switch ($pDbsql) {
        case "SQL":
            $sql = "exec " . $pProcedAlmacenado . " " . $pParametros;
            break;

        case "PostGreSQL":
            if ($pEsquema != "")
                $pEsquema = $pEsquema . ".";
            if ($pRetorna != "")
                $pRetorna = " as (" . $pRetorna . ")";
            $sql = "select * from " . $pEsquema . $pProcedAlmacenado . " (" . $pParametros . ")" . $pRetorna;
            break;
    }
    return $sql;
}

function cadena_pg($pProcedAlmacenado,$pNumParametros,$pEsquema)
{
      $param = '';
      for ($i = 1;$i<=$pNumParametros;$i++){$param = $param . '?,';}
      $param = substr($param, 0 , strlen($param) - 1);
      if ($pEsquema != "")
            $pEsquema = $pEsquema . ".";

      $str = "SELECT * FROM " . $pEsquema.$pProcedAlmacenado."(".$param.")";
      return  $str;
}

function fecha_slashes($datafecha) {
    if (!empty($datafecha)) {
        $fecha = explode("-", $datafecha);
        return $fecha[2] . "/" . $fecha[1] . "/" . $fecha[0];
    } else {
        return '';
    }
}

function edad($edad) {
    list($dia, $mes, $anio) = explode("/", $edad);
    $anio_dif = date("Y") - $anio;
    $mes_dif = date("m") - $mes;
    $dia_dif = date("d") - $dia;
    if ($dia_dif < 0 || $mes_dif < 0)
        $anio_dif--;
    return $anio_dif;
}

function obtener_edad($edad) {
    list($dia, $mes, $anio) = explode("-", $edad);
    $anio_dif = date("Y") - $anio;
    $mes_dif = date("m") - $mes;
    $dia_dif = date("d") - $dia;
    if ($dia_dif < 0 || $mes_dif < 0)
        $anio_dif--;
    return date("Y") - $anio_dif;
}

function quitar_texto_dias($texto) {
    $buscar = array("1 day ", "2 days ", "3 days ", "4 days ", "5 days ", "6 days ");
    $reemplazo = array("");
    $texto = str_replace($buscar, $reemplazo, $texto);
    return $texto;
}

function getRealIP() {

    if ($_SERVER['HTTP_X_FORWARDED_FOR'] != '') {
        $client_ip = (!empty($_SERVER['REMOTE_ADDR']) ) ?
                $_SERVER['REMOTE_ADDR'] :
                ( (!empty($_ENV['REMOTE_ADDR']) ) ?
                        $_ENV['REMOTE_ADDR'] :
                        "unknown" );

        // los proxys van añadiendo al final de esta cabecera
        // las direcciones ip que van "ocultando". Para localizar la ip real
        // del usuario se comienza a mirar por el principio hasta encontrar
        // una dirección ip que no sea del rango privado. En caso de no
        // encontrarse ninguna se toma como valor el REMOTE_ADDR

        $entries = preg_split('/[, ]/', $_SERVER['HTTP_X_FORWARDED_FOR']);

        reset($entries);
        while (list(, $entry) = each($entries)) {
            $entry = trim($entry);
            if (preg_match("/^([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/", $entry, $ip_list)) {
                // http://www.faqs.org/rfcs/rfc1918.html
                $private_ip = array(
                    '/^0\./',
                    '/^127\.0\.0\.1/',
                    '/^192\.168\..*/',
                    '/^172\.((1[6-9])|(2[0-9])|(3[0-1]))\..*/',
                    '/^10\..*/');

                $found_ip = preg_replace($private_ip, $client_ip, $ip_list[1]);

                if ($client_ip != $found_ip) {
                    $client_ip = $found_ip;
                    break;
                }
            }
        }
    } else {
        $client_ip = (!empty($_SERVER['REMOTE_ADDR']) ) ?
                $_SERVER['REMOTE_ADDR'] :
                ( (!empty($_ENV['REMOTE_ADDR']) ) ?
                        $_ENV['REMOTE_ADDR'] :
                        "unknown" );
    }

    return $client_ip;
}

function invertir_fecha($fecha) {
    if ($fecha != '') {
        $invert = explode("-", $fecha);
        $fecha = $invert[2] . "-" . $invert[1] . "-" . $invert[0];
    }
    return $fecha;
}

function invertir_fecha2($fecha) {
    if ($fecha != '') {
        $invert = explode("/", $fecha);
        $fecha = $invert[2] . "-" . $invert[1] . "-" . $invert[0];
    }
    return $fecha;
}

function limitar_texto($texto, $limite, $longitud) {
    if (strlen($texto) > $limite) {
        $texto = substr($texto, 0, $longitud) . "...";
    }
    return $texto;
}
function validar_fecha($date){
    $d = DateTime::createFromFormat('d/m/Y', $date);
    return $d && $d->format('d/m/Y') == $date;
}
 
