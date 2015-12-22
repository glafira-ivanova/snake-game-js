function Matrix(containerId, rows, cols)
{

	this.container = $('#' + containerId);
	this.rows = rows;
	this.cols = cols;
	that = this;

	this.create = function()
	{
		var n = that.rows * that.cols;	
		
		that.container.empty();
		that.container.hide();
		
		for (var i = 0; i < n; i++)
		{
			var div = document.createElement('div');
			div.className = 'cell';
			that.container.append(div);
		}
		that.container.fadeIn(500);

	}

	this.getCellIndex = function(row, col) {
		return (row - 1) * that.cols + col - 1;
	}
	
	this.getCellType = function(row, col)
	{
		if (row > that.rows || row < 1 || col > that.cols || col < 1)
		{
			return undefined
		}
		var ind = that.getCellIndex(row, col);
		var cell = that.container.children()[ind];

		return cell.className.substring(5);

	}
	
	this.setCell = function(row, col, cellType)
	{
		var ind = that.getCellIndex(row, col);
		var cell = $(that.container.children()[ind]);
		cell.removeClass('snake').removeClass('fruit').addClass(cellType);
		
	}

	this.destroy = function()
	{
		that.container.empty();
	}
}
		
