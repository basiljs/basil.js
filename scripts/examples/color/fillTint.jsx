// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var counter = 50;
  b.noStroke();
  var rectHeight = b.height / counter;

  for (var i = 0; i < counter; i++) {
    var y = b.map(i, 0, counter - 1, 0, b.height - rectHeight);
    var fillTint = b.map(i, 0, counter - 1, 100, 0);

    b.fillTint(fillTint);
    b.rect(0, y, b.width, rectHeight);
  }
}

b.go();
