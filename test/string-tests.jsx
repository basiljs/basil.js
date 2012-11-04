#include "../basil.js";
#include "../lib/basil.test.js";

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
    
    assert( b.split(b.join(["hello", "kitten"], " "), " ") );    
  }



});

// print collected test results
b.test.result();

