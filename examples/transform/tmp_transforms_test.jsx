#include "../../basil.js";

function draw() {
  b.noStroke();
  //b.printMatrix();
  b.translate(10,36);
  b.scale(2,1.5);
  b.rotate( b.radians(5) );
  //b.shearX( b.radians(33) );
  b.printMatrix();
  
  // 1,0,36,0,1,36
  //var matrix = [2,-0.1743,0.1743,2,36,36];
  //var matrix = [2,-0.1743,1.1547,2,36,36];
  var rect = b.rect(0,0,100,100);
  /*
  rect.transform(CoordinateSpaces.PASTEBOARD_COORDINATES,
                   AnchorPoint.TOP_LEFT_ANCHOR,
                   matrix);
   */
};