function Game()
{
	var that = this;
	this.matrix = new Matrix('matrix', 20, 20);
	this.snake = new Snake(this.matrix);
	this.speed = 5;
	var MOVECODES = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
	}
	var CONTROLCODES = {
		32: 'space',
		107: 'numPlus',
		109: 'numMinus',
	}
	var FRUITS = [
		'banana',
		'grape',
		'orange',
		'papaya',
		'pineapple',
		'strawberry',
		'watermelon',
	]

	this.setHandler = function()
	{
		$(window).on('keydown', that.userHandler);
	}

	this.create = function()
	{
		$(window).off('keydown');
		that.isRunning = false;
		that.matrix.create();
		var startRow = getRandomInt(1, that.matrix.rows);
		var startCol = getRandomInt(1, that.matrix.cols);
		that.snake.create(startRow, startCol, 'right');
		that.genFruit();
		$('#score').text(0);
		$('#speed').text(that.speed);
		setTimeout(that.setHandler, 500);
	}

	this.userHandler = function(event) 
	{		
		if (event.which in MOVECODES) 
		{
        	that.snake.direction = MOVECODES[event.which];
        	if (!that.isRunning)
        	{
        		that.isRunning = true;
        		that.run();
        	}
    	}
    	else if (event.which in CONTROLCODES)
    	{
    		switch(CONTROLCODES[event.which])
    		{
    			case 'space':
    				that.isRunning = false;
    				break;
    			case 'numPlus':
    				that.speedUp();
    				break;
    			case 'numMinus':
    				that.speedDown();
    				break; 
    		}
    	} 
	}

	this.gameOver = function()
	{
		var curr_score = parseInt($('#score').text());
		var high_score = parseInt($('#high_score').text());
		if (curr_score > high_score) 
		{
			$('#high_score').text(curr_score);
		};
		var name = prompt('Enter your name:', 'player');
		$.post(
			"http://snake/add.php", 
			{
				'name': name,
				'score': curr_score
			},
			function(data, status)
			{
				console.log(data, status)
			}
		);
		that.create();
	}

	this.run = function()
	{
		if (!that.snake.alive)
		{
			that.gameOver();
		} 
		else
		{
			if (that.isRunning)
			{
				that.snake.move();
				if ($('.fruit').length < 1) 
				{
					that.genFruit();
				}
				setTimeout(that.run, Math.round(1000/that.speed));
			}
		}
	}

	this.genFruit = function() 
	{
		var row = getRandomInt(1, that.matrix.rows);
		var col = getRandomInt(1, that.matrix.cols);
		var fruit = FRUITS[getRandomInt(0, FRUITS.length - 1)];
		if (that.matrix.getCellType(row, col) === '')
		{
			that.matrix.setCell(row, col, 'fruit');
			$('.fruit').css('background-image', 'url(fruits/' + fruit + '.png)');
		} else {
			that.genFruit();
		}
	}

	this.speedUp = function () 
	{
		if (that.speed < 20) 
		{
			that.speed++;
			$('#speed').text(that.speed);
		}
	}
	
	this.speedDown = function () 
	{
		if (that.speed > 1)
		{
			that.speed--;
			$('#speed').text(that.speed);
		}
	}
}


