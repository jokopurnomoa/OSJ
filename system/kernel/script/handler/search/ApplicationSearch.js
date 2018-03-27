/*!
 *
 * ApplicationSearch.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */

function ApplicationSearch(){
    this.isShow = false;
    this.show = function(){
        if(!this.isShow){
            $("#desktop-application-search").css({height:"100%", width:"100%", "z-index":100});
            $("#text-application-search").focus();
            this.isShow = true;
        } else {
            this.hide();
        }
    };

    this.hide = function(){
        $("#desktop-application-search").css({height:"0%", width:"0%", "z-index":-1});
        $("#text-application-search").blur();
        this.isShow = false;
    };

    this.search = function(){
        $("#application-search-container").html("");
        nameSearch = $("#text-application-search").val();

        appsFound = 0;
        for(i=0;i<applicationInstalled;i++){
            if(nameSearch == ""){
                value = '<span class="application-search" onmousedown="ApplicationSearch.open('+i+')">'+
                        '<img src="'+LoadApps[i].image+'">'+
                        '<div class="application-title">'+LoadApps[i].name+'</div>'+
                        '</span>';
                if(i < 32)
                    $("#application-search-container").append(value);
            } else {
                if(LoadApps[i].name.toLowerCase().search(nameSearch.toLowerCase()) > -1 && appsFound < 33){
                    value = '<span class="application-search" onmousedown="ApplicationSearch.open('+i+')">'+
                        '<img src="'+LoadApps[i].image+'">'+
                        '<div class="application-title">'+LoadApps[i].name+'</div>'+
                        '</span>';
                    $("#application-search-container").append(value);
                    appsFound++;
                }
            }
        }

        if(appsFound == 0){
            $("#application-search-info").html("applications not found");
        } else {
            $("#application-search-info").html(appsFound+" applications found");
        }
    };

    this.open = function(id){
        OpenApplication.handleOpen(LoadApps[id].programId);
        ApplicationSearch.hide();
    };
}

ApplicationSearch = new ApplicationSearch();