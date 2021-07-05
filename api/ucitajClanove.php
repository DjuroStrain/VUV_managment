<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $clan = new Clan($db);
    $projekt = new Projekt($db);
    $sifrarnik = new Sifrarnik($db);

    //podaci
    $rezultat = $clan->Ucitaj();
    $rezultatProjekt = $projekt->Ucitaj();
    $rezultatSifrarnik = $sifrarnik->Ucitaj();

    //dohvacanje broja redaka
    $broj = $rezultat->rowCount();
    $brojProjekt = $rezultat->rowCount();
    $brojSifrarnik = $rezultat->rowCount();

    if($brojProjekt > 0){
        $projekti_arr = array();
        //$projekti_arr['data'] = array();

        while($red = $rezultatProjekt->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            if($status == 1)
            {
                $projekt_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                );
            }
            elseif($status == 0) {
                $projekt_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                );
            }
            array_push($projekti_arr, $projekt_item);
        }

    if($brojSifrarnik > 0){
        $sifrarnik_arr = array();
        //$clanovi_arr['data'] = array();
    
        while($red = $rezultatSifrarnik->fetch(PDO::FETCH_ASSOC)){
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
                'projektSifra' => $projektSifra,
                'projekt' => array(),
                'voditelj' => $voditelj
            );
            array_push($clanovi_arr, $clanovi_item);
        }

        $length = count($clanovi_arr);
        $lengthProjekt = count($projekti_arr);
        $lengthSifra = count($sifrarnik_arr);

        for($i = 0; $i < $length; $i++)
            {
                for($a = 0; $a < $lengthProjekt; $a++)
                {
                    for($k = 0; $k < $lengthSifra; $k++)
                    {
                        if($sifrarnik_arr[$k]['projektSifra'] == $projekti_arr[$a]['sifra'] && $sifrarnik_arr[$k]['clanSifra'] == $clanovi_arr[$i]['sifra'])
                        {
                            array_push($clanovi_arr[$i]['projekt'], $projekti_arr[$a]);
                        }
                    }
                }
            }
        }
        //convert u JSON i output
        echo json_encode($clanovi_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }
?>