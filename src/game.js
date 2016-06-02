function Game(grid, economy) {
	this.grid = grid;
	this.economy = economy;

	this.players = [];

	this.init = function() {
		grid.create();
		economy.init();
	};

	this.addPlayer = function(code) {
		this.players.push(new Country(code, true, {
			x: randomBetween(0, this.grid.size - 1),
			y: randomBetween(0, this.grid.size - 1)
		}).init());
	};

	this.playIndicator = function() {
		var vector = this.economy.getIndicatorVector();
		this.players.forEach(function(element) {
			element.moveDelta(vector);
		});
		this.economy.updateIndicator();
	};

	this.playCurrentEvent = function() {
		var event = this.economy.getCurrentEvent();
		var magnitude = Math.floor(Math.random() * 6 + 1);
		this.players[0].moveDelta(this.economy.calcVector(event['direction'], magnitude));
		return event;
	};
}