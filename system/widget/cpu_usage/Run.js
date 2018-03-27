$("#cpu-usage").draggable({disabled:false});
var CPU;
var CPU2;
var CLoad = false;
function LoadCPU(){
    if(!CLoad){
        CLoad = true;
        $.post("system/widget/cpu_usage/get_server_load_win.php")
        .done(function(data){
            CPU = CPU2;
            CPU2 = data;
            $("#cpu-usage #percent").html(data+"%");
            $("#cpu-usage #bar").css({"width" : (0.65*data)+"%"});
            CLoad = false;
            setTimeout("LoadCPU()",1000);
        });
    }
}
setTimeout("LoadCPU()",1000);