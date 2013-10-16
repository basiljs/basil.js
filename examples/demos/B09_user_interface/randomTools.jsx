/**
 *
 * Random Tools
 * A palette for generating random(good)ness
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
var uiConfig = {

  //
  // stroke
  //
  stroke: { 
    type:  'checkbox',
    label: 'Stroke',
    value: false,
  },

  strokeMin: {
    type:      'text',
    label:     'min',
    value:     0.25,
    valueType: 'float',
    // enabled: false
  },

  strokeMax: {
    type:      'text',
    label:     'max',
    value:     48.0,
    valueType: 'float',
    // enabled: false
  },

  strokeRule: { 
    type: 'separator',
    width: 'full'
  },


  //
  // color
  //
  color: { 
    type: 'checkbox',
    label: 'Color',
    value: false,
    onChange: function(value) {
    }
  },

  // apply to fills
  colorFill: {
    type: 'checkbox',
    label: 'Fills',
    value: true
  },
  // apply to stroke
  colorStroke: {
    type: 'checkbox',
    label: 'Strokes',
    value: false
  },

  // use swatches
  colorSwatches: {
    type: 'checkbox',
    label: 'Document Swatches',
    value: true
  },

  color_c_min:  {
    type: 'slider',
    label: 'Cyan',
    value: 0,
    range: [0, 100]
  },
  color_c_max:  {
    type: 'slider',
    value: 100,
    range: [0, 100]
  },

  color_m_min:  {
    type: 'slider',
    label: 'Magenta',
    value: 0,
    range: [0, 100]
  },
  color_m_max:  {
    type: 'slider',
    value: 100,
    range: [0, 100]
  },

  color_y_min:  {
    type: 'slider',
    label: 'Yellow',
    value: 0,
    range: [0, 100]
  },
  color_y_max:  {
    type: 'slider',
    value: 100,
    range: [0, 100]
  },

  color_k_min:  {
    type: 'slider',
    label: 'Black',
    value: 0,
    range: [0, 100]
  },
  color_k_max:  {
    type: 'slider',
    value: 100,
    range: [0, 100]
  },

  colorRule: { 
    type: 'separator',
    width: 'full'
  },


  //
  // transparency
  //
  transparency: { 
    type: 'checkbox',
    label: 'Opacity',
    value: false,
    onChange: function(value) {
    }
  },

  transparencyMin:  {
    type: 'slider',
    label: 'min',
    value: 0,
    range: [0, 100]
  },
  transparencyMax:  {
    type: 'slider',
    label: 'max',
    value: 100,
    range: [0, 100]
  },

  transparencyRule: { 
    type: 'separator',
    width: 'full'
  },


  // 
  // Invocation
  // 
  submit: { 
    type: 'button', 
    value: 'Apply',
    width: 'full',
    onClick: function() {
      apply();
    }
  }



};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {
  // set color mode to CMYK
  b.colorMode(b.CMYK);

  // create the dialog palette
  palette = new control.dialog(b.PALETTE, 'Random Tools', controllers);
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

  b.selections(function(item, i){
    //
    //  stroke
    //
    if( palette.stroke ) {
      item.strokeWeight = b.random( palette.strokeMin, palette.strokeMax );
    }

    //
    //  color
    //
    if( palette.color ) {
      var color;
      if( palette.colorSwatches ) {
        // pull a random swatch, start with swatch 3 (typically black)
        color = randomSwatch(3);
      }
      else {
        // generate random color based on slider input
        color = b.color(
          parseInt( b.random( palette.color_c_min, palette.color_c_max ) ),
          parseInt( b.random( palette.color_m_min, palette.color_m_max ) ),
          parseInt( b.random( palette.color_y_min, palette.color_y_max ) ),
          parseInt( b.random( palette.color_k_min, palette.color_k_max ) )
        );
      }
      // fill selection with above color
      if( palette.colorFill )   item.fillColor = color;
      // stroke selection with above color
      if( palette.colorStroke ) item.strokeColor = color;
    }

    //
    //  transparency
    //  
    if( palette.transparency ) {
      b.opacity( item, b.random( palette.transparencyMin,palette.transparencyMax ) );
    }

 });

};


// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function randomSwatch(start) {
  return b.doc().swatches[ parseInt( b.random(start,b.doc().swatches.length) ) ];
};



b.go();
