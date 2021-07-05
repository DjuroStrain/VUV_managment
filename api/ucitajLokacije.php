<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $lokacija = new Lokacija($db);

    //podaci
    $rezultat = $lokacija->Ucitaj();

    //dohvacanje broja redaka
    $broj = $rezultat->rowCount();

    if($broj > 0){
        $lokacija_arr = array();
        //$lokacija_arr['data'] = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            $lokacija_item = array(
                'sifra' => $sifra,
                'adresa' => $adresa,
                'postanskiBroj' => $postanskiBroj,
                'grad' => $grad,
                'latituda' => $latituda,
                'longituda' => $longituda,
                'projektSifra' => $projektSifra
            );
            array_push($lokacija_arr, $lokacija_item);
        }
        //convert u JSON i output
        echo json_encode($lokacija_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }

?>