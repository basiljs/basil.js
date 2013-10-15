#targetengine basiljs

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';


var dialog;

// var uiConfig = {
//   theButton: {
//     type: 'button',
//     label: 'Button',
//     value: 'Click Me!',
//     onClick: function(value) {
//       b.println( 'My Button was clicked ' + value + ' time(s)' );
//     }
//   }
// };



function setup() {

  // dialog = new b.ui.palette(
  //   'Button Example',
  //   uiConfig
  // );

  dialog = new b.ui.dialog( b.PALETTE, 'Button Example' );
  dialog.add('button', 'theButton', 'ClickMe!', {
    label: 'Button',
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
