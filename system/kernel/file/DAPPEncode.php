<?php
	$directory = "tes_encode/calculator/";
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
	
	if(file_exists($dest_dir.".dapp"))
		unlink($dest_dir.".dapp");
	
	$list_dir = null;
	
	function rdir($src, $res, $lv) {
		$result = $res;
        if (is_dir ($src)) {
			$result[] = $src;
            $files = scandir ($src);
			$lv++;
            foreach ( $files as $file )
                if ($file != "." && $file != "..")
                    $result = rdir ("$src/$file", $result, $lv);
        } else 
            $result[] = $src;
        return $result;
    }
	
	function replace_directory($list_dir, $directory){
		$result = null;
		foreach ($list_dir as $l) {
			$result[] = str_replace($directory, "", $l);
		}
		return $result;
	}
	
	$list_dir = rdir($directory, $list_dir, 0);
	$list_dir = replace_directory($list_dir, $directory);
	$source = null;
	foreach ($list_dir as $list) {		
		if(is_file($directory.$list)){
			$handle = fopen($directory.$list, "rb");
			$value = "[FILENAME]".$filename.$list."[STARTFILE]";
			$value .= fread($handle, 13342177);
			fclose($handle);
			$value .= "[ENDFILE]";
			$source .= $value;
		} else {
			$value = "[DIRNAME]".$filename.$list."[ENDDIR]";
			$source .= $value;
		}
	}
	
	$handle = fopen($dest_dir.".dapp", "wb");
	$source = gzcompress($source, 9);
	$write = fwrite($handle, $source);
	fclose($handle);
	if($write){
		echo "SUCCESS";
	} else {
		echo "FAILED";
	}
?>