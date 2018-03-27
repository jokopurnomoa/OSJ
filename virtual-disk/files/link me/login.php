<!DOCTYPE html>
<html  lang="en">
<head>
	<meta charset="utf-8" />
	<title>Link Me</title>
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="library/css/main.css">
    
    <!-- JQUERY -->
    <script src="library/jquery/jquery-1.9.1.min.js"></script>
</head>
<body>
	<div id="header">
    	<div>
        	<center>
	           	<table width="630" border="0">
    	        	<tr>
        	        	<td><span id="header-logo">Link Me</span></td>
                        <td width="85%"></td>
            	    </tr>
            	</table>
            </center>
        </div>
    </div>
    <center>
    <table class="conten-table-login">
    	<tr>
    		<td style="overflow:auto;height:100px;">
    			<div id="contens-login">
                	<h1>Link Me Login</h1>
                    <?php
					$error = false;
					if(isset($_SESSION['login_error']))
						$error = $_SESSION['login_error'];
					if($error)
						echo "<h2 class='error-login'>Maaf, Username dan Password Anda Tidak Sesuai</h2>";
					?>
        			<form name="login" action="library/php/ValidateLogin.php" method="post">
                    	<label>Username</label><br>
                        <input type="text" name="username" class="textfield"><br>
                        <label>Password</label><br>
                        <input type="password" name="password" class="textfield" style="font-size:10px"><br>
                        <input type="submit" value="Login" class="login-button"><input type="reset" value="Batal" class="login-button">
                    </form>
                    <br>
                    <p>
                    	Belum punya akun? <a href="daftar.php" class="link">Daftar disini</a>
                    </p>
    			</div>
    		</td>
    	</tr>
        <tr>
        	<td>
            	<p style="height:150px;"></p>    
            </td>
        </tr>
    </table>
    </center>
    <script src="library/js/Messaging.js"></script>
    <script language="javascript">
		var Interval = 100;	
		function Resize(){
			setTimeout(function(){
				//$("#message-text").val($(document).width() + ":" + $("#contens-login").width());
				if($("#contens-login").width() > $(document).width()-41)
					Interval = 0;
				else
					Interval = 100;
				if($(document).width() <= 635){
					$("#contens-login").width($(document).width()-40);
				} else {
					$("#contens-login").width(600);	
				}
				if($(document).width() <= 350)
					$("#message-text").width($(document).width()-40);
				else
					$("#message-text").width(300);
				Resize();
			},Interval);			
		}
		Resize();
	</script>
</body>
</html>