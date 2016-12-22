// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.noStroke();

  var steps = 30;

  var c1 = b.color( 255, 0, 0 );
  var c2 = b.color( 0, 255, 0);

  for( var i = 0; i < steps; i++ ) {

    var mixColor = b.lerpColor( c1, c2, 1 / steps * i );
    b.fill( mixColor );
    b.rect( 0, b.height / steps * i, b.width, b.height / steps );
  }

}

b.go();

