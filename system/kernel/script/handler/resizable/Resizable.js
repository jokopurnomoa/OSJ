/* System Library */

function Resizable(){
	/* Resizable All Application */
	this.position = "fixed";
	
	this.set = function(attr, pos, minWidth, minHeight){
		var minW = 200, minH = 130;
		//alert(minWidth);
		if(pos != undefined && pos != null){
			this.position = pos;
		}
		if(minWidth != undefined && minWidth != null){
			minW = minWidth;
		}
		if(minHeight != undefined && minHeight != null){
			minH = minHeight;
		}
        if(this.position == "fixed"){
			$("#"+attr+"-container").resizable({
				minHeight : minH, 
				minWidth : minW, 
				handles : 'all',
			    start : function() {
					$(this).css("position", "fixed");
				}
			});
		} else {
			$("#"+attr+"-container").resizable({
				minHeight : minH, 
				minWidth : minW, 
				handles : 'all'
			});
		}
	};

    this.setAttr = function(attr, pos, minWidth, minHeight){
        var minW = 200, minH = 130;
        //alert(minWidth);
        if(pos != undefined && pos != null){
            this.position = pos;
        }
        if(minWidth != undefined && minWidth != null){
            minW = minWidth;
        }
        if(minHeight != undefined && minHeight != null){
            minH = minHeight;
        }
        if(this.position == "fixed"){
            $(attr).resizable({
                minHeight : minH,
                minWidth : minW,
                handles : 'all',
                start : function() {
                    $(this).css("position", "fixed");
                }
            });
        } else {
            $(attr).resizable({
                minHeight : minH,
                minWidth : minW,
                handles : 'all'
            });
        }
    };
	
	this.clear = function(attr){
		$("#"+attr+"-container").resizable({disabled:true, handles: 'none'});
	};

    this.clearAttr = function(attr){
        $(attr).resizable({disabled:true, handles: 'none'});
    };
}

Resizable = new Resizable();

