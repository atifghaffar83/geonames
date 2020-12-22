<?php

	$executionStartTime = microtime(true) / 1000;

	//$url='http://api.geonames.org/wikipediaSearchJSON?formatted=true&q='. $_REQUEST['country'] .'&maxRows=1&username=geonamesag&style=full';
	//$url='http://api.geonames.org/earthquakesJSON?formatted=true&north='.$_REQUEST['north'].'&south='.$_REQUEST['south'].'&east='.$_REQUEST['east'].'&west='.$_REQUEST['west'].'&username=geonamesag&style=full';
	
	//print($_REQUEST['south']);
	
	$url='http://api.geonames.org/earthquakesJSON?formatted=true&north=44.1&south=-9.9&east=-22.4&west=55.2&username=geonamesag&style=full';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);
	//echo($result);
	curl_close($ch);

	$decode = json_decode($result,true);	
	
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode['earthquakes'];
	
	header('Content-Type: application/json; charset=UTF-8');

	//print($output);
	
	echo json_encode($output); 

?>
