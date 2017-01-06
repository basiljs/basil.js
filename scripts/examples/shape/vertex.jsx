// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.noFill();

  // open shape
  b.beginShape();
  b.vertex(30, 20);
  b.vertex(85, 20);
  b.vertex(85, 75);
  b.endShape();

  // closed shape
  b.beginShape(b.CLOSE);
  b.vertex(130, 20);
  b.vertex(185, 20);
  b.vertex(185, 75);
  b.endShape();

  // bezier shape
  // vertex(x, y, xAnchorLeft, yAnchorLeft, xAnchorRight, yAnchorRight)
  // you can also mix the two approaches:
  b.beginShape();
  b.vertex(230, 320);
  b.vertex(285, 320, 270, 290, 300, 350);
  b.vertex(285, 375);
  b.endShape();

  b.translate(200, 0); // just move down a bit


  // multi-component shape (~30% faster than adding multiple PageItems)
  b.beginShape();
  b.vertex(30, 20);
  b.vertex(85, 20);
  b.vertex(85, 75);
  b.addPath();
  b.vertex(130, 120);
  b.vertex(185, 120);
  b.vertex(185, 175);
  b.addPath();
  b.vertex(230, 220);
  b.vertex(285, 220);
  b.vertex(285, 275);
  b.endShape();


}

b.go();
