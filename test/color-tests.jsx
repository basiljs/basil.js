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

    assert(black instanceof Swatch);
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
  }
});

b.test.result();