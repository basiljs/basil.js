// @targetengine "loop";
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";


var pos, vel;
var ellipse;
var ellipseRadius = 20;

function setup() {
  pos = new b.Vector(b.random(b.width), b.random(b.height));
  vel = new b.Vector(b.random(3, 10), b.random(3, 10));
  ellipse = b.ellipse(pos.x, pos.y, ellipseRadius * 2, ellipseRadius * 2);
  b.fillTint(50);
  b.rectMode(b.CENTER);
}

function draw() {
  pos.add(vel);

  // detect boundary collision
  // right
  if (pos.x > b.width - ellipseRadius) {
    pos.x = b.width - ellipseRadius;
    vel.x *= -1;
  }
  // left
  if (pos.x < ellipseRadius) {
    pos.x = ellipseRadius;
    vel.x *= -1;
  }
  // top
  if (pos.y < ellipseRadius) {
    pos.y = ellipseRadius;
    vel.y *= -1;
  }
  // bottom
  if (pos.y > b.height - ellipseRadius) {
    pos.y = b.height - ellipseRadius;
    vel.y *= -1;
  }

  b.rect(pos.x, pos.y, 10, 10);
  // [y1, x1, y2, x2]
  ellipse.geometricBounds = [pos.y - ellipseRadius, pos.x - ellipseRadius, pos.y + ellipseRadius, pos.x + ellipseRadius];
}

b.loop(60); // try to run in 60 FPS :)
