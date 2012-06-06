#include "../../basil.js";

function draw() {
  var c1 = b.color(0,0,0,0);
  var c2 = b.color(100,100,0,0);

  var counter = 10;
  b.noStroke();
  var rectHeight = b.height/counter;

  for (var i = 0; i < counter; i++) {
    var y = b.map(i, 0,counter-1, 0,b.height-rectHeight);

    b.fill( b.lerpColor(c1,c2,i/(counter-1)) );
    b.rect(0,y, b.width,rectHeight);
  };
};