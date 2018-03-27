function OpenApplication(){
	/* Reset On Top */
	this.ResetOnTop = function(){

	}
	
	/* Handle Open Application */
	this.handleOpen = function(programId, mode){
        /* Unmark All Desktop Icon */
        DesktopIconMarker.unmarkAll();
		/* Refresh Open Apps */
		var openApps = null;
		var openApps = new Apps();
		openApps = LoadAppsID[programId];
        /* Reset Top Menu */
		Menu.resetTopMenu();
        /* Initialize Open Applications */
        setTimeout(function(){
            eval("open_"+openApps.programId+"()");
        },400);
        //alert(openApps.maximize);
        if(!openApps.onFocus && openApps.state == "opened"){
            /* If Show Application in Minimized */
			if(mode == "show-apps-min"){
				/* Check is Maximized */
                if(openApps.maximize){
					if(LoadAppsID[ArrayFocus[topFocus]].maximize){
                        /* Set Size And Position */
                        $("#"+openApps.programId+"-container").draggable({disabled : true})
                        .css({
                            "visibility": "visible",
                            "position"	: "fixed",
                            "width"		: $(document).width()+"px",
                            "height"	: $(document).height()+"px",
                            "top" 		: 0,
                            "left" 		: $(document).width(),
                            "z-index" : 99
                        });

                        /* Sliding The Application */
                        $("#"+openApps.programId+"-container").animate({
                            "left" 		: 0
                        },400);
                    }
				}
			}
            /* Set Application Focused */
            Focus.set(programId);
            /* If State is Closed */
		} else if(openApps.state == "closed"){

            if(openApps.maximize){
				/* Set Top Menu Maximize */
				Menu.topMenuMaximize(true);
				/* Set Size And Position */
				$("#"+openApps.programId+"-container").draggable({disabled : true})
				.css({
					"visibility": "visible", 
					"position"	: "fixed",
					"width"		: $(document).width()+"px", 
					"height"	: $(document).height()+"px",
					"top" 		: -($(document).height())+"px",
					"left" 		: 0
				});
				
				/* Sliding The Application */
				$("#"+openApps.programId+"-container").animate({
					"top" 		: 0
				},400);
            } else {
				$("#"+openApps.programId+"-container").draggable({disabled : false})
				.css({
					"visibility": "visible", 
					"position"	: "fixed",
					"width"		: openApps.size.width+"px", 
					"height"	: openApps.size.height+"px",
					"top" 		: -($(document).height())
				});
				
				/* Set Left Position */
				$("#"+openApps.programId+"-container").animate({
					"left" 		: openApps.position.posX
				},0);
				//$(".i-mouse").html(openApps.position.posY);
				
				/* Set Top Position */
				$("#"+openApps.programId+"-container").animate({
					"top" 		: openApps.position.posY+50
				},400);
			}
			/* Add Application To Minimize */
			Minimizer.addMinimized(openApps);

            /* Set Application Focused */
            /* Set Application Focused */
            Focus.set(programId);
            LoadAppsID[programId].state = "opened";
            /* Set Application Menu */
			eval("setMenu_"+openApps.programId+"()");
		/* if State is Minimized */
		} else if(openApps.state == "minimized"){
			/* Searching Application ID */
			var idFind=-1;
			var findId = false;
			for(i=0;i<appsMinimized;i++){
				if(ProgramIdMinimized[i] == openApps.programId){
					idFind = i;
					findId = true;
				}
			}
			
			/* Open Minimized Application */
			Minimizer.openMinimized(idFind);

            /* Set Application Focused */
            Focus.set(programId);
        }
		/* Focus Program Body */
		$("#"+LoadAppsID[programId].programBody).focus();
		/* Returning The Result */
		return openApps;
	}
}

OpenApplication = new OpenApplication();