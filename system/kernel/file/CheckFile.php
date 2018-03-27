<?php
	if(isset($_GET['dirname'])){
		$dir = str_replace("~","../../../virtual-disk/",$_GET['dir']);
		if(file_exists($dir.$_GET['dirname']) && is_file($dir.$_GET['dirname'])){
			print("YES");
		} else {
			print('NO');
		}
	}
?>