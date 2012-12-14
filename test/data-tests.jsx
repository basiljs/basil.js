#include "../basil.js";
#include "../lib/basil.test.js";

b.test('DataTests', {
    
  testHashList: function(b) {
    
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
    assert(hash.get('two') === 'zwei');        
    assert(hash.hasKey("two"));    
    assert(hash.hasValue("zwei"));    
    
    hash.set("three", true);
    assert(hash.length === 3);    
    assert(hash.get('three') === true);        
    assert(hash.hasKey("three"));
    assert(hash.hasValue(true)); 
    
    hash.set("four", false);
    assert(hash.length === 4);    
    assert(hash.hasKey("four"));    
    assert(hash.get('four') === false);        
    assert(hash.hasValue(false));    
  
    assert(typeof hash.get("bs") === 'undefined');
    
    try {
      hash.set("danger", new Function() );
    } catch (exp) {
      assert(true);
      assert(hash.length === 4); // not added?
      assert(hash.hasValue( new Function()) === false);      
    }
  
    hash.remove("one");
    assert(hash.length === 3);
    

    hash.clear();
    assert(hash.hasKey("four") === false);
    assert(hash.length === 0);



    hash = new HashList(); // start over

    assert(hash.length === 0);
    
    var arr = hash.getSortedKeys();    
    assert(arr.length === 0);
    
    var arr = hash.getKeysSortedByValues(); 
    assert(arr.length === 0);    
    
    hash.set("eight", 8);
    hash.set("thousand", 1000);    
    assert(hash.length === 2);    
    
    
    
    var arr = hash.getSortedKeys();
    assert(arr[0] === "eight");    
    assert(arr[1] === "thousand");        
    
    var arr = hash.getKeysSortedByValues();    
    assert(arr[0] === "thousand");        
    assert(arr[1] === "eight");    
    
  }

});

// print collected test results
b.test.result();

