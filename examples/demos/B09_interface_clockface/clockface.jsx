
#targetengine 'basiljs'
#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/control/control.jsx';


var h = 1;
var n = 60;

var myDlg;
var length = 15;
var rot = 0;


function setup() {

  myDlg = control.palette('Clock Deformer');
  myDlg.onClose = function() {
    b.remove( b.layer('generated') );
  };
  
  myDlg.add('slider', 'slider1', 0, {
    label: 'Length',
    range: [0, 50],
    value: length,
    valueLabel: true
  });
  
  myDlg.add('slider', 'slider2', 0, {
    label: 'Rotation',
    range: [0, 180],
    value: rot,
    valueLabel: true
  });

};

function draw() {
  
  b.layer('generated');
  b.canvasMode(b.PAGE);

  b.translate(b.width / 2, b.height / 2);
  b.rectMode(b.CENTER);

  b.noStroke();
  b.fill(0);   
  
  drawClock();

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
