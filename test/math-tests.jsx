/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("MathTests", {
  testRandomWithNoArgs: function() {
    var rand = random();

    assert(rand > 0 && rand < 1);
  },

  testRandomWithOneArg: function() {
    var rand = random(5);

    assert(rand > 0 && rand < 5);
  },

  testRandomWithTwoArgs: function() {
    var rand = random(-5, 10.2);

    assert(rand > -5 && rand < 10.2);
  },

  testRandomWithMoreThanTwoArgsIgnoresLastArgs: function() {
    var rand = random(-5, 10.2, 2, 54, 34.5, 324);

    assert(rand > -5 && rand < 10.2);
  },

  testConstrain: function() {

    assert(constrain(100, 0, 200) === 100);
    assert(constrain(200, 0, 200) === 200);
    assert(constrain(0, 0, 200) === 0);
    assert(constrain(201, 0, 200) === 200);
    assert(constrain(2000000000000000000000, 0, 200) === 200);
    assert(constrain(-1, 0, 200) === 0);
    assert(constrain(-100000000000000000000, 0, 200) === 0);
    assert(constrain(-0.12387918263, 0, 200) === 0);
    assert(constrain(200234.123123123123, 0, 200) === 200);

  }

});

// print collected test results
basilTest.result();
