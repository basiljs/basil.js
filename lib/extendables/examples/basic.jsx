#include "../extendables.jsx";

// namespaces, so there are no variables all over the place
var ui = require("ui");
var http = require("http");

function fetch_recipes (amount) {
	if (!http.has_internet_access()) throw new Error("No internet, no recipes.");
	// range returns an array containing the asked range of numbers, 
	// and each number gets mapped to / replaced by a recipe
	return Number.range(amount).map(function () {
		var response = http.get("http://whatthefuckshouldimakefordinner.com/");
		// the first link on the page is a recipe; 
		// don't do this at home -- parsing html with
		// regular expressions is evil
		return response.body.match(/<a.+>(.+)<\/a>/)[1];
	});
}

// the UI library allows us to separate style from structure, 
// leading to cleaner code
var styling = {
	'big': {
		'size': [400, 15],
		'justify': 'center'
	}
}
var dialog = new ui.Dialog("I'm hungry").with(styling);
var suggestion = dialog.row('suggestion');
dialog.text('food', 'Want some food suggestions?').using('big')
	.button('ok', 'Sure thing!')
	.button('no', 'No thanks');

// event handlers, the easy way
dialog.ok.on('click').do(function(){
	dialog.food.text = "Wait a sec, coming up!";
	dialog.food.text = fetch_recipes(1).first();
	dialog.ok.text = "Hmm...";
});
dialog.no.on('click').do(function(){
	this.window.close();
});

// let's get started
dialog.window.show();