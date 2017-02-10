// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// groups can be handled in a number a different ways
// finding, creating, releasing

function draw() {

  // create array of objects
  var arr = [];

  arr.push(b.rect(20, 20, 20, 20));
  arr.push(b.rect(60, 20, 20, 20));
  arr.push(b.rect(100, 20, 20, 20));

  // group them and modify group
  var circles = b.group(arr, "rects");
  b.itemPosition(circles, 0, 0);
  circles.fillColor = b.color(0, 255, 178);

	// get the bounds of our Group
  b.println(b.bounds(circles).width);

	// ungroup our selected items
  var items = b.ungroup("rects");
  b.println(items);

}

b.go();
