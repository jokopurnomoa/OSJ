	var UsernameValid = false;
	function SCH(text){
		var SCH = new Array();
		SCH = ['`','~','!','@','#','$','%','^','&','*','(',')','-','=','+','[','{',']','}','\\','|',';',':',"'",'"',',',',','<','>','/','?',' '];
		ret = true;
		for(i=0;i<text.length;i++){
			for(j=0;j<SCH.length;j++){
				if(text[i] == SCH[j])
					ret = false;
			}
		}
		
		return ret;
	}
	function CekFormDaftar(){
		if(UsernameValid && NameValid && EmailValid && PasswordValid)
			$("#login-button").attr("disabled", false);
		else
			$("#login-button").attr("disabled", true);
	}
	
	function CekUsernameDaftar(){
		$("#username-info").html("->loading...");
		UsernameValid = true;
		Username = $("#username-daftar").val();
		if(Username == ''){
			$("#username-info").html("->Username Masih Kosong!");
			UsernameValid = false;
			CekFormDaftar();
		} else {
			if(!SCH(Username)){
				$("#username-info").html("->Username Hanya Boleh (a-z) dan (A-Z) dan (0-9)!");
				UsernameValid = false;
				CekFormDaftar();
			} else {
				$.post('library/php/Control.php', {'operation' : 'username_exist', 'username' : Username})
				.done(function(data){
					if(data == 1){
						$("#username-info").html("->Username Sudah Digunakan!");
						UsernameValid = false;
					} else {
						$("#username-info").html("<span>->Username Tersedia</span>");
						UsernameValid = true;
					}
					CekFormDaftar();
				});
			}
		}
	}
	
	var NameValid = false;
	function CekName(){
		NameValid = true;
		Name = $("#name-daftar").val();
		if(Name == ''){
			$("#name-info").html("->Nama Masih Kosong!");
			NameValid = false;
		} else {
			$("#name-info").html("");
			NameValid = true;
		}
		CekFormDaftar();
	}

	var EmailValid = false;
	function CekEmail(){
		EmailValid = true;
		Email = $("#email-daftar").val();
		if(Email == ''){
			$("#email-info").html("->Email Masih Kosong!");
			EmailValid = false;
		} else {
			$("#email-info").html("");
			EmailValid = true;
		}
		CekFormDaftar();
	}
	
	var PasswordValid = false;
	function CekPassword(){
		PasswordValid = true;
		Password = $("#password-daftar").val();
		if(Password == ''){
			$("#password-info").html("->Password Masih Kosong!");
			PasswordValid = false;
		} else {
			$("#password-info").html("");
			PasswordValid = true;
		}
		CekFormDaftar();
	}
	CekUsernameDaftar();
	CekName();
	CekEmail();
	CekPassword();
	CekFormDaftar();


	var Interval = 100;	
	function Resize(){
		setTimeout(function(){
			//$("#message-text").val($(document).width() + ":" + $("#contens").width());
			if($("#contens-login").width() > $(document).width()-41)
				Interval = 0;
			else
				Interval = 100;
			
			if($(document).width() <= 635){
				$("#contens-login").width($(document).width()-40);
			} else {
				$("#contens-login").width(600);	
			}
			Resize();
		},Interval);			
	}
	Resize();