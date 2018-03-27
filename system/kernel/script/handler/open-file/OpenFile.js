/*
 * OpenFile.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */

function OpenFile(){
    /* Handle Open From File Explorer */
	this.handleOpenThis = function(dir, fileType, fileName){
		dir = dirReplace(dir);
        $.post("system/kernel/file/OpenFile.php?filetype="+fileType)
        .done(function(data){
			if(data != null && data != undefined && data != ""){
				handleApps = OpenApplication.handleOpen(data);
				eval("run_"+handleApps.programId+"('"+dir+"','"+fileName+"')");
			} else {
				MessageBox.show("Open File","You do not have the application to open this file!");
			}
        });
	}

    /* Handle Open From Application */
    this.handleOpenFromApps = function(apps, dir, fileName){
        setTimeout(function(){
            handleApps = OpenApplication.handleOpen(apps);
            eval("run_"+handleApps.programId+"('"+dir+"','"+fileName+"',true)");
        },400);
    }
}

OpenFile = new OpenFile();
