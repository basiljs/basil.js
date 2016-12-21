if (typeof b === 'undefined') {
  //@include "../basil.js";
}
if (typeof b.test === 'undefined') {
  //@include "../lib/basil.test.js";
}

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
  },

  testConstrain: function(b) {

    assert(b.constrain(100, 0, 200) === 100);
    assert(b.constrain(200, 0, 200) === 200);
    assert(b.constrain(0, 0, 200) === 0);
    assert(b.constrain(201, 0, 200) === 200);
    assert(b.constrain(2000000000000000000000, 0, 200) === 200);
    assert(b.constrain(-1, 0, 200) === 0);
    assert(b.constrain(-100000000000000000000, 0, 200) === 0);
    assert(b.constrain(-0.12387918263, 0, 200) === 0);
    assert(b.constrain(200234.123123123123, 0, 200) === 200);

  }

});

// print collected test results
b.test.result();

