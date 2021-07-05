<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $clan = new Clan($db);
    $sifarnik = new Sifrarnik($db);

    //podaci
    $rezultat = $clan->UcitajSamoClanove();
    $rezultatSifra = $sifarnik->Ucitaj();

    //dohvacanje broja redaka
    $broj = $rezultat->rowCount();
    $broj2 = $rezultatSifra->rowCount();

    if($broj2 > 0){
        $sifrarnik_arr = array();
        //$clanovi_arr['data'] = array();

        while($red = $rezultatSifra->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            $sifrarnik_item = array(
                'projektSifra' => $projektSifra,
                'clanSifra' => $clanSifra
            );
            array_push($sifrarnik_arr, $sifrarnik_item);
        }
    }

    if($broj > 0){
        $clanovi_arr = array();
        //$clanovi_arr['data'] = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            $clanovi_item = array(
                'sifra' => $sifra,
                'ime' => $ime,
                'prezime' => $prezime,
                'sifreProjekata' => array()
            );
            array_push($clanovi_arr, $clanovi_item);
        }

        $length = count($clanovi_arr);
        $length2 = count($sifrarnik_arr);
        for($i = 0; $i < $length; $i++)
        {
            for($j = 0; $j < $length2; $j++)
            {   
                if($sifrarnik_arr[$j]['clanSifra'] == $clanovi_arr[$i]['sifra'])
                {
                    array_push($clanovi_arr[$i]['sifreProjekata'], $sifrarnik_arr[$j]);
                }
            }
        }

        //convert u JSON i output
        echo json_encode($clanovi_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }
?>