#include "../../basil.js";

function draw() {
  var tileCount = 10;
  var randomX = b.random(0,b.width);
  var randomY = b.random(0,b.height);

  b.noStroke();
  b.fill("Black");

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = b.width/tileCount*gridX;
      var posY = b.height/tileCount*gridY;
      var angle = b.atan2(randomY-posY,randomX-posX);

      b.pushMatrix();
      b.translate(posX,posY);
      b.rotate(angle);
      b.rect(0,0,75,10);
      b.popMatrix();
    }
  }

  b.fill(0,255,0);
  b.ellipse(randomX,randomY,30,30);
};

b.go();