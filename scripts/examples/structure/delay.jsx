// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function setup() {
  b.println(b.hour() + ":" + b.minute() + ":" + b.second());

  // wait 3 sec
  b.delay(3000);

  b.println(b.hour() + ":" + b.minute() + ":" + b.second());
}

b.go();
