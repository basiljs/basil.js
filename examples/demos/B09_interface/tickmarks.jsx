
#targetengine 'bbbbasiljs';
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/control/control.jsx';


var h = 1;
var n = 60;

var myDlg;
var length = 15;
var rot = 0;


function setup() {

  myDlg = control.palette('Tickmarks');
  // myDlg.onClose = function() {
  //   b.remove( b.layer('generated') );
  // };
  
  myDlg.add(
    'slider',   // type
    'slider1',  // variable name
    length,     // initial value
    // properties
    {
      label: 'Length',
      range: [0, 100],
      valueLabel: true
    }
  );
  
  myDlg.add(
    'slider',   // type
    'slider2',  // variable name
    rot,        // initial value
    // properties
    {
      label: 'Rotation',
      range: [0, 180],
      valueLabel: true
    }
  );

};

function draw() {
  
  b.layer('generated');
  b.canvasMode(b.PAGE);

  b.translate(b.width / 2, b.height / 2);
  b.rectMode(b.CENTER);

  b.noStroke();
  b.fill(0);   
  
};

function update() {

  length = b.floor(myDlg.slider1);
  rot = b.floor(myDlg.slider2);

  redraw();
  
};


function redraw() {
  
  b.clear(b.layer('generated'));

  for( var i = 0; i < n; i++ ) {

    b.rotate( b.TWO_PI / n );
    b.pushMatrix( );
    b.translate( 100, 0 );
    b.rotate( b.radians(rot) );
    b.rect( 0, 0, length, h );
    b.popMatrix( );
  
  }

};


b.go();
