// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// you can get all elements you have marked with a script label (Window -> Utilities -> Script Label)
// with b.labels(). there a two different ways to use the b.labels() function

function draw() {
  var myScriptLabel = "a script label";
  b.println("script Label: " + myScriptLabel);
  b.println("---");

  // a
  var myTaggedItems = b.labels(myScriptLabel);
  for (var i = 0; i < myTaggedItems.length; i++) {
    b.println("element " + i + " is a: " + myTaggedItems[i]);
  }

  b.println("---");

  // b
  b.labels(myScriptLabel, function(item, counter) {
    b.println("element " + counter + " is a: " + item);
  });

}

b.go();
