<?php
	if(isset($_GET['dirname'])){
		$dir = str_replace("~","../../../virtual-disk",$_GET['dir']);
		$dirname = str_replace("~","../../../virtual-disk",$_GET['dirname']);
		$dirname = str_replace("_-_-_"," ",$dirname);
		$destdir = str_replace("_-_-_"," ",$_GET['destdir']);
		if($destdir[0] == "~")
			$destdir = str_replace("~","../../../virtual-disk",$destdir);
		else
			$destdir = $dir.$destdir;
		if(rcopy($dir.$dirname, $destdir."/".get_name($dirname))){
			print("SUCCESS");
		} else {
			print("FAILED");
		}
		
	}
	// Function to remove folders and files 
    function rrmdir($dir) {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file)
                if ($file != "." && $file != "..") rrmdir("$dir/$file");
            rmdir($dir);
        }
        else if (file_exists($dir)) unlink($dir);
    }

    // Function to Copy folders and files       
    function rcopy($src, $dst) {
        if (file_exists ( $dst ))
            rrmdir ( $dst );
        if (is_dir ( $src )) {
            mkdir ( $dst );
            $files = scandir ( $src );
            foreach ( $files as $file )
                if ($file != "." && $file != "..")
                    rcopy ( "$src/$file", "$dst/$file" );
        } else if (file_exists ( $src ))
            copy ( $src, $dst );
        return true;
    }
	
	function get_name($name){
		$res = "";
		$input = true;
		$len = strlen($name);
		for($i=$len-1;$i>=0;$i--){
			if($name[$i] == "/" && $i != ($len-1))
				$input = false;
			if($input)
				$res = $res.$name[$i]; 
		}
		$name = "";
		for($i=strlen($res)-1;$i>=0;$i--){
			$name = $name.$res[$i];
		}
		return $name;
	}
?>