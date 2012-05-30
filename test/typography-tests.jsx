#include "../basil.js";
#include "../lib/basil.test.js";

b.test('TypographyTests', {
  doc: null, 
  layer: null,
  
  setUpTest: function(b) {
    doc = app.documents.add();
  },

  tearDownTest: function(b) {
    b.close(SaveOptions.no);
  },

  setUp: function(b) {
    layer = doc.layers.add({name: 'test layer'});
  },

  tearDown: function(b) {
    layer.remove();
  },

  testWriteText: function(b) {
    var contents = 'foo bar';
    
    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents, 0, 0, 300, 300);
        
    assert(layer.textFrames.length === 1);
    assert(layer.textFrames[0].contents === contents);
  },

  testCreateMultipleTextFrames: function(b) {
    var contents1 = 'foo bar',
      contents2 = 'bar foo';
      
    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents1, 0, 0, 300, 300);
    b.text(contents2, 50, 50, 300, 300);
        
    assert(layer.textFrames.length === 2);
    assert(layer.textFrames[0].contents !== layer.textFrames[1].contents);
    assert(layer.textFrames[0].contents === contents1 || contents2);
    assert(layer.textFrames[1].contents === contents1 || contents2);
  },

  testWriteTextWithSpecialCharacters: function(b) {
    var contents = 'Copyright: ©, Euro: €';
    
    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents, 0, 0, 300, 300);
        
    assert(layer.textFrames.length === 1);
    assert(layer.textFrames[0].contents === contents);
  },

  testWriteTextWithCarriageReturns: function(b) {
    var contents = 'foo\rbar\rfoobar';
    
    b.doc(doc);
    b.page(0);
    b.layer(layer);
    b.text(contents, 0, 0, 300, 300);
        
    assert(layer.textFrames.length === 1);
    assert(layer.textFrames[0].contents === contents);
    assert(layer.textFrames[0].contents.split('\r').length === 3);
  }
});

// print collected test results
b.test.result();

