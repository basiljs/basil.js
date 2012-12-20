if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js";  
}

b.test('InputTests', {
  
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testFindByLabel: function(b) {
    var label = 'foo';
    var textFrame1 = b.text('foo', 0, 0, 300, 300);
    textFrame1.label = label;

    var found = b.labels(label);
    
    assert(found.length === 1);
    assert(found[0] instanceof TextFrame);
  },

  testFindByLabelWithMultipleItemsWithSameLabel: function(b) {
    var label = 'foo';
    var textFrame1 = b.text('foo', 0, 0, 300, 300);
    textFrame1.label = label;
    var textFrame2 = b.text('bar', 0, 0, 300, 300);
    textFrame2.label = label;

    var found = b.labels(label);

    assert(found.length === 2);
  },

  testFindByLabelWithNotExistingLabel: function(b) {
    var found = b.labels('bar');

    assert(found.length === 0);
  }
});

// print collected test results
b.test.result();
