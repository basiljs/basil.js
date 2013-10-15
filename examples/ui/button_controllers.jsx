/**
 * 
 * Buttons
 * 
 */

#targetengine basiljs

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';


var dialog;

// var controllersConfig = {
//   theButton: {
//     type: 'button',
//     label: 'The Label',
//     value: 'Click Me!',
//     onClick: function(value) {
//       b.println( 'My Button was Clicked ' + value + ' time(s)' );
//     }
//   }
// };



function setup() {

  // dialog = new b.ui.palette(
  //   'Button Example',
  //   controllersConfig
  // );

  dialog = new b.ui.dialog( b.PALETTE, 'Button Example' );
  dialog.add('button', 'theButton', 'ClickMe!', {
    onClick: function(value) {
      b.println( 'Button was Clicked ' + value + ' time(s)' );
    }
  });

};

function draw() {
};

function update() {
};



b.go();
