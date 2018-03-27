<?php
	$filename = "";
	$dir = "";
	$data = "";
	
	if(isset($_POST['filename'])){
		$filename = $_POST['filename'];
	}

	if(isset($_POST['data'])){
		$data = $_POST['data'];
	}
	
	$dir = "../../../../virtual-disk/workspace/";
	$handle = fopen($dir.$filename, "wt");
	fwrite($handle, $data);
	echo "WRITING in ".$dir.$filename;
?>