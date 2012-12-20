if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js";  
}

b.test('EnvironmentTests', {
  
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) {
    b.close(SaveOptions.no);
  },

  testHexUnhex: function(b) {
    var doc = b.doc();
    var i = 1234;
    var j = 762387452;
    var k = -2034856;
    
    assert( b.unhex(b.hex(i)) == i
      && b.unhex(b.hex(j)) == j 
      && b.unhex(b.hex(k)) == k);    
  }



});

// print collected test results
b.test.result();

