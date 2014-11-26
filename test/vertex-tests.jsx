if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js";
}

b.test('VertexTests', {

  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testVertex: function(b) {

    b.beginShape();

    b.vertex(0,0);
    b.vertex(-10,0);
    b.vertex(-10,10);

    var shape = b.endShape();
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 3);

    b.beginShape();

    b.vertex(0,0);
    b.vertex(-10,0);
    b.vertex(-10,10);

    b.addPath();

    b.vertex(0,0);
    b.vertex(-10,0);

    var shape = b.endShape();

    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 3);
    assert(shape.paths.item(1).entirePath.length === 2);


    b.beginShape();

    b.vertex(0,0);
    b.vertex(-10,0);
    b.vertex(-10,10);

    var shape = b.endShape(b.CLOSE);
    assert(shape instanceof GraphicLine);

    assert(shape.paths.length === 1);
    assert(shape.paths.item(0).entirePath.length === 3);

  },

  testArc: function(b) {

    var shape = b.arc(0,0, 50,50, 0,b.QUARTER_PI)
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 2);

    var shape = b.arc(0,0, 50,50, 0,b.HALF_PI)
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 2);

    var shape = b.arc(0,0, 50,50, 0,b.PI)
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 4); // because of overlapping points bug

    var shape = b.arc(0,0, 50,50, 0,b.TWO_PI)
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 8); // because of overlapping points bug

  }

});

// print collected test results
b.test.result();

