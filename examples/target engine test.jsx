#include "../basil.js";
b.println($.engineName);
var counter = 0;
for(var prop in this) {
    if(this.hasOwnProperty(prop)) {
      b.println(counter+"  "+prop);
      counter++;
    }
}

//var stefan = "stefan";
b.println(stefan);