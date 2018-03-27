<?php
	if(isset($_GET['dirname'])){
		$dir = str_replace("~","../../../virtual-disk",$_GET['dir']);
		$dir = str_replace("_-_-_", " ", $dir);
		$dirname = str_replace("_-_-_", " ", $_GET['dirname']);
		$dirname = str_replace("~","../../../virtual-disk",$dirname);
		$dest = "";
		$input = true;
		for($i=strlen($dirname)-1;$i>=0;$i--){
			if($dirname[$i] == "/" && $i != strlen($dirname)-1)
				$input = false;
			if($input)
				$dest = $dest.$dirname[$i]; 
		}
		$dest2 = "";
		for($i=strlen($dest)-1;$i>=0;$i--){
			$dest2 = $dest2.$dest[$i]; 
		}
		if(file_exists($dir.$dirname)){
			if(rcopy($dir.$dirname, "../../../trash/".$dest2)){
				rrmdir($dir.$dirname);
				print("SUCCESS");
			} else {
				print("FAILED");
			}
		} else {
			print('NO');
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
?>