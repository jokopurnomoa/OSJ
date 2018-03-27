<?php
	if(isset($_GET['dirname'])){
		$dir = str_replace("~","../../../virtual-disk",$_GET['dirname']);
		if(mkdir($dir)){
			print("SUCCESS");
		} else {
			print('FAILED');
		}
	}
?>