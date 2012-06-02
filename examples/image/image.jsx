#include "../../basil.js";

// to run this example an image file named "image-example.jpg" has to exists in the folder [indesign_scripts_path]/data
function draw() {
  // add image and fit image size to width and height
  b.image('image-example.jpg', 0, 0, 200, 300);

  // add image in original image size
  b.image('image-example.jpg', 0, 350);

  // place image inside an oval
  var oval = b.page().ovals.add({geometricBounds:[0, 350, 100, 200]});
  b.image('image-example.jpg', oval);
}