function Economy() {
	this.indicatorDirections = [
		'up',
		'upper-right',
		'right',
		'lower-right',
		'down',
		'lower-left',
		'left',
		'upper-left'
	];
	this.indicatorClassString = this.indicatorDirections.map(function(el, ind) {
		return 'arrow-' + el;
	}).join(' ');
	this.indicatorDirection;
	this.indicatorStrength = 2;
	var $indicator;
	this.currentEvents = [];
	this.loaded = false;

	this.init = function() {
		this.indicatorDirection = this.indicatorDirections.randomItem();
		$indicator = $('.arrow-' + this.indicatorDirection);
		$indicator.css('visibility', 'visible');

		$.getJSON('assets/current_events.json', (function(data) {
			this.currentEvents = JSON.parse(JSON.stringify(data));
		}).bind(this));
	};

	this.updateIndicator = function() {
		if (Math.random() > 0.4) {
			this.indicatorDirection = this.indicatorDirections.randomItem();
			$indicator.css('visibility', 'hidden');
			$indicator = $('.arrow-' + this.indicatorDirection);
			$indicator.css('visibility', 'visible');
		}
	};

	this.calcVector = function(direction, magnitude) {
		switch (direction) {
			case 'up':
				return {
					x: 0,
					y: -magnitude
				};
			case 'upper-right':
				return {
					x: magnitude,
					y: -magnitude
				};
			case 'right':
				return {
					x: magnitude,
					y: 0
				};
			case 'lower-right':
				return {
					x: magnitude,
					y: magnitude
				};
			case 'down':
				return {
					x: 0,
					y: magnitude
				};
			case 'lower-left':
				return {
					x: -magnitude,
					y: magnitude
				};
			case 'left':
				return {
					x: -magnitude,
					y: 0
				};
			case 'upper-left':
				return {
					x: -magnitude,
					y: -magnitude
				};
		}
	};

	this.getIndicatorVector = function() {
		return this.calcVector(this.indicatorDirection, this.indicatorStrength);
	};

	this.getCurrentEvent = function() {
		return this.currentEvents.randomItem();
	};
}