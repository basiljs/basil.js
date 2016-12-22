if (typeof b === "undefined") {
  // @include "../basil.js";
}
if (typeof b.test === "undefined") {
  // @include "../lib/basil.test.js";
}

b.test("ArcTests", {
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testCreateArcs: function(b) {
    // http://processing.org/reference/arc_.html
    b.fill(255);
    b.arc(50, 55, 50, 50, 0, b.HALF_PI);
    b.noFill();
    b.arc(50, 55, 60, 60, b.HALF_PI, b.PI);
    b.arc(50, 55, 70, 70, b.PI, b.PI + b.QUARTER_PI);
    b.arc(50, 55, 80, 80, b.PI + b.QUARTER_PI, b.TWO_PI);
  },

  testPieChart: function(b) {
    // http://processing.org/examples/piechart.html
    var angles = [30, 10, 45, 35, 60, 38, 75, 67];
    function pieChart(diameter, data) {
      var lastAngle = 0;
      for (var i = 0; i < data.length; i++) {
        var gray = b.map(i, 0, data.length, 0, 255);
        b.fill(gray);
        b.arc(b.width / 2, b.height / 2, diameter, diameter, lastAngle, lastAngle + b.radians(angles[i]));
        lastAngle += b.radians(angles[i]);
      }
    }
    pieChart(300, angles);
  }

});

// print collected test results
b.test.result();
