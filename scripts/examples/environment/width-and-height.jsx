#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.println("page size: "+b.width+" x "+b.height);
  b.rect(0,0,b.width,b.height);
};

b.go();