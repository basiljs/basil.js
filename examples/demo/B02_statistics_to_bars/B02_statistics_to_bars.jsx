#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// Contributed by Riem Ibrahim and Jessica Campbell

function draw() {

   var hash = new HashList();
   var tf1 = b.selections()[0];

   var words = b.characters(tf1);

   var str;
   for( var i = 0; i < words.length; i++){
       str = words[i].contents;
       switch(str.toString()){
           case "SINGLE_RIGHT_QUOTE":
            str="'";
           break;
           case "EM_DASH":
            str="-";
           break;
           case "DOUBLE_LEFT_QUOTE":
            str='"';
           break;
            case "DOUBLE_RIGHT_QUOTE":
            str='"';
           break;
           }

       str = b.trimWord(str);
       str = str.toLowerCase();
       if(hash.hasKey(str) ){
           hash.set(str, hash.get(str) + 1);
       } else {
           hash.set( str, 1 );
       }
   }

   tf1.remove();

   var keys = hash.getSortedKeys();
   var valueKeys = hash.getKeysByValues();
   var maxValue = valueKeys[0];

   for(var i = 0; i < keys.length; i++) {

       b.text(keys[i], 0, b.height/keys.length*i+6, 20, b.width/30);

       b.textAlign(Justification.CENTER_ALIGN);
       b.textFont("American Typewriter","Light");
       b.textSize(9);

       var bars = b.map(hash.get( keys[i] ),1,hash.get( maxValue ), 10, b.width-30);

       b.rect(20, b.height/keys.length*i, bars, b.width/35);
}

}

b.go();