<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');
    //instanciranje Projekta
    $sifrarnik = new Sifrarnik($db);
    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));
    $sifrarnik->clanSifra = $data->clanSifra;
    $sifrarnik->projektSifra = $data->projektSifra; 
    $sifrarnik->voditelj = $data->voditelj;


    //kreiranje projekta
    if($sifrarnik->Kreiraj()){
        echo json_encode(
            array('poruka' => "Sifrarnikje kreiran")
        );
    }else {
        echo json_encode(
            array('poruka' => "Sifrarnik nije kreiran")
        );
    }

?>