// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {

  // run this on an empty document with only one page
  b.doc().documentPreferences.facingPages = false; // force non-facing pages, sorry guys!
  b.page();

  // add one page at the end of the document
  b.addPage();
  b.text("Example 1", b.width / 2, b.height / 2, 100, 100);
  // removes current page
  b.removePage();

  // fill up again...
  b.addPage();
  // removes page 1
  b.removePage(1);

  // fill up again and save reference in myPage
  var myPage = b.addPage();
  // removes myPage right away... you won't see it ever
  b.removePage(myPage);

  // add pages until 20
  for(var i = b.pageCount(); i < 20; i++) {
    b.addPage();
    b.text("Example 2-" + i, b.width / 2, b.height / 2, 100, 100);
  }

  // set location of insertion
  b.addPage(b.AT_END); // default
  b.text("Example AT_END", b.width / 2, b.height / 2, 100, 100);
  b.addPage(b.AT_BEGINNING);
  b.text("Example AT_BEGINNING", b.width / 2, b.height / 2, 100, 100);

  // adds a page before page 15
  b.page(10); // set current page
  b.addPage(b.BEFORE); // this refers to the current page
  b.text("Example BEFORE 10 becomes the new 10", b.width / 2, b.height / 2, 100, 100);

  // guess what!
  b.page(15);
  b.addPage(b.AFTER);
  b.text("Example AFTER 15 becomes 16", b.width / 2, b.height / 2, 100, 100);

  b.println(b.pageCount());

}
b.go();
