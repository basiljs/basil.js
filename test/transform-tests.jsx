if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js";  
}

b.test('TransformTests', {
  
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) { 
    b.close(SaveOptions.no); 
  },

  testMoveX: function(b) {
    var doc = b.doc();
    // create box at 0,0
    var rect = b.rect(0,0,100,100);
    assert( b.itemX(rect) === 0);    
    // move to 50,0
    b.itemX(rect, 50);
    // check new x coordinate
    assert( b.itemX(rect) === 50);
  },

  testMoveY: function(b) {
    var doc = b.doc();
    // create box at 0,0
    var rect = b.rect(0,0,100,100);
    assert( b.itemY(rect) === 0);    
    // move to 50,0
    b.itemY(rect, 50);
    // check new x coordinate
    assert( b.itemY(rect) === 50);
  },

  testPosition: function(b) {
    var doc = b.doc();
    // create box at 0,0
    var rect = b.rect(0,0,100,100);
    assert( b.itemPosition(rect).x === 0 && b.itemPosition(rect).y === 0);    
    // move to 50,0
    b.itemPosition(rect, 50, 50);
    // check new x coordinate
    assert( b.itemPosition(rect).x === 50 && b.itemPosition(rect).y === 50);    
  },

  testWidth: function(b) {
    var doc = b.doc();
    // create box at 0,0
    var rect = b.rect(0,0,100,100);
    assert( b.itemWidth(rect) === 100 );    
    // move to 50,0
    b.itemWidth(rect, 50);
    // check new x coordinate
    assert( b.itemWidth(rect) === 50 );    
  },

  testHeight: function(b) {
    var doc = b.doc();
    // create box at 0,0
    var rect = b.rect(0,0,100,100);
    assert( b.itemHeight(rect) === 100 );    
    // move to 50,0
    b.itemHeight(rect, 50);
    // check new x coordinate
    assert( b.itemHeight(rect) === 50 );    
  },

  testSize: function(b) {
    var doc = b.doc();
    // create box at 0,0
    var rect = b.rect(0,0,100,100);
    assert( b.itemSize(rect).width === 100 && b.itemSize(rect).height === 100 );    
    // move to 50,0
    b.itemSize(rect, 50, 50);
    // check new x coordinate
    assert( b.itemSize(rect).width === 50 && b.itemSize(rect).height === 50 );    
  }

  // todo: add matrix transformation tests here ...

});

// print collected test results
b.test.result();

