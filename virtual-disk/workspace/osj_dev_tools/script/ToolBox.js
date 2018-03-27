function ToolBoxAdd(){
	this.setStyle = function(){
		$("#"+devtools.programID+"-container").css({
			"border-top-left-radius" : 5,
			"border-top-right-radius" : 5,
			"background" : "#FFF",
			"border" : "1px solid rgba(0,0,0,0.5)"
		});
		/*
		$("#build-container .build-button").css({
			"border-radius":20,
			"border":"1px solid #999",
			"background":"url(system/images/button/aqua.png)",
			"color":"#FFF",
			"float":"none",
			"text-shadow":"1px 1px 2px rgba(0,0,0,0.8)",
			"text-align": "center",
			"font-size": 14,
			"line-height": "25px"
		});*/		
	}
	
	this.countButton = 0;
	this.countLabel = 0;
	this.countTextBox = 0;
    this.button = function(){
        this.countButton = Math.floor((FString.countWord($("#osj-dev-tools-workspace #"+devtools.programID+"-container #body-"+devtools.programID).html(), devtools.programID+"-button")/5));
        this.countButton++;
		$("#osj-dev-tools-workspace #"+devtools.programID+"-container #body-"+devtools.programID)
		.append('\n<div class="'+devtools.programID+'-button control-button" onmousedown=getProperties("#'+devtools.programID+'-button'+this.countButton+'") '+
		'onmouseup=getProperties("#'+devtools.programID+'-button'+this.countButton+'") '+
		'onresizeend=getProperties("#'+devtools.programID+'-button'+this.countButton+'") '+
		'id="'+devtools.programID+'-button'+this.countButton+'">Button'+this.countButton+'</div>');
        toolboxDrag.button(devtools.programID);
		tbresize.button(devtools.programID);
		tbAdd.clearSelected(devtools.programID);
		$("#"+devtools.programID+"-button"+this.countButton).mousedown(function(){
			tbAdd.clearSelected();
			$(this).css({"border":"1px dotted #F00", "z-index":1})
			.resizable({disabled:false, handles:'all'});
		});
        getProperties("#"+devtools.programID+"-button"+this.countButton);
		
		$("#"+devtools.programID+"-container #"+devtools.programID+"-button"+this.countButton).css({
			"position":"absolute",
			"border-radius":20,
			"height":25,
			"width":100,
			"border":"1px dotted #F00",
			"background":"url(system/images/button/aqua.png)",
			"color":"#FFF",
			"float":"none",
			"text-shadow":"1px 1px 2px rgba(0,0,0,0.8)",
			"text-align": "center",
			"font-size": 14,
			"line-height": "25px"
		});

		document.getSelection().removeAllRanges();
	}
	
	this.label = function(){
        this.countLabel = Math.floor((FString.countWord($("#osj-dev-tools-workspace #"+devtools.programID+"-container #body-"+devtools.programID).html(), devtools.programID+"-label")/5));
        this.countLabel++;
		$("#osj-dev-tools-workspace #"+devtools.programID+"-container #body-"+devtools.programID).append('\n<div class="'+devtools.programID+'-label" onmousedown=getProperties("#'+devtools.programID+'-label'+this.countLabel+'") '+
		'onmouseup=getProperties("#'+devtools.programID+'-label'+this.countLabel+'") '+
		'onresizeend=getProperties("#'+devtools.programID+'-label'+this.countLabel+'") '+
		'id="'+devtools.programID+'-label'+this.countLabel+'">Label'+this.countLabel+'</div>');
		toolboxDrag.label(devtools.programID);
		tbresize.label(devtools.programID);
		tbAdd.clearSelected(devtools.programID);
		$("#"+devtools.programID+"-label"+this.countLabel).mousedown(function(){
			tbAdd.clearSelected(devtools.programID);
			$(this).css({"border":"1px dotted #F00", "z-index":1})
			.resizable({disabled:false, handles:'all'});
			ToolBoxSelected = "#"+devtools.programID+"-label"+this.countLabel;
		});
        getProperties("#"+devtools.programID+"-label"+this.countLabel);
        $("#"+devtools.programID+"-container #"+devtools.programID+"-label"+this.countLabel).css({
			"position":"absolute",
			"width":100,
			"height":25,
			"background":"#FFF",
			"border":"1px dotted #F00"
		});
		document.getSelection().removeAllRanges();
	}
	this.textBox = function(){
        this.countTextBox = Math.floor((FString.countWord($("#osj-dev-tools-workspace #"+devtools.programID+"-container #body-"+devtools.programID).html(), devtools.programID+"-textbox")/5));
        this.countTextBox++;
		$("#osj-dev-tools-workspace #"+devtools.programID+"-container #body-"+devtools.programID).append('\n<div contenteditable="true" class="'+devtools.programID+'-textbox control-textbox" onmousedown=getProperties("#'+devtools.programID+'-textbox'+this.countTextBox+'") '+
		'onmouseup=getProperties("#'+devtools.programID+'-textbox'+this.countTextBox+'") '+
		'onresizeend=getProperties("#'+devtools.programID+'-textbox'+this.countTextBox+'") '+
		'id="'+devtools.programID+'-textbox'+this.countTextBox+'">TextBox'+this.countTextBox+'</div>');
		toolboxDrag.textBox(devtools.programID);
        tbresize.textBox(devtools.programID);
		tbAdd.clearSelected();
		$("#"+devtools.programID+"-textbox"+this.countTextBox).mousedown(function(){
			tbAdd.clearSelected();
			$(this).css({"border":"1px dotted #F00", "z-index":1, "overflow":"hidden"})
			.resizable({disabled:false, handles:'all'});
			ToolBoxSelected = "#"+devtools.programID+"-textbox"+this.countTextBox;
		});
        getProperties("#"+devtools.programID+"-textbox"+this.countTextBox);
        $("#"+devtools.programID+"-container #"+devtools.programID+"-textbox"+this.countTextBox).css({
			"position":"absolute",
			"width":100,
			"height":22,
			"background":"#FFF",
			"border":"1px dotted #F00",
			"color":"#000",
            "padding":"3px"
		});
		document.getSelection().removeAllRanges();
	}
}

ToolBoxAdd.prototype.clearSelected = function(){
    id = devtools.programID;
    //MessageBox.Show("",$("."+id+"-button").html());
    $("#"+id+"-container").css({"border":"1px solid #999"});
    $("."+id+"-button").css({"border":"1px solid #999", "z-index":0});
    $("."+id+"-label").css({"border":"1px solid rgba(0,0,0,0)", "z-index":0});
    $("."+id+"-textbox").css({"border":"1px solid #999", "z-index":0});
}
var tbAdd = new ToolBoxAdd();

function ToolBoxDrag(){
	this.form = function(id){
		$("#osj-dev-tools-workspace #"+id+"-container").draggable({containment: '#osj-dev-tools-workspace'});
	}
	
	this.button = function(id){
        $("."+id+"-button").draggable({containment: '#'+id+'-container'});
	}
	
	this.label = function(id){
		$("."+id+"-label").draggable({containment: '#'+id+'-container'});
	}
	
	this.textBox = function(id){
		$("."+id+"-textbox").draggable({containment: '#'+id+'-container'});
	}
}

function ToolBoxResize(){
	this.resize = Resizable;
	this.Clear = function(id){
		this.resize.clearAttr("#osj-dev-tools-workspace #"+id+"-container");
		this.resize.clearAttr("#osj-dev-tools-workspace ."+id+"-button");
		this.resize.clearAttr("#osj-dev-tools-workspace ."+id+"-label");
        this.resize.clearAttr("#osj-dev-tools-workspace ."+id+"-textbox");
	}
	
	this.form = function(id){
		this.resize.setAttr("#osj-dev-tools-workspace #"+id+"-container", "absolute");
	}
	
	this.button = function(id){
		this.resize.setAttr("#osj-dev-tools-workspace ."+id+"-button", "absolute", 20, 20);
	}
	
	this.label = function(id){
		this.resize.setAttr("#osj-dev-tools-workspace ."+id+"-label", "absolute", 20, 20);
	}
	
	this.textBox = function(id){
		this.resize.setAttr("#osj-dev-tools-workspace ."+id+"-label", "absolute", 20, 20);
	}
}

var ToolBoxSelected = "";
function ToolBoxSelect(){
	this.form = function(id){
        $("#osj-dev-tools-workspace").mouseup(function(){
            TBWidth = $(ToolBoxSelected).width();
            TBHeight = $(ToolBoxSelected).height();
        });
        $(".ui-widget-header").mousedown(function(){
            tbAdd.clearSelected();
            $("#"+id+"-container").css({"border":"1px dotted #F00"});
            getProperties("#"+id+"-container");
        }).mouseup(function(){
            getProperties("#"+id+"-container");
        });
    }
}
var tbSelect = new ToolBoxSelect();

function ToolBoxInit(){
    this.form = function(id){
        toolboxDrag.form(id);
        tbresize.form(id);
        tbSelect.form(id);
    }

    this.button = function(id){
        toolboxDrag.button(id);
        tbresize.button(id);
        cButton = Math.floor((FString.countWord($("#osj-dev-tools-workspace #"+id+"-container #body-"+id).html(), id+"-button")/5));
        //MessageBox.Show("",cButton);
        for(i=1;i<=cButton;i++){
            $("#"+id+"-button"+i).mousedown(function(){
                tbAdd.clearSelected();
                $(this).css({"border":"1px dotted #F00", "z-index":1}).resizable({disabled:false, handles:'all'});
            });
        }
    }

    this.label = function(id){
        toolboxDrag.label(id);
        tbresize.label(id);
        cLabel = Math.floor((FString.countWord($("#osj-dev-tools-workspace #"+id+"-container #body-"+id).html(), id+"-label")/5));
        for(i=1;i<=cLabel;i++){
            $("#"+id+"-label"+i).mousedown(function(){
                tbAdd.clearSelected();
                $(this).css({"border":"1px dotted #F00", "z-index":1}).resizable({disabled:false, handles:'all'});
            });
        }
    }

    this.textBox = function(id){
        toolboxDrag.textBox(id);
        tbresize.textBox(id);
        cTextBox = Math.floor((FString.countWord($("#osj-dev-tools-workspace #"+id+"-container #body-"+id).html(), id+"-textbox")/5));
        for(i=1;i<=cTextBox;i++){
            $("#"+id+"-textbox"+i).mousedown(function(){
                tbAdd.clearSelected();
                $(this).css({"border":"1px dotted #F00", "z-index":1}).resizable({disabled:false, handles:'all'});
            });
        }
    }
}

var ctrl;	
function getPropertiesValue(){
	valProperties = "";
	ctrl = null;

    TBS = $(ToolBoxSelected);
    if(FString.countWord(ToolBoxSelected, "container") > 0){
		ctrl = new Form();
		ctrl.text = FString.trim($("#"+devtools.programID+"-container #form-name").html());
	}
	else if(FString.countWord(ToolBoxSelected, "button") > 0){
		ctrl = new Button();
		ctrl.text = TBS.html();
		ctrl.text = FString.trim(ctrl.getText(ctrl.text));
	}
	else if(FString.countWord(ToolBoxSelected, "label") > 0){
		ctrl = new Label();
		ctrl.text = TBS.html();
		ctrl.text = FString.trim(ctrl.getText(ctrl.text));
	}
	else if(FString.countWord(ToolBoxSelected, "textbox") > 0){
		ctrl = new TextBox();
		ctrl.text = TBS.html();
		ctrl.text = FString.trim(ctrl.getText(ctrl.text));
	}
    //alert(ctrl.text);

    ctrl.id = ToolBoxSelected.replace("#","");
    ctrl.width = parseInt(TBS.css("width"));
	ctrl.height = parseInt(TBS.css("height"));
	ctrl.positionTop = parseInt(TBS.css("top"));
	ctrl.positionLeft = parseInt(TBS.css("left"));
    ctrl.paddingTop = parseInt(TBS.css("padding-top"));
    ctrl.paddingRight = parseInt(TBS.css("padding-right"));
    ctrl.paddingBottom = parseInt(TBS.css("padding-bottom"));
    ctrl.paddingLeft = parseInt(TBS.css("padding-left"));


    valProperties += "<tr><td width='50%'><span>ID</span></td><td width='50%'><input class=input id=id type=text value="+ctrl.id+" onblur=SetPropertiesValue()></td></tr>";
    valProperties += "<tr><td width='50%'><span>Width</span></td><td width='50%'><input class=input id=width type=text value="+ctrl.width+" onblur=SetPropertiesValue()></td></tr>";
	valProperties += "<tr><td width='50%'><span>Height</span></td><td width='50%'><input class=input id=height type=text value="+ctrl.height+" onblur=SetPropertiesValue()></td></tr>";
	valProperties += "<tr><td width='50%'><span>Position Top</span></td><td width='50%'><input class=input id=posTop type=text value="+ctrl.positionTop+" onblur=SetPropertiesValue()></td></tr>";
	valProperties += "<tr><td width='50%'><span>Position Left</span></td><td width='50%'><input class=input id=posLeft type=text value="+ctrl.positionLeft+" onblur=SetPropertiesValue()></td></tr>";
	valProperties += "<tr><td width='50%'><span>Text</span></td><td width='50%'><input class=input id=text type=text value='"+ctrl.text+"' onblur=SetPropertiesValue()></td></tr>";

    if(FString.countWord(ToolBoxSelected, "container") <= 0){
    valProperties += "<tr><td width='50%'><span>Padding Top</span></td><td width='50%'><input class=input id=paddingTop type=text value="+ctrl.paddingTop+" onblur=SetPropertiesValue()></td></tr>";
    valProperties += "<tr><td width='50%'><span>Padding Right</span></td><td width='50%'><input class=input id=paddingRight type=text value="+ctrl.paddingRight+" onblur=SetPropertiesValue()></td></tr>";
    valProperties += "<tr><td width='50%'><span>Padding Bottom</span></td><td width='50%'><input class=input id=paddingBottom type=text value="+ctrl.paddingBottom+" onblur=SetPropertiesValue()></td></tr>";
    valProperties += "<tr><td width='50%'><span>Padding Left</span></td><td width='50%'><input class=input id=paddingLeft type=text value="+ctrl.paddingLeft+" onblur=SetPropertiesValue()></td></tr>";
    }

    //$("#osj-dev-tools-workspace #"+id+"-container")
    $("#osj-dev-tools-properties table").html(valProperties);
}

function SetPropertiesValue(){
	ctrl = null;

    prop = "#osj-dev-tools-properties table ";
	if(FString.countWord(ToolBoxSelected, "container") > 0){
		ctrl = new Form();
	}
	else if(FString.countWord(ToolBoxSelected, "button") > 0){
		ctrl = new Button();
	}
	else if(FString.countWord(ToolBoxSelected, "label") > 0){
		ctrl = new Label();
	}
	else if(FString.countWord(ToolBoxSelected, "textbox") > 0){
		ctrl = new TextBox();
	}
	ctrl.width = parseInt($(prop+"#width").val());
	ctrl.height = parseInt($(prop+"#height").val());
	ctrl.positionTop = parseInt($(prop+"#posTop").val());
	ctrl.positionLeft = parseInt($(prop+"#posLeft").val());
	ctrl.text = $(prop+"#text").val();
    ctrl.paddingTop = parseInt($(prop+"#paddingTop").val());
    ctrl.paddingRight = parseInt($(prop+"#paddingRight").val());
    ctrl.paddingBottom = parseInt($(prop+"#paddingBottom").val());
    ctrl.paddingLeft = parseInt($(prop+"#paddingLeft").val());
    ctrl.refresh(ToolBoxSelected, devtools.programID);
}

function getProperties(TBS){
    //MessageBox.Show(proExp.searchTab(devtools.programID+"/layout/"+devtools.programID+".html"));
    proExp.tabEdited("-design"+proExp.searchTab(devtools.programID+"/layout/"+devtools.programID+".html"));
    editor = ace.edit("content-tab"+(selected_tab.replace("-design","")));
    editor.session.setValue((RemoveAtribut(proExp.getValue(selected_tab))).replace(/\n\n/g, "\n"));
    ToolBoxSelected = TBS;
	getPropertiesValue();
	//$(ToolBoxSelected)
}

var toolboxDrag = new ToolBoxDrag();
var tbresize = new ToolBoxResize();
var tbInit = new ToolBoxInit();
//toolboxDrag.form();
//tbresize.form();
//ToolBoxSelect();


