// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  /*
  Justification.AWAY_FROM_BINDING_SIDE
  Justification.CENTER_ALIGN
  Justification.CENTER_JUSTIFIED
  Justification.FULLY_JUSTIFIED
  Justification.LEFT_ALIGN
  Justification.RIGHT_ALIGN
  Justification.RIGHT_JUSTIFIED
  Justification.TO_BINDING_SIDE

  VerticalJustification.BOTTOM_ALIGN
  VerticalJustification.CENTER_ALIGN
  VerticalJustification.JUSTIFY_ALIGN
  VerticalJustification.TOP_ALIGN
   */

  var sayThis = "basil.js";
  var changeCol = 100;
  var changeVal = 10;
  var box;
  var strokeW = 0.25;

  b.fill(changeCol);
  b.textFont("Helvetica", "Bold");
  b.textSize(48);

  box = b.text(sayThis, 0, 0, b.width, 80);
  changeCol -= changeVal;
  box.strokeWeight = strokeW;

  b.fill(changeCol);
  b.textAlign(Justification.CENTER_ALIGN);
  box = b.text(sayThis, 0, 100, b.width, 80);
  changeCol -= changeVal;
  box.strokeWeight = strokeW;

  b.fill(changeCol);
  b.textAlign(Justification.RIGHT_ALIGN);
  box = b.text(sayThis, 0, 200, b.width, 80);
  changeCol -= changeVal;
  box.strokeWeight = strokeW;

  b.fill(changeCol);
  b.textAlign(Justification.FULLY_JUSTIFIED);
  box = b.text(sayThis, 0, 300, b.width, 80);
  changeCol -= changeVal;
  box.strokeWeight = strokeW;

  b.fill(changeCol);
  b.textAlign(Justification.FULLY_JUSTIFIED, VerticalJustification.CENTER_ALIGN);
  box = b.text(sayThis, 0, 400, b.width, 80);
  changeCol -= changeVal;
  box.strokeWeight = strokeW;

  b.fill(changeCol);
  b.textAlign(Justification.FULLY_JUSTIFIED, VerticalJustification.BOTTOM_ALIGN);
  box = b.text(sayThis, 0, 500, b.width, 80);
  box.strokeWeight = strokeW;
}

b.go();
