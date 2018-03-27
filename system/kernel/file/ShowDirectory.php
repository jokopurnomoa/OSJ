<?php
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

	if(isset($_GET['dir'])){
	$dir = str_replace("~","../../../virtual-disk/",$_GET['dir']);
	$value = glob($dir . '*', GLOB_BRACE);

	$sum = 0;
	$json = '{"thisDir" : "'.$dir.'",';
	$json .= '"isDir" : [';
	foreach($value as $val){
		if(is_dir($val))
			$json .= '1,';
		else
			$json .= '0,';	
	}
	if($sum>0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"fileSize" : [';
	foreach($value as $val){
		$json .= '"'.filesize($val).'",';
	}
	if($sum>0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"fileType" : [';
	foreach($value as $val){
		if(is_dir($val))
			$json .= ',';
		else
			$json .= '"'.get_tipe_file($val).'",';	
	}
	if($sum>0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	
	$json .= '"value" : [';
	foreach($value as $val){
		$json .= '"'.str_replace($dir,"",$val).'",';
		$sum++;
	}
	if($sum>0)
		$json = substr($json,0,strlen($json)-1);
	$json .= '],';
	$json .= '"sum" : "'.$sum.'"}';
	
	echo $json;
	}
?>