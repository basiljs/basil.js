
#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

var s = 50; // size of the visual elements
var step = 2;

function setup() {

//~ http://api.openweathermap.org/data/2.5/forecast/daily?q=Basel&units=metric&mode=json&APPID=61f2e9b2e7a07508bdfd51cf91e132d9
// http://jsonviewer.stack.hu

}

function draw() {
  
  b.stroke(0);
  b.strokeWeight(0.1);
  b.noFill();
  
  var jsonString = b.loadString("http://api.openweathermap.org/data/2.5/forecast/daily?q=Basel&units=metric&mode=json&APPID=61f2e9b2e7a07508bdfd51cf91e132d9");
  var data = b.JSON.decode(jsonString);
  data = data.list;

  v1 = b.round(b.map( data[0].temp.max, 0, 100, 0, 100 ));
  v2 = b.round(b.map( data[0].humidity, 0, 100, 0, 100 ));
  v3 = b.round(b.map( data[0].speed, 0, 100, 0, 100));  

  b.translate( b.width/2, b.height/2 );

  generateText(data[0].temp.max + " °C\n" + data[0].humidity + " %\n" + data[0].speed + " m/s");
  generate(v1, v2, v3);

}

function generate(v1, v2, v3) {
  
  generate1(v1);
  generate2(v2);
  generate3(v3);  
  
}

function generateText(text){
  
  b.textAlign(Justification.CENTER_ALIGN);
  b.textFont("Helvetica Neue", "Light");
  b.textSize(8);  
  b.fill(0);
  b.text(text, -s/2, s/2+60, s, 30 );
  
}


function generate1(v1){
  
  b.stroke(0);
  b.noFill();
  b.pushMatrix();
  b.rotate( b.radians(45) );
  b.translate(-s/2, 0);
  b.translate( s/2, s/2 );
  for( var n = 0; n <= v1; n++) {
    
    b.line( 0, -s/2, 0, s/2);    
    b.translate(s/v1, 0);
  }

  b.popMatrix();
  
}


function generate2(v2){
  
  b.stroke(0);
  b.noFill();
  b.pushMatrix();
  b.rotate( b.radians(-45) );
  b.translate(-s/2, 0);
  b.translate( s/2, -s/2 );
  for( var n = 0; n <= v2; n++) {
    
    b.line( 0, -s/2, 0, s/2);    
    b.translate(s/v2, 0);
  }

  b.popMatrix(); 
  
}

function generate3(v3){

  b.stroke(0);
  b.noFill();
  b.ellipseMode(b.CENTER);
  
  var start = step;

  var diag = b.dist(0, 0, s, s);
  
  for( var n = 0; n < v3; n++) {
    b.ellipse(0, 0, (n+1) * diag/v3, (n+1) * diag/v3);
  }    

}




b.go();
