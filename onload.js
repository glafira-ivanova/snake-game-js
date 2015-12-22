function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function showScores()
{	
	var query = $('#searchinput').val();
	$('#scoreheader').show();
	$('#scoretable').empty();
	$.getJSON(
		"http://snake/get.php",
		{'name': query},
		function(data)
		{	
			data.sort(
				function(a, b)
				{	
					return b['score'] - a['score'];
				}
			);
			for (var i in data)
			{
				if (i > 9)
				{
					break;
				}
				else 
				{
					$('#scoretable').append('<li>' + data[i]['name'] + ":" + data[i]['score'] + '</li>');
				}
			};
			
		}
	);
}
function searchPlayers()
{
	var query = $('#searchinput').val();
	$("#searchlist").empty();
	if (query.length > 2) 
	{
		$.getJSON(
			"http://snake/search.php",
			{'name': query},
			function(data)
			{
				for (var i in data)
				{
					$("#searchlist").append("<option>" + data[i] + "</option>");
				}
			}
			)
	}
}
$(document).ready(function()
{
	var game = new Game();
	$('#scoreheader').hide();
	game.create();
});
