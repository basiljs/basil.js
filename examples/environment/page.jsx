#include "../../basil.js";

function draw() {
  // create document with 10 pages
  var pages = b.doc().pages;
  for (var i = 0; i < 10; i++) {
    pages.add();
  };

  // draw a cross over the whole page
  // draw a text in the centre of the page
  forEach( pages, function(pageRef,i){
    b.page( pageRef );
    
    // cross
    b.line(0,0, b.width,b.height);
    b.line(0,b.height, b.width,0);

    // text
    var x = b.width/2;
    var y = b.height/2;
    var textFrame = b.text("page "+i, x,y,300,100);
    b.typo(textFrame, 'pointSize', 50);
  });
}

b.go();