<?php
$results = file('results.txt'); // получаем массив строк

$query = !empty($_GET['name']) ? $_GET['name']: false;

// echo implode(';', $results);
$response = array();
foreach($results as $result)
{
	$arr = explode(':', $result);
	if (!$query or strpos($arr[0], $query) !== false )
	{
		array_push($response, $arr[0]);
	}
}
$response = array_unique($response);
sort($response);

echo json_encode($response);
// В конце нам надо получить json вида:
// [{"name": player1, "score": 5}, {"name": player2, "score": 123}]