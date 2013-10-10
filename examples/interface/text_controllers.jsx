/**
 * 
 * Texts
 * 
 */

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
var palette;

// This Array is fed into the Interface constructor
// and determines what controllers are shown, using a
// limited list of attributes.
// 
// the name i.e. myLabel: is used to access the 
// controller's output value
var controllers = {

  myText: {
    // properties
    // declare the controller type
    type: 'text',
    // this is the label that appears to the left
    // of the text controller - can be any string
    label: 'My Single-line Text',
    // declare the initial value of the text
    value: 11.15,
    // declare the return value of the checkbox, optional (default: 'string')
    valueType: 'float',
    // declare the width of the text controller as characters, optional (default: 22)
    length: 5,
    // or declare the width of the text controller in pixels, optional (default: ---)
    // width: 30,

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the text controller is clicked this is called
      b.println( 'My Single-line Text was Clicked ' + value );
    },
    onChange: function(value) {
      // after the text controller has been changed this is called
      b.println( 'My Single-line Text was Changed ' + value );
    },
    onChanging: function(value) {
      // as the text controller is being modified this is called
      b.println( 'My Single-line Text is being Changed ' + value );
    }

  },

  myMultiText: {
    // properties
    // declare the controller type
    type: 'text',
    // this is the label that appears to the left
    // of the text controller - can be any string
    label: 'My Multi-line Text',
    value: 'multiline text',
    // a multi-line text controller is possible
    multiline: true,
    // how many rows tall (lines) is the text controller
    rows: 3,
    // how many columns wide (character) is the text controller
    columns: 10,

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the text controller is clicked this is called
      b.println( 'My Multi-line Text was Clicked ' + value );
    },
    onChange: function(value) {
      // after the text controller has been changed this is called
      b.println( 'My Multi-line Text was Changed ' + value );
    },
    onChanging: function(value) {
      // as the text controller is being modified this is called
      b.println( 'My Multi-line Text is being Changed ' + value );
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
    'Inteface Texts Example',
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
