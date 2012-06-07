#include "../../basil.js";

// to run this example image file ~/temp/data/image-example.jpg must exist
function draw() {
  var img = new File('~/temp/data/image-example.jpg');

  // default is CORNER, image should be placed at top left corner
  b.image(img, 0, 0, 200, 200);

  // set to CENTER, image should be just below 1st image
  b.imageMode(b.CENTER);
  b.image(img, 100, 300, 200, 200);

  // set to CORNERS, image should be just below 2nd image and bigger
  b.imageMode(b.CORNERS);
  b.image(img, 0, 400, 300, 700);
}

b.go();