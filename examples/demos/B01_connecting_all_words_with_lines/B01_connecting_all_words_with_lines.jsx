#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

    var selItems = b.selections(); 
    
    var textFrame1 = selItems[0];
    var textFrame2 = selItems[1];    
    
    b.layer("generatedLines"); // generate new lines here
    b.strokeWeight(0.3); // we like hairs
    
    for(var i = 0; i < textFrame1.words.length; i++){

        var w1 = textFrame1.words[i];

        // nested for loop, connect each word with all other words of other textframe
        for(var j = 0; j < textFrame2.words.length; j++){ 

              var w2 = textFrame2.words[j];
          
              b.line(
                  // add half of width and height to make sure the lines are centered
                  b.bounds(w1).left + b.bounds(w1).width / 2, 
                  b.bounds(w1).top + b.bounds(w1).height / 2, 
                  b.bounds(w2).left + b.bounds(w2).width / 2, 
                  b.bounds(w2).top + b.bounds(w2).height / 2
              
              );
            
        }
        
    }
  
}

b.go();