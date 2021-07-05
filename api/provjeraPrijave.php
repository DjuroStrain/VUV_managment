<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $prijava = new Prijava($db);

    //podaci
    $rezultat = $prijava->Ucitaj();

    //dohvacanje broja redaka
    $broj = $rezultat->rowCount();

    if($broj > 0){
        $prijava_arr = array();
        //$projekti_arr['data'] = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
                $prijava_item = array(
                    'email' => $email,
                    'lozinka' => $lozinka
                );
            array_push($prijava_arr, $prijava_item);
        }
        //convert u JSON i output
        echo json_encode($prijava_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }

?>