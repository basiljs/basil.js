/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("InputTests", {

  setUpTest: function() {
  },

  tearDownTest: function() {
  },

  setUp: function() {
  },

  tearDown: function() {
    close(SaveOptions.no);
  },

  testFindByLabel: function() {
    var myLabel = "foo";
    var textFrame1 = text("foo", 0, 0, 300, 300);
    textFrame1.label = myLabel;

    var found = labels(myLabel);

    assert(found.length === 1);
    assert(found[0] instanceof TextFrame);
  },

  testFindByLabelWithMultipleItemsWithSameLabel: function() {
    var myLabel = "foo";
    var textFrame1 = text("foo", 0, 0, 300, 300);
    textFrame1.label = myLabel;
    var textFrame2 = text("bar", 0, 0, 300, 300);
    textFrame2.label = myLabel;

    var found = labels(myLabel);

    assert(found.length === 2);
  },

  testFindByLabelWithNotExistingLabel: function() {
    try{
      var found = labels("bar");
    } catch (e) {
      assert(true);
    }

  }
});

// print collected test results
basilTest.result();
