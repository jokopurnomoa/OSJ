		var applicationInstalled = 0;
		var applicationOpened = 0;
		var iconAdded = 0;
		var ApplicationRun = new Array();
		var nameMinimized = new Array();
		var valueMinimized = new Array();
		var appsMinimized = 0;
		
		function Apps(){
			this.name;
			this.size = new Array;
			this.position = function(){this.posX, this.posY};
			this.image;
			this.iconContainer;
			this.iconId;
			this.programContainer;
			this.programId;
			this.programBody;
			this.programLoader;
			this.programInitialized;
			this.mode;
		}
		
		function Startup(){			
			var loadApps = new Array();
			
			var apps = new Apps();
			loadApps[0] = apps;
			loadApps[0].name = "Notepad";
			loadApps[0].size = [600, 400];
			loadApps[0].image = "system/images/apps/notepad.png";
			loadApps[0].iconContainer = "<img src='"+loadApps[0].image+"' id='desktop-programs-icon3' class='desktop-icon'>";
			loadApps[0].iconId = "desktop-programs-icon3";
			loadApps[0].programContainer = "programs-run-container";
			loadApps[0].programId = "programs-run";
			loadApps[0].programTop = "top-programs-run";
			loadApps[0].programMenu = "menu-notepad";
			loadApps[0].programBody = "body-notepad"+notepadOpened;
			loadApps[0].programLoader = "runNotepad()";
			loadApps[0].programInitialized = "initNotepad()";
			loadApps[0].state = "closed";
			loadApps[0].mode = "textarea";
			
			var apps = new Apps();
			loadApps[1] = apps;
			loadApps[1].name = "Explorer";
			loadApps[1].size = [600, 400];
			loadApps[1].image = "system/apps/file-explorer/images/file-explorer.png";
			loadApps[1].iconContainer = "<img src='"+loadApps[1].image+"' id='desktop-programs-icon2' class='desktop-icon'>";
			loadApps[1].iconId = "desktop-programs-icon2";
			loadApps[1].programContainer = "explorer-container";
			loadApps[1].programId = "programs-explorer";
			loadApps[1].programTop = "top-explorer";
			loadApps[1].programMenu = "menu-explorer";
			loadApps[1].programBody = "body-explorer";
			loadApps[1].programLoader = "runExplorer()";
			loadApps[1].programInitialized = "initExplorer()";
			loadApps[1].state = "closed";
			loadApps[1].mode = "default";
			
			initIcon(loadApps[0].iconId, loadApps[0].iconContainer);
			initIcon(loadApps[1].iconId, loadApps[1].iconContainer);
			
			initFunctionIcon(loadApps[0]);
			initFunctionIcon(loadApps[1]);
			
			fixedMinimized();
		}
		Startup();
