#include "../../basil.js";

function draw() {
  // create new RGB color
  var red = b.color(255,2,3);
  var green = b.color(0,255,0,"green");

  b.fill( red );
  b.rect(0,0,b.width,50);
  b.fill( green );
  b.rect(0,50,b.width,50);


  // create new CMYK color
  var magenta = b.color(1,100,3,4);
  var yellow = b.color(0,0,100,0,"yellow");
  var grey = b.color(100);
  var lightGrey = b.color(5,"light grey");

  b.fill( magenta );
  b.rect(0,200,b.width,50);
  b.fill( yellow );
  b.rect(0,250,b.width,50);
  b.fill( grey );
  b.rect(0,300,b.width,50);
  b.fill( lightGrey );
  b.rect(0,350,b.width,50);


  // get a color from document
  var black = b.color("Black");
  b.fill( black );
  b.rect(0,500,b.width,50); 
}

b.go();