#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

var numPages = 2;
var textSize = 30;
var textLayer = null;
var lineLayer = null;

function setup() {
  textLayer = b.layer("text");
  lineLayer = b.layer("lines");
}

function draw() {
  var pageTime = 0;
  for(var i = 0; i < numPages; i++){
    textLines();
    if(i < numPages-1){
      b.addPage();
    } 
    b.println("page " + (i + 1) + " took " + ((b.millis() - pageTime)/1000) + " seconds to process");
    pageTime = b.millis();
  }
  textLayer.visible = false;
}

function textLines(){
  // build textframe with lorem text to margin, 
  b.canvasMode(b.MARGIN);
  b.layer(textLayer);
  b.textSize(textSize);
  var myTextFrame = b.text(" ",0,0,b.width,b.height);
  app.documents[0].stories.everyItem().hyphenation = false; 
  myTextFrame.contents = TextFrameContents.placeholderText;

  // run function with fullpage mode
  b.canvasMode(b.PAGE); 
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
          b.line(wbp.right,wb.bottom,wb.left,wb.bottom);
        }
        b.line(wb.left,wb.bottom,wb.left,wb.top);
        b.line(wb.left,wb.top,wb.right,wb.top);
        b.line(wb.right,wb.top,wb.right,wb.bottom);
        wbp = wb;
      });
      b.line(wbp.right,wbp.bottom,b.width,wbp.bottom); // last to right edge
    });
  });
}

//b.go(b.MODEHIDDEN);
//b.go(b.MODESILENT);
b.go();