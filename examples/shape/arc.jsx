#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.noFill();

  b.rectMode(b.CENTER); // show bounding boxes
  b.stroke(128);
  b.rect(35, 35, 50, 50);
  b.rect(105, 35, 50, 50);
  b.rect(175, 35, 50, 50);
  b.rect(105, 105, 100, 50);
  
  b.stroke(0);
  b.arc(35, 35, 50, 50, 0, b.HALF_PI); // lower quarter circle 
  b.arc(105, 35, 50, 50, -b.PI, 0);  // upper half of circle
  b.arc(175, 35, 50, 50, -b.PI / 6, b.PI / 6, b.PIE); // 60 degrees
  b.arc(105, 105, 100, 50, b.HALF_PI, 3 * b.HALF_PI); // 180 degrees


  b.arc(35, 155, 50, 50, 0, b.HALF_PI);
  b.arc(35, 155, 60, 60, b.HALF_PI, b.PI);
  b.arc(35, 155, 70, 70, b.PI, b.PI+b.QUARTER_PI);
  b.arc(35, 155, 80, 80, b.PI+b.QUARTER_PI, b.TWO_PI);

  b.arc(175, 155, 80, 80, 0, b.PI+b.QUARTER_PI, b.OPEN);

  b.arc(315, 155, 80, 80, 0, b.PI+b.QUARTER_PI, b.CHORD);

  b.arc(455, 155, 80, 80, 0, b.PI+b.QUARTER_PI, b.PIE);

  b.noStroke();
  var randomSwatch = b.doc().swatches[ parseInt( b.random(3,b.doc().swatches.length) ) ].name;
  b.fill( randomSwatch );
  var dataset = [2.77, 8.33, 9.72, 10.55, 12.5, 16.66, 20.83, 18.61];
  PieChart( 35, 255, 80, dataset );

};


/**
 *  Draw a Pie Chart
 * 
 *  @param {Number} cx     y-coordinate of the pie chart's center
 *  @param {Number} cy     y-coordinate of the pie chart's center
 *  @param {Number} radius radius of pie chart
 *  @param {Array} data    array of data, values total must not exceed 100
 *
 *  @return {Group} Group of PieChart shapes
 */
var PieChart = function(cx, cy, radius, data) {
  var start = 0,
      end = 0,
      slices = [];
  for (var i=0; i<data.length; i++) {
    data[i] /= 100;
    end = start+b.radians( 360*data[i] );

    b.fillTint( b.map(i, 0,data.length, 10,100) );
    var slice = b.arc( cx, cy, radius, radius, start, end, b.PIE );
    slices.push(slice);

    start = end;
  }
  return b.group( slices, 'PieChart' );
};


b.go();