<?php
class OSJDB{
    public $StrConnection = "";

    /* Constuctor */
    public function OSJDB(){

    }

    public function Connection($str_connection){
        $this->StrConnection = $str_connection;
    }

    public function Query($command){
        $a_command = explode(" ", $command);
    }
}

$db = new OSJDB();
$db->Query("SELECT * FROM system");
?>