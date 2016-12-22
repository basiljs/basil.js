// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  var pageCount = 50;
  var boxSize = 30;
  var x = 0;

  b.textFont("Helvetica Neue", "Bold");
  b.textAlign(Justification.CENTER_ALIGN);

  for ( var i = 0; i < pageCount; i++ ) {

    b.addPage();

    if( b.page().side == PageSideOptions.LEFT_HAND ) {
      x = b.width / pageCount * i;
    } else {
      x = b.width - b.width / pageCount * (i - 1) - boxSize;
    }

    b.text( i + 1, x, b.height - 50, boxSize, boxSize);

  }

}

b.go();