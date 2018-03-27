<?php
	$filename = "";
	$destdir = "";
	$replace = false;
	$is_exist = false;
	if(isset($_GET['filename'])){
		$filename = $_GET['filename'];
	}

	if(isset($_GET['destdir'])){
		$destdir = $_GET['destdir'].$filename;
	}
	
	if(isset($_GET['replace'])){
		$is_replace = $_GET['replace'];
		if($is_replace == "Y")
			$replace = true;
	}
	
	if($replace){
		if(file_exists(str_replace(".dapp", "", $destdir)))
			rrmdir(str_replace(".dapp", "", $destdir));
	}
	
	if(!file_exists(str_replace(".dapp", "", $destdir))){
		$handle = fopen("../../../kernel/database/system/apps_installed.json", "rt");
		$data = fread($handle, 10000000);
		$data = json_decode($data);
		fclose($handle);
		for($i=0;$i<count($data);$i++){
			if(strtolower($data[$i]) == strtolower(str_replace(".dapp", "", $filename))){
				$is_exist = true;
			}
		}
		if(!$is_exist){
			$handle = fopen("../../../kernel/database/system/apps_installed.json", "wt");
			$data[] = str_replace(".dapp", "", $filename);
			print_r($data);
			$result = fwrite($handle, json_encode($data));
			fclose($handle);
			if($result)
				echo "SUCCESS";
			else
				echo "FAILED";
		} else if(!$replace){
			echo "EXIST";
		} else
			echo "SUCCESS";		
	} else {
		echo "EXIST";
	}
	
	function rrmdir($dir) {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file)
                if ($file != "." && $file != "..") rrmdir("$dir/$file");
            rmdir($dir);
        }
        else if (file_exists($dir)) unlink($dir);
    }
	
	
?>