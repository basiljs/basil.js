#targetengine basiljs

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';


var dialog;

// var uiConfig = {
//   theTextfield: {
//     type: 'textfield',
//     label: 'Textfield',
//     value: 15.11,
//     valueType: 'float', // optional 'float', 'int', or (default) 'string'
//     onChanging: function(value) {
//       b.println( 'My Textfield is changing ' + value );
//     }
//   },
//   theTextfieldMulti: {
//     type: 'textfield',
//     label: 'Textfield',
//     value: 20.12,
//     valueType: 'float', // optional 'float', 'int', or (default) 'string'
//     multiline: true,
//     rows: 3,
//     onChanging: function(value) {
//       b.println( 'My Textfield Multi-line is changing ' + value );
//     }
//   }
// };



function setup() {

  // dialog = new b.ui.palette(
  //   'Textfield Number Example',
  //   uiConfig
  // );

  dialog = new b.ui.dialog( b.PALETTE, 'Textfield Number Example' );
  dialog.add('textfield', 'theTextfield', 15.11, {
    label: 'Textfield',
    // valueType: 'float', // optional 'float', 'int', or (default) 'string'
    onChanging: function(value) {
      b.println( 'My Textfield is changing ' + value );
    }
  });
  dialog.add('textfield', 'theTextfieldMulti', 20.12, {
    label: 'Textfield',
    // valueType: 'float', // optional 'float', 'int', or (default) 'string'
    multiline: true,
    rows: 3,
    onChanging: function(value) {
      b.println( 'My Textfield Multi-line is changing ' + value );
    }
  });


};

function draw() {
};

function update() {
};



b.go();
