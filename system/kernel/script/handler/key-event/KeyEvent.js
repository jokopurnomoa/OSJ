/*
 * keyEvent.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */
var CtrlKeyPressed = false;
/* Prevent Keyboard Pressed */
var isshowAppsMinimized = false;
var appsMinSelected = 0;

/* Prevent Default */
$(document).keydown(function(event) {
    //MessageBox.show(event.keyCode,"");
    /* Windows Key Pressed */
    if(event.keyCode == 91){
        ApplicationSearch.show();
    }

	/* Refresh Browser */
    if(event.keyCode == 116)
        document.load("");

    /* Prevent Default All Keys Except in InputText, Text, Password, File And Textarea */
    var d = event.srcElement || event.target;
    //MessageBox.Show("",d.readOnly);
    var doPrevent = false;
    if((d.tagName.toUpperCase() === 'INPUT') || (d.tagName.toUpperCase() === 'TEXT') || (d.tagName.toUpperCase() === 'PASSWORD')
        || (d.tagName.toUpperCase() === 'FILE') || (d.tagName.toUpperCase() === 'TEXTAREA') || (d.tagName.toUpperCase() === 'DIV')){
        doPrevent = d.readOnly || d.disabled;
    } else {
        doPrevent = true;
    }

    if(doPrevent)
        event.preventDefault();

    if(event.ctrlKey)
        CtrlKeyPressed = true;

	if(event.which == 13){
		if(isshowAppsMinimized){
			Menu.selectAppsMinimized(appsMinSelected);
			Menu.showAppsMinimized(false);
			isshowAppsMinimized = false;
            if(appsMinimized > 7){
                $("#show-apps-minimized").html("");
                for(i=0;i<7;i++){
                    $("#show-apps-minimized").append(ValueMinimized[i]);
                }
                startMin = 0;
            }
		}
	}
	if(event.altKey || event.which == 18){
		//alert(event.which);
		event.preventDefault();
		if((event.which == 119 || event.which == 87) && (appsMinimized > 0)){
			appsMinSelected++;
				
			if(isshowAppsMinimized && appsMinSelected > appsMinimized){
				Menu.showAppsMinimized(false);
				isshowAppsMinimized = false;
                if(appsMinimized > 7){
                    $("#show-apps-minimized").html("");
                    for(i=0;i<7;i++){
                        $("#show-apps-minimized").append(ValueMinimized[i]);
                    }
                    startMin = 0;
                }
			} else {
                if(appsMinimized > 7){
                    if(appsMinSelected > 7){
                        startMin = appsMinSelected-7;
                        $("#show-apps-minimized").html("");
                        for(i=startMin;i<7+startMin;i++){
                            $("#show-apps-minimized").append(ValueMinimized[i]);
                        }
                    }
                }
				Menu.showAppsMinimized(true);
				isshowAppsMinimized = true;
				Menu.highlightAppsMinimized(appsMinSelected);
				//selectAppsMinimized(appsMinSelected);
			}
		}
		else if((event.which == 113 || event.which == 81) && (appsMinimized > 0) && (appsMinSelected > 0)){
			appsMinSelected--;
				
			if(isshowAppsMinimized && (appsMinSelected > appsMinimized || appsMinSelected < 1)){
				Menu.showAppsMinimized(false);
				isshowAppsMinimized = false;
                if(appsMinimized > 7){
                    $("#show-apps-minimized").html("");
                    for(i=0;i<7;i++){
                        $("#show-apps-minimized").append(ValueMinimized[i]);
                    }
                    startMin = 0;
                }
			} else {
                if(appsMinimized > 7){
                    if(appsMinSelected <= startMin){
                        if(startMin > 0)
                            startMin--;
                        $("#show-apps-minimized").html("");
                        for(i=startMin;i<7+startMin;i++){
                            $("#show-apps-minimized").append(ValueMinimized[i]);
                        }
                    }
                }
                Menu.showAppsMinimized(true);
				isshowAppsMinimized = true;
				Menu.highlightAppsMinimized(appsMinSelected);
			}
		}
	}

    key = event.which;
    arrayKeyPrevent = new Array();
    /* char  =  [a, A, d, D, f, F, g, G, h, H, i, I, j, J, l, L, n, N, o, O, p, P, r, R, s, S, t, T, u, U, w, W] */
    arrayKeyPrevent = [65, 97, 68, 100, 70, 102, 71, 103, 72, 104, 73, 105, 74, 106, 76, 108, 78, 110, 79, 111, 80, 112, 82, 114, 83, 115, 84, 116, 85, 117, 87, 119];
    //alert(arrayKey.length);
    if(event.ctrlKey) {
        for(i=0;i<arrayKeyPrevent.length;i++){
            if(key == arrayKeyPrevent[i]){
                event.preventDefault();
            }
        }
    }
}).keyup(function(event) {
	if(event.altKey){
		if(isshowAppsMinimized){
		}
	}
    if(event.which == 17)
        CtrlKeyPressed = false;
});

/* Disable Select Text */
$(function(){
   	$.extend($.fn.disableTextSelect = function() {
       	return this.each(function(){
           	if($.browser.mozilla){//Firefox
               	$(this).css('MozUserSelect','none');
            }else if($.browser.msie){//IE
   	            $(this).bind('selectstart',function(){return false;});
       	    }else{//Opera, etc.
           	    $(this).mousedown(function(){return false;});
            }
        });
    });
});