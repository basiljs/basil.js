#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// you can get all elements you have marked with a script label (Window -> Utilities -> Script Label) 
// with b.findByLabel(). there a two different ways to use the b.findByLabel() function

function draw() {
  var myScriptLabel = "a script label";
  b.println("script Label: "+myScriptLabel);
  b.println("---");
  
  // a
  var myTaggedItems = b.findByLabel(myScriptLabel);
  for (var i = 0; i < myTaggedItems.length; i++) {
    b.println("element "+i+" is a: "+ myTaggedItems[i] );
  };

  b.println("---");

  // b
  b.findByLabel(myScriptLabel, function(item,counter){
    b.println("element "+counter+" is a: "+ item );
  });

}

b.go();