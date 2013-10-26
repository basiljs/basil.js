#targetengine basiljs

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';


var dialog;

// var uiConfig = {
//   theSlider: {
//     type: 'slider',
//     label: 'Slider',
//     value: 100,
//     onChanging: function(value) {
//       b.println( 'My Slider is changing ' + value );
//     }
//   }
// };



function setup() {

  // dialog = new b.ui.palette(
  //   'Slider Example',
  //   uiConfig
  // );

  dialog = new b.ui.dialog( b.PALETTE, 'Slider Example' );
  // dialog.add('slider', 'theSlider', 100, {
  //   label: 'Slider',
  //   onChanging: function(value) {
  //     b.println( 'My Slider is changing ' + value );
  //   }
  // });

};

function draw() {
};

function update() {
};



b.go();
