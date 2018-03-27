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
	$username = "";
	$name = "";
	$email = "";
	$pass = "";
	$jenis = "";
	$tanggal = "";
	$bulan = "";
	$tahun = "";
	$ttl = "";
	if(isset($_POST['username']))
		$username = strtolower($_POST['username']);

	if(isset($_POST['name']))
		$name = $_POST['name'];
	
	if(isset($_POST['email']))
		$email = $_POST['email'];
	
	if(isset($_POST['password']))
		$pass = $_POST['password'];

	if(isset($_POST['jenis']))
		$jenis = $_POST['jenis'];
	
	if(isset($_POST['tanggal']))
		$tanggal = $_POST['tanggal'];
	
	if(isset($_POST['bulan']))
		$bulan = $_POST['bulan'];
	
	if(isset($_POST['tahun']))
		$tahun = $_POST['tahun'];
		
	if($tanggal < 10)
		$tanggal = "0".$tanggal;
	$ttl = $tahun."-".$bulan."-".$tanggal;
	$valid = false;
	$data = NULL;
	$Signup = false;
	if($username != "" && $name != "" && $email != "" && $pass != "" && $jenis != ""){
		$data = array($username, $name, $email, md5($pass), $jenis, $ttl, gmdate("Y-m-d H:i:s"));
		$valid = true;
		$Signup = $Q->InsertUser('tb_user', $data);
	}
	
	if($Signup && $valid){
		$_SESSION['LOGIN_USER_NOW'] = $username;
?>
<script language="javascript">
	window.location.href="../../index.php";
</script>
<?php
	} else {
?>
<script language="javascript">
	window.location.href="../../daftar.php";
</script>
<?php		
	}
?>
</body>
</html>