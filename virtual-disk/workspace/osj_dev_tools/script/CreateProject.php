<?php
	$project_name = "";
	$program_id = "";
	$apps_name = "";
	if(isset($_GET['project_name'])){
		$project_name = $_GET['project_name'];
	}
	
	if(isset($_GET['application_name'])){
		$apps_name = $_GET['application_name'];
	}

	$folder_project = strtolower(str_replace(" ", "_", $project_name));
	if(isset($_GET['program_id'])){
		$program_id = strtolower($_GET['program_id']);
	}

	$disk = "../../../../virtual-disk/workspace/";
	if(!file_exists($disk)){
		if(!mkdir($disk)){
			echo "Failed Create Workspace";
		}
	}
	if(!file_exists($disk.$folder_project)){
		if(!mkdir($disk.$folder_project)){
			echo "Failed Create Project Folder";
		} else {
			create_project($disk.$folder_project, $project_name, $program_id, $apps_name, $folder_project);			
		}
	}
	
	function create_project($dir, $project_name, $program_id, $apps_name, $folder_project){
		if(!mkdir($dir."/images")){
			echo "Failed Create Folder \"images\"";
		} else {
			copy_image($dir, $project_name, $program_id, $folder_project);
		}
		if(!mkdir($dir."/json")){
			echo "Failed Create Folder \"json\"";
		} else {
			create_json($dir, $project_name, $program_id, $apps_name, $folder_project);
		}
		if(!mkdir($dir."/layout")){
			echo "Failed Create Folder \"layout\"";
		} else {
			create_layout($dir, $project_name, $program_id, $folder_project);
		}
		if(!mkdir($dir."/script")){
			echo "Failed Create Folder \"script\"";
		} 
		if(!mkdir($dir."/style")){
			echo "Failed Create Folder \"style\"";
		}
		if(!mkdir($dir."/bin")){
			echo "Failed Create Folder \"bin\"";
		}
		create_run_file($dir, $project_name, $program_id, $folder_project);
	}
	
	function create_json($dir, $project_name, $program_id, $apps_name, $folder_project){
		$open = fopen($dir."/json/json.json", "wt");
		if(!$open){
			echo "Failed Create JSON";
		} else {
			$json['name'] = $apps_name;
			$json['width'] = "300";
			$json['height'] = "300";
			$json['posX'] = "150";
			$json['posY'] = "0";
			$json['image'] = "system/applications/".$folder_project."/images/".$program_id.".png";
			$json['iconId'] = "desktop-program-".$program_id;
			$json['programId'] = $program_id;
			$json['maximize'] = false;
			fwrite($open, json_encode($json));
		}
	}
	
	function create_layout($dir, $project_name, $program_id, $folder_project){
		$open = fopen($dir."/layout/".$program_id.".html", "wt");
		if(!$open){
			echo "Failed Create Layout";
		} else {
			$layout = '<div style="border: 1px solid rgb(153, 153, 153); border-top-left-radius: 5px; border-top-right-radius: 5px; background: none repeat scroll 0% 0% rgb(255, 255, 255); box-shadow:0px 5px 20px 1px rgba(0,0,0,0.9); width: 300px; height: 300px; position: relative;" id="'.$program_id.'-container" class="application-container">
	<div class="ui-widget-header">
		<div class="application-header">
			<div id="exit-'.$program_id.'" class="application-exit"> </div>
			<div id="minimize-'.$program_id.'" class="application-minimize"> </div>
			<div id="maximize-'.$program_id.'" class="application-maximize"> </div>
			<div align="center"><span id="form-name" style="margin-left:-50px;">'.$project_name.'</span></div>
		</div>
		</div>
		<div id="body-'.$program_id.'"> </div>
	</div>
</div>';
			fwrite($open, str_replace("\n","",$layout));
		}		
	}

function create_run_file($dir, $project_name, $program_id, $folder_project){
	$open = fopen($dir."/Run.js", "wt");
		if(!$open){
			echo "Failed Create Run File";
		} else {
	$run = '/* Generated File Run.js in Project '.$program_id.' */
	
function close_'.$program_id.'(){
	Minimizer.close("'.$program_id.'");
}
	
function minimize_'.$program_id.'(){
	Minimizer.minimize("'.$program_id.'");
}
	
function maximize_'.$program_id.'(){
	Minimizer.maximize("'.$program_id.'");
}

function open_'.$program_id.'(){
}

/* Initialize application */			
function init_'.$program_id.'(){
	$("#body-'.$program_id.'").keypress(function(event) {
	}).mouseover(function(){
	    $("#'.$program_id.'-container").draggable({disabled:true});
    }).mouseout(function(){
        $("#'.$program_id.'-container").draggable({disabled:false});
    });
	
	$("#'.$program_id.'-container").mousedown(function(){
		Focus.set("'.$program_id.'");
		setMenu_'.$program_id.'();	
		fixSize'.$program_id.'Speed = 0;
	})
	.mouseup(function(){
		fixSize'.$program_id.'Speed = 300;
	});
	
	/* Make application resizable */
	Resizable.set("'.$program_id.'");
	
	$("#exit-'.$program_id.'").mousedown(function(){
		close_'.$program_id.'();
		$("#body-'.$program_id.'").val("");
	});
	$("#maximize-'.$program_id.'").mousedown(function(){
		maximize_'.$program_id.'()
	});
	
	$("#minimize-'.$program_id.'").mousedown(function(){
		minimize_'.$program_id.'()
	});
		
	fixSize_'.$program_id.'();
}

/* Fix size application */
var fixSize'.$program_id.'Speed = 300;
function fixSize_'.$program_id.'(){
	setTimeout(function(){
		if(LoadAppsID["'.$program_id.'"].onFocus){
			height = $("#'.$program_id.'-container").height();
			width = $("#'.$program_id.'-container").width();
			$("#body-'.$program_id.'").css({"height" : height-45, "width" : width-5});
		}
		fixSize_'.$program_id.'();
	},fixSize'.$program_id.'Speed);
}

/* Set application menu */
function setMenu_'.$program_id.'(){
	proIdApps = "'.$program_id.'";
	var valMenu = "<span id=top-menu-item0 class=top-menu-item>'.$project_name.'</span>"+
        "<ul id=top-menu-item0-down class=top-menu-item-down>"+
            "<li onclick=minimize_'.$program_id.'(proIdApps)>Minimize</li>"+
			"<li onclick=maximize_'.$program_id.'(proIdApps)>Maximize</li>"+
			"<li onclick=close_'.$program_id.'(proIdApps)>Quit '.$project_name.'</li>"+
        "</ul>";
		$("#top-menu").html(valMenu);
		Menu.fixedTopMenu();
}

/* Register application */
function register_'.$program_id.'(){
	$.post("system/applications/'.$program_id.'/layout/'.$program_id.'.html", function(data){
		ApplicationRun[applicationOpened] = data;
		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_'.$program_id.',100);
		fixSize_'.$program_id.'();
		applicationOpened++;
	});	
}

/* Running application */
function run_'.$program_id.'(dir, fileName){
}';
	fwrite($open, str_replace("\n","",$run));
	}
}

function copy_image($dir, $project_name, $program_id, $folder_project){
	copy("../../../../system/applications/osj_dev_tools/images/build.png", $dir."/images/".$program_id.".png");
}
?>