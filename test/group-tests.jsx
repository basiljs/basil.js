if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js"; 
}

b.test('GroupTests', {
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },
  
  // testFindGroup: function(b) {
  //   // find the Group by a given name
  //   // be sure to create a Group called 'Circles'
  //   var circles = b.group('Circles');
  //   b.itemPosition( circles, 0,0 );
  //   circles.fillColor = b.color( 0, 255, 178 );

  //   // get the bounds of our Group
  //   b.println( b.bounds(circles).width );

  //   assert(circles instanceof Group);
  //   assert(group.length > 1);
  // },

  testCreateGroup: function(b) {
    // create a Group from selection
    // be sure to have some objects selected
    var sel = b.selections();
    var group = b.group( sel, 'Selected' );

    assert(sel instanceof Group);
    assert(group.length > 1);
  },

  testUngroup: function(b) {
    // ungroup our selected items
    var items = b.ungroup( 'Selected' );

    // fill our previously grouped items with random colors
    for( var i=0;i<items.length;i++ ) {
      var newRandomColor = b.color(
        b.random(0,255),
        b.random(0,255),
        b.random(0,255)
      );
      items[i].fillColor = newRandomColor;
    }

    assert(items !instanceof Group);
  }

});

// print collected test results
b.test.result();
