#include "../../basil.js";

// to run this example text file ~/temp/data/loadStrings-example.txt must exist
function draw() {
  // loadStrings before doc was saved with file instance
  addTextForEachLine(b.loadStrings(new File('~/temp/data/loadStrings-example.txt')));

  // save doc to ~/temp/ when indesign prompts
  b.doc().save();

  // when doc is saved files can be loaded by name from data directory in same folder as document
  // add strings on 2nd page
  b.doc().pages.add();
  b.page(1);
  addTextForEachLine(b.loadStrings('loadStrings-example.txt'));
}

function addTextForEachLine(lines) {
  forEach(lines, function(line, i) {
    b.text(line, 0, i*100, 300, 100);
  });
}

b.go();