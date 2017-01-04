// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  var textFramesCount = 20;
  var fonts = app.fonts;

  for (var i = 0; i < textFramesCount; i++) {
    var posX = b.random(0, 600);
    var posY = b.random(0, 850);
    var randomFontSize = b.round(b.random(2, 20));
    var randomIndex = b.floor(b.random(app.fonts.length));
    var fontName = fonts[randomIndex].fullName;
    b.println(fontName);

    b.textSize(randomFontSize);
    b.textFont(fonts[randomIndex]);
    var textFrame = b.text(fontName + " " + randomFontSize, posX, posY, 300, 20);
  }
}

b.go();
