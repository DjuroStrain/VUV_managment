<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta
    $aktivnost = new Aktivnost($db);

    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));

    $aktivnost->sifra = $data->sifra;
    $aktivnost->naziv = $data->naziv;
    $aktivnost->opis = $data->opis;
    $aktivnost->vrijeme = $data->vrijeme;
    $aktivnost->status = $data->status;
    $aktivnost->projektSifra = $data->projektSifra;

    //kreiranje projekta
    if($aktivnost->Azuriraj()){
        echo json_encode(
            array('poruka' => "Projekt je azuriran")
        );
    }else {
        echo json_encode(
            array('poruka' => "Projekt nije azuriran")
        );
    }

    

?>