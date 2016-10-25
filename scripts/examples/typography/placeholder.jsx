#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.clear(b.doc());

  var textFrameA = b.text("Lorem ipsum", 0, 0, 200, 200);
  var textFrameB = b.text("", 200, 200, 200, 200);

  b.linkTextFrames(textFrameA, textFrameB);

  b.placeholder(textFrameA);

}


b.go();