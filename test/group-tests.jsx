/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("GroupTests", {
  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testCreateGroup: function() {

    doc();

    // create array of objects
    var arr = [];

    arr.push(ellipse(20, 20, 20, 20));
    arr.push(rect(60, 20, 20, 20));
    arr.push(rect(100, 20, 20, 20));

    // group them and modify group
    var circles = group(arr, "rects");

    assert(circles instanceof Group);
    assert(circles.pageItems.length === 3);

    // get the bounds of our Group

    // ungroup our selected items
    var items = ungroup("rects");
    assert(items.length === 3);

  }

});

// print collected test results
basilTest.result();
