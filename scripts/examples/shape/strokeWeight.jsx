// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var counter = 50;
  var weightStart = 0.1;
  var weightEnd = 12;

  for (var i = 0; i < counter; i++) {
    var y = b.map(i, 0, counter - 1, 0, b.height);
    var weight = b.map(i, 0, counter - 1, weightStart, weightEnd);

    b.strokeWeight(weight);
    b.line(0, y, b.width, b.height / 2);
  }
}

b.go();
