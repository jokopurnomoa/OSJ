/* Generated File Run.js in Project aplikasi2 */	function close_aplikasi2(){	Minimizer.close("aplikasi2");}	function minimize_aplikasi2(){	Minimizer.minimize("aplikasi2");}	function maximize_aplikasi2(){	Minimizer.maximize("aplikasi2");}function open_aplikasi2(){}/* Initialize application */			function init_aplikasi2(){	$("#body-aplikasi2").keypress(function(event) {	}).mouseover(function(){	    $("#aplikasi2-container").draggable({disabled:true});    }).mouseout(function(){        $("#aplikasi2-container").draggable({disabled:false});    });		$("#aplikasi2-container").mousedown(function(){		Focus.set("aplikasi2");		setMenu_aplikasi2();			fixSizeaplikasi2Speed = 0;	})	.mouseup(function(){		fixSizeaplikasi2Speed = 300;	});		/* Make application resizable */	Resizable.set("aplikasi2");		$("#exit-aplikasi2").mousedown(function(){		close_aplikasi2();		$("#body-aplikasi2").val("");	});	$("#maximize-aplikasi2").mousedown(function(){		maximize_aplikasi2()	});		$("#minimize-aplikasi2").mousedown(function(){		minimize_aplikasi2()	});			fixSize_aplikasi2();    main_aplikasi2();}function main_aplikasi2(){    $("#aplikasi2-button1").click(function(){        MessageBox.show("Pesan",$("#aplikasi2-textbox1").html());    });}/* Fix size application */var fixSizeaplikasi2Speed = 300;function fixSize_aplikasi2(){	setTimeout(function(){		if(LoadAppsID["aplikasi2"].onFocus){			height = $("#aplikasi2-container").height();			width = $("#aplikasi2-container").width();			$("#body-aplikasi2").css({"height" : height-45, "width" : width-5});		}		fixSize_aplikasi2();	},fixSizeaplikasi2Speed);}/* Set application menu */function setMenu_aplikasi2(){	proIdApps = "aplikasi2";	var valMenu = "<span id=top-menu-item0 class=top-menu-item>aplikasi2</span>"+        "<ul id=top-menu-item0-down class=top-menu-item-down>"+            "<li onclick=minimize_aplikasi2(proIdApps)>Minimize</li>"+			"<li onclick=maximize_aplikasi2(proIdApps)>Maximize</li>"+			"<li onclick=close_aplikasi2(proIdApps)>Quit aplikasi2</li>"+        "</ul>";		$("#top-menu").html(valMenu);		Menu.fixedTopMenu();}/* Register application */function register_aplikasi2(){	$.post("system/applications/aplikasi2/layout/aplikasi2.html", function(data){		ApplicationRun[applicationOpened] = data;		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);		setTimeout(init_aplikasi2,100);		fixSize_aplikasi2();		applicationOpened++;	});	}/* Running application */function run_aplikasi2(dir, fileName){}