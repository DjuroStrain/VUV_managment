<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');
    session_start();
    //instanciranje Projekta
    $lokacija = new Lokacija($db);

    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));

    $lokacija->adresa = $data->adresa;
    $lokacija->postanskiBroj = $data->postanskiBroj;
    $lokacija->grad = $data->grad;
    $lokacija->latituda = $data->latituda;
    $lokacija->longituda = $data->longituda;
    $lokacija->projektSifra = $_SESSION['sifra'];


    //kreiranje projekta
    if($lokacija->Kreiraj()){
        echo json_encode(
            array('poruka' => "Lokacija je kreirana")
        );
    }else {
        echo json_encode(
            array('poruka' => "Lokacija nije kreirana")
        );
    }

    

?>