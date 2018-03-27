<?php
	class Operation{
		public function FetchAll(){
			$Q = new Query();
			$Q->Connection();
			
			$first_id = 0;
			$last_id = 0;
			if(isset($_POST['first_id']))
				$first_id = $_POST['first_id'];
			if(isset($_POST['last_id']))
				$last_id = $_POST['last_id'];
			if(isset($_POST['sender']))
				$sender = $_POST['sender'];
			if(isset($_POST['receiver']))
				$receiver = $_POST['receiver'];
			$i = 0;
			$result = 0;
			
			$array = $Q->SelectAll('tb_message', "WHERE username = '$receiver' AND message_to = '$sender' AND message_id > $last_id OR username = '$sender' AND message_to = '$receiver' AND message_id > $last_id order by message_id DESC");
			if(count($array) > 0){
				$json = '{"contens" : [';
				foreach($array as $message){
					if(($message['username'] == $receiver && $message['message_to'] == $sender) || 
					($message['username'] == $sender && $message['message_to'] == $receiver)){
						$result++;
						if($message['username'] == $receiver && $message['message_to'] == $sender)
							$Q->Update('tb_message', 'opened', '1', "WHERE message_id = $message[message_id]");
						$username = $message['username'];
						$json .= '["'.$Q->GetName($username).'","'.str_replace("\\","",str_replace("%br%","<br>",$message['message_content'])).'","'.$message['date_of_message'].'","'.$Q->nicetime($message['date_of_message']).'","'.$message['opened'].'","'.$message['message_id'].'"],';
						if($i == 0)
							$last_id = $message['message_id'];
						$i++;
						$first_id = $message['message_id'];
					}
				}
				$json = substr($json,0,strlen($json)-1);
				$json .= '],';
				
				$json .= '"sum" : "'.$i.'",';
				$json .= '"firstId" : "'.$first_id.'",';
				$json .= '"lastId" : "'.$last_id.'"}';
				
			} 
			if ($result == 0){
				$json = '{"sum" : "0"}';
			}
			echo $json;				
		}
		public function Insert(){
			$Q = new Query();
			$Q->Connection();
			$sender = '';
			$receiver = '';
			$conten = '';
			
			if(isset($_SESSION['LOGIN_USER_NOW'])){
				$sender = $_SESSION['LOGIN_USER_NOW'];
			}
			if(isset($_POST['receiver']))
				$receiver = $_POST['receiver'];
			if(isset($_POST['conten']))
				$conten = $_POST['conten'];
				
			$conten = str_replace("\\","",$conten);
		
			$Q->InsertMessage($sender, $receiver, htmlspecialchars(str_replace("\t","    ",$conten), ENT_QUOTES));
		}

		public function SearchUser(){
			$Q = new Query();
			$Q->Connection();
			$result = $Q->SelectAll('tb_user','');
			$arr_name = NULL;
			$arr_username = NULL;
			$arr_email = NULL;
			$i = 0;
			foreach($result as $data){
				$arr_name[$i] = $data['name'];
				$arr_username[$i] = $data['username'];
				$arr_email[$i] = $data['email'];
				$i++;
			}
			
			$username_now = "";
			if(isset($_SESSION['LOGIN_USER_NOW']))
				$username_now = $_SESSION['LOGIN_USER_NOW'];
			
			$keyword = "";
			$res = NULL;
			$j = 0;
			$res_name = NULL;
			if(isset($_POST['keyword']))
				$keyword = $_POST['keyword'];
			if($keyword != ""){
				for($i=0; $i<count($arr_name); $i++) {
					if (strtolower($keyword)==strtolower(substr($arr_name[$i],0,strlen($keyword)))) {
						if($arr_username[$i] != $username_now && $j < 10){
							$res[$j]=$arr_username[$i];
							$res_name[$j]=$arr_name[$i];				
							$j++;
						}
					}
				}
				for($i=0; $i<count($arr_email); $i++) {
					if (strtolower($keyword)==strtolower(substr($arr_email[$i],0,strlen($keyword)))) {
						$insert = true;
						for($k = 0;$k<count($res);$k++){
							if($res[$k] == $arr_username[$i])
								$insert = false;
						}
						if($insert && $arr_username[$i] != $username_now && $j < 10){
							$res[$j]=$arr_username[$i];
							$res_name[$j]=$arr_name[$i];				
							$j++;
						}
					}
				}
				for($i=0; $i<count($arr_username); $i++) {
					if (strtolower($keyword)==strtolower(substr($arr_username[$i],0,strlen($keyword)))) {
						$insert = true;
						for($k = 0;$k<count($res);$k++){
							if($res[$k] == $arr_username[$i])
								$insert = false;
						}
						if($insert && $arr_username[$i] != $username_now && $j < 10){
							$res[$j]=$arr_username[$i];
							$res_name[$j]=$arr_name[$i];				
							$j++;
						}
					}
				}
				// Print Result
				if($j > 0){
					$json = '{"user" : [';
					foreach($res as $data){
						$json .= '"'.$data.'",';
					}
					$json = substr($json,0,strlen($json)-1);
					$json .= '],';
					$json .= '"name" : [';
					foreach($res_name as $data){
						$json .= '"'.$data.'",';
					}
					$json = substr($json,0,strlen($json)-1);
					$json .= '],';
					$json .= '"email" : [';
					foreach($res as $data){
						$json .= '"'.substr($Q->GetEmail($data),0,20).'",';
					}
					$json = substr($json,0,strlen($json)-1);
					$json .= '],';
					$json .= '"sum" : "'.$j.'"}';
					print($json);
				} else {
					$json = '{"sum" : "'.$j.'"}';
					print($json);
				}
			}	
		}
		
		public function GetNewMessage(){
			$Q = new Query();
			$Q->Connection();
			$last_id = 0;
			if(isset($_POST['last_id']))
				$last_id = $_POST['last_id'];
			if(isset($_POST['sender']))
					$sender = $_POST['sender'];
			if(isset($_POST['receiver']))
					$receiver = $_POST['receiver'];
				
			echo $Q->GetCount('tb_message',"WHERE message_id > $last_id AND username = '$receiver' AND message_to = '$sender' AND opened = '0'");			
		}
		
		public function UsernameExist(){
			$Q = new Query();
			$Q->Connection();
			if(isset($_POST['username']))
					$username = $_POST['username'];
			$res = $Q->SelectAll('tb_user',"WHERE username = '$username'");
			$res = $res[0];
			if(isset($res[0]))
				echo 1;
			else
				echo 0;
		}
		
		public function UpdateUsername(){
			$Q = new Query();
			$Q->Connection();
			if(isset($_POST['username_old']))
					$username_old = $_POST['username_old'];
			if(isset($_POST['username_new']))
					$username_new = $_POST['username_new'];
					
			$res = $Q->SelectAll('tb_user',"WHERE username = '$username_old'");
			$res = $res[0]['id_user'];
			$result = $Q->Update('tb_user','username',$username_new,"WHERE id_user = '$res'");
			if($result){
				$_SESSION['LOGIN_USER_NOW'] = $username_new;
				echo $username_new;
			} else {
				echo false;
			}
		}
		
		public function UpdateName(){
			$Q = new Query();
			$Q->Connection();
			if(isset($_POST['username_old']))
					$username_old = $_POST['username_old'];
			if(isset($_POST['name_new']))
					$name_new = $_POST['name_new'];
					
			$res = $Q->SelectAll('tb_user',"WHERE username = '$username_old'");
			$res = $res[0]['id_user'];
			$result = $Q->Update('tb_user','name',$name_new,"WHERE id_user = '$res'");
			if($result){
				echo true;
			} else {
				echo false;
			}
		}
		
		public function UpdateEmail(){
			$Q = new Query();
			$Q->Connection();
			if(isset($_POST['username_old']))
					$username_old = $_POST['username_old'];
			if(isset($_POST['email_new']))
					$email_new = $_POST['email_new'];
					
			$res = $Q->SelectAll('tb_user',"WHERE username = '$username_old'");
			$res = $res[0]['id_user'];
			$result = $Q->Update('tb_user','email',$email_new,"WHERE id_user = '$res'");
			if($result){
				echo true;
			} else {
				echo false;
			}
		}
		
		public function UpdatePassword(){
			$Q = new Query();
			$Q->Connection();
			if(isset($_POST['username_old']))
					$username_old = $_POST['username_old'];
			if(isset($_POST['password_new']))
					$password_new = $_POST['password_new'];
					
			$res = $Q->SelectAll('tb_user',"WHERE username = '$username_old'");
			$res = $res[0]['id_user'];
			$result = $Q->Update('tb_user','password',md5($password_new),"WHERE id_user = '$res'");
			if($result){
				echo true;
			} else {
				echo false;
			}
		}
		
		public function GetStatusMessage(){
			$Q = new Query();
			$Q->Connection();
			$arr_id_message = NULL;
			if(isset($_POST['arr_id_message']))
					$arr_id_message = $_POST['arr_id_message'];
			$json = '{"status" : [';
			$c = 0;
			if($arr_id_message != NULL){
				foreach($arr_id_message as $id){
					$res = $Q->SelectAll('tb_message',"WHERE message_id = '$id'");
					$json .= '"'.$res[0]['opened'].'",';
					$c++;
				}
			}
			if($c>0)
				$json = substr($json,0,strlen($json)-1);
			$json .= ']}';
			echo $json;
		}
		
		public function GetNewMessageInfo(){
			$Q = new Query();
			$Q->Connection();
			if(isset($_POST['username']))
				$username = $_POST['username'];
			$array = $Q->SelectAll('tb_message', "WHERE message_to = '$username' AND opened = '0'");
			$i = 0;
			$message_all = 0;
			//print_r($array);
			$json = '{"sum" : "'.$message_all.'"}';
			if(count($array) > 0){
				foreach($array as $message){
					if($i > 0){
						for($k=0;$k<$i;$k++){
							if($arr_username[$k] != $message['username']){
								$arr_username[$i] = $message['username'];
								$arr_name[$i] = $Q->GetName($message['username']);
								$arr_count[$i] = 1;
								$i++;
							}
						}
					} else {
						$arr_username[$i] = $message['username'];
						$arr_name[$i] = $Q->GetName($message['username']);
						$i++;						
					}
					$message_all++;
				}
				$json = '{"user" : [';
				if($i > 0){
					for($j=0;$j<$i;$j++){
						$json .= '"'.$arr_username[$j].'",';
					}
					$json = substr($json,0,strlen($json)-1);
				}
				$json .= '],';
				
				$json .= '"sum" : "'.$message_all.'"}';
			} 
			echo($json);
		}
	}
?>