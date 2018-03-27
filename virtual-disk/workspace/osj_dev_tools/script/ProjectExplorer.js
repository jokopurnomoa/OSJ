$(document).keydown(function(event){
    //MessageBox.Show(event.which);
    var event_selected_tab = -1;
    if(selected_tab.length > 7)
        event_selected_tab = selected_tab.replace("-design","");
    else
        event_selected_tab = selected_tab;
    //MessageBox.Show(event.which);
    if(event.ctrlKey && (event.which == 83) && (LoadAppsID["osj_dev_tools"].state == "opened") && (event_selected_tab >= 0)){
        if(ArrayWorkspaceTab[selected_tab].search(".html") > -1){
            sfProject.saveHtml(event_selected_tab);
        } else if((ArrayWorkspaceTab[selected_tab].search(".js") > -1)
            ||(ArrayWorkspaceTab[selected_tab].search(".php") > -1)
            ||(ArrayWorkspaceTab[selected_tab].search(".css") > -1)
            ||(ArrayWorkspaceTab[selected_tab].search(".json") > -1)){
            sfProject.saveFile();
        }
    }
    if((event.which == 46) && (LoadAppsID["osj_dev_tools"].state == "opened") && (event_selected_tab >= 0)){
        if(ToolBoxSelected.search("container") < 0)
            $(ToolBoxSelected).remove();
    }
    if((event.which == 37) && (LoadAppsID["osj_dev_tools"].state == "opened") && (event_selected_tab >= 0)){
        $(ToolBoxSelected).css({"left":((parseInt(($(ToolBoxSelected).css("left")).replace("px","")))-1)});
        getProperties(ToolBoxSelected);
    }
    if((event.which == 38) && (LoadAppsID["osj_dev_tools"].state == "opened") && (event_selected_tab >= 0)){
        $(ToolBoxSelected).css({"top":((parseInt(($(ToolBoxSelected).css("top")).replace("px","")))-1)});
        getProperties(ToolBoxSelected);
    }
    if((event.which == 39) && (LoadAppsID["osj_dev_tools"].state == "opened") && (event_selected_tab >= 0)){
        $(ToolBoxSelected).css({"left":((parseInt(($(ToolBoxSelected).css("left")).replace("px","")))+1)});
        getProperties(ToolBoxSelected);
    }
    if((event.which == 40) && (LoadAppsID["osj_dev_tools"].state == "opened") && (event_selected_tab >= 0)){
        $(ToolBoxSelected).css({"top":((parseInt(($(ToolBoxSelected).css("top")).replace("px","")))+1)});
        getProperties(ToolBoxSelected);
    }

    });
function SaveFileProject(){
    this.saveHtml = function(event_selected_tab){
        generateLayout(false);
        proExp.tabSaved(event_selected_tab);
    }

    this.saveFile = function(){
        //MessageBox.Show("",proExp.getFilename(ArrayWorkspaceTab[selected_tab]));
        $.post("system/applications/osj_dev_tools/script/GenerateFile.php", {"filename":ArrayWorkspaceTab[selected_tab], "data":proExp.getValue(selected_tab)})
        .done(function(data){
            //MessageBox.Show("", data);
            proExp.tabSaved(selected_tab);
        });
    }
}
var sfProject = new SaveFileProject();

function ProjectExplorer(){
    this.ArrDirOpen = [];
    this.rootDirectory = "workspace/";
    this.selectedDir = "";

    this.loadDirectory = function(){
        //alert('');
        $("#osj-dev-tools-project-explorer #body").fadeOut(0);
        $.post("system/applications/file_explorer/script/directory-explorer.php", {"dir" : "~\/workspace\/"})
            .done(function(data){
                //alert(data);
                result = eval("("+data+")");
                //alert(result.sum);
                value = "";
                for(i=0;i<result.sum;i++){
                    idDir = FString.replaceAll("/","_",FString.replaceAll(" ","_",result.value[i]));
                    idDir = idDir.replace(".","_");
                    if(result.isDir[i]){
                        if(result.fileInFolder[i] > 0)
                            value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.showDir('"+result.value[i]+"') onmousedown=proExp.dirSelected('"+result.value[i]+"')><img id='left_"+idDir+"' class='dir-plus' onmousedown=proExp.showDir('"+result.value[i]+"')><img src='system/applications/osj_dev_tools/images/directory.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>"+
                                "<div id='"+idDir+"' style='margin-left:20px'></div>";
                        else
                            value += "<div class='dir' id='root_"+idDir+"' onmousedown=proExp.dirSelected('"+FString.replaceAll(" ","_",result.value[i])+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/directory.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                    }
                }
                $("#osj-dev-tools-project-explorer #body").html(value);
                $("#osj-dev-tools-project-explorer #body").fadeIn(100);
            });
    }

    this.showDir = function(dir){
        document.getSelection().removeAllRanges();
        id = FString.replaceAll("/","_",FString.replaceAll(" ","_",dir));
        id = id.replace(".","_");
        if(!proExp.ArrDirOpen[id]){
            $("#osj-dev-tools-project-explorer #body #left_"+id).css({"background":"url(system/applications/osj_dev_tools/images/dir-min.png)"});
            $.post("system/applications/file_explorer/script/directory-explorer.php", {"dir" : "~\/workspace\/"+dir+"\/"})
                .done(function(data){
                    //alert(data);
                    result = eval("("+data+")");
                    //alert(dir+result.sum);
                    value = "";
                    for(i=0;i<result.sum;i++){
                        idDir = FString.replaceAll("/","_",FString.replaceAll(" ","_",dir+"/"+result.value[i]));
                        idDir = idDir.replace(".","_");
                        //alert(result.value[i]);
                        if(result.isDir[i]){
                            if(result.fileInFolder[i] > 0)
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.showDir('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img id='left_"+idDir+"' class='dir-plus' onmousedown=proExp.showDir('"+dir+"/"+result.value[i]+"')><img src='system/applications/osj_dev_tools/images/directory.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>"+
                                    "<div id='"+idDir+"' style='margin-left:20px'></div>";
                            else
                                value += "<div class='dir' id='root_"+idDir+"' onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/directory.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                        } else {
                            if(result.fileType[i] == ".js" || result.fileType[i] == ".json")
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.openFile('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/file-js.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                            else if(result.fileType[i] == ".html")
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.openFile('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/file-html.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                            else if(result.fileType[i] == ".png" || result.fileType[i] == ".jpg")
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.openFile('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/file-png.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                            else if(result.fileType[i] == ".css")
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.openFile('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/file-png.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                            else if(result.fileType[i] == ".php")
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.openFile('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/file-php.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                            else
                                value += "<div class='dir' id='root_"+idDir+"' ondblclick=proExp.openFile('"+dir+"/"+result.value[i]+"') onmousedown=proExp.dirSelected('"+dir+"/"+result.value[i]+"')><img class='dir-none'><img src='system/applications/osj_dev_tools/images/file-php.png' style='width:15px;margin-right: 5px'>"+result.value[i]+"</div>";
                        }
                    }
                    $("#osj-dev-tools-project-explorer #body #"+id).html(value);
                    proExp.ArrDirOpen[id] = true;
                });
        } else {
            $("#osj-dev-tools-project-explorer #body #left_"+id).css({"background":"url(system/applications/osj_dev_tools/images/dir-plus.png)"});
            $("#osj-dev-tools-project-explorer #body #"+id).html("");
            proExp.ArrDirOpen[id] = false;
        }
    }

    this.dirSelected = function(id){
        if(FString.countWord(id,".") > 0){
            stopSub = (FString.reverse(id)).search("/");
            proExp.selectedDir = id.substr(0,id.length-stopSub);
        } else {
            proExp.selectedDir = id+"/";
        }

        //MessageBox.Show(id.search("/"));
        devtools.programID = proExp.selectedDir.substr(0,(proExp.selectedDir.search("/")));

        id = id.replace(".","_");
        id = FString.replaceAll("/","_",FString.replaceAll(" ","_",id));
        //alert(id);
        $("#osj-dev-tools-project-explorer #body .dir").css({"background":"#FFF","color":"#000"});
        $("#osj-dev-tools-project-explorer #body #root_"+id).css({"background":"url(system/images/header/gradient-blue.png)","color":"#FFF"});
    }

    this.openFile = function(dir){
        root = "virtual-disk/workspace/";
        document.getSelection().removeAllRanges();
        fileType = "."+proExp.getFileType(dir);
        filename = proExp.getFilename(dir);
        if(!proExp.checkIsOpened(dir)){
            proExp.tabSelected(proExp.searchTab(dir));
            return;
        }
        if(fileType == ".html"){
            $.post("system/kernel/file/ReadFile.php", {"dir":root+dir, "special":"true"}).done(function(data){
                $("#osj-dev-tools-workspace").append("<div id='content-tab"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+")></div>");
                $("#osj-dev-tools-workspace").append("<div id='content-tab-design"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+") style='padding:10px'></div>");
                $("#osj-dev-tools-workspace #content-tab-design"+workspace_tab).css({"visibility":"visible"}).html(proExp.designReplace(data));
                $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab'+workspace_tab+'" class="workspace-tab" onmousedown="proExp.tabSelected('+workspace_tab+')"></span>');
                $("#osj-dev-tools-workspace-tab #workspace-tab"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-'+fileType.replace(".","")+'.png"/> '+filename+'<img class="close-tab" onclick="proExp.closeTab('+workspace_tab+')">');
                $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab-design'+workspace_tab+'" class="workspace-tab" onmousedown=proExp.tabSelected("-design'+workspace_tab+'")></span>');
                $("#osj-dev-tools-workspace-tab #workspace-tab-design"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-'+fileType.replace(".","")+'.png"/> '+filename+'(design)<img class="close-tab" onclick=proExp.closeTab("-design'+workspace_tab+'")>');
                proExp.tabSelected(workspace_tab);
                var editor = ace.edit("content-tab"+workspace_tab);
                editor.session.setValue(data);
                editor.setTheme("ace/theme/eclipse");
                editor.setFontSize(14);
                editor.getSession().setMode("ace/mode/html");
                ArrayWorkspaceTab[workspace_tab] = dir;
                ArrayWorkspaceTab["state_"+workspace_tab] = "active";
                proExp.cTitle("workspace-tab"+workspace_tab, dir);
                ArrayWorkspaceTab["-design"+workspace_tab] = dir;
                ArrayWorkspaceTab["state_-design"+workspace_tab] = "active";
                proExp.cTitle("workspace-tab-design"+workspace_tab, dir+"(design)");
                workspace_tab++;
                proId = FString.replaceAll("."+proExp.getFileType(dir),"",proExp.getFilename(dir));
                //MessageBox.show(proId);
                tbInit.form(proId);
                tbInit.button(proId);
                tbInit.label(proId);
                tbInit.textBox(proId);
            });
        } else if(fileType == ".js" || fileType == ".json"){
            $.post("system/kernel/file/ReadFile.php", {"dir":root+dir, "special":"true"}).done(function(data){
                $("#osj-dev-tools-workspace").append("<div id='content-tab"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+")></div>");
                $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab'+workspace_tab+'" class="workspace-tab" onmousedown="proExp.tabSelected('+workspace_tab+')"></span>');
                $("#osj-dev-tools-workspace-tab #workspace-tab"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-'+(fileType.replace(".","")).replace("json","js")+'.png"/> '+filename+'<img class="close-tab" onclick="proExp.closeTab('+workspace_tab+')">');
                proExp.tabSelected(workspace_tab);
                var editor = ace.edit("content-tab"+workspace_tab);
                editor.session.setValue(data);
                editor.setFontSize(14);
                editor.setTheme("ace/theme/eclipse");
                editor.getSession().setMode("ace/mode/javascript");
                ArrayWorkspaceTab[workspace_tab] = dir;
                ArrayWorkspaceTab["state_"+workspace_tab] = "active";
                proExp.cTitle("workspace-tab"+workspace_tab, proExp.rootDirectory+dir);
                workspace_tab++;
            });
        } else if(fileType == ".php"){
            $.post("system/kernel/file/ReadFile.php", {"dir":root+dir, "special":"true"}).done(function(data){
                $("#osj-dev-tools-workspace").append("<div id='content-tab"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+")></div>");
                $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab'+workspace_tab+'" class="workspace-tab" onmousedown="proExp.tabSelected('+workspace_tab+')"></span>');
                $("#osj-dev-tools-workspace-tab #workspace-tab"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-'+fileType.replace(".","")+'.png"/> '+filename+'<img class="close-tab" onclick="proExp.closeTab('+workspace_tab+')">');
                proExp.tabSelected(workspace_tab);
                var editor = ace.edit("content-tab"+workspace_tab);
                editor.session.setValue(data);
                editor.setFontSize(14);
                editor.setTheme("ace/theme/eclipse");
                editor.getSession().setMode("ace/mode/php");
                ArrayWorkspaceTab[workspace_tab] = dir;
                ArrayWorkspaceTab["state_"+workspace_tab] = "active";
                proExp.cTitle("workspace-tab"+workspace_tab, proExp.rootDirectory+dir);
                workspace_tab++;
            });
        } else if(fileType == ".css"){
            $.post("system/kernel/file/ReadFile.php", {"dir":root+dir, "special":"true"}).done(function(data){
                $("#osj-dev-tools-workspace").append("<div id='content-tab"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+")></div>");
                $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab'+workspace_tab+'" class="workspace-tab" onmousedown="proExp.tabSelected('+workspace_tab+')"></span>');
                $("#osj-dev-tools-workspace-tab #workspace-tab"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-'+fileType.replace(".","")+'.png"/> '+filename+'<img class="close-tab" onclick="proExp.closeTab('+workspace_tab+')">');
                proExp.tabSelected(workspace_tab);
                var editor = ace.edit("content-tab"+workspace_tab);
                editor.session.setValue(data);
                editor.setFontSize(14);
                editor.setTheme("ace/theme/eclipse");
                editor.getSession().setMode("ace/mode/css");
                ArrayWorkspaceTab[workspace_tab] = dir;
                ArrayWorkspaceTab["state_"+workspace_tab] = "active";
                proExp.cTitle("workspace-tab"+workspace_tab, proExp.rootDirectory+dir);
                workspace_tab++;
            });
        } else if(fileType == ".png" || fileType == ".jpg"){
            $("#osj-dev-tools-workspace").append("<div id='content-tab"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+")>"+
                "<img src='virtual-disk/workspace/"+dir+"' style='width:300px;height:300px;position:relative;top:50px;left:50px'/></div>");
            $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab'+workspace_tab+'" class="workspace-tab" onmousedown="proExp.tabSelected('+workspace_tab+')"></span>');
            $("#osj-dev-tools-workspace-tab #workspace-tab"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-'+fileType.replace(".","")+'.png"/> '+filename+'<img class="close-tab" onclick="proExp.closeTab('+workspace_tab+')">');
            $("#osj-dev-tools-workspace #content-tab"+workspace_tab+" img").draggable({containment:"#osj-dev-tools-workspace #content-tab"+workspace_tab});
            proExp.tabSelected(workspace_tab);
            ArrayWorkspaceTab[workspace_tab] = dir;
            ArrayWorkspaceTab["state_"+workspace_tab] = "active";
            proExp.cTitle("workspace-tab"+workspace_tab, proExp.rootDirectory+dir);
            workspace_tab++;
        } else {
            $.post("system/kernel/file/ReadFile.php", {"dir":root+dir, "special":"true"}).done(function(data){
                $("#osj-dev-tools-workspace").append("<div id='content-tab"+workspace_tab+"' class='content-tab' onkeydown=proExp.tabEdited("+workspace_tab+")></div>");
                $("#osj-dev-tools-workspace-tab").append('<span id="workspace-tab'+workspace_tab+'" class="workspace-tab" onmousedown="proExp.tabSelected('+workspace_tab+')"></span>');
                $("#osj-dev-tools-workspace-tab #workspace-tab"+workspace_tab).html('<img src="system/applications/osj_dev_tools/images/file-php.png"/> '+filename+'<img class="close-tab" onclick="proExp.closeTab('+workspace_tab+')">');
                proExp.tabSelected(workspace_tab);
                var editor = ace.edit("content-tab"+workspace_tab);
                editor.session.setValue(data);
                editor.setFontSize(14);
                editor.setTheme("ace/theme/eclipse");
                editor.getSession().setMode("ace/mode/plain");
                ArrayWorkspaceTab[workspace_tab] = dir;
                ArrayWorkspaceTab["state_"+workspace_tab] = "active";
                proExp.cTitle("workspace-tab"+workspace_tab, proExp.rootDirectory+dir);
                workspace_tab++;
            });
        }

    }

    this.designReplace = function(data){
        data = data.replace("box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.9)","box-shadow:0px 5px 20px 1px rgba(0,0,0,0.001)");
        data = data.replace("box-shadow:0px 5px 20px 1px rgba(0,0,0,0.9)","box-shadow:0px 5px 20px 1px rgba(0,0,0,0.001)");
        //alert(data);
        data = data.replace("application-container","___application-container___");
        return data;
    }

    this.checkIsOpened = function(dir){
        len = ArrayWorkspaceTab.length;
        result = true;
        for(i=0;i<len;i++){
            if(ArrayWorkspaceTab[i] == dir && ArrayWorkspaceTab["state_"+i] == "active"){
                result = false;
                break;
            }
        }
        return result;
    }

    this.searchTab = function(dir){
        len = ArrayWorkspaceTab.length;
        result = -1;
        for(i=0;i<len;i++){
            if(ArrayWorkspaceTab[i] == dir){
                result = i;
                break;
            }
        }
        return result;
    }

    this.getFileType = function(dir){
        len = dir.length;
        value = "";
        res = "";
        result = "";
        isInsert = true;
        for(i=len-1;i>len-6;i--){
            value += dir[i];
        }
        for(i=0;i<value.length;i++){
            if(value[i] == ".")
                isInsert = false;
            if(isInsert)
                res += value[i];
        }
        for(i=res.length-1;i>=0;i--){
            result += res[i];
        }

        return result;
    }

    this.getFilename = function(dir){
        len = dir.length;
        value = "";
        res = "";
        result = "";
        isInsert = true;
        for(i=len-1;i>=0;i--){
            value += dir[i];
        }
        for(i=0;i<value.length;i++){
            if(value[i] == "/")
                isInsert = false;
            if(isInsert)
                res += value[i];
        }
        for(i=res.length-1;i>=0;i--){
            result += res[i];
        }

        return result;
    }

    this.escapeHtml = function(text){
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = text.replace(/"/g, "&quot;");
        text = text.replace(/'/g, "#039;");
        return text;
    }

    this.unescapeHtml = function(text){
        text = text.replace(/&amp;/g, "&");
        text = text.replace(/&lt;/g, "<");
        text = text.replace(/&gt;/g, ">");
        //text = text.replace(/&quot;/g, '"');
        text = text.replace(/#039;/g, "'");
        return text;
    }

    this.tabSelected = function(tab){
        //proExp.getValue(tab);
        dir = "";
        if(ArrayWorkspaceTab[tab] != undefined)
            dir = ArrayWorkspaceTab[tab];
        setTimeout(function(){
            if(proExp.getFileType(dir) == "html"){
                res = proExp.getFilename(dir);
                devtools.programID = res.replace("."+proExp.getFileType(res), "");
            }
        },0);

        selected_tab = tab;
        $("#osj-dev-tools-workspace-tab .workspace-tab").css({
            "border-top-left-radius":"0px",
            "border-top-right-radius":"0px",
            "background": "none"});

        $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).css({
            "border-top-left-radius":"3px",
            "border-top-right-radius":"3px",
            "background": "#FFF"});

        $("#osj-dev-tools-workspace .content-tab").css({"visibility":"hidden"});
        $("#osj-dev-tools-workspace #content-tab"+tab).css({"visibility":"visible"});
    }

	
	this.closeAllTab = function(){
		for(j=0;j<workspace_tab;j++){
			if(ArrayWorkspaceTab["state_"+j] == "active")
				proExp.closeTab(j);
		}
	}

    this.closeTab = function(tab){
		if(tab.length > 7)
            tab = tab.replace("-design","");
        $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).remove();
        $("#osj-dev-tools-workspace #content-tab"+tab).remove();
        ArrayWorkspaceTab[tab] = "";
        ArrayWorkspaceTab["state_"+tab] = "unactive";
        tab = "-design"+tab;
        $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).remove();
        $("#osj-dev-tools-workspace #content-tab"+tab).remove();
        tab = tab.replace("-design","");
        tab = parseInt(tab.replace("-design",""));
        ArrayWorkspaceTab[tab] = "";
        ArrayWorkspaceTab["state_"+tab] = "unactive";
        len = ArrayWorkspaceTab.length;
        result = -1;
        for(i=tab;i<len;i++){
            if(ArrayWorkspaceTab["state_"+i] == "active")
                result = i;
        }
        if(result < 0)
            for(i=tab;i>=0;i--){
                if(ArrayWorkspaceTab["state_"+i] == "active")
                    result = i;
            }

        if(result > -1)
            proExp.tabSelected(result);
        else
            selected_tab = -1;
        $("#ctitle").html("").css({"top": -100, "left": -100});
    }

    this.tabEdited = function(tab){
        ArrayWorkspaceTab["edit_"+tab] = true;
        value = $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).html();
        if(value[0] != "*"){
            $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).html("*"+value);
        }
    }

    this.tabSaved = function(tab){
        ArrayWorkspaceTab["edit_"+tab] = false;
        value = $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).html();
        if(value[0] == "*"){
            $("#osj-dev-tools-workspace-tab #workspace-tab"+tab).html(value.replace("*",""));
        }
        ArrayWorkspaceTab["edit_-design"+tab] = false;
        value = $("#osj-dev-tools-workspace-tab #workspace-tab-design"+tab).html();
        if(value[0] == "*"){
            $("#osj-dev-tools-workspace-tab #workspace-tab-design"+tab).html(value.replace("*",""));
        }
    }

    this.getValue = function(tab){
        if(tab.length > 7)
            return ($("#osj-dev-tools-workspace #content-tab"+tab).html()).replace(/\n\n/g, "\n");
        else {
            var editor = ace.edit("content-tab"+tab);
            return ("\n\n","\n",editor.session.getValue()).replace(/\n\n/g, "\n");
        }
    }

    this.cTitle = function(id, text){
        $("#"+id).mousemove(function(e){
            $("#ctitle").html(text).css({"top": e.pageY-25, "left": e.pageX});
        }).mouseout(function(e){
            $("#ctitle").html("").css({"top": -100, "left": -100});
        });
    }

    this.designGenerator = function(dir, data){
        /*
        posEnd = dir.search("/");
        proId = proExp.getFilename(dir);
        proId = FString.replaceAll("."+proExp.getFileType(dir),"",proExp.getFilename(proId));

        data = FString.replaceAll('-'+proId+'"', '-build"', data);
        data = FString.replaceAll('"'+proId+'-', '"build-', data);
        data = FString.replaceAll('#'+proId+'-', '#build-', data);
        alert(data);*/
        return data;
    }
}

var proExp = new ProjectExplorer();
//MessageBox.Show("Peringatan", "Daya baterai anda lemah, harap segera dicharge.");
