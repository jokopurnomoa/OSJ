<?php
	if(isset($_GET['dirname'])){
		$dir = str_replace("~","../../../virtual-disk/",$_GET['dir']);
		if(!file_exists($dir.$_GET['dirname'])){
			$mk = mkdir($dir.$_GET['dirname']);
			if($mk){
				print('SUCCESS');
			} else {
				print('FAILED');
			}
		} else {
			print('EXIST');
		}
	}
?>