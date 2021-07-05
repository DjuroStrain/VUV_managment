<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST'); //za pisanje u bazu
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization'); //autorizacija je opcionalna

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta
    $projekt = new Projekt($db);
    //dohvati podatke
    $data = json_decode(file_get_contents("php://input"));

    $projekt->naziv = $data->naziv;
    $projekt->nositelj = $data->nositelj;
    $projekt->vrijednost = $data->vrijednost;
    $projekt->status = $data->status;
    $projekt->clanSifra = $data->clanSifra;
    $projekt->projektSifraClan = '';
    $projekt->voditelj = true;
    $projekt->adresa = $data->adresa;
    $projekt->postanskiBroj = $data->postanskiBroj;
    $projekt->grad = $data->grad;
    $projekt->latituda = $data->latituda;
    $projekt->longituda = $data->longituda;
    $projekt->projektSifraLokacija = '';

    //kreiranje projekta
    if($projekt->Kreiraj()){
        echo json_encode(
            array('poruka' => "Projekt je kreiran")
        );
    }else {
        echo json_encode(
            array('poruka' => "Projekt nije kreiran")
        );
    }

    

?>