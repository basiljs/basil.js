// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.noStroke();

  var steps = 20; // this will be executed in three for loops... equals 3x20 = 60!

  var c1 = b.color(255, 0, 0);
  var c2 = b.color(255, 255, 0);
  var c3 = b.color(0, 255, 255);
  var c4 = b.color(0, 0, 255);

  // four colors are necessary, that makes three transitions:

  var mixColor;

  // red to yellow
  for(var i = 0; i < steps; i++) {

    mixColor = b.lerpColor(c1, c2, i / steps);
    b.fill(mixColor);
    b.rect(
      0,
      b.height / steps / 3 * i,
      b.width,
      b.height / steps / 3
    );
  }

  // yellow to cyan
  for(var j = 0; j < steps; j++) {

    mixColor = b.lerpColor(c2, c3, j / steps);
    b.fill(mixColor);
    b.rect(
      0,
      b.height / steps / 3 * j + b.height / 3,
      b.width,
      b.height / steps / 3
    );
  }

  // cyan to blue
  for(var k = 0; k < steps; k++) {

    mixColor = b.lerpColor(c3, c4, k / steps);
    b.fill(mixColor);
    b.rect(
      0,
      b.height / steps / 3 * k + b.height / 3 * 2,
      b.width,
      b.height / steps / 3
    );
  }


}

b.go();

