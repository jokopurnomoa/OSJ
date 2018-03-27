<?php
	class Create{
		
		public function __construct(){}
		
		public function CreateDatabase(){				
			$Connect = new Connection();
			$Connect->getConnection();
			
			$query = mysql_query("
				CREATE DATABASE IF NOT EXISTS `osj_database`
			");
			
			$Connect->getSelectDatabase('osj_database');			
			$query = mysql_query("
				CREATE TABLE IF NOT EXISTS `installed_apps` (
  				`id` int(10) NOT NULL AUTO_INCREMENT,
  				`name_apps` varchar(255) DEFAULT NULL,
  				PRIMARY KEY (`id`)
				) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
			");
			
			if($query)
				return true;
			else
				return false;	
		}
		
		public function CreateTable($tbname){
			$Connect = new Connection();
			$Connect->getConnection();
			$Connect->getSelectDatabase('osj_database');
			$query = mysql_query("
				CREATE TABLE IF NOT EXISTS `$tbname` (
  				`id` int(10) NOT NULL AUTO_INCREMENT,
  				`apps` varchar(100) DEFAULT NULL,
  				`type` varchar(20) DEFAULT NULL,
  				`filename` varchar(255) DEFAULT NULL,
  				PRIMARY KEY (`id`)
				) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
			");
			if($query)
				$cek = mysql_fetch_array(mysql_query("SELECT * FROM installed_apps WHERE name_apps = '$tbname'"));
				if($cek <= 0)
					mysql_query("INSERT INTO installed_apps VALUES(null, '$tbname')");
			if($query)
				return true;
			else
				return false;	
		}
		
		public function InsertToTable($table, $value){
			$query = NULL;
			foreach($value as $val){
				if($val[0] != "")
					$cek = mysql_fetch_array(mysql_query("SELECT * FROM $table WHERE type = '$val[1]' and filename = '$val[2]'"));
					if($cek <= 0){
						$query = mysql_query("INSERT INTO $table VALUES(null,'$val[0]','$val[1]','$val[2]')");
					}
				}
			if($query)
				return true;
			else
				return false;	
		}
	}
?>