/**
 *
 * Prompt Interface Window Example
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

// create a variable for the interface control prompt
var dialog;

var output = [];

// This Array is fed into the Interface constructor
// and determines what controllers are shown, using a
// limited list of attributes.
// 
// the name i.e. myLabel: is used to access the 
// controller's output value
var controllers = {

  // text
  firstName: {
    // properties
    // declare the controller type
    type: 'text',
    // this is the label that appears to the left
    // of the text controller - can be any string
    label: 'First Name',
    // declare the initial value of the text
    value: '',
  },
  lastName: {
    type: 'text',
    label: 'Last Name',
    value: '',
  },
  email: {
    type: 'text',
    label: 'E-mail',
    value: '',
  }

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  // define the interface palette window
  dialog = new control.prompt(
    // title of the dialog
    'Please Enter Your Contact Details',
    // the array of defined controllers
    controllers
  );

  b.textAlign(Justification.CENTER_ALIGN, VerticalJustification.CENTER_ALIGN);

  // create text boxes
  output[0] = b.text( dialog.firstName, b.width/2-150, 100, 300, 80);
  output[1] = b.text( dialog.lastName,  b.width/2-150, 180, 300, 80);
  output[2] = b.text( dialog.email,     b.width/2-150, 260, 300, 80);

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function update() {

  // live update from our prompt
  output[0].contents = dialog.firstName;
  output[1].contents = dialog.lastName;
  output[2].contents = dialog.email;

};



b.go();
