<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $projekt = new Projekt($db);

    $projekt->sifra = isset($_GET['sifra']) ? $_GET[sifra] : die();
    //podaci
    $projekt->UcitajJedan();

    $projekt_arr = array(
        'sifra' => $projekt->sifra,
        'nositelj' => $projekt->nositelj,
        'vrijednost' => $projekt->vrijednost,
        'grad' => $projekt->grad,
        'status' => $projekt->status
    );

    //kreiranje json-a
    print_r(json_encode($projekt_arr));

    

?>