// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// you can get all the elements you have selected in indesign via b.selection()
// there a two different ways to use the b.selections() function

function draw() {
  // a
  var mySelection = b.selections();
  for (var i = 0; i < mySelection.length; i++) {
    b.println("element " + i + " is a: " + mySelection[i]);
  }

  b.println("---");

  // b
  b.selections(function(item, counter) {
    b.println("element " + counter + " is a: " + item);
  });

}

b.go();
