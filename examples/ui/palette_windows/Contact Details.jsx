/**
 *
 * Prompt Interface Window Example
 *
 */

#targetengine basiljs



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

var output = [];

var uiConfig = {
  firstName: {
    type: 'textfield',
    label: 'First Name',
    value: 'Anthony'
  },
  lastName: {
    type: 'textfield',
    label: 'Last Name',
    value: 'Other'
  },
  email: {
    type: 'textfield',
    label: 'Email Address',
    value: 'a.other@email.com'
  }
};



function setup() {
  // define the interface palette window
  dialog = new b.ui.palette(
    // title of the dialog
    'Contact Form',
    // the array of defined controllers
    uiConfig
  );

  b.textAlign(Justification.CENTER_ALIGN, VerticalJustification.CENTER_ALIGN);

  // create text boxes
  output[0] = b.text( dialog.firstName, b.width/2-150, 100, 300, 80);
  output[1] = b.text( dialog.lastName,  b.width/2-150, 180, 300, 80);
  output[2] = b.text( dialog.email,     b.width/2-150, 260, 300, 80);
};

function draw() {
};

function update() {
  // live update from our prompt
  output[0].contents = dialog.firstName;
  output[1].contents = dialog.lastName;
  output[2].contents = dialog.email;
};



b.go();
