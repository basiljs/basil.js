#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.clear(b.doc());

  var dist = b.height / 5;

  var red = b.color(255, 0, 0);
  var blue = b.color(0, 0, 255);

  b.fill( b.gradient(red, blue) );
  b.rect(0, dist, b.width, dist / 4);

  b.rect(0, dist * 2, b.width, dist / 4);

  b.rect(0, dist * 3, b.width, dist / 4);

  b.rect(0, dist * 4, b.width, dist / 4);
}

b.go();