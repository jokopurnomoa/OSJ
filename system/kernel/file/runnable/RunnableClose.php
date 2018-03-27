<?php
	$program_id = "";
	$success = false;
	if(isset($_GET['program_id'])){
		$program_id = $_GET['program_id'];
	}
	
	if($program_id != ""){
		rrmdir("../../../applications/runnable/extract/".$program_id);
		$success = true;
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