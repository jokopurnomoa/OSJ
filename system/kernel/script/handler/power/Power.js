function Power(){
    this.isOn = false;

    /* Turning On */
    this.setOn = function () {
        $(document).ready(function () {
            $("#desktop-background-top").fadeTo(100, 0);
        });
        setTimeout(function () {
            $(document).ready(function () {
                $("#desktop-background-top").css({"width": 0, "height": 0});
            });
        }, 100);
        Power.isOn = true;
    };

    /* Turning Off */
    this.setOff = function(){
        $(document).ready(function(){
            $("#desktop-background-top").fadeTo(500,1).css({"width":"100%","height":"100%"});
        });
        Power.isOn = false;
    };
}

Power = new Power();
setTimeout(function () {
	Power.setOn();
},500);