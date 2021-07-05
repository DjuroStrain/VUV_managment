<?php

    class Osoba{
        public $sifra;
        public $ime;
        public $prezime;
    }


    class Clan extends Osoba{

        //baza podataka
        private $connection;
        private $table = 'clanprojekta';

        //atributi
        public $sifra;
        public $ime;
        public $prezime;
        public $clanSifra;
        public $projektSifra;
        public $voditelj;
        public $sifreProjekata;

        //constructor - za povezivanje s bazom
        public function __construct($db){
            $this->connection = $db;
        }

        public function Ucitaj(){
            //kreiranje querya

            $sQuery = 'SELECT 
                p.naziv as projekt,
                c.sifra,
                c.ime,
                c.prezime,
                s.projektSifra,
                s.voditelj
                FROM
                ' .$this->table .' c
                LEFT JOIN 
                sifrarnik s ON s.clanSifra = c.sifra
                LEFT JOIN 
                projekti p ON p.sifra = s.projektSifra';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;
        }

        public function UcitajSamoClanove(){
            //kreiranje querya

            $sQuery = 'SELECT 
                c.sifra,
                c.ime,
                c.prezime
                FROM
                ' . $this->table .' c';
            
            //priprema
            $statment = $this->connection->prepare($sQuery);

            //izvrsi
            $statment->execute();

            return $statment;
        }

        public function UcitajJedan(){
            $sQuery = 'SELECT 
                c.sifra,
                c.ime,
                c.prezime,
                c.projektSifra
                FROM
                ' .$this->table .' c
                    WHERE c.sifra = ? LIMIT 1';

             //priprema
        $statment = $this->connection->prepare($sQuery);
        //spajanje param
        $statment->bindParam(1, $this->sifra);
        //izvrsi query
        $statment->execute();

        $red = $statment->fetch(PDO::FETCH_ASSOC);

        $this->sifra = $red['sifra'];
        $this->ime = $red['ime'];
        $this->prezime = $red['prezime'];
        $this->projektSifra = $red['projektSifra'];
        }

       public function Kreiraj(){
           //kreiranje query-a
            $sQuery = 'INSERT INTO ' .$this->table.' SET ime = :ime,  prezime= :prezime';
            $sQuerySifrarnik = 'INSERT INTO sifrarnik SET clanSifra= :clanSifra, projektSifra= :projektSifra, voditelj= :voditelj';

            //priprema izjave
            $statment = $this->connection->prepare($sQuery);
            $statmentSifra = $this->connection->prepare($sQuerySifrarnik);

            //ocisti data
            $this->ime = htmlspecialchars(strip_tags($this->ime));
            $this->prezime = htmlspecialchars(strip_tags($this->prezime));

            //spajane parametara
            $statment->bindParam(':ime', $this->ime);
            $statment->bindParam(':prezime', $this->prezime);

            //izvrsi query
            if($statment->execute()){
                $last_id = $this->connection->lastInsertId();
                $this->clanSifra = htmlspecialchars(strip_tags($last_id));
                $this->projektSifra = htmlspecialchars(strip_tags($this->projektSifra));
                $this->voditelj = htmlspecialchars(strip_tags($this->voditelj));
    
                //spajane parametara
                $statmentSifra->bindParam(':clanSifra', $this->clanSifra);
                $statmentSifra->bindParam(':projektSifra', $this->projektSifra);
                $statmentSifra->bindParam(':voditelj', $this->voditelj);
    
                //izvrsi query
                if($statmentSifra->execute()){
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

       //brisanje
       public function Obrisi(){
           //stvaranje querya
           $sQuery = 'DELETE FROM ' . $this->table . ' WHERE sifra = :sifra';
           $sQuery2 = 'DELETE FROM sifrarnik WHERE clanSifra = :sifra';

           //priprema izjave
           $statment=$this->connection->prepare($sQuery);
           $statment2= $this->connection->prepare($sQuery2);

            //ocisti podatke
            $this->sifra = htmlspecialchars(strip_tags($this->sifra));

            //spajanje id parametara sa query-om 
            $statment->bindParam(':sifra', $this->sifra);
            $statment2->bindParam(':sifra', $this->sifra);

             //izvrsi query
             if($statment->execute()){

                    if($statment2->execute()){
                        return true;
                    }

                    printf("Error %s. \n", $statment->error);
                    return false;

                return true;
            }

            //ispisi error ukoliko je doslo do neke greske
            printf("Error %s. \n", $statment->error);
            return false;
       }
       
       public function AzurirajProjekte(){
            //stvaranje querya
           $sQuery = 'UPDATE projekti SET status = 0 WHERE sifra = :projektSifra AND (SELECT COUNT(sifrarnik.projektSifra) FROM sifrarnik 
           WHERE sifrarnik.projektSifra = :projektSifra2) = 0';

           //priprema izjave
           $statment=$this->connection->prepare($sQuery);
  
            //ocisti podatke

            $this->projektSifra = htmlspecialchars(strip_tags($this->projektSifra));
            $this->projektSifra2 = htmlspecialchars(strip_tags($this->projektSifra));

            //spajanje id parametara sa query-om 

            $statment->bindParam(':projektSifra', $this->projektSifra);
            $statment->bindParam(':projektSifra2', $this->projektSifra2);

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