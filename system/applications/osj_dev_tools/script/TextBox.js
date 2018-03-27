function TextBox(){
	this.getText = function(text){
		var temp = null;
		for(i=0;i<text.length;i++){
			if(text[i] != '<'){
				if(text[i] != null)
					temp += text[i];	
			} else {
				i = text.length;
			}
		}
		return temp.replace("null","");
	}
	this.refresh = function(attr, id){
		$(attr).remove();
		$("#osj-dev-tools-workspace #"+id+"-container #body-"+id).append('\n<div contenteditable="true" class="'+id+'-textbox control-textbox" onmousedown=getProperties("'+attr+'") '+
		'onmouseup=getProperties("'+attr+'") '+
		'onresizeend=getProperties("'+attr+'") '+
		'id="'+attr.replace("#","")+'">'+this.text+'&nbsp;</div>');
		$("#osj-dev-tools-workspace #"+id+"-container #body-"+id+" "+attr).css({
			"position":"absolute",
			"width":this.width,
			"height":this.height,
			"top":this.positionTop,
			"left":this.positionLeft,
			"border":"1px dotted #F00", 
			"z-index":1,
            "padding":this.paddingTop+"px "+this.paddingRight+"px "+this.paddingBottom+"px "+this.paddingLeft+"px",
            "overflow":"hidden"
		}).mousedown(function(){
			tbAdd.clearSelected();
			$(this).css({"border":"1px dotted #F00", "z-index":1});
		}).resizable({minWidth:20,minHeight:20,handles:'all'})
		.draggable({containment:"#"+id+"-container"});
		document.getSelection().removeAllRanges();
	}
		
}

TextBox.prototype.Control;