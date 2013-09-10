/**
 * 
 * Simple Live-Updating Slider
 * 
 */
#targetengine 'loop';



// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/interface.jsx';



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var sel = app.selection[0];
var dialog;

// values
var values = {
  mySlider: 100
};


// controllers
var controllers = {
  mySlider: {
    label: 'Slider',
    type: 'slider',
    range: [0, 300]
  }
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {
  dialog = new Interface.Palette('test', controllers, values);
};

// ------------------------------------------------------------------------
function draw() {

	alert( dialog.mySlider.value );
	// slider.onChanging(sel, move());
	// sel.move( [0, dialog.slider.value] );
};


b.go();

