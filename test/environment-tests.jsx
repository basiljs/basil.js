#include "../basil.js";
#include "../lib/basil.test.js";

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

  testDocCreatesDocument: function(b) {
    var doc = b.doc();
        
    assert(doc instanceof Document);
    assert(app.documents.length === 1);
  },

  testDocSetsDocumentByInstance: function(b) {
    var doc = app.documents.add();

    var currDoc = b.doc(doc);
        
    assert(doc == currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNonDocumentInstance: function(b) {
    var doc = app.documents.add();

    var currDoc = b.doc({});

    assert(doc == currDoc);
    assert(app.documents.length === 1);
  },

  testDocWithNotExistingDocumentThrowsError: function(b) {
    var doc = app.documents.add();
    doc.close(SaveOptions.no);

    try {
      b.doc(doc);
      assert(false);
    } catch (expected) {}
  },

  testPageSetsPageByInstance: function(b) {
    var doc = app.documents.add();
    doc.pages.add();
    var secondPage = doc.pages.add();
    b.doc(doc);

    var page = b.page(secondPage);
    
    assert(page instanceof Page);
    assert(secondPage == page);
  },

  testPageSetsPageByIndex: function(b) {
    var doc = app.documents.add();
    doc.pages.add();
    var secondPage = doc.pages.add();
    b.doc(doc);

    var page = b.page(3);
    
    assert(page instanceof Page);
    assert(secondPage == page);
  },

  testPageWithNotExistingPageIndexThrowsError: function(b) {
    b.doc(app.documents.add());

    try {
      b.page(500);
      assert(false);
    } catch (expected) {}
  },

  testPageManagement: function(b) {
      
    b.doc();
    
    assert(b.pageNumber() === 1);
    assert(b.pageCount() === 1);
    b.addPage();
    assert(b.pageNumber() === 2);    
    assert(b.pageCount() === 2);
    b.addPage(b.AT_BEGINNING);
    assert(b.pageNumber() === 1);    
    assert(b.pageCount() === 3); 
    b.page(2);
    assert(b.pageNumber() === 2);        
    b.addPage(b.BEFORE);
    assert(b.pageNumber() === 2);    
    assert(b.pageCount() === 4);     
    b.addPage(b.AFTER);
    assert(b.pageNumber() === 3);    
    assert(b.pageCount() === 5);    

    b.removePage();

    assert(b.pageNumber() === 3);    // stays
    assert(b.pageCount() === 4);        

    b.removePage(1);
    assert(b.pageNumber() === 2);   
    assert(b.pageCount() === 3);        
    
    b.removePage(b.pageCount()); 
    assert(b.pageNumber() === 2);    // stays
    assert(b.pageCount() === 2);        
    
    b.addPage();
    assert(b.pageNumber() === 3);    // stays
    assert(b.pageCount() === 3);          

  },

  testLayerSetsLayerByInstance: function(b) {
    var doc = app.documents.add();
    var addedLayer = doc.layers.add({name: 'foo'});
    b.doc(doc);

    var layer = b.layer(addedLayer);
    
    assert(layer instanceof Layer);
    assert(addedLayer == layer);
  },

  testLayerSetsLayerByName: function(b) {
    var doc = app.documents.add();
    var addedLayer = doc.layers.add({name: 'foo'});
    b.doc(doc);

    var layer = b.layer('foo');
    
    assert(layer instanceof Layer);
    assert(addedLayer == layer);
  },

  testLayerWithNotExistingLayerNameAddsLayer: function(b) {
    var doc = app.documents.add();
    b.doc(doc);

    var layer = b.layer('foo');
    
    assert(layer instanceof Layer);
    assert(doc.layers.item('foo') == layer);
  },

  testClear: function(b) {

    b.doc();
    b.layer("fancy");
    b.ellipse(20,20,20,20);
    assert(b.doc().allPageItems.length === 1);
    b.clear(b.layer("fancy"));    
    assert(b.doc().allPageItems.length === 0);    
    b.ellipse(20,20,20,20);    
    assert(b.doc().allPageItems.length === 1);    
    b.clear(b.page());   
    assert(b.doc().allPageItems.length === 0);    
    b.ellipse(20,20,20,20);
    assert(b.doc().allPageItems.length === 1);    
    b.clear(b.doc());
    assert(b.doc().allPageItems.length === 0);    

//    b.clearSwatches();
   
  },

  testForEachItems: function(b) {

    b.doc();
    b.page();
    b.layer("fancy");

    b.ellipse(20,20,20,20);
    b.ellipse(40,70,20,20);
    
    var result1 = result2 = result3 = 0;
    
    // process all items on a layer
    b.items( b.layer("fancy"), function( item, n ) {
                result1++;
        }
    );
    
    // process all items on a page
    b.items( b.page(), function( item, n ) {
                result2++;
        }
    );
    
    // process all items in document
    b.items( b.doc(), function( item, n ) {
                result3++;
        }
    );
    
    assert( result1 === 2 && result2 === 2 && result3 === 2 );
  },

  testCollectionGetters: function (b) {

    b.doc();
    b.page();
    var obj = b.text("Hello Basil!", 0,0,100,100);

// process all items on a layer
    var arr = b.characters( obj );
    assert(arr instanceof Characters);
    var counter = 0;
    b.characters(obj, function(){counter++;});
    assert(counter === 12);
    
    var arr = b.words( obj );
    assert(arr instanceof Words);
    counter = 0;    
    b.words(obj, function(){counter++;});    
    assert(counter === 2);
    
    var arr = b.lines( obj );
    assert(arr instanceof Lines);
    counter = 0;    
    b.lines(obj, function(){counter++;});    
    assert(counter === 1);
    
    var arr = b.paragraphs( obj );
    assert(arr instanceof Paragraphs);
    counter = 0;    
    b.paragraphs(obj, function(){counter++;});   
    assert(counter === 1);
    
    var arr = b.stories( b.doc() );
    assert(arr instanceof Stories);
    counter = 0;    
    b.stories(b.doc(), function(){counter++;});    
    assert(counter === 1);
  
  }

});

// print collected test results
b.test.result();

