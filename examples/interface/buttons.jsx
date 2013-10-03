/**
 * 
 * Buttons
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

  myButton: {
    // properties
    // declare the controller type
    type: 'button',
    // this is the label that appears to the left
    // of the button controller - can be any string
    label: 'My Button',
    // for buttons the value is the string on the button
    value: 'Go! Go! Go!',

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the button controller is clicked this is called
      // this is only available within the buttons onClick callback
      b.println( 'My Button was Clicked ' + value + ' time(s)' );
    }
  },

  myButton2: {
    // properties
    // declare the controller type
    type: 'button',
    // for buttons the value is the string on the button
    value: 'Click Me!',
    // certain controllers such as buttons can take
    // the full width of the interface window
    width: 'full',

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the button controller is clicked this is called
      // this is only available within the buttons onClick callback
      b.println( 'My second Button was Clicked ' + value + ' time(s)' );
    }
  },
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  // define the interface palette window
  palette = new control.palette(
    // title of the palette window
    'Inteface Buttons Example',
    // the array of defined controllers
    controllers
  );

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
/*
 *  update function is called by all controllers onChanging() and onChange() callback
 *  this is optional, and not required for using interface components
 */
function update() {

};



b.go();
