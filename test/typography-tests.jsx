if (typeof b === "undefined") {
  #include "../basil.js";
}
if (typeof b.test === "undefined") {
  #include "../lib/basil.test.js";
}

b.test("TypographyTests", {
  doc: null,
  layer: null,

  setUpTest: function(b) {
    doc = app.documents.add();
  },

  tearDownTest: function(b) {
    b.close(SaveOptions.no);
  },

  setUp: function(b) {
    doc = b.doc();
    layer = doc.layers.add({name: "test layer"});
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testWriteText: function(b) {
    var contents = "foo bar";

    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents, 0, 0, 300, 300);

    assert(layer.textFrames.length === 1);
    assert(layer.textFrames[0].contents === contents);
  },

  testCreateMultipleTextFrames: function(b) {
    var contents1 = "foo bar",
      contents2 = "bar foo";

    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents1, 0, 0, 300, 300);
    b.text(contents2, 50, 50, 300, 300);

    assert(layer.textFrames.length === 2);
    assert(layer.textFrames[0].contents !== layer.textFrames[1].contents);
    assert(layer.textFrames[0].contents === contents1 || contents2);
    assert(layer.textFrames[1].contents === contents1 || contents2);
  },

  testWriteTextWithSpecialCharacters: function(b) {
    var contents = "Copyright: ©, Euro: €";

    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents, 0, 0, 300, 300);

    assert(layer.textFrames.length === 1);
    assert(layer.textFrames[0].contents === contents);
  },

  testWriteTextWithCarriageReturns: function(b) {
    var contents = "foo\rbar\rfoobar";

    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents, 0, 0, 300, 300);

    assert(layer.textFrames.length === 1);
    assert(layer.textFrames[0].contents === contents);
    assert(layer.textFrames[0].contents.split("\r").length === 3);
  },

  testGetAppliedFontFromTextFrame: function(b) {
    b.doc(doc);
    var textFrame = b.text("foo", 0, 0, 100, 100);

    var font = b.typo(textFrame, "appliedFont");

    assert(font.length === 1);
    assert(font[0] instanceof Font);
  },

  testSetPointSizeInTextFrame: function(b) {
    b.doc(doc);
    var textFrame = b.text("foo", 0, 0, 100, 100),
      size = 36;

    b.typo(textFrame, "pointSize", size);

    var currSize = b.typo(textFrame, "pointSize");
    assert(currSize.length === 1);
    assert(currSize[0] === size);
  },

  testSetPointSizeInOverlownPara: function(b) {
    b.doc(doc);
    var textFrame = b.text("lorem ipsum dolor sit amet\rlorem ipsum dolor sit amet", 0, 0, 100, 30),
      size = 30;

    b.typo(textFrame, "pointSize", size);

    var currSize = b.typo(textFrame, "pointSize");
    forEach(currSize, function(s) {
      assert(s === size);
    });
  },

  testCreateEmptyStyles: function(b) {
    b.doc(doc);

    var paraStyleCount = doc.paragraphStyles.length;
    var charStyleCount = doc.characterStyles.length;
    var objStyleCount = doc.objectStyles.length;

    var paragraphStyle = b.paragraphStyle("emptyParagraphStyle");
    var characterStyle = b.characterStyle("emptyCharacterStyle");
    var objectStyle = b.objectStyle("emptyObjectStyle");

    assert(paraStyleCount + 1 === doc.paragraphStyles.length);
    assert(charStyleCount + 1 === doc.characterStyles.length);
    assert(objStyleCount + 1 === doc.objectStyles.length);

    assert(paragraphStyle instanceof ParagraphStyle);
    assert(characterStyle instanceof CharacterStyle);
    assert(objectStyle instanceof ObjectStyle);

    assert(doc.paragraphStyles.itemByName("emptyParagraphStyle").isValid);
    assert(doc.characterStyles.itemByName("emptyCharacterStyle").isValid);
    assert(doc.objectStyles.itemByName("emptyObjectStyle").isValid);
  },

  testReturnExistingStyles: function(b) {
    b.doc(doc);

    // create empty styles on top level
    b.paragraphStyle("topParagraphStyle");
    b.characterStyle("topCharacterStyle");
    b.objectStyle("topObjectStyle");

    // create styles nested in groups
    doc.paragraphStyleGroups.add({name: "paraGroup"}).paragraphStyles.add({name: "nestedParagraphStyle"});
    doc.characterStyleGroups.add({name: "charGroup"}).characterStyles.add({name: "nestedCharacterStyle"});
    doc.objectStyleGroups.add({name: "objGroup"}).objectStyles.add({name: "nestedObjectStyle"});

    // get styles
    var topPara = b.paragraphStyle("topParagraphStyle");
    var topChar = b.characterStyle("topCharacterStyle");
    var topObj = b.objectStyle("topObjectStyle");
    var nestedPara = b.paragraphStyle("nestedParagraphStyle");
    var nestedChar = b.characterStyle("nestedCharacterStyle");
    var nestedObj = b.objectStyle("nestedObjectStyle");

    assert(topPara instanceof ParagraphStyle);
    assert(topChar instanceof CharacterStyle);
    assert(topObj instanceof ObjectStyle);
    assert(nestedPara instanceof ParagraphStyle);
    assert(nestedChar instanceof CharacterStyle);
    assert(nestedObj instanceof ObjectStyle);

    assert(topPara.name === "topParagraphStyle");
    assert(topChar.name === "topCharacterStyle");
    assert(topObj.name === "topObjectStyle");
    assert(nestedPara.name === "nestedParagraphStyle");
    assert(nestedChar.name === "nestedCharacterStyle");
    assert(nestedObj.name === "nestedObjectStyle");
  },

  testCreateStylesWithProps: function(b) {
    b.doc(doc);

    var paraCharProps = {
      baselineShift: 5,
      strikeThru: true,
      capitalization: Capitalization.ALL_CAPS
    };

    var objProps = {
      strokeWeight: 5,
      nonprinting: true,
      topLeftCornerOption: CornerOptions.ROUNDED_CORNER
    };

    var paraStyle = b.paragraphStyle("paragraphStyle", paraCharProps);
    var charStyle = b.characterStyle("characterStyle", paraCharProps);
    var objStyle = b.objectStyle("objectStyle", objProps);

    assert(paraStyle instanceof ParagraphStyle);
    assert(charStyle instanceof CharacterStyle);
    assert(objStyle instanceof ObjectStyle);

    assert(paraStyle.baselineShift === 5 && paraStyle.strikeThru === true && paraStyle.capitalization === Capitalization.ALL_CAPS);
    assert(charStyle.baselineShift === 5 && charStyle.strikeThru === true && charStyle.capitalization === Capitalization.ALL_CAPS);
    assert(objStyle.strokeWeight === 5 && objStyle.nonprinting === true && objStyle.topLeftCornerOption === CornerOptions.ROUNDED_CORNER);
  },

  testUpdatePropsOfExistingStyles: function(b) {
    b.doc(doc);

    var paraCharProps = {
      baselineShift: 5,
      strikeThru: true,
      capitalization: Capitalization.ALL_CAPS
    };

    var objProps = {
      strokeWeight: 5,
      nonprinting: true,
      topLeftCornerOption: CornerOptions.ROUNDED_CORNER
    };

    var paraStyle = b.paragraphStyle("paragraphStyle", paraCharProps);
    var charStyle = b.characterStyle("characterStyle", paraCharProps);
    var objStyle = b.objectStyle("objectStyle", objProps);

    var newParaCharProps = {
      name: "newStyle",
      baselineShift: 20,
      strikeThru: false,
      capitalization: Capitalization.SMALL_CAPS
    };

    var newObjProps = {
      name: "newStyle",
      strokeWeight: 20,
      nonprinting: false,
      topLeftCornerOption: CornerOptions.FANCY_CORNER
    };

    b.paragraphStyle("paragraphStyle", newParaCharProps);
    b.characterStyle("characterStyle", newParaCharProps);
    b.objectStyle("objectStyle", newObjProps);

    assert(paraStyle.baselineShift === 20 && paraStyle.strikeThru === false && paraStyle.capitalization === Capitalization.SMALL_CAPS);
    assert(charStyle.baselineShift === 20 && charStyle.strikeThru === false && charStyle.capitalization === Capitalization.SMALL_CAPS);
    assert(objStyle.strokeWeight === 20 && objStyle.nonprinting === false && objStyle.topLeftCornerOption === CornerOptions.FANCY_CORNER);

    assert(doc.paragraphStyles.item("newStyle").isValid);
    assert(doc.characterStyles.item("newStyle").isValid);
    assert(doc.objectStyles.item("newStyle").isValid);

    assert(doc.paragraphStyles.item("paragraphStyle").isValid === false);
    assert(doc.characterStyles.item("characterStyle").isValid === false);
    assert(doc.objectStyles.item("objectStyle").isValid === false);
  },

  testApplyStyles: function(b) {
    b.doc(doc);

    // create linked text frames
    var textFrame1 = b.text(b.LOREM + "\r" + b.LOREM, 0, 0, 300, 300);
    textFrame1.insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
    var textFrame2 = b.text(b.LOREM + "\r" + b.LOREM, 0, 0, 300, 300);
    textFrame2.insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
    var textFrame3 = b.text(b.LOREM + "\r" + b.LOREM, 0, 0, 300, 300);
    b.linkTextFrames(textFrame1, textFrame2);
    b.linkTextFrames(textFrame2, textFrame3);
    var defaultParaStyle = textFrame1.parentStory.appliedParagraphStyle;
    var defaultCharStyle = textFrame1.parentStory.appliedCharacterStyle;

    var rect = b.rect(0, 0, 100, 100);

    var paraStyle = b.paragraphStyle("paragraphStyle", {baselineShift: 5});
    var charStyle = b.characterStyle("characterStyle", {baselineShift: 20});
    var objStyle = b.objectStyle("objectStyle", {topLeftCornerOption: CornerOptions.ROUNDED_CORNER});

    // apply styles to text instances
    b.applyParagraphStyle(textFrame1.paragraphs[0], paraStyle);
    b.applyCharacterStyle(textFrame1.words[0], charStyle);

    assert(textFrame1.paragraphs[0].appliedParagraphStyle === paraStyle);
    assert(textFrame1.paragraphs[1].appliedParagraphStyle === defaultParaStyle);
    assert(textFrame1.words[0].appliedCharacterStyle === charStyle);
    assert(textFrame1.words[1].appliedCharacterStyle === defaultCharStyle);
    assert(textFrame1.words[0].baselineShift === 20);
    assert(textFrame1.words[1].baselineShift === 5);

    // apply styles to text frames
    b.applyParagraphStyle(textFrame2, paraStyle);
    b.applyCharacterStyle(textFrame2, charStyle);

    assert(textFrame2.paragraphs[-1].appliedParagraphStyle === paraStyle);
    assert(textFrame3.paragraphs[0].appliedParagraphStyle === defaultParaStyle);
    assert(textFrame2.characters[-1].appliedCharacterStyle === charStyle);
    assert(textFrame3.characters[0].appliedCharacterStyle === defaultCharStyle);

    // apply styles to story
    b.applyParagraphStyle(textFrame1.parentStory, paraStyle);
    b.applyCharacterStyle(textFrame1.parentStory, charStyle);

    assert(textFrame3.paragraphs[-1].appliedParagraphStyle === paraStyle);
    assert(textFrame3.characters[-1].appliedCharacterStyle === charStyle);

    // apply style to object
    b.applyObjectStyle(rect, objStyle);

    assert(rect.appliedObjectStyle === objStyle);
    assert(rect.topLeftCornerOption === CornerOptions.ROUNDED_CORNER);
  }

});

// print collected test results
b.test.result();

