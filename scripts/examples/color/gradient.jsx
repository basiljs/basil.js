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

  b.fill( b.gradient(red, blue) );
  b.rect(0, dist * 0, b.width, dist);

  b.fill( b.gradient(randomColors) );
  b.rect(0, dist * 1, b.width, dist);

  b.fill( b.gradient(randomColors, randomNumbers) );
  b.rect(0, dist * 2, b.width, dist);

  b.fill( b.gradient(red, blue) );
  b.rect(0, dist * 3, b.width, dist);
}

b.go();