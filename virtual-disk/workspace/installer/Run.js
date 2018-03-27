function CloseInstaller(){
	Minimizer.close("installer");
}
	
function MinimizeInstaller(){
    Minimizer.minimize("installer");
}
	
function MaximizeInstaller(){
    Minimizer.maximize("installer");
}

function init_installer(){
	// Prevent From An Event
	$("#installer-container").keypress(function(event) {
		//alert(event.keyCode)
		//alert('prevent');
		if(event.keyCode == 9) {
			event.preventDefault();
			$("#body-installer").val($("#body-installer").val()+"\t");
			$("#body-installer").scrollTop($(document).height());
		}
		if(event.ctrlKey && event.which == 97){
			$("#body-installer").select();
		}
		if(event.ctrlKey && event.which == 115){
			$("#body-installer").blur();
		}
	});

	$("#exit-installer").click(function(){
		CloseInstaller();
		$("#installer-label").html("Stopped");
		$("#installer-cancel").css({visibility : "visible"});
		$("#installer-close").css({visibility : "hidden"});
	});
	$("#installer-cancel").click(function(){
		CloseInstaller();
		$("#installer-label").html("Stopped");
		$("#installer-cancel").css({visibility : "visible"});
		$("#installer-close").css({visibility : "hidden"});
	});
	$("#installer-close").click(function(){
		CloseInstaller();
		$("#installer-label").html("Stopped");
		$("#installer-cancel").css({visibility : "visible"});
		$("#installer-close").css({visibility : "hidden"});
	});

	$("#minimize-installer").click(function(){
		MinimizeInstaller();
	});

	$("#installer-container").mousedown(function(){
        Focus.set("installer");
		setMenu_installer();
    });
}

function setMenu_installer(){
	proIdApps = "installer";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">Application Installer</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onclick="MinimizeInstaller(proIdApps)">Minimize</li>'+
			'<li onclick="CloseInstaller(proIdApps)">Quit Application Installer</li>'+
        '</ul>'+
		'<span id="top-menu-item2" class="top-menu-item">Help</span>'+
		'<ul id="top-menu-item2-down" class="top-menu-item-down">'+
            '<li>View Help</li>'+
			'<li>About Application Installer</li>'+
        '</ul>';
		$("#top-menu").html(valMenu);
		Menu.fixedTopMenu();
}

var fileName = "";
function run_installer(dir, fileName){
    fileName = fileName;
    installer_install(dir, fileName);
}

function installer_install(dir, fileName, isReplace){
    $.post("system/applications/installer/script/CopyApps.php?filename="+fileName+"&destdir=../../&replace="+isReplace).done(function(data){
        if(data == "SUCCESS"){
            progress(0, 40);
            $.post("system/kernel/file/DAPPDecode.php?directory=../../../"+dir+"&dest_dir=../../applications/").done(function(data){
                progress(40,100);
                $.post("system/applications/"+fileName.replace(".dapp","")+"/json/json.json").done(function(data){
                    res = data;
                    isInstalled = false;
                    if(LoadAppsID[res.programId] != null){
                        isInstalled = true;
                    }
                    $("head").append("<script type='text/javascript' src='system/applications/"+res.programId+"/Run.js'></script>");
                    if(isInstalled){
                        for(j=0;j<=allApps;j++){
                            if(LoadApps[j].programId == res.programId){
                                idApps = j;
                                j = allApps;
                            }
                        }
                        $("#"+res.programId+"-container").remove();
                    } else {
                        idApps = allApps;
                    }

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
                    if(!isInstalled){
                        allApps++;
                        applicationInstalled++;
                    }
                    setTimeout(function(){
                        $.post("system/applications/"+res.programId+"/layout/"+res.programId+".html", function(data){
                            ApplicationRun[applicationOpened] = data;
                            $(".new-program").append(ApplicationRun[applicationOpened]);
                            setTimeout("init_"+res.programId+"()",100);
                            applicationOpened++;
                        });
                    },1000);
                });
            });
        } else {
            MessageBox.show("Installer", "Application "+fileName.replace(".dapp","")+" already installed, want you reinstall this application?", null, null, "installer_install('"+dir+"','"+fileName+"','Y')");
        }
    });

    nameInstall = fileName.replace(".dapp","");
    $("#installer-label").html("Installing "+nameInstall+" . . .");

    var progressbar = $( "#progressbar" ),
        progressLabel = $( ".progress-label" );

    progressbar.progressbar({
        value: 0,
        change: function() {
            progressLabel.text( "Progress " + progressbar.progressbar("value") + "%" );
        },
        complete: function() {
            progressLabel.text("Complete!");
            $("#installer-label").html("Installing "+nameInstall+" Complete");
            $("#installer-cancel").css({visibility : "hidden"});
            $("#installer-close").css({visibility : "visible"});
        }
    });

    function progress(val, max) {
        var val = progressbar.progressbar("value") || val;
        progressbar.progressbar("value", val + 1);
        if (val < max-1) {
            setTimeout(function(){
                progress(val + 1, max);
            },0);
        }
    }
}

function register_installer(){
	$.post("system/applications/installer/layout/installer.html", function(data){
		ApplicationRun[applicationOpened] = data;
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_installer,100);
		applicationOpened++;
	});	
}

function open_installer(){

}