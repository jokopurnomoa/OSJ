/*
 * RightClick.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */

/* Disable Right Click */
$(document).ready(function(){
    $(this).bind("contextmenu", function(event) {
        event.preventDefault();
    });
	/*
	$("body").bind("contextmenu", function(event) {
        data = [["Show Desktop", "s()"],["Refresh", "r()"],null,["Close", "c()"],["Exit", "e()"]];
        RightClick.show(data, event);
    });*/
});

function RightClick(){
    this.show = function(data, e){
		/* Set Value */
		$("#right-click-menu").html("");
        for(i=0;i<data.length;i++){
            if(data[i] == null || data[i] == ""){
                $("#right-click-menu").append("<div class='separator'></div>");
            } else {
                $("#right-click-menu").append("<div class='item' onmousedown=\""+data[i][1]+"\">"+data[i][0]+"</div>");
            }
        }
		$("#right-click-menu .item").mousedown(function(){
			RightClick.hide();
		});
		$("#desktop-background-middle2").mousedown(function(){
			RightClick.hide();
		});
		
		/* Set Position */
		height = $("#right-click-menu").height();
		width = $("#right-click-menu").width();
		screenHeight = $(document).height();
		screenWidth = $(document).width();
		posX = e.pageX;
		posY = e.pageY;
		if(posX > (screenWidth-width))
			posX = screenWidth-(width+5);
        if(posY > (screenHeight-height))
			posY = screenHeight-(height+15);
        $("#right-click-menu").css({top:posY, left:posX});
    };

    this.hide = function(){
        $("#right-click-menu").css({top:-1000, left:-1000});
    };
}
var RightClick = new RightClick();

