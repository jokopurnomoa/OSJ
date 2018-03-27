/*
 * Menu.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */
/* Array Top Menu Item Open */
isTopMenuItemOpen = [];
isTopMenuOpen = false;
/* Last Menu Open */
var LastMenuOpen;

function Menu(){
	/* Set Shadow in Top Menu */
	this.topMenuMaximize = function(stat){
		if(stat)
			$("#top-menu").css({"box-shadow":"0 0 0 0 rgba(0,0,0,0)"});
		else
			$("#top-menu").css({"box-shadow":"0 1px 5px 5px rgba(0,0,0,0.5)"});
	};
	
	/* Reset Top Menu */
	this.resetTopMenu = function(){
		$(".top-menu-item").css({"color":"#000", "background":"none"});
		$(".top-menu-item-down").css({"visibility":"hidden"});
		for(i=0;i<10;i++){
			isTopMenuItemOpen[i] = false;
		}
	};
	
	/* Set Menu Item */
	this.setMenuItem = function(idItem){
        $("#top-menu").dblclick(function(){
            document.getSelection().removeAllRanges();
        });
		$("#top-menu-item"+idItem).mousedown(function(){
            if(LastMenuOpen != ("menu-item"+idItem)){
                Menu.resetTopMenu();
			}
			pos = $("#top-menu-item"+idItem).position();
			if(isTopMenuItemOpen[idItem]){
				$(this).css({"color":"#000", "background":"none"});
				$("#top-menu-item"+idItem+"-down").css({"visibility":"hidden"});
				isTopMenuItemOpen[idItem] = false;
			} else {
				$(this).css({"color":"#FFF", "background":"url(system/images/header/gradient-blue.png)"});
				$("#top-menu-item"+idItem+"-down").css({"visibility":"visible", "left" : pos.left-5});
				isTopMenuItemOpen[idItem] = true;
			}
			LastMenuOpen = "menu-item"+idItem;
			document.getSelection().removeAllRanges();
        });

        $("#sub-menu-item"+idItem+"-down").mouseover(function(){
			$("#sub-menu-item"+idItem+"-down ul").css({"visibility" : "visible"});
		}).mouseout(function(){
			$("#sub-menu-item"+idItem+"-down ul").css({"visibility" : "hidden"});
		});
	};
	
	this.showDesktopMenu = function(){
		proIdApps = "desktop";
		var valMenu = '<span id="top-menu-item0" class="top-menu-item">Desktop</span>';
		$("#top-menu").html(valMenu); 
	};

    this.showOtherMenu = function(isExit){
        var isFound = false;
        for(i=topFocus-1;i>=0;i--){
            if(LoadAppsID[ArrayFocus[i]].state == "opened"){
                eval("setMenu_"+ArrayFocus[i]+"()");
                if(isExit)
                    Menu.fixedTopMenu();
                i = 0;
                isFound = true;
            }

        }
        if(!isFound)
            Menu.showDesktopMenu();
    };
	
	/* Show Apps Minimized */
	this.showAppsMinimized = function(stat){
        var left = ($(document).width() / 2) - ($("#show-apps-minimized").width() / 2);
		if(stat) {
			$("#show-apps-minimized").css({"visibility":"visible", "left":left});
		} else {
			$("#show-apps-minimized").css({"visibility":"hidden"});
			appsMinSelected = 0;
		}
	};
	
	/* Highlight Apps Minimized */
	this.highlightAppsMinimized = function(id){
		id--;
		$(".apps-min").css({
			"height" : 90,
			"width" : 90,
			"box-shadow" : "0 0 0 0 rgba(0,0,0,0)",
			"margin-top" : 15
		});
		
		$("#apps-min"+id).css({
			"height" : 110,
			"width" : 110,
			"box-shadow" : "0 3px 5px 0px rgba(0,0,0,0.5)",
			"margin-top" : 0
		});
	};
	
	/* Select Application Minimized */
	this.selectAppsMinimized = function(id){
        id--;
		OpenApplication.handleOpen(ArrayMini[id].programId, "show-apps-min");
		eval("setMenu_"+ArrayMini[id].programId+"()");
	};
	
	/* Fixing Top Menu */
	this.fixedTopMenu = function(){
		for(i=0;i<10;i++){
			isTopMenuItemOpen[i] = false;
			Menu.setMenuItem(i);
		}
	};
}

/* Global Variable Menu */
Menu = new Menu();