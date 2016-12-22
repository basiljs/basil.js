// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function setup() {
  b.stroke(0);
}

function draw() {

  b.line(30, 30, 50, 10);
  b.line(50, 10, 70, 30);
  b.line(30, 30, 70, 30);
  b.line(30, 30, 30, 90);
  b.line(30, 30, 70, 90);
  b.line(30, 90, 70, 30);
  b.line(30, 90, 70, 90);
  b.line(70, 90, 70, 30);
}

b.go();

