// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.ellipseMode(b.CENTER); // default
  b.ellipse(0, 0, 100, 100);

  b.ellipseMode(b.RADIUS);
  b.ellipse(200, 200, 100, 100);

  b.ellipseMode(b.CORNER);
  b.ellipse(0, 0, 100, 100);

  b.ellipseMode(b.CORNERS);
  b.ellipse(0, 300, 400, 350);
}

b.go();
