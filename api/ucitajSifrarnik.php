<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $sifrarnik = new Sifrarnik($db);

    //podaci
    $rezultat = $sifrarnik->Ucitaj();

    $broj = $rezultat->rowCount();

    if($broj > 0)
    {
        $sifra_arr = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            $sifra_item = array(
                'sifra' => $sifra,
                'clanSifra' => $clanSifra,
                'projektSifra' => $projektSifra,
                'voditelj' => $voditelj
            );
            array_push($sifra_arr, $sifra_item);
        }

        echo json_encode($sifra_arr);
    }else {
        echo json_encode(array('poruka' => 'Nije pronađen nijedan sifrarnik'));
    }
    

?>