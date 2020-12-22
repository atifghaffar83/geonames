<?php

	$executionStartTime = microtime(true) / 1000;

	
	//$url='http://api.geonames.org/earthquakesJSON?formatted=true&north=44.1&south=-9.98&east=22.4&west=55.2&username=geonamesag&style=full';	
	//$url='http://api.geonames.org/earthquakesJSON?formatted=true&north=55.0583836008072&south=47.2701236047002&east=15.0418156516163&west=5.8663152683722&username=geonamesag&style=full';
	$url='http://api.geonames.org/earthquakesJSON?formatted=true&north=' . $_REQUEST['north'] . '&south='. $_REQUEST['south'] .'&east='. $_REQUEST['east'] .'&west='. $_REQUEST['west'] .'&username=geonamesag&style=full';
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	
	
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode['earthquakes'];
	//$output['data'] = $decode['geonames'];
	
	header('Content-Type: application/json; charset=UTF-8');
	
	echo json_encode($output); 

?>
