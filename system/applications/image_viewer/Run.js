function close_image_viewer(){
	Minimizer.close("image_viewer");
    setTimeout(function(){
        ImageViewer.currentDir = "";
        ImageViewer.imageArray = null;
        $("#image-viewer-img").css({"visibility":"hidden"});
	},500);
}
	
function minimize_image_viewer(){
    Minimizer.minimize("image_viewer");
}
	
function maximize_image_viewer(){
    Minimizer.maximize("image_viewer");
}
	
function init_image_viewer(){
	$(document).keypress(function(event) {
        //alert(event.keyCode);
        if(LoadAppsID["image_viewer"].onFocus){
            if(event.keyCode == 37){
                ImageViewer.getPrevImage();
            } else if(event.keyCode == 39){
                ImageViewer.getNextImage();
            }
        }
    });
	$("#body-image-viewer").keypress(function(event) {
		//alert(event.which);
		if(event.keyCode == 9) {
			event.preventDefault();
		}
		if(event.ctrlKey && event.which == 97){
		}
		if(event.ctrlKey && event.which == 115){
		}
	}).mouseover(function(){
        $("#image_viewer-container").draggable({disabled:true});
	 }).mouseout(function(){
        $("#image_viewer-container").draggable({disabled:false});
	});
	
	$("#image_viewer-container").mousedown(function(){
		Focus.set("image_viewer");
        setMenu_image_viewer();
		fixSizeImageViewerSpeed = 0;
	})
	.mouseup(function(){
		fixSizeImageViewerSpeed = 300;
	});
    Resizable.set("image_viewer", null, 370, 105);
	
	$("#exit-image-viewer").click(function(){
		close_image_viewer();
		$("#body-image-viewer").val("");
	});
	$("#maximize-image-viewer").click(function(){
		maximize_image_viewer()
	});
	
	$("#minimize-image-viewer").click(function(){
		minimize_image_viewer()
	});
		
	var openedMenu = false;
	fixSize_image_viewer();
}

var fixSizeImageViewerSpeed = 300;

function fixSize_image_viewer(){
	setTimeout(function(){
		if(LoadAppsID["image_viewer"].onFocus){
			$height = parseFloat($("#image_viewer-container").height());
			$width = parseFloat($("#image_viewer-container").width());
			$("#body-image-viewer").css({"height" : $height-108, "width" : $width});
			if(ImageViewer.imgHeight <= ImageViewer.contHeight || ImageViewer.imageZoom <= 100)
            	ImageViewer.setImageSize(ImageViewer.currentDir);
		}
		fixSize_image_viewer();
	},fixSizeImageViewerSpeed);
}

function setMenu_image_viewer(){
	proIdApps = "image_viewer";
	var valMenu = '<span id="top-menu-item0" class="top-menu-item">Image Viewer</span>'+
        '<ul id="top-menu-item0-down" class="top-menu-item-down">'+
            '<li onclick="minimize_image_viewer(proIdApps)">Minimize</li>'+
			'<li onclick="maximize_image_viewer(proIdApps)">Maximize</li>'+
			'<li onclick="close_image_viewer(proIdApps)">Quit Image Viewer</li>'+
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

function register_image_viewer(){
	//alert('');
	$.post("system/applications/image_viewer/layout/image_viewer.html", function(data){
		ApplicationRun[applicationOpened] = data;
		ApplicationRun[applicationOpened] = ApplicationRun[applicationOpened];
		$(".program").html(($(".program").html())+ApplicationRun[applicationOpened]);
		setTimeout(init_image_viewer,100);
		fixSize_image_viewer();
		applicationOpened++;
		$("#body-image-viewer").html("<img id='image-viewer-img'>");
	});	
}


function run_image_viewer(dir, fileName){
    fileName = dirReplace(fileName);
    ImageViewer.currentDir = dir;
    $.post("system/applications/image_viewer/script/get_other_image.php?dir="+dir+"&filename="+fileName)
        .done(function(data){
            ImageViewer.imageArray = $.parseJSON(data);
            ImageViewer.imagePos = ImageViewer.searchPosImage(ImageViewer.currentDir);
            fixSizeImageViewerSpeed = 0;
        });
}

function open_image_viewer(){

}

function ImageViewer(){
    this.imageZoom = 100;
    this.currentDir = "";
    this.imagePos = -1;
    this.imageArray = [];
	this.degress = 0;
	this.scrollTop =  0;
	this.scrollLeft = 0;
	this.posTop = 0;
	this.posLeft = 0;

    this.setImageSize = function(currentDir){
        this.scrollTop = document.getElementById("body-image-viewer").scrollTop;
		this.scrollLeft = document.getElementById("body-image-viewer").scrollLeft;
		
		contHeight = parseFloat($("#body-image-viewer").height());
        contWidth = parseFloat($("#body-image-viewer").width());
        //alert(contWidth+", "+contHeight);
        $("#body-image-viewer").html("<img id='image-viewer-img' src='"+ImageViewer.currentDir+"'>");

        imgHeight = parseFloat($("#body-image-viewer img").height());
        imgWidth = parseFloat($("#body-image-viewer img").width());

        if(imgHeight < contHeight && imgWidth < contWidth){
            $("#body-image-viewer img").css({
                height : imgHeight * (ImageViewer.imageZoom/100),
                width : imgWidth * (ImageViewer.imageZoom/100),
                "margin-top" : (contHeight-imgHeight)/2
            });
        }
        else if(imgHeight == imgWidth){
            $("#body-image-viewer img").css({
                height : contHeight * (ImageViewer.imageZoom/100),
                width : contHeight * (ImageViewer.imageZoom/100),
                "margin-top" : 0
            });
        } else {
            $("#body-image-viewer img").css({
                height : contHeight * (ImageViewer.imageZoom/100),
                width : "auto"
            });
        }

        contHeight = parseFloat($("#body-image-viewer").height());
        contWidth = parseFloat($("#body-image-viewer").width());

        imgHeight = parseFloat($("#body-image-viewer img").height());
        imgWidth = parseFloat($("#body-image-viewer img").width());

        if(contWidth < imgWidth){
            $("#body-image-viewer img").css({
                height : "auto",
                width : contWidth * (ImageViewer.imageZoom/100)
            });
        }
		
		if(contHeight < imgHeight || contWidth < imgWidth){
			$("#body-image-viewer img").css({"margin-top":0});
			$("#body-image-viewer img").draggable();
		} else {
			$("#body-image-viewer").css({overflow:"hidden"});
			$("#body-image-viewer img").css({"margin-top":(contHeight-imgHeight)/2});
		}
			
		$("#zoom-info-image-viewer").html(this.imageZoom+"%");
		$("#image-viewer-img").css({"visibility":"visible", transform : "rotate("+this.degress+"deg)"});
		document.getElementById("body-image-viewer").scrollTop = this.scrollTop;
        document.getElementById("body-image-viewer").scrollLeft = this.scrollLeft;
       	fixSizeImageViewerSpeed = 300;
    }

    this.searchPosImage = function(search){
        var found = false;
        var i = 0;
        var idFound = -1;
        while(!found && i < ImageViewer.imageArray.length){
            if(ImageViewer.imageArray[i] == search){
                found = true;
                idFound = i;
            }
            i++;
        }
        return idFound;
    }

    this.getPrevImage = function(){
        if(ImageViewer.imageArray != null && ImageViewer.imageArray != undefined && ImageViewer.imageArray.length > 0){
			ImageViewer.imageZoom = 100;
			this.degress = 0;
            if(ImageViewer.imagePos > 0)
                ImageViewer.currentDir = ImageViewer.imageArray[--ImageViewer.imagePos];
            else{
                ImageViewer.imagePos = ImageViewer.imageArray.length-1;
                ImageViewer.currentDir = ImageViewer.imageArray[ImageViewer.imagePos];
            }
			ImageViewer.setImageSize(ImageViewer.currentDir);
        }
    }

    this.getNextImage = function(){
		if(ImageViewer.imageArray != null && ImageViewer.imageArray != undefined && ImageViewer.imageArray.length > 0){
			ImageViewer.imageZoom = 100;
        	this.degress = 0;
            if(ImageViewer.imagePos < ImageViewer.imageArray.length-1)
                ImageViewer.currentDir = ImageViewer.imageArray[++ImageViewer.imagePos];
            else{
                ImageViewer.imagePos = 0;
                ImageViewer.currentDir = ImageViewer.imageArray[ImageViewer.imagePos];
            }
			ImageViewer.setImageSize(ImageViewer.currentDir);
        }
    };
	
	this.rotateClockwise = function(){
		if(this.degress < 360)
			this.degress+=90;
		else
			this.degress=90;
		ImageViewer.setImageSize(ImageViewer.currentDir);
	};
	
	this.rotateCounterClockwise = function(){
		if(this.degress > 0)
			this.degress-=90;
		else
			this.degress=270;
		ImageViewer.setImageSize(ImageViewer.currentDir);
	};
	
	this.zoomPlus = function(){
		if(this.imageZoom < 3200)
			if(this.imageZoom == 10)
				this.imageZoom+=10;
			else if(this.imageZoom < 100)
				this.imageZoom+=20;
			else if(this.imageZoom < 800)
				this.imageZoom+=100;
			else
				this.imageZoom*=2;
		ImageViewer.setImageSize(ImageViewer.currentDir);
	};

	this.zoomMin = function(){
		if(this.imageZoom > 10)
			if(this.imageZoom == 20)
				this.imageZoom-=10;
			else if(this.imageZoom <= 100)
				this.imageZoom-=20;
			else if(this.imageZoom <= 800)
				this.imageZoom-=100;
			else
				this.imageZoom/=2;
		ImageViewer.setImageSize(ImageViewer.currentDir);
	};
}

ImageViewer = new ImageViewer();
