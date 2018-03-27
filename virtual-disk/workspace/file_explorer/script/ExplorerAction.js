function ExplorerCopy(){
    ArrCommandItem = [];
    $(".draft-dir"+" img").css({opacity:1});
    for(i=0;i<=IdSelectedItem;i++)
        ArrCommandItem[i] = ArrSelectedItem[i][1].replace("virtual-disk/","~/");
	Command = "copy";
	CommandDir = SelectedDir.replace("virtual-disk/","~/");
}

function ExplorerCut(){
    ArrCommandItem = [];
    $(".draft-dir"+" img").css({opacity:1});
    for(i=0;i<=IdSelectedItem;i++){
        ArrCommandItem[i] = ArrSelectedItem[i][1].replace("virtual-disk/","~/");

        idMark = ArrCommandItem[i];
        if(idMark[idMark.length-1] == "/")
            idMark = idMark.substr(0, idMark.length-1);
        var posSlash = FString.reverse(idMark).search("/");
        idMark = idReplace(idMark.substr(idMark.length-posSlash,posSlash));
        //MessageBox.show("",":"+idMark+":"+posSlash);
        $("#"+idMark+"_rdir img").css({opacity:0.5});
    }
    Command = "cut";
	CommandDir = SelectedDir.replace("virtual-disk/","~/");
}

function ExplorerPaste(){
	var term = new Terminal();
	SelectedItem = SelectedItem.replace("virtual-disk/","~/");
    $("#progress-bar-explorer").css({top:250,left:450}).fadeTo(100,1);

    if(Command == "copy"){
        var numCopy = 0;
        progressExplorer(0,0,"");
        multiplyVal = 100/ArrCommandItem.length;
        function copyPaste(){
            CommandItem = ArrCommandItem[numCopy];
            CommandItem = CommandItem.replace(/ /g,"_-_-_");
            if(CommandItem[CommandItem.length-1] == "/")
                CommandItem = CommandItem.substr(0,CommandItem.length-1);
            SelectedItem = SelectedItem.replace(/ /g,"_-_-_");
            if(CommandItem != SelectedItem){
                $.post("system/kernel/file/CopyDirectory.php?dirname="+CommandItem+"&dir=&destdir="+SelectedItem)
                    .done(function(data){
                        numCopy++;
                        progressExplorer(Math.floor((numCopy-1)*multiplyVal),Math.floor(numCopy*multiplyVal),"Copying "+CommandItem.replace(/_-_-_/g," ")+" to "+SelectedItem.replace(/_-_-_/g," ")+" ("+numCopy+" of "+ArrCommandItem.length+")");
                        if(numCopy >= ArrCommandItem.length){
                            progressExplorer(Math.floor((numCopy-1)*multiplyVal),100,"Copying "+CommandItem.replace(/_-_-_/g," ")+" to "+SelectedItem.replace(/_-_-_/g," ")+" ("+numCopy+" of "+ArrCommandItem.length+")");
                            showDraft(SelectedItem);
                            unSelectAllItem();
                            $("#progress-bar-explorer").css({top:-2000,left:-2000}).fadeTo(100,0);
                        } else {
                            if(data == "SUCCESS"){
                                setTimeout(function(){
                                    copyPaste();
                                },5);
                            } else {
                                MessageBox.show("File Explorer","Failed copy file "+CommandItem.replace(/_-_-_/g," "));
                            }
                        }
                    });
			}
        }
        copyPaste();
	} else if(Command == "cut"){
        var numMove = 0;
        multiplyVal = 100/ArrCommandItem.length;
        function cutPaste(){
            CommandItem = ArrCommandItem[numMove];
            CommandItem = CommandItem.replace(/ /g,"_-_-_");
            if(CommandItem[CommandItem.length-1] == "/")
                CommandItem = CommandItem.substr(0,CommandItem.length-1);
            SelectedItem = SelectedItem.replace(/ /g,"_-_-_");
            if(CommandItem != SelectedItem){
                $.post("system/kernel/file/MoveDirectory.php?dirname="+CommandItem+"&dir=&destdir="+SelectedItem)
                    .done(function(data){
                        numMove++;
                        progressExplorer(Math.floor((numMove-1)*multiplyVal),Math.floor(numMove*multiplyVal),"Moving "+CommandItem.replace(/_-_-_/g," ")+" to "+SelectedItem.replace(/_-_-_/g," ")+" ("+numMove+" of "+ArrCommandItem.length+")");
                        if(numMove >= ArrCommandItem.length){
                            progressExplorer(Math.floor((numMove-1)*multiplyVal),100,"Moving "+CommandItem.replace(/_-_-_/g," ")+" to "+SelectedItem.replace(/_-_-_/g," ")+" ("+numMove+" of "+ArrCommandItem.length+")");
                            showDraft(SelectedItem);
                            unSelectAllItem();
                            $("#progress-bar-explorer").css({top:-2000,left:-2000}).fadeTo(100,0);
                        } else {
                            if(data == "SUCCESS"){
                                setTimeout(function(){
                                    cutPaste();
                                },5);
                            } else {
                                MessageBox.show("File Explorer","Failed move file "+CommandItem.replace(/_-_-_/g," "));
                            }
                        }
                    });
			}
        }
        cutPaste();
	}
}

function ExplorerDelete(){
    var numDelete = 0;
    $("#progress-bar-explorer").css({top:250,left:450}).fadeTo(100,1);
    multiplyVal = 100/ArrSelectedItem.length;
    function deleteExp(){
        SelectedItem = ArrSelectedItem[numDelete][1].replace("virtual-disk/","~/");

        SelectedItem = SelectedItem.replace(/ /g,"_-_-_");
        if(SelectedItem[SelectedItem.length-1] == "/")
            SelectedItem = SelectedItem.substr(0,SelectedItem.length-1);
        var posSlash = FString.reverse(SelectedItem).search("/");
        DS = SelectedItem.substr(0, SelectedItem.length-posSlash);

        $.post("system/kernel/file/RemoveDirectory.php?dirname="+SelectedItem+"&dir=")
            .done(function(data){
                numDelete++;
                progressExplorer(Math.floor((numDelete-1)*multiplyVal),Math.floor(numDelete*multiplyVal),"Deleting "+SelectedItem.replace(/_-_-_/g," ")+" ("+numDelete+" of "+(IdSelectedItem+1)+")");
                if(numDelete >= IdSelectedItem+1){
                    progressExplorer(Math.floor((numDelete-1)*multiplyVal),100,"Deleting "+SelectedItem.replace(/_-_-_/g," ")+" ("+numDelete+" of "+(IdSelectedItem+1)+")");
                    showDraft(DS);
                    unSelectAllItem();
                    $("#progress-bar-explorer").css({top:-2000,left:-2000}).fadeTo(100,0);
                } else {
                    if(data == "SUCCESS"){
                        setTimeout(function(){
                            deleteExp();
                        },5);
                    } else {
                        MessageBox.show("File Explorer","Failed delete file "+SelectedItem.replace(/_-_-_/g," "));
                    }
                }
            });
    }
    deleteExp();
}

function ExplorerNewFolder(){
    if(rDir == undefined || rDir == "")
        return;
    isCreateFolder = true;
    document.getElementById("body-explorer-right").scrollTop = document.getElementById("body-explorer-right").scrollHeight;
    if($("#body-explorer-right").html() == "Directory is empty")
        $("#body-explorer-right").html("");
    $("#body-explorer-right").append("<span class='draft-dir' id='_____new_folder_____'> " +
        "<img src='system/applications/file_explorer/images/folder.png' class='draft-dir-img'/>" +
        "<div class='draft-dir-title' contenteditable='true' style='border:1px solid rgba(47,157,247,0.9)'>New Folder</div></span>");
    $("#_____new_folder_____ .draft-dir-title").focus().select();
    $("#_____new_folder_____ .draft-dir-title").keydown(function(event){
        if(event.keyCode == 13){
            ExplorerCreateNewFolder();
        }
    });
}

function ExplorerCreateNewFolder(){
    dir = "~/";
    if(rDir == undefined || rDir == "")
        return;
    dir += rDir.replace(/ > /g, "/").replace("~/", "");
    $.post("system/kernel/file/CreateFolder.php?dirname="+dir+"/"+$("#_____new_folder_____ .draft-dir-title").html())
        .done(function(data){
            if(data == "SUCCESS"){
                $("#_____new_folder_____ .draft-dir-title").blur();
                showDraft("../../../../virtual-disk/"+rDir.replace(/ > /g, "/").replace("~/", "")+"/");
                isCreateFolder = false;
            } else {
                MessageBox.show("File Explorer","Folder is exist!");
                $("#_____new_folder_____ .draft-dir-title").html($("#_____new_folder_____ .draft-dir-title").html().replace(/<br>/g, ""));
                $("#_____new_folder_____ .draft-dir-title").focus().select();
            }
        });
}

function ExplorerRename(){
    if(IdSelectedItem == 0){
        isRenameFile = true;
        id = ArrSelectedItem[0][0];
        val = ArrSelectedItem[0][1];
        if(val[val.length-1] == "/")
            val = val.substr(0,val.length-1);
        var posSlash = FString.reverse(val).search("/");
        val = val.substr(val.length-posSlash,posSlash);
        $("#"+id+" .draft-dir-title").remove();
        $("#"+id).append("<div class='draft-dir-title' contenteditable='true' style='border:1px solid rgba(47,157,247,0.9);background: #FFF;color:#333' onkeydown=\"ExplorerRenameFile('"+ArrSelectedItem[0][0]+"','"+ArrSelectedItem[0][1]+"',  event)\">"+cutDirValue(val, false)+"</div></span>")
            .css({"z-index":100});
        $("#"+id+" .draft-dir-title").focus();
        $("#"+id+" .draft-dir-title").css({"background":"#FFF"});
    }
}

function ExplorerRenameFile(id, oldName, event){
    RenamedFileId = id;
    if(event.which != 13)
        return;
    dir = "~/";
    if(rDir == undefined || rDir == "")
        return;
    dir += rDir.replace(/ > /g, "/").replace("~/", "");
    if(oldName[oldName.length-1] == "/")
        oldName = oldName.substr(0,oldName.length-1);
    //alert("RENAME:"+id+":"+oldName+":"+event.which);
    //MessageBox.show("","RENAME");
    $.post("system/kernel/file/RenameFile.php?dirname=../../../../"+oldName+"&newname="+FString.trim($("#"+id+" .draft-dir-title").html()).replace(/<br>/g,""))
        .done(function(data){
            //MessageBox.show("",data);
            isRenameFile = false;
            RenamedFileId = "";
            $("#"+id+" .draft-dir-title").blur();
            showDraft("../../../../virtual-disk/"+rDir.replace(/ > /g, "/").replace("~/", "")+"/");
        });
}

function ExplorerEvent(){
	$(document).keydown(function(event){
        //MessageBox.show(event.keyCode);
        if(LoadAppsID["explorer"].onFocus == true){
            if(event.ctrlKey){
                if(event.which == 67){
                    ExplorerCopy();
                }
                else if(event.which == 86){
                    ExplorerPaste();
                }
                else if(event.which == 88){
                    ExplorerCut();
                }
                else if(event.which == 65){
                    selectAllItem();
                }
                else if(event.shiftKey && event.which == 78){
                    ExplorerNewFolder();
                }
            }
            else if(event.which == 46){
                ExplorerDelete();
                //loadDirectory();
            } else if(event.which == 113){
                ExplorerRename();
            }
            //MessageBox.show("",LoadAppsID["explorer"].onFocus+"");
        //MessageBox.show("",event.which+"");
        }
	});
}

function progressExplorer(val, max, text){
    var progressbar = $( "#progressbar-explorer" ),
        progressLabel = $( "#progress-label-explorer" );

    progressbar.progressbar({
        value: 0,
        change: function() {
            progressLabel.text(text);
            $("#progressbar-explorer .progress-label").html(progressbar.progressbar("value")+"%");
        },
        complete: function() {
            progressLabel.text("Complete!");
        }
    });

    function progress(val, max) {
        var val = progressbar.progressbar("value") || val;
        progressbar.progressbar("value", val + 1);
        if (val < max-1) {
            setTimeout(function(){
                progress(val + 1, max);
            },10);
        }
    }
    progress(val, max);
}

function explorerSearch(){
	var textSearch = $("#directory-search input").val();
	if(rDir != "")
		showDraft("../../../../virtual-disk/"+rDir+"/",null,null,textSearch);
}