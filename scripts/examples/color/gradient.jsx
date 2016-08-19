#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.clear(b.doc());

  var dist = b.height / 4;

  // create two colors
  var red = b.color(255, 0, 0);
  var blue = b.color(0, 0, 255);

  // create array with 10 random colors
  var randomColors = [];
  for (var i = 0; i < 10; i++) {
    randomColors.push( b.color(b.random(0,255), b.random(0, 255), b.random(0, 255)) );
  }

  // create array with 10 random numbers (0-100)
  var randomNumbers = [];
  for (var i = 0; i < 10; i++) {
    randomNumbers.push( b.random(0, 100) );
  }

  // draw rectangles and fill them with different types of gradients

  // grandient from color1 to color2 
  b.fill( b.gradient(red, blue, "RedBlueLinear") );
  b.rect(0, dist * 0, b.width, dist);

  // gradient from array of colors
  b.fill( b.gradient(randomColors, "RandomCol") );
  b.rect(0, dist * 1, b.width, dist);

  // gradient from same array of colors with random gradient stop positions
  b.fill( b.gradient(randomColors, randomNumbers, "RandomCol/Pos") );
  b.rect(0, dist * 2, b.width, dist);

  // radial gradient from color1 to color2
  b.gradientMode( b.RADIAL );
  b.fill( b.gradient(red, blue, "RedBlueRadial") );
  b.rect(0, dist * 3, b.width, dist);
}

b.go();