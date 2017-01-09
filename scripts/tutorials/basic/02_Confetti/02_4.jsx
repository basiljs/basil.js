// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";


function setup() {
  b.fill(0);
  b.noStroke();
}

function draw() {

  var dx, dy, x, y;
  var minOpac = 10;
  var maxOpac = 100;

  for(var n = 0; n < 20; n++) {

    dx = b.random(2, 6);
    dy = b.random(2, 6);
    x = b.random(80, b.width - 80);
    y = b.random(80, b.height - 80);

    for(var m = 0; m < 10; m++) {

      var newEllipse = b.ellipse(x + dx * m, y + dy * m, 10, 10);
      b.opacity(newEllipse, b.map(m, 0, 9, maxOpac, minOpac));

    }

  }

}

b.go();
