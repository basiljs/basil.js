/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("TypographyTests", {
  myDoc: null,
  myLayer: null,

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
    this.myDoc = doc();
    this.myLayer = this.myDoc.layers.add({name: "test layer"});
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testWriteText: function() {
    var contents = "foo bar";

    doc();
    page(0);
    layer(this.myLayer);
    text(contents, 0, 0, 300, 300);

    assert(this.myLayer.textFrames.length === 1);
    assert(this.myLayer.textFrames[0].contents === contents);
  },

  testCreateMultipleTextFrames: function() {
    var contents1 = "foo bar",
      contents2 = "bar foo";

    doc();
    page(0);
    layer(this.myLayer);
    text(contents1, 0, 0, 300, 300);
    text(contents2, 50, 50, 300, 300);

    assert(this.myLayer.textFrames.length === 2);
    assert(this.myLayer.textFrames[0].contents !== this.myLayer.textFrames[1].contents);
    assert(this.myLayer.textFrames[0].contents === contents1 || contents2);
    assert(this.myLayer.textFrames[1].contents === contents1 || contents2);
  },

  testWriteTextWithSpecialCharacters: function() {
    var contents = "Copyright: ©, Euro: €";

    doc();
    page(0);
    layer(this.myLayer);
    text(contents, 0, 0, 300, 300);

    assert(this.myLayer.textFrames.length === 1);
    assert(this.myLayer.textFrames[0].contents === contents);
  },

  testWriteTextWithCarriageReturns: function() {
    var contents = "foo\rbar\rfoobar";

    doc();
    page(0);
    layer(this.myLayer);
    text(contents, 0, 0, 300, 300);

    assert(this.myLayer.textFrames.length === 1);
    assert(this.myLayer.textFrames[0].contents === contents);
    assert(this.myLayer.textFrames[0].contents.split("\r").length === 3);
  },

  testGetAppliedFontFromTextFrame: function() {
    doc();
    var textFrame = text("foo", 0, 0, 100, 100);

    var font = typo(textFrame, "appliedFont");

    assert(font.length === 1);
    assert(font[0] instanceof Font);
  },

  testSetPointSizeInTextFrame: function() {
    doc();
    var textFrame = text("foo", 0, 0, 100, 100);
    var size = 36;

    typo(textFrame, "pointSize", size);

    var currSize = typo(textFrame, "pointSize");
    assert(currSize.length === 1);
    assert(currSize[0] === size);
  },

  testSetPointSizeInOverlownPara: function() {
    doc();
    var textFrame = text("lorem ipsum dolor sit amet\rlorem ipsum dolor sit amet", 0, 0, 100, 30);
    var mySize = 30;

    typo(textFrame, "pointSize", mySize);

    var currSize = typo(textFrame, "pointSize");
    forEach(currSize, function(s) {
      assert(s === mySize);
    });
  },

  testApplyingTextFonts: function() {
    doc();
    var textFrame = text(LOREM, 0, 0, 100, 100);
    var currentFont = textFrame.parentStory.appliedFont;

    textFont("someNonInstalledFont");
    var textFrameNonInstalled = text(LOREM, 100, 100, 100, 100);
    assert(textFrameNonInstalled.parentStory.appliedFont === currentFont);

    textFont("Helvetica");
    var textFrameHelvetica = text(LOREM, 200, 200, 100, 100);
    assert(textFrameHelvetica.parentStory.appliedFont.fontFamily === "Helvetica");

    textFont("Helvetica", "Bold");
    var textFrameHelveticaBold = text(LOREM, 300, 300, 100, 100);
    assert(textFrameHelveticaBold.parentStory.appliedFont.fontFamily === "Helvetica");
    assert(textFrameHelveticaBold.parentStory.appliedFont.fontStyleName === "Bold");
  },

  testCreateEmptyStyles: function() {
    doc();

    var paraStyleCount = this.myDoc.paragraphStyles.length;
    var charStyleCount = this.myDoc.characterStyles.length;
    var objStyleCount = this.myDoc.objectStyles.length;

    var myParagraphStyle = paragraphStyle("emptyParagraphStyle");
    var myCharacterStyle = characterStyle("emptyCharacterStyle");
    var myObjectStyle = objectStyle("emptyObjectStyle");

    assert(paraStyleCount + 1 === this.myDoc.paragraphStyles.length);
    assert(charStyleCount + 1 === this.myDoc.characterStyles.length);
    assert(objStyleCount + 1 === this.myDoc.objectStyles.length);

    assert(myParagraphStyle instanceof ParagraphStyle);
    assert(myCharacterStyle instanceof CharacterStyle);
    assert(myObjectStyle instanceof ObjectStyle);

    assert(this.myDoc.paragraphStyles.itemByName("emptyParagraphStyle").isValid);
    assert(this.myDoc.characterStyles.itemByName("emptyCharacterStyle").isValid);
    assert(this.myDoc.objectStyles.itemByName("emptyObjectStyle").isValid);
  },

  testReturnExistingStyles: function() {
    doc();

    // create empty styles on top level
    paragraphStyle("topParagraphStyle");
    characterStyle("topCharacterStyle");
    objectStyle("topObjectStyle");

    // create styles nested in groups
    this.myDoc.paragraphStyleGroups.add({name: "paraGroup"}).paragraphStyles.add({name: "nestedParagraphStyle"});
    this.myDoc.characterStyleGroups.add({name: "charGroup"}).characterStyles.add({name: "nestedCharacterStyle"});
    this.myDoc.objectStyleGroups.add({name: "objGroup"}).objectStyles.add({name: "nestedObjectStyle"});

    // get styles
    var topPara = paragraphStyle("topParagraphStyle");
    var topChar = characterStyle("topCharacterStyle");
    var topObj = objectStyle("topObjectStyle");
    var nestedPara = paragraphStyle("nestedParagraphStyle");
    var nestedChar = characterStyle("nestedCharacterStyle");
    var nestedObj = objectStyle("nestedObjectStyle");

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

  testCreateStylesWithProps: function() {
    doc();

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

    var paraStyle = paragraphStyle("paragraphStyle", paraCharProps);
    var charStyle = characterStyle("characterStyle", paraCharProps);
    var objStyle = objectStyle("objectStyle", objProps);

    assert(paraStyle instanceof ParagraphStyle);
    assert(charStyle instanceof CharacterStyle);
    assert(objStyle instanceof ObjectStyle);

    assert(paraStyle.baselineShift === 5 && paraStyle.strikeThru === true && paraStyle.capitalization === Capitalization.ALL_CAPS);
    assert(charStyle.baselineShift === 5 && charStyle.strikeThru === true && charStyle.capitalization === Capitalization.ALL_CAPS);
    assert(objStyle.strokeWeight === 5 && objStyle.nonprinting === true && objStyle.topLeftCornerOption === CornerOptions.ROUNDED_CORNER);
  },

  testUpdatePropsOfExistingStyles: function() {
    doc();

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

    var paraStyle = paragraphStyle("myParagraphStyle", paraCharProps);
    var charStyle = characterStyle("myCharacterStyle", paraCharProps);
    var objStyle = objectStyle("myObjectStyle", objProps);

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

    paragraphStyle("myParagraphStyle", newParaCharProps);
    characterStyle("myCharacterStyle", newParaCharProps);
    objectStyle("myObjectStyle", newObjProps);

    assert(paraStyle.baselineShift === 20 && paraStyle.strikeThru === false && paraStyle.capitalization === Capitalization.SMALL_CAPS);
    assert(charStyle.baselineShift === 20 && charStyle.strikeThru === false && charStyle.capitalization === Capitalization.SMALL_CAPS);
    assert(objStyle.strokeWeight === 20 && objStyle.nonprinting === false && objStyle.topLeftCornerOption === CornerOptions.FANCY_CORNER);

    assert(this.myDoc.paragraphStyles.item("newStyle").isValid);
    assert(this.myDoc.characterStyles.item("newStyle").isValid);
    assert(this.myDoc.objectStyles.item("newStyle").isValid);

    assert(this.myDoc.paragraphStyles.item("myParagraphStyle").isValid === false);
    assert(this.myDoc.characterStyles.item("myCharacterStyle").isValid === false);
    assert(this.myDoc.objectStyles.item("myObjectStyle").isValid === false);
  },

  testApplyStyles: function() {
    doc();

    // create linked text frames
    var textFrame1 = text(LOREM + "\r" + LOREM, 0, 0, 300, 300);
    textFrame1.insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
    var textFrame2 = text(LOREM + "\r" + LOREM, 0, 0, 300, 300);
    textFrame2.insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
    var textFrame3 = text(LOREM + "\r" + LOREM, 0, 0, 300, 300);
    linkTextFrames(textFrame1, textFrame2);
    linkTextFrames(textFrame2, textFrame3);
    var defaultParaStyle = textFrame1.parentStory.appliedParagraphStyle;
    var defaultCharStyle = textFrame1.parentStory.appliedCharacterStyle;

    var myRect = rect(0, 0, 100, 100);

    var paraStyle = paragraphStyle("myParagraphStyle", {baselineShift: 5});
    var charStyle = characterStyle("myCharacterStyle", {baselineShift: 20});
    var objStyle = objectStyle("myObjectStyle", {topLeftCornerOption: CornerOptions.ROUNDED_CORNER});

    // apply styles to text instances
    applyParagraphStyle(textFrame1.paragraphs[0], paraStyle);
    applyCharacterStyle(textFrame1.words[0], charStyle);

    assert(textFrame1.paragraphs[0].appliedParagraphStyle === paraStyle);
    assert(textFrame1.paragraphs[1].appliedParagraphStyle === defaultParaStyle);
    assert(textFrame1.words[0].appliedCharacterStyle === charStyle);
    assert(textFrame1.words[1].appliedCharacterStyle === defaultCharStyle);
    assert(textFrame1.words[0].baselineShift === 20);
    assert(textFrame1.words[1].baselineShift === 5);

    // apply styles to text frames
    applyParagraphStyle(textFrame2, paraStyle);
    applyCharacterStyle(textFrame2, charStyle);

    assert(textFrame2.paragraphs[-1].appliedParagraphStyle === paraStyle);
    assert(textFrame3.paragraphs[0].appliedParagraphStyle === defaultParaStyle);
    assert(textFrame2.characters[-1].appliedCharacterStyle === charStyle);
    assert(textFrame3.characters[0].appliedCharacterStyle === defaultCharStyle);

    // apply styles to story
    applyParagraphStyle(textFrame1.parentStory, paraStyle);
    applyCharacterStyle(textFrame1.parentStory, charStyle);

    assert(textFrame3.paragraphs[-1].appliedParagraphStyle === paraStyle);
    assert(textFrame3.characters[-1].appliedCharacterStyle === charStyle);

    // apply style to object
    applyObjectStyle(myRect, objStyle);

    assert(myRect.appliedObjectStyle === objStyle);
    assert(myRect.topLeftCornerOption === CornerOptions.ROUNDED_CORNER);
  }

});

// print collected test results
basilTest.result();

