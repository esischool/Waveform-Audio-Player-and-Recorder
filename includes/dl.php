<?php 
    header("Content-Type: application/octet-stream");
	header("Content-Transfer-Encoding: Binary"); 
	$title = $_GET['title'];
	header("Content-Disposition: attachment; filename=\"$title\"");
	$path = str_replace(' ', '%20', $_GET['path']);
	header('Content-Length: ' . filesize($path));
	readfile($path);

    exit;
?>