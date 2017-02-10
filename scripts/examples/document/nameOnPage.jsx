// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// The example shows how to select a pageitem on a specific page by the name.
// Hint: you can manually name a pageitem in the Layers pane (Window -> Layer).

function draw() {
  b.textSize(220);


  // -- create something to play with --
  // add 4 new pages, now threre a 5 pages in the document
  for (var i = 0; i < 4; i++) {
    b.addPage();
  }

  // create on every page a textframe
  // give the textframe a name for future reference
  // you can change/check the names in the 'Layers' window of indesign
  for (var j = 1; j <= 5; j++) {
    b.page(j);
    var txtFrame = b.text("this is page #" + j, 0, 0, b.width, b.height);
    txtFrame.name = "page count big";
  }


  // -- let's change the textframe on page 3 --
  // go to the page
  b.page(3);
  // select the the textframe with the name "page count big"
  var txtOnPage3 = b.nameOnPage("page count big");
  // change it
  txtOnPage3.contents = "Found it! :)";

}

b.go();
