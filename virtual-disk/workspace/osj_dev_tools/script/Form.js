function Form(){
	this.refresh = function(attr, id){
		$("#"+id+"-container #form-name").html(this.text)
		$(attr).css({
			"width":this.width,
			"height":this.height,
			"top":this.positionTop,
			"left":this.positionLeft,
		});
	}
}

Form.prototype.Control;
