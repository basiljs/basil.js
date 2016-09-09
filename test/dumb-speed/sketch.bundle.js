// @include "../../basil.bundle.js";
/* global b */
function setup () {
  var doc = b.doc();
  b.clear(doc);
  for(var i = 0; i < 500; i++) {
    b.ellipse(0, 0, 10, 10);
  }
}
function draw() {}
b.go();

