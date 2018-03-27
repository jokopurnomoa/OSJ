<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>OS-J</title>
		<link rel="stylesheet" type="text/css" href="system/kernel/style/main.css">
        <link rel="stylesheet" type="text/css" href="system/kernel/style/form.css">
        <link rel="stylesheet" type="text/css" href="system/kernel/style/menu.css">
        <link rel="stylesheet" type="text/css" href="system/kernel/style/message.css">
        <link rel="stylesheet" type="text/css" href="system/kernel/style/jquery-ui.css"> 
        
        <!-- Stylesheet -->
	    <script src="system/kernel/script/jquery/jquery-1.10.2.min.js"></script>
	  	<script src="system/kernel/script/jquery/jquery-ui.js"></script>
	    <script src="system/kernel/script/jquery/jquery.resizecrop-1.0.3.min.js"></script> 
	    <script src="system/kernel/script/jquery/jquery.fullscreen-min.js"></script>
	    
	    <!-- Javascript -->
	    <script src="system/kernel/script/system/System.js"></script>
	    <script src="system/kernel/script/initialized/desktop-icon/DesktopIcon.js"></script>
	    <script src="system/kernel/script/desktop/background/Background.js"></script>
	    <script src="system/kernel/script/desktop/menu/Menu.js"></script>
		<script src="system/kernel/script/desktop/menu/Clock.js"></script>
	    <script src="system/kernel/script/resources/String.js"></script>
	    <script src="system/kernel/script/resources/Diagnostic.js"></script>
	    <script src="system/kernel/script/message/Message.js"></script>
	    <script src="system/kernel/script/handler/import/Import.js"></script>
	    <script src="system/kernel/script/handler/open-application/OpenApplication.js"></script>
	    <script src="system/kernel/script/handler/key-event/KeyEvent.js"></script>
	    <script src="system/kernel/script/handler/focus/Focus.js"></script>
	    <script src="system/kernel/script/handler/minimizer/Minimizer.js"></script>
	    <script src="system/kernel/script/handler/textarea/Caret.js"></script>
	    <script src="system/kernel/script/handler/resizable/Resizable.js"></script>
		<script src="system/kernel/script/handler/open-file/OpenFile.js"></script>
	    <script src="system/kernel/script/handler/search/ApplicationSearch.js"></script>
	    <script src="system/kernel/script/handler/rightclick/RightClick.js"></script>
	    <script src="system/kernel/script/handler/runnable/Runnable.js"></script>
	    <script src="system/kernel/script/handler/power/Power.js"></script>
	    <!-- Kernel Script --
	    <script src="system/kernel/script/resources/events.js"></script>
	    <script src="system/kernel/script/desktop/start-menu/StartMenu.js"></script>
	    <script src="system/kernel/script/handler/onTop/OnTop.js"></script>
	    <script src="system/kernel/script/handler/fullScreen/fullScreen.js"></script>
	    <script src="system/kernel/script/handler/getter/getter.js"></script>
	    -->
	    <?php 
			echo "<script language='javascript'>";
	    	$op = fopen("virtual-disk/workspace/".$_GET['apps_id']."/Run.js", "rt");
			$data_run = fread($op, 100000000);
			echo $data_run = str_replace("system/applications/", "virtual-disk/workspace/", $data_run);
			echo "</script>";
		?>
		<script language="JavaScript">
			var isEmulator = true;			
			var myApps;	
			var appInstall;
			var apps_id = "<?php echo $_GET['apps_id'] ?>";
		</script>
	</head>
<body>
	<div id="desktop-background-base"></div>
    <div id="desktop-background-middle"></div>
    <div id="desktop-background-middle2"></div>
    <div id="desktop-background-top"></div>
	<div id="desktop-application-search">
		<input type="text" id="text-application-search" onkeyup="ApplicationSearch.search()"/>
		<div><span id="application-search-title">Applications</span><span id="application-search-info"></span></div>
		<div id="application-search-container"></div>
	</div>
	
    <!-- Top Menu -->
    <div id="top-menu">
   		<span id="top-menu-item0" class="top-menu-item">Desktop</span>
    </div>
    <span id="clock-top"></span>
    <div id="show-apps-minimized"></div>
    <!-- Desktop Icon Here -->
    <div id="desktop-icon"></div>
    <!-- Program Added Here -->
    <div class="program">
	    <!-- New Program Added Here -->
	    <div class="new-program"></div>
	    <!-- Runnable Program Added Here -->
	    <div class="runnable-program"></div>
    </div>
    <!-- Right Click Menu Here -->
    <div id="right-click-menu"></div>
    <!-- Application Info -->
    <div id="apps-info"></div>
    
    <div id="myContainer" style="position:fixed;z-index:9;"></div>
    <div id="status2" style="position:fixed;z-index:9;left:200px;top:200px;"></div>
    
    <!-- Message -->
    <div class="system-message-container"></div>

    <?php
		include("system/widget/cpu_usage/layout/cpu_usage.html");
		include("system/widget/clock/layout/clock.html");
	?>    
    <script src="system/widget/cpu_usage/Run.js"></script>
    <script src="system/widget/clock/Run.js"></script>
</body>
</html>
