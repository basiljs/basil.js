// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.units(b.MM);

  // filling an empty text frame with placeholder text
  var textFrameA = b.text("", 0, 0, 60, 60);
  var placeholderA = b.placeholder(textFrameA);

  // filling a non-empty text frame with placeholder text
  var textFrameB = b.text("Placeholder text is added behind existing text: ", 0, 80, 60, 60);
  var placeholderB = b.placeholder(textFrameB);

  // filling linked text frames with placeholder text
  var textFrameC = b.text("Placeholder text filling linked text frames: ", 0, 160, 60, 60);
  var textFrameD = b.text("", 60, 220, 60, 60);
  b.linkTextFrames(textFrameC, textFrameD);
  var placeholderC = b.placeholder(textFrameC);

  // styling placeholder text
  b.typo(placeholderA, "fillColor", b.color(255, 0, 0));
  b.typo(placeholderB, "fillColor", b.color(0, 200, 0));
  b.typo(placeholderC, "fillColor", b.color(0, 0, 255));

}

b.go();
