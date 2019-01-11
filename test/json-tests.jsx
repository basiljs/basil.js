/* globals assert */
if (!$.global.VERSION) {
  var basilTest = null;
  // @include "../basil.js";
}
if (!basilTest) {
  // @include "../lib/basil.test.js";
}
basilTest("JSONTests", {

  tearDown: function() {
    close(SaveOptions.no);
  },
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
  }

});

basilTest.result();