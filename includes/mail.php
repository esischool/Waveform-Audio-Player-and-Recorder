<?php

	$to = $_POST['mail'];
	$subject = 'Message from Application';
	$title = $_POST['title'];
	$path = str_replace(' ', '%20', $_POST['path']);
	$message = 'Download link for the requested file named "'. $title .'" has been generated: '. $path . ' Right click to save it to your hard drive.';
	$header = "From: do-not-reply@example.com\r\n"; 
	$header.= "MIME-Version: 1.0\r\n"; 
	$header.= "Content-Type: text/plain; charset=utf-8\r\n"; 
	$header.= "X-Priority: 1\r\n"; 
	
	if(!mail($to, $subject, $message, $header)){
		die('Error sending email!');
	}else{
		die('Email sent!');
	}
?>