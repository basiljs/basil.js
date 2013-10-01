/**
 *
 * Whole Ball of Wax
 * Example of all (current) possible interface controllers
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
  // buttons
  myButton: {
    label: 'My Button',
    type: 'button',
    value: 'Go! Go! Go!',
    onClick: function() {
      b.println( this.name );
    }
  },

  myCheckbox: {
    label: 'My Checkbox',
    type: 'checkbox'
  },

  myRadio: {
    label: 'My Radio',
    type: 'radio',
    values: ['Option 1', 'Option 2', 'Option 3']
  },


  // text
  myLabel: {
    label: 'My Label',
    type: 'label',
    value: 'Vestibulum id ligula porta felis euismod semper.'
  },

  myText: {
    label: 'My Single-line Text',
    type: 'text',
    value: 'text',
    length: 10
  },

  myMultiText: {
    label: 'My Multi-line Text',
    type: 'text',
    value: 'multiline text',
    multiline: true,
    rows: 3,
    columns: 10
  },


  // range
  
  // in order to update progress bar the window
  // update function must be called:
  // var myDialog = control.palette('My Dialog');
  // myDialog.update();
  myProgress: {
    label: 'My Progress',
    type: 'progress',
    range: [0, 100],
    value: 75
  },

  mySlider: {
    label: 'My Slider',
    type: 'slider',
    range: [25, 300]
  },


  // list
  myDropdown: {
    label: 'My List',
    type: 'dropdown',
    values: ['one','two','three']
  },


  // organization
  mySeparator: {
    label: 'My Seperator',
    type: 'separator',
    // width: 100
  }

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {
  // // uncomment to create a Prompt window
  // dialog = new control.prompt('The Whole Ball of Wax', controllers);

  // uncomment to create a Palette window
  dialog = new control.palette('The Whole Ball of Wax', controllers);

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

};



b.go();
