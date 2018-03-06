// @includepath ~/Documents/;%USERPROFILE%Documents;
// @include basiljs/basil.js;

var shapeWidth = 100;
var shapeHeight = 50;

var offsetX = 80;
var offsetY = 140;

var refPoints = [7, 8, 9, 4, 5, 6, 1, 2, 3];

function draw() {

  clear(doc());
  doc().documentPreferences.facingPages = false;
  units(PT);
  size(620, 680);
  pageCount(1);
  canvasMode(PAGE);

  textSize(16);
  textFont("Helvetica", "Bold");

  // single transformations
  createPage("translation", [20, -40], units());

  createPage("rotation", 10, "°");

  createPage("scaling", 1.5);

  createPage("scaling", [-1, -0.8]);

  createPage("scaling", [0.8, 1.2]);

  createPage("shearing", 40, "°");

  createPage("size", [40, 80], units());

  createPage("size", [50, 50]);

  createPage("width", 60, units());

  createPage("height", 80, units());

  createPage("position", [220, 240], units());

  createPage("x", 220, units());

  createPage("y", 240, units());

  // consectutive transformations
  addTransform(createPage("scale", [1.5, 1.2]), "rotation", 20, "°");
  addTransform(createPage("rotation", 20, "°"), "scale", [1.5, 1.2]);

  addTransform(createPage("shear", 40, "°"), "rotation", 20, "°");
  addTransform(createPage("rotation", 20, "°"), "shear", 40, "°");
}

function addTransform(page, transformType, value, unit) {

  var valueString;
  var unitString = unit || "";

  if(isArray(value)) {
    valueString = "x " + value[0] + unitString + "  " + "y " + value[1] + unitString;
  } else {
    valueString = value + unitString;
  }

  page.parent.pageItems.item("title").contents += "\n" + transformType + ", " + valueString;

  for (var i = 0; i < 9; i++) {

    var shape = page.parent.pageItems.item("" + i);
    // draw referencePoints
    fill(250, 137, 0);
    noStroke();
    for (var j = 0; j < 9; j++) {
      referencePoint(refPoints[j]);
      if(i !== j) {
        dot(transform(shape, "position"), 3);
      }
    }

    referencePoint(refPoints[i]);
    transform(shape, transformType, value);
  }
}

function createPage(transformType, value, unit) {

  if(page().pageItems.item("title").isValid) {
    doc().spreads.add();
    page(doc().pages.lastItem());
    fill(0);
  }

  var valueString;
  var unitString = unit || "";

  if(isArray(value)) {
    valueString = "x " + value[0] + unitString + "  " + "y " + value[1] + unitString;
  } else {
    valueString = value + unitString;
  }
  var tf = text(transformType + ", " + valueString, offsetX / 4, offsetX / 4, width - offsetX / 4, 40);
  tf.name = "title";

  textSize(12);
  textAlign(Justification.CENTER_ALIGN);

  for (var i = 0; i < 3; i++) {
    // row
    for (var j = 0; j < 3; j++) {
      // column

      var s = createShape(j * 180 + offsetX, i * 200 + offsetY, i * 3 + j);
      s.name = "" + (i * 3 + j);
      referencePoint(10 - (3 - j) - i * 3); // 7, 8, 9, 4, 5, 6, 1, 2, 3
      transform(s, transformType, value);
      fill(0);
      var t = text(referencePoint(), j * 180 + offsetX, i * 200 + offsetY - 50, shapeWidth, 20);
    }
  }

  textSize(16);
  textAlign(Justification.LEFT_ALIGN);
  textFont("Helvetica", "Bold");

  return page();

}

function createShape(x, y, refPoint) {
  noStroke();
  fill(220)
  var r = text(LOREM, x, y, shapeWidth, shapeHeight);
  var b = bounds(r);
  var refColor = color(255, 0, 0);
  r.strokeWeight = 0.5;

  noStroke();
  fill(160, 190, 210);

  var anchorPoints = [];

  for (var i = 0; i < 9; i++) {
    referencePoint(refPoints[i]);
    anchorPoints.push( dot(transform(r, "position"), 8) );
  }

  anchorPoints[refPoint].fillColor = refColor;

  noFill();
  stroke(0);
  strokeWeight(0.5);

  return r;
}

function dot(pos, radius) {
  var d = ellipse(pos[0], pos[1], radius, radius);
  return d;
}
