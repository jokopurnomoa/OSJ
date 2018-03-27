function close_Notepad(){
	Minimizer.close("notepad");
}
	
function minimize_Notepad(){
    Minimizer.minimize("notepad");
}
	
function maximize_Notepad(){
    Minimizer.maximize("notepad");
}
			
function init_notepad(){
	$(document).keydown(function(event) {
        //MessageBox.show(event.which);
		if(event.keyCode == 9) {
			event.preventDefault();
			Caret.setText("#body-notepad", "\t", 0);
			$("#body-notepad").scrollTop($(document).height());
		}
		if(event.ctrlKey && event.which == 65){
			$("#body-notepad").select();
		}
        if(event.ctrlKey && event.which == 83){
            if(LoadAppsID["notepad"].onFocus){
                $("#body-notepad").blur();
                Notepad.saveFile();
            }
		}
	});
	
	$("#notepad-container").mousedown(function(){
        Focus.set("notepad");
		setMenu_notepad();
		fixSizeNotepadSpeed = 0;
	})
	.mouseup(function(){
		fixSizeNotepadSpeed = 500;
	});
    Resizable.set("notepad");
	
	$("#exit-notepad").click(function(){
		close_Notepad();
		$("#body-notepad").val("");
	});
	$("#maximize-notepad").click(function(){
		maximize_Notepad()
	});
	
	$("#minimize-notepad").click(function(){
		minimize_Notepad()
	});
		
	var openedMenu = false;
	$("#notepad-top-menu" ).mousedown(function(){
		if(!openedMenu){
			$("#notepad-top-menu" ).css({"background" : "#000"});
			$(".menu").css({"visibility" : "visible"});				
			openedMenu = true;
		} else {
			$("#notepad-top-menu" ).css({"background" : "#6EBC24"});
			$(".menu" ).css({"visibility" : "hidden"});	 
			openedMenu = false;				
		}
	});
	fixSizeNotepad();
}

var fixSizeNotepadSpeed = 500;

function fixSizeNotepad(){
	setTimeout(function(){
		if(LoadAppsID["notepad"].state == "opened"){
			$height = $("#notepad-container").height();
			$width = $("#notepad-container").width();
			$("#body-notepad").css({"height" : $height-25, "width" : $width-5});
		}
		fixSizeNotepad();
	},fixSizeNotepadSpeed);
}

function setMenu_notepad(){
	proIdApps = "notepad";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">Notepad</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onclick="minimize_Notepad(proIdApps)">Minimize</li>'+
			'<li onclick="maximize_Notepad(proIdApps)">Maximize</li>'+
			'<li onclick="close_Notepad(proIdApps)">Quit Notepad</li>'+
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

function register_notepad(){
	$.post("system/applications/notepad/layout/notepad.html", function(data){
		ApplicationRun[applicationOpened] = data;
		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_notepad,100);
		fixSizeNotepad();
		applicationOpened++;
	});	
}

function run_notepad(dir, fileName){
    fileName = dirReplace(fileName);
	Notepad.currentDir = dir;
    $.post("system/kernel/file/ReadFile.php?dir="+dir, function(data){
		$("#body-notepad").val(data);
	});
}

function open_notepad(){

}

function Notepad(){
    this.currentDir = "";

    this.saveFile = function(){
        value = $("#body-notepad").val();
        if(value == ""){
            MessageBox.show("Notepad","Text is empty!");
            return;
        }
        $("#input-filename-notepad").css({"visibility":"visible"}).draggable();
        $("#filename-notepad-text").focus();
    }

    this.actionSaveFile = function(fn){
        fn = $("#filename-notepad-text").val();
        if(fn != ''){
            value = $("#body-notepad").val();

            $.post("system/kernel/file/CreateFile.php?filename="+fn, {"data" : value})
            .done(function(data){
                if(data == "SUCCESS"){
                    MessageBox.show("Notepad","Success save file");
                    $("#input-filename-notepad").css({"visibility":"hidden"});
                } else if(data == "EXIST"){
                    MessageBox.show("Notepad","File already exist!");
                } else {
                    MessageBox.show("Notepad","Failed save file!");
                }
            });
        }
    }

    this.cancelSaveFile = function(){
        $("#input-filename-notepad").css({"visibility":"hidden"});
        $("#filename-notepad-text").val("");
        $("#body-notepad").focus();
    }
}

Notepad = new Notepad();