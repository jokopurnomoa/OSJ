function Caret(){
	this.setSelectionRange = function(input, selectionStart, selectionEnd){
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
	
	this.get = function(node){
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
	
	this.setCaretToPos = function(input, pos) {
		this.setSelectionRange(input, pos, pos);
	}
	
	this.setText = function(attr, isi, posInc){
		attr = attr.replace("#","").replace(".","");
		var tmp = $("#"+attr).val();
		var pos = this.get(document.getElementById(attr));
		document.getElementById(attr).value=tmp.substr(0,pos) + isi + tmp.substr(pos, tmp.length);
		document.getElementById(attr).focus();
		this.setCaretToPos(document.getElementById(attr), pos+posInc+1);
	}
}

Caret = new Caret();
