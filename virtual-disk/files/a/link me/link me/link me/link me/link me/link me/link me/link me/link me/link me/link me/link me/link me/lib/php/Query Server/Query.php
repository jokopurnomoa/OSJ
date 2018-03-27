<?php
	session_start();
	class Query{
		private $Host = 'mysql.idhostinger.com';
		private $User = 'u756593426_lm';
		private $Password = 'a';
		private $Database = 'u756593426_lm';
		
		public function Connection(){
			$connect = mysql_connect($this->Host, $this->User, $this->Password);
			$select = false;
			if($connect)
				$select = mysql_select_db($this->Database);
			if($select)
				return true;
			else
				return false;
		}
		
		public function NewConnection($Host, $User, $Password, $Database){
			$this->Host = $Host;
			$this->User = $User;
			$this->Password = $Password;
			$this->Database = $Database;
			
			$connect = mysql_connect($this->Host, $this->User, $this->Password);
			$select = false;
			if($connect)
				$select = mysql_select_db($this->Database);
			if($select)
				return true;
			else
				return false;
		}
		
		public function SelectAll($Table, $Valid){
			$result = NULL;
			$query = mysql_query("SELECT * FROM $Table $Valid");
			if($query){
				while($data = mysql_fetch_array($query))
					$result[] = $data;
			}
			
			return $result;
		}
		
		public function Insert($Table, $ArrayData){
			$data[] = NULL;
			$i = 0;
			foreach($ArrayData as $res){
				$data[$i] = $res;
				$i++;
			}
			$query = mysql_query("INSERT INTO $Table VALUES('$data[0]','$data[1]','$data[2]','$data[3]','$data[4]','0')");
			if($query)
				return true;
			else
				return false;	
		}
		
		public function Update($Table, $Field, $Value, $Valid){
			$query = mysql_query("UPDATE $Table SET $Field = '$Value' $Valid");
			if($query)
				return true;
			else
				return false;
		}
		
		public function InsertUser($Table, $data){
			$query = mysql_query("INSERT INTO $Table VALUES(null,'$data[0]','$data[1]','$data[2]','$data[3]','$data[4]','$data[5]','$data[6]','')");
			if($query)
				return true;
			else
				return false;				
		}
		
		public function InsertMessage($sender, $receiver, $conten){
			$data = array(NULL, $sender, $receiver, $conten, gmdate("Y-m-d H:i:s"));
			$res = Query::Insert('tb_message', $data);
			if($res)
				return true;
			else
				return false;
		}
		
		public function GetAuthorized($username, $password){
			$password = md5($password);
			$result = Query::SelectAll('tb_user',"WHERE username = '$username' AND password = '$password'");
			if(isset($result[0])){
				if($result[0]['password'] == $password && strtolower($result[0]['username']) == $username)
					return true;
			}
			else
				return false;
		}
		
		public function GetNameNow(){
			$name = "";
			Query::Connection();
			if(isset($_SESSION['LOGIN_USER_NOW']))
				$username = $_SESSION['LOGIN_USER_NOW'];
			return Query::GetName($username);
		}
		
		public function GetName($username){
			$result = Query::SelectAll('tb_user',"WHERE username = '$username'");
			if(isset($result[0]['name']))
				return $result[0]['name'];
			else
				return $username;
		}
		
		public function GetEmail($username){
			$result = Query::SelectAll('tb_user',"WHERE username = '$username'");
			if(isset($result[0]['email']))
				return $result[0]['email'];
			else
				return $username;
		}
		
		public function GetCount($Table, $Valid){
			$query = mysql_query("SELECT * FROM $Table $Valid");
			if($query)				
				return mysql_num_rows($query);
			else
				return 0;
		}
		
		public function nicetime($date){
    		if(empty($date)) {
        		return "No date provided";
    		}
    
    		$periods         = array("detik", "menit", "jam", "hari", "minggu", "bulan", "tahun", "dekade");
    		$lengths         = array("60","60","24","7","4.35","12","10");
    
    		$now             = time();
    		$unix_date         = strtotime($date);
    
       		// check validity of date
    		if(empty($unix_date)) {    
        		return "Bad date";
    		}

    		// is it future date or past date
    		if($now > $unix_date) {    
        		$difference     = $now - $unix_date;
        		$tense         = "yg lalu";
        
    		} else {
        		$difference     = $now - $unix_date;
        		$tense         = "yg lalu";
    		}
    
    		for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
        		$difference /= $lengths[$j];
    		}
    
    		$difference = round($difference);
    
    		if($difference != 1) {
        		$periods[$j].= "";
    		}
    		if($difference > 0)
    			return "$difference $periods[$j] {$tense}";
			else
				return "beberapa saat yg lalu";
		}
		
		public function GetDate(){
			return gmdate("Y-m-d H:i:s");
		}
	}
	
	/*echo "Testing";
	$Q = new Query();
	print_r($Q->Connection());
	print $Q->InsertMessage('JOKO','USER','HALO');
	*/
?>