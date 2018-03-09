/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("ArcTests", {
  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testCreateArcs: function() {
    // http://processing.org/reference/arc_.html
    fill(255);
    arc(50, 55, 50, 50, 0, HALF_PI);
    noFill();
    arc(50, 55, 60, 60, HALF_PI, PI);
    arc(50, 55, 70, 70, PI, PI + QUARTER_PI);
    arc(50, 55, 80, 80, PI + QUARTER_PI, TWO_PI);
  },

  testPieChart: function() {
    // http://processing.org/examples/piechart.html
    var angles = [30, 10, 45, 35, 60, 38, 75, 67];
    function pieChart(diameter, data) {
      var lastAngle = 0;
      for (var i = 0; i < data.length; i++) {
        var gray = map(i, 0, data.length, 0, 255);
        fill(gray);
        arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
        lastAngle += radians(angles[i]);
      }
    }
    pieChart(300, angles);
  }

});

// print collected test results
basilTest.result();
