/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("DocumentTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testGraphics: function() {
    var myDoc = doc();

    var basilFolder = File($.fileName).parent.parent;
    var basilImg = File(basilFolder + "/lib/basil.png");
    var img = image(basilImg, 0, 0);
    var img2 = image(basilImg, 10, 10);
    var img3 = image(basilImg, 20, 20);

    var g = graphics(doc());

    assert(g.constructor.name === "Array");
    assert(g[0] instanceof Image);

    var gCounter = 0;
    var gcb1 = graphics(doc(), function(graphic, i) {
      gCounter++;
    })
    assert(gcb1.constructor.name === "Array");
    assert(gCounter === g.length);
    assert(gCounter === gcb1.length);

    var gcb2 = graphics(doc(), function(graphic, i) {
      if(graphic.geometricBounds[0] < 10) {
        return false;
      }
    })
    assert(gcb2.constructor.name === "Array");
    assert(gcb2[0] instanceof Image);
    assert(gcb2.length < gcb1.length);
  },

  testCharacters: function() {
    var myDoc = doc();
    var tf = text(LOREM, 0, 0, 100, 100);

    var c = characters(tf);
    assert(c instanceof Characters);

    var cCounter = 0;
    var ccb1 = characters(tf, function(character, i) {
      cCounter++;
    })
    assert(ccb1 instanceof Characters);
    assert(cCounter === c.length);
    assert(cCounter === ccb1.length);

    var ccb2 = characters(tf, function(character, i) {
      if(character.contents === "c") {
        return false;
      }
    })
    assert(isArray(ccb2));
    assert(ccb2[0] instanceof Character);
    assert(ccb2.length < ccb1.length);
  },

  testLines: function() {
    var myDoc = doc();
    units(MM);
    textSize(12);
    var tf = text(LOREM, 0, 0, 100, 100);

    var l = lines(tf);
    assert(l instanceof Lines);

    var lCounter = 0;
    var lcb1 = lines(tf, function(line, i) {
      lCounter++;
    })
    assert(lcb1 instanceof Lines);
    assert(lCounter === l.length);
    assert(lCounter === lcb1.length);

    var lcb2 = lines(tf, function(line, i) {
      if(line.baseline > 10) {
        return false;
      }
    })
    assert(isArray(lcb2));
    assert(lcb2[0] instanceof Line);
    assert(lcb2.length < lcb1.length);
  },

  testParagraphs: function() {
    var myDoc = doc();
    var tf = text(LOREM + "\r" + LOREM + "\r" + LOREM, 0, 0, 100, 100);

    var p = paragraphs(tf);
    assert(p instanceof Paragraphs);
    assert(p.length === 3);

    var pCounter = 0;
    var pcb1 = paragraphs(tf, function(paragraph, i) {
      pCounter++;
    })
    assert(pcb1 instanceof Paragraphs);
    assert(pCounter === p.length);
    assert(pCounter === pcb1.length);

    var pcb2 = paragraphs(tf, function(paragraph, i) {
      if(paragraph.lines[0].baseline > 10) {
        return false;
      }
    })
    assert(isArray(pcb2));
    assert(pcb2[0] instanceof Paragraph);
    assert(pcb2.length < pcb1.length);
  },

  testStories: function() {
    var myDoc = doc();
    textSize(12);
    var tf1 = text(LOREM, 0, 0, 100, 100);
    textSize(14);
    var tf2 = text(LOREM, 0, 0, 100, 100);

    var s = stories(doc());
    assert(s instanceof Stories);
    assert(s.length === 2);

    var sCounter = 0;
    var scb1 = stories(doc(), function(story, i) {
      sCounter++;
    })
    assert(scb1 instanceof Stories);
    assert(sCounter === s.length);
    assert(sCounter === scb1.length);

    var scb2 = stories(doc(), function(story, i) {
      if(story.pointSize === 14) {
        return false;
      }
    })
    assert(isArray(scb2));
    assert(scb2[0] instanceof Story);
    assert(scb2.length < scb1.length);

    linkTextFrames(tf1, tf2);
    var s = stories(doc());
    assert(s.length === 1);
  },

  testTextStyleRanges: function() {
    var myDoc = doc();
    textFont("Helvetica");
    var tf = text(LOREM + " " + LOREM, 0, 0, 100, 100);
    typo(tf.lines[2], "fillColor", color(255, 0, 0));
    typo(tf.lines[2].words[2], "fontStyle", "Italic");

    var tsr = textStyleRanges(tf);
    assert(tsr instanceof TextStyleRanges);
    assert(tsr.length === 5);

    var tsrCounter = 0;
    var tsrcb1 = textStyleRanges(tf, function(textStyleRange, i) {
      tsrCounter++;
    })
    assert(tsrcb1 instanceof TextStyleRanges);
    assert(tsrCounter === tsr.length);
    assert(tsrCounter === tsrcb1.length);

    var tsrcb2 = textStyleRanges(tf, function(textStyleRange, i) {
      if(textStyleRange.fontStyle === "Italic") {
        return false;
      }
    })
    assert(isArray(tsrcb2));
    assert(tsrcb2[0] instanceof TextStyleRange);
    assert(tsrcb2.length < tsrcb1.length);
  },

  testWords: function() {
    var myDoc = doc();
    var tf = text(LOREM, 0, 0, 100, 100);

    var w = words(tf);
    assert(w instanceof Words);

    var wCounter = 0;
    var wcb1 = words(tf, function(word, i) {
      wCounter++;
    })
    assert(wcb1 instanceof Words);
    assert(wCounter === w.length);
    assert(wCounter === wcb1.length);

    var wcb2 = words(tf, function(word, i) {
      if(word.contents === "consectetur") {
        return false;
      }
    })
    assert(isArray(wcb2));
    assert(wcb2[0] instanceof Word);
    assert(wcb2.length < wcb1.length);
  }

});

// print collected test results
basilTest.result();
