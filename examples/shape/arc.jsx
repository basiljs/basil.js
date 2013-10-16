#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  // a riff on the processing example of drawing pie charts
  // http://processing.org/examples/piechart.html
  var radius = (b.width/1);

  b.noStroke();

  var i = 0;
  for( var y=0; y<b.height-radius; y+=radius ) {
    for( var x=0; x<b.width; x+=radius ) {
      var dataset = [75-i,i];
      PieChart( x+radius/2, y+radius/2, radius, dataset );
      i += 100 / ((b.width/radius) * (b.height/radius));
    }
  }

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

    b.fill( i/data.length*255 );
    var slice = b.arc( cx, cy, radius, radius, start, end );

    slices.push(slice);
    start = end;
  }
  return b.group( slices, 'PieChart' );
};


b.go();