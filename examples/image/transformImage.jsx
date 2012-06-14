#include "../../basil.js";

function draw() {
  var img = b.image('tmp.png', 100, 350);
  b.transformImage(img, 0,0, 500,500);
};

b.go();