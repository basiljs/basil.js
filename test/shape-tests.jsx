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

    assert(shape instanceof Polygon);
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

  },

  testPathToPoints: function() {
    textSize(100);
    var myText = text("hello", 0, 0, width, height);
    var outlines = createOutlines(myText);
    var pts = pathToPoints(outlines);
    assert(outlines instanceof Polygon);
    assert(pts.paths.length === 7);
    assert(pts.points instanceof Array);
    assert(pts.beziers instanceof Array);

    var myEllipse = ellipse(width/2, height/2, width/2, width/2);
    var pts = pathToPoints(myEllipse);
    assert(pts.points.length === 4);
    var ptsExtended = pathToPoints(myEllipse, 2);
    assert(ptsExtended.points.length === 12);

  }

});

// print collected test results
basilTest.result();

