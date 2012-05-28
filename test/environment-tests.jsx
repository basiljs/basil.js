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
  }
});

// print collected test results
b.test.result();

