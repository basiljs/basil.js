/**
 * 
 * Interface Debugging
 * 
 */
#targetengine 'loop';



// ------------------------------------------------------------------------
// Libraries
// ------------------------------------------------------------------------
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/interface.jsx';



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var dialog;

// values
var values = {
};


// controllers
var controllers = {
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {
  dialog = new Interface.Palette('test', controllers, values);
};

// ------------------------------------------------------------------------
function draw() {
};


b.go();

