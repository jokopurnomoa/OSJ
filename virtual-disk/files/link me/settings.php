<?php
	include_once("library/php/Query.php");
	if(isset($_SESSION['LOGIN_USER_NOW'])){
		$Q = new Query();
		$Q->Connection();
		$data = $Q->SelectAll('tb_user', "WHERE username = '$_SESSION[LOGIN_USER_NOW]'");
		$data = $data[0];
?>
<!DOCTYPE html>
<html  lang="en">
<head>
	<meta charset="utf-8" />
	<title>Link Me</title>
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="library/css/main.css">
    
</head>
<body>
	<div id="header">
    	<div>
        	<center>
	           	<table width="630" border="0" id="tb-header">
    	        	<tr>
        	        	<td><span id="header-logo2">Link Me</span></td>
                        <td></td>
                        <td>
                        	<ul id="hidden-menu">
                            	<li id="img-menu">
                                	<img src="images/menu/triangle.png">
                                </li>
                                <li>
                                	<ul id="menu">
                                    	<li class="show">
                                			<a href=""><?php echo substr($Q->GetName($_SESSION['LOGIN_USER_NOW']),0,20)?></a>
                                    	</li>
                                		<li class="show">
                                			<a href="index.php">Beranda</a>
                                        </li>
                                        <li class="show">
                                			<a href="">Pengaturan</a>
                                        </li>
                                        <li class="show">
                                            <a href="logout.php">Keluar</a>
                                        </li>    
                                	</ul>
                                </li>
							</ul>
                            <?php
								$name = $Q->GetName($_SESSION['LOGIN_USER_NOW']);
								$j = 0;
								for($i=0;$i<strlen($name);$i++){
									if($name[$i] == ' '){
										$j = $i;
										$i = strlen($name);
									}
								}
								if($j==0)
									$j = strlen($name);
							?>
                            <span id="username"><?php echo substr($Q->GetName($_SESSION['LOGIN_USER_NOW']),0,$j)?></span>
                        </td>
            	    </tr>
            	</table>
            </center>
        </div>
    </div>
    <center>
    <table id="conten-table">
    	<tr>
    		<td>
                <div id="contens-settings">
                	<h1>Link Me Settings</h1>
                    <h2>Pengaturan Akun</h2>
                    <form name="akun">
                    	<label>Username  </label><span id="username-info"></span><br>
                        <input type="text" name="username" class="textfield2" value="<?php echo $data['username'] ?>" id="setting-username" disabled onKeyUp="CekUsername()" maxlength="50">
                        <span id="edit-username"><img src='images/settings/edit-icon.png' class='edit-icon'></span><br>
                        <label>Nama</label><br>
                        <input type="text" name="name" class="textfield2" value="<?php echo $data['name'] ?>" disabled maxlength="50" id="setting-name">
                        <span id="edit-name"><img src='images/settings/edit-icon.png' class='edit-icon'></span><br>
                        <label>Email</label><br>
                        <input type="text" name="email" class="textfield2" value="<?php echo $data['email'] ?>" disabled maxlength="50" id="setting-email">
                        <span id="edit-email"><img src='images/settings/edit-icon.png' class='edit-icon'></span><br>
                        <label>Password</label><br>
                        <input type="password" name="password" class="textfield2" value="<?php echo $data['password'] ?>" disabled maxlength="50" id="setting-password">
                        <span id="edit-password"><img src='images/settings/edit-icon.png' class='edit-icon'></span><br>
                    </form>
                    <!--
                    <h2>Pengaturan Desain</h2>
                    <span>Foto Profil</span>
                    -->
                </div>
    		</td>
    	</tr>
    	<tr>
    		<td>
    			
    		</td>
    	</tr>
    </table>
    </center>
    <div id="cool-title"></div>
    <div id="modal"></div>
    <center>
    	<div id="valert"></div>
    </center>
    <div id="bg-side-menu-min"></div>
    <div id="side-home-min" class="side-menu-min">
    	<img src="images/menu/home.png" height="35" width="35">
    </div>
    <div id="side-new-message-min" class="side-menu-min">
    	<img src="images/menu/message.png" height="35" width="35">
        <div id="info-new-message"></div>
    </div>
    <div id="side-new-message">
    	<div id="exit-side-new-message">Tutup</div>        
        <div id="top">Pesan Baru</div>
        <div id="new-message-result"></div>
    </div>
	<div id="side-message-min" class="side-menu-min">
    	<img src="images/menu/chat.png" height="35" width="35">
    </div>
	<div id="send-message">
    	<div id="exit-send-message">Tutup</div>
        <div id="top">Kirim Pesan Ke-</div>
        <div id="search-user"><input type="text" name="search-user" id="text-search-user" placeholder="Cari" onKeyUp="SearchUser()"><span id="search-user-loading"></span></div>
        <div id="user-search-result"></div>
    </div>
    <script language="javascript">
	var PageNow = "Settings";
	</script>
    <!-- JQUERY -->
    <script src="library/jquery/jquery-1.9.1.min.js"></script>
	<script src="library/js/Messaging.js"></script>
</body>
</html>
<?php
	} else {
		include_once("login.php");
	}
?>
