var ApplicationRun = [];
var ProgramIdMinimized = [];
var ValueMinimized = [];
var LoadApps = [];
var LoadAppsID = [];
var allApps = 0;
var applicationOpened = 0;
var applicationInstalled = 0;
var iconAdded = 0;
var appsMinimized = 0;
var loadDir = "system/applications";
		
$(document).ready(function(){
	if(isEmulator){
		$.post("virtual-disk/workspace/"+apps_id+"/json/json.json").done(function(data){
			myApps = data;
			myApps[0] = data.programId;
			loadDir = "virtual-disk/workspace";
			appInstall = 1;
			Startup();			
		});
	}
});

function Apps(){
	this.name;
	this.size = function(){this.width; this.height};
	this.position = function(){this.posX; this.posY};
	this.image;
	this.iconContainer;
	this.iconId;
	this.programContainer;
	this.programId;
	this.programBody;
	this.state = "closed";
	this.maximize;
	this.mode;
	this.showIcon;
	this.onFocus = false;
}

function Startup(){
	function loadAllApplication(idApps, idLoad){
		$(document).ready(function(){
			$.post(loadDir+"/"+myApps[idLoad]+"/json/json.json")
			.done(function(data){
				if(data != null){
					res = data;
					var apps = new Apps();
					LoadApps[idApps] = apps;
					LoadApps[idApps].name = res.name;
					LoadApps[idApps].size.width = parseFloat(res.width);
					LoadApps[idApps].size.height = parseFloat(res.height);
					LoadApps[idApps].position.posX = parseFloat(res.posX);
					LoadApps[idApps].position.posY = parseFloat(res.posY);
					LoadApps[idApps].image = res.image;
					LoadApps[idApps].iconId = res.iconId;
					LoadApps[idApps].programContainer = res.programContainer;
					LoadApps[idApps].programId = res.programId.toLowerCase();
					LoadApps[idApps].programTop = res.programTop;
					LoadApps[idApps].programMenu = res.programMenu;
					LoadApps[idApps].programBody = res.programBody;
					LoadApps[idApps].maximize = res.maximize;
					LoadApps[idApps].showIcon = res.showIcon;
					
					var proID = res.programId;
					var apps = new Apps();
					LoadAppsID[proID] = apps;
					LoadAppsID[proID].name = res.name;
					LoadAppsID[proID].size.width = parseFloat(res.width);
					LoadAppsID[proID].size.height = parseFloat(res.height);
					LoadAppsID[proID].position.posX = parseFloat(res.posX);
					LoadAppsID[proID].position.posY = parseFloat(res.posY);
					LoadAppsID[proID].image = res.image;
					LoadAppsID[proID].iconId = res.iconId;
					LoadAppsID[proID].programContainer = res.programContainer;
					LoadAppsID[proID].programId = res.programId.toLowerCase();
					LoadAppsID[proID].programTop = res.programTop;
					LoadAppsID[proID].programMenu = res.programMenu;
					LoadAppsID[proID].programBody = res.programBody;
					LoadAppsID[proID].maximize = res.maximize;
					LoadAppsID[proID].showIcon = res.showIcon;
					
					allApps++;
					if(idLoad < appInstall-1){
						idApps++;
						idLoad++;
						loadAllApplication(idApps, idLoad);
					} else {
						loadAllIcon();
					}
				} else {
					if(idLoad < appInstall-1){
						idLoad++;
						setTimeout(function(){
						loadAllApplication(idApps, idLoad);
						},100);
					} else {
						loadAllIcon();
					}
				}
			})
			.fail(function(data){
				if(idLoad < appInstall-1){
					idLoad++;
					loadAllApplication(idApps, idLoad);
				} else {
					loadAllIcon();
				}
			});
		});
	}
	setTimeout(function(){
		loadAllApplication(0, 0);
	},100);
	
	function loadAllIcon(){
		setTimeout(function(){	
			for(i=0;i<allApps;i++)
				DesktopIcon.initIcon(LoadApps[i]);
			
			for(i=0;i<allApps;i++)
				DesktopIcon.initFunctionIcon(LoadApps[i]);
			
			setTimeout(function(){
				if(isEmulator)
					OpenApplication.handleOpen(apps_id);
			},500);
		},100);
	}
}
