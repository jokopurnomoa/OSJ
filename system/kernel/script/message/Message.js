/* System Library */

function MessageBox(){
    /* Icon Message */
    this.ICON_INFO = 0;
    this.ICON_WARNING = 1;
    this.ICON_ALERT = 2;
    this.messageCount = 0;

    /* Show Message */
    this.show = function(title, message, icon, button, actionOK, actionCancel, actionExit){
		if(button == "OK_CANCEL"){
			$(".system-message-container").append('<div class="system-message" id="system-message'+MessageBox.messageCount+'">'+
				'<div class="title-outer"><span class="message-exit" onClick="MessageBox.actionButtonExit('+MessageBox.messageCount+', '+actionCancel+')"> </span><span class="title"></span></div>'+
				'<div class="value"></div>'+
				'<button onClick="MessageBox.actionButtonOK('+MessageBox.messageCount+', '+actionOK+')"> OK </button>'+
				'<button onClick="MessageBox.actionButtonCancel('+MessageBox.messageCount+', '+actionCancel+')"> CANCEL </button>'+
			'</div>');
		} else {
			$(".system-message-container").append('<div class="system-message" id="system-message'+MessageBox.messageCount+'">'+
				'<div class="title-outer"><span class="message-exit" onClick="MessageBox.actionButtonExit('+MessageBox.messageCount+', '+actionCancel+')"> </span><span class="title"></span></div>'+
				'<div class="value"></div>'+
				'<button onClick="MessageBox.actionButtonOK('+MessageBox.messageCount+', '+actionOK+')"> OK </button>'+
			'</div>');
		}
        $("#system-message"+MessageBox.messageCount).draggable();

		$("#system-message"+MessageBox.messageCount).css({"visibility":"visible"});
        $("#system-message"+MessageBox.messageCount+" .title").html(title+"");
        $("#system-message"+MessageBox.messageCount+" .value").html(message+"");
		$("#system-message"+MessageBox.messageCount+" button").focus();
        MessageBox.messageCount++;
	};

    /* Action Button OK */
    this.actionButtonOK = function(id, actionOK){
        if(actionOK != null || actionOK != undefined)
            eval(actionOK);
        MessageBox.hide(id);
    };

    /* Action Button Cancel */
    this.actionButtonCancel = function(id, actionCancel){
        if(actionCancel != null || actionCancel != undefined)
            eval(actionCancel);
        MessageBox.hide(id);
    };

    /* Action Button Exit */
    this.actionButtonExit = function(id, actionExit){
        if(actionExit != null || actionExit != undefined)
            eval(actionExit);
        MessageBox.hide(id);
    };


    /* Hide Message */
	this.hide = function(id){
		$("#system-message"+id).remove();
	}
}

MessageBox = new MessageBox();