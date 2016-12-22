// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  b.units(b.MM);
  var tf = b.text("", b.width / 2 - 60, b.height / 2 - 100, 120, 200);
  b.placeholder(tf);


  // create a new style by name
  b.paragraphStyle("emptyStyle");


  // create styles by name with custom properties
  var redProps = {
    fillColor: b.color(255, 0, 0),
    pointSize: 14,
    skew: 15
  };
  var redStyle = b.paragraphStyle("red", redProps);

  var greenProps = {
    fillColor: b.color(0, 255, 0),
    pointSize: 18,
    skew: -15
  };
  var greenStyle = b.characterStyle("green", greenProps);


  // apply styles
  b.applyParagraphStyle(tf, "red");

  var words = b.words(tf);
  for (var i = 0; i < words.length; i += 5) {
    b.applyCharacterStyle(words[i], greenStyle);
  }


  b.delay(1000);


  // update style with new properties
  b.characterStyle("green", {fillColor: b.color(0, 0, 255), name: "blue"});


  // creating an objectStyle by name with custom properties
  var objectProps = {
    topLeftCornerOption: CornerOptions.ROUNDED_CORNER,
    topLeftCornerRadius: 20,
    bottomRightCornerOption: CornerOptions.FANCY_CORNER,
    bottomRightCornerRadius: 20,
    fillColor: b.gradient(b.color(255, 255, 220), b.color(200, 255, 255)),
    gradientFillAngle: 45
  };
  b.objectStyle("cornerStyle", objectProps);
  b.applyObjectStyle(tf, "cornerStyle");


  // get style from text object
  var parStyle = b.characterStyle(tf.characters[10]);
  b.println("Received character style \"" + parStyle.name + "\".");
}

b.go();
