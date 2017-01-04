// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  // get textframe which should hold the chart
  var chartCtn = b.labels("chartContainer")[0];
  var chartCtnWidth = b.itemWidth(chartCtn);

  // load data
  var poolsPerHood = b.CSV.decode(b.loadString("LA_Pools-Pools_per_Hood.csv"));
  b.println("loaded " + poolsPerHood.length + " neighborhoods");

  // set stroke parameters
  b.strokeWeight(3);
  b.colorMode(b.CMYK);
  var barColor = b.color(56, 16, 20, 0);
  b.stroke(barColor);

  // create barchart
  for (var i = 0; i < poolsPerHood.length; i++) {
    var name = poolsPerHood[i].hoodname;
    var count = parseInt(poolsPerHood[i].poolcount);

    var descTxt = name + " " + count;
    b.println(i + " " + descTxt);

    var barWidth = b.map(count, 0, 3000, 1, chartCtnWidth);
    var barLine = b.line(0, 0, barWidth, 0);
    // add things to the story flow
    b.addToStory(chartCtn.parentStory, barLine);
    b.addToStory(chartCtn.parentStory, "\n");
    b.addToStory(chartCtn.parentStory, descTxt);
    b.addToStory(chartCtn.parentStory, "\n");
  }
}

b.go(b.MODESILENT);
// b.go();
