#include "../basil.js";
#include "../lib/basil.test.js";

b.test('EnvironmentTests', {
  
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    forEach(app.documents, function(doc) {
      doc.close(SaveOptions.no);
    });
  },

  testDocCreatesDocument: function(b) {
    var doc = b.doc();
        
    assert(doc instanceof Document);
    assert(app.documents.length === 1);
  },

  testDocSetsDocumentByInstance: function(b) {
    var doc = app.documents.add();

    var currDoc = b.doc(doc);
        
    assert(doc == currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNonDocumentInstance: function(b) {
    var doc = app.documents.add();

    var currDoc = b.doc({});
    
    assert(doc == currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNotExistingDocumentThrowsError: function(b) {
    var doc = app.documents.add();
    doc.close(SaveOptions.no);

    try {
      b.doc(doc);
      assert(false);
    } catch (expected) {}
  },

  testPageSetsPageByInstance: function(b) {
    var doc = app.documents.add();
    doc.pages.add();
    var secondPage = doc.pages.add();
    b.doc(doc);

    var page = b.page(doc.pages.item(2));
    
    assert(page instanceof Page);
    assert(secondPage == page);
  },

  testPageSetsPageByIndex: function(b) {
    var doc = app.documents.add();
    doc.pages.add();
    var secondPage = doc.pages.add();
    b.doc(doc);

    var page = b.page(2);
    
    assert(page instanceof Page);
    assert(secondPage == page);
  },

  testPageWithNotExistingPageIndexThrowsError: function(b) {
    var doc = app.documents.add();
    b.doc(doc);

    try {
      b.page(500);
      assert(false);
    } catch (expected) {}
  },

  testSpreadSetsSpreadByInstance: function(b) {
    var doc = app.documents.add();
    doc.spreads.add();
    var secondSpread = doc.spreads.add();
    b.doc(doc);

    var spread = b.spread(doc.spreads.item(2));
    
    assert(spread instanceof Spread);
    assert(secondSpread == spread);
  },

  testSpreadSetsSpreadByIndex: function(b) {
    var doc = app.documents.add();
    doc.spreads.add();
    var secondSpread = doc.spreads.add();
    b.doc(doc);

    var spread = b.spread(2);
    
    assert(spread instanceof Spread);
    assert(secondSpread == spread);
  },

  testSpreadWithNotExistingSpreadIndexThrowsError: function(b) {
    var doc = app.documents.add();
    b.doc(doc);

    try {
      b.spread(500);
      assert(false);
    } catch (expected) {}
  }
});

// print collected test results
b.test.result();

