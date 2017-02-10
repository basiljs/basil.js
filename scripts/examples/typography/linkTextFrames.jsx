// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.textFont("Helvetica\tBold");
  b.textSize(16);

  var textframeA = b.text(b.LOREM, 0, 0, 100, 100);
  var textframeB = b.text("", 100, 100, 100, 100);
  b.linkTextFrames(textframeA, textframeB);
  var textframeC = b.text("", 200, 200, 100, 100);
  b.linkTextFrames(textframeB, textframeC);
  var textframeD = b.text("", 300, 300, 100, 100);
  b.linkTextFrames(textframeC, textframeD);
  var textframeE = b.text("", 400, 400, 100, 100);
  b.linkTextFrames(textframeD, textframeE);
  var textframeF = b.text("", 500, 500, 100, 100);
  b.linkTextFrames(textframeE, textframeF);

}

b.go();
