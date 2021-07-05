<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //inicijalizacija api-a
    include_once('../core/initialize.php');

    //instanciranje Projekta

    $projekt = new Projekt($db);
    $clan = new Clan($db);
    

    //podaci
    $rezultat = $projekt->Ucitaj();
    $rezultatClan = $clan->Ucitaj();

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
        $projekti_arr = array();

        while($red = $rezultat->fetch(PDO::FETCH_ASSOC)){
            extract($red);
            if($status == 1)
            {
                $projekt_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                    'nositelj' => $nositelj,
                    'vrijednost' => $vrijednost,
                    'grad' => $grad,
                    'voditelj' => '',
                    'voditeljSifra' => '',
                    'status' => "Aktivan",
                    'clanoviProjekta' => array()
                );
            }
            elseif($status == 0) {
                $projekt_item = array(
                    'sifra' => $sifra,
                    'naziv' => $naziv,
                    'nositelj' => $nositelj,
                    'vrijednost' => $vrijednost,
                    'grad' => $grad,
                    'voditelj' => '',
                    'voditeljSifra' => '',
                    'status' => "Neaktivan",
                    'clanoviProjekta' => array()
                );
            }
            array_push($projekti_arr, $projekt_item);
        }

            $length = count($projekti_arr);  
            $length2 = count($clanovi_arr);

           for($i = 0; $i < $length; $i++)
            {
                for($a = 0; $a < $length2; $a++)
                {
                    if($clanovi_arr[$a]['projektSifra'] == $projekti_arr[$i]['sifra'])
                    {
                        array_push($projekti_arr[$i]['clanoviProjekta'], $clanovi_arr[$a]);
                    }
                }
            }

            for($i = 0; $i < $length; $i++)
            {
                for($a = 0; $a < $length2; $a++)
                {
                    if($clanovi_arr[$a]['projektSifra'] == $projekti_arr[$i]['sifra'] && $clanovi_arr[$a]['voditelj'] == true)
                    {
                        $projekti_arr[$i]['voditelj'] = $clanovi_arr[$a]['ime'] .' '. $clanovi_arr[$a]['prezime'];
                        $projekti_arr[$i]['voditeljSifra'] = $clanovi_arr[$a]['sifra'];
                    }
                }
            }

        //convert u JSON i output
        echo json_encode($projekti_arr);
    }else{
        echo json_encode(array('poruka' => 'Nije pronađen nijedan projekat'));
    }

?>