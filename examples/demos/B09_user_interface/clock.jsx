#targetengine basiljs

#includepath '~/Documents/;%USERPROFILE%Documents';
#include 'basiljs/bundle/basil.js';
#include 'basiljs/bundle/lib/control/control.jsx';



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var myDlg;

var clock;
var clockDiameter = 250;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function setup() {

  myDlg = new b.ui.palette('Clock');
  // myDlg.onClose = function() {
  //   b.remove( b.layer('generated') );
  // };
  
  myDlg.add('slider', 'hour', b.hour(), {
    label: 'Hour',
    range: [0, 24],
    valueLabel: true,
    valueType: 'int'
  });
  
  myDlg.add('slider', 'minute', b.minute(), {
    label: 'Minute',
    range: [0, 60],
    valueLabel: true,
    valueType: 'int'
  });

  myDlg.add('slider', 'second', b.second(), {
    label: 'Second',
    range: [0, 60],
    valueLabel: true,
    valueType: 'int'
  });


};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function draw() {

  b.layer('generated');
  b.canvasMode(b.PAGE);

  update();
};


// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function update() {

  b.clear( b.layer('generated') );

  clock = new Clock( b.width/2,b.height/2, clockDiameter, {
    hour:   myDlg.hour,
    minute: myDlg.minute,
    second: myDlg.second
  });

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function Clock(centerX, centerY, diameter, time) {
  // properties
  centerX = (centerX != undefined) 
    ? centerX
    : 0;
  centerY = (centerY != undefined) 
    ? centerY
    : 0;
  var clockDiameter = (diameter != undefined)
    ? diameter
    : 50;

  time = (time != undefined)
    ? time
    : {hour: 2, minute: 30, second: 45};
  
  // Angles for Math.sin() and Math.cos() start at 3 o'clock;
  // subtract (Math.PI*0.5) to make them start at the top
  var hour = (time.hour > 12)
    ? (time.hour-12)
    : time.hour;
  var h = b.map( Math.abs(time.hour), 0, 12, 0, (Math.PI*2)) - (Math.PI*0.5);
  var m = b.map(time.minute, 0, 60, 0, (Math.PI*2)) - (Math.PI*0.5);
  var s = b.map(time.second, 0, 60, 0, (Math.PI*2)) - (Math.PI*0.5);

  var clock = [];
  
  // draw the clock 
  b.ellipseMode(b.CENTER);
  b.noFill();
  b.stroke(0);
  b.strokeWeight(3);
  var face = b.ellipse( centerX,centerY, clockDiameter,clockDiameter );
  clock.push( face );

  // hours hand
  var hoursDiameter = clockDiameter * 0.53;
  var hcenterX = centerX + Math.cos(h) * hoursDiameter/2;
  var hcenterY = centerY + Math.sin(h) * hoursDiameter/2;
  b.stroke(0);
  b.strokeWeight(3);
  // b.strokeCap(b.ROUND);
  var hours = b.line( centerX,centerY, hcenterX,hcenterY );
  clock.push( hours );

  // minutes hand
  var minutesDiameter = clockDiameter * 0.80;
  var mcenterX = centerX + Math.cos(m) * minutesDiameter/2;
  var mcenterY = centerY + Math.sin(m) * minutesDiameter/2;
  b.stroke(0);
  b.strokeWeight(3);
  // b.strokeCap(b.ROUND);
  var minutes = b.line( centerX,centerY, mcenterX,mcenterY );
  clock.push( minutes );

  // seconds hand
  var secondsDiameter = clockDiameter * 0.90;
  var scenterX = centerX + Math.cos(s) * secondsDiameter/2;
  var scenterY = centerY + Math.sin(s) * secondsDiameter/2;
  b.stroke(255,0,0);
  b.strokeWeight(1);
  // b.strokeCap(b.ROUND);
  var seconds = new b.line( centerX,centerY, scenterX,scenterY );
  clock.push( seconds );

};



b.go();
