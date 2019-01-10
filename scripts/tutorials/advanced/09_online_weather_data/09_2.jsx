// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

var s = 50; // size of the visual elements
var step = 2;
var cellFactor = 1.8;

function draw() {

  stroke(0);
  strokeWeight(0.1);
  noFill();

  var jsonString = loadString("http://api.openweathermap.org/data/2.5/forecast/daily?q=Basel&units=metric&mode=json&APPID=61f2e9b2e7a07508bdfd51cf91e132d9");
  var data = JSON.parse(jsonString);
  data = data.list;

  var v1, v2, v3;

  translate(width / 2, height / 2); // perfect center
  translate(-cellFactor * s * (5 - 1) / 2, 0); // horizontal offset to the left

  for(var i = 0; i < 5; i++) {

    v1 = round(map(data[i].temp.max, 0, 100, 0, 100));
    v2 = round(map(data[i].humidity, 0, 100, 0, 100));
    v3 = round(map(data[i].speed, 0, 100, 0, 100));

    generateText(data[i].humidity + " %\n" + data[i].speed + " m/s\n" + data[i].temp.max + " °C");

    generate(v1, v2, v3);
    translate(cellFactor * s, 0);
  }

}

function generate(v1, v2, v3) {

  generate1(v1); // bottom, temp.max
  generate2(v2); // top, humidity
  generate3(v3); // middle, speed

}

function generateText(string) {

  textAlign(Justification.CENTER_ALIGN);
  textFont("Helvetica Neue", "Light");
  textSize(8);
  fill(0);
  text(string, -s / 2, s / 2 + 60, s, 30);

}


function generate1(v1) {

  stroke(0);
  noFill();
  pushMatrix();
  rotate(radians(45));
  translate(-s / 2, 0);
  translate(s / 2, s / 2);
  for(var n = 0; n <= v1; n++) {

    line(0, -s / 2, 0, s / 2);
    translate(s / v1, 0);
  }

  popMatrix();

}


function generate2(v2) {

  stroke(0);
  noFill();
  pushMatrix();
  rotate(radians(-45));
  translate(-s / 2, 0);
  translate(s / 2, -s / 2);
  for(var n = 0; n <= v2; n++) {

    line(0, -s / 2, 0, s / 2);
    translate(s / v2, 0);
  }

  popMatrix();

}

function generate3(v3) {

  stroke(0);
  noFill();
  ellipseMode(CENTER);

  var start = step;

  var diag = dist(0, 0, s, s);

  for(var n = 0; n < v3; n++) {
    ellipse(0, 0, (n + 1) * diag / v3, (n + 1) * diag / v3);
  }

}
