// @includepath "~/Documents/;%USERPROFILE%Documents";
// @include "basiljs/basil.js";

function draw() {
  b.clear(b.doc());

  var red = b.color(255, 0, 0);
  var lightBlue = b.color(0, 255, 255);

  b.fill(red);
  b.ellipse(b.width / 3, b.height / 2, 333, 333);
  b.fill(lightBlue);
  var circle = b.ellipse(b.width / 3 * 2, b.height / 2, 333, 333);

  /*
  BlendMode.NORMAL
  BlendMode.MULTIPLY
  BlendMode.SCREEN
  BlendMode.OVERLAY
  BlendMode.SOFT_LIGHT
  BlendMode.HARD_LIGHT
  BlendMode.COLOR_DODGE
  BlendMode.COLOR_BURN
  BlendMode.DARKEN
  BlendMode.LIGHTEN
  BlendMode.DIFFERENCE
  BlendMode.EXCLUSION
  BlendMode.HUE
  BlendMode.SATURATION
  BlendMode.COLOR
  BlendMode.LUMINOSITY
   */

  b.blendMode(circle, BlendMode.HARD_LIGHT);
}

b.go();
