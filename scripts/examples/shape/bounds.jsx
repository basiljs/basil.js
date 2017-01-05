// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.textSize(21);
  b.strokeWeight(1);
  var oval = b.ellipse(400, 50, 150, 80);

  var textFrame = b.text(b.LOREM, 50, 70, 300, 500);

  b.typo(textFrame, "hyphenation", false);

  // text related bounds
  b.noFill();
  b.words(textFrame, function (word) {
    var textBounds = b.bounds(word);
    b.rect(textBounds.left, textBounds.top, textBounds.width, textBounds.height);
    b.ellipse(textBounds.left, textBounds.xHeight, 3, 3);
  });

  b.fill("Black");

  // bounds of the oval
  var ovalBounds = b.bounds(oval);
  b.text("ovalBounds", ovalBounds.left, ovalBounds.top, ovalBounds.width, ovalBounds.height);

  // bounds of page items
  var pageBounds = b.bounds(b.page());
  b.inspect(pageBounds);

  b.text("pageBounds", pageBounds.left, pageBounds.top, pageBounds.width, pageBounds.height);
}

b.go();
