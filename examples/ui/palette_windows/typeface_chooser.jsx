/**
 *
 * Palette Interface Window Example
 *
 */

#targetengine bay783ijqrokwlddfjs



//
//  Includes
//
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';



//
// Properties
//
var typeFamilies = app.fonts.everyItem().fontFamily.unique();

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
		value: 'Helvetica'
	},
	size: {
		type: 'textfield',
		label: 'Size',
    valueType: 'int',
		value: 72
	},

	create: {
		type: 'button',
		value: 'Create',
		width: 'full',
		onClick: function() {
			draw();
		}
	}
};



function setup() {
  dialog = new b.ui.palette( 'Typeface Chooser', uiConfig );

  b.layer('generated');
  b.canvasMode(b.PAGE);
};



function draw() {
	b.clear(b.layer('generated'));

  b.textSize( dialog.size );
  b.textFont( app.fonts.item( dialog.typeface ) );
  b.textAlign(Justification.CENTER_ALIGN, VerticalJustification.CENTER_ALIGN);

  textFrame = b.text(
  	dialog.text + "\n" +
  	dialog.typeface + "\n" +
  	dialog.size,
  	0,0,
  	b.width,b.height
  );
};



function update() {
};



b.go();

