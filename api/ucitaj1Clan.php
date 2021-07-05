<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $clan = new Clan($db);

    $clan->sifra = isset($_GET['sifra']) ? $_GET['sifra'] : die();
    //podaci
    $clan->UcitajJedan();

    $clanovi_arr = array(
        'sifra' => $clan->sifra,
        'ime' => $clan->ime,
        'prezime' => $clan->prezime,
        'projektSifra' => $clan->projektSifra,
    );

    //kreiranje json-a
    print_r(json_encode($clanovi_arr));

    

?>