<?php
	$directory = "tes_decode/calculator.dapp";
	$dest_dir = "";
	$filename = "";
	if(isset($_GET["directory"])){
		$directory = $_GET["directory"];
	}

	$len = strlen($directory);
	if($directory[$len-1] == "/")
		$directory = substr($directory, 0, $len-1);
	$dest_dir = $directory;
	$start = 0;
	$len = strlen($directory);
	for($i=$len-1;$i>=0;$i--){
		if($directory[$i] == "/"){
			$start = ++$i;
			$i = 0;
		}
	}
	
	$filename = substr($directory, $start, $len-$start);
	if(isset($_GET["dest_dir"])){
		$dest_dir = $_GET["dest_dir"];
		if($dest_dir[strlen($dest_dir)-1] != "/")
			$dest_dir .= "/";
		$dest_dir .= $filename;
	}
	
	$dest_dir = str_replace($filename, "", $dest_dir);
	$directory = str_replace($filename, "", $directory);
	$handle = fopen($directory.$filename,"rb");
	$data = fread($handle, 13321772);
	fclose($handle);
	$data = gzuncompress($data);
	$len = strlen($data);
	$is_filename = false;
	$is_dirname = false;
	$is_file_start = false;
	$file_name = "";
	$dir_name = "";
	$file = "";
	$success = true;
	for($i=0;$i<$len;$i++){
		if($data[$i] == "["){
			$val = substr($data, $i, 9);
			if($val == "[ENDFILE]"){
				$i+=8;
				$handle = fopen($dest_dir.$file_name, "wb");
				$write = fwrite($handle, $file);
				if(!$write)
				$success = false;
				fclose($handle);
				$is_filename = false;
				$file_name = "";
				$is_file_start = false;
				$file = "";
			}
		}
		
		if($is_file_start){
			$file .= $data[$i];
		}
		
		if($data[$i] == "["){
			$val = substr($data, $i, 11);
			if($val == "[STARTFILE]"){
				$i+=10;
				$is_filename = false;
				$is_file_start = true;
			}
		}

		if($is_filename){
			$file_name .= $data[$i];
		}

		if($data[$i] == "["){
			$val = substr($data, $i, 10);
			if($val == "[FILENAME]"){
				$i+=9;
				$is_filename = true;
			}
		}

		if($data[$i] == "["){
			$val = substr($data, $i, 8);
			if($val == "[ENDDIR]"){
				$i+=7;
				$is_dirname = false;
				rrmdir($dest_dir.$dir_name);
				$mkdir = mkdir($dest_dir.$dir_name);
				if(!$mkdir)
				$success = false;
				$dir_name = "";
			}
		}
	
		if($is_dirname){
			$dir_name .= $data[$i];
		}
		if($data[$i] == "["){
			$val = substr($data, $i, 9);
			if($val == "[DIRNAME]"){
				$is_dirname = true;
				$i += 8;
			}
		}
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
	
	if($success){
		echo "SUCCESS";
	} else {
		echo "FAILED";
	}
?>