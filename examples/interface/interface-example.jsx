/**
 *
 * Interface Example
 * 
 */

#targetengine 'loop';

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/interface.jsx';


// values
// TODO: This array to set defaults of controllers
// (names much match) as well as serve as the output
// of controllers
var values = {
  myLabel: 'Vestibulum id ligula porta felis euismod semper.',
  myText: 'text',
  myMultiText: 'multiline text',

  myCheckbox: false,
  myRadio: 'Option 2',
  mySlider: 25,
  myColor1: [0,255,170],
  myColor2: [0,100,100,0],
  myColor3: 'c71585',

  myDropdown: 'two',
  myButton: 'Go! Go! Go!',

  myProgress: 75
};


// controllers
// This Array is fed into the Interface constructor
// and determines what controllers are shown, using a
// limited list of attributes.
// 
// the name i.e. myLabel: is used to access the 
// controller's output value
// 
// Because the ScriptUI structure is so bloated, I
// agree with the Scriptographer model in that interfaces
// cannot be "designed" but rather controllers are simply
// designated and appear in a pre-determined (by us) design
// this pushes the focus to functionality
// 
var controllers = {
  myLabel: {
    label: 'Label',
    type: 'label',
    value: 'Vestibulum id ligula porta felis euismod semper.'
  },
  myText: {
    label: 'Single-line Text',
    type: 'text',
    value: 'text',
    length: 10
  },
  myMultiText: {
    label: 'Multi-line Text',
    type: 'text',
    value: 'multiline text',
    multiline: true,
    rows: 3,
    columns: 10
  },

  myCheckbox: {
    label: 'Checkbox',
    type: 'checkbox'
  },
  myRadio: {
    label: 'Radio',
    type: 'radio',
    values: ['Option 1', 'Option 2', 'Option 3']
  },
  mySlider: {
    label: 'Slider',
    type: 'slider',
    range: [25,300]
  },
  myColor1: {
    label: 'myColor1',
    type: 'color',
    size: 'large',
    colormode: 'rgb', // or b.colorMode()
    onClick: function() {
      $.writeln('myColor.onClick');
    }
  },
  myColor2: {
    label: 'myColor2',
    type: 'color',
    size: 'small',
    colormode: b.colorMode(),
  },
  myColor3: {
    label: 'myColor3',
    type: 'color',
    size: 'medium',
    colormode: 'hex'
  },

  myDropdown: {
    label: 'List',
    type: 'dropdown',
    values: ['one','two','three']
  },
  myButton: {
    label: 'Button',
    type: 'button',
    value: 'Go! Go! Go!',
    onClick: function() {
      b.println( this.name );
    }
  },

  myProgress: {
    label: 'Progress Bar',
    type: 'progress',
    range: [0,100],
    value: 75
  },

  mySeparator: {
    label: 'Seperator Label',
    type: 'separator'
  }

};

// instance of of the Interface must be global
var dialog;

// ------------------------------------------------------------------------
function setup() {
  // // uncomment to create a Prompt window
  // dialog = new Interface.Prompt('test', controllers, values);

  // uncomment to create a Palette window
  dialog = new Interface.Palette('test', controllers, values);

  // // uncomment for debugging 
  // // TODO: push output to values array
  // b.inspect( dialog );

  // // TODO: each controller outputs it's value as 'value'
  // // i.e.
  // // values.myCheckbox = false;
  // // values.myText = 'Text';
  // // etc...
  // b.inspect( dialog.myCheckbox );
  // b.inspect( dialog.myDropdown );
  // b.inspect( dialog.myButton );
  // b.inspect( dialog.myText );
  // b.inspect( dialog.myMultiText );

};

// ------------------------------------------------------------------------
function draw() {

  // for now I've only hooked up the Slider control
  var mySelection = b.selections();
  for (var i = 0; i < mySelection.length; i++) {
    b.itemWidth(mySelection[i], dialog.mySlider.value);
    b.itemHeight(mySelection[i], dialog.mySlider.value);
  };

  dialog.myProgress.value = dialog.mySlider.value/300*100;

};


// b.go();

// right now in order to get real-time values
// from a Palette, we have to run in loop() mode
// ideally it would be nice to not have to rely
// on this for real-time updating
b.loop();