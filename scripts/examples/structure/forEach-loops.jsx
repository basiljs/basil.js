// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function setup() {
  var contents = "This is the first paragraph of the text frame.\rThis is the second one.";
  b.text(contents, 0, 0, 400, 200);
  b.text(contents, 0, 400, 400, 200);

  var doc = b.doc();

  b.stories(doc, function(story, si) {
    b.println("Story " + si);
  });

  b.paragraphs(doc, function(para, pi) {
    b.println("Paragraph " + pi);
  });

  b.lines(doc, function(line, li) {
    b.println("Line " + li);
  });

  b.words(doc, function(word, wi) {
    b.println("Word " + wi);
  });

  b.characters(doc, function(ch, ci) {
    b.println("Character " + ci);
  });
}

b.go();
