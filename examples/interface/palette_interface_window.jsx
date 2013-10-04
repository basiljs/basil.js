/**
 *
 * Prompt Example
 * 
 */

// Basil.js target engine is initiate this keeps global variables
// active as long as the InDesign is running
#targetengine 'basiljs';



//
//  Includes
//
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/control/control.jsx';



//
// Properties
//

// create a variable for the interface control prompt
var dialog;

// This Array is fed into the Interface constructor
// and determines what controllers are shown, using a
// limited list of attributes.
// 
// the name i.e. myLabel: is used to access the 
// controller's output value
var controllers = {

  // text
  width: {
    // properties
    // declare the controller type
    type: 'text',
    // this is the label that appears to the left
    // of the text controller - can be any string
    label: 'Width',
    // declare the initial value of the text
    value: 100.0,
    // declare the return value of the checkbox, optional (default: 'string')
    valueType: 'float',
  },
  height: {
    type: 'text',
    label: 'Height',
    value: 100.0,
    valueType: 'float',
  },

  mySeparator: {
    type: 'separator',
  },

  myButton: {
    type: 'button',
    value: 'Create',
    width: 'full',

    onClick: function(value) {
      makeRectangle();
    }
  }

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  // define the interface palette window
  dialog = new control.palette(
    // title of the dialog
    'Rectangle Maker',
    // the array of defined controllers
    controllers
  );

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {

  b.layer('generated');
  b.canvasMode(b.PAGE);
  b.rectMode(b.CENTER);

  makeRectangle();

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function makeRectangle() {

  b.clear( b.layer('generated') );

  b.rect( b.width/2, b.height/2, dialog.width, dialog.height );

};



b.go();
