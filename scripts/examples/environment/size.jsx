#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";


// The b.size([width,[height]]) function allows to get/set the size of
// the current document.
//
// If no argument is given it returns the current values of
// b.width and b.height in an object {"width":Number,"height":Number}.
//
// If one argument is provided the width and height both get set this this value.
//
// If two arguments are provided the first value is the width the second is the height.
//
// Lets try this out:
//
function setup(){
  // For starters - lets get the size
  var documentSize = b.size();
  b.println(documentSize.toSource()); // lets see what we've got
  // to see the changes of that document we add a text in the exact size
  b.text(documentSize.toSource(), 0, 0, documentSize.width, documentSize.height);
  // next we pass only one argument
  b.size(documentSize.width * 2);
  // lets get the size again for the next text frame.
  documentSize = b.size();
  // and draw the text again
  b.text(documentSize.toSource(), 0, 0, documentSize.width, documentSize.height);
  // finally lets set the size for width and height separately
  b.size(documentSize.width, documentSize.height * 3);
  // get the size again
  documentSize = b.size();
  // and draw another box
  b.text(documentSize.toSource(),0, 0, documentSize.width, documentSize.height);
}

function draw(){
  // nothing to see here
}

b.go();