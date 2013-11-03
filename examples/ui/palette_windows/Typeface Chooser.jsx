/**
 *
 * Prompt Interface Window Example
 *
 */

#targetengine ddsd3eds4fmrrrr



//
//  Includes
//
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';



//
// Properties
//
var typeFamilies = app.fonts.everyItem().fontFamily.unique();
var typeStyles   = app.fonts.everyItem().fontStyleName.unique();


// create a variable for the interface control palette window
var dialog;

var uiConfig = {
	text: {
		type: 'textfield',
		label: 'Text',
		rows: 4,
		columns: 20,
    multiline: true,
		value: 'Hello World'
	},
	typeface: {
		type: 'dropdown',
		label: 'Type Family',
		items: typeFamilies,
		value: 'Futura'
	},
	size: {
		type: 'textfield',
		label: 'Size',
    valueType: 'int',
		value: 14
	},
	color: {
		type: 'color',
		label: 'Circle Color',
		value: 'black'
	},

	// The create button, with an onClick() handler that creates the
	// text item for us:
	create: {
		type: 'button',
		value: 'Create',
		onClick: function() {
			// Create a PointText
			// Set content and characterStyle properties on it
		}
	}
};



function setup() {
  // define the interface palette window
  dialog = new b.ui.palette(
    // title of the dialog
    'Typeface Chooser',
    // the array of defined controllers
    uiConfig
  );

};

function draw() {

	// $.writeln( app.fonts.item("Futura") );
	// printProperties( app.fonts.item( dialog.typeface ) );

};

function update() {
	alert( dialog.typeface );
};



b.go();




function printProperties(obj) {
  $.writeln("------------------");
  $.writeln(obj.reflect.name);
  $.writeln("\rProperties");
  $.writeln("------------------");
  var props = obj.reflect.properties;
  var array = [];
  for( var i=0; i<props.length; i++ ) {
    try {
      array.push( props[i].name + ":\t\t" + obj[props[i].name] );
    }
    catch(err) {}
    array.sort();
    // $.writeln( array.join ("\r") );
  }
  for( var i=0; i<array.length; i++ ) {
    $.writeln( array[i] );
  }
};