/**
 *
 * Interface Example 
 * Draw Pie Charts
 * 
 */
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/interface.jsx';


// values
var values = {
  myLabel: 'Vestibulum id ligula porta felis euismod semper.',
  myText: 'text',
  myMultiText: 'multiline text',

  myCheckbox: false,
  myRadio: 'Option 1',
  mySlider: 25,

  myDropdown: 'two',
  myButton: 'Go! Go! Go!',

  myProgress: 75
};


// controllers
var controllers = {
  radius: {
    label: 'Radius (points)',
    type: 'text',
    value: 300,
    length: 10
  },

  chartData: {
    label: 'Values CSV - total must not exceed 100',
    type: 'text',
    value: '2.77, 8.33, 9.72, 10.55, 12.5, 16.66, 20.83, 18.61',
    length: 10
  }

};



// instance of of the Interface must be global
var dialog;



// ------------------------------------------------------------------------
function setup() {
  dialog = new Interface.Prompt('Pie Charts', controllers, values);
};



// ------------------------------------------------------------------------
function draw() {
  // also see examples/arc.jsx

  // b.println( dialog.radius.text );
  var radius = parseInt( dialog.radius.text );

  // b.println( dialog.chartData.text );
  // parse the interface output into an array
  // that the our PieChart method can use
  var data = [];
  var chartDataArr = dialog.chartData.text.split(',');
  for( var n=0; n<chartDataArr.length; n++ ) {
    data.push( parseFloat( chartDataArr[n] ) );
  }
  // b.println( data );

  // draw some pie!
  b.noStroke();
  var pie = PieChart( b.width/2, b.height/2, radius, data );
};



// ------------------------------------------------------------------------
/**
 *  Draw a Pie Chart
 * 
 *  @param {Number} cx     y-coordinate of the pie chart's center
 *  @param {Number} cy     y-coordinate of the pie chart's center
 *  @param {Number} radius radius of pie chart
 *  @param {Array} data    array of data, values total must not exceed 100
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



b.go();