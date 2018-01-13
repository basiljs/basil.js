/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("EnvironmentTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testSplitJoin: function() {
    var myDoc = doc();
    var str = "hello world how are you, my dear?";
    assert(join(split(str, " "), " ") === str);
  }
});

// print collected test results
basilTest.result();
