// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.noStroke();

  var steps = 10;

  var colors = [ b.color( 255, 0, 0 ), b.color( 255, 255, 0 ), b.color( 0, 255, 255 ), b.color( 0, 0, 255 ) ];

  for( var j = 0; j < colors.length - 1; j++) {

    for( var i = 0; i < steps; i++ ) {

      var mixColor = b.lerpColor( colors[j], colors[j+1], 1 / steps * i );
      b.fill( mixColor );

      b.rect(
        0,
        b.height / steps / (colors.length - 1) * i + b.height / (colors.length - 1 ) * j,
        b.width,
        b.height / steps / (colors.length - 1 )
      );

    }

  }


}

b.go();

