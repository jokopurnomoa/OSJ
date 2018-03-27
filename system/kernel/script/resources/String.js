/*
 * FString.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */

function FString(){
    this.i = 0;
    /* Get Last Word of Sentence */
	this.lastWord = function(o){
		return (""+o).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
	};
	
	/** Function count the occurrences of substring in a string;
	 * @param {String} string   Required. The string;
	 * @param {String} subString    Required. The string to search for;
	 * @param {Boolean} allowOverlapping    Optional. Default: false;
	 */

    /* Counting Word in a Sentence */
	this.countWord = function(string, subString, allowOverlapping){
	    string+=""; subString+="";
	    if(subString.length<=0) return 0;
	
	    var n=0, pos=0;
	    var step=(allowOverlapping)?(1):(subString.length);
	
	    while(true){
	        pos=string.indexOf(subString,pos);
	        if(pos>=0){ n++; pos+=step; } else break;
	    }
	    return(n);
	};

    /* Replacing All Word */
	this.replaceAll = function(find, replace, string){
        string = string.replace(find, replace);
		return string.replace(new RegExp(find, 'g'), replace);
	};

    /* Remove Space Char Before and After Word */
    this.trim = function(text){
        text = text.replace(/&nbsp;/g," ");
        return text.trim();
    };

    /* Reverse String */
    this.reverse = function(text){
        result = "";
        for(FString.i=text.length-1;FString.i>=0;FString.i--){
            result += text[FString.i];
        }
        return result;
    };
	
	/* Get Filetype */
	this.getFiletype = function(string){
		if(string[string.length-1] == "/")
			string = string.substr(0, string.length-1);
		val = FString.reverse(string);
		pos = 0;
		for(this.j=0;this.j<string.length;this.j++){
			if(val[this.j] == "."){
				pos = this.j;
				this.j = string.length;
			}			
		}
			
		val = string.substr(string.length-pos,string.length);
		return (val);
	};
	
	/* Get Filename */
	this.getFilename = function(string){
		if(string[string.length-1] == "/")
			string = string.substr(0, string.length-1);
		val = FString.reverse(string);
		pos = val.search("/");
		val = string.substr(string.length-pos,string.length);
		return(val);
	};
	
	/* Remove End Slash */
	this.removeEndSlash = function(string){
		if(string[string.length-1] == "/")
			string = string.substr(0, string.length-1);
		return(string);		
	};
}
FString = new FString();
//alert(FString.getFilename("aaaa/bbb/ccc/ddddd.png/"));