// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var content = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\r";
  content += "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.";

  var doc = b.doc();

  // add 5 pages to doc
  for (var i = 0; i < 5; i++) {
    doc.pages.add();
  }

  // add 2 text frame on each page
  for (var j = 0, len = doc.pages.length; j < len; j++) {
    b.page(j);
    b.text(content, 0, 0, 600, 300);
    b.text(content, 0, 350, 600, 300);
  }

  var green = b.color(0, 255, 0, "green");
  var red = b.color(255, 0, 0, "red");

  // change pointSize in all text frames in document
  b.typo(doc, "pointSize", 48);

  // change fillColor on 2nd spread
  b.typo(doc.spreads[1], "fillColor", red);

  // change strokeColor on 4th page
  b.typo(doc.pages[3], "strokeColor", green);

  // change some more fine granular stuff in text frame on 1st page
  var textFrame = doc.pages[0].textFrames[0];
  b.typo(textFrame, "pointSize", 36);
  b.typo(textFrame.words[1], "appliedFont", "Helvetica\tBold");
  b.typo(textFrame.words[1], "underline", true);
  b.typo(textFrame.lines[1], "pointSize", 48);
  b.typo(textFrame.characters[50], "pointSize", 96);
  b.typo(textFrame.paragraphs[1], "strokeColor", red);

// todo: add more relevant fields as a list here
// b.typo(textFrame, 'justification', Justification.RIGHT_ALIGN);

}

b.go();
