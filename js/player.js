function Player(Actuator, gameManager) {
	this.actuator = new Actuator;
	this.gameManager = gameManager;
	
	this.setup();
}

Player.prototype.setup = function() {
	var boundPlay = this.play.bind(this);
	this.actuator.onStartPlayer(function () {
		setInterval(boundPlay, 200);
	});
};

Player.prototype.play = function () {
	var grid = new Array(4);
	for (var i = 0; i < 4; i++) {
		grid[i] = new Array(4);
		for (var j = 0; j < 4; j++) {
			var tile = this.gameManager.grid.cells[i][j];
			grid[i][j] = tile ? tile.value : null;
		}
	}
	
	var direction = { "up": 0, "right": 1, "down": 2, "left": 3 }[this.step(grid)];
	
	this.gameManager.move(direction);
};

Player.prototype.step = function (grid) {
	return new Function("grid", this.actuator.getStepCode())(grid);
};