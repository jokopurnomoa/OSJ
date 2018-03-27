<?php
	$filetype = "";
	if(isset($_GET['filetype'])){
		$filetype = $_GET['filetype'];
	}
	$handle = fopen("../database/system/filetype.json","rt");
	$data = fread($handle, 10000000);
	$data = json_decode($data);
	fclose($handle);
	for($i=0;$i<count($data);$i++){
		if(strtolower($data[$i][0]) == strtolower($filetype)){
			echo $data[$i][1];	
		}
	}
?>