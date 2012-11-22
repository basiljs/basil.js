#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function setup() {
  var contents = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\rUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  b.text(contents, 0, 0, 400, 200);
  b.text(contents, 0, 400, 400, 200);

  var doc = b.doc();

  b.stories(doc, function(story, si) {
    b.println('Story ' + si);
  });

  b.paragraphs(doc, function(para, pi) {
    b.println('Paragraph ' + pi);
  });

  b.lines(doc, function(line, li) {
    b.println('Line ' + li);
  });

  b.words(doc, function(word, wi) {
    b.println('Word ' + wi);
  });

  b.characters(doc, function(ch, ci) {
    b.println('Character ' + ci);
  });
}

b.go();