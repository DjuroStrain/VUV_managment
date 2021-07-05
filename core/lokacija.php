<?php

    class Lokacija{

        //baza podataka
        private $connection;
        private $table = 'lokacija';

        //atributi
        public $sifra;
        public $adresa;
        public $postanskiBroj;
        public $grad;
        public $latituda;
        public $longituda;
        public $projektSifra;

        //constructor - za povezivanje s bazom
        public function __construct($db){
            $this->connection = $db;
        }
        public function Ucitaj(){
            //kreiranje querya
            $sQuery = 'SELECT 
                l.sifra,
                l.adresa,
                l.postanskiBroj,
                l.grad,
                l.latituda,
                l.longituda,
                l.projektSifra
                FROM
                ' . $this->table .' l';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;
        }
       public function Kreiraj(){
           //kreiranje query-a
            $sQuery = 'INSERT INTO ' .$this->table.' SET adresa = :adresa,  postanskiBroj= :postanskiBroj, grad= :grad, latituda= :latituda, longituda= :longituda, projektSifra= :projektSifra';

            //priprema izjave
            $statment = $this->connection->prepare($sQuery);

            //ocisti data
            $this->adresa = htmlspecialchars(strip_tags($this->adresa));
            $this->postanskiBroj = htmlspecialchars(strip_tags($this->postanskiBroj));
            $this->grad = htmlspecialchars(strip_tags($this->grad));
            $this->latituda = htmlspecialchars(strip_tags($this->latituda));
            $this->longituda = htmlspecialchars(strip_tags($this->longituda));

            //spajane parametara
            $statment->bindParam(':adresa', $this->adresa);
            $statment->bindParam(':postanskiBroj', $this->postanskiBroj);
            $statment->bindParam(':grad', $this->grad);
            $statment->bindParam('latituda', $this->latituda);
            $statment->bindParam('longituda', $this->longituda);
            $statment->bindParam('projektSifra', $this->projektSifra);

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