// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.println("Please note: In order to run this example you have to save your InDesign document first and put a picture file named 'image-example.jpg' next to it in a folder called 'data'.");
  var img = b.image("image-example.jpg", 100, 350);
  b.transformImage(img, 0, 0, 500, 500);

}

b.go();
