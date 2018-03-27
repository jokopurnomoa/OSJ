function CloseTerminal(){
	Minimizer.close("terminal");
}
	
function MinimizeTerminal(){
	Minimizer.minimize("terminal");
}
	
function MaximizeTerminal(){
	Minimizer.maximize("terminal");
}
	
function init_terminal(){
	$("#body-terminal").keypress(function(event) {
		//alert(event.which);
		if(event.keyCode == 9) {
			event.preventDefault();
			$("#body-terminal").val($("#body-terminal").val()+"\t");
			$("#body-terminal").scrollTop($(document).height());
		}
		if(event.ctrlKey && event.which == 97){
			$("#body-terminal").select();
		}
		if(event.ctrlKey && event.which == 115){
			$("#body-terminal").blur();
			SaveFile();
		}
	}).keydown(function(event){
		text = term.getText("#"+idTerminal);
		if(event.ctrlKey){
			if(event.which == "65" || event.which == "97"){
				event.preventDefault();
			}
		}
	}).keyup(function(event){
		caretPos = term.getCaret(term.GetNodeId(idTerminal));
		if(event.keyCode == 8 && term.CheckEndText(text)){
			$("#"+idTerminal).val(text);
			term.setSelectionRange(term.GetNodeId(idTerminal), caretPos+1, caretPos+1);
			term.getTapped();
		} else if(event.keyCode == 13){
			text = $("#"+idTerminal).val();
			lastText = term.GetLastText(text);
			command = term.GetCommand(lastText);
			action = term.GetAction(lastText);
			term.TerminalAction(command, action);
		}
		term.GetNodeId(idTerminal).scrollTop = term.GetNodeId(idTerminal).scrollHeight;
	});
	
	$("#terminal-container").mousedown(function(){
        Focus.set("terminal");
		setMenu_terminal();
		fixSizeTerminalSpeed = 0;
	})
	.mouseup(function(){
		fixSizeTerminalSpeed = 500;
	});
    Resizable.set("terminal");
	
	$("#exit-terminal").click(function(){
		CloseTerminal();
		this.term = new Terminal();
		term.TerminalAction("clear", "");
	});
	$("#maximize-terminal").click(function(){
		MaximizeTerminal()
	});
	
	$("#minimize-terminal").click(function(){
		MinimizeTerminal()
	});		
	
	term = new Terminal();
	term.init();
	var text;
	fixSizeTerminal();
}

var fixSizeTerminalSpeed = 500;

function fixSizeTerminal(){
	setTimeout(function(){
		if(LoadAppsID["terminal"].state == "opened"){
			$height = $("#terminal-container").height();
			$width = $("#terminal-container").width();
			$("#body-terminal").css({"height" : $height-25, "width" : $width-5});
		}
		fixSizeTerminal();
	},fixSizeTerminalSpeed);
}

function setMenu_terminal(){
	proIdApps = "terminal";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">Terminal</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onclick="MinimizeTerminal(proIdApps)">Minimize</li>'+
			'<li onclick="MaximizeTerminal(proIdApps)">Maximize</li>'+
			'<li onclick="CloseTerminal(proIdApps)">Quit Terminal</li>'+
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

var term;

function register_terminal(){
	$.post("system/applications/terminal/layout/terminal.html", function(data){
		ApplicationRun[applicationOpened] = data;
		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_terminal,100);
		fixSizeTerminal();
		applicationOpened++;
	});	
}

var currentDir = "~";
function run_terminal(dir, fileName){
	$(".application-container").css({"z-index":0});
	$("#terminal-container").css({"z-index":99});
	fileName = dirReplace(fileName);
	currentDir = dir;
}

function open_terminal(){

}

var comName = "joko";
var comUser = "joko";
var directory = "~";
var arrCommandFile = new Array();
var idTerminal = "body-terminal";
var CurrentAction = "";
var countPing = 0;
arrCommandFile = ["cd", "dir", "mkdir"];
function Terminal(){
	this.init = function(){
		$("#"+idTerminal).val(comName+"@"+comUser+":"+directory+"$ ");
	}
	
	this.SetEndWith = function(){
		text = $("#"+idTerminal).val();
		$("#"+idTerminal).val(text+"\n"+comName+"@"+comUser+":"+directory+"$ ");
		document.getElementById("body-terminal").scrollTop = document.getElementById("body-terminal").scrollHeight;
	}
	
	this.SetEnd = function(){
		text = $("#"+idTerminal).val();
		$("#"+idTerminal).val(text+comName+"@"+comUser+":"+directory+"$ ");
		document.getElementById("body-terminal").scrollTop = document.getElementById("body-terminal").scrollHeight;
	}
	
	this.GetLastText = function(text){
		var res = "";
		for(i=text.length-1;i>=0;i--){
			res += text[i];
			if(text[i] == " "){
				if(text[i-1] == "$"){
					i = 0;
					res += "$";
				}
			}
		}
		res = res.replace(" $", "");
		len = res.length;
		var resRev = "";
		for(i=0;i<len;i++){
			resRev += res[len-(i+1)];
		}
		return resRev;
	}

	this.GetCommand = function(text){
		res = "";
		for(i=0;i<text.length;i++){
			if(text[i] != " "){
				res += text[i];
			} else {
				i = text.length;
			}
		}
		return res;
	}

	this.GetAction = function(text){
		res = "";
		isInsert = false;
		for(i=0;i<text.length;i++){
			if(text[i] == " "){
				isInsert = true;
			}
			if(isInsert){
				res += text[i];
			}
		}
		return res;
	}

	this.CheckEndText = function(text){
		var len = text.length;
		var isEnd = false;
		if(text[len-1] == ' '){
			if(text[len-2] == '$'){
				isEnd = true;
			}
		}
		return isEnd;
	}
	
	this.TerminalAction = function(command, action, outDir) {
		command = command.replace("\n","").toLowerCase();
		action = action.replace("\n","");
		action = action.replace(" ","");
		//alert(command + ", " + action);
		switch(command){
			case "exit" : {
				CloseTerminal();
				$("#"+idTerminal).val("");
				term.SetEnd();
			}break;
			case "clear" : {
				$("#"+idTerminal).val("");
				term.SetEnd();
			}break;
			case "dir" : {
				this.FileDir(command, action);
			}break;
			case "cd" : {
				this.FileCD(command, action);
			}break;
			case "cd.." : {
				this.dirUp(command, action);
			}break;
			case "mkdir" : {
				this.MakeDir(command, action);
			}break;
			case "rmdir" : {
				this.RemoveDir(command, action);
			}break;
			case "rm" : {
				this.Remove(command, action);
			}break;
			case "cp" : {
				this.FileCopy(command, action, outDir);
			}break;
			case "mv" : {
				this.FileMove(command, action, outDir);
			}break;
			case "mkfile" : {
				var dir = "";
				if(directory != ""){
					dir += directory + "/";
				}
				if(action != ""){
					$.post("system/kernel/file/CreateFile.php?filename="+action+"&dir="+dir)
					.done(function(data){
						//alert(data);
						if(data == "SUCCESS"){
							$("#"+idTerminal).val($("#"+idTerminal).val()+"success create directory "+action);
							loadDirectory();
						} else if(data == "EXIST"){
							$("#"+idTerminal).val($("#"+idTerminal).val()+"directory "+action+" is exist");
						} else {
							$("#"+idTerminal).val($("#"+idTerminal).val()+"failed create directory "+action);
						}
						term.SetEndWith();
					});
				} else {
					$("#"+idTerminal).val($("#"+idTerminal).val()+"mkdir : action error");
					term.SetEndWith();
				}
			}break;
			case "ping" : {
				this.Ping(command, action);
			}break;
			default : {
				$("#"+idTerminal).val($("#"+idTerminal).val()+command+": command not found");
				term.SetEndWith();
			}break;
		}
	}
	
	this.FileDir = function(command, action){
		var dir = "";
		if(directory != ""){
			dir += directory + "/";
		}
		var countDir = 0;
		var countFile = 0;
		var space = "";
		$.post("system/kernel/file/ShowDirectory.php?dirname="+action+"&dir="+dir)
		.done(function(data){
			res = eval("("+data+")");
			if(res.sum == 0){
				$("#"+idTerminal).val($("#"+idTerminal).val()+"dir : directory empty");
			} else {
				$("#"+idTerminal).val($("#"+idTerminal).val()+"TYPE  | FILESIZE  | FILENAME     \n");
				for(i=0;i<res.value.length;i++){
					if(res.isDir[i] == 1){
						countDir++;
						$("#"+idTerminal).val($("#"+idTerminal).val()+"<DIR>               "+res.value[i]+"\n");
					} else {
						countFile++;
						len = res.fileSize[i].length;
						space = "";
						for(s=0;s<(11-len);s++){
							space += " ";
						}
						$("#"+idTerminal).val($("#"+idTerminal).val()+"        "+res.fileSize[i]+space+" "+res.value[i]+"\n");
					}
				}
				$("#"+idTerminal).val($("#"+idTerminal).val()+" "+countDir+" Dir(s)\n");
				$("#"+idTerminal).val($("#"+idTerminal).val()+" "+countFile+" File(s)\n");
			}
			term.SetEndWith();
		});
	}
	
	this.FileCD = function(command, action){
		var dir = "";
		if(action == "~"){
			directory = "~";
			term.SetEnd();
			return;
		}
		if(directory != ""){
			dir += directory + "/";
		}
		$.post("system/kernel/file/CheckDirectory.php?dirname="+action+"&dir="+dir)
		.done(function(data){
			if(data == "YES"){
				directory += "/"+action;
				term.SetEnd();
			} else {
				$("#"+idTerminal).val($("#"+idTerminal).val()+"cd : directory not found");
				term.SetEndWith();
			}
		});
		if(action == ""){
			$("#"+idTerminal).val($("#"+idTerminal).val()+"cd : action error");
			term.SetEndWith();
		}
	}
	
	this.dirUp = function(command, action){
		var dir = directory;
		var startUp = false;
		var newDir = "";
		for(i=dir.length;i>=0;i--){
			if(startUp){
				newDir += dir[i];
			}
			if(dir[i] == "/"){
				startUp = true;
			}
		}
		dir = "";
		for(i=newDir.length-1;i>=0;i--){
			dir += newDir[i];
		}
		if(dir == "")
			dir = "~";
		directory = dir;
		term.SetEnd();
	}

	this.MakeDir = function(command, action){
		var dir = "";
		if(directory != ""){
			dir += directory + "/";
		}
		if(action != ""){
			$.post("system/kernel/file/CreateDirectory.php?dirname="+action+"&dir="+dir)
			.done(function(data){
				if(data == "SUCCESS"){
					$("#"+idTerminal).val($("#"+idTerminal).val()+"success create directory "+action);
					loadDirectory();
				} else if(data == "EXIST"){
					$("#"+idTerminal).val($("#"+idTerminal).val()+"directory "+action+" is exist");
				} else {
					$("#"+idTerminal).val($("#"+idTerminal).val()+"failed create directory "+action);
				}
				term.SetEndWith();
			});
		} else {
			$("#"+idTerminal).val($("#"+idTerminal).val()+"mkdir : action error");
			term.SetEndWith();
		}
	}
	
	this.RemoveDir = function(command, action){
		var dir = "";
		if(directory != ""){
			dir += directory + "/";
		}
		if(action != ""){
			var tAction = "";
			var j = 0;
			for(i=action.length-1;i>=0;i--){
				if(j<=47)
					tAction += action[i];
				j++;
			}
			action = "";
			for(i=tAction.length-1;i>=0;i--){
				action += tAction[i];
			}
			
			if(action == "are you sure want delete this directory?(y/n) y\n"){
				$.post("system/kernel/file/RemoveDirectory.php?dirname="+CurrentAction+"&dir="+dir)
				.done(function(data){
					if(data == "SUCCESS"){
						$("#"+idTerminal).val($("#"+idTerminal).val()+"success remove directory "+CurrentAction);
						loadDirectory();
					} else if(data == "FAILED"){
						$("#"+idTerminal).val($("#"+idTerminal).val()+"failed remove directory "+CurrentAction);
					} else {
						$("#"+idTerminal).val($("#"+idTerminal).val()+"directory not found ");
					}
					term.SetEndWith();
				});
			} else {
				$.post("system/kernel/file/CheckDirectory.php?dirname="+action+"&dir="+dir)
				.done(function(data){
					if(data == "YES"){
						$("#"+idTerminal).val($("#"+idTerminal).val()+"are you sure want delete this directory?(y/n) ");
						CurrentAction = action;
					} else {
						$("#"+idTerminal).val($("#"+idTerminal).val()+"rmdir : directory not found");
						term.SetEndWith();
					}
				});
			}
		} else {
			$("#"+idTerminal).val($("#"+idTerminal).val()+"rmdir : action error");
			term.SetEndWith();
		}
	}
	
	this.Remove = function(command, action){
		var dir = "";
		if(directory != ""){
			dir += directory + "/";
		}
		if(action != ""){
			var tAction = "";
			var j = 0;
			for(i=action.length-1;i>=0;i--){
				if(j<=42)
					tAction += action[i];
				j++;
			}
			action = "";
			for(i=tAction.length-1;i>=0;i--){
				action += tAction[i];
			}
			
			if(action == "are you sure want delete this file?(y/n) y\n"){
				$.post("system/kernel/file/RemoveDirectory.php?dirname="+CurrentAction+"&dir="+dir)
				.done(function(data){
					//alert(data);
					if(data == "SUCCESS"){
						$("#"+idTerminal).val($("#"+idTerminal).val()+"success remove file "+CurrentAction);
						loadDirectory();
					} else if(data == "FAILED"){
						$("#"+idTerminal).val($("#"+idTerminal).val()+"failed remove file "+CurrentAction);
					} else {
						$("#"+idTerminal).val($("#"+idTerminal).val()+"file not found ");
					}
					term.SetEndWith();
					document.getElementById("body-terminal").scrollTop = document.getElementById("body-terminal").scrollHeight;
				});
			} else {
				$.post("system/kernel/file/CheckFile.php?dirname="+action+"&dir="+dir)
				.done(function(data){
					if(data == "YES"){
						$("#"+idTerminal).val($("#"+idTerminal).val()+"are you sure want delete this file?(y/n) ");
						CurrentAction = action;
					} else {
						$("#"+idTerminal).val($("#"+idTerminal).val()+"rm : file not found");
						term.SetEndWith();
					}
				});
			}
		} else {
			$("#"+idTerminal).val($("#"+idTerminal).val()+"rmdir : action error");
			term.SetEndWith();
		}
	}
	
	this.FileCopy = function(command, action, outDir){
		var dir = "";
		var path = "";
		var dest = "";
		var res;
		if(directory != ""){
			dir += directory + "/";
		}
		if(action != ""){
			var isDest = false;
			for(i=0;i<action.length;i++){
				if(action[i] == "-"){
					if(action[i+1] == ">"){
						isDest = true;
						i+=2;
					}
				}
				if(!isDest){
					path += action[i]; 
				} else {
					dest += action[i];
				}
			}
			if(outDir){
				dir = "";
			}
			
			$.post("system/kernel/file/CopyDirectory.php?dirname="+path+"&dir="+dir+"&destdir="+dest)
			.done(function(data){
				//alert(data);
				res = data;
				if(data == "SUCCESS"){
					$("#"+idTerminal).val($("#"+idTerminal).val()+"success copy directory "+path);
					loadDirectory();
				} else if(data == "FAILED"){
					$("#"+idTerminal).val($("#"+idTerminal).val()+"failed copy directory "+path);
				} else {
					$("#"+idTerminal).val($("#"+idTerminal).val()+"directory not found ");
				}
				term.SetEndWith();
			});
		} else {
			$("#"+idTerminal).val($("#"+idTerminal).val()+"cp : action error");
			term.SetEndWith();
		}
	}
	
	this.FileMove = function(command, action, outDir){
		var dir = "";
		var path = "";
		var dest = "";
		var res;
		if(directory != ""){
			dir += directory + "/";
		}
		if(action != ""){
			var isDest = false;
			for(i=0;i<action.length;i++){
				if(action[i] == "-"){
					if(action[i+1] == ">"){
						isDest = true;
						i+=2;
					}
				}
				if(!isDest){
					path += action[i]; 
				} else {
					dest += action[i];
				}
			}
			if(outDir){
				dir = "";
			}
			
			$.post("system/kernel/file/MoveDirectory.php?dirname="+path+"&dir="+dir+"&destdir="+dest)
			.done(function(data){
				//alert(data);
				res = data;
				if(data == "SUCCESS"){
					$("#"+idTerminal).val($("#"+idTerminal).val()+"success moving directory "+path);
					loadDirectory();
				} else if(data == "FAILED"){
					$("#"+idTerminal).val($("#"+idTerminal).val()+"failed moving directory "+path);
				} else {
					$("#"+idTerminal).val($("#"+idTerminal).val()+"directory not found ");
				}
				term.SetEndWith();
			});
		} else {
			$("#"+idTerminal).val($("#"+idTerminal).val()+"cp : action error");
			term.SetEndWith();
		}
	}
	
	this.Ping = function(command, action){
		if(action != ""){
					var i=0;
					function ping(){
						$.post("system/kernel/network/ping/PingDomain.php?domain="+action)
						.done(function(data){
							if(data.length < 10){
								$("#"+idTerminal).val($("#"+idTerminal).val()+"Reply from "+action+" time="+data+"ms\n");
							} else {
								$("#"+idTerminal).val($("#"+idTerminal).val()+"Request timed out.\n");
							}
							document.getElementById("body-terminal").scrollTop = document.getElementById("body-terminal").scrollHeight;
							if(i<5){
								setTimeout(function(){
									ping();	
									i++;					
								},1000);
							} else {
								term.SetEndWith();
							}
						});
					}
					ping();
				} else {
					$("#"+idTerminal).val($("#"+idTerminal).val()+"ping : domain not found");
					term.SetEndWith();
				}
	}

	this.GetNodeId = function(id){
		return document.getElementById(id);
	}

	this.getCaret = function(node) {
		if (node.selectionStart) {
			return node.selectionStart;
		} else if (!document.selection) {
			return 0;
		}
	
		var c = "\001",
		sel = document.selection.createRange(),
		dul = sel.duplicate(),
		len = 0;
	
		dul.moveToElementText(node);
		sel.text = c;
		len = dul.text.indexOf(c);
		sel.moveStart('character',1);
		sel.moveEnd('character',1);
		sel.text = "";
		return len;
	}

	this.setSelectionRange = function(input, selectionStart, selectionEnd) {
		if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}
		else if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		}
	}

	this.getText = function(attr){
		return $(attr).val();
	}

	this.getTapped = function(){
		$("#info").html(term.getCaret(term.GetNodeId(idTerminal)));
	}
}

function GetTextElement(attr){
	term.getText(attr);
}