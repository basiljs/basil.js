
// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";


var maxCount = 5000; // max count of the cirlces
var timeOut = 5000; // 5000ms

var currentCount = 1;
var x = new Array(maxCount);
var y = new Array(maxCount);
var r = new Array(maxCount); // radius
var closestIndex = new Array(maxCount); // index

var minRadius = 3;
var maxRadius = 50;


function setup() {

  b.noFill();

  // first circle
  x[0] = 200;
  y[0] = 100;
  r[0] = 50;
  closestIndex[0] = 0;

  b.ellipseMode(b.CENTER);

}


function draw() {

  while(currentCount < maxCount && b.millis() < timeOut) {

    // create a random position
    var newX = b.random(0 + maxRadius, b.width - maxRadius);
    var newY = b.random(0 + maxRadius, b.height - maxRadius);
    var newR = minRadius;

    var intersection = false;
    var d;

    // find out, if new circle intersects with one of the others
    for(var i = 0; i < currentCount; i++) {
      d = b.dist(newX, newY, x[i], y[i]);
      if (d < (newR + r[i])) {
        intersection = true;
        break;
      }
    }

    // no intersection ... add a new circle
    if (intersection === false) {
      // get closest neighbour and closest possible radius
      var newRadius = b.width;
      for(var j = 0; j < currentCount; j++) {
        d = b.dist(newX, newY, x[j], y[j]);
        if (newRadius > d - r[j]) {
          newRadius = d - r[j];
          closestIndex[currentCount] = j;
        }
      }

      if (newRadius > maxRadius) {
        newRadius = maxRadius;
      }

      x[currentCount] = newX;
      y[currentCount] = newY;
      r[currentCount] = newRadius;

      var ell = b.ellipse(newX, newY, newRadius * 2, newRadius * 2);
      ell.contentType = ContentType.TEXT_TYPE;

      currentCount++;
    }

  }


}


b.go();
