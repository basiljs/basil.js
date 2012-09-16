#include "../../basil.js";

function draw() {
  b.textSize(128);
  b.text("hello pdf", 0,0, 500, 300);
  b.savePDF("hello.pdf");
  // show export options
  //b.savePDF("hello.pdf",true);
};

b.go();