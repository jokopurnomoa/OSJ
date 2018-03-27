function generateLayout(showMessage){
	$("#"+devtools.programID+"-container").css({
		"border-top-left-radius" : 5,
		"border-top-right-radius" : 5,
		"background" : "#FFF",
		"box-shadow" : "0px 5px 20px 1px rgba(0,0,0,0.9)",
        "border":"1px solid #999"
	});
	$("."+devtools.programID+"-button").css({
		"border":"1px solid #999"
	});
	$("."+devtools.programID+"-label").css({
		"border":"none"
	});
    $("."+devtools.programID+"-textbox").css({
        "border":"1px solid #999"
    });
	tbAdd.setStyle();
	//alert(devtools.programID+":"+selected_tab);
	dataLayout = proExp.getValue(selected_tab);
	dataLayout = RemoveAtribut(dataLayout);

    $("#"+devtools.programID+"-container").css({
        "box-shadow" : "0px 5px 20px 1px rgba(0,0,0,0)"
    });

	$.post("system/applications/osj_dev_tools/script/GenerateLayout.php?filename="+devtools.programID+".html&directory="+devtools.programID, {"data" : dataLayout})
	.done(function(data){
        $.post("system/applications/osj_dev_tools/script/GenerateJSON.php?application_name="+devtools.ApplicationName+"&program_id="+devtools.programID+"&project_name="+devtools.ProjectName+"&width="+$("#"+devtools.programID+"-container").css("width")+"&height="+$("#"+devtools.programID+"-container").css("height")+"&posY="+$("#"+devtools.programID+"-container").css("top")+"&posX="+$("#"+devtools.programID+"-container").css("left"), {"data" : dataLayout})
        .done(function(data){
            if(data == "SUCCESS")
                devtools.generateLayoutResult = "SUCCESS";
            else
                devtools.generateLayoutResult = "FAILED";
        });
	});
}

function RemoveAtribut(data){
	if(FString.countWord("build-textbox")>0){
		data = FString.replaceAll('class="build-textbox','contenteditable="true" class="build-textbox',data);
	}
	data = FString.replaceAll('<div style="z-index: 90;" class="ui-resizable-handle ui-resizable-n"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-e"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-s"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-w"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-sw"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-ne"></div><div style="z-index: 90;" class="ui-resizable-handle ui-resizable-nw"></div>','',data);
	data = FString.replaceAll("ui-icon ui-icon-gripsmall-diagonal-se","",data);
	data = FString.replaceAll("ui-draggable-dragging","",data);
	data = FString.replaceAll("ui-draggable","",data);
	data = FString.replaceAll("ui-resizable-handle","",data);
	data = FString.replaceAll("ui-resizable-se","",data);
	data = FString.replaceAll("ui-resizable-sw","",data);
	data = FString.replaceAll("ui-resizable-ne","",data);
	data = FString.replaceAll("ui-resizable-nw","",data);
	data = FString.replaceAll("ui-resizable-n","",data);
	data = FString.replaceAll("ui-resizable-e","",data);
	data = FString.replaceAll("ui-resizable-s","",data);
	data = FString.replaceAll("ui-resizable-w","",data);
	data = FString.replaceAll("ui-resizable","",data);
	data = FString.replaceAll('class="  "','',data);
	data = FString.replaceAll('class=" "','',data);
	data = FString.replaceAll('class=""','',data);
	data = FString.replaceAll('build',devtools.programID,data);
    data = FString.replaceAll("___application-container___","application-container",data);
    data = FString.replaceAll("box-shadow: 0px 5px 20px 1px transparent","box-shadow:0px 5px 20px 1px rgba(0,0,0,0.9)",data);
    data = FString.replaceAll("border: 1px dotted rgb(255, 0, 0)","border: 1px solid #999",data);
    //alert(data);
    //MessageBox.Show("GEN");
	return data;
}
//alert(OString.CountWord("is", "my name is joko is"));
