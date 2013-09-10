/**
 * 
 * Simple Live-Updating Slider
 * 
 */

#targetengine 'session';


//
// Properties
//
var sel = app.selection[0];
var boom = 0;


// Create Window 
var win = new Window('palette', 'Live Slider', undefined); 
var mainGroup = win.add('group', [10, 10, 440, 100], 'Move slider around');

var slider = mainGroup.add(
	'slider', 
	[20, 20, 230, 45],
	100, 	// start
	1, 		// min
	200 	// max
);
slider.onChanging = function() {
	// sel.move( [0,this.value] );
	sel.geometricBounds[0] = this.value;
};

win.show();



// slider.onChanging(sel, move());