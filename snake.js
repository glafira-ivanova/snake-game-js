function Snake(container)
{
	this.matrix = container;
	this.body = [];
	var that = this; 
	
	this.create = function(startRow, startCol, direction)
	{
		that.direction = direction;
		that.matrix.setCell(startRow, startCol, 'snake')
        that.body = [[startRow, startCol]];
        that.alive = true;
	}

	this.move = function() 
	{
		switch (that.direction)
		{
			case 'right':
				var frontRow = that.body[0][0];
				var frontCol = that.body[0][1] + 1;
				break;
			case 'left':
				var frontRow = that.body[0][0];
				var frontCol = that.body[0][1] - 1;
				break;
			case 'up':
				var frontRow = that.body[0][0] - 1;
				var frontCol = that.body[0][1];
				break;
			case 'down':
				var frontRow = that.body[0][0] + 1;
				var frontCol = that.body[0][1];
				break;
		}
	 
		switch (that.matrix.getCellType(frontRow, frontCol))
		{
			case '':
				var tail = that.body.pop();
				that.matrix.setCell(tail[0], tail[1]);
				break;
			case 'fruit':
				$('#score').text(parseInt($('#score').text()) + 1)
				break;
			default:
				that.alive = false;
				break;
		}
		if (that.alive)
		{
			that.matrix.setCell(frontRow, frontCol, 'snake');
			that.body.unshift([frontRow, frontCol]);
		}
	}

}


		
	


