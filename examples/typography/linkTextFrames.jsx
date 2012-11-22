#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.textFont('Helvetica\tBold');
  b.textSize(24);

  var lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient";

  var textframeA = b.text(lorem, 0, 0, 300, 80);
  var textframeB = b.text('hello basel', 0, 150, 300, 500);
  b.linkTextFrames(textframeA, textframeB);
}

b.go();