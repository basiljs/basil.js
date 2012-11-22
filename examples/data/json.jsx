/**
 * show how to parse a raw JSON string to a javascript object.
 * no idea waht JSON is? then have a read here: http://en.wikipedia.org/wiki/JSON
 */

#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// use loadStrings() to get your JSON data into indesign ...
var jsonString = '{\
                  "firstName": "John",\
                  "lastName": "Smith",\
                  "age": 25,\
                  "address": {\
                      "streetAddress": "21 2nd Street",\
                      "city": "New York",\
                      "state": "NY",\
                      "postalCode": "10021"\
                  },\
                  "phoneNumber": [\
                      {\
                          "type": "home",\
                          "number": "212 555-1234"\
                      },\
                      {\
                          "type": "fax",\
                          "number": "646 555-4567"\
                      }\
                  ]\
                }';
// please note: 
// you don't have normally a '\' at the end of a line ... 
// this is just the character to have a multiline-string

function setup() {
  // parse JSON
  var jsonData = b.JSON.decode( jsonString );

  b.text(jsonData.firstName, 0,0, b.width, 50);
  b.text(jsonData.address.city, 0,50, b.width, 50);
  b.text(jsonData.phoneNumber[0].number, 0,100, b.width, 50);

  // convert a object to a JSON-string
  b.println( b.JSON.encode(jsonData) );
}

b.go();