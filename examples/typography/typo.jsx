#include "../../basil.js";

function draw() {
  var green = b.color(0, 255, 0, "green");
  var red = b.color(255, 0, 0, "red");
  b.fill(green);
  var content = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\r";
  content += "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.";
  var textFrame = b.text(content, 0, 0, 600, 600);
  
  b.typo(b.doc(), 'pointSize', 48);
  b.typo(textFrame.words[1], 'fillColor', red);
  b.typo(textFrame.lines[1], 'pointSize', 24);
  b.typo(textFrame.characters[50], 'pointSize', 96);
  b.typo(textFrame.paragraphs[1], 'strokeColor', red);
}