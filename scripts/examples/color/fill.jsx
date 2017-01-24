// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  // create new random RGB color
  var newRandomColor = b.color(b.random(0, 255),
                               b.random(0, 255),
                               b.random(0, 255));

  // fill rect with it
  b.fill(newRandomColor);
  b.rect(0, 0, b.width, b.height);
}

b.go();
