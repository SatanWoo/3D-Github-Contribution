(function (){
	//Author:@SatanWoo 
	var consts = {GRID_SIZE:13, BLOCK_SIZE:12, MAX_HEIGHT:100};
	var days = $('.js-calendar-graph-svg rect.day');
	var maxCount = 0;

	days.each(function(day){
		var count = ($(this)).attr('data-count');
		maxCount = count > maxCount ? count : maxCount;
	});

	canvas = document.getElementById('3d-contributuon');
	point = new obelisk.Point(87, 100);
    pixelView = new obelisk.PixelView(canvas, point);

    var colors = [new obelisk.CubeColor().getByHorizontalColor(0xeeeeee), new obelisk.CubeColor().getByHorizontalColor(0xd6e685), new obelisk.CubeColor().getByHorizontalColor(0x8cc665), new obelisk.CubeColor().getByHorizontalColor(0x44a340), new obelisk.CubeColor().getByHorizontalColor(0x1e6823)];
    var columns =  $('.js-calendar-graph-svg g > g');
    columns.each(function(col){
    	var posX = parseInt(((($(this)).attr('transform')).match(/(\d+)/))[0] / consts.GRID_SIZE);
    	($(this)).find('rect').each(function(row){
			var rect = ($(this)).get(0);
			var posY = parseInt((($(this)).attr('y')) /  consts.GRID_SIZE);
			var fillColor = ($(this)).attr('fill');
			var contributionCount = parseInt(($(this)).attr('data-count'));
			var dimension = new obelisk.CubeDimension(consts.BLOCK_SIZE, consts.BLOCK_SIZE, calculateCubeHeight(contributionCount));
			var cube = new obelisk.Cube(dimension, calculateCubeColor(fillColor), false);
	        var p3d = new obelisk.Point3D(consts.BLOCK_SIZE * posX, consts.BLOCK_SIZE * posY, 0);
	        pixelView.renderObject(cube, p3d);
    	});
    });

    function calculateCubeHeight(contributionCount) {
		return parseInt(consts.MAX_HEIGHT / maxCount * contributionCount) + 3;
    };

    function calculateCubeColor(color) {
    	switch (color) {
	  
	        case '#eeeeee':
	          return colors[0];
	       
	        case '#d6e685':
	          return colors[1];
	        
	        case '#8cc665':
	          return colors[2];
	        
	        case '#44a340':
	          return colors[3];
	        
	        case '#1e6823':
	          return colors[4];
	    } 
    };
})();