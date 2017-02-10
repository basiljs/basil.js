// @targetengine "loop";
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

var ctrl, textFramePage;

function setup() {
  b.textSize(20);
  ctrl = b.text("move me!", -250, 100, 100, 50);
  textFramePage = b.text("basel", 0, 0, b.width, b.height);
}

function draw() {
  var y = ctrl.geometricBounds[0];
  y = b.round(y);
  textFramePage.contents = "basel " + y;
  textFramePage.paragraphs[0].pointSize = y;
  ctrl.contents = "move me!\n" + y;
}

b.loop();
