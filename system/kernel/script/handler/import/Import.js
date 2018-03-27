/*
 * Import.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */

function Import(){
	this.this = function(script){
		if(FString.countWord($("head").html(),script) <= 0)
			$("head").append(script);
	};
	
	this.js = function(url){
		javascript = '<script src="'+url+'"></script>';
		if(FString.countWord($("head").html(),javascript) <= 0)
			$("head").append(javascript);
	};

	this.css = function(url){
		style = '<link rel="stylesheet" type="text/css" href="'+url+'"/>';
		if(FString.countWord($("head").html(),style) <= 0)
			$("head").append(style);
	};
}

Import = new Import();