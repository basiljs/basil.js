// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var counter = 50;
  b.strokeWeight(7);

  for (var i = 0; i < counter; i++) {
    var y = b.map(i, 0, counter - 1, 0, b.height);
    var newStrokeTint = b.map(i, 0, counter - 1, 100, 0);

    // set stroke tint of current color
    b.strokeTint(newStrokeTint);
    b.line(0, y, b.width, y);
  }
}

b.go();
