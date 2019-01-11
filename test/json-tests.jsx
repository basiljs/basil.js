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
    assert(JSON.parse('1.0000000000000001') === 1);
    try{
      JSON.parse(notjson);
    }catch(e){
      assert(true);
    }
  },
  testJSONFromStringWithStrangeResult: function(){
    $.write("JSON.parse('1.000000000000001') should give a result of ");
    var parsed = JSON.parse('1.000000000000001');
    $.writeln(parsed);
    $.writeln("assert(JSON.parse('1.000000000000001') === 1.000000000000001) does...");
    assert(JSON.parse('1.000000000000001') === 1.000000000000001);
  }

});

basilTest.result();