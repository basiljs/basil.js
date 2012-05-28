#include "../basil.js";
#include "../lib/basil.test.js";

b.test('InputTests', {
  
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

  testFindByLabel: function(b) {
    var label = 'foo';
    var textFrame1 = b.text('foo', 0, 0, 300, 300);
    textFrame1.label = label;

    var found = b.findByLabel(label);
    
    assert(found.length === 1);
  },

  testFindByLabelWithMultipleItemsWithSameLabelThrowsError: function(b) {
    var label = 'foo';
    var textFrame1 = b.text('foo', 0, 0, 300, 300);
    textFrame1.label = label;
    var textFrame2 = b.text('bar', 0, 0, 300, 300);
    textFrame2.label = label;

    var found = b.findByLabel(label);

    assert(found.length === 2);
  }
});

// print collected test results
b.test.result();
