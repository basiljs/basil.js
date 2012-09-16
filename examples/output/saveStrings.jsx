#include "../../basil.js";

function draw() {
  var words = b.split('apple bear cat dog', ' ');

  // saveStrings before doc was saved with file instance
  b.saveStrings(new File('~/temp/data/saveStrings-example-1.txt'), words);

  b.doc().save();

  // when doc is saved files can be saved to the same folder where the indesign document is around
  b.saveStrings('saveStrings-example-2.txt', words);
}


b.go();