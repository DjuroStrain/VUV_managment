<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $projekt = new Projekt($db);

    //podaci
    $rezultat = $projekt->Ucitaj();

    //dohvacanje broja redaka
    $broj = $rezultat->rowCount();

    if($broj > 0){
        $projekti_arr = array();
        //$projekti_arr['data'] = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
                $projekt_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                    'nositelj' => $nositelj,
                    'vrijednost' => $vrijednost,
                    'status' => $status
                );
            array_push($projekti_arr, $projekt_item);
        }
        //convert u JSON i output
        echo json_encode($projekti_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }

?>