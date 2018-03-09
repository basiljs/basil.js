/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}

basilTest("DataTests", {

  tearDown: function() {
    close(SaveOptions.no);
  },

  testHashList: function() {

    var hash = new HashList();

    assert(hash.length === 0);

    hash.set("one", 1);
    assert(hash.length === 1);
    assert(hash.get("one") === 1);
    assert(hash.hasKey("one"));
    assert(hash.hasValue(1));

    hash.set("two", "zwei");
    assert(hash.length === 2);
    assert(hash.get("two") === "zwei");
    assert(hash.get("two") === "zwei");
    assert(hash.hasKey("two"));
    assert(hash.hasValue("zwei"));

    hash.set("three", true);
    assert(hash.length === 3);
    assert(hash.get("three") === true);
    assert(hash.hasKey("three"));
    assert(hash.hasValue(true));

    hash.set("four", false);
    assert(hash.length === 4);
    assert(hash.hasKey("four"));
    assert(hash.get("four") === false);
    assert(hash.hasValue(false));

    assert(typeof hash.get("bs") === "undefined");

    try {
      // hash.set("danger", new Function() );
    } catch (exp) {
      assert(true);
      assert(hash.length === 4); // not added?
      assert(hash.hasValue(new Function()) === false); // eslint-disable-line no-new-func

    }

    hash.remove("one");
    assert(hash.length === 3);

    hash.clear();
    assert(hash.hasKey("four") === false);
    assert(hash.length === 0);

  },

  testHashList2: function (b) {

    var hash = new HashList(); // start over

    assert(hash.length === 0);

    var arr = hash.getSortedKeys();
    assert(arr.length === 0);

    arr = hash.getKeys();
    assert(arr.length === 0);

    arr = hash.getValues();
    assert(arr.length === 0);

    arr = hash.getKeysByValues();
    assert(arr.length === 0);

    hash.set("eight", 8);
    hash.set("thousand", 1000);

    assert(typeof hash.get("watch") === "function");    // this is not nice
    hash.set("watch", 0); // it's a prototype function
    assert(hash.length === 3);
    assert(typeof hash.get("watch") === "number");

    arr = hash.getKeys();
    assert(arr[0] === "eight");
    assert(arr[1] === "thousand");
    assert(arr[2] === "watch");

    arr = hash.getValues();
    assert(arr[0] === 8);
    assert(arr[1] === 1000);
    assert(arr[2] === 0);

    arr = hash.getSortedKeys();
    assert(arr[0] === "eight");
    assert(arr[1] === "thousand");
    assert(arr[2] === "watch");

    arr = hash.getKeysByValues();
    assert(arr[0] === "thousand");
    assert(arr[1] === "eight");
    assert(arr[2] === "watch");

    // TODO: initial function removal in items?


  },

  testIsText: function(b) {
    var myDoc = doc();

    var tf = text(LOREM, 0, 0, 200, 200);

    assert(isText(characters(tf)));
    assert(isText(characters(tf)[0]));

    assert(isText(tf.insertionPoints));
    assert(isText(tf.insertionPoints.firstItem()));

    assert(isText(words(tf)));
    assert(isText(words(tf).firstItem()));

    assert(isText(lines(tf)));
    assert(isText(lines(tf).firstItem()));

    assert(isText(tf.textStyleRanges));
    assert(isText(tf.textStyleRanges.firstItem()));

    assert(isText(paragraphs(tf)));
    assert(isText(paragraphs(tf).firstItem()));

    assert(isText(tf.textColumns));
    assert(isText(tf.textColumns.firstItem()));

    assert(isText(tf.characters.itemByRange(0, 2))); // [object Text]
  },

  testIsNumber: function() {
    assert(isNumber(null) === false);
    assert(isNumber(undefined) === false);
    assert(isNumber(true) === false);
    assert(isNumber(false) === false);
    assert(isNumber({}) === false);
    assert(isNumber([]) === false);
    assert(isNumber(function(){}) === false);

    assert(isNumber("-33") === false);
    assert(isNumber("0") === false);
    assert(isNumber("0.5") === false);

    assert(isNumber(0) === true);
    assert(isNumber(-0) === true);
    assert(isNumber(0.6) === true);
    assert(isNumber(66.123456789) === true);
    assert(isNumber(43) === true);
    assert(isNumber(-24) === true);
  }

});

// print collected test results
basilTest.result();

