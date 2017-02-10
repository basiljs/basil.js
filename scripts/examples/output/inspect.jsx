// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.clear(b.doc());

  var textFrame = b.text("hi!", 0, 0, 50, 50);
  var someObject = {prop: "hello", fun: function() {}, num: 5, arr: [0, 1, 2, 3, 4, 5, function() {}], c: new Color()};

  b.inspect(someObject);
  // b.inspect( textFrame );
  // b.inspect( b.doc().allPageItems );
}

b.go();
