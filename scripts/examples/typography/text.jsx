// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var myColor = b.color(10, 20, 30, "blackmagic");
  b.fill(myColor);
  b.textFont("Helvetica", "Bold");
  b.textSize(96);
  b.text("why hello basil.js", 0, 0, 350, 350);

  var myString = "i love \n using variables \n in basil.js"; // note the \n for a newline
  b.fill(b.color(255, 25, 25, "redspecial"));
  b.textAlign(Justification.RIGHT_ALIGN, VerticalJustification.CENTER_ALIGN);
  b.textLeading(150);
  b.textTracking(1000);
  b.textSize(24);
  b.text(myString, 0, b.height / 2, b.width, b.height / 2);
}

b.go();
