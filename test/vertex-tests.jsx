if (typeof b === 'undefined') {
  #include "../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../lib/basil.test.js";  
}

b.test('VertexTests', {
  
  setUpTest: function(b) {
  },

  tearDownTest: function(b) {
  },

  setUp: function(b) {
  },

  tearDown: function(b) { 
    b.close(SaveOptions.no); 
  },

  testVertex: function(b) {

    b.beginShape();
    
    b.vertex(0,0);
    b.vertex(-10,0);
    b.vertex(-10,10);

    var shape = b.endShape();
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 3);
    
    b.beginShape();
    
    b.vertex(0,0);
    b.vertex(-10,0);
    b.vertex(-10,10);
    
    b.addPath();
    
    b.vertex(0,0);
    b.vertex(-10,0); 

    var shape = b.endShape();
    
    assert(shape instanceof GraphicLine);
    assert(shape.paths.item(0).entirePath.length === 3);        
    assert(shape.paths.item(1).entirePath.length === 2);    
    
    
    b.beginShape();
    
    b.vertex(0,0);
    b.vertex(-10,0);
    b.vertex(-10,10);

    var shape = b.endShape(b.CLOSE);
    assert(shape instanceof GraphicLine);    
    
    assert(shape.paths.length === 2);
    assert(shape.paths.item(0).entirePath.length === 3);    
    
  }


});

// print collected test results
b.test.result();

