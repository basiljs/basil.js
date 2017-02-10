// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  // show the count of all stories in the current document
  b.println(b.storyCount()); // 0

  // create two textframes
  var txtFrameA = b.text("hi this is txtFrameA! ", 0, 0, 300, 100);
  var txtFrameB = b.text("this is text from txtFrameB! ", 100, 150, 300, 100);
  b.println(b.storyCount()); // 2, because we have two unlinked textframes, each has its own story

  // link both textframes into one story
  b.linkTextFrames(txtFrameA, txtFrameB);
  b.println(b.storyCount()); // 1, because txtFrameB is now part of txtFrameA's story

  // add something to the story of txtFrameA
  for (var i = 0; i < 20; i++) {
    var tmpRect = b.rect(0, 0, 30, 30); // position of rect is ignored
    b.addToStory(txtFrameA.parentStory, tmpRect);
    b.addToStory(txtFrameA.parentStory, " | ");
  }

  b.addToStory(txtFrameA.parentStory, " - and some text at the end --> ");

  // You can control the position of the insert via the last parameter.
  // It accepts either an InsertionPoint or one the following constants: b.AT_BEGINNING and b.AT_END.
  b.addToStory(txtFrameA.parentStory, "<-- some text at the front - ", b.AT_BEGINNING);
}

b.go();
