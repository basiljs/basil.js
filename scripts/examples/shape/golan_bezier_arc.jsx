// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function setup() {
}

// --------------------------
// Global variables:
// The true coordinates of the Bezier control points:
var px0, py0;
var px1, py1;
var px2, py2;
var px3, py3;
var radius = 300; // radius of the circular arc
var cx = 0; // center point of the circular arc
var cy = 0;

// --------------------------
function draw() {

  var pt = calculateEllipticalArc(radius * 2, radius * 0.5, b.radians(0), b.radians(90));

  // Draw the Bezier control points.
  b.stroke(0, 0, 0, 64);
  b.fill(0, 0, 0, 64);

  b.ellipse(
    cx + pt.startx,
    cy + pt.starty,
    8, 8);
  b.ellipse(
    cx + pt.handle1x,
    cy + pt.handle1y,
    8, 8);
  b.ellipse(
    cx + pt.handle2x,
    cy + pt.handle2y,
    8, 8);
  b.ellipse(
    cx + pt.endx,
    cy + pt.endy,
    8, 8);

  b.line(
    0,
    0,
    cx + pt.startx,
    cy + pt.starty
  );
  b.line(
    cx + pt.startx,
    cy + pt.starty,
    cx + pt.handle1x,
    cy + pt.handle1y
  );
  b.line(
    cx + pt.handle1x,
    cy + pt.handle1y,
    cx + pt.handle2x,
    cy + pt.handle2y
  );
  b.line(
    cx + pt.handle2x,
    cy + pt.handle2y,
    cx + pt.endx,
    cy + pt.endy
  );
  b.line(
    cx + pt.endx,
    cy + pt.endy,
    0,
    0
  );


  b.beginShape(b.CLOSE);
  b.vertex(
    cx,
    cy
  );
  b.vertex(
    cx + pt.startx,
    cy + pt.starty,
    cx + pt.startx,
    cy + pt.starty,
    cx + pt.handle1x,
    cy + pt.handle1y
  );
  b.vertex(
    cx + pt.endx,
    cy + pt.endy,
    cx + pt.handle2x,
    cy + pt.handle2y,
    cx + pt.endx,
    cy + pt.endy
  );
  b.endShape();

}

function calculateEllipticalArc(w, h, startAngle, endAngle) {
  // Establish arc parameters.
  // (Note: assert theta != TWO_PI)
  // var theta = b.radians(100/3.0); // spread of the arc.
  // startAngle = b.radians(200/8.0); // as in arc()
  // endAngle = startAngle + theta;    // as in arc()
  var theta = (endAngle - startAngle); // spread of the arc.


  // Compute raw Bezier coordinates.
  var x0 = b.cos(theta / 2.0);
  var y0 = b.sin(theta / 2.0);
  var x3 = x0;
  var y3 = 0 - y0;
  var x1 = (4.0 - x0) / 3.0;
  var y1 = ((1.0 - x0) * (3.0 - x0)) / (3.0 * y0); // y0 != 0...
  var x2 = x1;
  var y2 = 0 - y1;

  // Compute rotationally-offset Bezier coordinates, using:
  // x' = cos(angle) * x - sin(angle) * y;
  // y' = sin(angle) * x + cos(angle) * y;
  var bezAng = startAngle + theta / 2.0;
  var cBezAng = b.cos(bezAng);
  var sBezAng = b.sin(bezAng);
  var rx0 = cBezAng * x0 - sBezAng * y0;
  var ry0 = sBezAng * x0 + cBezAng * y0;
  var rx1 = cBezAng * x1 - sBezAng * y1;
  var ry1 = sBezAng * x1 + cBezAng * y1;
  var rx2 = cBezAng * x2 - sBezAng * y2;
  var ry2 = sBezAng * x2 + cBezAng * y2;
  var rx3 = cBezAng * x3 - sBezAng * y3;
  var ry3 = sBezAng * x3 + cBezAng * y3;

  var rw = w / 2; // (Math.sqrt(w * w + h * h) / 2);
  var rh = h / 2; // (Math.sqrt(w * w + h * h) / 2);
  // Compute scaled and translated Bezier coordinates.
  return {
    startx: rw * rx0,
    starty: rh * ry0,
    handle1x: rw * rx1,
    handle1y: rh * ry1,

    handle2x: rw * rx2,
    handle2y: rh * ry2,
    endx: rw * rx3,
    endy: rh * ry3
  };
}


b.go();
