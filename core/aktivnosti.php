<?php

    class Aktivnost{

        //baza podataka
        private $connection;
        private $table = 'aktivnosti';

        //atributi
        public $sifra;
        public $naziv;
        public $opis;
        public $vrijeme;
        public $projekt;
        public $projektSifra;
        public $clanoviProjekta = array();
        public $status;

        //constructor - za povezivanje s bazom
        public function __construct($db){
            $this->connection = $db;
        }

        public function Ucitaj(){
            //kreiranje querya
            $sQuery = 'SELECT 
                p.naziv as projekt,
                a.projektSifra,
                a.sifra,
                a.naziv,
                a.opis,
                a.vrijeme,
                a.status
                FROM
                ' .$this->table .' a
                LEFT JOIN 
                    projekti p ON a.projektSifra = p.sifra
                    ORDER BY sifra';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;
        }

        public function UcitajJedan(){
            $sQuery = 'SELECT 
                a.sifra,
                a.naziv,
                a.opis,
                a.vrijeme,
                a.status
                FROM
                ' .$this->table .' a
                LEFT JOIN 
                    projekti p ON a.projektSifra = p.sifra
                WHERE 
                    a.sifra= :sifra';

             //priprema
        $statment = $this->connection->prepare($sQuery);
        //spajanje param
        $statment->bindParam(1, $this->sifra);
        //izvrsi query
        $statment->execute();

        $red = $statment->fetch(PDO::FETCH_ASSOC);

        $this->sifra = $red['sifra'];
        $this->naziv = $red['naziv'];
        $this->opis = $red['opis'];
        $this->vrijeme = $red['vrijeme'];
        $this->status = $red['status'];
        }

       public function Kreiraj(){
           //kreiranje query-a
            $sQuery = 'INSERT INTO ' .$this->table.' SET naziv = :naziv,  opis= :opis, vrijeme= :vrijeme, projektSifra= :projektSifra ,status= :status';

            //priprema izjave
            $statment = $this->connection->prepare($sQuery);

            //ocisti data
            $this->naziv = htmlspecialchars(strip_tags($this->naziv));
            $this->opis = htmlspecialchars(strip_tags($this->opis));
            $this->vrijeme = htmlspecialchars(strip_tags($this->vrijeme));
            $this->projektSifra = htmlspecialchars(strip_tags($this->projektSifra));
            $this->status = htmlspecialchars(strip_tags($this->status));

            //spajane parametara
            $statment->bindParam(':naziv', $this->naziv);
            $statment->bindParam(':opis', $this->opis);
            $statment->bindParam(':vrijeme', $this->vrijeme);
            $statment->bindParam(':projektSifra', $this->projektSifra);
            $statment->bindParam(':status', $this->status);

            //izvrsi query
            if($statment->execute()){
                return true;
            }

            //ispisi error ukoliko je doslo do neke greske
            printf("Error %s. \n", $statment->error);
            return false;
       }

       public function Azuriraj(){
        //kreiranje query-a
         $sQuery = 'UPDATE '.$this->table.' 
         SET naziv= :naziv,  opis= :opis, vrijeme= :vrijeme, status= :status, projektSifra= :projektSifra
         WHERE sifra= :sifra';

         //priprema izjave
         $statment = $this->connection->prepare($sQuery);

         //ocisti data
         $this->sifra = htmlspecialchars(strip_tags($this->sifra));
         $this->naziv = htmlspecialchars(strip_tags($this->naziv));
         $this->opis = htmlspecialchars(strip_tags($this->opis));
         $this->vrijeme = htmlspecialchars(strip_tags($this->vrijeme));
         $this->status = htmlspecialchars(strip_tags($this->status));
         $this->projektSifra = htmlspecialchars(strip_tags($this->projektSifra));

         //spajane parametara
         $statment->bindParam(':sifra', $this->sifra);
         $statment->bindParam(':naziv', $this->naziv);
         $statment->bindParam(':opis', $this->opis);
         $statment->bindParam(':vrijeme', $this->vrijeme);
         $statment->bindParam(':status', $this->status);
         $statment->bindParam(':projektSifra', $this->projektSifra);

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