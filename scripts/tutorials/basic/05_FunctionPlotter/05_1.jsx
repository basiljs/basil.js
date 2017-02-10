// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  var xCells = 150; // horizontal resolution per GraphicLine object
  var yCells = 100; // amount of GraphicLine objects on vertical axis

  var yStep = b.height / yCells * 1.2; // step sizes
  var xStep = b.width / xCells;

  b.noFill(); // do not fill
  b.strokeWeight(0.75); // thin strokes
  b.stroke(0);

  b.layer("generated");


  for(var y = 0; y <= yCells; y++) {  // for each row

// ~     b.stroke( b.map(y, 0, yCells, 0, 255), 0, 0 ); // set a new color per row

    b.beginShape(); // opens a new GraphicLine object
    for(var x = 0; x <= xCells; x++) { // for amount of x cells

      // add a vertex point
      b.vertex(x * xStep,  // at proper x position, and with a specific vertical offset
// ~         yStep * y );
        yStep * y + b.random(-2, 2));
// ~         yStep * y * b.map( x, 0, xCells, 1, 1.1 ) );
// ~         yStep * y + b.sin( b.PI * 2 / xCells * x ) * 10 );
// ~         yStep * y + b.sin( b.PI * 8 / xCells * x ) * b.map( y, 0, yCells, 0, yStep * 5) );

    }

    b.endShape(); // close the shape, adds it to the layers

  }

}


b.go();
