#include "../../basil.js";

function draw() {
  var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  b.textSize(21);
  b.strokeWeight(1);
  var oval = b.ellipse(400,50,150,80);

  var textframe = b.text(lorem, 50,70,300,500);

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
  b.println( pagebounds.width);
  b.text("pagebounds", pagebounds.left, pagebounds.top, pagebounds.width, pagebounds.height);
};

b.go();