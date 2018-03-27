<?php
	include_once("library/php/Query.php");
	if(isset($_SESSION['LOGIN_USER_NOW'])){
		$Q = new Query();
		$Q->Connection();
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
                                			<a href="#"><?php echo substr($Q->GetName($_SESSION['LOGIN_USER_NOW']),0,20)?></a>
                                    	</li>
                                		<li class="show">
                                			<a href="index.php">Beranda</a>
                                        </li>
                                        <li class="show">
                                			<a href="settings.php">Pengaturan</a>
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
    <table id="conten-table" width="100">
    	<tr>
    		<td>
            	<div id="top-message-to"><h1>Link Me Start Menu</h1></div>
            	<center>
                    <div id="start-menu">
                        <div id="menu-message"><img src="images/menu/message_big.png"><br><span>Kirim Pesan</span></div>
                        <div id="menu-forum"><img src="images/menu/forum.png"><br><span>Masuk Forum</span></div>
                        <div style="height:50px;"></div>
                    </div>
                </center>
    		</td>
    	</tr>
    	<tr>
    		<td>
                <div id="message-container">
                    <form>
                        <textarea id="message-text" placeholder="Tulis Pesan Disini"></textarea><br>
                        <div id="notif-send"></div>
                        <input type="button" id="send-button" value="Kirim" onClick="SendMessage()"><span id="loading"></span>
                    </form>
                </div>
                <div id="search-user-container">
                	<form>
                    	<input type="text" id="search-user-top" placeholder="Cari Pengguna" onKeyUp="SearchUserTop()">
                        <span id="search-user-loading2"></span>
                    </form>
                </div>
                <center>
                    <div id="result-search-user-container">
                    
                    </div>
                </center>
                <div id="contens"></div>
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
	var PageNow = "Home";
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
