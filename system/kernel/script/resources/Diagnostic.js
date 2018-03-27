/*
 * Diagnostic.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */
/* Diagnostic Time */
function Diagnostic(){
	this.startTime;
	this.endTime;

    /* Starting Time Execution */
	this.startExecution = function(){
		this.StartTime = new Date().getTime();
	};

    /* Get Time Execution */
	this.timeExecution = function(){
		this.EndTime = 0;
		return (new Date().getTime()) - this.StartTime; 
	};
}

Diagnostic = new Diagnostic();
