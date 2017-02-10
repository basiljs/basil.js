// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  for (var i = 0; i < 11; i++) {
    var x = fibonacci(i) * 10, y = x;
    b.guideX(x);
    b.guideY(y);
  }
}

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

b.go();
