// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var words = b.split("apple bear cat dog", " ");

  b.println("Please note: You have to have your InDesign document saved already, so that basil.js can create a data folder for you next to it.");

  b.doc().save();

  // when doc is saved files can be saved to the same folder where the indesign document is around
  b.saveStrings("saveStrings-example-2.txt", words);
}


b.go();
