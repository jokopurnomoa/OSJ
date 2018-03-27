<?php
	$dir = "";
	if(isset($_GET['dir'])){
		$dir = $_GET['dir'];
	}
	$handle = fopen("../../../".$dir, "rb");
	$data = fread($handle, 10485760);
	fclose($handle);
	echo base64_encode($data);
?>
