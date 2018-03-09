/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("VertexTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testVertex: function() {

    beginShape();

    vertex(0, 0);
    vertex(-10, 0);
    vertex(-10, 10);

    var shape = endShape();
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 3);

    beginShape();

    vertex(0, 0);
    vertex(-10, 0);
    vertex(-10, 10);

    addPath();

    vertex(0, 0);
    vertex(-10, 0);

    shape = endShape();

    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 3);
    assert(shape.paths.item(1).entirePath.length === 2);


    beginShape();

    vertex(0, 0);
    vertex(-10, 0);
    vertex(-10, 10);

    shape = endShape(CLOSE);
    assert(shape instanceof GraphicLine);

    assert(shape.paths.length === 1);
    assert(shape.paths.item(0).entirePath.length === 3);

  },

  testArc: function() {

    var shape = arc(0, 0, 50, 50, 0, QUARTER_PI);
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 2);

    shape = arc(0, 0, 50, 50, 0, HALF_PI);
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 2);

    shape = arc(0, 0, 50, 50, 0, PI);
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 4); // because of overlapping points bug

    shape = arc(0, 0, 50, 50, 0, TWO_PI);
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 8); // because of overlapping points bug

  }

});

// print collected test results
basilTest.result();

