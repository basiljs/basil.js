// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  // create new random RGB color
  var newRandomColor = b.color(b.random(0, 255),
                               b.random(0, 255),
                               b.random(0, 255));

  b.stroke(newRandomColor);
  b.strokeWeight(10);
  // draw a cross with random color
  b.line(0, 0, b.width, b.height);
  b.line(0, b.height, b.width, 0);
}

b.go();
