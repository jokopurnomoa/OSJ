/* Generated File Run.js in Project color */	function close_color(){	Minimizer.close("color");}	function minimize_color(){	Minimizer.minimize("color");}	function maximize_color(){	Minimizer.maximize("color");}function open_color(){}/* Initialize application */			function init_color(){	$("#body-color").keypress(function(event) {	}).mouseover(function(){        $("#color-container").draggable({disabled:true});    }).mouseout(function(){        $("#color-container").draggable({disabled:false});    });		$("#color-container").mousedown(function(){		Focus.set("color");		setMenu_color();			fixSizecolorSpeed = 0;	})	.mouseup(function(){		fixSizecolorSpeed = 300;	});		/* Make application resizable */	Resizable.set("color");		$("#exit-color").mousedown(function(){		close_color();		$("#body-color").val("");	});	$("#maximize-color").mousedown(function(){		maximize_color();	});		$("#minimize-color").mousedown(function(){		minimize_color();	});			fixSize_color();        color = ['#F00','#FF0', '#0F0', '#0FF', '#00F'];    idColor = 0;    $('#color-button1').click(function(){        $('#color-container').css({background:color[idColor]});        if(idColor < color.length-1)            idColor++;        else            idColor = 0;    });}/* Fix size application */var fixSizecolorSpeed = 300;function fixSize_color(){	setTimeout(function(){		if(LoadAppsID['color'].onFocus){			height = $("#color-container").height();			width = $("#color-container").width();			$("#body-color").css({"height" : height-45, "width" : width-5});		}		fixSize_color();	},fixSizecolorSpeed);}/* Set application menu */function setMenu_color(){	proIdApps = "color";	var valMenu = "<span id=top-menu-item0 class=top-menu-item>Color</span>"+        "<ul id=top-menu-item0-down class=top-menu-item-down>"+            "<li onclick=minimize_color(proIdApps)>Minimize</li>"+			"<li onclick=maximize_color(proIdApps)>Maximize</li>"+			"<li onclick=close_color(proIdApps)>Quit Color</li>"+        "</ul>";		$("#top-menu").html(valMenu);		Menu.fixedTopMenu();}/* Register application */function register_color(){	$.post("system/applications/color/layout/color.html", function(data){		ApplicationRun[applicationOpened] = data;		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);		setTimeout(init_color,100);		fixSize_color();		applicationOpened++;	});	}/* Running application */function run_color(dir, fileName){}