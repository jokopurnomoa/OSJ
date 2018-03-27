<?php
	include_once("Query.php");
?>
<!DOCTYPE html>
<html  lang="en">
<head>
	<meta charset="utf-8" />
	<title>Link Me</title>
</head>
<body>
<?php
	$Q = new Query();
	$Q->Connection();
	$user = "";
	$pass = "";
	if(isset($_POST['username']))
		$user = strtolower($_POST['username']);

	if(isset($_POST['password']))
		$pass = $_POST['password'];

	$Auth = $Q->GetAuthorized($user, $pass);
	if($Auth){
		$_SESSION['login_error'] = false;
		$_SESSION['LOGIN_USER_NOW'] = $user;
?>
<script language="javascript">
	window.location.href="../../";
</script>
<?php
	} else {
		$_SESSION['login_error'] = true;
?>
<script language="javascript">
	window.location.href="../../";
</script>
<?php		
	}
?>
</body>
</html>