/**
 * 
 * Checkboxes
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

// create a variable for the interface control palette window
var palette;

// This Array is fed into the Interface constructor
// and determines what controllers are shown, using a
// limited list of attributes.
// 
// the name i.e. myLabel: is used to access the 
// controller's output value
var controllers = {

  myCheckbox: {
    // properties
    // declare the controller type
    type: 'checkbox',
    // this is the label that appears to the left
    // of the checkbox controller - can be any string
    label: 'My Checkbox',
    // declare the initial value of the checkbox, optional (default: false)
    value: true,

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the checkbox controller is clicked this is called
      b.println( 'My Checkbox was Clicked ' + value );
    }

  },

  myCheckbox2: {
    // properties
    // declare the controller type
    type: 'checkbox',
    // this is the label that appears to the left
    // of the checkbox controller - can be any string
    label: 'My Other Checkbox',
    // declare the initial value of the checkbox, optional (default: false)
    value: true,
    // declare the return value of the checkbox, optional (default: boolean) 'int' = 0 (false) || 1 (true)
    valueType: 'int',

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the checkbox controller is clicked this is called
      b.println( 'My Checkbox was Clicked ' + value );
    }

  }

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  // define the interface palette window
  palette = new control.palette(
    // title of the dialog
    'Inteface Checkboxes Example',
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

  b.translate(b.width / 2, b.height / 2);
  b.ellipseMode(b.CENTER);

  update();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
/*
 *  update function is called by all controllers onChanging() and onChange() callback
 *  this is optional, and not required for using interface components
 */
function update() {

  b.clear( b.layer('generated') );

  if( palette.myCheckbox ) b.fill(0,255,0);
  else b.fill(255,0,0);

  b.ellipse( 0,-200, 200,200 );

  if( palette.myCheckbox2 ) b.fill(0,255,0);
  else b.fill(255,0,0);

  b.ellipse( 0,200, 200,200 );

};



b.go();
