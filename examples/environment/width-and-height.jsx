#include "../../basil.js";

function draw() {
  b.doc();
  b.println("page size: "+b.width+" x "+b.height);
  b.rect(0,0,b.width,b.height);
};