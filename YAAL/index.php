<!DOCTYPE HTML>
<html>
	<head>
		<script src="./lib/jquery-1.5.2.min.js"></script>
		<script src="keys.js"></script>
		<script src="script.js"></script>
		<link rel="stylesheet" href="style.css" type="text/css" />
	</head>
	<body onkeydown="doPressButton()">
		<div id="header">
			<h1>Welcome to YAAL</h1>
			<? if (strpos($_SERVER['HTTP_USER_AGENT'], "LG") <= 0 && strpos($_SERVER['HTTP_USER_AGENT'], "SMART-TV") <= 0) : ?>
				<p>
					<span class="bold">1:</span> Just add whatever you want but DON'T use ':' in the name.</br>
					<span class="bold">2:</span> If it is not your link, don't touch it. Thanks!
				</p>
			<? else : ?>
				<p>Visit <a href="<?="http://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];?>"><?="http://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];?></a> from the PC to add new items</p>
			<? endif; ?>
		</div>
		<div id="info">
			<span class="bold">Browser: </span><?=$_SERVER['HTTP_USER_AGENT']?>
		</div>
		<div id="legend">
			<p>
				Buttons: 
				<span class="miniLegend redLegend">Reload</span>
			</p>
		</div>
		<div id="menu"></div>
		<p id="URLToLoad"><span>URL to load: </span><span id="url"></span></p>
		<? if (strpos($_SERVER['HTTP_USER_AGENT'], "LG") <= 0 && strpos($_SERVER['HTTP_USER_AGENT'], "SMART-TV") <= 0) : ?>
			<div id="addElement">
				<form onsubmit="saveElement(); return false;" action="backend.php" method="post">
					<label for="name">Nombre: </label><input type="text" name="name" />
					<label for="url">URL: </label><input type="text" name="url" placeholder="Empty to create a submenu"/>
					<input type="submit" value="Guardar"/>
				</form>
			</div>
		<? endif; ?>
	</body>
</html>