﻿// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

var colors = [];
var lowInt = 80;
var hiInt = 255;

function setup() {
  b.noStroke();

  // define a fixed palette yourself
  colors = [b.color(255, 0, 0, "red"), b.color(0, 255, 0, "green"), b.color(0, 0, 255, "blue")];

  // pre-compute a fixed palette
  // for(var i = 0; i < 5; i++) {
  //   colors[i] = b.color(b.random(lowInt, hiInt), b.random(lowInt, hiInt), b.random(lowInt, hiInt));
  // }

}

function draw() {

  for(var i = 0; i < 100; i++) {
    b.fill(colors[ b.floor(b.random(colors.length)) ]);
    b.ellipse(b.random(b.width), b.random(b.height), 30, 30);
  }

}

b.go();
