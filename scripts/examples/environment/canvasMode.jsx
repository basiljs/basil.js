// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.doc(app.documents.add()); // use a fresh document
  b.doc().documentPreferences.facingPages = true;

  b.noFill();
  b.stroke(0, 255, 0);
  b.strokeWeight(4);
  b.margins(20);
  b.bleeds(20);

  b.page(1);

  b.canvasMode(b.MARGIN);
  b.rect(0, 0, b.width, b.height);

  b.canvasMode(b.PAGE);
  b.rect(0, 0, b.width, b.height);

  b.canvasMode(b.BLEED);
  b.rect(0, 0, b.width, b.height);

  b.addPage();
  b.addPage();

  b.page(2);

  b.canvasMode(b.FACING_MARGINS);
  b.rect(0, 0, b.width, b.height);

  b.canvasMode(b.FACING_PAGES);
  b.rect(0, 0, b.width, b.height);

  b.canvasMode(b.FACING_BLEEDS);
  b.rect(0, 0, b.width, b.height);


}
b.go();
