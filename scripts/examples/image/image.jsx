// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// to run this example
function draw() {

  b.println("Please note: In order to run this example you have to save your InDesign document first and put a picture file named 'image-example.jpg' next to it in a folder called 'data'.");

  // when doc is saved images can be added by name from data directory in same folder as document
  // add image and fit image size to width and height
  b.image("image-example.jpg", 0, 0, 200, 300);

  // add image in original image size
  b.image("image-example.jpg", 0, 350);

  // change fitoption of the image inside the frame
  var img = b.image("image-example.jpg", 400, 0, 200, 300);
  /*
  FitOptions.CONTENT_TO_FRAME
  FitOptions.CENTER_CONTENT
  FitOptions.PROPORTIONALLY
  FitOptions.FRAME_TO_CONTENT
  FitOptions.FILL_PROPORTIONALLY
  FitOptions.APPLY_FRAME_FITTING_OPTIONS
  */
  img.fit(FitOptions.PROPORTIONALLY);

  // place image inside an circle
  var circle = b.ellipse(50, 50, 150, 150);
  b.image("image-example.jpg", circle);
}

b.go();
