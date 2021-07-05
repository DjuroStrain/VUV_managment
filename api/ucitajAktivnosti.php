<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $aktivnost = new Aktivnost($db);
    $clanovi = new Clan($db);
    $sifrarnik = new Sifrarnik($db);

    //podaci
    $rezultat = $aktivnost->Ucitaj();
    $rezultatClan = $clanovi->Ucitaj();

    //dohvacanje broja redaka
    $broj = $rezultat->rowCount();
    $broj2 = $rezultatClan->rowCount();

    if($broj2 > 0){
        $clanovi_arr = array();

        while($red = $rezultatClan->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            $clanovi_item = array(
                'sifra' => $sifra,
                'ime' => $ime,
                'prezime' => $prezime,
                'projektSifra' => $projektSifra,
                'voditelj' => $voditelj
            );
            array_push($clanovi_arr, $clanovi_item);
        }
    }
    if($broj > 0){
        $aktivnosti_arr = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            if($status == 1)
            {
                $aktivnost_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                    'opis' => $opis,
                    'vrijeme' => $vrijeme,
                    'projekt' => $projekt,
                    'projektSifra' => $projektSifra,
                    'status' => "Aktivan",
                    'clanoviProjekta' => array()
                );
            }
            else
            {
                $aktivnost_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                    'opis' => $opis,
                    'vrijeme' => $vrijeme,
                    'projekt' => $projekt,
                    'projektSifra' => $projektSifra,
                    'status' => "Neaktivan",
                    'clanoviProjekta' => array()
                );
            }
            
            array_push($aktivnosti_arr, $aktivnost_item);
        }

            $length = count($aktivnosti_arr);  
            $length2 = count($clanovi_arr);  

           for($i = 0; $i < $length; $i++)
            {
                for($a = 0; $a < $length2; $a++)
                {
                    if($clanovi_arr[$a]['projektSifra'] == $aktivnosti_arr[$i]['projektSifra'])
                    {
                        array_push($aktivnosti_arr[$i]['clanoviProjekta'], $clanovi_arr[$a]);
                    }
                }
            }


        //convert u JSON i output
        echo json_encode($aktivnosti_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }
?>