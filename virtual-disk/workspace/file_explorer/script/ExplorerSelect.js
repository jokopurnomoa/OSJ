function dirHover(id){
    if(RenamedFileId == id)
        return;
    $("#"+id+" .draft-dir-title").css({
        background : "rgba(47,157,247,0.9)",
        color : "#FFF"
    });
    isInItem = true;
}

function dirOut(id){
    var isSelected = false;
    for(i=0;i<=IdSelectedItem;i++){
        if(ArrSelectedItem[i][0] == id){
            isSelected = true;
            i = IdSelectedItem;
        }
    }
    if(!isSelected){
        $("#"+id+" .draft-dir-title").css({
            background : "#FFF",
            color : "#333"
        });
    }
    isInItem = false;
}

function SelectItem(id, item){
	var markedId = -1;
    for(i=0;i<=IdSelectedItem;i++){
        if(ArrSelectedItem[i][0] == id){
            markedId = i;
            i = IdSelectedItem;
        }
    }
    //MessageBox.show("",markedId);
    if(markedId > -1 && CtrlKeyPressed){
        $("#"+id+" .draft-dir-title").css({
            background : "#FFF",
            color : "#333"
        });
        for(i=markedId;i<IdSelectedItem;i++)
            ArrSelectedItem[i] = ArrSelectedItem[i+1];
        IdSelectedItem--;
    } else {
        if(!CtrlKeyPressed)
            $(".draft-dir-title").css({
                background : "#FFF",
                color : "#333"
            });
        $("#"+id+" .draft-dir-title").css({
            background : "rgba(47,157,247,0.9)",
            color : "#FFF"
        });

        if(IdSelectedItem < 0 || CtrlKeyPressed)
            IdSelectedItem++;
        if(!CtrlKeyPressed)
            IdSelectedItem = 0;
        SelectedItem = dirReplace(item.replace("../../../../",""));
        ArrSelectedItem[IdSelectedItem] = [id, dirReplace(item.replace("../../../../",""))];
        //MessageBox.show(""+CtrlKeyPressed);
        //SelectedItem = dirReplace(item.replace("../../../../",""));
    }
}

function selectAllItem(){
    $(".draft-dir-title").css({
        background : "rgba(47,157,247,0.9)",
        color : "#FFF"
    });
    if(DirResult != null){
        IdSelectedItem = -1;
        for(i=0;i<DirResult.sum;i++){
            var thisDir = DirResult.thisDir.replace("virtual-disk","virtual-disk/");
            thisDir = thisDir.replace("//","/").replace(/ /g,"_-_-_").replace("../../../../","");
            thisValue = (DirResult.value[i].replace(/ /g,"_-_-_"));
            IdSelectedItem++;
            ArrSelectedItem[IdSelectedItem] = [idReplace(DirResult.value[i])+"_rdir", thisDir+thisValue];
        }
    }
}

function unSelectAllItem(){
    $(".draft-dir-title").css({
        background : "none",
        color : "#333"
    });
    ArrSelectedItem = null;
    ArrSelectedItem = [];
    IdSelectedItem = -1;
}

function cutDirValue(val, cut){
    if(val == "")
        return "";
    var idArrVal = 0;
    var arrVal = null;
    arrVal = [];

    arrVal = val.split(" ");
    for(s=0;s<arrVal.length;s++){
        if(arrVal[s].length > 10){
            cutResult = "";
            for(t=0;t<=Math.floor(arrVal[s].length/10);t++)
                cutResult += arrVal[s].substr(t*10,10)+"<br>";
            arrVal[s] = cutResult;
        }
    }

    cutResult = "";
    for(s=0;s<arrVal.length;s++)
        cutResult += " "+arrVal[s];
    if(cutResult.length > 63 && (cut == undefined || cut == true || cut == null))
        cutResult = cutResult.substr(0,47)+"...";
    return cutResult;
}
