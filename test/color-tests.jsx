/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("ColorTests", {
  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testDefaultColors: function() {
    var myDoc = doc();
    var myRect = rect(0, 0, 100, 100);
    var black = color("Black");

    assert(black instanceof Color);
    assert(myRect.fillColor.colorValue.toString() === black.colorValue.toString());
    assert(myRect.strokeColor.colorValue.toString() === black.colorValue.toString());
  },

  testCreateRGBColor: function() {
    var myDoc = doc();
    colorMode(RGB);
    var red = color(255, 2, 3);
    var green = color(0, 255, 0, "green");
    var rgbGrey = color(128);

    assert(red instanceof Color);
    assert(green instanceof Color);
    assert(rgbGrey instanceof Color);

    assert(red.space === ColorSpace.RGB);
    assert(green.space === ColorSpace.RGB);
    assert(rgbGrey.space === ColorSpace.RGB);

    assert(color("green") === green);

    assert(red.colorValue.length === 3);
    assert(red.colorValue[0] === 255);
    assert(red.colorValue[1] === 2);
    assert(red.colorValue[2] === 3);
  },

  testCreateCMYKColor: function() {
    var myDoc = doc();
    colorMode(CMYK);
    var magenta = color(1, 100, 3, 4);
    var yellow = color(0, 0, 100, 0, "yellow");
    var cmykGrey = color(80, "light grey");

    assert(magenta instanceof Color);
    assert(yellow instanceof Color);
    assert(cmykGrey instanceof Color);

    assert(magenta.space === ColorSpace.CMYK);
    assert(yellow.space === ColorSpace.CMYK);
    assert(cmykGrey.space === ColorSpace.CMYK);

    assert(color("yellow") === yellow);

    assert(magenta.colorValue.length === 4);
    assert(magenta.colorValue[0] === 1);
    assert(magenta.colorValue[1] === 100);
    assert(magenta.colorValue[2] === 3);
    assert(magenta.colorValue[3] === 4);
  },

  testIsColorAddedToSwatches: function() {
    var myDoc = doc();
    colorMode(RGB);
    var swatchCountStart = myDoc.swatches.length;
    var red = color(56, 2, 3);
    var green = color(0, 255, 0, "a color with a name");
    var rgbGrey = color(50);
    var swatchCountEnd = myDoc.swatches.length;

    assert((swatchCountStart + 3) === swatchCountEnd);
  },

  testAddColorToSwatchesAndGetIt: function() {
    var myDoc = doc();
    colorMode(RGB);
    var red = color(56, 2, 3, "red");
    var green = color(1, 255, 3, "green");
    var grey = color(50, "grey");
    var greenSwatch = myDoc.swatches.item("green");

    assert(color("green") === green);
    assert(color("green") === greenSwatch);
    assert(greenSwatch === green);
    assert(greenSwatch.colorValue.length === 3);
    assert(greenSwatch.colorValue[0] === 1);
    assert(greenSwatch.colorValue[1] === 255);
    assert(greenSwatch.colorValue[2] === 3);
  },

  testCreateGradient: function() {
    var myDoc = doc();
    var red = color(255, 0, 0);
    var green = color(0, 255, 0);
    var blue = color(0, 0, 255);

    var redBlue = gradient(red, blue);
    var multiStop = gradient([red, green, blue, red, green]);
    var stopPositions = gradient([red, green, blue], [5, 80, 97]);
    var switchedStops = gradient([red, blue], [80, 20]);
    gradientMode(RADIAL);
    var radial = gradient(red, blue, "radial");

    assert(redBlue instanceof Gradient);
    assert(multiStop instanceof Gradient);
    assert(stopPositions instanceof Gradient);
    assert(radial instanceof Gradient);

    assert(redBlue.type === GradientType.LINEAR);
    assert(radial.type === GradientType.RADIAL);

    assert(gradient("radial") === radial);

    assert(redBlue.gradientStops.length === 2);
    assert(multiStop.gradientStops.length === 5);
    assert(stopPositions.gradientStops.length === 3);
    assert(radial.gradientStops.length === 2);

    assert(multiStop.gradientStops.firstItem().location === 0);
    assert(multiStop.gradientStops.middleItem().location === 50);
    assert(multiStop.gradientStops.lastItem().location === 100);
    assert(stopPositions.gradientStops.firstItem().location === 5);
    assert(stopPositions.gradientStops.middleItem().location === 80);
    assert(stopPositions.gradientStops.lastItem().location === 97);

    assert(redBlue.gradientStops.firstItem().stopColor === red);
    assert(redBlue.gradientStops.lastItem().stopColor === blue);
    assert(multiStop.gradientStops.firstItem().stopColor === red);
    assert(multiStop.gradientStops.middleItem().stopColor === blue);
    assert(multiStop.gradientStops.lastItem().stopColor === green);
    assert(stopPositions.gradientStops.firstItem().stopColor === red);
    assert(stopPositions.gradientStops.middleItem().stopColor === green);
    assert(stopPositions.gradientStops.lastItem().stopColor === blue);
    assert(switchedStops.gradientStops.firstItem().stopColor === blue);
    assert(switchedStops.gradientStops.lastItem().stopColor === red);
  },

  testIsGradientAddedToSwatches: function() {
    var myDoc = doc();
    var black = color(0);
    var white = color(255);
    var swatchCountStart = myDoc.swatches.length;
    var bw = gradient(black, white, "Black to White");
    var wb = gradient(white, black, "White to Black");
    var bwb = gradient([black, white, black]);
    var swatchCountEnd = myDoc.swatches.length;

    assert((swatchCountStart + 3) === swatchCountEnd);
  },

  testBackground: function(){
    var myDoc = doc();
    var bgLayerName = 'basil.js Background';
    var docLayers = doc().layers;
    var pages = 5;
    for (var i=0; i < pages; i++) {
        if (i > 0) addPage();
        background(gradient(color(random(255), 255, 0), color(0, random(255), 255)));   
    }
    assert(docLayers[docLayers.length-1].name === bgLayerName);
    assert(layer(bgLayerName).rectangles.length === pages);
  }
});

basilTest.result();
