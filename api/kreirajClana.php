<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');
    //instanciranje Projekta
    $clan = new Clan($db);
    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));
    $clan->ime = $data->ime;
    $clan->prezime = $data->prezime;
    $clan->projektSifra = $data->projektSifra; 
    $clan->clanSifra = '';
    $clan->voditelj = $data->voditelj;


    //kreiranje projekta
    if($clan->Kreiraj()){
        echo json_encode(
            array('poruka' => "Clan je kreiran")
        );
    }else {
        echo json_encode(
            array('poruka' => "Clan nije kreiran")
        );
    }

?>