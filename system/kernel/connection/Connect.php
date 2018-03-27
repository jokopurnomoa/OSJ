<?php
	class Connection{
		
		protected $dbhost = "localhost";
		protected $dbuser = "root";
		protected $dbpass = "";
		
		public function __construct(){}
		
		public function getConnection(){
			$result = mysql_connect($this->dbhost, $this->dbuser, $this->dbpass);
			
			if($result)
				return true;
			else
				return false;	
		}
		
		public function getSelectDatabase($dbname){
			$result = mysql_select_db($dbname);
			
			if($result)
				return true;
			else
				return false;	
		}
	}
?>