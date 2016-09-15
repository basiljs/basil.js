//@targetengine "loop";
//@include "./basil.js";
var x = 0;
var y = 0;
function setup() {
  b.doc();

}

function draw () {
  b.ellipse(x, y, 10, 10);
  x += 10;
  if(x >= b.width) {
    x = 0;
    y += 10;
  }
}

b.loop(25);
