if (typeof b === 'undefined') {
  //@include "../basil.js";
}
if (typeof b.test === 'undefined') {
  //@include "../lib/basil.test.js";
}

b.test('EnvironmentTests', {

  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testSplitJoin: function(b) {
    var doc = b.doc();
    var str = "hello world how are you, my dear?";
    assert( b.join(b.split(str, " "), " ") === str );
  }



});

// print collected test results
b.test.result();

