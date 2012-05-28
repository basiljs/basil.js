#include "../../basil.js";

function draw() {
  b.colorMode( b.CMYK );
  b.text('hello basil.js', 10, 20, 300, 100);
  b.rect(0, 0, 500, 400);
}