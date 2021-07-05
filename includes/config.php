<?php 
    $dbUser = 'root';
    $dbPassword = '';
    $dbName = 'upravljanje_projektima';

    $db = new PDO('mysql:host=localhost;dbname='.$dbName.';charset=utf8',$dbUser,$dbPassword);

    //neki atributi

    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); //za brze izvrsavanje upita nad bazom
    $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true); //za brze izvrsavanje upita nad bazom
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    define('APP_NAME', 'PHP REST API');

?>
