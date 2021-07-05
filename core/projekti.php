<?php

    class Projekt{

        //baza podataka
        private $connection;
        private $table = 'projekti';

        //atributi Projekt
        public $sifra;
        public $naziv;
        public $nositelj;
        public $vrijednost;
        public $lokacija;
        public $clanProjekta;
        public $status;
        public $voditeljSifra;
        public $clanoviProjekta;
        //atributi Clan
        public $sifra2;
        public $clanSifra;
        public $projektSifraClan;
        public $voditelj;
        //atributi
        public $sifra3;
        public $adresa;
        public $postanskiBroj;
        public $grad;
        public $latituda;
        public $longituda;
        public $projektSifraLokacija;

        //constructor - za povezivanje s bazom
        public function __construct($db){
            $this->connection = $db;
        }

        public function Ucitaj(){
            //kreiranje querya

            $sQuery = 'SELECT
                CONCAT(l.adresa, ", ",l.postanskiBroj," " ,l.grad) as grad,
                p.sifra,
                p.naziv,
                p.nositelj,
                p.vrijednost,
                p.status
                FROM
                ' .$this->table .' p
                LEFT JOIN 
                    lokacija l ON p.sifra = l.projektSifra
                 ORDER BY sifra';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;

        }

        public function UcitajJedan(){
            $sQuery = 'SELECT
                l.grad as grad,
                p.sifra,
                p.naziv,
                p.nositelj,
                p.vrijednost,
                p.status
                FROM
                ' .$this->table .' p
                LEFT JOIN 
                    lokacija l ON p.sifra = l.projektSifra
                LEFT JOIN
                    clanprojekta c on p.sifra = c.projektSifra
                    WHERE p.sifra = ? LIMIT 1';

             //priprema
        $statment = $this->connection->prepare($sQuery);
        //spajanje param
        $statment->bindParam(1, $this->sifra);
        //izvrsi query
        $statment->execute();

        $red = $statment->fetch(PDO::FETCH_ASSOC);

        $this->sifra = $red['sifra'];
        $this->naziv = $red['naziv'];
        $this->nositelj = $red['nositelj'];
        $this->vrijednost = $red['vrijednost'];
        $this->grad = $red['grad'];
        $this->status = $red['status'];
        }

       public function Kreiraj(){
           //kreiranje query-a
            $sQuery = 'INSERT INTO ' .$this->table.' SET naziv = :naziv,  nositelj= :nositelj, vrijednost= :vrijednost, status= :status';
            $sQuery2 = 'INSERT INTO lokacija SET adresa = :adresa,  postanskiBroj= :postanskiBroj, grad= :grad, latituda= :latituda, longituda= :longituda, projektSifra= :projektSifra';
            $sQuery3 = 'INSERT INTO sifrarnik SET clanSifra= :clanSifra, projektSifra= :projektSifra, voditelj= :voditelj';


            //priprema izjave
            $statment = $this->connection->prepare($sQuery);
            $statment2 = $this->connection->prepare($sQuery2);
            $statment3 = $this->connection->prepare($sQuery3);

            //ocisti data
            $this->naziv = htmlspecialchars(strip_tags($this->naziv));
            $this->nositelj = htmlspecialchars(strip_tags($this->nositelj));
            $this->vrijednost = htmlspecialchars(strip_tags($this->vrijednost));
            $this->status = htmlspecialchars(strip_tags($this->status));

            //spajane parametara
            $statment->bindParam(':naziv', $this->naziv);
            $statment->bindParam(':nositelj', $this->nositelj);
            $statment->bindParam(':vrijednost', $this->vrijednost);
            $statment->bindParam(':status', $this->status);


            //izvrsi query
            if($statment->execute()){

                    $last_id = $this->connection->lastInsertId();
                    $this->adresa = htmlspecialchars(strip_tags($this->adresa));
                    $this->postanskiBroj = htmlspecialchars(strip_tags($this->postanskiBroj));
                    $this->grad = htmlspecialchars(strip_tags($this->grad));
                    $this->latituda = htmlspecialchars(strip_tags($this->latituda));
                    $this->longituda = htmlspecialchars(strip_tags($this->longituda));
                    $this->projektSifraLokacija = htmlspecialchars(strip_tags($last_id));

                    //spajane parametara
                    $statment2->bindParam(':adresa', $this->adresa);
                    $statment2->bindParam(':postanskiBroj', $this->postanskiBroj);
                    $statment2->bindParam(':grad', $this->grad);
                    $statment2->bindParam('latituda', $this->latituda);
                    $statment2->bindParam('longituda', $this->longituda);
                    $statment2->bindParam('projektSifra', $this->projektSifraLokacija);

                            if($statment2->execute()){

                            $this->clanSifra = htmlspecialchars(strip_tags($this->clanSifra));
                            $this->projektSifraClan = htmlspecialchars(strip_tags($last_id));
                            $this->voditelj = htmlspecialchars(strip_tags($this->voditelj));

                            //spajane parametara
                            $statment3->bindParam(':clanSifra', $this->clanSifra);
                            $statment3->bindParam(':projektSifra', $this->projektSifraClan);
                            $statment3->bindParam(':voditelj', $this->voditelj);

                            //izvrsi query
                            if($statment3->execute()){
                                return true;
                            }

                            //ispisi error ukoliko je doslo do neke greske
                            printf("Error %s. \n", $statment->error);
                            return false;

                        return true;
                    }

                    //ispisi error ukoliko je doslo do neke greske
                    printf("Error %s. \n", $statment->error);
                    return false;

                return true;
            }

            //ispisi error ukoliko je doslo do neke greske
            printf("Error %s. \n", $statment->error);
            return false;

       }

       
       //funkcija za azuriranje
       public function Azuriraj(){
        //kreiranje query-a
         $sQuery = 'UPDATE '.$this->table.' 
         SET naziv = :naziv,  nositelj= :nositelj, vrijednost= :vrijednost, status= :status
         WHERE sifra= :sifra';

         //priprema izjave
         $statment = $this->connection->prepare($sQuery);

         //ocisti data
         $this->sifra = htmlspecialchars(strip_tags($this->sifra));
         $this->naziv = htmlspecialchars(strip_tags($this->naziv));
         $this->nositelj = htmlspecialchars(strip_tags($this->nositelj));
         $this->vrijednost = htmlspecialchars(strip_tags($this->vrijednost));
         $this->status = htmlspecialchars(strip_tags($this->status));

         //spajane parametara
         $statment->bindParam(':sifra', $this->sifra);
         $statment->bindParam(':naziv', $this->naziv);
         $statment->bindParam(':nositelj', $this->nositelj);
         $statment->bindParam(':vrijednost', $this->vrijednost);
         $statment->bindParam(':status', $this->status);

         //izvrsi query
         if($statment->execute()){
             return true;
         }

         //ispisi error ukoliko je doslo do neke greske
         printf("Error %s. \n", $statment->error);
         return false;

    }

    //funkcija za azuriranje bez clana
    public function AzurirajBez(){
        //kreiranje query-a
         $sQuery = 'UPDATE '.$this->table.' 
         SET naziv = :naziv,  nositelj= :nositelj, vrijednost= :vrijednost, status= :status
         WHERE sifra= :sifra';

         //priprema izjave
         $statment = $this->connection->prepare($sQuery);

         //ocisti data
         $this->sifra = htmlspecialchars(strip_tags($this->sifra));
         $this->naziv = htmlspecialchars(strip_tags($this->naziv));
         $this->nositelj = htmlspecialchars(strip_tags($this->nositelj));
         $this->vrijednost = htmlspecialchars(strip_tags($this->vrijednost));
         $this->status = htmlspecialchars(strip_tags($this->status));

         //spajane parametara
         $statment->bindParam(':sifra', $this->sifra);
         $statment->bindParam(':naziv', $this->naziv);
         $statment->bindParam(':nositelj', $this->nositelj);
         $statment->bindParam(':vrijednost', $this->vrijednost);
         $statment->bindParam(':status', $this->status);

         //izvrsi query
         if($statment->execute()){
             return true;
         }

         //ispisi error ukoliko je doslo do neke greske
         printf("Error %s. \n", $statment->error);
         return false;

    }
    }

?>