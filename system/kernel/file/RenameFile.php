<?php
	if(isset($_GET['dirname']) && isset($_GET['newname'])){
		$dir = str_replace("~","../../../virtual-disk",$_GET['dirname']);
		if($dir[strlen($dir)-1] == "/")
			$dir = substr($dir,0,strlen($dir)-1);
		$oldname = str_replace("../../../../", "../../../", $dir);
		$dirrev = strrev($dir);
		$filetype = get_filetype($dir);
		$dir = get_directory($dir);
		$newname = $dir.substr($_GET['newname'],0,strlen($_GET['newname']));
		if(get_filetype($newname) != $filetype && !is_dir($oldname))
			$newname = $newname.".".$filetype;
		
		if(rename($oldname, $newname)){
			print("SUCCESS");
		} else {
			print('FAILED');
		}
	}
	
	function get_filetype($dir){
		/* get filetype */
		$filetype = "";
		$dirrev = strrev($dir);
		for($i=0;$i<strlen($dir);$i++){
			if($dirrev[$i] == "."){
				$filetype = substr($dir, strlen($dir)-$i, strlen($dir));
				$i = strlen($dir);
			}
		}
		return $filetype;
	}
	
	function get_directory($dir){
		/* get directory */
		$result = "";
		$dirrev = strrev($dir);
		for($i=0;$i<strlen($dir);$i++){
			if($dirrev[$i] == "/"){
				$result = str_replace("../../../../", "../../../", substr($dir, 0, strlen($dir)-$i));
				$i = strlen($dir);
			}
		}
		return $result;
	}
?>