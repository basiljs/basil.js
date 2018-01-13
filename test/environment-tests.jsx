/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("EnvironmentTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testSizeAllNumberArgs: function() {
    var myDoc = doc();
    size(100, 200);

    assert(myDoc.documentPreferences.pageWidth === 100);
    assert(myDoc.documentPreferences.pageHeight === 200);
  },
  testSizeAllPageSizePresetArgs: function() {
    var myDoc = doc();
    myDoc.documentPreferences.pageWidth = 1000;
    myDoc.documentPreferences.pageHeight = 500;

    units(PX);
    size("800 x 600", PORTRAIT);
    assert(myDoc.documentPreferences.pageHeight > myDoc.documentPreferences.pageWidth);
    assert(myDoc.documentPreferences.pageWidth === 600);
    assert(myDoc.documentPreferences.pageHeight === 800);

    size("1024 x 768", LANDSCAPE);
    assert(myDoc.documentPreferences.pageHeight < myDoc.documentPreferences.pageWidth);
    assert(myDoc.documentPreferences.pageWidth === 1024);
    assert(myDoc.documentPreferences.pageHeight === 768);
  },
  testSizeOneNumberArg: function() {
    var myDoc = doc();
    size(100);
    assert(myDoc.documentPreferences.pageWidth === 100);
    assert(myDoc.documentPreferences.pageHeight === 100);
  },
  testSizeOnePageSizePresetArg: function() {
    var myDoc = doc();
    myDoc.documentPreferences.pageWidth = 1000;
    myDoc.documentPreferences.pageHeight = 500;

    units(PX);
    size("800 x 600");
    assert(myDoc.documentPreferences.pageWidth === 800);
    assert(myDoc.documentPreferences.pageHeight === 600);
  },
  testSizeNoArg: function() {
    var myDoc = doc();
    var result = size();
    assert(result instanceof Object);
    assert(result.hasOwnProperty("height") === true);
    assert(result.hasOwnProperty("width") === true);
    assert(result.height === height);
    assert(result.width === width);

  },
  testDocCreatesDocument: function() {
    var myDoc = doc();

    assert(myDoc instanceof Document);
    assert(app.documents.length === 1);
  },

  testDocSetsDocumentByInstance: function() {
    var myDoc = doc();

    var currDoc = doc(myDoc);

    assert(myDoc === currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNonDocumentInstance: function() {
    var myDoc = doc();

    var currDoc = doc({});

    assert(myDoc === currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNotExistingDocumentThrowsError: function() {
    var myDoc = doc();
    myDoc.close(SaveOptions.no);

    try {
      doc(myDoc);
      assert(false);
    } catch (expected) {} // eslint-disable-line no-empty
  },

  testPageSetsPageByInstance: function() {
    var myDoc = doc();
    myDoc.pages.add();
    var secondPage = myDoc.pages.add();
    doc(myDoc);

    var myPage = page(secondPage);

    assert(myPage instanceof Page);
    assert(secondPage === myPage);
  },

  testPageSetsPageByIndex: function() {
    var myDoc = doc();
    myDoc.pages.add();
    var secondPage = myDoc.pages.add();
    doc(myDoc);

    var myPage = page(3);

    assert(myPage instanceof Page);
    assert(secondPage === myPage);
  },

  testPageWithNotExistingPageIndexThrowsError: function() {
    doc(doc());

    try {
      page(500);
      assert(false);
    } catch (expected) {} // eslint-disable-line no-empty
  },

  testPageManagement: function() {

    doc();

    assert(pageNumber() === 1);
    assert(pageCount() === 1);
    addPage();
    assert(pageNumber() === 2);
    assert(pageCount() === 2);
    addPage(AT_BEGINNING);
    assert(pageNumber() === 1);
    assert(pageCount() === 3);
    page(2);
    assert(pageNumber() === 2);
    addPage(BEFORE);
    assert(pageNumber() === 2);
    assert(pageCount() === 4);
    addPage(AFTER);
    assert(pageNumber() === 3);
    assert(pageCount() === 5);

    removePage();
    // this behaves differently according to the facing pages mode
    if(doc().documentPreferences.facingPages) {
      assert(pageNumber() === 2);
    } else {
      assert(pageNumber() === 3);
    }
    assert(pageCount() === 4);

    removePage(1);
    assert(pageNumber() === 1);   // new number 1
    assert(pageCount() === 3);

    removePage(pageCount());
    assert(pageNumber() === 2);
    assert(pageCount() === 2);

    addPage();
    assert(pageNumber() === 3);
    assert(pageCount() === 3);
  },

  testLayerSetsLayerByInstance: function() {
    var myDoc = doc();
    var addedLayer = myDoc.layers.add({name: "foo"});
    doc(myDoc);

    var myLayer = layer(addedLayer);

    assert(myLayer instanceof Layer);
    assert(addedLayer === myLayer);
  },

  testLayerSetsLayerByName: function() {
    var myDoc = doc();
    var addedLayer = myDoc.layers.add({name: "foo"});
    doc(myDoc);

    var myLayer = layer("foo");

    assert(myLayer instanceof Layer);
    assert(addedLayer === myLayer);
  },

  testLayerWithNotExistingLayerNameAddsLayer: function() {
    var myDoc = doc();
    doc(myDoc);

    var myLayer = layer("foo");

    assert(myLayer instanceof Layer);
    assert(myDoc.layers.item("foo") === myLayer);
  },

  testClear: function() {

    doc();
    layer("fancy");
    ellipse(20, 20, 20, 20);
    assert(doc().allPageItems.length === 1);
    clear(layer("fancy"));
    assert(doc().allPageItems.length === 0);
    ellipse(20, 20, 20, 20);
    assert(doc().allPageItems.length === 1);
    clear(page());
    assert(doc().allPageItems.length === 0);
    ellipse(20, 20, 20, 20);
    assert(doc().allPageItems.length === 1);
    clear(doc());
    assert(doc().allPageItems.length === 0);

  },

  testRemove: function() {

    doc();
    var obj = ellipse(20, 20, 20, 20);
    assert(obj.isValid);
    remove(obj);
    assert(!obj.isValid);

    obj = color(255, 255, 255);
    assert(obj.isValid);
    remove(obj);
    assert(!obj.isValid);

    obj = layer("fancy");
    assert(obj.isValid);
    remove(obj);
    assert(!obj.isValid);

    obj = addPage();
    assert(obj.isValid);
    remove(obj);
    assert(!obj.isValid);

  },

  testForEachItems: function() {

    doc();
    page();
    layer("fancy");

    ellipse(20, 20, 20, 20);
    ellipse(40, 70, 20, 20);
    var result2, result3;

    var result1 = result2 = result3 = 0;

    // process all items on a layer
    items(layer("fancy"), function(item, n) {
      result1++;
    }
    );

    // process all items on a page
    items(page(), function(item, n) {
      result2++;
    }
    );

    // process all items in document
    items(doc(), function(item, n) {
      result3++;
    }
    );

    assert(result1 === 2 && result2 === 2 && result3 === 2);
  },

  testCollectionGetters: function () {

    doc();
    page();
    var obj = text("Hello Basil!", 0, 0, 100, 100);

// process all items on a layer
    var arr = characters(obj);
    assert(arr instanceof Characters);
    var counter = 0;
    characters(obj, function() {
      counter++;
    });
    assert(counter === 12);

    arr = words(obj);
    assert(arr instanceof Words);
    counter = 0;
    words(obj, function() {
      counter++;
    });
    assert(counter === 2);

    arr = lines(obj);
    assert(arr instanceof Lines);
    counter = 0;
    lines(obj, function() {
      counter++;
    });
    assert(counter === 1);

    arr = paragraphs(obj);
    assert(arr instanceof Paragraphs);
    counter = 0;
    paragraphs(obj, function() {
      counter++;
    });
    assert(counter === 1);

    arr = stories(doc());
    assert(arr instanceof Stories);
    counter = 0;
    stories(doc(), function() {
      counter++;
    });
    assert(counter === 1);

  },

  testRevertSavedDoc: function () {

     var myDoc = doc();
     var docCount = app.documents.length;

     var testFile = File("~/Desktop/basil_testingRevert_temp.indd");
     myDoc.save(testFile);

     ellipse(20, 20, 20, 20);
     revert();

     assert(app.documents.length === docCount);
     assert(doc().name === "basil_testingRevert_temp.indd");
     assert(doc().pageItems.length === 0);

     close(SaveOptions.NO);
     // removing the temp document
     testFile.remove();
  },

  testRevertUnsavedDoc: function () {

     var myDoc = doc();
     var docCount = app.documents.length;

     ellipse(20, 20, 20, 20);
     revert();

     assert(app.documents.length === docCount);
     assert(doc().pageItems.length === 0);

  }

});

// print collected test results
basilTest.result();
