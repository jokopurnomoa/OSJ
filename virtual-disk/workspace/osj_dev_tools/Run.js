var osj_dev_tools_open = 0;
var workspace_tab = 0;
var selected_tab = -1;
var workspace_tab_active = 0;
var ArrayWorkspaceTab = [];
function Close_osj_dev_tools(){
	Minimizer.close("osj_dev_tools");
	devtools.closeNewProject();
	proExp.closeAllTab();
}
	
function Minimize_osj_dev_tools(){
	Minimizer.minimize("osj_dev_tools");
	devtools.closeNewProject();
}
	
function Maximize_osj_dev_tools(){
	Minimizer.maximize("osj_dev_tools");
}

function init_osj_dev_tools(){
	$("#body-build").mouseover(function(){
        //$("#build-container").draggable({disabled:true});
    }).mouseout(function(){
        //$("#build-container").draggable({disabled:false});
    }).mousedown(function(){
        $(this).append("<div id='selection-control' style='border: 1px dotted #666;height: 1px;width: 1px'></div>")
    }).mouseup(function(){
        $("#body-build #selection-control").remove();
    });
	
	$("#osj_dev_tools-container").mousedown(function(){
        Focus.set("osj_dev_tools");
		setMenu_osj_dev_tools();
		fixSizeosj_dev_toolsSpeed = 0;
	})
	.mouseup(function(){
		fixSizeosj_dev_toolsSpeed = 500;
	});
    Resizable.set("osj_dev_tools");
	
	$("#exit-osj-dev-tools").click(function(){
		Close_osj_dev_tools();
		$("#body-osj-dev-tools").val("");
	});
	$("#maximize-osj-dev-tools").click(function(){
		Maximize_osj_dev_tools();
	});
	
	$("#minimize-osj-dev-tools").click(function(){
		Minimize_osj_dev_tools();
	});

	$("#exit-osj-dev-tools-new-project").click(function(){
		this.devtools = new OSJDeveloperTools();
		this.devtools.closeNewProject();
	});
		
	var openedMenu = false;
	$("#osj_dev_tools-top-menu" ).mousedown(function(){
		if(!openedMenu){
			$("#osj_dev_tools-top-menu" ).css({"background" : "#000"});
			$(".menu").css({"visibility" : "visible"});				
			openedMenu = true;
		} else {
			$("#osj_dev_tools-top-menu" ).css({"background" : "#6EBC24"});
			$(".menu" ).css({"visibility" : "hidden"});	 
			openedMenu = false;				
		}
	});
	fixSizeosj_dev_tools();
	//$("#osj_dev_tools-container").resizable({handles:'all'});
	$("#osj-dev-tools-panel-left").resizable({handles:'e', minWidth:100, maxWidth:500});
	$("#osj-dev-tools-panel-right").resizable({handles:'w', minWidth:100, maxWidth:500});
}

var fixSizeosj_dev_toolsSpeed = 500;

function fixSizeosj_dev_tools(){
	setTimeout(function(){
		if(LoadAppsID["osj_dev_tools"].state == "opened"){
			$height = $("#osj_dev_tools-container").height();
			$width = $("#osj_dev_tools-container").width();
			$("#body-osj-dev-tools").css({"height" : $height-45, "width" : $width-5});
			$("#osj-dev-tools-panel-left").css({"height" : $height-59});
			$("#osj-dev-tools-panel-right").css({"height" : $height-59});
			$("#osj-dev-tools-workspace").css({
				"height" : $height-99,
				"width":($("#osj_dev_tools-container").width()-($("#osj-dev-tools-panel-left").width()+$("#osj-dev-tools-panel-right").width())-10),
				"left":$("#osj-dev-tools-panel-left").width()});
            $("#osj-dev-tools-workspace-tab").css({
                "width":($("#osj_dev_tools-container").width()-($("#osj-dev-tools-panel-left").width()+$("#osj-dev-tools-panel-right").width())-10),
                "left":$("#osj-dev-tools-panel-left").width()});
		}
		fixSizeosj_dev_tools();
	},fixSizeosj_dev_toolsSpeed);
}

function setMenu_osj_dev_tools(){
	proIdApps = "osj_dev_tools";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">OSJ Developer Tools</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onclick="Minimize_osj_dev_tools(proIdApps)">Minimize</li>'+
			'<li onclick="Maximize_osj_dev_tools(proIdApps)">Maximize</li>'+
			'<li onclick="Close_osj_dev_tools(proIdApps)">Quit OSJ Developer Tools</li>'+
        '</ul>'+
        '<span id="top-menu-item1" class="top-menu-item">File</span>'+
		'<ul id="top-menu-item1-down" class="top-menu-item-down">'+
            '<li id="sub-menu-item1-down" class="sub-menu-item-down">New'+
            	'<ul>'+
            		'<li onclick="devtools.newProject()">Project</li>'+
            		'<li>File</li>'+
            		'<li>Folder</li>'+
            	'</ul>'+
            '</li>'+
            '<li>Open</li>'+
        '</ul>'+
		'<span id="top-menu-item2" class="top-menu-item">View</span>'+
		'<ul id="top-menu-item2-down" class="top-menu-item-down">'+
            '<li>ToolBox</li>'+
        '</ul>'+
		'<span id="top-menu-item3" class="top-menu-item">Project</span>'+
		'<ul id="top-menu-item3-down" class="top-menu-item-down">'+
            '<li onclick="devtools.build()">Build</li>'+
            '<li onclick="devtools.runProject()">Run</li>'+
        '</ul>';
		$("#top-menu").html(valMenu);
		Menu.fixedTopMenu();
}

function register_osj_dev_tools(){
	$.post("system/applications/osj_dev_tools/layout/osj_dev_tools.html", function(data){
		ApplicationRun[applicationOpened] = data;
		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_osj_dev_tools,100);
		fixSizeosj_dev_tools();
		applicationOpened++;
	});
}

var currentDir = "";
function run_osj_dev_tools(dir, fileName){
	$(".application-container").css({"z-index":0});
	$("#osj_dev_tools-container").css({"z-index":99});
	fileName = dirReplace(fileName);
	currentDir = dir;
	$.post("system/kernel/file/ReadFile.php", {"dir" : dir}, function(data){
		$("#body-osj-dev-tools").val(data);
		$("#application-name").html("OSJ Dev Tools" + fileName);
	});
}

function OSJDeveloperTools(){
	this.projectName = null;
	this.programID = null;
    this.applicationName = null;
    this.generateLayoutResult = "";
    this.generateDAPPResult = "";

	this.closeNewProject = function(){
		//$("#osj_dev_tools-container").draggable({disabled:false});
		$("#osj-dev-tools-new-project").animate({"top":-500},400);
	}

	this.newProject = function(){
		$("#osj_dev_tools-container").draggable({disabled:true});
		$("#osj-dev-tools-new-project").draggable({disabled:false});
		$("#osj-dev-tools-new-project").css({"top":-500});
		$("#osj-dev-tools-new-project").animate({"top":100},400);
	}

	this.createProject = function(){
        if(this.checkProjectName() && this.checkApplicationName()){
            this.programID = this.projectName;
            $.post("system/applications/osj_dev_tools/script/CreateProject.php?project_name="+this.projectName+"&program_id="+this.programID+"&application_name="+this.applicationName)
			.done(function(data){
				//alert(data);
                devtools.cancelCreateProject();
                proExp.loadDirectory();
				MessageBox.show("OSJ Developer Tools", "Success create project");
			});
		}
	}
	
	this.cancelCreateProject = function(){
		$("#osj-dev-tools-new-project-name").val("");
		$("#osj-dev-tools-new-project-program-id").val("");
		this.closeNewProject();
	}
	
	this.checkProjectName = function(){
		result = false;
		this.projectName = $("#osj-dev-tools-new-project-name").val();
		this.charNotAllow = new Array();
		this.charNotAllow = [' ','_','-','~','`','!','@','#','$','%','^','&','*','(',')','','+','=','{','[','}',']','\\','|',':',';','"',"'",'<',',','>','.','?','/'];
		this.charError = 0;
		
		for(h=0;h<this.projectName.length;h++){
			for(i=0;i<this.charNotAllow.length;i++){
				if(this.projectName[h] == this.charNotAllow[i])
					this.charError++;
			}
		}
		
		if(this.projectName.length < 1){
			$("#osj-dev-tools-new-project-name").css({"box-shadow":"0 0px 5px 0px rgba(178, 20, 20, 1)"});
			this.errorInfo = "Project name cannot empty";
		} else if(this.charError > 0){
			$("#osj-dev-tools-new-project-name").css({"box-shadow":"0 0px 5px 0px rgba(178, 20, 20, 1)"});
			this.errorInfo = "Caracter allowed is \"a to z, A to Z, 0 to 9\"";
		} else {
			$("#osj-dev-tools-new-project-name").css({"box-shadow":"0 0px 5px 0px rgba(51, 173, 208, 1)"});
			this.errorInfo = "";
			result = true;
		}
		$("#osj-dev-tools-new-project-error").html(this.errorInfo);
		return result;
	}
	
	this.checkApplicationName = function(){
		this.applicationName = $("#osj-dev-tools-new-project-application-name").val();
		this.errorInfo = "";
		this.charNotAllow = new Array();
		this.charNotAllow = ['~','`','!','@','#','$','%','^','&','*','(',')','','+','=','{','[','}',']','\\','|',':',';','"',"'",'<',',','>','.','?','/'];
		this.charError = 0;
		
		for(h=0;h<this.applicationName.length;h++){
			for(i=0;i<this.charNotAllow.length;i++){
				if(this.applicationName[h] == this.charNotAllow[i])
					this.charError++;
			}
		}
		
		result = false;
		if(this.applicationName.length < 1){
			$("#osj-dev-tools-new-project-application-name").css({"box-shadow":"0 0px 5px 0px rgba(178, 20, 20, 1)"});
			this.errorInfo = "Program ID cannot empty";
		} else if(this.charError > 0){
			$("#osj-dev-tools-new-project-application-name").css({"box-shadow":"0 0px 5px 0px rgba(178, 20, 20, 1)"});
			this.errorInfo = "Caracter allowed is \"a to z, A to Z, 0 to 9\"";
		} else {
			$("#osj-dev-tools-new-project-application-name").css({"box-shadow":"0 0px 5px 0px rgba(51, 173, 208, 1)"});
			this.errorInfo = "";
			result = true;
		}
		$("#osj-dev-tools-new-project-error").html(this.errorInfo);
		return result;
	}
	
	this.build = function(){
        if(devtools.programID != "" && devtools.programID != null){
            Menu.resetTopMenu();
            this.createFileDAPP();
        } else {
            MessageBox.show("OSJ Dev Tools", "There are no projects selected!");
        }
    }

    this.runProject = function(){
        if(devtools.programID != "" && devtools.programID != null){
            OpenFile.handleOpenFromApps("browser","emulator.php?apps_id="+devtools.programID);
        } else {
            MessageBox.show("OSJ Dev Tools", "There are no projects selected!");
        }
    }

    this.createFileDAPP = function(){
        $.post("system/kernel/file/CreateDirectory.php?dir=~/&dirname=workspace/"+devtools.programID+"/bin/").done(function(data){
            $.post("system/kernel/file/DAPPEncode.php?directory=../../../virtual-disk/workspace/"+devtools.programID+"&dest_dir=../../../virtual-disk/workspace/"+devtools.programID+"/bin/")
                .done(function(data){
                    if(data == "SUCCESS")
                        MessageBox.show("OSJ Dev Tools", "Success Building Project "+devtools.programID);
                });
        });
    }
}

var devtools = new OSJDeveloperTools();

function open_osj_dev_tools(){
	var libs_osj_dev_tools = '<script src="system/applications/osj_dev_tools/script/ace-editor/ace.js"></script><script src="system/applications/osj_dev_tools/script/Control.js"></script><script src="system/applications/osj_dev_tools/script/Form.js"></script><script src="system/applications/osj_dev_tools/script/Label.js"></script><script src="system/applications/osj_dev_tools/script/Button.js"></script><script src="system/applications/osj_dev_tools/script/TextBox.js"></script><script src="system/applications/osj_dev_tools/script/ToolBox.js"></script><script src="system/applications/osj_dev_tools/script/GenerateLayout.js"></script><script src="system/applications/osj_dev_tools/script/ProjectExplorer.js"></script><script src="system/applications/osj_dev_tools/ExampleForm.js"></script>';
	if(FString.countWord($("head").html(),libs_osj_dev_tools) <= 0)
		$("head").append(libs_osj_dev_tools);
	proExp.loadDirectory();
}