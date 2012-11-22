#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// to run this example image file ~/temp/data/image-example.jpg must exist
function draw() {
  // place image by file before doc was saved
  b.image(new File('~/temp/data/image-example.jpg'), 200, 300, 200, 200)

  // save doc to ~/temp/ when indesign prompts
  b.doc().save();

  // when doc is saved images can be added by name from data directory in same folder as document
  // add image and fit image size to width and height
  b.image('image-example.jpg', 0, 0, 200, 300);

  // add image in original image size
  b.image('image-example.jpg', 0, 350);

  // place image inside an oval
  var oval = b.page().ovals.add({geometricBounds:[0, 350, 100, 200]});
  b.image('image-example.jpg', oval);
}

b.go();