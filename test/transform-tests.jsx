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
    rectMode(CORNER);
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(itemX(myRect) === 0);
    // move to 50,0
    itemX(myRect, 50);
    // check new x coordinate
    assert(itemX(myRect) === 50);
    myRect.remove();

// ~     rectMode(CENTER);
// ~     // create box at 0,0
// ~     var myRect = rect(0,0,100,100);
// ~
// ~     assert( itemX(myRect) === 0);
// ~     // move to 50,0
// ~     itemX(myRect, 50);
// ~     // check new x coordinate
// ~     assert( itemX(myRect) === 50);
// ~     myRect.remove();
  },

  testMoveY: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(itemY(myRect) === 0);
    // move to 50,0
    itemY(myRect, 50);
    // check new x coordinate
    assert(itemY(myRect) === 50);
  },

  testPosition: function() {
    var myDoc = doc();
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(itemPosition(myRect).x === 0 && itemPosition(myRect).y === 0);
    // move to 50,0
    itemPosition(myRect, 50, 50);
    // check new x coordinate
    assert(itemPosition(myRect).x === 50 && itemPosition(myRect).y === 50);
  },

  testWidth: function() {
    var myDoc = doc();
    units(PT);
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(itemWidth(myRect) === 100);
    // move to 50,0
    itemWidth(myRect, 50);
    // check new x coordinate
    assert(itemWidth(myRect) === 50);
  },

  testHeight: function() {
    var myDoc = doc();
    units(PT);
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(itemHeight(myRect) === 100);
    // move to 50,0
    itemHeight(myRect, 50);
    // check new x coordinate
    assert(itemHeight(myRect) === 50);
  },

  testSize: function() {
    var myDoc = doc();
    units(PT);
    // create box at 0,0
    var myRect = rect(0, 0, 100, 100);
    assert(itemSize(myRect).width === 100 && itemSize(myRect).height === 100);
    // move to 50,0
    itemSize(myRect, 50, 50);
    // check new x coordinate
    assert(itemSize(myRect).width === 50 && itemSize(myRect).height === 50);
  }

  // todo: add matrix transformation tests here ...

});

// print collected test results
basilTest.result();

