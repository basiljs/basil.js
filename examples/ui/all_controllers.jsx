/**
 *
 * Whole Ball of Wax
 * Example of all (current) possible interface controllers
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



//
// Properties
//

// create a variable for the interface control palette window
var dialog;

var output = [];

// This Array is fed into the Interface constructor
// and determines what controllers are shown, using a
// limited list of attributes.
// 
// the name i.e. myLabel: is used to access the 
// controller's output value
var uiConfig = {
  // buttons
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
    value: 'Go! Go! Go!',
    // set the width of the button (full == fit to window width)
    width: 'full',

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the button controller is clicked this is called
      // this is only available within the buttons onClick callback
      b.println( 'My Button was Clicked ' + value + ' time(s)' );
    }
  },

  myCheckbox: {
    // properties
    // declare the controller type
    type: 'checkbox',
    // this is the label that appears to the left
    // of the checkbox controller - can be any string
    label: 'My Checkbox',
    // declare the initial value of the checkbox, optional (default: false)
    value: true,
    // declare the return value of the checkbox, optional (default: boolean) 'int' = 0 (false) || 1 (true)
    // valueType: 'int',

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the checkbox controller is clicked this is called
      b.println( 'My Checkbox was Clicked ' + value );
    }

  },

  // text
  myText: {
    // properties
    // declare the controller type
    type: 'textfield',
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
    type: 'textfield',
    // this is the label that appears to the left
    // of the text controller - can be any string
    label: 'My Multi-line Text',
    // declare the initial value of the text
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
  },


  // range
  mySlider: {
    // properties
    // declare the controller type
    type: 'slider',
    // this is the label that appears to the left
    // of the slider controller - can be any string
    label: 'My Slider',
    // declare the range of the slider controller
    range: [0, 100],
    // declare the initial value of the slider, optional (default: [0.0, 1.0])
    value: 0,
    // declare the width of the slider, optional (default: optimal width)
    // width: 150,
    // show the current value of the slider, optional (default: false)
    valueLabel: true,

    // callbacks
    // not only can specific properties of controller, but
    // certain callbacks can be defined as well
    onClick: function(value) {
      // if the slider controller is clicked this is called
      b.println( 'My Slider was Clicked ' + value );
    },
    onChange: function(value) {
      // after the slider has been moved this is called
      b.println( 'My Slider was Changed ' + value );
    },
    onChanging: function(value) {
      // as the slider is moving this is called
      b.println( 'My Slider is being Changed ' + value );
    }
  },


  // organization
  mySeparator: {
    // properties
    // declare the controller type
    type: 'separator',
    // declare the width of the separator, optional (default: optimal width)
    // width: 100
  }

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  // define the interface palette window
  dialog = new b.ui.palette(
    // title of the dialog
    'The Whole Ball of Wax',
    // the array of defined controllers
    controllers
  );


  b.textAlign(Justification.CENTER_ALIGN, VerticalJustification.CENTER_ALIGN);

  // create text boxes
  output[0] = b.text( dialog.myButton,    b.width/2-150, 100, 300, 80);
  output[1] = b.text( dialog.myButton2,   b.width/2-150, 180, 300, 80);
  output[2] = b.text( dialog.myCheckbox.toString(),  b.width/2-150, 260, 300, 80);
  output[3] = b.text( dialog.myText.toString(),      b.width/2-150, 340, 300, 80);
  output[4] = b.text( dialog.myMultiText,  b.width/2-150, 420, 300, 80);
  output[5] = b.text( dialog.mySlider.toString(),    b.width/2-150, 500, 300, 80);
  output[6] = b.text( dialog.mySeparator,    b.width/2-150, 580, 300, 80);

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

  // live update from our palette
  output[0].contents = dialog.myButton;
  output[1].contents = dialog.myButton2;
  output[2].contents = dialog.myCheckbox.toString();
  output[3].contents = dialog.myText.toString();
  output[4].contents = dialog.myMultiText;
  output[5].contents = dialog.mySlider.toString();
  output[6].contents = dialog.mySeparator;

};



b.go();
