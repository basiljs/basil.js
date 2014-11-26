#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.noStroke();    
  
  for(var i = 0; i < 50; i++) {
    
    b.fill(b.random(0, 255), b.random(0, 255), b.random(0, 255))
    b.ellipse( b.random(b.width), b.random(b.height), 20, 20 ); 
    
  }
   
}

b.go();