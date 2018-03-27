<?php
	if(isset($_GET['dir']) || isset($_POST['dir'])){
		$dir = "";
		if(isset($_POST['dir']))
			$dir = $_POST['dir'];
		if($dir == "")
			$dir = $_GET['dir'];
		$dh = fopen("../../../".$dir,'r');        	
        $result = fread($dh, 130000000);
		fclose($dh);
		echo $result;
	}
?>