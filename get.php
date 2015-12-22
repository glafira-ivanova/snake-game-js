<?php
$results = file('results.txt'); // получаем массив строк

$query = !empty($_GET['name']) ? $_GET['name']: false;

// echo implode(';', $results);
$response = array();
foreach($results as $result)
{
	$arr = explode(':', $result);
	if (!$query or $arr[0] == $query)
	{
		$elem = array(
			'name' => trim($arr[0]),
			'score' => intval(trim($arr[1]))
		);
		array_push($response, $elem);
	}
}

echo json_encode($response);
// В конце нам надо получить json вида:
// [{"name": player1, "score": 5}, {"name": player2, "score": 123}]