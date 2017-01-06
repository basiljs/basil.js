// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var tileCount = 10;
  var rectWidth = 80;
  var randomX = b.random(0, b.width);
  var randomY = b.random(0, b.height);

  b.noStroke();
  b.rectMode(b.CENTER);

  var black = b.color("Black");
  var red = b.color(255, 0, 0);
  var green = b.color(0, 255, 0);
  var white = b.color(0); // cmyk white

  b.textSize(9);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = b.width / tileCount * gridX;
      var posY = b.height / tileCount * gridY;
      var angle = b.atan2(randomY - posY, randomX - posX);

      b.pushMatrix();
      b.translate(posX, posY);
      b.rotate(angle);

      b.fill(black);
      b.rect(0, 0, rectWidth, 10);

      b.fill(white);
      b.ellipse(0, 0, 5, 5);

      b.pushMatrix();
      b.translate(rectWidth / 2, 0);
      b.fill(red);
      b.ellipse(0, 0, 12, 12);
      b.popMatrix();

      b.rotate(b.HALF_PI);
      b.fill(black);
      b.text(b.nfc(posX, 1) + "/" + b.nfc(posY, 1), 0, 0, rectWidth * 0.5, 15);
      b.popMatrix();
    }
  }

  b.fill(green);
  b.ellipse(randomX, randomY, 30, 30);
}

b.go();
