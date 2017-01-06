// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  /*
  Please note:
  You have to put a text file 'some_test_file.txt'
  with some plain content in a folder 'data' next to
  your saved InDesign document.
  */
  b.println("put some text file in the data folder!");

  // load lines of the file in array
  var linesArray = b.loadStrings("some_test_file.txt");
  addTextForEachLine(linesArray);

  // load file content
  var textString = b.loadString("some_test_file.txt");
  // if you prefer not to use the data folder mechanism
  // then use this code snippet:
  // var txtFile = new File("/Users/bene/Desktop/some_test_file.txt");
  // var text = b.loadString(txtFile);

  b.println(textString);
}

function addTextForEachLine(lines) {
  forEach(lines, function(line, i) {
    b.text(line, 0, i * 100, 300, 100);
  });
}

b.go();
