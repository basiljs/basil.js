#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.fill(b.random(0, 255), b.random(0, 255), b.random(0, 255))
  b.noStroke();
  b.ellipse( 30, 30, 100, 100 );
   
}

b.go();