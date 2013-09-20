/**
 * 
 * Simple Live-Updating Slider
 * 
 */

/*
 *  global Basil.js targetengine
 */
#targetengine 'basiljs';



// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/interface-simple.jsx';



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var sel;
var dialog;


// controllers
var controllers = {

  mySlider1: {
    label: 'Slider1',
    type: 'slider',
    range: [0, 210],
    value: 100,
    onClick: function(value) {
      // $.writeln('onClick1' + value);
    },
    onChange: function(value) {
      // $.writeln('onChange1' + value);
    },
    onChanging: function(value) {
      doCircle();
    }
  },
  mySlider2: {
    label: 'Slider2',
    type: 'slider',
    range: [0, 297],
    value: 100,
    onClick: function(value) {
      // $.writeln('onClick2' + value);
    },
    onChange: function(value) {
      // $.writeln('onChange2' + value);
    },
    onChanging: function() {
      doCircle();
    }
  }

};

var circles = [];



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {
  // get selection
  sel = b.selections()[0];

  // create grid of circles
  b.noStroke();
  var n = 4;
  for( var y=0; y<n; y++ ) {
    for( var x=0; x<n; x++ ) {
      b.fill( b.random(255),b.random(255),b.random(255) );
      circles[y*n+x] = b.ellipse(x * 30, y * 30, 20, 20);
    }
  }

  // create interface palette
  dialog = new control.palette('test', controllers);
  dialog.add('slider', 'mySlider3', 25, {label: 'Slider3',range: [0,b.width]});
  dialog.add('slider', 'mySlider4', 25, {label: 'Slider4', range: [0,b.height]});
  dialog.add('slider', 'mySlider5', 100, {range: [0,500]});

  // let's remove a controller
  // because we can
  // b.delay(1000);
  // dialog.remove('mySlider5');

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {

  // untouched by our updating methods
  b.fill( 255,0,0 );
  b.rect( b.width/2-100,b.height/2-100, 200,200 )

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
/*
 *  update function is called by all controllers onChanging() and onChange() callback
 */
function update() {
  sel.move( [dialog.mySlider3, dialog.mySlider4] );
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function doCircle() {

 forEach(circles, function(item, i){
   b.itemSize( item, dialog.mySlider1, dialog.mySlider2 );
 });

};




b.go();

