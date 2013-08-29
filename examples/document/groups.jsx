#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// groups can be handled in a number a different ways
// finding, creating, releasing

function draw() {
	
	// find the Group by a given name
	// be sure to create a Group called 'Circles'
	var circles = b.group('Circles');
	b.itemPosition( circles, 0,0 );
	circles.fillColor = b.color( 0, 255, 178 );

	// get the bounds of our Group
	b.println( b.bounds(circles).width );


	// create a Group from a selection (make sure to have min two items selected)
	// be sure to have some objects selected
	var sel = b.selections();
	var newGroup = b.group( sel, 'Selected' );


	b.delay( 500 ); // wait 1/2 a second to see progress


	// ungroup our selected items
	var items = b.ungroup( 'Selected' );
	b.println( items ); 

	// fill our previously grouped items with random colors
	for( var i=0; i<items.length; i++ ) {
		var newRandomColor = b.color(
			b.random(0,255),
			b.random(0,255),
			b.random(0,255)
		);
		items[i].fillColor = newRandomColor;
	}

};

b.go();