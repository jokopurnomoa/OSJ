/* Message Library by Joko Purnomo A */

var FirstId = 0; // First Id For Message Loaded
var LastId = 0; // Last Id For Message Loaded
var idMessage = 0; // Id For Message
var enumMessage = 0; // Message Counter
var isLoaded = false; // Process Of Loading Message
var NameNow = ""; // Name Login Now
var UsernameNow = ""; // Username Login Now
var Receiver = ""; // Username Of Receiver Message
var ReceiverName = ""; // Name Of Receiver Message
var ArrIdMessage; // Array Of Id Message Has Loaded
var UserSelected = false; // User Selected For Receive Message

/* Hide Textarea Of Message */
function Start() {
    $("#result-search-user-container").slideUp(0);
    $("#search-user-top").slideUp(0);
}
Start();

/* Get Name Login Now */
function GetName() {
    $.post('library/php/Control.php', {'operation': 'get_name'})
    .done(function(data) {
        NameNow = data;
    });
}
GetName();

/* Get Username Login Now */
function GetUsername() {
    $.post('library/php/Control.php', {'operation': 'get_username'})
    .done(function(data) {
        UsernameNow = data;
    });
}
GetUsername();

function MessageCutter(msg) {
    var MC = new Array();
    var pSpace = new Array();
    var p = 0;
    var m = 0;
    pSpace[p] = 0;
    pos = msg.search(' ');
    if (pos != -1) {
        p++;
        pSpace[p] = pos;
        alert(pSpace[p]);
    }
}
//MessageCutter("ajhadadkadkad kaadad");
/* Loading Message For Selected Receiver */
function LoadMessage(Append) {
    /* Check For Loading All Message Or New Message Only*/
    if (!Append) {
        /* If Loading All Message */
        FirstId = 0;
        LastId = 0;
        idMessage = 0;
        enumMessage = 0;
        ArrIdMessage = new Array();
    }
    /* Else If Loading New Message Only */

    /* Loading Message Here */
    isLoaded = true;
    /* Show Loading Image */
    $("#loading").html("<img src='images/loading/loading.gif' height=50 width=50 alt=loading...>");
    /* Get Message With Ajax */
    $.post('library/php/Control.php', {'operation': 'fetch_all','last_id': LastId,'sender': UsernameNow,'receiver': Receiver})
    .done(function(data) {
		/* Parse JSON Here */
        res = $.parseJSON(data);
        var message = "";
        /* If Count Of Message More Than 0 */
        if (res.sum > 0) {
            message = "<div id='mes" + idMessage + "'>";

            /* Show All Message Result */
            for (i = 0; i < res.sum; i++) {
                /* If This Is My Message */
                if (res.contens[i][0] == NameNow) {
                    /* If This Message Is Readed */
                    if (res.contens[i][4] == 1) {
                        message += "<table><tr><td class=contens-left><img src='images/android1.png' class=message-img id='message-img" + enumMessage + "'></td>" 
                        + "<td><div class=contens-right><div class='message-read opened1' id='msg" + res.contens[i][5] + "'>R</div><b class=message-name>" + res.contens[i][0] + "</b><input type=hidden value='" + res.contens[i][2] + "' id='timehidden" + enumMessage + "'>" 
                        + "<br>" + res.contens[i][1] + "<br><span class=time id='time" + enumMessage + "'>" + res.contens[i][3] + "</span></div></td></tr></table>";
                    } else {
                        /* If This Message Is UnRead */
                        message += "<table><tr><td class=contens-left><img src='images/android1.png' class=message-img id='message-img" + enumMessage + "'></td>" 
                        + "<td><div class=contens-right><div class='message-read opened0' id='msg" + res.contens[i][5] + "'>UR</div><b class=message-name>" + res.contens[i][0] + "</b><input type=hidden value='" + res.contens[i][2] + "' id='timehidden" + enumMessage + "'>" 
                        + "<br>" + res.contens[i][1] + "<br><span class=time id='time" + enumMessage + "'>" + res.contens[i][3] + "</span></div></td></tr></table>";
                    }
                    enumMessage++;
                } else {
                    /* If This Message From Receiver */
                    message += "<table><tr><td class=contens-left2><img src='images/android1.png' class=message-img class=message-img id='message-img" + enumMessage + "'></td>" 
                    + "<td><div class='contens-right2'><b class=message-name>" + res.contens[i][0] + "</b><input type=hidden value='" + res.contens[i][2] + "' id='timehidden" + enumMessage + "'>" 
                    + "<br>" + res.contens[i][1] + "<br><span class=time id='time" + enumMessage + "'>" + res.contens[i][3] + "</span></div></td></tr></table>";
                    enumMessage++;
                }
                /* Input Message Id To Array */
                ArrIdMessage[enumMessage - 1] = res.contens[i][5];
            }
            message += "</div>";
        } else {
            /* If Count Of Message Is 0 */
            message = "Tidak Ada Pesan";
        }

        /* Input For Last Id Message Loaded */
        LastId = res.lastId;
        /* Slide Up For New Message */
        setTimeout(function() {
            $("#mes" + (idMessage - 1)).slideUp(0);
        }, 0);

        /* Slide Down For New Message */
        setTimeout(function() {
            $("#loading").html("");
            $("#mes" + (idMessage - 1)).slideDown(300);
        }, 100);

        /* Check For Message Empty */
        if ($('#contens').html() == "Tidak Ada Pesan")
            $('#contens').html("");

        /* Check For Load All Message Or New Message Only */
        if (Append)
            /* If Load New Message Only */
            $('#contens').html(message + $('#contens').html());
        else {
            /* If Load All Message */
            $('#contens').slideUp(500);
            $('#contens').html(message);
            $('#contens').slideDown(500);
        }

        /* Increment For Id Message */
        idMessage++;
        /* Loading Process Is Done */
        isLoaded = false;		
    })
    /* If Failed Loading Messge*/
    .fail(function() {
        $("#loading").html("");
		$("#notif-send").html("Gagal Memuat Pesan!");
        setTimeout(function() {
            $("#notif-send").html("");
        }, 500);
    });
}

/* Send Message For Selected Receiver */
function SendMessage() {
    /* Get Message Conten From Textarea */
    var conten = nl2tab(nl2br($("#message-text").val(), false));
    /* If Message Conten Not Empty */
    if (conten != "" && conten != "<br>") {
        /* Show Loadig Image */
        $("#loading").html("<img src='images/loading/loading.gif' height=50 width=50 alt=loading...>");
        /* Send Message */
        $.post('library/php/Control.php', {'operation': 'insert',"receiver": Receiver,"conten": conten})
        .done(function(data) {
            /* Loading New Message */
            LoadMessage(true);
            $("#message-text").val("");
        })
        /* If Failed Sending Message */
        .fail(function() {
			$("#loading").html("");
			$("#notif-send").html("Gagal Mengirim Pesan!");
			setTimeout(function() {
				$("#notif-send").html("");
			}, 500);
        });
    } else {
        /* If This Message Conten Empty */
        $("#notif-send").html("Pesan Masih Kosong");
        setTimeout(function() {
            $("#notif-send").html("");
        }, 500);
    }
}

/* Replace Tab */
function nl2tab(str) {
    var jreplace = 0;
    for (i = 0; i < str.length; i++) {
        if (str[i] == '	') {
            jreplace++;
        }
    }
    for (i = 0; i < 5; i++) {
        str.replace('   ', '');
    }
    return str;
}
/* Replace Enter To <br> */
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '' : '%br%';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '');
}

/* Make Responsive Template */
var Interval = 100;
function Resize() {
    setTimeout(function() {
        //$("#message-text").val($(document).width() + ":" + $("#contens").width());
        /* Check For Screen Resolution */
        /* If Screen Resolution Changed */
        if ($("#contens").width() > $(document).width() - 43 || $("#contens-settings").width() > $(document).width() - 43 || $("#contens-login").width() > $(document).width() - 43) {
            /* Increase Interval Speed */
            Interval = 100;
        } else {
            /* Decrease Interval Speed */
            Interval = 500;
        }

        /* If Width Less Than 635px */
        if ($(document).width() <= 635) {
            /* Make All Width To 0px */
            $("#contens").css({"width": 0});
            $("#message-text").css({"width": 0});
            $("#contens-settings").css({"width": 0});
            $("#contens-login").css({"width": 0});
            $("#tb-header").css({"width": 0});

            /* Make Responsive Screen */
            $("#contens").css({"width": ($(document).width() - 45)});
            $("#contens-settings").css({"width": $(document).width() - 45});
            $("#contens-login").css({"width": $(document).width() - 45});
            $("#message-text").css({"width": $(document).width() - 55});
            $("#tb-header").css({"width": $(document).width()});
        } else {
            /* If Width More Than 635px */
            $("#contens").width(600);
            $("#contens-settings").width(600);
            $("#contens-login").width(600);
            $("#message-text").width(585);
            $("#tb-header").width(630);
        }
        /* Recursive Resize Function */
        Resize();
    }, Interval);
}
/* Call Resize Function */
Resize();

/* Check For New Message */
function GetNewMessage() {
    setTimeout(function() {
        /* If Receiver Not Empty */
        if (Receiver != "") {
            $.post('library/php/Control.php', {'operation': 'get_new_message','sender': UsernameNow,'receiver': Receiver,'last_id': LastId})
            .done(function(data) {
                /* New Message More Than 0 */
                if (data > 0) {
                    if (!isLoaded && Receiver != "")
                        LoadMessage(true);
                }
                GetNewMessage();
            });
        } else {
            GetNewMessage();
        }
    }, 3111);
}
GetNewMessage();

function GetStatusMessage() {
    setTimeout(function() {
        //alert(ArrIdMessage);
        if (Receiver != "") {
            $.post('library/php/Control.php', {'operation': 'get_status_message','arr_id_message': ArrIdMessage})
            .done(function(data) {
                //alert("DONE");
				res = $.parseJSON(data);
				//res = data;
                //alert(res);
				//alert(res.status+"___"+enumMessage);
                for (i = 0; i < enumMessage; i++) {
                    if (res.status[i] == 1) {
                        $("#msg" + ArrIdMessage[i]).html("R").css({"background": "rgba(0,255,0,0.9)"});
                    }
                }
                GetStatusMessage();
            });
        } else {
            GetStatusMessage();
        }
    }, 5155);
}

var i = 0;
function UpdateTime() {
    var date = $("#timehidden" + i).val();
    if (Receiver != "") {
        $.post('library/php/NiceTime.php', {'date': date})
        .done(function(data) {
            $("#time" + i).html("");
            $("#time" + i).html(data);
            if (i < enumMessage) {
                i++;
                UpdateTime();
            } else {
                i = 0;
            }
        });
    }
}
setInterval("UpdateTime()", 33333);

function SearchUser() {
    var Keyword = $("#text-search-user").val();
    if (Keyword != "")
        $("#search-user-loading").html("<img src='images/loading/loading.gif' id='search-user-loading'>");
    
    $.post('library/php/Control.php', {'operation': 'search_user','keyword': Keyword})
    .done(function(data) {
        res = $.parseJSON(data);
        //res = data;
        $("#user-search-result").html("");
        html = "";
        for (i = 0; i < res.sum; i++) {
            name = res.name[i];
            for (k = 0; k < 10; k++) {
                name = name.replace(" ", "-_-");
            }
            html += "<div class='user-search-result' onclick=SelectUser('" + res.user[i] + "','" + name + "')><table><tr><td><img src=images/android1.png height=40></td><td>" + res.name[i] + "<br><span>" + res.email[i] + "</span></td></tr></table></div>";
        }
        if (res.sum == 0) {
            $("#user-search-result").html("Tidak Ditemukan");
            $("#search-user-loading").html("");
        } else {
            $("#user-search-result").html(html);
            $("#search-user-loading").html("");
        }
    });
}

function SearchUserTop() {
    var Keyword = $("#search-user-top").val();
    if (Keyword != "")
        $("#search-user-loading2").html("<img src='images/loading/loading.gif' id='search-user-loading'>");
    
    $.post('library/php/Control.php', {'operation': 'search_user','keyword': Keyword})
    .done(function(data) {
        res = $.parseJSON(data);
        //res = data;
        $("#result-search-user-container").html("");
        html = "";
        for (i = 0; i < res.sum; i++) {
            name = res.name[i];
            for (k = 0; k < 10; k++) {
                name = name.replace(" ", "-_-");
            }
            if (i % 2 != 0)
                html += "<div class='user-search-result-main user-search-result-main2' onclick=SelectUser('" + res.user[i] + "','" + name + "')><table><tr><td><img src=images/android1.png height=50></td><td>" + res.name[i] + "<br><span>" + res.email[i] + "</span></td></tr></table></div>";
            else
                html += "<div class='user-search-result-main' onclick=SelectUser('" + res.user[i] + "','" + name + "')><table><tr><td><img src=images/android1.png height=50></td><td>" + res.name[i] + "<br><span>" + res.email[i] + "</span></td></tr></table></div>";
        }
        if (res.sum == 0) {
            $("#result-search-user-container").html("<br>Tidak Ditemukan");
            $("#search-user-loading2").html("");
        } else {
            $("#result-search-user-container").html(html);
            $("#search-user-loading2").html("");
        }
    });
}

function SelectUser(username, name) {
    Receiver = username;
    for (k = 0; k < 10; k++) {
        name = name.replace("-_-", " ");
    }
    ReceiverName = name;
    MessageReady(name);
    $("#top-message-to").html("<h2>Kirim Pesan Ke " + ReceiverName + "</h2>");
    $("#result-search-user-container").slideUp(200);
    $("#search-user-top").slideUp(200);
    setTimeout("LoadMessage(false)", 300);
    HideSearch();
    GetStatusMessage();
    UserSelected = true;
}

/* Navigation Menu Here */
$("#hidden-menu li")
.mousedown(function() {
    var statMenu = $("#menu").css("visibility");
    if (statMenu == 'hidden') {
        $("#menu").css({"visibility": "visible"});
        $("#hidden-menu").css({"background": "#FFF"});
        $("#hidden-menu #img-menu").html("<img src=images/menu/green-triangle.png>");
    } else {
        $("#menu").css({"visibility": "hidden"});
        $("#hidden-menu").css({"background": "#a4c739"});
        $("#hidden-menu #img-menu").html("<img src=images/menu/triangle.png>");
    }
});

/* Send Message To */
function ShowSearch() {
    $("#side-message-min").animate({
        left: -50
    }, 200);
    
    setTimeout(function() {
        $("#send-message").animate({
            left: 0
        }, 300);
        $("#text-search-user").focus();
    }, 200);
}

function HideSearch() {
    $("#send-message").animate({
        left: -202
    }, 300);
    
    setTimeout(function() {
        if (SideMenuShow) {
            $("#side-message-min").animate({
                left: 0
            }, 200);
        }
        $("#message-text").focus();
    }, 300);
}

function ShowNewMessage() {
    $("#side-new-message-min").animate({
        left: -50
    }, 200);
    
    setTimeout(function() {
        $("#side-new-message").animate({
            left: 0
        }, 300);
        $("#text-search-user").focus();
    }, 200);
}

function HideNewMessage() {
    $("#side-new-message").animate({
        left: -202
    }, 300);
    setTimeout(function() {
        $("#side-new-message-min").animate({
            left: 0
        }, 200);
    }, 300);
}

function ShowHome() {
    Receiver = "";
    $("#result-search-user-container").slideUp(200);
    $("#search-user-top").slideUp(200);
    $("#message-container").slideUp(200);
    $("#top-message-to").html("<h1>Link Me Start Menu</h1>");
    $("#search-user-top").slideUp(200);
    $("#start-menu").slideDown(500);
    $("#contens").html("");
}

$("#side-message-min").click(function() {
    ShowSearch();
});
$("#side-new-message-min").click(function() {
    ShowNewMessage();
});
$("#side-home-min").click(function() {
    ShowHome();
});
$("#exit-side-new-message").click(function() {
    HideNewMessage();
});

CoolTitle("#header-logo2", "Sembunyikan Menu");
CoolTitle("#side-home-min", "Kembali Ke Beranda");
CoolTitle("#side-new-message-min", "Pesan Baru");
CoolTitle("#side-message-min", "Kirim Pesan");

$("#exit-send-message").click(function() {
    HideSearch();
});

var SideMenuShow = true;
$("#header-logo2").click(function() {
    if (SideMenuShow) {
        $(".side-menu-min").animate({"left": -50}, 200);
        setTimeout(function() {
            $("#bg-side-menu-min").animate({"left": -50}, 200);
            CoolTitle("#header-logo2", "Tampilkan Menu");
        }, 200);
        SideMenuShow = false;
    } else {
        $("#bg-side-menu-min").animate({"left": 0}, 200);
        setTimeout(function() {
            $(".side-menu-min").animate({"left": 0}, 200);
            CoolTitle("#header-logo2", "Sembunyikan Menu");
        }, 200);
        SideMenuShow = true;
    }
});

function GetNewMessageInfo() {
	$.post('library/php/Control.php', {'operation': 'get_new_message_info','username': UsernameNow})
    .done(function(data) {
		res2 = $.parseJSON(data);
        if (res2.sum > 0) {
            $("#info-new-message").css({"visibility": "visible"}).html(res2.sum);
            $("#new-message-result").html("<div class='user-search-result'>" + res2.user[0] + "</div>");
		} else {
		    $("#info-new-message").css({"visibility": "hidden"}).html("");	
		}
	    setTimeout(function() {
       		GetNewMessageInfo();
    	}, 10444);
    }).fail(function(){
		GetNewMessageInfo();
	})
}
setTimeout(function() {
	GetNewMessageInfo();
}, 500);

function CoolTitle(attr, text, clear) {
    if (!clear) {
        $(attr).mousemove(function(e) {
            $("#cool-title").html(text).css({"top": e.pageY + 10,"left": e.pageX + 10});
            if ($(document).width() < 600 && e.pageX > 100) {
                $("#cool-title").html(text).css({"top": e.pageY + 10,"left": e.pageX - ($("#cool-title").width() + 30)});
            }
        }).mouseout(function(e) {
            $("#cool-title").animate({"top": -100,"left": -200}, 10).html("");
        });
    } else {
        $("#cool-title").animate({"top": -100,"left": -200}, 10).html("");
    }
}

function valert(text) {
    text = text.toString();
    $("#modal").css({"visibility": "visible"});
    $("#valert").html(text)
    .css({"top": "40%","left": "0"})
    .click(function() {
        $("#valert").html("").css({"top": "-100%","left": "-100%"});
        $("#modal").css({"visibility": "hidden"});
        CoolTitle("", "", true);
    });
}

var UsernameValid = false;
function SCH(text) {
    var SCH = new Array();
    SCH = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '[', '{', ']', '}', '\\', '|', ';', ':', "'", '"', ',', ',', '<', '>', '/', '?', ' '];
    ret = true;
    for (i = 0; i < text.length; i++) {
        for (j = 0; j < SCH.length; j++) {
            if (text[i] == SCH[j])
                ret = false;
        }
    }
    
    return ret;
}

function CekUsername() {
    $("#username-info").html("->loading...");
    UsernameValid = true;
    Username = $("#setting-username").val();
    if (Username == '') {
        $("#username-info").html("->Username Masih Kosong!");
        UsernameValid = false;
    } else {
        if (!SCH(Username)) {
            $("#username-info").html("->Username Hanya Boleh (a-z) dan (A-Z) dan (0-9)!");
            UsernameValid = false;
        } else {
            $.post('library/php/Control.php', {'operation': 'username_exist','username': Username})
            .done(function(data) {
                if (data == 1 && UsernameNow != Username) {
                    $("#username-info").html("->Username Sudah Digunakan!");
                    UsernameValid = false;
                } else {
                    $("#username-info").html("<span>->Username Tersedia</span>");
                    UsernameValid = true;
                }
            });
        }
    }
}

var UsernameEdit = false;
CoolTitle("#edit-username", "Edit Username");
$("#edit-username").click(function() {
    Username = $("#setting-username").val();
    if (!UsernameEdit) {
        $("#setting-username").attr("disabled", false).focus();
        $("#edit-username").html("<img src='images/settings/save-icon.png' class='edit-icon'>");
        UsernameEdit = true;
        $("#edit-username img").css({"border": "1px solid #a4c739","border-left": "1px solid rgba(0,0,0,0)"});
        CoolTitle("#edit-username", "Simpan Username");
    } else if (UsernameValid) {
        $.post('library/php/Control.php', {'operation': 'update_username','username_old': UsernameNow,'username_new': Username})
        .done(function(data) {
            UsernameNow = Username;
            $("#setting-username").attr("disabled", true).blur();
            $("#edit-username").html("<img src='images/settings/edit-icon.png' class='edit-icon'>");
            UsernameEdit = false;
            valert("Username Telah Tersimpan!");
            CoolTitle("#edit-username", "Edit Username");
        });
    } else if (UsernameNow == Username) {
        $("#setting-username").attr("disabled", true).blur();
        $("#edit-username").html("<img src='images/settings/edit-icon.png' class='edit-icon'>");
        UsernameEdit = false;
        valert("Username Telah Tersimpan!");
        CoolTitle("#edit-username", "Edit Username");
    }
});

var NameEdit = false;
CoolTitle("#edit-name", "Edit Nama");
$("#edit-name").click(function() {
    Name = $("#setting-name").val();
    if (!NameEdit) {
        $("#setting-name").attr("disabled", false).focus();
        $("#edit-name").html("<img src='images/settings/save-icon.png' class='edit-icon'>");
        NameEdit = true;
        $("#edit-name img").css({"border": "1px solid #a4c739","border-left": "1px solid rgba(0,0,0,0)"});
        CoolTitle("#edit-name", "Simpan Nama");
    } else if (Name != "") {
        $.post('library/php/Control.php', {'operation': 'update_name','username_old': UsernameNow,'name_new': Name})
        .done(function(data) {
            if (data == 1) {
                $("#setting-name").attr("disabled", true).blur();
                $("#edit-name").html("<img src='images/settings/edit-icon.png' class='edit-icon'>");
                NameEdit = false;
                valert("Nama Telah Tersimpan!");
                CoolTitle("#edit-name", "Edit Nama");
            }
        });
    }
});

var EmailEdit = false;
CoolTitle("#edit-email", "Edit Email");
$("#edit-email").click(function() {
    Email = $("#setting-email").val();
    if (!EmailEdit) {
        $("#setting-email").attr("disabled", false).focus();
        $("#edit-email").html("<img src='images/settings/save-icon.png' class='edit-icon'>");
        EmailEdit = true;
        $("#edit-email img").css({"border": "1px solid #a4c739","border-left": "1px solid rgba(0,0,0,0)"});
        CoolTitle("#edit-email", "Simpan Email");
    } else if (Email != "") {
        $.post('library/php/Control.php', {'operation': 'update_email','username_old': UsernameNow,'email_new': Email})
        .done(function(data) {
            if (data == 1) {
                $("#setting-email").attr("disabled", true).blur();
                $("#edit-email").html("<img src='images/settings/edit-icon.png' class='edit-icon'>");
                EmailEdit = false;
                valert("Email Telah Tersimpan!");
                CoolTitle("#edit-email", "Edit Email");
            }
        });
    }
});

var PasswordEdit = false;
TempPassword = "";
CoolTitle("#edit-password", "Edit Password");
$("#edit-password").click(function() {
    Password = $("#setting-password").val();
    if (!PasswordEdit) {
        TempPassword = Password;
        $("#setting-password").attr("disabled", false).focus();
        $("#edit-password").html("<img src='images/settings/save-icon.png' class='edit-icon'>");
        PasswordEdit = true;
        $("#edit-password img").css({"border": "1px solid #a4c739","border-left": "1px solid rgba(0,0,0,0)"});
        CoolTitle("#edit-password", "Simpan Password");
    } else if (Password != "") {
        if (Password != TempPassword) {
            $.post('library/php/Control.php', {'operation': 'update_password','username_old': UsernameNow,'password_new': Password})
            .done(function(data) {
                if (data == 1) {
                    $("#setting-password").attr("disabled", true).blur();
                    $("#edit-password").html("<img src='images/settings/edit-icon.png' class='edit-icon'>");
                    PasswordEdit = false;
                    valert("Password Telah Tersimpan!");
                    CoolTitle("#edit-password", "Edit Password");
                }
            });
        } else {
            $("#setting-password").attr("disabled", true).blur();
            $("#edit-password").html("<img src='images/settings/edit-icon.png' class='edit-icon'>");
            PasswordEdit = false;
            CoolTitle("#edit-password", "Edit Password");
            valert("Tidak Ada Perubahan Password!");
        }
    }
});

CoolTitle("#send-button", "Kirim Pesan");
CoolTitle(".contens-left", "Kirim Pesan");

/* Start Menu */
function MenuMessage(name) {
    Receiver = "";
    $("#start-menu").slideUp(500);
    setTimeout(function() {
        $("#result-search-user-container").slideDown(200);
        $("#search-user-top").slideDown(200);
        $("#top-message-to").html("<h1>Kirim Pesan Ke</h1>");
        $("#search-user-top").css({"visibility": "visible"}).focus();
    }, 500);
}

function MessageReady(name) {
    $("#start-menu").slideUp(500);
    setTimeout(function() {
        if (!UserSelected) {
            $("#message-container").slideUp(0)
            .css({"visibility": "visible","height": "auto"})
            .slideDown(200);
        } else {
            $("#message-container")
            .css({"visibility": "visible","height": "auto"})
            .slideDown(200);
        }
        $("#top-message-to").html("<h2>Kirim Pesan Ke " + name + "</h2>");
    }, 500);
}

$("#menu-message").click(function() {
    MenuMessage("");
});

$(".side-menu-min").mouseout(function() {
//$(".side-menu-min").animate({"left" : -50},200);
});
