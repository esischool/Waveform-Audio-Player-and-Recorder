<?php
	if(isset($_POST['action']) && !empty($_POST['action'])) {
	    $action = $_POST['action'];
	    switch($action) {
	        case 'awp_write_peaks' : awp_write_peaks();break;
	        case 'awp_read_peaks' : awp_read_peaks();break;
	        default: break;
	    }
	}
	
	function awp_write_peaks(){

		if(isset($_POST['path']) && !empty($_POST['path'])){
			$dir = $_POST['path'] . '/';
		}else{
		    $dir = dirname(__FILE__) . '/';   
		}
		$id = $dir . $_POST['id'];
	  
	    if ( !file_exists( $id . '.peaks' ) ) {
	        $peaks = $_POST['peaks'];
	        file_put_contents( $id . '.peaks', $peaks );

	        if(file_exists($id . '.mp3'))unlink($id . '.mp3');//from remote download
	        
	        exit('write_peaks success');
	    }else{
	    	exit('write_peaks exist');
	    }
	   
	}

	function awp_read_peaks() {
	    	
	    if(!isset($_POST['id']) || empty($_POST['id'])){
	    	echo json_encode('');
	    	exit;
	    }

	    if(isset($_POST['path']) && !empty($_POST['path'])){
			$dir = $_POST['path'] . '/';
		}else{
		    $dir = '';   
		}

	    $id = $_POST['id'];

	    $file = $dir . $id . '.peaks';

	    if ( file_exists( $file ) ) {
	        $peaks = file_get_contents( $file );
	    
	        $peak_array = array_map('floatval', explode(',', $peaks));
	        
	        echo json_encode($peak_array);

	    }else{
	    	echo json_encode('');
	    }
	   
	}

?>
