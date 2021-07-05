<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $aktivnost = new Aktivnost($db);

    $aktivnost->sifra = isset($_GET['sifra']) ? $_GET['sifra'] : die();
    //podaci
    $aktivnost->UcitajJedan();

    $aktivnosti_arr = array(
        'sifra' => $aktivnost->sifra,
        'naziv' => $aktivnost->naziv,
        'opis' => $aktivnost->opis,
        'vrijeme' => $aktivnost->vrijeme,
        'status' => $aktivnost->status
    );

    //kreiranje json-a
    print_r(json_encode($aktivnosti_arr));

    

?>