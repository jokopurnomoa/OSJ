function loadDirectory(){
	// Show Directory in Left Page
    $("#body-explorer-left").remove();
    $("#tb-explorer-left").html("<div id='body-explorer-left'></div>");
    $("#body-explorer-left").fadeOut(10);
	$.post("system/applications/file_explorer/script/directory-explorer.php", {"dir" : "~"}, function(data){
		res = eval("("+data+")");
		$("#body-explorer-left").html("<b>System Storage  </b>"+
		"<span title='Refresh' onmousedown='loadDirectory()' id='refresh'></span>");
		
		for(i=0;i<res.sum;i++){
			if(res.isDir[i]){
				var thisValue = res.value[i];
				for(j=0;j<thisValue.length;j++){
					if(thisValue[j] == " ")
						thisValue = thisValue.replace(" ","_-_-_");
				}
				var thisId = idReplace(thisValue);

                if(res.dirInFolder[i] > 0)
                    imgDraftMore = "<img src='system/applications/file_explorer/images/trans.png' id='"+thisId+"img' class='nav-dir' onclick=moreDraft('"+res.thisDir+""+thisValue+"/','dir_"+thisId+"','"+thisId+"img') />";
                else
                    imgDraftMore = "<img style='display: inline-block;height: 12px;width:12px'/>";
                $("#body-explorer-left").append(
					"<div class='dir' id='"+thisId+"dir' onclick=dirLeftSelected('"+thisId+"dir') onmousedown=showDraft('"+res.thisDir+""+thisValue+"/') style='margin-left:5px'>" +imgDraftMore+
					"<img src='system/applications/file_explorer/images/directory.png' id='"+thisId+"img' class='directory' /> " + res.value[i] + "</div>" +
					"<div id='dir_"+thisId+"' style='margin-left:25px'></div>");
			}
		}
		$("#body-explorer-left").fadeIn(100).resizable({handles:'e'});
	});	
}

function showDraft(dir, backTrack, nextTrack, textSearch){
	if(textSearch == undefined || textSearch == null)
		textSearch = "";
	dir = dirReplace(dir);
	SelectedItem = dirReplace(dir.replace("../../../../",""));
	sDir = dir.replace("../../../../virtual-disk/", "");
	rDir = "";
	for(i=0;i<sDir.length-1;i++){
		rDir += sDir[i];
	}
    ArrRdir = rDir.replace("~/","").split("/");
    //MessageBox.show(ArrRdir.length);
    elDir = "";
    idRdir = "";
	start = 0;
	if(ArrRdir.length > 5){
		start = ArrRdir.length-5;
	}
    for(i=start;i<ArrRdir.length;i++){
		idRdir += ArrRdir[i]+"/";
        if(ArrRdir.length > 5 && i == start)
			elDir += "<span class='explorer-rdir' id='"+idReplace(idRdir)+"' onmousedown=\"SelectRdir('"+idReplace(idRdir)+"','"+idRdir+"',true)\">&lt;</span>";
		else
        	elDir += "<span class='explorer-rdir' id='"+idReplace(idRdir)+"' onmousedown=\"SelectRdir('"+idReplace(idRdir)+"','"+idRdir+"',true)\">"+ArrRdir[i]+"</span>";
    }
    $("#this-directory").html(elDir);

	if(!backTrack && !nextTrack){
        if(dirBackTrack[idDirNow-1] != dir){
            dirBackTrack[idDirNow] = dir;
            idDirNow++;
        }
	} else if(backTrack && idDirNow > 1){
		idDirNow--;
	} else if(nextTrack && idDirNow > 1){
		idDirNow++;
	}
	$("#body-explorer-right").html("").fadeOut(10);
    SelectRdir(idReplace(idRdir),idRdir);
    $.post("system/applications/file_explorer/script/directory-explorer.php", {"dir" : dir+"//"}, function(data){
		res = eval("("+data+")");
        DirResult = res;
		
		i = 0;
		$("#body-explorer-right").html("");
		$.post("system/applications/file_explorer/script/get-filetype.php", {"filetype" : res.fileType})
		.done(function(data){
			//alert(data);
            if(data != null && data != ""){
                result = eval("("+data+")");
            } else {
                result = "";
            }
			j = 0;
			function showThis(){
				if(i >= res.sum){
					return;
				}			
				thisValue = res.value[i];
                thisValue = thisValue.replace(/ /g,"_-_-_");

                var thisDir = res.thisDir.replace("virtual-disk","virtual-disk/");
				thisDir = thisDir.replace("//","/");
				thisDir = thisDir.replace(/ /g,"_-_-_");

				value = res.value[i];
				thisId = idReplace(value);
                //alert(value);
				//thisDir = thisDir.replace("///","//");
				if(res.isDir[i]){
					if(textSearch == "" || thisValue.toLowerCase().replace(/_-_-_/g," ").search(textSearch.toLowerCase()) > -1){
						$("#body-explorer-right").append("<span class='draft-dir' id='"+thisId+"_rdir' onmousedown=\"SelectItem('"+thisId+"_rdir', '"+thisDir+thisValue+"/')\" onmouseover=dirHover('"+thisId+"_rdir') onmouseout=dirOut('"+thisId+"_rdir') ondblclick=showDraft('"+thisDir+thisValue+"/')> " +
						"<img src='system/applications/file_explorer/images/folder.png' class='draft-dir-img'/>" +
						"<div class='draft-dir-title'>"+cutDirValue(value)+"</div></span>"
						);
						j++;
					}
					i++;
					showThis();
				} else {
					if(textSearch == "" || thisValue.toLowerCase().replace(/_-_-_/g," ").search(textSearch.toLowerCase()) > -1){
						thisDir = thisDir.replace("../../../../","");
						if(result[res.fileType[i]] == "" || result[res.fileType[i]] == undefined){
							icon = "system/applications/file_explorer/images/file-type/unknown-type.png";
						} else {
							icon = result[res.fileType[i]];
						}
						$("#body-explorer-right").append("<span class='draft-dir' id='"+thisId+"_rdir' "+
						"onmousedown=\"SelectItem('"+thisId+"_rdir', '"+thisDir+thisValue+"/')\" onmouseover=dirHover('"+thisId+"_rdir') onmouseout=dirOut('"+thisId+"_rdir') "+
						"ondblclick=handleOpenThis('"+thisDir+thisValue+"','"+res.fileType[i]+"','"+thisValue+"')> " +
						"<img src='"+icon+"' class='draft-dir-img'/>" +
						"<div class='draft-dir-title'>"+cutDirValue(value)+"</div></span>"
						);
						j++;
					}
					i++;
					showThis();
				}
			}
            showThis();
			$("#body-explorer-right").bind("contextmenu", function(event) {
				CtrlKeyPressed = true;
				if(IdSelectedItem == 0){
					if(FString.countWord(ArrSelectedItem[0][1],".") > 0){
						if(FString.countWord(ArrSelectedItem[0][1],".dapp") > 0){
							data = [["Open","handleOpenThis('"+FString.removeEndSlash(ArrSelectedItem[0][1])+"','."+FString.getFiletype(ArrSelectedItem[0][1])+"','"+FString.getFilename(ArrSelectedItem[0][1])+"')"],["Run","Runnable.open('"+ArrSelectedItem[0][1]+"')"],null,["Copy","ExplorerCopy()"],["Cut","ExplorerCut()"],null,["Paste","ExplorerPaste()"],null,["Delete","ExplorerDelete()"],["Rename","ExplorerRename()"]];
						} else {
							data = [["Open","handleOpenThis('"+FString.removeEndSlash(ArrSelectedItem[0][1])+"','."+FString.getFiletype(ArrSelectedItem[0][1])+"','"+FString.getFilename(ArrSelectedItem[0][1])+"')"],null,["Copy","ExplorerCopy()"],["Cut","ExplorerCut()"],null,["Paste","ExplorerPaste()"],null,["Delete","ExplorerDelete()"],["Rename","ExplorerRename()"]];
						}
					} else {
						data = [["Open Folder","showDraft('../../../../"+ArrSelectedItem[0][1]+"')"],null,["Copy","ExplorerCopy()"],["Cut","ExplorerCut()"],null,["Paste","ExplorerPaste()"],null,["Delete","ExplorerDelete()"],["Rename","ExplorerRename()"]];
					}
				} else
					data = [["Copy","ExplorerCopy()"],["Cut","ExplorerCut()"],null,["Paste","ExplorerPaste()"],null,["Delete","ExplorerDelete()"]];
				if(IdSelectedItem > -1)
					RightClick.show(data, event);
			}).mousedown(function(){
				CtrlKeyPressed = false;
				RightClick.hide();
			});

            if(i == 0){
				$("#body-explorer-right").html("Directory is empty");
			}
			if($("#body-explorer-right").html() == ""){
				$("#body-explorer-right").html("\""+textSearch+"\" not found");
			}
		});

		$("#body-explorer-right").fadeIn(100);
	});
}

function dirLeftSelected(){}

function SelectRdir(id, dir, isShowDraft){
    $(".explorer-rdir").css({"font-weight":"100", "background":"url(system/images/header/lines.png)","border":"border: 1px solid #a3a3a3"});
    $("#"+id).css({"font-weight":"bold", "background":"url(system/images/header/lines.png) 0 -50px", "border":"1px solid #7c7c7c"});
    if(isShowDraft)
        showDraft("../../../../virtual-disk/"+dir);
}

function moreDraft(dir, id, idImg){
    dir = dirReplace(dir);
	if($("#"+id).html() == "" || $("#"+id).html() == null){
		$("#"+id).html("").css({
			visibility : "visible",
			height : "auto"
		});
		$("#"+idImg).css({
			background : "url(system/applications/file_explorer/images/dir-open.png)"
		})
		.mouseover(function(){
			$(this).css({
				background : "url(system/applications/file_explorer/images/dir-hover-open.png)"
			})
		})
		.mouseout(function(){
			$(this).css({
				background : "url(system/applications/file_explorer/images/dir-open.png)"
			})
		});

        $.post("system/applications/file_explorer/script/directory-explorer.php", {"dir" : dir+"//"}, function(data){
			res = eval("("+data+")");
			
			for(i=0;i<res.sum;i++){
				var thisValue = res.value[i];
				for(j=0;j<thisValue.length;j++){
					if(thisValue[j] == " ")
						thisValue = thisValue.replace(" ","_-_-_");
				}
				
				var thisDir = res.thisDir;
				for(j=0;j<thisDir.length;j++){
					if(thisDir[j] == " ")
						thisDir = thisDir.replace(" ","_-_-_");
				}
				
				var thisId = thisValue+Math.random(999);
				for(j=0;j<thisId.length;j++){
					if(thisId[j] == "(")
						thisId = thisId.replace("(","");
					if(thisId[j] == ")")
						thisId = thisId.replace(")","");
					if(thisId[j] == ".")
						thisId = thisId.replace(".","");
				}

                if(res.dirInFolder[i] > 0)
                    imgDraftMore = "<img src='system/applications/file_explorer/images/trans.png' id='"+thisId+"img' class='nav-dir' onclick=moreDraft('"+thisDir+""+thisValue+"/','dir_"+thisId+"','"+thisId+"img') />";
                else
                    imgDraftMore = "<img style='display: inline-block;height: 12px;width:12px'/>";
                if(res.isDir[i]){
					$("#"+id).html($("#"+id).html() + 
					"<div class='dir' id='"+thisId+"dir' onclick=dirLeftSelected('"+thisId+"dir') onmousedown=showDraft('"+thisDir+thisValue+"/')>" + imgDraftMore+
					"<img src='system/applications/file_explorer/images/directory.png' id='"+thisId+"img' class='' /> " +
					res.value[i] + "</div>" +
					"<div id='dir_"+thisId+"' style='margin-left:20px'></div>");
				}
			}
		});
	} else {
		$("#"+id).html("");
		$("#"+idImg).css({
			background : "url(system/applications/file_explorer/images/dir-close.png)"
		})
		.mouseover(function(){
			$(this).css({
				background : "url(system/applications/file_explorer/images/dir-hover.png)"
			})
		})
		.mouseout(function(){
			$(this).css({
				background : "url(system/applications/file_explorer/images/dir-close.png)"
			})
		});
	}
}

$("#directory-search input").focus(function(){
	$("#directory-search").css({"box-shadow":"inset 0 0 2px 0 #2f9df7", border : "1px solid #2f9df7"});
	$(this).css({color:"#333"});
}).blur(function(){
	$("#directory-search").css({"box-shadow":"none", border : "1px solid #CCC"});
	$(this).css({color:"#999"});
});