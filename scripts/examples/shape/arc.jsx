// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.noFill();

  b.rectMode(b.CENTER); // show bounding boxes
  b.stroke(128);
  b.rect(35, 35, 50, 50);
  b.rect(105, 35, 50, 50);
  b.rect(175, 35, 50, 50);
  b.rect(105, 105, 100, 50);

  b.stroke(0);
  b.arc(35, 35, 50, 50, 0, b.HALF_PI); // lower quarter circle
  b.arc(105, 35, 50, 50, -b.PI, 0);  // upper half of circle
  b.arc(175, 35, 50, 50, -b.PI / 6, b.PI / 6); // 60 degrees
  b.arc(105, 105, 100, 50, b.HALF_PI, 3 * b.HALF_PI); // 180 degrees


  b.arc(35, 175, 50, 50, 0, b.HALF_PI);
  b.arc(35, 175, 60, 60, b.HALF_PI, b.PI);
  b.arc(35, 175, 70, 70, b.PI, b.PI + b.QUARTER_PI);
  b.arc(35, 175, 80, 80, b.PI + b.QUARTER_PI, b.TWO_PI);

  b.arc(175, 175, 80, 80, 0, b.PI + b.QUARTER_PI, b.OPEN);

  b.arc(315, 175, 80, 80, 0, b.PI + b.QUARTER_PI, b.CHORD);

  b.arc(455, 175, 80, 80, 0, b.PI + b.QUARTER_PI, b.PIE);

}


b.go();
