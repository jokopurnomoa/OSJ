function CloseMusicPlayer(){
	Minimizer.close("music_player");
	player.pause(0);
}
	
function MinimizeMusicPlayer(){
	Minimizer.minimize("music_player");
}
	
function MaximizeMusicPlayer(){
	Minimizer.maximize("music_player");
}
	
function init_music_player(){
	$("#body-music-player").keypress(function(event) {
		//alert(event.which);
		if(event.keyCode == 9) {
			event.preventDefault();
		}
		if(event.ctrlKey && event.which == 97){
		}
		if(event.ctrlKey && event.which == 115){
		}
	}).mousedown(function(){
        $("#music_player-container").draggable({disabled:true});
    }).mouseup(function(){
        $("#music_player-container").draggable({disabled:false});
    });
	
	$("#music_player-container").mousedown(function(){
        Focus.set("music_player");
		setMenu_music_player();
		fixSizeMusicPlayerSpeed = 0;
	})
	.mouseup(function(){
		fixSizeMusicPlayerSpeed = 500;
	});
    Resizable.set("music_player", null, 420, 300);
	
	$("#exit-music-player").mousedown(function(){
		CloseMusicPlayer();
		$("#body-music-player").val("");
	});
	$("#maximize-music-player").mousedown(function(){
		MaximizeMusicPlayer()
	});
	
	$("#minimize-music-player").mousedown(function(){
		MinimizeMusicPlayer()
	});
		
	fixSize_music_player();
	var libs_music_player1 = '<link rel="stylesheet" type="text/css" href="system/kernel/style/player-skin/blue.monday/jplayer.blue.monday.css"/>';
	var libs_music_player2 = '<script src="system/applications/music_player/script/player/jquery.jplayer.min.js"></script>';
	var libs_music_player3 = '<script src="system/applications/music_player/script/player/jplayer.playlist.min.js"></script>';
	
	Import.this(libs_music_player1);
	Import.this(libs_music_player2);
	Import.this(libs_music_player3);
	initPlayer();
}

var fixSizeMusicPlayerSpeed = 500;

function fixSize_music_player(){
	setTimeout(function(){
		fixSize_music_player();
	},fixSizeMusicPlayerSpeed);
}

function setMenu_music_player(){
	proIdApps = "music_player";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">Music Player</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onmousedown="MinimizeMusicPlayer(proIdApps)">Minimize</li>'+
			'<li onmousedown="MaximizeMusicPlayer(proIdApps)">Maximize</li>'+
			'<li onmousedown="CloseMusicPlayer(proIdApps)">Quit Music Player</li>'+
        '</ul>'+
		'<span id="top-menu-item1" class="top-menu-item">File</span>'+
		'<ul id="top-menu-item1-down" class="top-menu-item-down">'+
            '<li>Save</li>'+
			'<li>Save As</li>'+
			'<li>Open</li>'+
        '</ul>';
		$("#top-menu").html(valMenu);
		Menu.fixedTopMenu();
}

function register_music_player(){
	$.post("system/applications/music_player/layout/music_player.html", function(data){
		ApplicationRun[applicationOpened] = data;
		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];
		$(".program").append(ApplicationRun[applicationOpened]);
		setTimeout(init_music_player,100);
		fixSize_music_player();
		applicationOpened++;
	});	
}

function open_music_player(){
	
}

var player;
function initPlayer(){
    $("#body-music-player").html("");
    $("#body-music-player").html(playerElement);
    $(document).ready(function(){
        player = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer",
            cssSelectorAncestor: "#jp_container"
        }, ArrayPlayer, {
            swfPath: "js",
            supplied: "oga, mp3",
            wmode: "window",
            smoothPlayBar: true
        });
    });
}

var currentDir = "";
function run_music_player(dir, fileName){
    ArrayPlayer = [{title:fileName.replace(/_-_-_/g," "), mp3:dir.replace(/_-_-_/g," ")}];
    initPlayer();
    setTimeout(function(){
        player.play(0);
    },500);
}

var ArrayPlayer = [];

var playerElement = '<div id="jquery_jplayer" class="jp-jplayer"></div>'+
    '<div id="jp_container" class="jp-audio" style="border: none;">'+
    '<div class="jp-type-playlist">'+
    '<div class="jp-gui jp-interface" style="position: absolute;width: 200px;top:inherit">'+
    '<ul class="jp-controls">'+
    '<li><a href="javascript:;" class="jp-previous" tabindex="1">previous</a></li>'+
    '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>'+
    '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>'+
    '<li><a href="javascript:;" class="jp-next" tabindex="1">next</a></li>'+
    '<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>'+
    '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>'+
    '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>'+
    '<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>'+
    '</ul>'+
    '<div class="jp-progress">'+
    '<div class="jp-seek-bar">'+
    '<div class="jp-play-bar"></div>'+
    '</div>'+
    '</div>'+
    '<div class="jp-volume-bar">'+
    '<div class="jp-volume-bar-value"></div>'+
    '</div>'+
    '<div class="jp-current-time"></div>'+
    '<div class="jp-duration"></div>'+
    '<ul class="jp-toggles">'+
    '<li><a href="javascript:;" class="jp-shuffle" tabindex="1" title="shuffle">shuffle</a></li>'+
    '<li><a href="javascript:;" class="jp-shuffle-off" tabindex="1" title="shuffle off">shuffle off</a></li>'+
    '<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>'+
    '<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>'+
    '</ul>'+
    '</div>'+
    '<div class="playlist-container">'+
    '<div class="jp-playlist">'+
    '<ul style="display: inline">'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '<div class="jp-no-solution">'+
    '<span>Update Required</span>'+
    'To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.'+
    '</div>'+
    '</div>'+
    '</div>';