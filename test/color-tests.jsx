if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js";  
}

b.test('ColorTests', {
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no); 
  },

  testDefaultColors: function(b) {
    var doc = b.doc();
    var rect = b.rect(0,0,100,100);
    var black = b.color('Black');

    assert(black instanceof Color);
    assert(rect.fillColor.colorValue.toString() === black.colorValue.toString());
    assert(rect.strokeColor.colorValue.toString() === black.colorValue.toString());
  },

  testCreateRGBColor: function(b) {
    var doc = b.doc();
    b.colorMode(b.RGB);
    var red = b.color(255,2,3);
    var green = b.color(0,255,0,"green");
    var rgbGrey = b.color(128);

    assert(red instanceof Color);
    assert(green instanceof Color);
    assert(rgbGrey instanceof Color);

    assert(red.space === ColorSpace.RGB);
    assert(green.space === ColorSpace.RGB);
    assert(rgbGrey.space === ColorSpace.RGB);

    assert(b.color("green") === green);

    assert(red.colorValue.length === 3);
    assert(red.colorValue[0] === 255);
    assert(red.colorValue[1] === 2);
    assert(red.colorValue[2] === 3);
  },

  testCreateCMYKColor: function(b) {
    var doc = b.doc();
    b.colorMode(b.CMYK);
    var magenta = b.color(1,100,3,4);
    var yellow = b.color(0,0,100,0,"yellow");
    var cmykGrey = b.color(80,"light grey");

    assert(magenta instanceof Color);
    assert(yellow instanceof Color);
    assert(cmykGrey instanceof Color);

    assert(magenta.space === ColorSpace.CMYK);
    assert(yellow.space === ColorSpace.CMYK);
    assert(cmykGrey.space === ColorSpace.CMYK);

    assert(b.color("yellow") === yellow);

    assert(magenta.colorValue.length === 4);
    assert(magenta.colorValue[0] === 1);
    assert(magenta.colorValue[1] === 100);
    assert(magenta.colorValue[2] === 3);
    assert(magenta.colorValue[3] === 4);
  },

  testIsColorAddedToSwatches: function(b) {
    var doc = b.doc();
    b.colorMode(b.RGB);
    var swatchCountStart = doc.swatches.length;
    var red = b.color(56,2,3);
    var green = b.color(0,255,0,"a color with a name");
    var rgbGrey = b.color(50);
    var swatchCountEnd = doc.swatches.length;

    assert((swatchCountStart+3) === swatchCountEnd);
  },

  testAddColorToSwatchesAndGetIt: function(b) {
    var doc = b.doc();
    b.colorMode(b.RGB);
    var red = b.color(56,2,3,"red");
    var green = b.color(1,255,3,"green");
    var grey = b.color(50,"grey");
    var greenSwatch = doc.swatches.item("green");

    assert(b.color("green") === green);
    assert(b.color("green") === greenSwatch);
    assert(greenSwatch === green);
    assert(greenSwatch.colorValue.length === 3);
    assert(greenSwatch.colorValue[0] === 1);
    assert(greenSwatch.colorValue[1] === 255);
    assert(greenSwatch.colorValue[2] === 3);
  },

  testCreateGradient: function(b) {
    var doc = b.doc();
    var red = b.color(255,0,0);
    var green = b.color(0,255,0);
    var blue = b.color(0,0,255);

    var redBlue = b.gradient(red, blue);
    var multiStop = b.gradient([red, green, blue, red, green]);
    var stopPositions = b.gradient([red, green, blue], [5, 80, 97]);
    var switchedStops = b.gradient([red, blue], [80, 20]);
    b.gradientMode(b.RADIAL);
    var radial = b.gradient(red, blue, "radial");

    assert(redBlue instanceof Gradient);
    assert(multiStop instanceof Gradient);
    assert(stopPositions instanceof Gradient);
    assert(radial instanceof Gradient);

    assert(redBlue.type === GradientType.LINEAR);
    assert(radial.type === GradientType.RADIAL);

    assert(b.gradient("radial") === radial);

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

  testIsGradientAddedToSwatches: function(b) {
    var doc = b.doc();
    var black = b.color(0);
    var white = b.color(255);
    var swatchCountStart = doc.swatches.length;
    var bw = b.gradient(black, white, "Black to White");
    var wb = b.gradient(white, black, "White to Black");
    var bwb = b.gradient([black, white, black]);
    var swatchCountEnd = doc.swatches.length;

    assert((swatchCountStart+3) === swatchCountEnd);
  }
});

b.test.result();