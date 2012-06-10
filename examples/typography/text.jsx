#include "../../basil.js";

function draw() {
  b.fill(b.color(0, 255, 0, "green"));
  b.textFont('Helvetica\tBold');
  b.textSize(96);
  b.text('hello basil.js', 0, 0, 400, 300);

  b.fill(b.color(255, 0, 0, "red"));
  b.textAlign(Justification.RIGHT_ALIGN, VerticalJustification.BOTTOM_ALIGN);
  b.textLeading(72);
  b.textKerning(96);
  b.textTracking(96);
  b.text('hello basil.js', 0, 400, 400, 400);
}

b.go();