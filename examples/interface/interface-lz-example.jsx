#targetengine "basiljs";
#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";


var myDlg;
var circles = new Array();



function setup() {

 b.noStroke();
 var n = 16;
 for(var y = 0; y < n; y++)
 for(var x = 0; x < n; x++) {
   circles[y*n+x] = b.rect(x * 30, y * 30, 20, 20);
 }

 myDlg = new Window('palette', 'size adjuster');
 myDlg.orientation = 'column';

 myDlg.slider1 = myDlg.add('slider', undefined, 'size');
 myDlg.slider1.minvalue = 0;
 myDlg.slider1.maxvalue = 100;
 myDlg.slider1.onChanging = doCircle;

 myDlg.show();

}

function doCircle() {

 forEach(circles, function(item, i){
   b.itemSize( item, myDlg.slider1.value, myDlg.slider1.value );
 });

}

function draw() {

//~   empty!

}


b.go();