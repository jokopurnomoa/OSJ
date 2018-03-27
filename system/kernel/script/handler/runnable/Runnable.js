function Runnable(){
	this.isInstalled = false;
	this.idApps = -1;
	this.proID = "";
	
	this.open = function(dir){
		if(LoadAppsID[FString.getFilename(dir).replace(".dapp","")] != "" && LoadAppsID[FString.getFilename(dir).replace(".dapp","")] != undefined){
			OpenApplication.handleOpen(FString.getFilename(dir).replace(".dapp",""));
			this.isInstalled = true;
			return;
		}
		$.post("system/kernel/file/runnable/RunnableDecode.php?directory=../../../../"+dir+"&dest_dir=../../../applications/runnable/extract/").done(function(data){
			$.post("system/applications/runnable/extract/"+FString.getFilename(dir).replace(".dapp","")+"/json/json.json").done(function(data){
				res = data;
				    $("head").append("<script type='text/javascript' src='system/applications/runnable/extract/"+res.programId+"/Run.js'></script>");
                    idApps = allApps;
                    Runnable.idApps = idApps;
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
					Runnable.proID = proID;
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
                    applicationInstalled++;
					
                    setTimeout(function(){
                        $.post("system/applications/runnable/extract/"+res.programId+"/layout/"+res.programId+".html", function(data){
                            ApplicationRun[applicationOpened] = data;
                            $(".runnable-program").append(ApplicationRun[applicationOpened]);
                            setTimeout("init_"+res.programId+"()",100);
                            applicationOpened++;
							OpenApplication.handleOpen(res.programId);
                        });
                    },1000);
				
            });
		});
	};
	
	this.close = function(programId){
		$.post("system/kernel/file/runnable/RunnableClose.php?program_id="+programId).done(function(data){
			
		});
		if(!this.isInstalled){
			LoadApps[Runnable.idApps] = null;
			LoadAppsID[Runnable.proID] = null;
			$("#"+this.proID+"-container").remove();
			this.isInstalled = false;
		}
	};
}

Runnable = new Runnable();