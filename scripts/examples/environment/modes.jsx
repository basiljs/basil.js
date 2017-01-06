// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  // keep indesign busy
  for (var i = 0; i < 500; i++) {
    var x = b.random(0, b.width);
    var y = b.random(0, b.height);
    b.ellipse(x, y, 17, 17);
  }
}

// -- MODEVISIBLE --
// Processes Document with Screen redraw, use this option to see direct
// results during the process. This will slow down the process in terms
// of processing time.

// -- MODESILENT --
// Disables ScreenRedraw during processing. A bit faster, as the document is
// not redrawn during processing.

// -- MODEHIDDEN --
// Processes Document in background mode. Document will not be
// visible until the script is done. If you are firing on a open document
// you'll need to save it before calling b.go(). The document will be removed
// from the display list and added again after the script is done. In this
// mode you will likely look at indesign with no open document for quite some
// time - do not work in indesign during this time. You may want to use
// b.println("yourMessage") in your script and look at the Console in estk to
// get information about the process.

// and now, compare the executing times in the console ...
// on my machine i had 10s (MODEVISIBLE), 8s (MODESILENT), 3.5s (MODEHIDDEN)

b.go(); // same as writing: b.go(b.MODEVISIBLE)

// b.go(b.MODESILENT);

// b.go(b.MODEHIDDEN);
