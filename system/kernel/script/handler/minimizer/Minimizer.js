/*
 * Minimizer.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */

var ArrayMini = [];

function Minimizer(){
	/* Searching Object Of Application */
	this.searchingApplication = function(programId){
		/* Initializing Object */
		var objectApps = null;
		
		for(i=0;i<appsMinimized;i++){
			if(ArrayMini[i].programId == programId)
				objectApps = ArrayMini[i];
		}
		/* Returning Result */
		return objectApps;
	};

	/* Minimize Application */
	this.minimize = function(programId){
		/* Show Other Menu or Desktop Menu */
        Menu.showOtherMenu();
		
		/* Sliding Application To Minimize */
		$("#"+LoadAppsID[programId].programId+"-container").animate({ top: -$(document).width()}, 600);
		
        /* Change Application State */
        LoadAppsID[programId].state = "minimized";
        LoadAppsID[programId].onFocus = false;
    };
	
	/* Maximize Application */
	this.maximize = function(programId){
		/* Initializing Object */
		var objectApps = Minimizer.searchingApplication(programId);

		/* Check is Application Maximize */
		if(!objectApps.maximize){
			/* Set Top Menu Maximize True */
			Menu.topMenuMaximize(true);
			
			/* Resizing The Application */
			$("#"+objectApps.programBody).fadeOut(0);
			$("#"+objectApps.programId+"-container").css({"position":"fixed"})
			.animate({
				height : $(document).height(),
				width : $(document).width(),
				top : 0,
				left : 0
			},200)
			.draggable({disabled:true});	/* Make Draggable Container Off */
			setTimeout(function(){
				$("#"+objectApps.programBody).fadeIn(0);	
			},400);
			
			/* Make Draggable Body Off */
			$("#"+objectApps.programBody).mouseover(function(){
				$("#"+objectApps.programId+"-container").draggable({disabled:true});
			}).mouseout(function(){
				$("#"+objectApps.programId+"-container").draggable({disabled:true});
			});
			
			/* Change Application State */
            LoadAppsID[programId].maximize = true;
        } else {
			/* Set Top Menu Maximize False */
			Menu.topMenuMaximize(false);
			
			/* Resizing The Application */
			$("#"+objectApps.programBody).fadeOut(0);
			$("#"+objectApps.programId+"-container").animate({
				height : objectApps.size.height,
				width : objectApps.size.width,
				top : objectApps.position.posY+25,
				left : objectApps.position.posX
			},200).draggable({disabled:false});	/* Make Container Draggable On */
			
			setTimeout(function(){
				$("#"+objectApps.programBody).fadeIn(10);	
			},400);
			/*
			$("#"+objectApps.programTop).animate({
				width : objectApps.size.width
			});
			$("#"+objectApps.programMenu).animate({
				width : objectApps.size.width
			});
			*/
			
			/* Make Draggable Body On */
			$("#"+objectApps.programBody).mouseover(function(){
				$("#"+objectApps.programId+"-container").draggable({disabled:true});
			}).mouseout(function(){
				$("#"+objectApps.programId+"-container").draggable({disabled:false});
			});
			
			/* Change Application State */
            LoadAppsID[programId].maximize = false;
        }
	}
	
	/* Close Application */
	this.close = function(programId){
        /* Show Other Menu or Desktop Menu */
        Menu.showOtherMenu(true);
        /* Fixing Top menu */
		Menu.fixedTopMenu();
		/* Reset Top Menu */
		Menu.resetTopMenu();
		/* Hide Show Application Minimized */
		Menu.showAppsMinimized(false);
		isshowAppsMinimized = false;
		/* Initializing Object */
		var objectApps = this.searchingApplication(programId);
		
		/* Sliding The Application */
		$("#"+objectApps.programId+"-container").animate({ top:-$(document).width()}, 800);
		
		/* After Sliding */
		setTimeout(function(){
			/* Removing Minimized Application */
			Minimizer.removeMinimized(objectApps.programId);
			
			/* Make Draggable Body On */
			$("#"+objectApps.programBody).mouseover(function(){
				$("#"+objectApps.programId+"-container").draggable({disabled:true});
			}).mouseout(function(){
				$("#"+objectApps.programId+"-container").draggable({disabled:false});
			});
        },600);
        /* Change Application State */
        LoadAppsID[programId].state = "closed";

        /* Set Application On Top false */
        LoadAppsID[programId].onTop = false;

        /* Set Application Focus false */
        LoadAppsID[programId].onFocus = false;
    }
	
	/* Open Application in Minimized */
	this.openMinimized = function(appsMiniId){

        /* Close Apps Minimized Group */
		isshowAppsMinimized = false;
		Menu.showAppsMinimized(false);
		
		/* Set Application Menu */
		eval("setMenu_"+ArrayMini[appsMiniId].programId+"()"); 
		
		/* Checking Application State */
		if(ArrayMini[appsMiniId].state == "minimized"){
			/* Change Application State */
			ArrayMini[appsMiniId].state = "opened";
			
			/* Check is Maximize */
			if(ArrayMini[appsMiniId].maximize){
                /* Set Top Menu Maximize False */
                Menu.topMenuMaximize(true);

                /* Set Application Position */
				$("#"+ArrayMini[appsMiniId].programId+"-container").css({
					"position" : "fixed",
					visibility: "visible", 
					height:$(document).height(),
					width:$(document).width(),
					top : -$(document).height(),
					left : 0
				})
				.draggable({disabled:true})	/* Make It Draggable */
				/* Sliding The Application */
				.animate({
					"top" 		: 0
				},400);
			} else {
				/* Get Position */
				var posTop = $(document).height()*0.5 - ArrayMini[appsMiniId].size.height*0.6;
				var posLeft = $(document).width()*0.5 - ArrayMini[appsMiniId].size.width*0.5;
				
				/* Set Application Position */
				$("#"+ArrayMini[appsMiniId].programId+"-container").css({
					"position" : "fixed",
					visibility : "visible", 
					width : ArrayMini[appsMiniId].size.width+"px", 
					height : ArrayMini[appsMiniId].size.height+"px",
					left : $(document).width()*0.5 - ArrayMini[appsMiniId].size.width*0.5
				})
				.draggable({disabled:false})	/* Make It Draggable */
				/* Sliding The Application */
				.animate({
					"top" 		: posTop+50
				},400);
				
				/* Set Application Changed */
				LoadAppsID[ArrayMini[appsMiniId].programId] = ArrayMini[appsMiniId];
			}
		} else {
			/* Set On Top */
			LoadAppsID[ArrayMini[appsMiniId].programId].onTop = true;
            Focus.set(ArrayMini[appsMiniId].programId);
		}
    }
	
	/* Add Application To Minimized */
	this.addMinimized = function(appsMini){
		/* Add To Array */
		ArrayMini[appsMinimized] = appsMini;
        Focus.add(appsMini.programId);
		
		/* Check is Application Was Opened */
		isOpened = false;
		for(i=0;i<appsMinimized;i++){
			if(appsMini.programId == ProgramIdMinimized[i]){
				if(!isOpened)
					isOpened = true;
			}
		}
		
		/* If Application Not Opened */
		if(!isOpened && appsMinimized < 25){
			/* Add To Array Program ID Minimized */
			ProgramIdMinimized[appsMinimized] = appsMini.programId;

            /* Add To Array Minimized */
			ValueMinimized[appsMinimized] = "<div id='apps-min"+appsMinimized+"' class='apps-min' onclick=OPM('"+appsMinimized+"')><img src='"+appsMini.image+"' class='apps-image-mini'></div>";

            /* Append Apps Minimized To Element */
            if(appsMinimized < 7)
                $("#show-apps-minimized").append(ValueMinimized[appsMinimized]);
			
			/* Changed Application State */	
			appsMini.state = "opened";
			/* Increment Sum Of Apps Minimized */
			appsMinimized++;
		}
	}
	
	/* Removing Minimized Application */
	this.removeMinimized = function(idApps){
        //MessageBox.show("",idApps);
        Focus.remove(idApps);
		var idRemove=-1;
		var findId = false;
		/* Searching ID To Remove */
		for(i=0;i<appsMinimized;i++){
			if(ProgramIdMinimized[i] == idApps){
				idRemove = i;
				findId = true;
			}
		}
		
		/* Removing Application in Minimized */
		for(i=idRemove;i<appsMinimized;i++){
			ProgramIdMinimized[i] = ProgramIdMinimized[i+1];
			ArrayMini[i] = ArrayMini[i+1];				
		}
		/* Decrement Apps Minimized */
		appsMinimized--;
		
		Minimizer.refreshAppsMinimized();
	};

    this.refreshAppsMinimized = function(){
        /* Refresh Show Application Minimized */
        $("#show-apps-minimized").html("");
        if(appsMinimized > 7)
            stopMin = 7;
        else
            stopMin = appsMinimized;
        for(i=0;i<stopMin;i++){
            $("#show-apps-minimized").append("<div id='apps-min"+i+"' class='apps-min' onclick=OPM('"+i+"')><img src='"+ArrayMini[i].image+"' class='apps-image-mini'></div>");
        }
    };
}

function OPM(appsMiniId){
	Minimizer.openMinimized(appsMiniId);
}

Minimizer = new Minimizer();