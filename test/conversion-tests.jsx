/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("ConversionTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testHexUnhex: function() {
    var myDoc = doc();

    var i = 1234;
    var j = 762387452;
    var k = -2034856;

    assert(unhex(hex(i)) === i
      && unhex(hex(j)) === j
      && unhex(hex(k)) === k);
  }
});

// print collected test results
basilTest.result();
