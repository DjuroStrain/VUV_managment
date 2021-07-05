<?php

    class Projekt{

        //baza podataka
        private $connection;
        private $table = 'projekti';

        //atributi
        public $sifra;
        public $naziv;
        public $nositelj;
        public $vrijednost;
        public $status;

        //constructor - za povezivanje s bazom
        public function __construct($db){
            $this->connection = $db;
        }

        public function Ucitaj(){
            //kreiranje querya

            $sQuery = 'SELECT 
                p.sifra,
                p.naziv,
                p.nositelj,
                p.vrijednost,
                p.status
                FROM
                ' .$this->table .' p';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;
        }
?>