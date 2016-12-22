//@include "../../basil.js";

var pageCount = 5;

function draw() {
  // create long lorem ipsum string
  var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';
  for (var i = 0; i < 10; i++) {
    lorem += lorem;
  };

  b.strokeWeight(1);
  b.stroke(255,255,0);
  b.textSize(40);

  for (var i = 0; i < pageCount; i++) {
    var textFrame = b.text(lorem, 0,0, b.width, b.height);
    b.words(textFrame, function(word,wi){
      var bounds = b.bounds(word);
      if (wi % 7 === 0) {
        b.rect(bounds.left,bounds.top,bounds.width,bounds.height);
      } else {
        b.line(0,0,bounds.left,bounds.bottom);
      }
    });
    if (i !== pageCount-1) b.addPage();
  };

}
b.go();

