// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.rectMode(b.CORNER); // default
  b.rect(0, 0, 100, 100);

  b.rectMode(b.CENTER);
  b.rect(0, 0, 100, 100);

  b.rectMode(b.CORNERS);
  b.rect(200, 250, 300, 300);
}

b.go();
