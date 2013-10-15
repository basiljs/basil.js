/**
 * 
 * Checkbox
 * 
 */

#targetengine basiljs

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';


var dialog;

// var controllersConfig = {
//   theCheckbox: {
//     type: 'checkbox',
//     label: 'Checkbox',
//     value: 100,
//     onChange: function(value) {
//       b.println( 'My Checkbox has changed ' + value );
//     }
//   }
// };



function setup() {

  // dialog = new b.ui.palette(
  //   'Checkbox Example',
  //   controllersConfig
  // );

  dialog = new b.ui.dialog( b.PALETTE, 'Checkbox Example' );
  dialog.add('checkbox', 'theCheckbox', 100, {
    label: 'Checkbox',
    onChange: function(value) {
      b.println( 'My Checkbox has changed ' + value );
    }
  });

};

function draw() {
};

function update() {
};



b.go();
