#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// Please note: This is a visual test. 
// Run it and verify by eye that everything is safe and sound.

function draw() {


   b.doc( app.documents.add() ); // use a fresh document
   b.doc().documentPreferences.facingPages = true;
   b.bleeds(20);
   b.margins(20);


   b.noFill();
   b.strokeWeight(5);
   b.stroke(0,255,0); // green


   b.page(1);
   b.canvasMode(b.MARGIN);
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.PAGE);
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.BLEED); // no bleed on left side?
   b.rect(0,0,b.width,b.height);

   b.addPage();
   b.addPage();


   b.page(2); // good?
   b.canvasMode(b.MARGIN);
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.PAGE);
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.BLEED);
   b.rect(0,0,b.width,b.height);

   b.addPage();
   b.addPage();


   b.page(5); // good?
   b.canvasMode(b.MARGIN);
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.PAGE);
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.BLEED);
   b.rect(0,0,b.width,b.height);


   b.addPage();
   b.addPage();


   b.page(6);

   b.canvasMode(b.FACING_MARGINS); // good
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.FACING_PAGES); // only left page
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.FACING_BLEEDS); // only left page
   b.rect(0,0,b.width,b.height);

   b.addPage();
   b.addPage();


   b.page(9);

   b.canvasMode(b.FACING_MARGINS); // good
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.FACING_PAGES); // only left page
   b.rect(0,0,b.width,b.height);

   b.canvasMode(b.FACING_BLEEDS); // only left page
   b.rect(0,0,b.width,b.height);





}
b.go();

