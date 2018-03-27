function DesktopIcon(){
    this.iconRow;
    this.iconColumn;

    this.initIcon = function(iconApps, isReplace){
        if(iconApps.showIcon == true){
            $("#desktop-icon").append("<div id='"+iconApps.iconId+"' class='desktop-icon' "+
                "onmouseover=DesktopIconMarker.markOver('"+iconApps.iconId+"') "+
                "onmouseout=DesktopIconMarker.markOut('"+iconApps.iconId+"') "+
                "onmousedown=DesktopIconMarker.markDown('"+iconApps.iconId+"') "+
                "ondblclick=OpenApplication.handleOpen('"+iconApps.programId+"')>"+
                "<img src='"+iconApps.image+"'><div class='desktop-icon-name'>"+iconApps.name+"</div></div>");
            $("#"+iconApps.iconId).css({
                "visibility": "visible",
                "top"		: 40 + (iconAdded % 6) * 95,
                "left"		: (Math.floor(iconAdded / 6) * 95) + (Math.floor(iconAdded / 6)*10)
            });
            iconAdded++;
        }
        if(!isReplace){
            applicationInstalled++;
        }
    }

    this.initFunctionIcon = function(newApps){
        if(newApps.size.width < 120)
            newApps.size.width = 120;
        if(newApps.size.height < 70)
            newApps.size.height = 70;

        $("#"+newApps.iconId).draggable({
            disabled : false,
            containment : "#desktop-background-middle2"
        })
        .mousedown(function(){
            $(".desktop-icon").css({"z-index" : 0});
            $("#"+newApps.iconId).css({"z-index" : 1});
        });
        eval("register_"+newApps.programId+"()");
    }
}

DesktopIcon = new DesktopIcon();

function DesktopIconMarker(){
    this.ArrMark = [];
    this.countMark = -1;

    this.markOver = function(id){
        if(DesktopIconMarker.ArrMark[id] == undefined){
            DesktopIconMarker.ArrMark[id] = false;
            DesktopIconMarker.countMark++;
            DesktopIconMarker.ArrMark[DesktopIconMarker.countMark] = id;
        }

        if(!DesktopIconMarker.ArrMark[id]){
            $("#"+id+" .desktop-icon-name").css({"background":"rgba(47,157,247,0.7)","text-shadow":"none"});
        }
    }

    this.markOut = function(id){
        if(!DesktopIconMarker.ArrMark[id]){
            $("#"+id+" .desktop-icon-name").css({"background":"rgba(255,255,255,0)", "color":"#FFF", "text-shadow":"1px 2px 1px rgba(0,0,0,0.8)"});
        }
    }

    this.markDown = function(id){
        if(!CtrlKeyPressed)
            DesktopIconMarker.unmarkAll();
        $("#"+id+" img").css({"opacity":"0.5"});
        $("#"+id+" .desktop-icon-name").css({"background":"rgba(47,157,247,1)","text-shadow":"none"});
        DesktopIconMarker.ArrMark[id] = true;
    }

    this.unmarkAll = function(){
        $(".desktop-icon img").css({"background":"rgba(255,255,255,0)", "opacity":"1"});
        $(".desktop-icon .desktop-icon-name").css({"background":"rgba(255,255,255,0)", "color" : "#FFF", "text-shadow":"1px 2px 1px rgba(0,0,0,0.8)"});
        for(i=0;i<DesktopIconMarker.countMark;i++){
            DesktopIconMarker.ArrMark[DesktopIconMarker.ArrMark[i]] = false;
        }
    }
}

var DesktopIconMarker = new DesktopIconMarker();