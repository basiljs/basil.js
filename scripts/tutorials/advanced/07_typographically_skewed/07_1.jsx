// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  var mySel = b.selections()[0];

  b.paragraphs(mySel, function(p, pn){

    var wordCount = b.words(p).length;

    b.words(p, function(w, n){

      var skew = b.map(n, 0, wordCount, -55,55); // -85, 85 is max deg°

      //  have fun using ONE of the following lines below:

//~         if(n < wordCount/2){
//~         if(n%2==0){

        if(n<skew){
            b.typo(w, "skew", skew);
        }else{
          b.typo(w, "skew", -skew);
        }

//~         b.typo(w, "skew", b.random(-75,75)); // all skewed up

      //  turn off code above to just break up line
//~         b.typo(w, "baselineShift", -b.random(-10,10)); // cloud cluster of words



    });

  });
}

b.go();