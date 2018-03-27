<?php
	$filename = "";
	$data = "";
	$directory = "";
	if(isset($_GET['filename'])){
		echo $filename = $_GET['filename'];
	}
	
	if(isset($_GET['directory'])){
		$directory = $_GET['directory'];
	}
	
	if(isset($_POST['data'])){
		$data = $_POST['data'];
	}
	
	if($filename != "" || $filename != "null.html"){
		$handle = fopen("../../../../virtual-disk/workspace/".$directory."/layout/".$filename, "wt");
		if(!$handle){
			echo "Failed Generate Layout";
		} else {
			fwrite($handle, $data);
			echo "SUCCESS";
		}
	} else {
		echo "FAILED";
	}
?>