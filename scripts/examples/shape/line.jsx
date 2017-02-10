// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var tileCount = 10;
  var randomX = b.random(0, b.width);
  var randomY = b.random(0, b.height);

  b.strokeWeight(2);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = b.width / tileCount * gridX;
      var posY = b.height / tileCount * gridY;
      b.line(posX, posY, randomX, randomY);
    }
  }

  b.fill(0, 255, 0);
  b.ellipse(randomX, randomY, 30, 30);
}

b.go();
