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

// ----------------------------------------
// Data/Conversion
// ----------------------------------------

  testHexUnhex: function() {
    var myDoc = doc();

    var i = 1234;
    var j = 762387452;
    var k = -2034856;

    assert(unhex(hex(i)) === i
      && unhex(hex(j)) === j
      && unhex(hex(k)) === k);
  },

// ----------------------------------------
// Data/HashList
// ----------------------------------------

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

  testHashList2: function () {

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

// ----------------------------------------
// Data/JSON
// ----------------------------------------

  testJSONFromString: function() {
    var json = '{"foo":"bah"}';
    var notjson =  '{"foo":"bah}';
    assert(typeof (JSON.parse(json)) === 'object');
    assert(JSON.parse('1.0000000000000001') === 1); //should get truncated to 1
    assert(JSON.parse('1.00000000000001') === 1.00000000000001);
    try{
      JSON.parse(notjson);// should thorw an error
    }catch(e){
      assert(true);
    }
  },

// ----------------------------------------
// Data/String Functions
// ----------------------------------------

  testContains: function() {

    var str = "The quick brown 🦊 jumps over 8 lazy dogs.";

    assert(contains(str, "quick brown"), "string contains");
    assert(contains(str, "The quick"), "string contains - beginning");
    assert(contains(str, "lazy dogs."), "string contains - end");
    assert(contains(str, "q"), "string contains - single character");
    assert(contains(str, "🦊"), "string contains - special characters");
    assert(contains(str, "The quick brown 🦊 jumps over 8 lazy dogs."), "string contains - entire string");

    assert(contains(str, "quick green") === false, "string doesn't contain");
    assert(contains(str, 8) === false, "string doesn't contain - wrong type");


    var arr = ["Peach", 23, "Plum", 45, "Pear"];
    var arrZero = [];

    assert(contains(arr, "Plum"), "array contains");
    assert(contains(arr, "Peach"), "array contains - first element");
    assert(contains(arr, "Pear"), "array contains - last element");
    assert(contains(arr, 23), "array contains - number");

    assert(contains(arr, "Banana") === false, "array doesn't contain");
    assert(contains(arrZero, "Banana") === false, "array doesn't contain - zero length");
    assert(contains(arrZero, undefined) === false, "array doesn't contain - zero length undefined");
  },

  testEndsWith: function() {

    var str = "The quick brown 🦊 jumps over 8 lazy dogs.";

    assert(endsWith(str, "lazy dogs."), "string ends with");
    assert(endsWith(str, "."), "string ends with - single character");
    assert(endsWith(str, "🦊 jumps over 8 lazy dogs."), "string ends with - special characters");
    assert(endsWith(str, "The quick brown 🦊 jumps over 8 lazy dogs."), "string ends with - entire string");

    assert(endsWith(str, "crazy dogs.") === false, "string doesn't end with");
    assert(endsWith(str, "quick brown") === false, "string doesn't end with - contained value");


    var arr = ["Peach", 23, "Plum", 45, "Pear"];
    var arrZero = [];

    assert(endsWith(arr, "Pear"), "array ends with");

    assert(endsWith(arr, "Plum") === false, "array doesn't end with");
    assert(endsWith(arrZero, "Pear") === false, "array doesn't end with - zero length");
    assert(endsWith(arrZero, undefined) === false, "array doesn't end with - zero length undefined");
  },

  testStartsWith: function() {

    var str = "The quick brown 🦊 jumps over 8 lazy dogs.";

    assert(startsWith(str, "The quick"), "string starts with");
    assert(startsWith(str, "T"), "string starts with - single character");
    assert(startsWith(str, "The quick brown 🦊"), "string starts with - special characters");
    assert(startsWith(str, "The quick brown 🦊 jumps over 8 lazy dogs."), "string starts with - entire string");

    assert(startsWith(str, "The slow") === false, "string doesn't start with");
    assert(startsWith(str, "quick brown") === false, "string doesn't start with - contained value");


    var arr = ["Peach", 23, "Plum", 45, "Pear"];
    var arrZero = [];

    assert(startsWith(arr, "Peach"), "array starts with");

    assert(startsWith(arr, "Plum") === false, "array doesn't start with");
    assert(startsWith(arrZero, "Peach") === false, "array doesn't start with - zero length");
    assert(startsWith(arrZero, undefined) === false, "array doesn't start with - zero length undefined");
  },

// ----------------------------------------
// Data/Type-Check
// ----------------------------------------

  testIsArray: function() {
    var myDoc = doc();

    var arr1 = [];
    assert(isArray(arr1));

    var arr2 = [1, 2, 3];
    assert(isArray(arr2));

    var arr3 = new Array;
    assert(isArray(arr3));

    assert(isArray(doc().allPageItems), "empty allPageItems array");

    var txt = text(LOREM, 0, 0, 20, 20);

    assert(isArray(doc().allPageItems), "non-empty allPageItems array");

    assert(isArray(txt.geometricBounds));

    assert(!isArray(txt.words), "collection is not an array");

  },

  testIsText: function() {
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

