<?php
	$directory = "tes_decode/Run.js";
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
	$handle = fopen($directory.$filename,"r");
	$data = fread($handle, 130217720);
	//$data = fread($handle, 500);
	fclose($handle);
	$len = strlen($data);
	$is_function = false;
	$is_backslash = false;
	$is_regexp = false;
	$is_else = false;
	$is_return = false;
	$is_string1 = false;
	$is_double_quot = false;
	$is_var = false;
	$is_this_error = false;
	$is_single_comment = false;
	$is_comment2 = false;
	$is_enter = false;
	$is_tab = false;
	$is_space = false;
	$is_insert = true;
	$file_name = "";
	$dir_name = "";
	$file = "";
	$success = true;
	
	$result = null;
	for($i=0;$i<$len;$i++){
		//echo ord("a");
		//echo $data[$i]."___".ord($data[$i])."<br>";
		/* is RegExp */
		if(ord($data[$i]) == 47){
			$regexp = true;
			$j = $i;
			while($regexp && ($j-$i) < 50){
				if(ord($data[$j+1]) == 47){
					$regexp = false;
					$is_regexp = true;
				}
				$j++;
			}
		}
			
		if($i < $len-1)
			if(ord($data[$i+1]) == 47 && $is_regexp)
				$is_regexp = false;
			
		
		/* is backslash */
		if($i > 0)
			if(ord($data[$i-1]) == 92)
				$is_backslash = true;
			
		/* Is string 1 */
		if(ord($data[$i]) == 39){
			if($is_string1)
				$is_string1 = false;
			else
				$is_string1 = true;
		}
		
		/* is double quot */
		if(ord($data[$i]) == 34 && !$is_backslash && !$is_regexp){
			if(!$is_double_quot)
				$is_double_quot = true;
			else
				$is_double_quot = false;
		}
		
		/*
		if(!$is_string1 && !$is_string2){
			/* is comment 2 *
			if(ord($data[$i]) == 47)
				if(ord($data[$i+1]) == 42)
					$is_comment2 = true;
			if(ord($data[$i]) == 42)
				if(ord($data[$i+1]) == 47)
					if($is_comment2){
						$is_comment2 = false;
					}
			
			/* is Tab *
			if(ord($data[$i]) == 9)
				$is_tab = true;
			
			/* is else *
			if((ord($data[$i]) == 32 || ord($data[$i]) == 13) && $i > 0)
				if($data[$i-1] == 'e')
					if($data[$i-2] == 's')
						if($data[$i-3] == 'l')
							if($data[$i-4] == 'e')
								$is_else = true;
			
			/* is return *
			if(ord($data[$i]) == 32 && $i > 0)
				if($data[$i-1] == 'n')
					if($data[$i-2] == 'r')
						if($data[$i-3] == 'u')
							if($data[$i-4] == 't')
								if($data[$i-5] == 'e')
									if($data[$i-6] == 'r')
										$is_return = true;
			
			/* is var *
			if(ord($data[$i]) == 32 && $i > 0)
				if($data[$i-1] == 'r')
					if($data[$i-2] == 'a')
						if($data[$i-3] == 'v')
							$is_var = true;
						
			/* is function *
			if(ord($data[$i]) == 32 && $i > 0)
				if($data[$i-1] == 'n')
					if($data[$i-2] == 'o')
						if($data[$i-3] == 'i')
							if($data[$i-4] == 't')
								if($data[$i-5] == 'c')
									if($data[$i-6] == 'n')
										if($data[$i-7] == 'u')
											if($data[$i-8] == 'f')						
												$is_function = true;

			if(!$is_var && !$is_function && !$is_else && !$is_return){
				/* is space *
				if(ord($data[$i]) == 32)
					$is_space = true;
				
				/* is enter *
				//if(ord($data[$i]) == 13)
					//$is_enter = true;
				
			}						
		}*/
		
		/* is comment 1 */
		if(!$is_double_quot){
			if(ord($data[$i]) == 47)
				if(ord($data[$i+1]) == 47){
					$is_single_comment = true;
				}
		}
		if($is_single_comment)
			echo $data[$i];
		
		if(ord($data[$i]) == 13)
			if($is_single_comment){
				$is_single_comment = false;
				echo "<br>";
			}
		
		if($is_single_comment)
			$is_insert = false;
		if($is_insert){
			$result .= $data[$i];
		}
		$is_insert = true;
		$is_enter = false;
		$is_tab = false;
		$is_space = false;
		$is_var = false;
		$is_function = false;
		$is_else = false;
		$is_return = false;
		$is_backslash = false;
	}
	
	/* fix this error *
	$result = str_replace("}this", "};this", $result);
	/* fix else error *
	$result = str_replace("else".chr(13), "else ", $result);*/
	
	//echo $result;
	$handle = fopen($directory."___compress___".$filename,"w");
	$data = fwrite($handle, $result);
	fclose($handle);
	
	if($success){
		echo "SUCCESS";
	} else {
		echo "FAILED";
	}
?>