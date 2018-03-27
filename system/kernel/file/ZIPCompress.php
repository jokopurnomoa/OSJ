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
	//$dest_dir .= "backup.zip";
	$directory = str_replace($filename, "", $directory);
	
	$handle = opendir($directory."calculator");
	
	$zip = new ZipArchive();
	if($zip->open($dest_dir, ZIPARCHIVE::CREATE)!==TRUE){
		exit("cannot open file!");
	} else {
		echo "zip created";
	}
	
	while(($file = readdir($handle)) != false){
		$zip->addFile($file);
		echo $file."\n";
	}
	
	closedir($handle);
	
	echo "num-files:".$zip->numFiles;
	if($zip->status == ZIPARCHIVE::ER_OK)
		echo "error";
	echo "zip-status:".$zip->status;
	
	$zip->close();
?>