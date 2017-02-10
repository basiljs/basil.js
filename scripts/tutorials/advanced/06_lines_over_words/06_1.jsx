// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  var tf = b.selections()[0]; // use the first selected element
  var lineLayer = b.layer("lines"); // get or create the layer "lines"

  var lines = b.lines(tf); // get all lines of the textframe as an array

  for(var m = 0; m < lines.length; m++) { // for every line ...

    var wbp; // declare variable for later use
    var words = b.words(lines[m]); // get all words of the current line as an array

    for(var n = 0; n < words.length; n++) { // for every word ...

      var wb = b.bounds(words[n]); // the geometric bounds of each word

      if(n === 0) { // first word draw from paper edge -
        b.line(0, wb.bottom, wb.left, wb.bottom);
      }else{
        b.line(wbp.right, wbp.bottom, wb.left, wb.bottom);
      }
      b.line(wb.left, wb.bottom, wb.left, wb.top); // from left/bottom to left/top |
      b.line(wb.left, wb.top, wb.right, wb.top); // from left/top to right/top -
      b.line(wb.right, wb.top, wb.right, wb.bottom); // from right/topto right/bottom |

      wbp = wb; // remember the previous word for next time

    }

    b.line(wbp.right, wbp.bottom, b.width, wbp.bottom); // last word connect line to paper edge -

  }

}

b.go();
