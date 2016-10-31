#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.textSize(21);
  b.strokeWeight(1);
  var oval = b.ellipse(400,50,150,80);

  var textframe = b.text(b.LOREM, 50,70,300,500);

  // text related bounds
  b.noFill();
  b.words(textframe, function (word) {
    var txtbounds = b.bounds(word);
    b.rect(txtbounds.left, txtbounds.top, txtbounds.width, txtbounds.height);
    b.ellipse( txtbounds.left, txtbounds.xHeight, 3,3 );
  });


  b.fill('Black');

  // bounds of the oval
  var ovalbounds = b.bounds( oval );
  b.text("ovalbounds", ovalbounds.left, ovalbounds.top, ovalbounds.width, ovalbounds.height);

  // bounds of page items
  var pagebounds = b.bounds( b.page() );
  for (var prop in pagebounds) {
    b.println(prop+" "+pagebounds[prop]);
  }
  b.println( pagebounds.width);
  b.text("pagebounds", pagebounds.left, pagebounds.top, pagebounds.width, pagebounds.height);
};

b.go();