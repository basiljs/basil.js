#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  
  b.units(b.MM);
  
  b.noStroke();
  b.fill(255, 0, 0);
  b.rect(0, 0, b.width, 50);
  
}

b.go();