var ArrSelectedItem = [];
var IdSelectedItem = -1;
var isInItem = false;
var DirResult = null;
var isCreateFolder = false;
var isRenameFile = false;
var RenamedFileId = "";
var rDir = "";
var isRightClick = false;
	
function CloseExplorer(){
	Minimizer.close("explorer");
}
	
function MinimizeExplorer(){
    Minimizer.minimize("explorer");
}
	
function MaximizeExplorer(){
	fixSizeExplorerSpeed = 0;
    Minimizer.maximize("explorer");
	setTimeout(function(){
		fixSizeExplorerSpeed = 500;
	},700);
}

function handleOpenThis(dir, fileType, filename){
	OpenFile.handleOpenThis(dir, fileType, filename);
}

var dirBackTrack = new Array();
var idDirNow = 0;
var SelectedItem = "", SelectedDir = "";
var Command = "", CommandItem = "", CommandDir = "";
var ArrCommandItem = [], ArrCommandDir = [];
function init_explorer(){
	Import.this("<script src='system/applications/file_explorer/script/ExplorerAction.js'></script>");
	Import.this("<script src='system/applications/file_explorer/script/ExplorerSelect.js'></script>");
	Import.this("<script src='system/applications/file_explorer/script/ExplorerDirectory.js'></script>");
	ExplorerEvent();
	$("#body-explorer").mouseover(function(){
		$("#explorer-container").draggable({disabled:true});
	}).mouseout(function(){
		$("#explorer-container").draggable({disabled:false});
	});
	
	$("#explorer-container").mousedown(function(){
        Focus.set("explorer");
		setMenu_explorer();
		fixSizeExplorerSpeed = 0;
	})
	.mouseup(function(){
		fixSizeExplorerSpeed = 500;
	});
    Resizable.set("explorer");
    $("#progress-bar-explorer").resizable({handles:'e', start : function() {$(this).css("position", "fixed");}}).draggable({start : function() {$(this).css("position", "fixed");}});
	
	// Disable Select Text

	$("#back-directory-explorer").click(function(){
		showDraft(dirBackTrack[idDirNow-2], true);
	});
	$("#next-directory-explorer").click(function(){
		showDraft(dirBackTrack[idDirNow], false);
	});
	
	$("#minimize-explorer").click(function(){
		MinimizeExplorer();
	});
	var maxi = false;
	$("#maximize-explorer").click(function(){
		MaximizeExplorer();
		if(!maxi){
			maximizeExplorer(true);
			maxi = true;	
		} else {
			maximizeExplorer(false);
			maxi = false;
		}
	});
	$("#exit-explorer").click(function(){
		CloseExplorer();
		maxi = false;
		setTimeout(function(){
			maximizeExplorer(false);
		},800);
	});
		
	fixSizeExplorer();
    $("#body-explorer-right").click(function(){
        if(!isInItem && !CtrlKeyPressed)
            unSelectAllItem();
    }).dblclick(function(){
        document.getSelection().removeAllRanges();
    });

    $("#_____new_folder_____ .draft-dir-title").blur(function(){
        if(isCreateFolder)
            ExplorerCreateNewFolder();
    });
    //alert(dirReplace("joko_-_-_purnomo_-_-_"));
    //MessageBox.show("",cutDirValue("1234567890qwertyuiop joko purnomo 1234567890qwertyuiop"));
    $("#progress-bar-explorer-exit").mousedown(function(){
        $("#progress-bar-explorer").css({top:-2000,left:-2000}).fadeTo(100,0);
    });
}

var fixSizeExplorerSpeed = 500;

function fixSizeExplorer(){
	setTimeout(function(){
		if(LoadAppsID["explorer"].state == "opened"){
			$height = $("#explorer-container").height();
			$width = $("#explorer-container").width();
			$("#menu-visual-explorer").css({"width" : $width});
			$("#body-explorer").css({"width" : $width, "height":$height-130});
			$("#body-explorer-right").css({"width" : $width-$("#body-explorer-left").width(), "height":$height-130, "left":$("#body-explorer-left").width()});
		}
		fixSizeExplorer();
	},fixSizeExplorerSpeed);
}

function setMenu_explorer(){
	proIdApps = "explorer";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">File Explorer</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onclick="MinimizeExplorer(proIdApps)">Minimize</li>'+
			'<li onclick="MaximizeExplorer(proIdApps)">Maximize</li>'+
			'<li onclick="CloseExplorer(proIdApps)">Quit File Explorer</li>'+
        '</ul>'+
		'<span id="top-menu-item1" class="top-menu-item">File</span>'+
		'<ul id="top-menu-item1-down" class="top-menu-item-down">'+
            '<li>Save</li>'+
			'<li>Save As</li>'+
			'<li>Open</li>'+
        '</ul>';
		$("#top-menu").html(valMenu);
		Menu.fixedTopMenu();
}

function maximizeExplorer(stat){
	if(stat){
		$("#menu-visual-explorer").css({
			width : $(document).width()-9
		});
		$("#body-explorer-left").css({
			width : 300
		});
		$("#body-explorer-right").css({
			width : 600,
			left : 300
		});
		$("#body-explorer-right").animate({
			width : $(document).width()-310
		});
		$("#body-explorer").animate({
			height : $(document).height()-175
		});
	} else {
		$("#menu-visual-explorer").animate({
			width : 800
		});			
		$("#body-explorer-left").animate({
			width : 200
		});
		$("#body-explorer-right").animate({
			width : 600,
			left : 200
		});
		$("#body-explorer").animate({
			height : "79.2%"
		});			
	}
}

function dirReplace(dir){
    if(isNaN(dir) && dir != null){
	    dir = dir.replace(/_-_-_/g," ");
    }
	return dir;
}

function idReplace(thisId){
	len = thisId.length;
	for(j=0;j<len;j++){
	    thisId = thisId.replace("(","");
        thisId = thisId.replace(")","");
        thisId = thisId.replace("/","");
        thisId = thisId.replace(".","");
	}
    thisId = thisId.replace(/ /g,"_-_-_");
    thisId = thisId.replace(/!/g,"");
	return thisId;
}

function dirImage(dir){
	for(j=0;j<dir.length;j++){
		if(dir[j] == "/"){
			if(dir[j+1] == "/"){
				dir = dir.replace("//","/");
				j++;
			}
		}
	}
	return dir;
}

var backId = "";

function register_explorer(){
	$.post("system/applications/file_explorer/layout/file_explorer.html", function(data){
		ApplicationRun[applicationOpened] = data;
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_explorer,100);;
		applicationOpened++;
	});
}

function runExplorer(){
	
}

function open_explorer(){
    loadDirectory();
}