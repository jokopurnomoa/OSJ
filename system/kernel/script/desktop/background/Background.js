/*
 * Background.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */
function Background(){
    this.imageDirectory = "system/images/background/The-Lorax-movie-image.jpg";
	
	this.imageBase64 = null;
	
	this.getDataImage = function(){
		$.post("system/kernel/file/GetBackground.php?dir="+this.imageDirectory).done(function(data){
			Background.imageBase64 = data;
			Background.setBackground();
		});
	};
	
    /* Set Desktop Background */
    this.setBackground = function(){
        $(document).ready(function(){
            $("#desktop-background-middle").html("<img src='data:image/png;base64,"+Background.imageBase64+"' id='background-image' width=\"100%\" height=\"100%\">");
            $("#background-image").resizecrop({
                width:$(document).width()+1,
                height:$(document).height()+1,
                vertical:"top"
            });
            $("#desktop-background-middle2").dblclick(function(){
                document.getSelection().removeAllRanges();
            });
			setTimeout(function(){
				Background.setBackground();
			},1500);
        });
    };
}

Background = new Background();
Background.getDataImage();

/* Set Full Screen */
$(document).keydown(function(event){
    if(event.which != 27) {
        //$(document).fullScreen(true);
    } else {
        ApplicationSearch.hide();
    }
});
$(document).ready(function(){
    $("#desktop-background-middle2").mousedown(function(){
        //$(document).fullScreen(true);
        DesktopIconMarker.unmarkAll();
		Menu.showDesktopMenu();
    });
});
