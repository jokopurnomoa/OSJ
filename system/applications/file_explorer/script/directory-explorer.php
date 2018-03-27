<?php
$dir = "../../../../virtual-disk/";
if(isset($_POST['dir'])){
	if($_POST['dir'] != ""){
		$dir = str_replace("~","../../../../virtual-disk/",$_POST['dir']);

        if (get_os() == 'Windows') {
            $dir = str_replace("//","\\",$dir);
        }
	}
}

function get_os() {

	$ua = $_SERVER["HTTP_USER_AGENT"];
	$os_platform = "Unknown";

	if (strpos($ua, 'Linux')) {
		$os_platform = "Unknown";
	} elseif (strpos($ua, 'Macintosh')) {
		$os_platform = "Macintosh";
	} elseif (strpos($ua, 'Windows')) {
		$os_platform = "Windows";
	}

	return $os_platform;
}

function get_tipe_file($fn){
	$length_of_filename = strlen($fn);
    $last_char = substr($fn, $length_of_filename - 1, 1);

    for($i_parse_name = 0; $i_parse_name < $length_of_filename; $i_parse_name++){
        $last_char = substr($fn, $length_of_filename - $i_parse_name + 2, 1);
       
        $filename_suffix = "";
		if($last_char == "."){
            $filename_suffix = substr($fn, $length_of_filename - $i_parse_name + 2, $i_parse_name);
            $filename_prefix = substr($fn, 0, $length_of_filename - strlen($filename_suffix));
            $i_parse_name = $length_of_filename;
        }
    }
	return $filename_suffix;
}

function get_folder_value($filename){
	if(is_dir($filename)){
		$value = glob($filename . '*', GLOB_BRACE);
		return count($value);
	} else {
		return 0;
	}
}

function get_folder_value_dir($filename){
	if(is_dir($filename)){
		$value = glob($filename . '*', GLOB_BRACE);
		$result = 0;
		foreach ($value as $v) {
			if(is_dir($v))
				$result++;
		}
		return $result;
	} else {
		return 0;
	}
}

	$value = glob($dir . '*', GLOB_BRACE);

	$sum = 0;
	$json = '{"thisDir" : "'.$dir.'",';
	$json .= '"isDir" : [';
	foreach($value as $val){
		if(is_dir($val))
			$json .= '1,';
		else
			$json .= '0,';	
		$sum++;
	}
	if($sum > 0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"fileType" : [';
	foreach($value as $val){
		if(is_dir($val))
			$json .= ',';
		else
			$json .= '"'.get_tipe_file($val).'",';	
	}
	if($sum > 0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"value" : [';
	foreach($value as $val){
		$json .= '"'.str_replace($dir,"",$val).'",';
	}
	if($sum > 0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"fileInFolder" : [';
	foreach($value as $val){
		$json .= '"'.get_folder_value($val."/").'",';
	}
	if($sum > 0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"dirInFolder" : [';
	foreach($value as $val){
		$json .= '"'.get_folder_value_dir($val."/").'",';
	}
	if($sum > 0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	$json .= '"sum" : "'.$sum.'"}';
	
	echo $json;
	
//$val = json_encode($value);
//echo '{ "value" : '.$val.'}';
/*if ($nuxdir = opendir($dir)){     //buka direktory yang diperkenalkan
	$result = null;
	$dir = str_replace("\\","//",$dir);
	$json = '{"thisDir" : "'.$dir.'",';
	
	$jfolder = 0;
	/*$json .= '"value" : [';
    while ($isi = readdir($nuxdir)) {
		if($jfolder > 1){
        	$json .= '"'.$isi.'",';
		}
		$jfolder++;
    }
	$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$value = json_encode(glob($dir . '*', GLOB_BRACE));
	
	$json .= '"value" : "'.$value.'",';
	$jfolder2 = 0;
	$json .= '"isDir" : [';
	$nuxdir2 = opendir($dir);
    while ($isi = readdir($nuxdir2)) {
		if($jfolder2 > 1){
			if(is_file($dir.$isi))
				$json .= '1,';
			else
				$json .= '0,';
		}
		$jfolder2++;
    }
	$json = substr($json,0,strlen($json)-1);	
	$json .= '],';
	
	$jfolder2 = 0;
	$json .= '"fileType" : [';
	$nuxdir2 = opendir($dir);
    while ($isi = readdir($nuxdir2)) {
		if($jfolder2 > 1){
			if(is_dir($dir.$isi))
				$json .= ',';
			else
				$json .= '"'.get_tipe_file($isi).'",';
		}
		$jfolder2++;
    }
	$json = substr($json,0,strlen($json)-1);	
	$json .= '],';
	
	$json .= '"sum":"'.($jfolder-1).'"}';
	echo $json;
	closedir($nuxdir);
}
else{
    echo "";
}*/
?>