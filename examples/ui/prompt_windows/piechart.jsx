/**
 *
 * Prompt Interface Window Example
 *
 */

#targetengine bfgdhfsrasiljs



//
//  Includes
//
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';



//
// Properties
//

// create a variable for the interface control palette window
var dialog;

var swatches = b.doc().swatches.everyItem().name.unique();

var uiConfig = {
  radius: {
    type: 'textfield',
    label: 'Radius (points)',
    value: 300,
    valueType: 'float',
    length: 10,
  },

  colorsList: {
    type: 'dropdown',
    label: 'Colors',
    items: swatches,
    value: 'Black'
  },

  chartData: {
    type: 'textfield',
    label: 'Values CSV - total must not exceed 100',
    value: '2.77, 8.33, 9.72, 10.55, 12.5, 16.66, 20.83, 18.61',
    length: 10
  }

};



function setup() {

  dialog = b.ui.prompt( 'Pie Chart', uiConfig );

};



function draw() {
  // parse the interface output into an array
  // that the PieChart method can use
  var dataset = [];
  var chartDataArr = dialog.chartData.split(',');
  for( var n=0; n<chartDataArr.length; n++ ) {
    dataset.push( parseFloat( chartDataArr[n] ) );
  }

  // draw some pie!
  b.noStroke();
  b.fill( dialog.colorsList );
  PieChart( b.width/2, b.height/2, dialog.radius, dataset );

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