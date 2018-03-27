<?php
	$project_name = "";
	$program_id = "";
	$apps_name = "";
	$directory = "";
	$width = "300";
	$height = "300";
	$posX = "300";
	$posY = "0";
	
	if(isset($_GET['project_name'])){
		$project_name = $_GET['project_name'];
	}
	
	if(isset($_GET['program_id'])){
		$program_id = $_GET['program_id'];
		$directory = $_GET['program_id'];
	}
	$open = fopen("../../../../virtual-disk/workspace/".$directory."/json/json.json", "rt");
	$json_array = json_decode(fread($open, 10000));
	fclose($open);
	$apps_name = str_replace("\"", "", $json_array->name);
	
	if(isset($_GET['width'])){
		$width = str_replace("px", "", $_GET['width']);
	}
	
	if(isset($_GET['height'])){
		$height = str_replace("px", "", $_GET['height']);
	}
	
	if(isset($_GET['posX'])){
		$posX = str_replace("px", "", $_GET['posX']);
	}
	
	if(isset($_GET['posY'])){
		$posY = str_replace("px", "", $_GET['posY']);
	}
	
	$folder_project = strtolower(str_replace(" ", "_", $project_name));
	if(isset($_GET['program_id'])){
		$program_id = $_GET['program_id'];
	}

	function create_json($dir, $project_name, $program_id, $apps_name, $width, $height, $posX, $posY){
		$open = fopen($dir."/json/json.json", "wt");
		if(!$open){
			echo "Failed Create JSON";
		} else {
			$json['name'] = $apps_name;
			$json['width'] = $width;
			$json['height'] = $height;
			$json['posX'] = $posX;
			$json['posY'] = $posY;
			$json['image'] = "system/applications/".$program_id."/images/".$program_id.".png";
			$json['iconId'] = "desktop-program-".$program_id;
			$json['programContainer'] = $program_id."-container";
			$json['programId'] = $program_id;
			$json['maximize'] = false;
			$write = fwrite($open, json_encode($json));
			
			if($write)
				echo "SUCCESS";
		}
	}
	$dir = "../../../../virtual-disk/workspace/".$directory;
	create_json($dir, $project_name,$program_id, $apps_name, $width, $height, $posX, $posY); 
?>