<?php 
    class Prijava{
        //baza podataka
        private $connection;
        private $table = 'prijava';

        //atributi
        public $sifra;
        public $email;
        public $lozinka;

        //constructor - za povezivanje s bazom
        public function __construct($db){
            $this->connection = $db;
        }

        public function Ucitaj(){
            //kreiranje querya

            $sQuery = 'SELECT 
                p.email,
                p.lozinka 
                FROM '.$this->table.' p';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;
        }
    }
?>