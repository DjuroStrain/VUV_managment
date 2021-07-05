<?php

    defined('DS') ? null : define('DS', DIRECTORY_SEPARATOR); //ako je ds definiran ucini nista inace definiraj ga
    defined('SITE_ROOT') ? null : define('SITE_ROOT', DS . 'wamp64'.DS.'www'.DS.'VUV_managment'); //pocetna

    defined('INCLUDE_PATH') ? null : define('INCLUDE_PATH', SITE_ROOT.DS.'includes'); //put do datoteka u include folderu
    defined('CORE_PATH') ? null : define('CORE_PATH', SITE_ROOT.DS.'core'); //put do datoteka u include folderu


    //ucitavanje config datoteke
    require_once(INCLUDE_PATH.DS."config.php");

    //core klase
    require_once(CORE_PATH.DS."projekti.php");
    require_once(CORE_PATH.DS."aktivnosti.php");
    require_once(CORE_PATH.DS."clanovi.php");
    require_once(CORE_PATH.DS."lokacija.php");
    require_once(CORE_PATH.DS."sifrarnik.php");
    require_once(CORE_PATH.DS."prijava.php");

?>