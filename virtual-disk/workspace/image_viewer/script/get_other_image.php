<?php 
	$dir="";
	if(isset($_GET['dir'])){
		$dir=$_GET['dir'];
	}
	$filename="";
	if(isset($_GET['filename'])){
		$filename=$_GET['filename'];
	}
	
	$dir = str_replace($filename, "", $dir);
	$dir = "../../../../".$dir;

	$value = glob($dir . '*', GLOB_BRACE);
	$result = NULL;
	foreach ($value as $val) {
		if(get_tipe_file($val) == ".png" || get_tipe_file($val) == ".jpg" || get_tipe_file($val) == ".jpeg" || get_tipe_file($val) == ".gif"){
			$result[] = str_replace("../../../../","",$val);
		}
	}
	echo json_encode($result);
	
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
?>