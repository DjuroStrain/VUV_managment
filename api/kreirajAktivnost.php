<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta
    $aktivnost = new Aktivnost($db);

    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));

    $aktivnost->naziv = $data->naziv;
    $aktivnost->opis = $data->opis;
    $aktivnost->vrijeme = $data->vrijeme;
    $aktivnost->projektSifra = $data->projektSifra;
    $aktivnost->status = $data->status;

    //kreiranje projekta
    if($aktivnost->Kreiraj()){
        echo json_encode(
            array('poruka' => "Aktivnost je kreirana")
        );
    }else {
        echo json_encode(
            array('poruka' => "Aktinvost nije kreirana")
        );
    }

    

?>