urlTextFocus = true;function CloseBrowser(){	Minimizer.close("browser");}	function MinimizeBrowser(){    Minimizer.minimize("browser");}	function MaximizeBrowser(){    Minimizer.maximize("browser");}function init_browser(){	Resizable.set("browser");	getUrl();	$("#body-browser-container").mouseover(function(){		$("#browser-container").draggable({disabled : true});	})	.mouseout(function(){		$("#browser-container").draggable({disabled : false});	})	.mousedown(function(){		$(".program-container").css({"z-index":0});		$("#browser-container").css({"z-index":99});		setMenu_browser();		OpenApplication.ResetOnTop();		LoadAppsID["browser"].onTop = true;	});		$("#browser-container").mousedown(function(){        Focus.set("browser");		setMenu_browser();		LoadAppsID["browser"].onTop = true;        fizSizeBrowserSpeed = 0;	}).mouseup(function(){        fizSizeBrowserSpeed = 500;    }).css({		width : $(document).width()	});		var maxi = false;	$("#maximize-browser").click(function(){		MaximizeBrowser("browser");	});		$("#exit-browser").click(function(){		$("#url-text").val("");		$("#body-browser-container").html("");		CloseBrowser("browser");		maxi = false;		openSpeed = 800;	});		$("#minimize-browser").click(function(){		MinimizeBrowser("browser");		openSpeed = 800;	});			$("#url-text").dblclick(function(){		$("#url-text").select();		}).mousedown(function(){        urlTextFocus = true;    });		$("#url-text").keypress(function(event) {		if(event.ctrlKey && (event.which == 97 || event.which == 65)){			$(this).select();		}        if(event.which == 13)            urlTextFocus = false;	});    fixSize_Browser();    setInterval(function(){        if(!urlTextFocus)            $("#url-text").val(document.getElementById("body-browser").contentWindow.location.href.replace("http://",""));    },500);}var fizSizeBrowserSpeed = 500;function fixSize_Browser(){    $("#body-browser-container").css({"height":$("#browser-container").height()-70});    setTimeout(function(){        fixSize_Browser();    },fizSizeBrowserSpeed);}function getUrl(){		val = $("#body-browser-container").html();		setTimeout(function(){			getUrl();		},3000)		}function setMenu_browser(){	proIdApps = "browser";	var valMenu = '<span id="top-menu-item0" class="top-menu-item">Browser</span>'+        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+            '<li onclick="MinimizeBrowser(proIdApps)">Minimize</li>'+			'<li onclick="MaximizeBrowser(proIdApps)">Maximize</li>'+			'<li onclick="CloseBrowser(proIdApps)">Quit Browser</li>'+        '</ul>'+		'<span id="top-menu-item1" class="top-menu-item">File</span>'+		'<ul id="top-menu-item1-down" class="top-menu-item-down">'+            '<li>Save</li>'+			'<li>Save As</li>'+			'<li>Open</li>'+        '</ul>'+		'<span id="top-menu-item2" class="top-menu-item">Help</span>'+		'<ul id="top-menu-item2-down" class="top-menu-item-down">'+            '<li>View Help</li>'+			'<li>About Browser</li>'+        '</ul>';		$("#top-menu").html(valMenu);		Menu.fixedTopMenu();}function searchThisUrl(thisUrl){	if(thisUrl === ""){		thisUrl = $("#url-text").val();		thisUrl = thisUrl.replace("http://www.","");		thisUrl = thisUrl.replace("http:/www.","");		thisUrl = thisUrl.replace("http:www.","");			thisUrl = thisUrl.replace("http://","");		thisUrl = thisUrl.replace("http:/","");		thisUrl = thisUrl.replace("http:","");		$("#url-text").blur().val(thisUrl);		thisUrl = "http://"+thisUrl;		}	//window.open(thisUrl);	$("#body-browser-container").html('<iframe src="'+thisUrl+'" id="body-browser"></iframe>');}function register_browser(){	$.post("system/applications/browser/layout/browser.html", function(data){		ApplicationRun[applicationOpened] = data;		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);		setTimeout(init_browser,100);		applicationOpened++;	});		$("#body-browser-container").html('<iframe src="" id="body-browser"></iframe>');}openSpeed = 800;function run_browser(dir, fileName, appFocus){    fileName = dirReplace(fileName);	setTimeout(function(){		searchThisUrl(dir);        if(appFocus)            $("#url-text").focus();        dir = dir.replace("http://", "");        $("#url-text").val(document.referrer.replace("http://","")+dir);		openSpeed = 0;	},openSpeed);}function open_browser(){}function ControlBrowser(){	window.stop();	LoadCPU();}