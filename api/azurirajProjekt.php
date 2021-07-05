<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta
    $projekt = new Projekt($db);

    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));

    //$projekt->sifra = isset($_GET['sifra']) ? $_GET[sifra] : die();
    $projekt->sifra = $data->sifra;
    $projekt->naziv = $data->naziv;
    $projekt->nositelj = $data->nositelj;
    $projekt->vrijednost = $data->vrijednost;
    $projekt->status = $data->status;
    
    //kreiranje projekta
    if($projekt->Azuriraj()){
        echo json_encode(
            array('poruka' => "Projekt je azuriran")
        );
    }else {
        echo json_encode(
            array('poruka' => "Projekt nije azuriran")
        );
    }

    

?>