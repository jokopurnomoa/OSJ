/*!
 *
 * Focus.js
 *
 * Copyright 2013 Joko Purnomo A
 * jokopurnomoa@gmail.com
 *
 */
var ArrayFocus = [];
var topFocus = -1;

function Focus(){
	/* Set Focus */
	this.set = function(programId){
        Focus.arrangeIndex(programId);
        LoadAppsID[programId].onFocus = true;
        $("#"+programId+"-container").css({"z-index":99});
	};

    this.arrangeIndex = function(programId){
        var indexFound = -1;

        for(i=0;i<appsMinimized;i++){
            if(ArrayFocus[i] == programId){
                indexFound = i;
            }
            LoadAppsID[ArrayMini[i].programId].onFocus = false;
        }

        if(appsMinimized > 1){
            for(i=indexFound;i<topFocus;i++)
                ArrayFocus[i] = ArrayFocus[i+1];
            ArrayFocus[topFocus] = programId;
            for(i=0;i<topFocus;i++)
                $("#"+ArrayFocus[i]+"-container").css({"z-index":(10+i)});
        }

    };

    this.showStack = function(){
        var val = "";
        for(i=0;i<appsMinimized;i++)
            val += ArrayMini[i].programId + ",";
        MessageBox.show("", val);
    };

    this.add = function(programId){
        topFocus++;
        ArrayFocus[topFocus] = programId;
    };

    this.remove = function(programId){
        var idFound = -1;
        for(i=0;i<=topFocus;i++){
            if(ArrayFocus[i] == programId){
                idFound = i;
                i = topFocus;
            }
        }

        if(idFound > -1)
            for(i=idFound;i<=topFocus;i++){
                ArrayFocus[i] = ArrayFocus[i+1];
            }
        if(topFocus > -1)
            topFocus--;
    };
}

var Focus = new Focus();