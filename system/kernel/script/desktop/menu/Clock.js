function Clock(){
	this.hours;
	this.minutes;
	this.seconds;
	this.format;
	
	this.show = function(){
        Clock.getTime();
		if(Clock.hours < 12)
			$("#clock-top").html((Clock.hours%12)+":"+Clock.minutes+" AM");
		else{
            if(Clock.hours%12 == 0)
                $("#clock-top").html((Clock.hours%12)+12+":"+Clock.minutes+" PM");
            else
                $("#clock-top").html(Clock.hours%12+":"+Clock.minutes+" PM");
        }
		setInterval(function(){
			Clock.getTime();
            if(Clock.hours < 12)
				$("#clock-top").html(Clock.hours%12+":"+Clock.minutes+" AM");
			else{
                if(Clock.hours%12 == 0)
                    $("#clock-top").html((Clock.hours%12)+12+":"+Clock.minutes+" PM");
                else
                    $("#clock-top").html(Clock.hours%12+":"+Clock.minutes+" PM");
            }
		},1000);
	}
	
	this.getTime = function(){
		time = new Date();
		this.hours = time.getHours();
		if(this.hours < 10)
			this.hours = "0"+this.hours;
		this.minutes = time.getMinutes();
		if(this.minutes < 10)
			this.minutes = "0"+this.minutes;
		this.seconds = time.getSeconds();
	}
}
Clock = new Clock();
Clock.show();

