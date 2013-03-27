#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  
  var myTextFrame = b.selections()[0];
  var lineLayer = b.layer("lines");

  b.layer(lineLayer);
  b.paragraphs(myTextFrame, function(p,n){
    p.hyphenation = false;
    b.lines(p, function(l,m){
      var wbp; // temp bounds
      b.words(l, function(w,o){
        var wb = b.bounds(w);
        if(wbp == undefined){
          b.line(0,wb.bottom,wb.left,wb.bottom);
        }else{
          b.line(wbp.right,wbp.bottom,wb.left,wb.bottom);
        }
        b.line(wb.left,wb.bottom,wb.left,wb.top);
        b.line(wb.left,wb.top,wb.right,wb.top);
        b.line(wb.right,wb.top,wb.right,wb.bottom);
        wbp = wb;
      });
      b.line(wbp.right,wbp.bottom,b.width,wbp.bottom);
    });
  });
}

b.go();