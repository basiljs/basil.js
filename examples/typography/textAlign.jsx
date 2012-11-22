#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

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
  */
 
  /*
  VerticalJustification.BOTTOM_ALIGN
  VerticalJustification.CENTER_ALIGN
  VerticalJustification.JUSTIFY_ALIGN
  VerticalJustification.TOP_ALIGN
   */
  var black = b.color("Black");
  var red = b.color(255,0,0);
  var green = b.color(0,255,0);

  b.fill( black );
  b.textFont('Helvetica\tBold');
  b.textSize(48);

  b.text('hello basel', 0, 0, b.width, 80);

  b.fill( red);
  b.textAlign(Justification.CENTER_ALIGN);
  b.text('hello basel', 0, 100, b.width, 80);

  b.fill( red);
  b.textAlign(Justification.CENTER_JUSTIFIED);
  b.text('hello basel', 0, 200, b.width, 80);

  b.fill( green);
  b.textAlign(Justification.RIGHT_ALIGN, VerticalJustification.TOP_ALIGN);
  b.text('hello basel', 0, 300, b.width, 80);
}

b.go();