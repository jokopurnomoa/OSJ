<?php
	$date = "";
	if(isset($_POST['date']))
		$date = $_POST['date'];
		
	function nicetime($date){
    	if(empty($date)) {
       		return "No date provided";
    	}
    
    	$periods         = array("detik", "menit", "jam", "hari", "minggu", "bulan", "tahun", "dekade");
    	$lengths         = array("60","60","24","7","4.35","12","10");
    
    	$now             = time();
    	$unix_date         = strtotime($date);
    
    	// check validity of date
    	if(empty($unix_date)) {    
       		return "Bad date";
    	}

    	// is it future date or past date
    	if($now > $unix_date) {    
       		$difference     = $now - $unix_date;
       		$tense         = "yg lalu";
        
    	} else {
       		$difference     = $now - $unix_date;
       		$tense         = "yg lalu";
    	}
    
    	for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
       		$difference /= $lengths[$j];
    	}
    
    	$difference = round($difference);
    
    	if($difference != 1) {
       		$periods[$j].= "";
    	}
    	if($difference > 0)
    		return "$difference $periods[$j] {$tense}";
		else
			return "beberapa saat yg lalu";
	}
	echo nicetime($date);
?>