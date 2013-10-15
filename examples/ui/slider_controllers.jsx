/**
 * 
 * Sliders
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
var circles = [];


// create a variable for the interface control palette window
var palette;

// create an associative array to define the individual
// controllers to created within the palette window
var controllersConfig = {

  // mySlider is the name of the slider variable
  mySlider: {
    // properties
    // declare the controller type
    type: 'slider',
    // this is the label that appears to the left
    // of the slider controller - can be any string
    label: 'My Slider Controller',
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
      myFunction();
    }
  },

};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  // define the interface palette window
  palette = new control.palette(
    // title of the dialog
    'Inteface Slider Example',
    // the array of defined controllers
    controllers
  );

  // controllers can also be added after the
  // control interface window has been initiated
  palette.add('slider', 'mySliderWidth', 50, {
    // properties can be passed within add()
    label: 'Circle Width',
    range: [1, b.width],
    valueLabel: true
  });
  palette.add('slider', 'mySliderHeight', 50, {
    // properties can be passed within add()
    label: 'Circle Height',
    range: [1, b.height],
    valueLabel: true
  });

};


// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {

  b.noStroke();

  // create a simple grid of circles
  var n = 2;
  for( var y=0; y<n; y++ ) {
    for( var x=0; x<n; x++ ) {
      // fill with a random RGB color
      b.fill( 
        parseInt(b.random(255)),
        parseInt(b.random(255)),
        parseInt(b.random(255))
      );
      circles[y*n+x] = b.ellipse(x * 60, y * 60, 50, 50);
    }
  }

  b.ellipseMode(b.CENTER);
  b.translate(b.width/2, b.height/2);

  b.group(circles, 'circles');

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
/*
 *  update function is called by all controllers onChanging() and onChange() callback
 *  this is optional, and not required for using interface components
 */
function update() {

  forEach(circles, function(item, i){
    var x = palette.mySliderWidth;
    var y = palette.mySliderHeight;
    b.itemSize( item, x,y );
  });

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/*
 *  this function is only called when mySlider is changed/ -ing
 *  because it was declared within the callback of mySlider
 */
function myFunction() {

  forEach(circles, function(item, i){
    b.itemPosition(item, b.itemX(item), i*palette.mySlider);
  });

};



b.go();
