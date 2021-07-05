<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta
    $clan = new Clan($db);

    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));

    $clan->projektSifra = $data->projektSifra;

    //kreiranje projekta
    if($clan->AzurirajProjekte()){
        echo json_encode(
            array('poruka' => "Clan je obrisan")
        );
    }else {
        echo json_encode(
            array('poruka' => "Clan nie obrisan")
        );
    }

    