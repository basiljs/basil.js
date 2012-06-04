#include "../../basil.js";

function draw() {
  //b.translate(36,36);
  //b.scale(2);
  //b.printMatrix();
  //b.rotate(5);
  
  var matrix = [2,-0.1743,0.1743,2,36,36];
  var rect = b.rect(0,0,100,100);
  rect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   matrix);
};