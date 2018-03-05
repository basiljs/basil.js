// @includepath ~/Documents/;%USERPROFILE%Documents;
// @include basiljs/basil.js;

function draw() {

  clear(doc());

  units(MM); // use millimeter
  noStroke();

  rectMode(CORNER); // Please note that only CORNER positioning is fully supported for moving around items

  fill(255, 0, 0); // red
  pushMatrix();
  // translate(50, 50);
  // scale(0.5, 1);
  rotate(radians(35));
  rect(50, 25, 30, 10);
  popMatrix();

  fill(0); // black
  pushMatrix();
  // translate(50, 50);
  // scale(0.5, 1);
  rotate(radians(35));
  rect(50, 36, 30, 10);
  popMatrix();

  rectMode( CORNER );
  pushMatrix();
  translate(50, 50);
  rotate(radians(35));
  // scale(0.5, 1);
  rect(50, 25, 30, 10);
  popMatrix();

  rectMode( CENTER );
  pushMatrix();
  translate(50, 50);
  rotate(radians(35));
  // scale(0.5, 1);
  rect(65, 30, 30, 10);
  popMatrix();

  rectMode( CORNERS );
  pushMatrix();
  translate(50, 50);
  rotate(radians(35));
  // scale(0.5, 1);
  rect(50, 25, 80, 35);
  popMatrix();


	pushMatrix();
  rotate(radians(20));
  scale(2);
  ellipse(50, 0, 10, 30);
  ellipse(70, 0, 10, 30);
  ellipse(90, 0, 10, 30);
  popMatrix();

}
