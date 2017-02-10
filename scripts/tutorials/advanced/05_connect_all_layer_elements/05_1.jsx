// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.clear(b.layer("generated")); // make sure that the layer "generated" is empty

  var points = b.items(b.layer("points")); // get all elements of the layer "points"
  b.layer("generated"); // create or get the layer "generated"

  // declare variables for later use
  var obj1;
  var obj2;

  for(var i = 0; i < points.length; i++) { // for every point ...

    obj1 = b.bounds(points[i]); // ... save get its bounding box ...

    for(var j = 0; j < points.length; j++) { // ... and draw a line to every other point

      if(i !== j) { // but only if the other point is not the one you already know

        obj2 = b.bounds(points[j]); // get the bounding box of the other word

        b.line(obj1.left + obj1.width / 2,
          obj1.top + obj1.height / 2,
          obj2.left + obj2.width / 2,
          obj2.top + obj2.height / 2); // draw a line from center of point 1 to the center of point 2

      }
    }
  }


}

b.go();

