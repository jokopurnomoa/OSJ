<?php
	include_once("Query.php");
	include_once("Operation.php");
	class Control{
		public function Construct(){
			$Operation = '';
			if(isset($_POST['operation']))
				$Operation = $_POST['operation'];
			
			$O = new Operation();
			if(strtoupper($Operation) == 'FETCH_ALL'){
				$O->FetchAll();
			}
			else if(strtoupper($Operation) == 'INSERT'){
				$O->Insert();
			}
			else if(strtoupper($Operation) == 'GET_NEW_MESSAGE'){
				$O->GetNewMessage();
			}
			else if(strtoupper($Operation) == 'GET_DATE'){
				$Q = new Query();
				echo $Q->GetDate();		
			}
			else if(strtoupper($Operation) == 'NICETIME'){
				$Q = new Query();
				echo $Q->GetDate();		
			}
			else if(strtoupper($Operation) == 'GET_USERNAME'){
				echo $_SESSION['LOGIN_USER_NOW'];
			}
			else if(strtoupper($Operation) == 'GET_NAME'){
				$Q = new Query();
				echo $Q->GetNameNow();		
			}
			else if(strtoupper($Operation) == 'SEARCH_USER'){
				$O->SearchUser();
			}
			else if(strtoupper($Operation) == 'USERNAME_EXIST'){
				$O->UsernameExist();
			}
			else if(strtoupper($Operation) == 'UPDATE_USERNAME'){
				$O->UpdateUsername();
			}		
			else if(strtoupper($Operation) == 'UPDATE_NAME'){
				$O->UpdateName();
			}
			else if(strtoupper($Operation) == 'UPDATE_EMAIL'){
				$O->UpdateEmail();
			}
			else if(strtoupper($Operation) == 'UPDATE_PASSWORD'){
				$O->UpdatePassword();
			}
			else if(strtoupper($Operation) == 'GET_STATUS_MESSAGE'){
				$O->GetStatusMessage();
			}
			else if(strtoupper($Operation) == 'GET_NEW_MESSAGE_INFO'){
				$O->GetNewMessageInfo();
			}		
		}
	}
	$C = new Control();
	$C->Construct();
?>