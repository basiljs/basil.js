#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.noFill();

  // open shape
  b.beginShape();
  b.vertex(30, 20);
  b.vertex(85, 20);
  b.vertex(85, 75);
  b.endShape();

  // closed shape
  b.beginShape();
  b.vertex(130, 20);
  b.vertex(185, 20);
  b.vertex(185, 75);
  b.endShape( b.CLOSE );

  // bezier shape
  // vertex(x, y, xAnchorLeft, yAnchorLeft, xAnchorRight, yAnchorRight)
  // you can also mix the two approaches:
  b.beginShape();
  b.vertex(30, 120);
  b.vertex(85, 120, 70, 90, 100, 150);
  b.vertex(85, 175);
  b.endShape();
}

b.go();