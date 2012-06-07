#include "../../basil.js";

function draw() {
  var green = b.color(0, 255, 0, "green");
  b.fill(green);
  b.text('hello basil', 0, 0, 300, 300);
}

b.go();