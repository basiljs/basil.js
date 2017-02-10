// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

// example shows how to use a HashList to count the occurrence of words in a text

function draw() {

  b.canvasMode(b.MARGIN);

  var hash = new HashList();

  var longString = "Lor!$$em! ipsum!! dolor? ??!! sit amet, consetetur... --- ... sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. watch. watch.";
  var tf1 = b.text(longString, 0, 0, b.width, 200);
  var tf2 = b.text(longString, 0, 220, b.width, 200);
  var tf3 = b.text("", 0, 440, b.width, 200);
  var words = longString.split(" ");

  var str;
  for(var i = 0; i < words.length; i++) {
    str = words[i];
    str = b.trimWord(str);
    if (str === "") {
      continue;
    } // special case: nothing left after trimWord
        // count the number of occurances
    if(hash.hasKey(str)) {
      b.println(str);
      hash.set(str, hash.get(str) + 1);
    } else {
      hash.set(str, 1);
    }
  }

  var keys = (hash.getKeysByValues()); // sorts it by the number of its occurences.
  var result1 = "";
  var result2 = "";
  for (var j = 0; j < keys.length; j++) {
    var word = keys[j];
    for (var n = 0; n < hash.get(word); n++) {
      result1 += word + " ";
    }
    result2 += (word + " : " + hash.get(word) + ", ");
  }
  tf2.contents = result1;
  tf3.contents = result2;

}

b.go();
