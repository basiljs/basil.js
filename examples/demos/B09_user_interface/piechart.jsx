// Basil.js target engine is initiate this keeps global variables
// active as long as the InDesign is running
#targetengine basiljs



//
//  Includes
//
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/control/control.jsx';



//
// Properties
//

// create a variable for the interface control palette window
var dialog;

// create an associative array to define the individual
// controllers to created within the palette window
var uiConfig = {

  // radius is the name of the text variable
  radius: {
    // declare the controller type
    type: 'text',
    // this is the label that appears to the left
    // of the slider controller - can be any string
    label: 'Radius (points)',
    // declare the initial value
    value: 300,
    // define the type of output ('float', int', 'string', default (for type: 'text'): 'string')
    valueType: 'float',
    // declare the width of the text box, optional (default: optimal width)
    length: 10,
  },

  // chartData is the name of the text variable
  chartData: {
    type: 'text',
    label: 'Values CSV - total must not exceed 100',
    value: '2.77, 8.33, 9.72, 10.55, 12.5, 16.66, 20.83, 18.61',
    length: 10
  }

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {
  
  // define the interface prompt
  dialog = new control.prompt(
    // title of the dialog
    'Pie Chart',
    // the array of defined controllers
    controllers
  );

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {
  // also see examples/shape/arc.jsx

  var radius = dialog.radius;

  // parse the interface output into an array
  // that the PieChart method can use
  var dataset = [];
  var chartDataArr = dialog.chartData.split(',');
  for( var n=0; n<chartDataArr.length; n++ ) {
    dataset.push( parseFloat( chartDataArr[n] ) );
  }

  // draw some pie!
  b.noStroke();

  b.noStroke();
  var randomSwatch = b.doc().swatches[ parseInt( b.random(3,b.doc().swatches.length) ) ].name;
  b.fill( randomSwatch );

  var pie = PieChart( b.width/2, b.height/2, radius, dataset );
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
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