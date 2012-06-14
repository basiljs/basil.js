#targetengine "loop";
#include "../../basil.js";

var ctrl, textFramePage;

function setup() {
  ctrl = b.text("move me",-250,100, 50,30);
  textFramePage = b.text("basel", 0,0,b.width,b.height);
}

function draw() {
  var y = ctrl.geometricBounds[0];
  textFramePage.contents = "basel "+y;
  textFramePage.paragraphs[0].pointSize = y;
}

b.loop(100);