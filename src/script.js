var game = new Game(new Grid(), new Economy());
var transitionTime = 500;

$(document).ready(function() {
	/* Country selector modal */
	// create selectors
	for (k in countries) {
		$('.country-selector select')
			.append($('<option>')
				.attr('value', k)
				.append(countries[k])
			);
	}

	/* Create countries when the modal is closed */
	$('.country-modal').on('hide.bs.modal', function(e) {
		game.addPlayer($('.country-selector.player option:selected').val());
		game.addPlayer($('.country-selector.opponent option:selected').val());
	});

	/* Bind functions to the buttons */
	$('.economic-indicator-button').click(function() {
		game.playIndicator();
		deactivateButton.call(this);
	});

	$currentEventAlert = $('.current-event-alert');
	$('.current-event-button').click(function() {
		event = game.playCurrentEvent();
		$currentEventAlert.find('.heading').html(event['title']);
		$currentEventAlert.children('p').html(' ' + event['description']);
		$currentEventAlert.find('.arrow')
			.removeClass(game.economy.indicatorClassString)
			.addClass('arrow-' + event['direction']);
		$currentEventAlert.show();
		// $('.current-event-title').append(event['title']);
		// $('.current-event-modal').modal('show');
		deactivateButton.call(this);
	});

	$currentEventAlert.children('button').click(function() {
		$currentEventAlert.hide();
	});

	// $('.country-modal').on('hide.bs.modal', function() {
	// 	$('.current-event-description').empty();
	// 	$('.current-event-title').empty();
	// });

	startGame();
});

function startGame() {
	// randomize opponent selector
	$('.country-selector.opponent select').each(function() {
		var $this = $(this);
		$this.val($($this.children(':eq(' + Math.floor(Math.random() * $this.children().length) + ')')).attr("value"));
	});

	// display the modal immediately
	$('.country-modal').modal('show');
	// $('.country-modal').modal('hide'); //skips t÷he modal for debug reasons


	game.init();
}

function deactivateButton() {
	$this = $(this);
	$this.attr('disabled','disabled');
	window.setTimeout((function() {
		this.removeAttr('disabled');
	}).bind($this), transitionTime);
}