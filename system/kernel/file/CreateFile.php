<?php
	$data = "";
	$replace = "N";
	if(isset($_POST['data'])){
		$data = $_POST['data'];
	}
	if(isset($_GET['replace'])){
		$replace = $_GET['replace'];
	}
	if(isset($_GET['filename'])){
		if(!file_exists("../../../virtual-disk/documents/".$_GET['filename']) || ($replace == "Y")){
			$fo = fopen("../../../virtual-disk/documents/".$_GET['filename'], "w");
			$fw = fwrite($fo, $data);
			$fc = fclose($fo);
			if($fo && $fw && $fc){
				print('SUCCESS');
			} else {
				print('FAILED');
			}
		} else {
			print('EXIST');
		}
	}
?>