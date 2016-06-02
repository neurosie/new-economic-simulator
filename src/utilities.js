function constrain (value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function randomBetween (min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

Array.prototype.randomItem = function () {
	return this[Math.floor(Math.random()*this.length)];
}