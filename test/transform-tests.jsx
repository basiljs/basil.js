/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("TransformTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testMoveX: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(approxEqual(transform(myRect, "x"), 0));
    // move to 50,0
    transform(myRect, "x", 50);
    // check new x coordinate
    assert(approxEqual(transform(myRect, "x"), 50));
  },

  testMoveY: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(approxEqual(transform(myRect, "y"), 0));
    // move to 0,50
    transform(myRect, "y", 50);
    // check new y coordinate
    assert(approxEqual(transform(myRect, "y"), 50));
  },

  testPosition: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(approxEqual(transform(myRect, "position")[0], 0) &&
           approxEqual(transform(myRect, "position")[1], 0));
    // move to 50,50
    transform(myRect, "position", [50, 50]);
    // check new coordinates
    assert(approxEqual(transform(myRect, "position")[0], 50) &&
           approxEqual(transform(myRect, "position")[1], 50));
  },

  testWidth: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(approxEqual(transform(myRect, "width"), 100));
    // reduce width to 50
    transform(myRect, "width", 50);
    // check new width
    assert(approxEqual(transform(myRect, "width"), 50));
  },

  testHeight: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(approxEqual(transform(myRect, "height"), 100));
    // reduce height to 50
    transform(myRect, "height", 50);
    // check new height
    assert(approxEqual(transform(myRect, "height"), 50));
  },

  testSize: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(approxEqual(transform(myRect, "size")[0], 100) &&
           approxEqual(transform(myRect, "size")[1], 100));
    // reduce size to 50,50
    transform(myRect, "size", [50, 50]);
    // check new dimensions
    assert(approxEqual(transform(myRect, "size")[0], 50) &&
           approxEqual(transform(myRect, "size")[1], 50));
  }

  // todo: add tests for translation, rotation, scale, shear
  // todo: add matrix transformation tests here ...

});

// print collected test results
basilTest.result();

function approxEqual(v1, v2) {
  var epsilon = 0.000000000001;
  return Math.abs(v1 - v2) < epsilon;
}
