#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  // get the number of swatches, to see later how many new ones have been created
  var swatchCount = b.doc().swatches.length;
  b.println("Document has "+swatchCount+" swatches");

  b.println("Default colormode is: "+ b.colorMode() );

  // create RGB colors
  b.colorMode(b.RGB);
  var red = b.color(255,2,3);
  var green = b.color(0,255,0,"green");
  var rgbGrey = b.color(128);

  b.stroke( rgbGrey );
  b.fill( red );
  b.rect(0,0,b.width,50);
  b.fill( green );
  b.rect(0,50,b.width,50);


  // create CMYK colors
  b.colorMode(b.CMYK);
  var magenta = b.color(1,100,3,4);
  var yellow = b.color(0,0,100,0,"yellow");
  var cmykGrey = b.color(80,"light grey");

  b.stroke( cmykGrey );
  b.fill( magenta );
  b.rect(0,200,b.width,50);
  b.fill( yellow );
  b.rect(0,250,b.width,50);

  // get a color from document
  var black = b.color("Black");
  b.fill( black );
  b.rect(0,500,b.width,50); 

  b.println(b.doc().swatches.length - swatchCount +" colors added to the swatches of the document");
}

b.go();