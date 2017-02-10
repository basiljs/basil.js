// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var c1 = b.color(0, 255, 0);
  var c2 = b.color(255, 128, 0);

  var counter = 10;
  b.noStroke();
  var rectHeight = b.height / counter;

  for (var i = 0; i < counter; i++) {
    var y = b.map(i, 0, counter - 1, 0, b.height - rectHeight);
    var amt = b.map(i, 0, counter - 1, 0, 1);

    b.fill(b.lerpColor(c1, c2, amt));
    b.rect(0, y, b.width, rectHeight);
  }
}

b.go();
