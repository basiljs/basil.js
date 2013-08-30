#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  // a riff on the processing example of drawing pie charts
  // http://processing.org/examples/piechart.html
  var radius = (b.height/3)/2;

  b.noStroke();

  // draw pie chart with set data
  // use percentages for data instead of angle amounts
  var data = [2.77, 8.33, 9.72, 10.55, 12.5, 16.66, 20.83, 18.61];
  var pc2 = PieChart( b.width/2, radius, radius, data );

  // draw pie chart with random data
  var pc3 = PieChart( b.width/2, b.height-radius, radius, randomArray(100) );

};


/**
 * @param {Number} cx     y-coordinate of the pie chart's center
 * @param {Number} cy     y-coordinate of the pie chart's center
 * @param {Number} radius radius of pie chart
 * @param {Array} data    array of data, values total must not exceed 100
 */
var PieChart = function(cx, cy, radius, data) {
  var start = 0,
      end = 0,
      slices = [];
  for (var i=0; i<data.length; i++) {
    // normalize data value
    data[i] /= 100;
    // set end angle
    end = start+b.radians( 360*data[i] );
    // set fill color to gray percentage
    b.fill( i/data.length*255 );
    // create arc pie slice
    var slice = b.arc( cx, cy, radius, radius, start, end );
    slices.push(slice);
    // the start is the old end
    start = end;
  }
  // return pie chart as group
  return b.group( slices, 'PieChart' );
};


function randomArray(total) {
  var data = [],
      i = b.random(total);
  do {
    i = (i <= 1.0) ? total : b.random(total);
    data.push(i);
    total -= i;
  }
  while( total>0.0 );
  return data;
};


b.go();