<?php
	$filetype = NULL;
	if(isset($_POST['filetype'])){
		$filetype = $_POST['filetype'];
	}
	
	$arr = NULL;
	$i = 0;
	
	if(count($filetype) > 0){
		foreach($filetype as $f){
			$input = true;
			if(count($arr) > 0){
				foreach($arr as $a){
					if($f == $a)
						$input = false;
				}
			}
			if($input){
				$arr[$i] = $f;
				$i++;
			}
		}
		
		$i = 0;
		$where = "";
		$arrtype = NULL;
		foreach($arr as $a){
			$handle = fopen("../../../kernel/database/system/detail_apps.json","rt");
			$arr_detail_apps = json_decode(fread($handle, 10000000));
			fclose($handle);
			
			$handle = fopen("../../../kernel/database/system/filetype.json","rt");
			$arr_filetype = json_decode(fread($handle, 10000000));
			fclose($handle);
			
			$apps_id = "";
			foreach ($arr_filetype as $f) {
				if(strtolower($f[0]) == strtolower($a)){
					$apps_id = $f[1];
				}
			}
			foreach ($arr_detail_apps as $d) {
				if(strtolower($d[1]) == strtolower($a) && strtolower($d[0]) == strtolower($apps_id)){
					$arrtype[] = $d[2];
					$arrtype[strtolower($a)] = $d[2];
				}
			}
			/*
			$query = mysql_query("SELECT apps_id FROM detail_apps WHERE filetype = '$a' AND apps_id = (SELECT apps_id FROM filetype WHERE filetype = '$a')");
			 */
		}
		$result = "";
		if(count($arrtype) > 0)
			$result = json_encode($arrtype);
		echo $result;
	}
?>