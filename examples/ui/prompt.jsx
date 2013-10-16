#targetengine basiljsABC

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';


var dialog;

// var uiConfig = {
//   theTextfield: {
//     type: 'textfield',
//     label: 'Textfield',
//     value: 'Single-line Textfield',
//     onChanging: function(value) {
//       b.println( 'My Textfield is changing ' + value );
//     }
//   }
//   theTextfieldMulti: {
//     type: 'textfield',
//     label: 'Textfield',
//     value: 'Multi-line Textfield',
//     multiline: true,
//     rows: 3,
//     onChanging: function(value) {
//       b.println( 'My Textfield Multi-line is changing ' + value );
//     }
//   }
// };


function setup() {

  // dialog = new b.ui.prompt(
  //   'Textfield String Example',
  //   uiConfig
  // );

  dialog = new b.ui.dialog( b.PROMPT, 'Textfield String Example' );
  dialog.add('textfield', 'theTextfield', 'Single-line Textfield', {
    label: 'Textfield',
    onChanging: function(value) {
      b.println( 'My Textfield is changing ' + value );
    }
  });
  dialog.add('textfield', 'theTextfieldMulti', 'Multi-line Textfield', {
    label: 'Textfield',
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
