/* globals assert */
if (typeof b === "undefined") {
  // @include "../basil.js";
}
if (typeof b.test === "undefined") {
  // @include "../lib/basil.test.js";
}

b.test("GroupTests", {
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testCreateGroup: function(b) {

    b.doc();

    // create array of objects
    var arr = [];

    arr.push(b.ellipse(20, 20, 20, 20));
    arr.push(b.rect(60, 20, 20, 20));
    arr.push(b.rect(100, 20, 20, 20));

    // group them and modify group
    var circles = b.group(arr, "rects");

    assert(circles instanceof Group);
    assert(circles.pageItems.length === 3);

    // get the bounds of our Group

    // ungroup our selected items
    var items = b.ungroup("rects");
    assert(items.length === 3);

  }

});

// print collected test results
b.test.result();
