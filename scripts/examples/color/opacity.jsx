// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.clear(b.doc());

  var red = b.color(255, 0, 0);
  var black = b.color("Black");

  b.fill(red);
  b.ellipse(b.width / 2, b.height / 2, 333, 333);

  b.fill(black);
  var rect = b.rect(b.width / 2, 0, b.width / 2, b.height);

  // set the opacity
  b.opacity(rect, 37);
}

b.go();
