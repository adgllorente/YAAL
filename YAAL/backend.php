<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	include 'mongoapi.class.php';
	include 'config.php';

	// Connect DB
	$mongo = new MongoAPI($DB_NAME, $DB_KEY);
	$menu = $mongo->menu;

	if ($_POST) {
		$op = $_POST['op'];

		if ($op == 'add') {

			$name = $_POST['name'];
			$url = $_POST['url'];
			$submenu = $_POST['submenu'];
			
			$row = array(
				"name" => $name,
				"url" => $url,
				"submenu" => $submenu
			);

			$menu->insert($row);
		} else if ($op == 'remove') {
			$ret = $menu->get($_POST['idToRemove']);
			$subItems = $menu->find(array('submenu' => $ret['name']));

			for ($i = 0; $i < sizeof($subItems); $i++) {
				$menu->delete($subItems[$i]['_id']['$oid']);
			}

			$menu->delete($_POST['idToRemove']);
		}
	} else {
		$op = $_GET['op'];
		$submenu = $_GET['submenu'];
		if ($op == 'get') {
			$ret = $menu->find(array('submenu' => $submenu));

			echo json_encode($ret);

		} else {
			echo 'Wrong access!';
		}
	}
?>