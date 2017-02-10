// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.units(b.PT); // default
  b.text("points", 10, 20, 300, 300);

  b.units(b.PX);
  b.text("pixels", 10, 20, 300, 300);

  b.units(b.MM);
  b.text("millimenters", 10, 20, 300, 300);

  b.units(b.CM);
  b.text("centimenters", 10, 20, 300, 300);

  b.units(b.IN);
  b.text("inches", 1, 2, 300, 300);
}

b.go();
