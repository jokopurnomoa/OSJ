<?php
	$dir = "";
	if(isset($_GET['dir'])){
		$dir = $_GET['dir'];
	}
	$dir = str_replace(".dapp", "", $dir);
	if(file_exists($dir))
		echo "EXIST";
?>