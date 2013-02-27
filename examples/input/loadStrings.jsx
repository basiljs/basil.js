#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";


function draw() {

  b.println("Please note: You have to put a text file 'loadStrings-example.txt' with some plain content in a folder 'data' next to your saved InDesign document.");
  
  var lines = b.loadStrings("loadStrings-example.txt");
  addTextForEachLine(lines);
  
}

function addTextForEachLine(lines) {
  forEach(lines, function(line, i) {
    b.text(line, 0, i*100, 300, 100);
  });
}

b.go();