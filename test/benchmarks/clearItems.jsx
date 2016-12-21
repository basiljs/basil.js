// @include "../../basil.js";

function draw() {

  b.close(false);

  var doc = b.doc();

  b.noFill();
  var x, y;

  var count = 500;
  var layer = null;
  for (var i = 0; i < count * 2; i += 1) {
    x = b.random(b.width);
    y = b.random(b.height);
    b.ellipse(x, y, 50, 50);
    if(i === count - 1) {
      layer = b.layer("Layer 2");
    }
  }
  var group = null;
  var page = b.addPage();
  for (var j = 0; j < count * 2; j += 1) {
    x = b.random(b.width);
    y = b.random(b.height);
    b.ellipse(x, y, 50, 50);
    if(j === count - 1) {
      group = b.group(b.items(b.page()));
    }
  }

  var time = b.millis();
  b.clear(group);
  b.println("Clearing " + count + " grouped items: " + ((b.millis() - time) / 1000) + " seconds.");

  time = b.millis();
  b.clear(page);
  b.println("Clearing " + count + " items on page: " + ((b.millis() - time) / 1000) + " seconds.");

  b.page(1);

  time = b.millis();
  b.clear(layer);
  b.println("Clearing " + count + " items on layer: " + ((b.millis() - time) / 1000) + " seconds.");

  time = b.millis();
  b.clear(doc);
  b.println("Clearing " + count + " items in document: " + ((b.millis() - time) / 1000) + " seconds.");
}

b.go();
