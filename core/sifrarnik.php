<?php

    class Sifrarnik{

        private $connection;
        private $table = 'sifrarnik';
        public $sifra;
        public $clanSifra;
        public $projektSifra;
        public $voditelj;

        public function __construct($db){
            $this->connection = $db;
        }

        public function Ucitaj(){

            //query

            $sQuery = 'SELECT 
                s.sifra,
                s.clanSifra,
                s.projektSifra,
                s.voditelj
                FROM
                '.$this->table.' s';

            //priprema
            $statment = $this->connection->prepare($sQuery);

            $statment->execute();

            return $statment;
        }

        public function Kreiraj(){
            //kreiranje query-a
             $sQuery = 'INSERT INTO ' .$this->table.' SET clanSifra = :clanSifra,  projektSifra= :projektSifra, voditelj= :voditelj';
 
             //priprema izjave
             $statment = $this->connection->prepare($sQuery);
             //ocisti data
             $this->clanSifra = htmlspecialchars(strip_tags($this->clanSifra));
             $this->projektSifra = htmlspecialchars(strip_tags($this->projektSifra));
             $this->voditelj = htmlspecialchars(strip_tags($this->voditelj));
 
             //spajane parametara
             $statment->bindParam(':clanSifra', $this->clanSifra);
             $statment->bindParam(':projektSifra', $this->projektSifra);
             $statment->bindParam(':voditelj', $this->voditelj);
 
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