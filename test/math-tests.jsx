#include "../basil.js";
#include "../lib/basil.test.js";

b.test('MathTests', {
  testRandomWithNoArgs: function(b) {
    var rand = b.random();
    
    assert(rand > 0 && rand < 1);
  },

  testRandomWithOneArg: function(b) {
    var rand = b.random(5);
    
    assert(rand > 0 && rand < 5);
  },

  testRandomWithTwoArgs: function(b) {
    var rand = b.random(-5, 10.2);
    
    assert(rand > -5 && rand < 10.2);
  },

  testRandomWithMoreThanTwoArgsIgnoresLastArgs: function(b) {
    var rand = b.random(-5, 10.2, 2, 54, 34.5, 324);
    
    assert(rand > -5 && rand < 10.2);
  }
});

// print collected test results
b.test.result();

